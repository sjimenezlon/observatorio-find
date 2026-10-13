// =============================================================================
// Capa editorial de la portada (rediseño v4.4): textos de uso, nombres cortos,
// perfiles y bitácora. NO contiene cifras de indicadores: los valores, fuentes
// y años se leen siempre de `data/dataset.ts`. Lo que aquí aparece como cifra
// (bitácora) repite lo publicado en /metodologia#auditoria.
// =============================================================================

import type { PilarKey } from "@/data/dataset";

/** Paleta de pilares del rediseño (portada). `orbita` es el color en el héroe oscuro. */
export const PILAR_UI: Record<PilarKey, { color: string; orbita: string; corto: string }> = {
  inclusion: { color: "#8C7CF8", orbita: "#8C7CF8", corto: "Inclusión" },
  pagos: { color: "#C9D400", orbita: "#E8F222", corto: "Pagos" },
  adopcion: { color: "#5538FC", orbita: "#5538FC", corto: "IA y ecosistema" },
  fraude: { color: "#0B0B12", orbita: "#F0F0F0", corto: "Fraude y AML" },
  tokenizacion: { color: "#3BB273", orbita: "#3BB273", corto: "Tokenización" },
  regulacion: { color: "#FF8A65", orbita: "#FF8A65", corto: "Regulación" },
};

export interface FichaEditorial {
  /** Nombre corto para el dial. */
  corto: string;
  /** Unidad tal como se muestra junto al valor. */
  unidad: string;
  /** Para qué le sirve el indicador a quien decide. */
  sirve: string;
  /** Palabras clave para el buscador (sin cifras). */
  claves: string;
}

export const FICHAS: Record<string, FichaEditorial> = {
  cuenta: {
    corto: "Tenencia de cuenta",
    unidad: "%",
    sirve: "Medir cuánta población puede atender su entidad con productos formales.",
    claves: "cuenta bancarización inclusión findex",
  },
  credito: {
    corto: "Crédito formal",
    unidad: "%",
    sirve: "Dimensionar el espacio para originar crédito formal y desplazar al informal.",
    claves: "crédito préstamo scoring gota a gota",
  },
  pagodigital: {
    corto: "Pago digital",
    unidad: "%",
    sirve: "Evaluar la base de usuarios lista para productos digitales.",
    claves: "pagos digitales app billetera",
  },
  brechagenero: {
    corto: "Brecha de género",
    unidad: "pp",
    sirve: "Diseñar productos y canales que cierren la brecha con las mujeres.",
    claves: "género mujeres brecha inclusión",
  },
  merchantpay: {
    corto: "Pago a comercios",
    unidad: "%",
    sirve: "Saber si el pago digital llega al punto de venta.",
    claves: "comercio punto de venta qr aceptación",
  },
  pagosadulto: {
    corto: "Pagos inmediatos",
    unidad: "tx",
    sirve: "Medir el uso efectivo del riel inmediato frente a sus pares.",
    claves: "bre-b pix spei yape plin transferencias riel inmediato",
  },
  pagosinmediatos: {
    corto: "Madurez del riel",
    unidad: "/100",
    sirve: "Comparar la solidez del riel nacional donde usted opera.",
    claves: "riel madurez pix bre-b codi dimo interoperabilidad",
  },
  efectivocomercio: {
    corto: "Resistencia del efectivo",
    unidad: "%",
    sirve: "Dimensionar cuánto efectivo queda por digitalizar en el comercio.",
    claves: "efectivo cash comercio costumbre",
  },
  interopxb: {
    corto: "Interop. transfronteriza",
    unidad: "/100",
    sirve: "Evaluar opciones de pagos y remesas entre países.",
    claves: "remesas transfronterizo frontera stablecoins interledger",
  },
  fintechs: {
    corto: "Fintech activas",
    unidad: "",
    sirve: "Dimensionar competidores y posibles socios.",
    claves: "fintech startups ecosistema finnovista",
  },
  vc: {
    corto: "Capital de riesgo",
    unidad: "US$ M",
    sirve: "Estimar el capital disponible para escalar soluciones.",
    claves: "venture capital inversión vc rondas",
  },
  basel: {
    corto: "Riesgo de lavado",
    unidad: "/10",
    sirve: "Calibrar controles de prevención de lavado frente a la región.",
    claves: "lavado aml sarlaft uiaf basel",
  },
  conversionestafa: {
    corto: "Estafa telefónica",
    unidad: "%",
    sirve: "Priorizar educación y controles contra la ingeniería social.",
    claves: "estafa fraude teléfono ingeniería social",
  },
  chainalysis: {
    corto: "Adopción cripto",
    unidad: "#",
    sirve: "Leer la demanda local de activos digitales.",
    claves: "cripto bitcoin stablecoins adopción chainalysis",
  },
  regulacion: {
    corto: "Regulación cripto",
    unidad: "/100",
    sirve: "Anticipar el marco para productos con activos digitales.",
    claves: "regulación cripto activos digitales tokenización ley",
  },
  openfinance: {
    corto: "Open Finance",
    unidad: "/100",
    sirve: "Planear APIs, consentimiento y portabilidad de datos.",
    claves: "open finance datos abiertos apis consentimiento",
  },
  marcofintech: {
    corto: "Marco fintech",
    unidad: "/100",
    sirve: "Evaluar la facilidad para pilotar y escalar en cada país.",
    claves: "sandbox regulación fintech ley datos personales",
  },
};

export interface Perfil {
  key: string;
  label: string;
  quien: string;
  para: string;
  indicadores: string[];
}

export const PERFILES: Perfil[] = [
  {
    key: "banca",
    label: "Banca",
    quien: "Usted dirige producto, riesgo o innovación en un banco.",
    para: "Le muestran dónde crecer, cómo competir en pagos y qué riesgos vigilar.",
    indicadores: ["credito", "pagosadulto", "conversionestafa", "openfinance"],
  },
  {
    key: "fintech",
    label: "Fintech",
    quien: "Usted fundó o dirige una fintech.",
    para: "Úselos para dimensionar el mercado, conseguir capital y preparar su paso por el sandbox.",
    indicadores: ["fintechs", "vc", "marcofintech", "merchantpay"],
  },
  {
    key: "regulador",
    label: "Regulador",
    quien: "Usted diseña política pública o supervisa el sistema.",
    para: "Le muestran brechas de inclusión, rezagos de pagos y madurez regulatoria.",
    indicadores: ["brechagenero", "cuenta", "interopxb", "regulacion"],
  },
  {
    key: "investigacion",
    label: "Investigación",
    quien: "Usted investiga o enseña finanzas.",
    para: "Indicadores con fuente, año y dirección documentados para replicar el índice.",
    indicadores: ["pagodigital", "basel", "pagosinmediatos", "efectivocomercio"],
  },
];

export interface EntradaBitacora {
  fecha: string;
  texto: string;
  /** Indicador que abre la ficha; si falta, enlaza a la auditoría. */
  indicador?: string;
  pilar: PilarKey;
}

/** Resumen de /metodologia#auditoria. Al publicar un corte nuevo, actualizar ambos. */
export const BITACORA: EntradaBitacora[] = [
  { fecha: "17 sep 2026", texto: "Bre-B sube de 44 a 70 pagos por adulto al año", indicador: "pagosadulto", pilar: "pagos" },
  { fecha: "17 sep 2026", texto: "Argentina sube de 237 a 252 pagos inmediatos por adulto", indicador: "pagosadulto", pilar: "pagos" },
  { fecha: "17 sep 2026", texto: "RWA tokenizados: de US$34.000 M a US$38.500 M", indicador: "regulacion", pilar: "tokenizacion" },
  { fecha: "31 ago 2026", texto: "La SFC publica el proyecto de cronograma de Open Finance", indicador: "openfinance", pilar: "regulacion" },
  { fecha: "20 jul 2026", texto: "VC regional del segundo trimestre: US$1.360 M", indicador: "vc", pilar: "adopcion" },
  { fecha: "26 jul 2026", texto: "Corrección: PIX pasa de 498 a 502 pagos por adulto", indicador: "pagosadulto", pilar: "pagos" },
  { fecha: "ago 2026", texto: "Se incorpora el informe Cambridge CCAF 2026 como referente", pilar: "adopcion" },
];

/** Atajos de búsqueda del héroe. */
export const SUGERENCIAS = [
  { label: "Bre-B", q: "bre-b" },
  { label: "Open Finance", q: "open finance" },
  { label: "Riesgo de lavado", q: "lavado" },
  { label: "Brecha de género", q: "género" },
];
