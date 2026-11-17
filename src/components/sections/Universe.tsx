import Image from "next/image";

import { Arrow, ContactLink } from "@/components/ContactLink";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { categories, type Category } from "@/content/site";

// Composição assimétrica (desktop): um card alto à esquerda e os demais escalonados.
const layout = [
  "lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-5 aspect-[4/3]",
  "lg:col-span-5 aspect-[4/5] lg:aspect-[4/3]",
  "lg:col-span-5 aspect-[4/5] lg:mt-24 self-start",
  "lg:col-span-7 aspect-[4/5] sm:aspect-[16/11] self-start",
];

function CardBody({ c, i }: { c: Category; i: number }) {
  return (
    <>
      <Image
        src={c.image.src}
        alt={c.image.alt}
        fill
        placeholder="blur"
        sizes={i === 0 || i === 4 ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
        className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
      />
      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-bone sm:p-7">
        <span className="eyebrow text-bone/70">
          {String(i + 1).padStart(2, "0")} · {c.brands}
        </span>
        <span className="font-display text-4xl uppercase sm:text-5xl">{c.title}</span>
        <span className="max-w-sm text-sm leading-relaxed text-bone/80">{c.text}</span>
        <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase">
          <span className="link-line">{c.cta}</span>
          <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </span>
    </>
  );
}

export function Universe() {
  return (
    <section id="universo" aria-labelledby="universo-title" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading
        id="universo-title"
        index="01"
        eyebrow="Universo Zeca’s"
        title={
          <>
            Tudo para vestir <Accent>identidade</Accent>
          </>
        }
        text="Tênis, roupas e calçados masculinos e femininos, escolhidos marca a marca. Toque numa categoria e fale com a gente."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-6">
        {categories.map((c, i) => {
          const cls = "group block overflow-hidden bg-graphite";
          return (
            <li key={c.title} data-reveal className={`relative ${layout[i]} ${i === 0 || i === 4 ? "sm:col-span-2" : ""}`}>
              {c.href ? (
                <a href={c.href} className={`${cls} absolute inset-0`}>
                  <CardBody c={c} i={i} />
                </a>
              ) : (
                <ContactLink origin="categoria" detail={c.title.toLowerCase()} className={`${cls} absolute inset-0`}>
                  <CardBody c={c} i={i} />
                </ContactLink>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
