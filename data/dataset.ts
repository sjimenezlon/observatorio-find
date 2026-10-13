// =============================================================================
// Observatorio Find · IA Financiera LATAM
// Dataset verificado y citable — seed v4 (curado a septiembre de 2026)
//
// Metodología abierta: cada indicador declara su fuente, año y dirección.
// Los valores "construido" son índices cualitativos del Observatorio,
// documentados en /metodologia. Todo lo demás proviene de fuentes públicas
// primarias (Banco Mundial / Global Findex, Finnovista, Distrito, Basel
// Institute, Chainalysis, McKinsey, bancos centrales, LexisNexis, TransUnion).
//
// Para actualizar el observatorio: editar este archivo y volver a desplegar.
// =============================================================================

export type CC = "CO" | "MX" | "BR" | "CL" | "PE" | "AR";
export type PilarKey =
  | "inclusion"
  | "pagos"
  | "adopcion"
  | "fraude"
  | "tokenizacion"
  | "regulacion";
export type Direccion = "higher" | "lower"; // higher = más es mejor

export interface Pais {
  code: CC;
  nombre: string;
  flag: string;
}

export const PAISES: Pais[] = [
  { code: "CO", nombre: "Colombia", flag: "🇨🇴" },
  { code: "MX", nombre: "México", flag: "🇲🇽" },
  { code: "BR", nombre: "Brasil", flag: "🇧🇷" },
  { code: "CL", nombre: "Chile", flag: "🇨🇱" },
  { code: "PE", nombre: "Perú", flag: "🇵🇪" },
  { code: "AR", nombre: "Argentina", flag: "🇦🇷" },
];

export interface Pilar {
  key: PilarKey;
  nombre: string;
  corto: string;
  color: string;
  desc: string;
}

export const PILARES: Pilar[] = [
  {
    key: "inclusion",
    nombre: "Inclusión & scoring",
    corto: "Inclusión",
    color: "#12866B",
    desc: "Tenencia de cuenta, acceso a crédito formal, pagos digitales y equidad de género. Es el caso de uso del scoring con datos alternativos.",
  },
  {
    key: "pagos",
    nombre: "Pagos",
    corto: "Pagos",
    color: "#C2552C",
    desc: "Intensidad y calidad del uso de los rieles de pago: cuántas transacciones inmediatas hace cada adulto, si esos pagos llegan al comercio, cuánto efectivo resiste y si el riel cruza la frontera.",
  },
  {
    key: "adopcion",
    nombre: "Adopción de IA & ecosistema",
    corto: "Adopción IA",
    color: "#5E7F12",
    desc: "Densidad del ecosistema fintech y capital de riesgo que financia la adopción de IA en servicios financieros.",
  },
  {
    key: "fraude",
    nombre: "Fraude, AML & integridad",
    corto: "Fraude/AML",
    color: "#6C5CD6",
    desc: "Riesgo de lavado de activos y daño efectivo al usuario: qué proporción de los intentos de estafa termina en una pérdida real de dinero.",
  },
  {
    key: "tokenizacion",
    nombre: "Tokenización & cripto-activos",
    corto: "Tokenización",
    color: "#1A8597",
    desc: "Adopción de cripto-activos y madurez del marco regulatorio para tokenización de activos del mundo real (RWA).",
  },
  {
    key: "regulacion",
    nombre: "Regulación & cumplimiento",
    corto: "Regulación",
    color: "#A86B00",
    desc: "Apertura de datos (Open Finance), marco fintech, sandbox y protección de datos: las reglas que habilitan o frenan la innovación y protegen al usuario.",
  },
];

export interface Cita {
  fuente: string;
  url: string;
  anio: number;
  nota?: string;
}

export interface Override {
  anio?: number;
  nota?: string;
  fuente?: string;
  url?: string;
}

export interface Indicador {
  key: string;
  pilar: PilarKey;
  label: string;
  desc: string;
  unidad: string;
  direccion: Direccion;
  /** Índice cualitativo del Observatorio: puntaje asignado con rúbrica, no medido. */
  construido?: boolean;
  /** Aritmética del Observatorio sobre cifras publicadas por terceros (la operación va en `desc`). */
  derivado?: boolean;
  // fuente por defecto del indicador
  fuente: string;
  url: string;
  anio: number;
  valores: Record<CC, number | null>;
  overrides?: Partial<Record<CC, Override>>;
  /**
   * Valor censurado: el país está fuera de lo que la fuente publica (p. ej. fuera
   * del top 20 de un ranking) y el valor de `valores` es la cota que entra al
   * cálculo. La interfaz muestra este texto en lugar del número.
   */
  cotas?: Partial<Record<CC, string>>;
}

/** Texto a mostrar para un valor censurado (o null si el valor es un dato directo). */
export function cotaDe(ind: Indicador, cc: CC): string | null {
  return ind.cotas?.[cc] ?? null;
}

// -----------------------------------------------------------------------------
// INDICADORES
// -----------------------------------------------------------------------------

export const INDICADORES: Indicador[] = [
  // ===== PILAR 1 · INCLUSIÓN & SCORING (World Bank Global Findex 2025, datos 2024)
  {
    key: "cuenta",
    pilar: "inclusion",
    label: "Tenencia de cuenta",
    desc: "% de adultos (15+) con una cuenta en una institución financiera o proveedor de dinero móvil.",
    unidad: "%",
    direccion: "higher",
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 57.1, MX: 53.0, BR: 86.4, CL: 85.1, PE: 59.3, AR: 81.7 },
  },
  {
    key: "credito",
    pilar: "inclusion",
    label: "Crédito formal",
    desc: "% de adultos que tomó prestado de un banco u otra institución financiera formal (indicador fin22a; no incluye dinero móvil).",
    unidad: "%",
    direccion: "higher",
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 12.4, MX: 14.8, BR: 45.9, CL: 24.2, PE: 20.1, AR: 29.3 },
    overrides: { CL: { anio: 2021, nota: "Findex 2021; dato 2024 no publicado para Chile." } },
  },
  {
    key: "pagodigital",
    pilar: "inclusion",
    label: "Pago digital",
    desc: "% de adultos que hizo o recibió un pago digital en el último año.",
    unidad: "%",
    direccion: "higher",
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 49.2, MX: 41.4, BR: 77.4, CL: 84.3, PE: 51.7, AR: 72.2 },
    overrides: { CL: { anio: 2021, nota: "Findex 2021; dato 2024 no publicado para Chile." } },
  },
  {
    key: "brechagenero",
    pilar: "inclusion",
    label: "Brecha de género",
    desc: "Diferencia en puntos porcentuales en tenencia de cuenta entre hombres y mujeres (menor es mejor). Se usa el valor absoluto.",
    unidad: "pp",
    direccion: "lower",
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 12.7, MX: 11.7, BR: 8.6, CL: 3.9, PE: 6.3, AR: 5.3 },
    overrides: {
      AR: { nota: "Brecha de −5.3 pp (a favor de las mujeres); se usa el valor absoluto." },
    },
  },

  // ===== PILAR 2 · PAGOS
  // Cuatro de los cinco indicadores son de fuente primaria o aritmética directa
  // sobre fuente primaria. El quinto (interoperabilidad transfronteriza) es un
  // índice construido y se declara como tal.
  {
    key: "merchantpay",
    pilar: "pagos",
    label: "Pago digital a comercios",
    desc: "% de adultos que hizo un pago digital a un comercio en el último año. Distinto de 'hizo o recibió un pago digital': exige confiar en el comercio, en el riel y en la reversibilidad.",
    unidad: "%",
    direccion: "higher",
    fuente: "World Bank · Global Findex 2025, serie merchant.pay (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 26.1, MX: 26.0, BR: 60.2, CL: null, PE: 32.7, AR: 60.2 },
    overrides: {
      CL: {
        nota: "Chile no fue encuestado en el módulo de pagos digitales del Findex 2024: es un vacío de la fuente, no un cero. La serie merchant.pay no tiene dato para Chile en ninguna ronda del Findex.",
      },
      CO: {
        nota: "26,1% frente a 49,2% que hizo o recibió algún pago digital: menos de la mitad del uso digital de Colombia llega al comercio. La brecha más ancha de los seis.",
      },
      AR: { nota: "60,2%, empatado con Brasil en el primer lugar regional." },
    },
  },
  {
    key: "pagosadulto",
    pilar: "pagos",
    label: "Pagos inmediatos por adulto al año",
    desc: "Transacciones anuales en el riel nacional de pagos inmediatos divididas por la población adulta (15+). Aritmética del Observatorio sobre cifras oficiales de cada banco central: mismo perímetro (solo el riel inmediato) para que la comparación sea válida.",
    unidad: "tx / adulto / año",
    direccion: "higher",
    derivado: true,
    fuente: "Observatorio Find · cálculo sobre datos de bancos centrales",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    anio: 2026,
    valores: { CO: 69, MX: 73, BR: 503, CL: null, PE: 119, AR: 253 },
    overrides: {
      BR: {
        nota: "PIX: 43.996 millones de transacciones en el 1S-2026 (+19,3% i.a., BCB, Estadísticas de Pagos Minoristas) → 87.992 M anualizados ÷ 175 M de adultos = 503. En los 12 meses a agosto de 2026 el riel sumó 89.208 M. El Red Book del BIS reporta 298 pagos inmediatos por habitante en 2024, el más alto del mundo (medido por habitante, no por adulto). Récord diario: 313,3 M de transferencias el 5-dic-2025. Se usa el semestre cerrado; la serie mensual oficial está en la API Olinda del BCB (MeiosdePagamentosMensalDA).",
        url: "https://dadosabertos.bcb.gov.br/dataset/pix",
      },
      AR: {
        nota: "779 M de transferencias inmediatas «push» en pesos en agosto de 2026 (+20,3% i.a., BCRA) → 9.348 M al año ÷ 37 M de adultos = 253. El BIS ubicó a Argentina 3ª del mundo en pagos inmediatos por habitante en 2024 (149) con el mayor crecimiento global (+71%).",
        url: "https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/Informes/informe-mensual-pagos-minoristas-2026-08.pdf",
      },
      PE: {
        nota: "263 M de transacciones interoperables al mes (BCRP, dic-2025) → 3.156 M al año ÷ 26,5 M de adultos = 119. Perímetro más amplio del BCRP: el reporte oficial habla de 655 pagos digitales por adulto en 2025 (+45,8%) contando todos los medios, no solo el riel inmediato.",
        url: "https://www.bcrp.gob.pe/docs/Publicaciones/reporte-del-sistema-nacional-de-pagos/2026/marzo/rspf-marzo-2026.html",
      },
      MX: {
        nota: "SPEI: 7.300 M de operaciones de usuarios finales en 2025 (Banxico) ÷ 100 M de adultos = 73. El 75% de los adultos hizo al menos una transferencia SPEI, pero el 70–75% de los pagos del país sigue siendo en efectivo.",
        url: "https://www.banxico.org.mx/",
      },
      CO: {
        nota: "Bre-B: 7,88 M de pagos diarios en promedio entre el 13-sep y el 12-oct-2026 (236,5 M en 30 días, tablero de indicadores MOL del Banrep) → 2.877 M anualizados ÷ 41,5 M de adultos = 69. Es promedio, no pico: en agosto el promedio era ~7,1 M/día y el pico diario de octubre rozó 10,4 M. En su primer año (6-oct-2025 a 12-oct-2026) el riel acumuló 1.849 M de transacciones; en mayo de 2026 corría a 5 M/día (44 por adulto). Sigue sin interoperabilidad transfronteriza.",
        url: "https://www.banrep.gov.co/es/bre-b/indicadores-mol",
      },
      CL: {
        nota: "Chile no tiene riel de pagos inmediatos: el Informe de Sistemas de Pago de agosto de 2026 confirma que la consulta de alias/QR y APIs para llevar las TEF al comercio sigue pendiente («próximamente»). Con el perímetro amplio (tarjetas + prepago + transferencias) Chile registró 382 pagos por persona en 2025; el 77% del consumo de los hogares ya se paga con tarjeta y ~10% de las TEF va a comercios.",
        url: "https://www.bcentral.cl/contenido/-/detalle/publicaciones/politica-financiera/informe-de-sistemas-de-pago-agosto-2026",
      },
    },
  },
  {
    key: "pagosinmediatos",
    pilar: "pagos",
    label: "Madurez de pagos inmediatos",
    desc: "Índice del Observatorio (0–100) que pondera antigüedad, adopción e interoperabilidad del riel de pago instantáneo nacional.",
    unidad: "0–100",
    direccion: "higher",
    construido: true,
    fuente: "Observatorio Find · construcción propia sobre datos de bancos centrales",
    url: "https://www.bis.org/topic/payments.htm",
    anio: 2026,
    valores: { CO: 78, MX: 58, BR: 97, CL: 52, PE: 68, AR: 80 },
    overrides: {
      BR: {
        nota: "PIX (2020): +170M de usuarios; 44,0 mil millones de transacciones en el 1S-2026 (+19,3% i.a.) y R$20,2 billones movidos (+27,7% i.a. en valor); Pix Automático consolidándose.",
        url: "https://dadosabertos.bcb.gov.br/dataset/pix",
      },
      CO: {
        nota: "Bre-B (oct-2025): un año de operación, ~7,9 M de pagos diarios en promedio, más de 116 M de llaves, más de 36 M de usuarios y 245 entidades participantes, más de 172 de ellas cooperativas (Banrep, 6-oct-2026). La norma de nómina y recaudos se define a fines de 2026 para operar en 2027. Sin interoperabilidad transfronteriza.",
        url: "https://www.banrep.gov.co/es/noticias/bre-b-cumple-un-anio-en-colombia",
      },
      MX: {
        nota: "SPEI 24/7 robusto (7.300M de operaciones en 2025), pero CoDi y DiMo con baja adopción (DiMo reportaba ~11 M de usuarios activos a nov-2024, último dato público hallado); la Circular 9/2026 de Banxico estandariza la experiencia móvil con plazo 14-dic-2026.",
        url: "https://www.dimo.org.mx/",
      },
      AR: {
        nota: "Transferencias 3.0 (2021): 779 M de transferencias inmediatas «push» en pesos en ago-2026 (+20,3% i.a.) y 117,2 M de pagos QR interoperables (BCRA).",
        url: "https://www.bcra.gob.ar/archivos/Pdfs/PublicacionesEstadisticas/Informes/informe-mensual-pagos-minoristas-2026-08.pdf",
      },
      PE: {
        nota: "Yape/Plin: 263M de transacciones interoperables/mes a dic-2025 (fase 1 +51% i.a., fase 2 +87%, QR +76%). El BCRP publicó el 15-jul-2026 el Reglamento del Servicio de Pagos Inmediatos con Alias (QR y alias en moneda nacional). TAPP, el riel público, sigue en pruebas para fines de 2026.",
        url: "https://busquedas.elperuano.pe/dispositivo/NL/2534807-1",
      },
      CL: {
        nota: "TEF masivas pero solo ~10% va a comercios. El Informe de Sistemas de Pago de agosto de 2026 mantiene la consulta de alias/QR, APIs y confirmación inmediata como pendiente; también anuncia consulta de un marco para stablecoins locales hacia fines de 2026.",
        url: "https://www.bcentral.cl/contenido/-/detalle/publicaciones/politica-financiera/informe-de-sistemas-de-pago-agosto-2026",
      },
    },
  },
  {
    key: "efectivocomercio",
    pilar: "pagos",
    label: "Resistencia del efectivo en el comercio",
    desc: "% de adultos que NO usó tarjeta ni celular para ninguna compra presencial en el último año. Menor es mejor: mide cuánta gente sigue completamente fuera del pago digital en el punto de venta.",
    unidad: "%",
    direccion: "lower",
    fuente: "World Bank · Global Findex 2025, serie fin25e2b (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 33.3, MX: 30.7, BR: 28.7, CL: null, PE: 26.8, AR: 23.2 },
    overrides: {
      CO: {
        nota: "De ese grupo, el 94% dice que la razón es la costumbre (fin25e4d) y apenas el 2,7% que desconfía de pagar con tarjeta o celular. El freno del pago digital en Colombia es el hábito y la aceptación en el comercio, no el miedo.",
      },
      CL: { nota: "Sin dato: Chile no fue encuestado en el módulo de pagos presenciales del Findex 2024." },
    },
  },
  {
    key: "interopxb",
    pilar: "pagos",
    label: "Interoperabilidad transfronteriza",
    desc: "Índice del Observatorio (0–100): en qué medida el riel doméstico cruza la frontera. Combina existencia de conexión internacional, costo de las remesas hacia el país y marco para stablecoins como riel de facto.",
    unidad: "0–100",
    direccion: "higher",
    construido: true,
    fuente: "Observatorio Find · construcción propia (BIS, RPW y anuncios de bancos centrales)",
    url: "https://www.bis.org/about/bisih/topics/fmis/nexus.htm",
    anio: 2026,
    valores: { CO: 30, MX: 55, BR: 70, CL: 32, PE: 38, AR: 45 },
    overrides: {
      BR: {
        nota: "Pix Internacional es la primera oferta estructurada de pagos transfronterizos que sale de la región: comercios de Chile, Uruguay, Paraguay, Perú, Bolivia, Colombia, Argentina y México ya aceptan Pix de visitantes brasileños. El BIS estudia interconectar rieles como Pix y UPI vía Project Nexus.",
      },
      MX: {
        nota: "El corredor EE.UU.–México es el de mayor volumen del mundo: remesas por 3,5% del PIB (2025) a un costo de 2,65% (2023). Pero el valor promedio de un pago inmediato mexicano es de US$2.566 (BIS) — el segundo más alto del mundo: SPEI sigue siendo un riel mayorista de facto, no minorista.",
      },
      AR: {
        nota: "Sin acuerdo bilateral de interoperabilidad, pero con el mayor uso de stablecoins de la región como riel transfronterizo de facto; el valor promedio de su pago inmediato es de US$73, el más bajo de las jurisdicciones latinoamericanas del Red Book del BIS (solo Suecia, US$49, e India, US$21, registran menos).",
      },
      PE: {
        nota: "Comercios peruanos ya aceptan Pix de brasileños; TAPP nace con la interoperabilidad doméstica como prioridad y sin agenda transfronteriza publicada. El costo de enviar remesas al Perú (3,57%, 2023) es el más alto de los cuatro con dato (Argentina y Chile sin medición) y supera la meta ODS de 3%.",
      },
      CL: {
        nota: "Recibe Pix en comercios, pero sin riel inmediato propio no hay nada que conectar del lado chileno. Remesas casi inexistentes (0,03% del PIB).",
      },
      CO: {
        nota: "El punto ciego: Bre-B nació sin interoperabilidad transfronteriza y el propio Banco de la República la señala como pendiente, mientras las remesas ya son el 2,87% del PIB. Es el vacío más grande de los seis frente al tamaño de su diáspora.",
      },
    },
  },

  // ===== PILAR 3 · ADOPCIÓN DE IA & ECOSISTEMA
  {
    key: "fintechs",
    pilar: "adopcion",
    label: "Fintechs activas",
    desc: "Número de fintechs locales activas (componente local, sin extranjeras).",
    unidad: "fintechs",
    direccion: "higher",
    fuente: "Finnovista · Fintech Radar 2025",
    url: "https://www.finnosummit.com/en/content/finnovista-fintech-radar/",
    anio: 2025,
    valores: { CO: 410, MX: 795, BR: 1728, CL: 374, PE: 193, AR: 383 },
    overrides: {
      BR: {
        fuente: "Distrito · plataforma de datos",
        url: "https://www.distrito.me/blog/maiores-fintechs-do-mercado-brasileiro",
        anio: 2024,
        nota: "Finnovista no publica Radar Brasil; conteo de Distrito (1.728 de 13.365 startups, feb-2024). Brasil concentra ~59% de las fintechs de LATAM (Distrito Report 2025).",
      },
      MX: {
        fuente: "Finnovista · Fintech Radar México 2026",
        url: "https://www.finnosummit.com/en/radar/the-mexican-fintech-sector-enters-a-new-phase-ai-and-stablecoins-redefine-payments-in-2026/",
        anio: 2026,
        nota: "Radar México 2026 (feb-2026): 795 locales + 316 extranjeras; +1,8% frente a 781 de 2025 (cifra ajustada por Finnovista). 77% ya usa IA.",
      },
      CO: { nota: "Radar Colombia 2025; la convocatoria del Radar 2026 abrió en junio y a oct-2026 el informe no se ha publicado." },
      CL: {
        anio: 2026,
        fuente: "Finnovista · Fintech Radar Chile 2026 (con FinteChile)",
        url: "https://www.finnosummit.com/en/16-of-foreign-fintechs-operating-in-chile-come-from-mexico/",
        nota: "374 fintechs locales y 540 en total con extranjeras; el 16% de las extranjeras viene de México. En 2024 eran 348.",
      },
      PE: { anio: 2024, nota: "Finnovista Radar Perú 2024; sin edición nueva a oct-2026." },
      AR: {
        anio: 2024,
        nota: "Finnovista Radar Argentina 2024. La Cámara Argentina Fintech cuenta 939 empresas del sector (Mapa Fintech 2025, metodología distinta).",
      },
    },
  },
  {
    key: "vc",
    pilar: "adopcion",
    label: "Capital de riesgo (VC 2025)",
    desc: "Inversión de capital de riesgo (equity) captada en 2025, en US$ millones y todos los sectores, con metodología homogénea para los seis países. Fintech captó el 61% del capital regional.",
    unidad: "US$ M",
    direccion: "higher",
    fuente: "Cuántico VP · Latin America VC Report 2026",
    url: "https://reports.cuanticovp.com/latin-america-vc-report-2026/",
    anio: 2025,
    valores: { CO: 224, MX: 980, BR: 2032, CL: 249, PE: 35, AR: 172 },
    overrides: {
      BR: {
        nota: "US$2.032M en 363 deals (Crunchbase reporta US$2.100M). En 2026 CloudWalk captó R$5.500 M (~US$1.000 M) en deuda vía el FIDC Bela II.",
      },
      MX: {
        nota: "US$980M en 86 deals (Crunchbase: US$1.100M, +53%). En Q1-2026 México superó a Brasil en VC por segunda vez desde el 2T-2012; en abril de 2026 (Q2) Plata levantó US$405M (valoración US$5.000M).",
      },
      CO: {
        nota: "Equity puro. Con venture debt, el Colombia Tech Report (KPMG) suma US$857M en 131 transacciones (−8,9% vs 2024); fintech captó el 60% de ese capital y Bogotá el 81%.",
      },
      CL: { nota: "US$249M en 53 deals: tercer ecosistema regional por monto en 2025." },
      AR: { nota: "Hito 2026: Ualá levantó US$195M liderada por Allianz X (valoración US$3.200M)." },
      PE: { nota: "US$35M en 8 deals: el ecosistema más pequeño de los seis." },
    },
  },

  // ===== PILAR 4 · FRAUDE, AML & INTEGRIDAD
  {
    key: "basel",
    pilar: "fraude",
    label: "Riesgo de lavado (Basel AML)",
    desc: "Basel AML Index: puntaje de riesgo de lavado de activos de 0 (bajo) a 10 (alto). Menor es mejor.",
    unidad: "0–10",
    direccion: "lower",
    fuente: "Basel Institute on Governance · Basel AML Index 2025 (14ª ed.)",
    url: "https://index.baselgovernance.org/ranking",
    anio: 2025,
    valores: { CO: 5.05, MX: 5.52, BR: 5.4, CL: 4.28, PE: 4.88, AR: 4.44 },
    overrides: {
      CL: { nota: "El riesgo más bajo de los seis (4.28, puesto 142 de 177); el promedio global es 5.28." },
    },
  },
  {
    key: "conversionestafa",
    pilar: "fraude",
    label: "Conversión de la estafa telefónica",
    desc: "De cada 100 adultos que recibieron una llamada o SMS pidiéndoles dinero, cuántos lo enviaron. Aritmética directa sobre dos series del Findex (con22 ÷ con21): aísla la vulnerabilidad de la exposición, porque el intento lo recibe casi todo el mundo.",
    unidad: "% de las solicitudes",
    direccion: "lower",
    derivado: true,
    fuente: "World Bank · Global Findex 2025, series con21 y con22 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    valores: { CO: 4.4, MX: 3.7, BR: 2.7, CL: null, PE: 2.3, AR: 2.3 },
    overrides: {
      CO: {
        nota: "El 22,0% de los adultos recibió una solicitud de dinero por teléfono o SMS y el 0,97% envió el dinero: la conversión más alta de los seis. Recibir el intento es casi universal en la región; caer, no.",
      },
      BR: {
        nota: "La exposición más alta de los seis (29,8% recibió una solicitud) con una de las conversiones más bajas. Encaja con el reporte de GASA: el brasileño promedio enfrenta 252 intentos de estafa al año.",
      },
      CL: { nota: "Sin dato: Chile no fue encuestado en el módulo de conectividad y estafas del Findex 2024." },
    },
  },

  // ===== PILAR 5 · TOKENIZACIÓN & CRIPTO-ACTIVOS
  {
    key: "chainalysis",
    pilar: "tokenizacion",
    label: "Adopción cripto (ranking)",
    desc: "Posición en el Chainalysis Global Crypto Adoption Index (1 = mayor adopción mundial). Menor es mejor. Los países fuera del top 20 público entran al cálculo como puesto 21 (cota) y se muestran como «>20».",
    unidad: "ranking",
    direccion: "lower",
    fuente: "Chainalysis · Global Crypto Adoption Index 2026 (23-sep-2026, período jul-2025–jun-2026)",
    url: "https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/",
    anio: 2026,
    // Fuera del top 20 público = puesto 21 (cota). Antes se omitía como n/d, lo que
    // premiaba salir del ranking: Argentina subía 7,5 puntos al caer del 20º al >20.
    valores: { CO: 21, MX: 11, BR: 1, CL: 21, PE: 21, AR: 21 },
    cotas: { CO: ">20", CL: ">20", PE: ">20", AR: ">20" },
    overrides: {
      BR: { nota: "1º del mundo en 2026 (era 5º en 2025); economía cripto de US$252,5 mil M (−1,6%), la mayor de LATAM. Metodología nueva de cuatro factores (flujos de servicios, P2P, transfronterizos y saldos): los montos no se comparan con el «valor recibido» de 2025." },
      AR: { nota: "Fuera del top 20 público en 2026 (era 20º en 2025); economía cripto de US$88,5 mil M (+15,3%), la segunda de LATAM.", url: "https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/" },
      MX: { nota: "11º del mundo en 2026; US$77,6 mil M (+25,5%), 61% en stablecoins; 5º del mundo en flujos transfronterizos.", url: "https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/" },
      CO: { nota: "Fuera del top 20 público; US$29,1 mil M (+13,8%), quinta economía cripto de LATAM.", url: "https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/" },
      PE: { nota: "Fuera del top 20 público; Chainalysis no publica su volumen en 2026." },
      CL: { nota: "Fuera del top 20 público; Chainalysis no publica su volumen en 2026." },
    },
  },
  {
    key: "regulacion",
    pilar: "tokenizacion",
    label: "Madurez regulatoria de activos digitales",
    desc: "Índice del Observatorio (0–100) según el grado de marco legal vigente para proveedores de activos virtuales y tokenización.",
    unidad: "0–100",
    direccion: "higher",
    construido: true,
    fuente: "Observatorio Find · construcción propia sobre fuentes legales por país",
    url: "https://cms.law/en/int/expert-guides/cms-expert-guide-to-crypto-regulation/",
    anio: 2026,
    valores: { CO: 45, MX: 62, BR: 93, CL: 85, PE: 40, AR: 85 },
    overrides: {
      BR: {
        nota: "Resoluções BCB 519–521 vigentes desde el 2-feb-2026 (las partes cambiarias de stablecoins de la 521, desde el 4-may-2026). Los VASP en operación tienen hasta el 30-oct-2026 para solicitar la autorización; la Res. BCB 589 (23-sep-2026) movió al 6-nov-2026 la prohibición de operar con contrapartes no autorizadas y exige prueba de reservas desde el 1-ene-2027.",
      },
      CL: {
        nota: "Ley Fintec 21.521 y NCG 502 vigentes: la CMF registra y autoriza a exchanges y custodios de activos virtuales.",
      },
      AR: {
        nota: "Registro PSAV operativo (RG 1058/2025) y tokenización ampliada: la RG 1150/2026 suma valores tokenizables y prorroga el sandbox hasta dic-2027.",
      },
      MX: {
        nota: "Ley Fintech (2018) sin reformar y 'Ley Fintech 2.0' aún en discusión; Banxico mantiene el veto práctico a cripto en entidades financieras.",
      },
      CO: {
        nota: "Retroceso: el PL 510/2025 de PSAV fue archivado el 20-jun-2026 por tránsito de legislatura — cuarto intento fallido. Solo queda registro ante UIAF y SARLAFT.",
      },
      PE: { nota: "Solo régimen antilavado (Res. SBS 02648-2024); la Ley Marco de Criptoactivos tiene dictamen de la Comisión de Economía desde jun-2023, pero sigue sin votarse en el pleno." },
    },
  },

  // ===== PILAR 6 · REGULACIÓN & CUMPLIMIENTO
  {
    key: "openfinance",
    pilar: "regulacion",
    label: "Apertura de datos (Open Finance)",
    desc: "Índice del Observatorio (0–100) según la madurez del marco de Finanzas Abiertas: desde obligatorio y operativo hasta inexistente.",
    unidad: "0–100",
    direccion: "higher",
    construido: true,
    fuente: "Observatorio Find · construcción propia sobre marcos de Open Finance",
    url: "https://ozoneapi.com/blog/the-status-of-open-finance-in-latin-america-in-2025/",
    anio: 2026,
    valores: { CO: 78, MX: 55, BR: 96, CL: 82, PE: 30, AR: 38 },
    overrides: {
      BR: {
        nota: "Más de 128M de consentimientos activos y portabilidad de crédito operativa desde feb-2026; consignado programado para nov-2026. El más maduro de la región.",
      },
      CL: {
        nota: "La NCG 569 (jun-2026) completó las reglas técnicas del Sistema de Finanzas Abiertas; entrada en vigencia fijada para julio de 2027.",
      },
      MX: {
        nota: "Ocho años sin reglas para datos transaccionales del Art. 76; en dic-2025 se presentó un amparo por omisión regulatoria contra CNBV, SHCP y Banxico.",
      },
      CO: {
        nota: "Salto regulatorio: el Decreto 0368 (abr-2026) volvió obligatorias las finanzas abiertas. El 31-ago-2026 la SFC sacó a comentarios el proyecto de cronograma de estándares (plazo 15-sep-2026): portabilidad de crédito de consumo a 8 meses, hipotecario a 16 y comercial a 24; el resto se escala hasta iniciación de pagos. Aún es proyecto, no cronograma definitivo.",
        url: "https://www.superfinanciera.gov.co/publicaciones/10116237/proyecto-de-carta-circular-agosto-31-de-2026/",
      },
      PE: {
        nota: "La SBS publicó su hoja de ruta oficial en feb-2026: regulación 2026-2027, open banking 2027-2029 y open finance pleno desde 2029.",
      },
      AR: {
        nota: "El Decreto 353/2025 creó el Sistema de Finanzas Abiertas, pero a jul-2026 el BCRA no publica estándares ni cronograma; operación estimada 2026-2027.",
      },
    },
  },
  {
    key: "marcofintech",
    pilar: "regulacion",
    label: "Marco fintech, sandbox y datos",
    desc: "Índice del Observatorio (0–100) que combina ley fintech específica, sandbox regulatorio activo y ley de protección de datos personales.",
    unidad: "0–100",
    direccion: "higher",
    construido: true,
    fuente: "Observatorio Find · construcción propia sobre fuentes legales por país",
    url: "https://iclg.com/practice-areas/fintech-laws-and-regulations",
    anio: 2026,
    valores: { CO: 62, MX: 85, BR: 85, CL: 80, PE: 50, AR: 42 },
    overrides: {
      MX: { nota: "Ley Fintech (2018) + sandbox 'Modelos Novedosos' + nueva ley de datos (2025)." },
      CL: { nota: "Ley Fintec 21.521 (2023) + NCG 502 (registro y autorización de servicios fintech, cripto incluido) + Ley 21.719 de datos (rige desde el 1-dic-2026); sin sandbox formal." },
      BR: { nota: "Sin ley fintech única, pero con sandbox (BCB/CVM), LGPD y cripto integral (Lei 14.478)." },
      CO: { nota: "Sandbox laArenera (SFC) + Ley 1581 de datos; sin ley fintech integral." },
      PE: { nota: "Sandbox de la SBS + Ley 29.733 de datos; sin ley fintech integral." },
      AR: { nota: "Ley 25.326 de datos; sin ley fintech ni sandbox formal." },
    },
  },
];

// -----------------------------------------------------------------------------
// BRECHA · LatAm vs. el Mundo
// Comparación de los 6 países (promedio simple, salvo nota) contra referencias
// globales. El motor de contenido del observatorio: dónde estamos rezagados.
// -----------------------------------------------------------------------------

export interface Benchmark {
  key: string;
  label: string;
  unidad: string;
  mejorAlto: boolean; // true = más alto es mejor
  latam: number;
  mundo: number | null;
  altos: number | null;
  fuente: string;
  url: string;
  anio: number;
  lectura: string;
}

export const BENCHMARKS: Benchmark[] = [
  {
    key: "cuenta",
    label: "Tenencia de cuenta",
    unidad: "% adultos",
    mejorAlto: true,
    latam: 70.4,
    mundo: 78.7,
    altos: 94.9,
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    lectura:
      "Los 6 países promedian 70%: ~8 pp bajo el mundo y ~25 pp bajo los países de altos ingresos. La inclusión sigue siendo la gran brecha.",
  },
  {
    key: "genero",
    label: "Brecha de género en cuenta",
    unidad: "pp (menor mejor)",
    mejorAlto: false,
    latam: 8.1,
    mundo: 4.2,
    altos: 0.8,
    fuente: "World Bank · Global Findex 2025 (datos 2024)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
    lectura:
      "La brecha de género promedio de los seis países casi duplica la mundial (8,1 vs 4,2 pp): una fractura que el scoring con datos alternativos puede atacar.",
  },
  {
    key: "ia_valor",
    label: "Valor capturado de la IA",
    unidad: "% organizaciones",
    mejorAlto: true,
    latam: 23,
    mundo: null,
    altos: null,
    fuente: "WEF / McKinsey · Latin America in the Intelligent Age (ene-2026)",
    url: "https://reports.weforum.org/docs/WEF_Latin_America_Intelligent_Age.pdf",
    anio: 2026,
    lectura:
      "Solo el 23% de las organizaciones de LatAm genera algún valor económico con IA — y apenas el 6%, valor significativo (encuesta ago–oct 2025). El contraste global: 88% de las organizaciones del mundo ya usa IA en al menos una función (McKinsey State of AI).",
  },
  {
    key: "cripto_top20",
    label: "Países en el top-20 mundial de adopción cripto",
    unidad: "de 6",
    mejorAlto: true,
    latam: 2,
    mundo: null,
    altos: null,
    fuente: "Chainalysis · Global Crypto Adoption Index 2025",
    url: "https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/",
    anio: 2025,
    lectura:
      "Solo Brasil (5) y Argentina (20) figuran en el top-20 mundial; los otros cuatro quedan fuera del radar global de adopción cripto.",
  },
];

// -----------------------------------------------------------------------------
// CIFRAS ANCLA REGIONALES / GLOBALES (para el hero y la sección de contexto)
// -----------------------------------------------------------------------------

export interface Ancla {
  valor: string;
  label: string;
  /** Versión breve para la portada (misma cifra, sin contexto). */
  corto?: string;
  /** Emisor en una o dos palabras, para la etiqueta de la tarjeta. */
  emisor?: string;
  fuente: string;
  url: string;
  anio: number;
}

export const ANCLAS: Ancla[] = [
  {
    valor: "81% / 14%",
    corto: "de las firmas financieras encuestadas adopta IA en algún nivel y 14% se considera transformacional.",
    emisor: "Cambridge CCAF",
    label:
      "de las firmas financieras encuestadas ya adopta IA en algún nivel, pero solo 14% se considera transformacional: la brecha global ya es de ejecución, no de acceso a la tecnología.",
    fuente: "Cambridge CCAF · Global AI in Financial Services Report 2026",
    url: "https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/",
    anio: 2026,
  },
  {
    valor: "242 vs 579",
    corto: "pagos sin efectivo por habitante al año en economías emergentes frente a avanzadas.",
    emisor: "BIS",
    label:
      "pagos sin efectivo por habitante al año: economías emergentes contra avanzadas. La brecha ya no es de acceso, es de frecuencia — y dos de los tres primeros puestos del mundo en pagos inmediatos son latinoamericanos.",
    fuente: "BIS · CPMI Brief No 12, estadísticas Red Book 2024",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    anio: 2026,
  },
  {
    valor: "6 de cada 10",
    corto: "personas que se endeudaron en la economía latinoamericana típica no lo hicieron con una entidad financiera formal.",
    emisor: "Global Findex 2025",
    label:
      "personas que se endeudaron en la economía latinoamericana típica no lo hicieron con un banco ni con otra entidad financiera formal (promedio simple de 21 economías: 38,8% formal). La confianza no se resuelve abriendo cuentas.",
    fuente: "Global Findex 2025 · cálculo del Observatorio sobre 21 economías",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    valor: "31%",
    corto: "de los nuevos casos de uso de IA en los 50 mayores bancos del mundo ya son agénticos.",
    emisor: "Evident AI Index",
    label: "de los nuevos casos de uso de IA en los 50 mayores bancos del mundo ya son agénticos: récord en Q1-2026, el doble que el trimestre anterior.",
    fuente: "Evident AI Index · Banking Use Case Trends Q1 2026",
    url: "https://evidentinsights.com/insights/banking-use-case-trends-q1-2026",
    anio: 2026,
  },
  {
    valor: "61%",
    corto: "de la inversión de VC en la región fue a fintech en 2025, con 29% de las operaciones.",
    emisor: "Cuántico VP",
    label: "de la inversión de VC en LATAM fue a fintech en 2025 (con solo el 29% de los deals).",
    fuente: "Cuántico VP · Latin America VC Report 2026",
    url: "https://reports.cuanticovp.com/latin-america-vc-report-2026/",
    anio: 2025,
  },
  {
    valor: "US$1.360M",
    corto: "levantó la región en el segundo trimestre de 2026, 47% más que un año antes.",
    emisor: "Crunchbase News",
    label: "levantó LATAM en Q2-2026 (+47% i.a.): US$991M late-stage (+84%) y México US$944M frente a Brasil US$350M — tercer trimestre del último año en que México lidera.",
    fuente: "Crunchbase News · LATAM Q2 2026",
    url: "https://news.crunchbase.com/venture/mexico-leads-latin-america-funding-q2-2026/",
    anio: 2026,
  },
  {
    valor: "US$38.500M",
    corto: "en activos del mundo real (RWA) tokenizados on-chain, sin contar stablecoins.",
    emisor: "rwa.xyz",
    label: "en activos del mundo real (RWA) tokenizados y distribuidos on-chain, excluyendo stablecoins (métrica «Distributed Asset Value» de rwa.xyz, leída el 17-sep-2026).",
    fuente: "rwa.xyz · dashboard en vivo (corte 17-sep-2026)",
    url: "https://app.rwa.xyz/",
    anio: 2026,
  },
  {
    valor: "81%",
    corto: "crecieron los pagos con stablecoins de Bitso Business en la región en el primer semestre de 2026.",
    emisor: "Bitso",
    label: "crecieron los pagos con stablecoins procesados por Bitso Business en LATAM en el primer semestre de 2026; más del 60% de sus nuevos clientes institucionales son bancos y entidades financieras.",
    fuente: "Bitso · Stablecoin Conference 2026",
    url: "https://www.coindesk.com/press-release/2026/06/23/bitso-unveils-the-hybrid-finance-era-as-stablecoins-reshape-global-payments",
    anio: 2026,
  },
  {
    valor: "3,68×",
    corto: "le cuesta a las entidades de Argentina, Brasil, Colombia y México cada unidad de dinero perdida por fraude.",
    emisor: "LexisNexis",
    label: "cuesta a las entidades financieras de Argentina, Brasil, Colombia y México cada peso o real perdido por fraude, con las tácticas impulsadas por IA como eje del nuevo estudio.",
    fuente: "LexisNexis · True Cost of Fraud LATAM 2026 (121 ejecutivos)",
    url: "https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20260511-tcof-mexico",
    anio: 2026,
  },
];

// Fuentes consultadas (para el pie y la página de metodología)
export interface FuenteRef {
  nombre: string;
  url: string;
  nota: string;
}

export const FUENTES: FuenteRef[] = [
  {
    nombre: "Cambridge CCAF · Global AI in Financial Services Report 2026",
    url: "https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/",
    nota: "Benchmark global de adopción, impacto y riesgo de IA en finanzas: 628 organizaciones en 151 jurisdicciones; 81% de las firmas adopta IA y 14% reporta transformación.",
  },
  {
    nombre: "World Bank · The Global Findex Database 2025",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    nota: "Fuente primaria del pilar de inclusión. Datos de encuesta 2024, 141 economías. Extraídos vía API oficial del Banco Mundial.",
  },
  {
    nombre: "Finnovista · Fintech Radar",
    url: "https://www.finnosummit.com/en/content/finnovista-fintech-radar/",
    nota: "Conteo de fintechs por país (México, Colombia, Chile 2025; Perú, Argentina 2024).",
  },
  {
    nombre: "Distrito · Fintech Report 2025",
    url: "https://materiais.distrito.me/fintech-report-2025",
    nota: "Conteo de fintechs en Brasil y universo LATAM (>3.000).",
  },
  {
    nombre: "Evident AI Index · Banking Use Case Trends Q1 2026",
    url: "https://evidentinsights.com/insights/banking-use-case-trends-q1-2026",
    nota: "Adopción de IA agéntica en los 50 mayores bancos del mundo (31% de los nuevos casos de uso en Q1-2026).",
  },
  {
    nombre: "Cuántico VP · Latin America VC Report 2026",
    url: "https://reports.cuanticovp.com/latin-america-vc-report-2026/",
    nota: "VC 2025 por país con metodología homogénea (equity) y participación fintech (61% del capital, 29% de los deals).",
  },
  {
    nombre: "Crunchbase News · LATAM (2025, Q1 y Q2-2026)",
    url: "https://news.crunchbase.com/venture/mexico-leads-latin-america-funding-q2-2026/",
    nota: "VC LATAM 2025 (US$4.100M, +14%), Q1-2026 (US$1.030M; late-stage +158%) y Q2-2026 (US$1.360M, +47% i.a.; late-stage US$991M, +84%; México US$944M vs Brasil US$350M).",
  },
  {
    nombre: "Basel Institute on Governance · Basel AML Index 2025 (14ª ed.)",
    url: "https://index.baselgovernance.org/ranking",
    nota: "Puntaje de riesgo de lavado de activos por jurisdicción (0–10), 177 jurisdicciones. Última edición disponible.",
  },
  {
    nombre: "LexisNexis Risk Solutions · True Cost of Fraud LATAM 2026",
    url: "https://risk.lexisnexis.com/global/en/about-us/press-room/press-release/20260511-tcof-mexico",
    nota: "Multiplicador del costo del fraude en LATAM (3,68×), con tácticas impulsadas por IA como eje. 121 ejecutivos en AR, BR, CO, MX.",
  },
  {
    nombre: "TransUnion · Top Fraud Trends Report (H1 2026)",
    url: "https://newsroom.transunion.com/h1-2026-update-to-the-top-fraud-trends-report/",
    nota: "8,3% de los intentos de apertura de cuenta en 2025 fueron fraude sospechado (+18% i.a.).",
  },
  {
    nombre: "Chainalysis · Global Crypto Adoption Index 2025 y Geography of Crypto",
    url: "https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/",
    nota: "Ranking de adopción por país (top 20) y volúmenes cripto recibidos por país en LATAM (oct-2025).",
  },
  {
    nombre: "rwa.xyz · Tokenized RWA dashboard",
    url: "https://app.rwa.xyz/",
    nota: "Valor en vivo de activos del mundo real tokenizados on-chain (~US$38,5B al 17-sep-2026, excl. stablecoins).",
  },
  {
    nombre: "Bitso · Stablecoin Conference 2026",
    url: "https://www.coindesk.com/press-release/2026/06/23/bitso-unveils-the-hybrid-finance-era-as-stablecoins-reshape-global-payments",
    nota: "Pagos con stablecoins en LATAM +81% i.a. en H1-2026; TPV anualizado US$82B en 2025.",
  },
  {
    nombre: "BIS · CPMI Red Book statistics 2024 (CPMI Brief No 12, abr-2026)",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    nota: "Pagos sin efectivo por habitante (242 en emergentes vs 579 en avanzadas), participación de los pagos inmediatos (49% del total en emergentes) y pagos inmediatos por habitante por jurisdicción: Brasil 298, Corea 189, Argentina 149. Cubre solo las 26 jurisdicciones del CPMI.",
  },
  {
    nombre: "IMF · Financial Access Survey 2024 (vía API del Banco Mundial)",
    url: "https://data.worldbank.org/indicator/FB.CBK.BRWR.P3",
    nota: "Prestatarios y depositantes de bancos comerciales por 1.000 adultos. Insumo del indicador derivado de crédito por cada 100 depósitos. México y Chile no reportan depositantes.",
  },
  {
    nombre: "World Bank · Remittance Prices Worldwide",
    url: "https://remittanceprices.worldbank.org/",
    nota: "Costo de enviar US$200 por corredor y por país receptor (2023); promedio global SmaRT 3,29% y remesas digitales 4,59% en el 3T-2025, contra la meta 10.c de los ODS de 3% a 2030.",
  },
  {
    nombre: "Edelman Trust Barometer 2026 · Financial Services",
    url: "https://www.edelmansmithfield.com/2026-Edelman-Trust-Barometer-Key-Insights-for-Financial-Services",
    nota: "Confianza en el sector financiero: 63% global, bancos 65%, cripto 41%; 73% en países en desarrollo vs 53% en desarrollados; 13 puntos de brecha por ingreso. 33.938 encuestas en 28 países (oct–nov 2025), ninguno andino — de ahí la necesidad del ICF.",
  },
  {
    nombre: "GASA · Global State of Scams Report 2025",
    url: "https://gasa.org/knowledge-base/blog/global-scams-on-the-rise-over-half-of-adults-worldwide-report-scam-encounters",
    nota: "US$442.000 M perdidos por estafas en 42 países; 23% de los encuestados perdió dinero; Sudamérica es la región más expuesta (72% tuvo un encuentro). Metodología de encuesta propia, no de incidencia oficial.",
  },
  {
    nombre: "Bancos centrales (rieles instantáneos)",
    url: "https://www.banrep.gov.co/es/bre-b",
    nota: "Banco de la República (Bre-B: 7,9M tx/día promedio y >116M de llaves a oct-2026), Banxico (SPEI: 7.300M de operaciones en 2025), BCB (PIX: 43.996M tx en 1S-2026), BCRP (263M tx interoperables/mes; Reglamento de alias 15-jul-2026), BCRA (779M transferencias inmediatas en ago-2026), BCCh (Informe de Sistemas de Pago ago-2026: consulta de alias/QR aún pendiente). Insumos del indicador de pagos inmediatos por adulto.",
  },
  {
    nombre: "Marcos regulatorios oficiales",
    url: "https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/",
    nota: "Decreto 0368/2026 (CO), Resoluções BCB 519–521 (BR), RG CNV 1150/2026 (AR), NCG 569 CMF (CL), hoja de ruta SBS (PE), Ley Fintech/LRITF (MX).",
  },
];

// -----------------------------------------------------------------------------
// Corte anterior del IMIAF (pesos iguales, 20% c/u) para mostrar evolución.
// Se actualiza en cada corte: copiar aquí los puntajes del corte que se retira.
// -----------------------------------------------------------------------------

export const SNAPSHOT_ANTERIOR: { fecha: string; scores: Record<CC, number> } = {
  fecha: "sep-2026",
  scores: { BR: 85.9, CL: 60.7, AR: 48.5, MX: 32.4, CO: 19.8, PE: 25.0 },
};

// El corte v4.5 cambia el método del ranking cripto (fuera del top 20 = cota 21,
// antes n/d): los deltas frente a septiembre mezclan dato y método. La
// normalización sigue siendo relativa: un país puede bajar aunque mejore.
export const SNAPSHOT_COMPARABLE = false;

export const META = {
  version: "v4.5",
  curado: "octubre de 2026",
  auditoria: "13 de octubre de 2026",
  marca: "Observatorio Find",
  institucion: "Universidad EAFIT",
  pilares: PILARES.length,
  indicadores: INDICADORES.length,
};

export const NOVEDADES_CORTE: { cifra: string; texto: string; href: string }[] = [
  {
    cifra: "1º",
    texto: "Brasil encabeza el índice de adopción cripto 2026 de Chainalysis; México 11º y Argentina sale del top 20",
    href: "/indice#datos",
  },
  {
    cifra: "69",
    texto: "pagos Bre-B por adulto con el promedio oficial del Banrep (7,88 M/día). Colombia sigue última",
    href: "/pagos",
  },
  {
    cifra: "374",
    texto: "fintechs locales en Chile según el Radar 2026 de Finnovista (eran 348)",
    href: "/indice#datos",
  },
  {
    cifra: "2-dic-2027",
    texto: "nueva fecha del AI Act para el scoring crediticio (Reglamento UE 2026/1744)",
    href: "/frontera",
  },
];
