import Image from "next/image";

import { Accent, SectionHeading } from "@/components/SectionHeading";
import { OutboundLink } from "@/components/OutboundLink";
import { brand, looks } from "@/content/site";

export function Looks() {
  return (
    <section id="looks" aria-labelledby="looks-title" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
      <SectionHeading
        id="looks-title"
        index="03"
        eyebrow="Looks & coleções"
        title={
          <>
            Estilo que <Accent>fala por si</Accent>
          </>
        }
        text="Composições reais, vestidas por clientes e amigos da casa. As peças mudam a cada coleção — pergunte o que chegou."
      />

      <ul data-stagger className="mt-14 columns-2 gap-4 sm:gap-6 lg:mt-20 lg:columns-4">
        {looks.map((l) => (
          <li key={l.alt} className="group mb-4 break-inside-avoid sm:mb-6">
            <figure>
              <div className="overflow-hidden bg-graphite/10">
                <Image
                  src={l.src}
                  alt={l.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
                />
              </div>
              {l.label && <figcaption className="eyebrow mt-3 text-stone">{l.label}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-12 flex justify-center">
        <OutboundLink href={brand.instagram.url} origin="looks" channel="instagram" className="btn btn-outline">
          Mais looks no Instagram
        </OutboundLink>
      </div>
    </section>
  );
}
