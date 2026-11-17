"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type Props = {
  nav: { href: string; label: string }[];
  /** CTAs já renderizados no servidor (ContactLink), um para a barra e outro para o menu. */
  cta: ReactNode;
  menuCta: ReactNode;
};

const subscribe = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

export function Header({ nav, cta, menuCta }: Props) {
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 24, () => false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const main = document.getElementById("conteudo");
    const toggle = toggleRef.current;
    root.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled && !open;
  const tone = open ? "text-bone" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500 ${tone} ${
        // Menu aberto: barra sólida e instantânea, senão o conteúdo da página aparece atrás do logo e do X.
        open ? "border-bone/10 bg-ink duration-0" : solid ? "border-ink/10 bg-bone/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-8 sm:h-16 lg:h-[4.5rem] lg:px-12">
        <a href="#inicio" className="wordmark text-lg lowercase sm:text-xl" onClick={() => setOpen(false)}>
          zeca’s store<span className="sr-only"> — início</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] font-medium tracking-[0.12em] uppercase">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-line py-1">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">{cta}</div>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </div>

      <div
        id={menuId}
        className={`fixed inset-0 top-14 bg-ink sm:top-16 text-bone duration-500 lg:hidden ${
          open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <nav aria-label="Menu" className="flex h-full flex-col justify-between px-4 pt-10 pb-10 sm:px-8">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-expo ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block py-1 text-[clamp(2.75rem,14vw,4.5rem)] uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div onClick={() => setOpen(false)}>{menuCta}</div>
        </nav>
      </div>
    </header>
  );
}
