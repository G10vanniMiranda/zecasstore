import { Arrow, ContactLink } from "@/components/ContactLink";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Looks } from "@/components/sections/Looks";
import { Universe } from "@/components/sections/Universe";
import { Veja } from "@/components/sections/Veja";
import { brand, brands, nav } from "@/content/site";
import { whatsappNumber } from "@/lib/contact";

// SEO local só com dados confirmados (sem endereço/horário até a loja informar).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: brand.name,
  description: brand.description,
  foundingDate: String(brand.since),
  image: "/opengraph-image.jpg",
  address: { "@type": "PostalAddress", addressLocality: brand.city, addressRegion: brand.region, addressCountry: "BR" },
  sameAs: [brand.instagram.url],
  brand: brands.map((name) => ({ "@type": "Brand", name })),
  ...(whatsappNumber && { telephone: `+${whatsappNumber}` }),
};

export default function Home() {
  return (
    <>
      <Header
        nav={nav}
        cta={
          <ContactLink origin="header" className="btn btn-dark min-h-10 px-5">
            Fale conosco
          </ContactLink>
        }
        menuCta={
          <ContactLink origin="menu" className="btn btn-light w-full">
            Fale conosco <Arrow />
          </ContactLink>
        }
      />
      <main id="conteudo">
        <Hero />
        <Universe />
        <Veja />
        <Looks />
        <About />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
