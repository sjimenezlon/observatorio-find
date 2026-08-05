// =============================================================================
// Lentes por actor, presets de índice y dinámica del ecosistema
// Permite que el observatorio no sea un bloque genérico: cada actor ve el
// ecosistema desde su prioridad, y el índice se puede leer en clave de
// tecnología o de impacto/desarrollo.
// =============================================================================

import { PilarKey } from "./dataset";

export type Pesos = Record<PilarKey, number>;

// --- Presets de índice (tecnología ↔ impacto) -------------------------------
export interface Preset {
  key: string;
  label: string;
  desc: string;
  pesos: Pesos;
}

export const PRESETS: Preset[] = [
  {
    key: "balanceado",
    label: "Balanceado",
    desc: "Los seis pilares pesan igual. La mirada neutral por defecto.",
    pesos: { inclusion: 17, pagos: 17, adopcion: 17, fraude: 16, tokenizacion: 16, regulacion: 17 },
  },
  {
    key: "tecnologico",
    label: "Tecnológico",
    desc: "Prioriza adopción de IA, seguridad y tokenización: qué tan lejos llegó la tecnología.",
    pesos: { inclusion: 8, pagos: 17, adopcion: 27, fraude: 20, tokenizacion: 20, regulacion: 8 },
  },
  {
    key: "pagos",
    label: "Pagos & confianza",
    desc: "Prioriza los rieles de pago y la integridad frente al usuario: la lectura de quien construye infraestructura de pagos.",
    pesos: { inclusion: 15, pagos: 40, adopcion: 5, fraude: 20, tokenizacion: 5, regulacion: 15 },
  },
  {
    key: "impacto",
    label: "Impacto / Desarrollo",
    desc: "Prioriza inclusión y reglas que protegen al usuario: tecnología al servicio del desarrollo.",
    pesos: { inclusion: 40, pagos: 20, adopcion: 8, fraude: 12, tokenizacion: 4, regulacion: 16 },
  },
];

// --- Lentes por tipo de actor -----------------------------------------------
export interface Actor {
  key: string;
  label: string;
  emoji: string;
  leImporta: string;
  insight: string;
  pesos: Pesos;
}

export const ACTORES: Actor[] = [
  {
    key: "inversionista",
    label: "Inversionista",
    emoji: "📈",
    leImporta: "Tamaño de mercado, crecimiento, capital y velocidad de adopción.",
    insight:
      "El capital premia la escala: Brasil y México concentran ~73% del VC de LATAM (US$3.012M de US$4.126M en 2025), pero las brechas de inclusión marcan dónde está el mercado todavía sin atender.",
    pesos: { inclusion: 12, pagos: 15, adopcion: 30, fraude: 13, tokenizacion: 20, regulacion: 10 },
  },
  {
    key: "banco",
    label: "Banco (incumbente)",
    emoji: "🏛️",
    leImporta: "Ciberseguridad, cumplimiento cambiante, eficiencia y conocer al cliente con data.",
    insight:
      "El reto del incumbente no es innovar solo: el 61% de las fintech de LatAm ya colabora con la banca. Tu ventaja es el dato y la confianza; tu frente abierto, fraude y regulación.",
    pesos: { inclusion: 8, pagos: 20, adopcion: 20, fraude: 27, tokenizacion: 8, regulacion: 17 },
  },
  {
    key: "fintech",
    label: "Fintech (retador)",
    emoji: "🚀",
    leImporta: "Mercado desatendido, experiencia de usuario, cumplimiento y rentabilidad a escala.",
    insight:
      "El unbundling abrió el mercado y el rebundling lo reorganiza. La inclusión es tu cancha y la regulación tu boleto de entrada; el mito de la alta mortalidad ya cedió a la consolidación.",
    pesos: { inclusion: 25, pagos: 20, adopcion: 17, fraude: 12, tokenizacion: 8, regulacion: 18 },
  },
  {
    key: "regulador",
    label: "Regulador",
    emoji: "⚖️",
    leImporta: "Estabilidad, AML, protección al consumidor e inclusión como política pública.",
    insight:
      "Rieles instantáneos como Bre-B colapsan las ventanas de respuesta. La pregunta de política: ¿la regulación de fraude y datos avanza al ritmo de la innovación?",
    pesos: { inclusion: 20, pagos: 18, adopcion: 8, fraude: 27, tokenizacion: 4, regulacion: 23 },
  },
  {
    key: "gremio",
    label: "Gremio / Asociación",
    emoji: "🤝",
    leImporta: "Visión de ecosistema, vocería y colaboración banca-fintech.",
    insight:
      "La tensión banca vs. fintech es vieja; el dato nuevo es que ya colaboran. El rol del gremio es convertir esa colaboración en estándar de mercado.",
    pesos: { inclusion: 17, pagos: 17, adopcion: 17, fraude: 16, tokenizacion: 16, regulacion: 17 },
  },
  {
    key: "infraestructura",
    label: "Infraestructura de pagos",
    emoji: "🔗",
    leImporta: "Interoperabilidad, costo por transacción, estándares abiertos y alcance transfronterizo.",
    insight:
      "El riel más usado del mundo por habitante es latinoamericano (Pix, 298 pagos por persona), pero ninguno de los seis países tiene interoperabilidad transfronteriza nativa: la región resolvió el pago doméstico y dejó intacto el cruce de frontera, donde las remesas todavía cuestan más que la meta de los ODS.",
    pesos: { inclusion: 15, pagos: 45, adopcion: 5, fraude: 20, tokenizacion: 5, regulacion: 10 },
  },
  {
    key: "academia",
    label: "Academia",
    emoji: "🎓",
    leImporta: "Rigor, metodología, evidencia y formación de talento.",
    insight:
      "Aquí el diferencial es el rigor: metodología abierta, datos citados y preguntas que el mercado no se hace. Descargá el dataset, replicá el índice y desafialo.",
    pesos: { inclusion: 17, pagos: 17, adopcion: 17, fraude: 16, tokenizacion: 16, regulacion: 17 },
  },
];

// --- Dinámica del ecosistema: incumbentes vs. retadores ---------------------
export interface FilaDinamica {
  dim: string;
  banco: string;
  fintech: string;
}

export const DINAMICA: FilaDinamica[] = [
  {
    dim: "Origen y enfoque",
    banco: "Sistemas legacy; necesidad urgente de innovar y conocer al cliente.",
    fintech: "Creadas desde la base; obsesión por la experiencia del usuario.",
  },
  {
    dim: "Reto principal",
    banco: "Ciberseguridad, eficiencia y cumplir normativa que cambia.",
    fintech: "Alcanzar rentabilidad a escala y consolidarse.",
  },
  {
    dim: "Obsesión",
    banco: "Usar la data para conocer mejor al cliente y dar confianza.",
    fintech: "Una experiencia fluida, simple y mejor que la del banco.",
  },
  {
    dim: "Modelo de servicio",
    banco: "Servicios integrados y tradicionales (todo bajo un techo).",
    fintech: "Unbundling: servicios fragmentados (pagos, neobancos, crédito, wealth…).",
  },
];

export const DINAMICA_STATS = [
  {
    valor: "61%",
    label:
      "de las fintech de LatAm ya colabora con el sistema financiero tradicional (el 49% percibe esa relación como débil).",
    fuente: "BID / Finnovista · IV Informe Fintech en ALC",
    url: "https://www.iadb.org/en/news/study-fintech-ecosystem-latin-america-and-caribbean-exceeds-3000-startups",
  },
  {
    valor: "~5%",
    label:
      "de mortalidad fintech en México y 70% con más de 5 años: el ecosistema entró en consolidación, no en colapso.",
    fuente: "Finnovista · Fintech Radar México 2026",
    url: "https://www.latamfintech.co/reports/finnovista-fintech-radar-mexico-2026",
  },
  {
    valor: "58%",
    label:
      "de los bancos a nivel global ya usa IA generativa (vs. 45% en 2023); LatAm corre por detrás.",
    fuente: "NTT DATA · Intelligent Banking in the Age of AI",
    url: "https://www.nttdata.com/global/en/news/press-release/2025/february/021001",
  },
];

// --- Tendencias que monitorea el observatorio -------------------------------
export interface Tendencia {
  tema: string;
  nota: string;
  color: string;
}

export const TENDENCIAS: Tendencia[] = [
  { tema: "Regulación", nota: "El punto de dolor y la conversación de fondo entre todos los actores.", color: "#E8B452" },
  { tema: "Prevención de fraude", nota: "Rieles instantáneos colapsan las ventanas de respuesta.", color: "#6C5CD6" },
  { tema: "Scoring alternativo", nota: "Datos del presente para incluir a los invisibles del crédito.", color: "#1FC9A0" },
  { tema: "Tokenización & stablecoins", nota: "De experimento a infraestructura: RWA on-chain ~US$34B y pagos con stablecoins +81% i.a. (Bitso, H1-2026).", color: "#5BD0E0" },
  { tema: "Adopción de IA", nota: "De copilotos a agentes: ya son el 31% de los nuevos casos de uso en los grandes bancos.", color: "#9FCE2E" },
  { tema: "Sostenibilidad & ESG", nota: "En Colombia ~22% de la cartera bancaria ya es sostenible; 76% integra ASG.", color: "#2dd4a7" },
];

export const ESG_NOTA = {
  fuente: "Asobancaria · Objetivos de Finanzas Sostenibles",
  url: "https://www.lafm.com.co/economia/uno-de-cada-cinco-pesos-prestados-por-la-banca-se-destina-a-proyectos-sostenibles-asobancaria",
};
