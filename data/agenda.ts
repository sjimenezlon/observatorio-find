// =============================================================================
// Agenda de medición — Centro de Innovación Financiera (EAFIT)
// Los 5 focos estratégicos del Centro como pilares de la siguiente etapa del
// observatorio, cada uno con los indicadores que VAMOS A CONSTRUIR (bienestar
// financiero, impacto, sesgos, interoperabilidad...) y el mapa de lo que el
// IMIAF v3 ya cubre como proxy.
//
// Fuente del marco: deck "Centro de innovación financiera" (EAFIT, jul-2026).
// =============================================================================

export type FocoKey =
  | "desarrollo"
  | "sostenibles"
  | "conductuales"
  | "emergentes"
  | "seguras";

// operando      → ya existe proxy en el IMIAF v3
// proximo-corte → fuente pública identificada; entra en un corte próximo
// por-construir → requiere levantamiento propio o alianzas: agenda del Centro
export type Estado = "operando" | "proximo-corte" | "por-construir";

export interface Foco {
  key: FocoKey;
  nombre: string;
  corto: string;
  color: string;
  mision: string; // en palabras del deck del Centro
  lineas: string[]; // líneas de investigación del deck
  // indicadores del IMIAF v3 que ya alimentan este foco (keys de dataset.ts)
  proxiesIMIAF: { key: string; label: string }[];
}

export const FOCOS: Foco[] = [
  {
    key: "desarrollo",
    nombre: "Finanzas para el desarrollo",
    corto: "Desarrollo",
    color: "#B79CED",
    mision:
      "Investigación cuantitativa y metodologías de medición para entender qué condiciones hacen que el acceso financiero se traduzca en bienestar real, en contextos de alta informalidad y desigualdad.",
    lineas: [
      "Modelos cuantitativos y analítica de datos",
      "Scoring de riesgo alternativo y sesgos en modelos algorítmicos de crédito",
      "Medición de bienestar financiero",
      "Open Finance e inclusión financiera (informalidad, migración financiera)",
    ],
    proxiesIMIAF: [
      { key: "cuenta", label: "Tenencia de cuenta" },
      { key: "credito", label: "Crédito formal" },
      { key: "pagodigital", label: "Pago digital" },
      { key: "brechagenero", label: "Brecha de género" },
      { key: "openfinance", label: "Apertura de datos (Open Finance)" },
    ],
  },
  {
    key: "sostenibles",
    nombre: "Finanzas sostenibles y climáticas",
    corto: "Sostenibles",
    color: "#1FC9A0",
    mision:
      "Instrumentos, métricas y marcos regulatorios que permiten al sector financiero latinoamericano gestionar el riesgo climático, movilizar capital hacia economías bajas en carbono y medir el impacto con honestidad.",
    lineas: [
      "Riesgo climático físico y catastrófico en carteras financieras",
      "Finanzas de la transición energética y transición justa",
      "Instrumentos financieros sostenibles y medición de impacto",
      "Taxonomías sostenibles y estándares de divulgación",
    ],
    proxiesIMIAF: [],
  },
  {
    key: "conductuales",
    nombre: "Finanzas conductuales",
    corto: "Conductuales",
    color: "#5BD0E0",
    mision:
      "Cómo toman decisiones financieras las personas en América Latina: qué sesgos operan, qué diseños las ayudan y cuáles las perjudican, con énfasis en poblaciones de primer acceso al sistema formal.",
    lineas: [
      "Arquitecturas de decisión y nudge design para bienestar financiero",
      "Sesgos cognitivos y comportamiento financiero en contextos de escasez",
      "Economía conductual aplicada a la inclusión financiera",
      "Comportamiento financiero digital y diseño de plataformas",
    ],
    proxiesIMIAF: [
      { key: "conversionestafa", label: "Conversión de la estafa telefónica" },
      { key: "efectivocomercio", label: "Resistencia del efectivo (hábito vs. desconfianza)" },
    ],
  },
  {
    key: "emergentes",
    nombre: "Finanzas emergentes",
    corto: "Emergentes",
    color: "#FF5FA2",
    mision:
      "Las tecnologías que están transformando la forma de hacer finanzas —ecosistemas fintech, infraestructura de pagos, activos digitales e inteligencia artificial— para entender qué funciona, para quién y bajo qué condiciones. Dentro de este foco vive fintech: el segmento que el IIIF ya mide.",
    lineas: [
      "Ecosistema FinTech y modelos de negocio emergentes",
      "Infraestructura financiera digital",
      "DeFi y activos digitales",
      "Tecnologías de frontera con impacto financiero",
    ],
    proxiesIMIAF: [
      { key: "fintechs", label: "Fintechs activas" },
      { key: "vc", label: "Capital de riesgo" },
      { key: "pagosinmediatos", label: "Madurez de pagos inmediatos" },
      { key: "pagosadulto", label: "Pagos inmediatos por adulto al año" },
      { key: "merchantpay", label: "Pago digital a comercios" },
      { key: "interopxb", label: "Interoperabilidad transfronteriza" },
      { key: "chainalysis", label: "Adopción cripto" },
      { key: "regulacion", label: "Madurez regulatoria de activos digitales" },
    ],
  },
  {
    key: "seguras",
    nombre: "Finanzas seguras",
    corto: "Seguras",
    color: "#9FCE2E",
    mision:
      "Las condiciones regulatorias, tecnológicas e institucionales que permiten que la innovación financiera opere con integridad, supervisión efectiva y protección real para todos los actores.",
    lineas: [
      "Regulación e innovación financiera",
      "Supervisión financiera y tecnología regulatoria (RegTech/SupTech)",
      "Integridad financiera y prevención de delitos",
      "Ciberseguridad y protección del consumidor financiero",
    ],
    proxiesIMIAF: [
      { key: "basel", label: "Riesgo de lavado (Basel AML)" },
      { key: "marcofintech", label: "Marco fintech, sandbox y datos" },
    ],
  },
];

export interface IndicadorAgenda {
  foco: FocoKey;
  nombre: string;
  pregunta: string; // la pregunta que responde
  unidad: string;
  metodo: string;
  fuentes: string;
  estado: Estado;
  bandera?: boolean; // indicador insignia del foco
}

export const AGENDA: IndicadorAgenda[] = [
  // ===== FINANZAS PARA EL DESARROLLO =============================================
  {
    foco: "desarrollo",
    nombre: "Índice de Bienestar Financiero (IBF-LATAM)",
    pregunta:
      "¿El acceso financiero se está traduciendo en bienestar real — capacidad de absorber choques, cumplir obligaciones y planear el futuro?",
    unidad: "0–100 por país y segmento",
    metodo:
      "Escala tipo CFPB / OECD-INFE adaptada a informalidad y desigualdad LATAM; encuesta panel propia con submuestras de primer acceso, informales y migrantes.",
    fuentes: "Encuesta del Centro + calibración con Findex y encuestas de los bancos centrales",
    estado: "por-construir",
    bandera: true,
  },
  {
    foco: "desarrollo",
    nombre: "Brecha acceso → uso",
    pregunta:
      "¿Cuántas cuentas abiertas se usan de verdad? La inclusión de papel no genera bienestar.",
    unidad: "% de cuentas activas (uso en 90 días)",
    metodo:
      "Operando desde v4 con dos series comparables del Findex en el panel de 21 economías: cuentas inactivas (inactive.t.d) y pago digital a comercios sobre pago digital total. El paso siguiente es homologar la definición de cuenta activa entre supervisores para tener el dato con frecuencia trimestral.",
    fuentes: "Global Findex 2025 + SFC, CNBV, BCB, CMF, SBS, BCRA",
    estado: "operando",
  },
  {
    foco: "desarrollo",
    nombre: "Resiliencia financiera",
    pregunta:
      "¿Qué proporción de adultos conseguiría fondos de emergencia en 30 días sin vender activos ni caer en gota a gota?",
    unidad: "% de adultos",
    metodo: "Dato de encuesta comparable ya publicado; se incorpora como indicador del pilar de inclusión.",
    fuentes: "World Bank · Global Findex 2025 (módulo de resiliencia)",
    estado: "proximo-corte",
  },
  {
    foco: "desarrollo",
    nombre: "Equidad del crédito algorítmico",
    pregunta:
      "A igual riesgo, ¿el scoring aprueba y cobra igual a mujeres, jóvenes, informales y migrantes?",
    unidad: "brecha en pp de aprobación/costo a riesgo comparable",
    metodo:
      "Auditorías de sesgo sobre modelos de scoring con datos anonimizados de entidades aliadas; protocolo replicable del Centro (línea: sesgos en modelos algorítmicos de crédito).",
    fuentes: "Convenios con entidades + sandbox laArenera (SFC)",
    estado: "por-construir",
  },

  // ===== FINANZAS SOSTENIBLES Y CLIMÁTICAS ======================================
  {
    foco: "sostenibles",
    nombre: "Cartera sostenible etiquetada",
    pregunta: "¿Qué proporción del crédito del sistema ya está alineada con la taxonomía nacional?",
    unidad: "% de la cartera total",
    metodo:
      "Cartera verde/social/sostenible reportada bajo taxonomía local sobre cartera bruta; Colombia ya reporta ~22% (Asobancaria).",
    fuentes: "Asobancaria, Febraban, reguladores y gremios por país",
    estado: "proximo-corte",
  },
  {
    foco: "sostenibles",
    nombre: "Exposición climática de carteras",
    pregunta:
      "¿Qué tan expuesto está el crédito de cada país a inundación, sequía y otros riesgos físicos?",
    unidad: "0–100 (índice construido)",
    metodo:
      "Cruce geoespacial de amenaza física (IDEAM, NASA, Copernicus) con concentración territorial de cartera; método GeoAI del Centro, auditable y replicable.",
    fuentes: "Mapas de amenaza abiertos + datos de cartera georreferenciada de supervisores",
    estado: "por-construir",
    bandera: true,
  },
  {
    foco: "sostenibles",
    nombre: "Divulgación de emisiones financiadas",
    pregunta: "¿Los mayores bancos de cada país ya miden y publican el carbono de su cartera?",
    unidad: "% del top-10 bancario que reporta (PCAF / NIIF S2)",
    metodo: "Revisión estandarizada de informes anuales y de sostenibilidad del top-10 por activos.",
    fuentes: "Informes de entidades, PCAF, adopción ISSB por país",
    estado: "proximo-corte",
  },
  {
    foco: "sostenibles",
    nombre: "Madurez de taxonomías y divulgación",
    pregunta: "¿Qué tan completo es el marco de taxonomía sostenible y estándares de reporte de cada país?",
    unidad: "0–100 (índice construido)",
    metodo:
      "Mismo método de los índices regulatorios del IIIF: taxonomía vigente, adopción NIIF S1/S2, reporte obligatorio; Colombia fue pionera regional (Taxonomía Verde 2022).",
    fuentes: "Normas oficiales por país, ISSB, CBI",
    estado: "proximo-corte",
  },
  {
    foco: "sostenibles",
    nombre: "Honestidad del impacto (anti-greenwashing)",
    pregunta: "Los instrumentos temáticos, ¿reportan uso de fondos e impacto con verificación externa?",
    unidad: "% de emisiones temáticas con verificación y reporte de impacto",
    metodo:
      "Revisión de bonos verdes/sociales/sostenibles emitidos: second-party opinion, reporte de asignación y de impacto post-emisión. Responde a la línea 'medir el impacto con honestidad'.",
    fuentes: "Bolsas de valores, Climate Bonds Initiative, prospectos",
    estado: "por-construir",
  },

  // ===== FINANZAS CONDUCTUALES ===================================================
  {
    foco: "conductuales",
    nombre: "Índice de diseño para el bienestar",
    pregunta:
      "Las apps financieras líderes, ¿ayudan a decidir bien (nudges, alertas, autocontrol) o explotan sesgos (dark patterns)?",
    unidad: "0–100 por app / promedio país",
    metodo:
      "Auditoría estandarizada y replicable de las apps financieras más usadas por país: fricciones de salida, consentimientos, ofertas de crédito no solicitadas, herramientas de ahorro y alertas.",
    fuentes: "Protocolo propio del Centro sobre las apps públicas (top descargas por país)",
    estado: "por-construir",
    bandera: true,
  },
  {
    foco: "conductuales",
    nombre: "Alfabetización financiera aplicada",
    pregunta: "¿La gente entiende los productos que ya tiene en el bolsillo?",
    unidad: "score 0–100 (OECD/INFE)",
    metodo: "Score comparable de conocimiento + comportamiento + actitud financiera por país.",
    fuentes: "OECD/INFE, S&P Global FinLit, CAF",
    estado: "proximo-corte",
  },
  {
    foco: "conductuales",
    nombre: "Ahorro formal activo",
    pregunta: "¿Cuántos adultos lograron ahorrar en el sistema formal el último año?",
    unidad: "% de adultos",
    metodo: "Dato Findex comparable; proxy conductual de capacidad de planeación a futuro.",
    fuentes: "World Bank · Global Findex 2025",
    estado: "proximo-corte",
  },
  {
    foco: "conductuales",
    nombre: "Estrés financiero digital",
    pregunta:
      "El crédito a un clic (BNPL, rotativos, apps de préstamo), ¿está generando mora temprana en los nuevos incluidos?",
    unidad: "% de mora temprana en crédito digital de consumo",
    metodo:
      "Cosechas de originación digital vs. tradicional con datos de burós; foco en poblaciones de primer acceso (línea: comportamiento en contextos de escasez).",
    fuentes: "Alianzas con burós (DataCrédito, TransUnion) y supervisores",
    estado: "por-construir",
  },

  {
    foco: "conductuales",
    nombre: "Índice de Confianza Financiera (ICF)",
    pregunta:
      "¿Confía la gente en el sistema financiero — y cómo se sabe, si nadie se lo pregunta a escala comparable?",
    unidad: "0–100 por país, 4 dimensiones",
    metodo:
      "Operando desde v4 para 21 economías de LatAm y el Caribe. Infiere la confianza del comportamiento observado (abandono de cuentas, saldo que se deja, pago a comercios, formalidad del endeudamiento, crédito por depósito) y del daño efectivo (conversión de la estafa, comisiones inesperadas), en vez de depender de una encuesta de reputación que no cubre la región. Cuatro de sus ocho indicadores son derivados con aritmética publicada. Lo que falta: un módulo corto de confianza declarada aplicado sobre panel propio, para preguntarle también a quien SÍ tiene cuenta.",
    fuentes: "Global Findex 2025 + IMF Financial Access Survey 2024; contraste con Edelman Trust Barometer 2026",
    estado: "operando",
    bandera: true,
  },

  // ===== FINANZAS EMERGENTES (fintech) ==========================================
  {
    foco: "emergentes",
    nombre: "Índice de interoperabilidad de pagos",
    pregunta:
      "¿Qué tan fácil fluye el dinero entre billeteras, bancos y países? La métrica central que hoy nadie publica para LATAM.",
    unidad: "0–100 (índice construido)",
    metodo:
      "Primera versión ya operando en el pilar de Pagos (v4): el indicador de interoperabilidad transfronteriza combina conexión internacional del riel, costo de remesas y stablecoins como riel de facto. Falta volverlo verificable con una matriz de corredores activos por riel, alias/directorios, QR estándar y acceso de no-bancos. Pieza clave de la alianza propuesta con Interledger.",
    fuentes: "Bancos centrales + BIS + Remittance Prices Worldwide + pruebas de campo documentadas",
    estado: "operando",
    bandera: true,
  },
  {
    foco: "emergentes",
    nombre: "Adopción real de IA en entidades financieras",
    pregunta:
      "¿Qué porcentaje de bancos y fintechs de cada país tiene GenAI y agentes en producción — no en piloto?",
    unidad: "% de entidades con IA en producción, por caso de uso",
    metodo:
      "Encuesta anual propia con agremiaciones (Asobancaria, Felaban, Colombia Fintech y pares); llena la limitación declarada del IIIF: no existe métrica pública comparable de adopción de IA por país.",
    fuentes: "Encuesta del Centro + gremios; benchmark global Evident/NTT DATA",
    estado: "por-construir",
  },
  {
    foco: "emergentes",
    nombre: "Stablecoins y costo de remesas",
    pregunta:
      "¿Las stablecoins están abaratando de verdad el dinero que cruza fronteras hacia la región?",
    unidad: "% de flujo cripto en stablecoins · costo % de remesa digital vs. tradicional",
    metodo:
      "Participación de stablecoins en flujos por país (Chainalysis) cruzada con el costo promedio de corredores de remesas (Remittance Prices Worldwide).",
    fuentes: "Chainalysis Geography of Crypto, Banco Mundial RPW, Bitso",
    estado: "proximo-corte",
  },

  // ===== FINANZAS SEGURAS ========================================================
  {
    foco: "seguras",
    nombre: "Tasa de fraude digital",
    pregunta: "¿Qué proporción de las transacciones y aperturas digitales de cada país es fraude sospechado?",
    unidad: "% de intentos sospechosos",
    metodo:
      "Tasas por país de fraude digital sospechado en apertura y transacción, con serie comparable; complementa el multiplicador de costo (3,68×) que ya cita el observatorio.",
    fuentes: "TransUnion, LexisNexis, reportes de supervisores",
    estado: "proximo-corte",
  },
  {
    foco: "seguras",
    nombre: "Protección del consumidor financiero digital",
    pregunta: "Cuando algo sale mal en un canal digital, ¿el usuario tiene a dónde acudir — y le resuelven?",
    unidad: "quejas por 100k usuarios digitales · % resuelto a favor · días de resolución",
    metodo:
      "Homologación de estadísticas de quejas de canales digitales entre defensores y supervisores; el reto metodológico es la comparabilidad entre países.",
    fuentes: "SFC, CONDUSEF, BCB, CMF, SBS, Defensorías",
    estado: "por-construir",
    bandera: true,
  },
  {
    foco: "seguras",
    nombre: "Madurez SupTech del supervisor",
    pregunta: "¿Los supervisores están usando tecnología a la altura de lo que supervisan?",
    unidad: "0–100 (índice construido)",
    metodo:
      "Capacidades declaradas y desplegadas de supervisión tecnológica (datos granulares, monitoreo en tiempo real, IA en supervisión) por autoridad financiera.",
    fuentes: "Encuestas BID/CCAF de SupTech, informes de gestión de supervisores",
    estado: "proximo-corte",
  },
  {
    foco: "seguras",
    nombre: "Ciber-resiliencia del sistema financiero",
    pregunta: "¿El sistema está preparado para el ataque que va a llegar?",
    unidad: "0–100 (índice construido)",
    metodo:
      "Regulación ciber vigente, reporte obligatorio de incidentes, ejercicios sectoriales de crisis y equipos CSIRT financieros por país.",
    fuentes: "Normas por país, OEA/BID ciberseguridad, supervisores",
    estado: "proximo-corte",
  },
];

export const ESTADOS: Record<Estado, { label: string; color: string; desc: string }> = {
  operando: {
    label: "Ya opera en el IIIF",
    color: "#1FC9A0",
    desc: "El IIIF ya lo mide (o tiene un proxy directo) con fuente pública citada.",
  },
  "proximo-corte": {
    label: "Entra en un corte próximo",
    color: "#9FCE2E",
    desc: "Fuente pública identificada; falta homologar y cargar al dataset.",
  },
  "por-construir": {
    label: "Por construir — investigación del Centro",
    color: "#E8B452",
    desc: "Requiere levantamiento propio, protocolos o alianzas: es agenda de investigación.",
  },
};
