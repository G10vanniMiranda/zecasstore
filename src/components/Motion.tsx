"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animações de rolagem guiadas por atributos:
//   data-reveal   → sobe e aparece
//   data-stagger  → filhos aparecem em sequência
//   data-clip     → revelação por clip-path
//   data-parallax → deslocamento sutil (só telas ≥768px)
// Tudo é desligado com prefers-reduced-motion e revertido no unmount pelo useGSAP.
export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Só anima o que está abaixo da dobra: nada visível pisca na carga.
    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
    const once = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(below).forEach((el) => {
        gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.1, ease: "power3.out", scrollTrigger: once(el) });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").filter(below).forEach((el) => {
        gsap.from(el.children, { y: 48, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.09, scrollTrigger: once(el, "top 82%") });
      });
      gsap.utils.toArray<HTMLElement>("[data-clip]").filter(below).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(16% 12% 16% 12%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.out", scrollTrigger: once(el, "top 82%") },
        );
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });
  });

  return null;
}
