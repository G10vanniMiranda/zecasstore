"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageProps, type StaticImageData } from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Só um arquivo é escolhido por aparelho (src definido via JS, nunca no HTML):
// hero-1080: 16:9, GOP 4 sem B-frames → scrub com pin no desktop.
// hero-vertical: ~5:8 (900x1442), GOP 4 → scrub com pin no celular.
// hero-720: 16:9 leve, tocado uma vez no tablet e em aparelhos modestos.
const SRC_WIDE = "/video/hero-1080.mp4";
const SRC_VERTICAL = "/video/hero-vertical.mp4";
const SRC_TABLET = "/video/hero-720.mp4";
const PHONE = "(max-width: 639.98px)";

type Nav = Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number };

type Props = { poster: StaticImageData; posterVertical: StaticImageData; alt: string; className: string };

export function HeroMedia({ poster, posterVertical, alt, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP((_, contextSafe) => {
    const video = videoRef.current;
    const section = video?.closest("section");
    if (!video || !section) return;
    const nav = navigator as Nav;
    if (nav.connection?.saveData) return; // economia de dados: fica só o poster

    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const slowNet = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");

    const reveal = () => (video.style.opacity = "1");
    const unload = () => {
      video.pause();
      video.style.opacity = "";
      video.removeAttribute("src");
      video.load();
    };

    // Toca uma vez (sem loop) quando visível.
    const playOnce = (src: string) => {
      video.src = src;
      video.addEventListener("playing", reveal, { once: true });
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        video.play().catch(() => {}); // autoplay bloqueado (ex.: modo economia iOS) → poster
        io.disconnect();
      });
      io.observe(video);
      return () => {
        io.disconnect();
        video.removeEventListener("playing", reveal);
        unload();
      };
    };

    // Vídeo inteiro em memória (blob) para seeks sem requisições de rede.
    const scrub = (src: string, trigger: ScrollTrigger.Vars, fadeText: boolean) => {
      let url = "";
      let alive = true;
      let target = 0;
      const seek = () => {
        if (video.readyState >= 1 && !video.seeking) video.currentTime = target;
      };
      // Um seek por vez: ao terminar, aplica o alvo mais recente se o scroll andou.
      const onSeeked = () => Math.abs(video.currentTime - target) > 0.02 && seek();
      const onLoaded = () => {
        reveal();
        seek();
      };
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("loadeddata", onLoaded, { once: true });
      fetch(src)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((blob) => {
          if (!alive) return;
          url = URL.createObjectURL(blob);
          video.src = url;
        })
        .catch(() => {}); // falha de rede → poster estático

      const proxy = { t: 0 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, ...trigger } }).to(
        proxy,
        {
          t: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            target = proxy.t * Math.max((video.duration || 5) - 0.05, 0);
            seek();
          },
        },
        0,
      );
      if (fadeText) {
        tl.to("[data-hero-indicator]", { autoAlpha: 0, duration: 0.08 }, 0).to(
          "[data-hero-fade]",
          { autoAlpha: 0, y: -48, ease: "power1.in", duration: 0.4, stagger: 0.06 },
          0.04,
        );
      }

      return () => {
        alive = false;
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("loadeddata", onLoaded);
        unload();
        if (url) URL.revokeObjectURL(url);
      };
    };

    // Pin, scrub e download do vídeo só depois do load + ocioso: não disputam a thread
    // com a hidratação nem atrasam a pintura do poster (LCP). contextSafe mantém o cleanup.
    const start = contextSafe!(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          tablet: "(min-width: 640px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
          phone: `${PHONE} and (prefers-reduced-motion: no-preference)`,
        },
        (ctx) => {
          const { desktop, phone } = ctx.conditions ?? {};
          if (desktop) {
            if (cores <= 4 || memory <= 4) return playOnce(SRC_WIDE);
            return scrub(SRC_WIDE, { start: "top top", end: "+=140%", pin: true, scrub: 0.6, anticipatePin: 1, refreshPriority: 1 }, true);
          }
          if (phone) {
            if (cores < 4 || memory < 4 || slowNet) return playOnce(SRC_VERTICAL);
            return scrub(SRC_VERTICAL, { start: "top top", end: "+=100%", pin: true, scrub: 0.5, anticipatePin: 1, refreshPriority: 1 }, true);
          }
          return playOnce(SRC_TABLET);
        },
      );
      ScrollTrigger.refresh(); // o pin entra depois das animações das outras seções
    });

    let idle = 0;
    const kick = () => {
      // Safari não tem requestIdleCallback.
      idle = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(start, { timeout: 1200 }) : window.setTimeout(start, 200);
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => {
      window.removeEventListener("load", kick);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  });

  // Direção de arte: o navegador baixa só o poster do breakpoint atual.
  const common = { alt, fill: true, sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  const { srcSet: verticalSet } = getImageProps({ ...common, src: posterVertical }).props;
  const { srcSet: wideSet, ...img } = getImageProps({ ...common, src: poster }).props;
  // Celular: cover em tela cheia corta ~26% da largura; 40% mantém o "V" do tênis no centro.
  const fit = "object-cover object-[40%_50%] sm:object-[80%_50%]";

  return (
    <div className={className}>
      <picture>
        <source media={PHONE} srcSet={verticalSet} sizes="100vw" />
        <source srcSet={wideSet} sizes="100vw" />
        <img {...img} alt={alt} className={fit} />
      </picture>
      <video
        ref={videoRef}
        aria-hidden
        tabIndex={-1}
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        className={`absolute inset-0 size-full opacity-0 transition-opacity duration-700 ${fit}`}
      />
    </div>
  );
}
