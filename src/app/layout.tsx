import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";

import { brand } from "@/content/site";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = `${brand.name} — Tênis VEJA, roupas e moda em ${brand.city}`;

export const metadata: Metadata = {
  // Domínio próprio via NEXT_PUBLIC_SITE_URL; senão, o domínio de produção que a Vercel injeta no build.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  ),
  title,
  description: brand.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: brand.name,
    title,
    description: brand.description,
  },
  twitter: { card: "summary_large_image", title, description: brand.description },
};

export const viewport: Viewport = { themeColor: "#121212" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${instrument.variable} antialiased`}>
      <body className="font-sans">
        <a href="#conteudo" className="sr-only z-[60] focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bone">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
