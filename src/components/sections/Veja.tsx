import Image from "next/image";

import { Arrow, ContactLink } from "@/components/ContactLink";
import { Accent, SectionHeading } from "@/components/SectionHeading";
import { veja } from "@/content/site";

export function Veja() {
  return (
    <section id="veja" aria-labelledby="veja-title" className="bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
        <SectionHeading
          id="veja-title"
          index="02"
          eyebrow="Destaque"
          dark
          title={
            <>
              VEJA <Accent>na Zeca’s</Accent>
            </>
          }
          text={veja.intro}
        />

        <figure className="mt-14 lg:mt-20">
          <div data-clip className="relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[16/9]">
            <div data-parallax className="absolute inset-x-0 -inset-y-[6%]">
              <Image
                src={veja.feature.src}
                alt={veja.feature.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1440px) 1344px, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
          </div>
          <figcaption className="eyebrow mt-4 text-mist">{veja.feature.caption}</figcaption>
        </figure>

        <ul data-stagger className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-24 lg:grid-cols-4 lg:gap-y-14">
          {veja.models.map((m) => (
            <li key={m.name}>
              <ContactLink origin="veja" detail={m.name} className="group block">
                <span className="relative block aspect-square overflow-hidden bg-[#e9e3e1]">
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                  />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display text-3xl uppercase sm:text-4xl">{m.name}</span>
                  <Arrow className="shrink-0 text-sand transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block text-sm leading-snug text-mist">{m.text}</span>
              </ContactLink>
            </li>
          ))}
          <li className="col-span-2 sm:col-span-1">
            <div className="flex aspect-[2/1] flex-col justify-between border border-bone/15 p-5 sm:aspect-square sm:p-7">
              <p className="font-serif text-2xl leading-tight italic sm:text-3xl">Procurando outro modelo ou numeração?</p>
              <ContactLink origin="veja" className="btn btn-light self-start">
                Consultar modelos <Arrow />
              </ContactLink>
            </div>
          </li>
        </ul>

        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-mist">{veja.disclaimer}</p>
      </div>
    </section>
  );
}
