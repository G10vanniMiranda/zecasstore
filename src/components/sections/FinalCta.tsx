import Image from "next/image";

import { Arrow, ContactLink } from "@/components/ContactLink";
import { OutboundLink } from "@/components/OutboundLink";
import { brand, finalCta } from "@/content/site";
import { contactLabel } from "@/lib/contact";

export function FinalCta() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden bg-ink text-bone">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-parallax className="absolute inset-x-0 -inset-y-[6%]">
          <Image src={finalCta.image.src} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_35%] opacity-45" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/40" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-28 sm:px-8 lg:px-12 lg:py-44">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow text-mist">
            <span className="text-sand">05</span> — Contato
          </p>
          <h2 id="contato-title" className="font-display mt-6 text-[clamp(4rem,18vw,11rem)]">
            {finalCta.title.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/85">{finalCta.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ContactLink origin="cta-final" className="btn btn-light">
              Chamar no {contactLabel} <Arrow />
            </ContactLink>
            <OutboundLink href={brand.instagram.url} origin="cta-final" channel="instagram" className="btn btn-outline">
              @{brand.instagram.handle}
            </OutboundLink>
          </div>
          <p className="mt-10 text-sm text-mist">
            {brand.city} — {brand.region} · Desde {brand.since}
          </p>
        </div>
      </div>
    </section>
  );
}
