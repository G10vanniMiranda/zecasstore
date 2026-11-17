import Image from "next/image";

import { Arrow, ContactLink } from "@/components/ContactLink";
import { about, brand } from "@/content/site";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 py-24 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-36">
        <div className="relative lg:col-span-6">
          <div data-clip className="relative aspect-[4/5] overflow-hidden bg-graphite">
            <div data-parallax className="absolute inset-x-0 -inset-y-[6%]">
              <Image
                src={about.images.main.src}
                alt={about.images.main.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
          <div data-reveal className="absolute -right-2 -bottom-10 w-[38%] border-8 border-paper sm:-right-6 lg:-right-10">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={about.images.detail.src} alt={about.images.detail.alt} fill sizes="(min-width: 1024px) 20vw, 38vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          <div data-reveal>
            <p className="eyebrow text-stone">
              <span className="text-ink">04</span> — Sobre a Zeca’s
            </p>
            <h2 id="sobre-title" className="font-display mt-5 text-[clamp(2.75rem,9vw,5.5rem)] uppercase">
              {about.title.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p} className="mt-6 text-base leading-relaxed text-stone lg:text-lg">
                {p}
              </p>
            ))}
            <blockquote className="mt-10 border-l border-ink pl-5 font-serif text-3xl leading-tight italic">“{brand.tagline}”</blockquote>
          </div>

          <ul data-stagger className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {about.differentials.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-5">
                <span className="eyebrow pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone">{d.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul aria-label="Nosso jeito de atender" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-serif text-xl italic">
            {brand.motto.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <ContactLink origin="sobre" className="btn btn-dark mt-10">
            Visite ou chame a gente <Arrow />
          </ContactLink>
        </div>
      </div>
    </section>
  );
}
