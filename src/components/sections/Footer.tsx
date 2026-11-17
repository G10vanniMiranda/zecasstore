import { ContactLink } from "@/components/ContactLink";
import { OutboundLink } from "@/components/OutboundLink";
import { brand, nav } from "@/content/site";
import { contactLabel } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-bone/10 px-4 pt-16 pb-10 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <a href="#inicio" className="wordmark text-3xl lowercase">
            zeca’s store
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">{brand.description}</p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3">
          <h2 className="eyebrow text-mist">Navegação</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-line">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="eyebrow text-mist">Contato</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <OutboundLink href={brand.instagram.url} origin="footer" channel="instagram" className="link-line">
                Instagram @{brand.instagram.handle}
              </OutboundLink>
            </li>
            <li>
              <ContactLink origin="footer" className="link-line">
                {contactLabel}
              </ContactLink>
            </li>
            <li className="text-mist">
              {brand.city} — {brand.region}, Brasil
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-bone/10 pt-8 text-xs text-mist sm:flex-row sm:justify-between lg:col-span-12">
          <p>© {brand.name} · Desde {brand.since}</p>
          <p>Desenvolvido por MI7ANDA LAB</p>
        </div>
      </div>
    </footer>
  );
}
