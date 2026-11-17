import type { CSSProperties } from "react";

import { Arrow, ContactLink } from "@/components/ContactLink";
import { HeroMedia } from "@/components/HeroMedia";
import { brands, hero } from "@/content/site";
import { contactLabel } from "@/lib/contact";

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

export function Hero() {
  return (
    <>
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="relative isolate flex h-svh min-h-[560px] flex-col justify-between overflow-hidden bg-bone sm:h-auto sm:min-h-0 sm:justify-start sm:overflow-visible lg:h-svh lg:min-h-[640px] lg:justify-between lg:overflow-hidden"
      >
        {/* Celular: vídeo vertical em tela cheia. Tablet: bloco 16:10 entre título e CTAs. Desktop: tela cheia. */}
        <HeroMedia
          poster={hero.poster}
          posterVertical={hero.posterVertical}
          alt={hero.posterAlt}
          className="absolute inset-0 -z-10 overflow-hidden sm:relative sm:inset-auto sm:z-auto sm:order-2 sm:aspect-[16/10] sm:w-full lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto"
        />
        {/* Contraste no celular só nas faixas de texto (topo e base). */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-[40%] bg-linear-to-b from-bone/90 via-bone/55 to-transparent sm:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-[45%] bg-linear-to-t from-bone/95 via-bone/65 to-transparent sm:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] hidden bg-linear-to-r from-bone/60 via-bone/15 to-transparent lg:block" />

        <div data-hero-fade className="order-1 px-4 pt-20 sm:px-8 sm:pt-28 sm:pb-8 lg:px-12 lg:pt-32 lg:pb-0">
          <p className="eyebrow hero-in text-stone lg:text-ink/70" style={delay(0.5)}>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="font-display mt-4 text-[clamp(2.1rem,10.6vw,3.25rem)] sm:mt-5 sm:text-[clamp(3.25rem,15vw,6rem)] lg:max-w-[58%] lg:text-[clamp(4.5rem,7vw,8.25rem)]">
            {hero.lines.map((line, i) => (
              <span key={line} className="hero-line">
                <span style={delay(0.35 + i * 0.12)}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div data-hero-fade className="order-2 px-4 pb-6 sm:order-3 sm:px-8 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-0 lg:pb-12">
          <p className="hero-in max-w-sm text-[0.9375rem] leading-relaxed text-graphite sm:text-base lg:text-lg" style={delay(0.7)}>
            {hero.text}
          </p>
          <div className="hero-in mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3" style={delay(0.85)}>
            <a href="#universo" className="btn btn-dark w-full sm:w-auto">
              Explorar coleção <Arrow />
            </a>
            <ContactLink origin="hero" className="btn btn-outline w-full bg-bone/40 backdrop-blur-sm sm:w-auto">
              Chamar no {contactLabel}
            </ContactLink>
          </div>
        </div>

        <div data-hero-indicator aria-hidden className="hero-in absolute right-12 bottom-12 hidden items-center gap-3 lg:flex" style={delay(1.2)}>
          <span className="eyebrow text-ink/70">Role</span>
          <span className="relative h-12 w-px overflow-hidden bg-ink/20">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink" />
          </span>
        </div>
      </section>

      {/* Faixa de marcas */}
      <div className="marquee-wrap overflow-hidden border-y border-ink/10 bg-ink py-4 text-bone">
        <p className="sr-only">Marcas na Zeca’s Store: {brands.join(", ")}.</p>
        <div aria-hidden className="marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {brands.map((b) => (
                <li key={b} className="font-display flex items-center text-2xl uppercase sm:text-3xl">
                  <span className="px-6">{b}</span>
                  <span className="font-serif text-xl text-sand italic">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
