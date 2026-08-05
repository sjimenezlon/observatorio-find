// =============================================================================
// Colombia · hoy (2024–2026) frente al escenario 2030
//
// Procedencia: el mapa de innovación financiera, inclusión y acceso al crédito
// de Santiago Jiménez Londoño (corte julio de 2026), construido sobre Findex,
// IFC/SME Finance Forum, SFC y Banca de las Oportunidades, Banco de la
// República, KPMG, McKinsey, ACI Worldwide, BIS/MAS y URF/DNP.
//
// Dos ajustes sobre el material original, para que no contradiga lo que este
// observatorio ya verificó en su corte de julio de 2026:
//   · cripto: el PL 510/2025 no está "en trámite" — fue archivado el 20-jun-2026
//     por tránsito de legislatura, el cuarto intento fallido.
//   · pagos: Bre-B pasó de 5 M de transacciones diarias a 5,2 M el 31-ene-2026.
//
// El índice cualitativo de madurez por área es interpretación del autor: ilustra
// brechas relativas, no es una métrica oficial.
// =============================================================================

export interface CifraContexto {
  valor: string;
  label: string;
  fuente: string;
  ambito: "mundo" | "colombia";
}

export const CONTEXTO_BRECHA: CifraContexto[] = [
  {
    valor: "1.300 M",
    label: "adultos sin cuenta financiera en el mundo",
    fuente: "Global Findex 2025",
    ambito: "mundo",
  },
  {
    valor: "US$5,7 B",
    label:
      "de brecha de financiamiento MiPyme global — cerca del 19% del PIB de los países en desarrollo",
    fuente: "IFC / SME Finance Forum",
    ambito: "mundo",
  },
  {
    valor: "35,5%",
    label: "de los adultos colombianos tiene algún crédito formal vigente",
    fuente: "SFC / Banca de las Oportunidades, Reporte de Inclusión Financiera 2024",
    ambito: "colombia",
  },
  {
    valor: ">52%",
    label: "del financiamiento de las microempresas colombianas es informal",
    fuente: "La República; El Nuevo Siglo (2024–2025)",
    ambito: "colombia",
  },
  {
    valor: "382%",
    label:
      "es la tasa anual promedio del 'gota a gota', frente al 36,9% de la tasa de usura legal",
    fuente: "La República; Banco de la República (2024–2025)",
    ambito: "colombia",
  },
];

// -----------------------------------------------------------------------------
// El contraste que ordena todo el módulo: la oferta cuenta productos, la
// demanda cuenta personas. No es que una fuente esté mal — miden cosas
// distintas, y la distancia entre ambas ES la inclusión de papel.
// -----------------------------------------------------------------------------

export interface ParOfertaDemanda {
  tema: string;
  oferta: { valor: number; unidad: string; label: string; fuente: string };
  demanda: { valor: number; unidad: string; label: string; fuente: string };
  lectura: string;
}

export const OFERTA_DEMANDA: ParOfertaDemanda[] = [
  {
    tema: "Tenencia de producto vs. tenencia de cuenta",
    oferta: {
      valor: 96.3,
      unidad: "%",
      label: "de los adultos tiene algún producto financiero",
      fuente: "SFC / Banca de las Oportunidades, 2024 — registros de las entidades",
    },
    demanda: {
      valor: 57.1,
      unidad: "%",
      label: "de los adultos declara tener una cuenta",
      fuente: "Global Findex 2025 (datos 2024) — encuesta a personas",
    },
    lectura:
      "39 puntos de distancia entre lo que el sistema abrió y lo que la gente reconoce como suyo. El supervisor cuenta productos vigentes —incluidos los inactivos y los múltiples por persona—; la encuesta le pregunta a la persona. Ninguna cifra es falsa: la brecha entre ambas es el indicador.",
  },
  {
    tema: "Crédito: stock vs. uso en el último año",
    oferta: {
      valor: 35.5,
      unidad: "%",
      label: "de los adultos tiene un crédito formal vigente",
      fuente: "SFC / Banca de las Oportunidades, 2024",
    },
    demanda: {
      valor: 12.4,
      unidad: "%",
      label: "tomó prestado de una entidad formal en los últimos 12 meses",
      fuente: "Global Findex 2025 · fin22a",
    },
    lectura:
      "Aquí las definiciones sí difieren de raíz —stock de productos frente a flujo anual— y por eso no se restan. Lo comparable es otra cosa: de cada 100 colombianos que se endeudaron por cualquier vía, solo 26,8 acudieron al sistema formal. El resto fue a la familia, al prestamista o al 'gota a gota' al 382%.",
  },
];

// -----------------------------------------------------------------------------
// Siete áreas de innovación: dónde está Colombia y qué haría falta a 2030.
// -----------------------------------------------------------------------------

export type Prioridad = "ALTA" | "MEDIA";

export interface AreaBrecha {
  area: string;
  /** madurez relativa 0–100, interpretación del autor */
  hoy: number;
  meta: number;
  estadoHoy: string;
  escenario2030: string;
  prioridad: Prioridad;
  palanca: string;
  /** indicador del observatorio que ya mide esta área, si existe */
  midePor?: string;
}

export const AREAS_BRECHA: AreaBrecha[] = [
  {
    area: "Pagos instantáneos",
    hoy: 65,
    meta: 90,
    estadoHoy:
      "Bre-B en operación con adopción acelerada —5,2 millones de transacciones en un solo día (31-ene-2026)— pero sin interoperabilidad transfronteriza.",
    escenario2030:
      "Bre-B masificado, pagos recurrentes y conexión regional tipo Nexus; efectivo en retroceso.",
    prioridad: "MEDIA",
    palanca: "Escalar uso, integrar remesas y comercios.",
    midePor: "pagosadulto · pagosinmediatos · interopxb",
  },
  {
    area: "Open finance",
    hoy: 45,
    meta: 90,
    estadoHoy:
      "Régimen obligatorio recién adoptado (Decreto 0368/2026); implementación inicial y cronograma de estándares de la SFC antes de octubre de 2026.",
    escenario2030:
      "Consentimientos y APIs a escala; iniciación de pagos y portabilidad plenas.",
    prioridad: "ALTA",
    palanca: "Ejecutar el estándar y activar casos de uso de crédito.",
    midePor: "openfinance",
  },
  {
    area: "Crédito digital y datos alternativos",
    hoy: 30,
    meta: 80,
    estadoHoy:
      "Crédito formal al 35,5% de los adultos según la SFC, pero solo 26,8 de cada 100 endeudados usa el sistema formal; scoring alternativo incipiente.",
    escenario2030:
      "Crédito asequible para población 'thin-file'; retroceso del 'gota a gota'.",
    prioridad: "ALTA",
    palanca: "Combinar open finance + IA para profundizar crédito.",
    midePor: "formalidadCredito · creditoDeposito (ICF)",
  },
  {
    area: "IA en finanzas",
    hoy: 35,
    meta: 80,
    estadoHoy:
      "Uso creciente en bancos y fintech, pero solo política pública (CONPES 4144), sin regla vinculante de explicabilidad ni de sesgo.",
    escenario2030:
      "Asesoría automatizada masiva y agentes; regulación de explicabilidad y sesgo.",
    prioridad: "ALTA",
    palanca: "Pasar de soft law a norma sectorial exigible.",
    midePor: "marcofintech · pilar de adopción",
  },
  {
    area: "Embedded finance / BaaS",
    hoy: 30,
    meta: 70,
    estadoHoy: "Integraciones incipientes en comercio y movilidad.",
    escenario2030:
      "Servicios financieros ubicuos en plataformas cotidianas.",
    prioridad: "MEDIA",
    palanca: "Apoyarse en finanzas abiertas y protección al consumidor.",
  },
  {
    area: "Cripto, stablecoins y tokenización",
    hoy: 25,
    meta: 75,
    estadoHoy:
      "Solo registro ante la UIAF y reporte a la DIAN: el PL 510/2025 de proveedores de servicios de activos virtuales fue archivado el 20-jun-2026, cuarto intento fallido.",
    escenario2030:
      "Stablecoins reguladas para remesas; tokenización de activos y microinversión.",
    prioridad: "ALTA",
    palanca: "Sancionar la ley de activos virtuales.",
    midePor: "regulacion (activos digitales)",
  },
  {
    area: "Microfinanzas y resiliencia",
    hoy: 28,
    meta: 75,
    estadoHoy:
      "Más del 52% del microcrédito es informal; el 'gota a gota' cobra 382% anual y los seguros inclusivos son escasos.",
    escenario2030:
      "Crédito formal a la economía popular y microseguros paramétricos.",
    prioridad: "ALTA",
    palanca: "Sustituir crédito informal y cubrir choques de salud y clima.",
    midePor: "formalidadCredito (ICF)",
  },
];

export const FUENTES_BRECHA = [
  { n: "Global Findex Database 2025 (Banco Mundial)", u: "https://www.worldbank.org/en/publication/globalfindex" },
  { n: "IFC / SME Finance Forum — MSME Finance Gap", u: "https://www.smefinanceforum.org/data-sites/msme-finance-gap" },
  { n: "SFC / Banca de las Oportunidades — Reporte de Inclusión Financiera 2024", u: "https://www.bancadelasoportunidades.gov.co/es/reportes-de-inclusion-financiera" },
  { n: "Banco de la República — Bre-B e indicadores de adopción", u: "https://www.banrep.gov.co/es/bre-b" },
  { n: "URF / SFC — finanzas abiertas obligatorias (Decreto 0368/2026)", u: "https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/" },
  { n: "DNP — CONPES 4144 de inteligencia artificial", u: "https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf" },
  { n: "BIS / MAS — Proyecto Nexus, pagos transfronterizos", u: "https://www.bis.org/about/bisih/topics/fmis/nexus.htm" },
];
