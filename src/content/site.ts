// Conteúdo comercial da landing. Toda informação aqui foi confirmada em
// publicações do Instagram @zecasstore — não adicionar dados sem fonte.
import type { StaticImageData } from "next/image";

import heroPoster from "@/assets/img/hero-poster.webp";
import heroPosterVertical from "@/assets/img/hero-poster-vertical.webp";
import fachada from "@/assets/img/fachada.webp";
import fachadaEquipe from "@/assets/img/fachada-equipe.webp";
import lojaInterior from "@/assets/img/loja-interior.webp";
import zeca from "@/assets/img/zeca.webp";
import catCamisetas from "@/assets/img/cat-camisetas.webp";
import catCalcas from "@/assets/img/cat-calcas.webp";
import catCalcados from "@/assets/img/cat-calcados.webp";
import catFeminino from "@/assets/img/cat-feminino.webp";
import vejaV90 from "@/assets/img/veja-v90.webp";
import vejaV10 from "@/assets/img/veja-v10.webp";
import vejaVolley from "@/assets/img/veja-volley.webp";
import vejaUrca from "@/assets/img/veja-urca.webp";
import vejaCampo from "@/assets/img/veja-campo.webp";
import vejaV12 from "@/assets/img/veja-v12.webp";
import vejaRecife from "@/assets/img/veja-recife.webp";
import vejaColecao from "@/assets/img/veja-colecao.webp";
import look01 from "@/assets/img/look-01.webp";
import look02 from "@/assets/img/look-02.webp";
import look03 from "@/assets/img/look-03.webp";
import look04 from "@/assets/img/look-04.webp";
import look05 from "@/assets/img/look-05.webp";
import look06 from "@/assets/img/look-06.webp";
import look07 from "@/assets/img/look-07.webp";
import look08 from "@/assets/img/look-08.webp";

export type Photo = { src: StaticImageData; alt: string };

export const brand = {
  name: "Zeca’s Store",
  city: "Porto Velho",
  region: "RO",
  since: 2013,
  instagram: {
    handle: "zecasstore",
    url: "https://www.instagram.com/zecasstore/",
    dm: "https://ig.me/m/zecasstore",
  },
  tagline: "Imagem não é estética, é estratégia.",
  motto: ["Amor e carinho", "Um café quentinho", "Muito estilo pra você"],
  description:
    "Loja multimarcas em Porto Velho (RO) desde 2013: tênis VEJA, Osklen, Reserva Go, roupas Zapälla, Kour, Oficina Reserva e calçados Anatomic Gel.",
};

// Marcas citadas pela própria loja em publicações (2024–2026).
export const brands = [
  "VEJA",
  "Osklen",
  "Reserva",
  "Oficina Reserva",
  "Reserva Go",
  "Zapälla",
  "Kour",
  "Calvin Klein",
  "Diesel",
  "Anatomic Gel",
  "Insider",
  "Pineapple",
];

export const nav = [
  { href: "#universo", label: "Universo" },
  { href: "#veja", label: "VEJA" },
  { href: "#looks", label: "Looks" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export const hero = {
  eyebrow: `${brand.city} — ${brand.region} · Desde ${brand.since}`,
  lines: ["SEU ESTILO.", "SUA IDENTIDADE."],
  text: "Uma seleção de tênis, roupas e peças que traduzem quem você é.",
  // Quadro inicial real do vídeo da hero (public/video), sem texto embutido.
  poster: heroPoster,
  posterVertical: heroPosterVertical,
  posterAlt: "Par de tênis VEJA V-10 sobre pedestal de pedra, sob luz natural com sombras de folhagem",
};

export type Category = {
  title: string;
  brands: string;
  text: string;
  image: Photo;
  /** Âncora interna; sem âncora, o card abre o contato com a categoria na mensagem. */
  href?: string;
  cta: string;
};

export const categories: Category[] = [
  {
    title: "Tênis",
    brands: "VEJA · Osklen · Reserva Go · Calvin Klein",
    text: "Do clássico ao lançamento, uma parede inteira de sneakers para escolher com calma.",
    image: { src: lojaInterior, alt: "Parede de tênis expostos na Zeca’s Store" },
    href: "#veja",
    cta: "Ver destaque VEJA",
  },
  {
    title: "Camisetas & polos",
    brands: "Zapälla · Kour · Diesel · Reserva",
    text: "Algodão Pima, estampas e polos com acabamento impecável.",
    image: { src: catCamisetas, alt: "Camisetas lisas em verde, marrom, azul, preto e cinza em cabides" },
    cta: "Consultar peças",
  },
  {
    title: "Calças",
    brands: "Oficina Reserva",
    text: "A 247 e a chino: os cortes que sempre voltam.",
    image: { src: catCalcas, alt: "Homem com camiseta azul e calça azul-marinho na loja" },
    cta: "Consultar calças",
  },
  {
    title: "Calçados & botas",
    brands: "Anatomic Gel",
    text: "Couro, conforto e robustez para acompanhar o dia a dia.",
    image: { src: catCalcados, alt: "Botas e sapatos de couro Anatomic Gel sobre um balcão" },
    cta: "Consultar calçados",
  },
  {
    title: "Feminino",
    brands: "VEJA · Insider",
    text: "Tênis e peças femininas para o casual e o fitness.",
    image: { src: catFeminino, alt: "Cliente com tricô creme e jeans diante da parede de tênis da loja" },
    cta: "Consultar feminino",
  },
];

export const veja = {
  intro:
    "Os tênis VEJA têm lugar de destaque na curadoria da Zeca’s. Estes são modelos que passaram pela loja, fotografados pela nossa equipe — consulte disponibilidade e numerações.",
  feature: {
    src: vejaColecao,
    alt: "Pares de tênis VEJA da nova coleção masculina sobre mesa branca",
    caption: "Novos modelos VEJA masculinos · 2026",
  },
  models: [
    { name: "V-10", text: "O clássico que nunca sai de moda.", src: vejaV10, alt: "VEJA V-10 branco com V verde e camurça bege" },
    { name: "V-12", text: "O mais pedido, na versão olive.", src: vejaV12, alt: "VEJA V-12 em camurça olive" },
    { name: "V-90", text: "O lançamento que virou estrela.", src: vejaV90, alt: "VEJA V-90 branco com V bordô" },
    { name: "Campo", text: "O básico que se destaca.", src: vejaCampo, alt: "VEJA Campo preto com V branco" },
    { name: "Urca", text: "Essencial, leve e cheio de estilo.", src: vejaUrca, alt: "VEJA Urca branco com V caramelo" },
    { name: "Volley", text: "Retrô e estiloso, o clássico revive.", src: vejaVolley, alt: "VEJA Volley branco com detalhes azul-marinho e sola marrom" },
    { name: "Recife", text: "Elegância e personalidade no look.", src: vejaRecife, alt: "VEJA Recife branco com fechamento em velcro" },
  ],
  disclaimer:
    "VEJA é marca registrada de seus respectivos titulares. Fotos: acervo Zeca’s Store. Disponibilidade sujeita ao estoque da loja.",
};

export const looks: (Photo & { label?: string })[] = [
  { src: look01, alt: "Camiseta preta e bermuda cáqui com tênis bege", label: "Zapälla" },
  { src: look02, alt: "Costas de camiseta cinza com estampa de toca-discos", label: "Zapälla estampada" },
  { src: look04, alt: "Cliente com top preto e calça jeans clara na loja", label: "Feminino" },
  { src: look05, alt: "Homem de terno azul e tênis branco à beira-mar" },
  { src: look06, alt: "Camiseta azul-marinho de algodão Pima", label: "Kour" },
  { src: look03, alt: "Costas de camiseta branca com estampa colorida", label: "Zapälla estampada" },
  { src: look07, alt: "Homem com camiseta verde, bermuda branca e tênis branco" },
  { src: look08, alt: "Polo roxa vestida com jeans", label: "Polo Zapälla" },
];

export const about = {
  title: ["Desde 2013,", "vestindo identidade."],
  paragraphs: [
    "A Zeca’s Store nasceu em 2013 em Porto Velho, Rondônia, com uma ideia simples: fazer cada cliente se sentir único e cada atendimento virar uma experiência.",
    "Somos uma loja multimarcas de moda masculina e feminina, com curadoria de tênis, roupas e calçados das marcas em que a gente acredita.",
  ],
  differentials: [
    { title: "Curadoria multimarcas", text: "Osklen, Reserva, Zapälla, VEJA e outras marcas lado a lado, escolhidas a dedo." },
    { title: "Atendimento próximo", text: "Na loja ou pelo Direct: mostramos as melhores opções para o seu estilo." },
    { title: "Parcelamento sem juros", text: "Condições de parcelamento no cartão — consulte na loja." },
  ],
  images: {
    main: { src: fachada, alt: "Fachada da Zeca’s Store com dois clientes segurando tênis VEJA" },
    detail: { src: zeca, alt: "Sorriso em frente ao monograma da Zeca’s Store na parede da loja" },
  },
};

export const finalCta = {
  title: ["VEM PRA", "ZECA’S."],
  text: "Fale com a gente e receba as melhores opções de tênis e roupas para o seu estilo.",
  image: { src: fachadaEquipe, alt: "Equipe e clientes reunidos em frente à fachada da Zeca’s Store" },
};
