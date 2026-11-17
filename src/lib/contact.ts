import { brand } from "@/content/site";

// Número no formato internacional, só dígitos (ex.: 5569999999999). Sem número
// válido configurado, os CTAs abrem o Direct do Instagram.
const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
const whatsapp = /^55\d{10,11}$/.test(raw) ? raw : "";

export const contactChannel = whatsapp ? "whatsapp" : "instagram";
export const contactLabel = whatsapp ? "WhatsApp" : "Direct do Instagram";
export const whatsappNumber = whatsapp;

export type ContactOrigin = "header" | "menu" | "hero" | "categoria" | "veja" | "sobre" | "cta-final" | "footer";

const messages: Record<ContactOrigin, (detail?: string) => string> = {
  header: () => "Olá, Zeca’s! Vim pelo site e gostaria de atendimento.",
  menu: () => "Olá, Zeca’s! Vim pelo site e gostaria de atendimento.",
  hero: () => "Olá, Zeca’s! Vi o site e quero conhecer a coleção.",
  categoria: (d) => `Olá, Zeca’s! Vi o site e quero ver opções de ${d ?? "produtos"}.`,
  veja: (d) => (d ? `Olá, Zeca’s! Quero consultar o VEJA ${d} e as numerações disponíveis.` : "Olá, Zeca’s! Quero consultar os modelos VEJA e as numerações disponíveis."),
  sobre: () => "Olá, Zeca’s! Conheci a loja pelo site e quero saber mais.",
  "cta-final": () => "Olá, Zeca’s! Vim pelo site e quero receber as melhores opções para o meu estilo.",
  footer: () => "Olá, Zeca’s! Vim pelo site e gostaria de atendimento.",
};

export function contactHref(origin: ContactOrigin, detail?: string) {
  if (!whatsapp) return brand.instagram.dm; // Direct não aceita mensagem pré-preenchida
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(messages[origin](detail))}`;
}
