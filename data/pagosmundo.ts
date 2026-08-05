// =============================================================================
// Pagos y confianza · frontera global → América Latina → Colombia
//
// Cifras de contexto para el módulo de pagos. Cada una declara su ámbito, para
// que nunca se lea un promedio de economías emergentes como si fuera un dato de
// América Latina, ni una encuesta de 28 países como si fuera universal.
//
// Los promedios marcados "LATAM (21)" son promedios simples calculados por el
// Observatorio sobre el panel de data/latam.ts — no son agregados oficiales del
// Banco Mundial, que no publica valor regional para varias de esas series.
// =============================================================================

export type Ambito = "mundo" | "latam" | "colombia";

export interface HechoPago {
  ambito: Ambito;
  valor: string;
  titulo: string;
  detalle: string;
  fuente: string;
  url: string;
  anio: number;
  /** dimensión que ilustra: uso, costo, confianza o frontera */
  eje: "uso" | "costo" | "confianza" | "frontera";
}

export const HECHOS_PAGOS: HechoPago[] = [
  // ---------------------------------------------------------------- MUNDO
  {
    ambito: "mundo",
    eje: "uso",
    valor: "242 vs 579",
    titulo: "La brecha de intensidad de pago",
    detalle:
      "Pagos sin efectivo por habitante al año: 242 en economías emergentes (+21% en un año) contra 579 en economías avanzadas. La distancia ya no es de acceso, es de frecuencia: en las avanzadas se paga con tarjeta 361 veces al año por persona; en las emergentes, 95.",
    fuente: "BIS · CPMI Brief No 12, estadísticas Red Book 2024 (abr-2026)",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    anio: 2026,
  },
  {
    ambito: "mundo",
    eje: "uso",
    valor: "49%",
    titulo: "Los pagos inmediatos ya son la mitad del sistema emergente",
    detalle:
      "En las economías emergentes, los pagos inmediatos pasaron de 43% a 49% de todos los pagos sin efectivo en un año. En las avanzadas siguen estancados cerca del 10%: el mundo emergente se saltó la etapa de la tarjeta.",
    fuente: "BIS · CPMI Brief No 12, estadísticas Red Book 2024",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    anio: 2026,
  },
  {
    ambito: "mundo",
    eje: "uso",
    valor: "298",
    titulo: "Brasil es el número uno mundial en pagos inmediatos por habitante",
    detalle:
      "En 2024 Brasil registró 298 pagos inmediatos por habitante, seguido por Corea (189) y Argentina (149) — que además tuvo el mayor crecimiento del mundo (+71%). Japón anotó 17 y Francia, nueve. Dos de los tres primeros puestos del mundo son latinoamericanos.",
    fuente: "BIS · CPMI Brief No 12, estadísticas Red Book 2024",
    url: "https://www.bis.org/statistics/payment_stats/commentary2604.pdf",
    anio: 2026,
  },
  {
    ambito: "mundo",
    eje: "costo",
    valor: "6,36%",
    titulo: "Enviar dinero cuesta más del doble de la meta",
    detalle:
      "El promedio global de enviar US$200 fue de 6,36% en el 3T-2025, bajando apenas desde 6,49% en el 1T. Por canal: 4,59% digital y 7,30% no digital; el índice SmaRT, que solo promedia los servicios más baratos de cada corredor, llega a 3,29%. La meta 10.c de los ODS es 3% o menos a 2030, sobre 365 corredores de 48 países emisores a 105 receptores. Es el precio de que los rieles nacionales no se hablen entre sí.",
    fuente: "World Bank · Remittance Prices Worldwide, 3T-2025",
    url: "https://remittanceprices.worldbank.org/",
    anio: 2025,
  },
  {
    ambito: "mundo",
    eje: "confianza",
    valor: "63%",
    titulo: "El sector financiero recuperó la confianza global — con dos brechas",
    detalle:
      "El sector llega a 63% de confianza, +10 puntos en cinco años: bancos 65%, seguros 61%, asesoría 58%, gestión de inversiones 54% y cripto 41%. Pero la confianza es de 73% en países en desarrollo y 53% en desarrollados, y de 68% en el cuartil de mayor ingreso contra 55% en el de menor: 13 puntos de brecha entre quien tiene y quien no.",
    fuente:
      "Edelman Trust Barometer 2026 · Financial Services (33.938 encuestas, 28 países, oct–nov 2025)",
    url: "https://www.edelmansmithfield.com/2026-Edelman-Trust-Barometer-Key-Insights-for-Financial-Services",
    anio: 2026,
  },
  {
    ambito: "mundo",
    eje: "confianza",
    valor: "US$442.000 M",
    titulo: "Lo que cuesta la desconfianza bien fundada",
    detalle:
      "Pérdidas por estafas en los 42 países medidos, con 23% de los encuestados reportando pérdida de dinero en el último año. Sudamérica es la región más golpeada: 72% de los adultos tuvo al menos un encuentro con una estafa y hasta uno de cada cuatro perdió dinero.",
    fuente: "GASA · Global State of Scams Report 2025 (46.000 encuestas)",
    url: "https://gasa.org/knowledge-base/blog/global-scams-on-the-rise-over-half-of-adults-worldwide-report-scam-encounters",
    anio: 2025,
  },

  // ---------------------------------------------------------------- LATAM
  {
    ambito: "latam",
    eje: "uso",
    valor: "61,6% → 30,1%",
    titulo: "La mitad de la inclusión no llega al comercio",
    detalle:
      "En las 21 economías del panel, 61,6% de los adultos tiene cuenta y 50,7% hizo o recibió un pago digital, pero solo 30,1% pagó a un comercio por medios digitales. Entre recibir dinero y gastarlo digitalmente se pierde la mitad del sistema.",
    fuente: "Global Findex 2025 (datos 2024) · promedio simple del panel LATAM (21)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "latam",
    eje: "confianza",
    valor: "61%",
    titulo: "Seis de cada diez créditos de la región son informales",
    detalle:
      "De cada 100 adultos latinoamericanos que se endeudaron, solo 38,8 lo hicieron con una entidad formal. El resto fue a la familia, al prestamista o al 'gota a gota'. Es la medición más clara de que la confianza no se resuelve abriendo cuentas.",
    fuente: "Global Findex 2025 · fin22a ÷ borrow.any.t.d, promedio del panel (21)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "latam",
    eje: "confianza",
    valor: "36,9%",
    titulo: "La desconfianza explica más de un tercio de la exclusión",
    detalle:
      "Entre los adultos sin cuenta, 36,9% declara que la razón es la falta de confianza en las instituciones financieras — con extremos de 69% en Paraguay y 58% en Argentina. No es un problema de sucursales: es un problema de credibilidad.",
    fuente: "Global Findex 2025 · fin11d normalizado por población sin cuenta (16 países)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "latam",
    eje: "frontera",
    valor: "8,4% del PIB",
    titulo: "Una región que vive de pagos transfronterizos",
    detalle:
      "Las remesas recibidas promedian 8,4% del PIB en 18 economías del panel, con Honduras (30,1%), El Salvador (27,5%), Nicaragua (26,6%) y Guatemala (19,1%) arriba. Enviar US$200 a la región cuesta 2,8% en promedio, pero 4,66% a Paraguay y 3,57% al Perú.",
    fuente: "Banco Mundial · balanza de pagos 2025 y Remittance Prices Worldwide 2023",
    url: "https://data.worldbank.org/indicator/BX.TRF.PWKR.DT.GD.ZS",
    anio: 2025,
  },
  {
    ambito: "latam",
    eje: "frontera",
    valor: "8 países",
    titulo: "El primer riel regional lo exporta Brasil, no un organismo multilateral",
    detalle:
      "Pix Internacional es la primera oferta estructurada de pagos transfronterizos que sale de la región: comercios de Chile, Uruguay, Paraguay, Perú, Bolivia, Colombia, Argentina y México ya aceptan Pix de visitantes brasileños. La interconexión multilateral de rieles sigue siendo un proyecto del BIS (Nexus) sin ningún participante latinoamericano.",
    fuente: "BIS Innovation Hub · Project Nexus; anuncios del Banco Central do Brasil",
    url: "https://www.bis.org/about/bisih/topics/fmis/nexus.htm",
    anio: 2026,
  },
  {
    ambito: "latam",
    eje: "confianza",
    valor: "4,1%",
    titulo: "El intento es universal; la caída, no",
    detalle:
      "22,2% de los adultos de la región recibió una llamada o SMS pidiéndole dinero y 0,9% lo envió: una conversión de 4,1%. Ecuador (9,8%) y Panamá (8,5%) son los más vulnerables; El Salvador (0,4%) y Perú (2,2%), los más resistentes.",
    fuente: "Global Findex 2025 · con22 ÷ con21, panel LATAM (15 países)",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },

  // ---------------------------------------------------------------- COLOMBIA
  {
    ambito: "colombia",
    eje: "uso",
    valor: "44",
    titulo: "Bre-B ya mueve 44 pagos por adulto al año",
    detalle:
      "5 millones de transacciones diarias corrientes equivalen a 1.825 millones anualizadas: 44 por adulto. Bre-B acumuló 1.070 millones de operaciones en sus primeros ocho meses y llegó a 108 millones de llaves al 30-jun-2026, 34 millones de usuarios y más de 90.000 comercios con llave registrada.",
    fuente: "Banco de la República · Reporte de Infraestructura Financiera 2026",
    url: "https://www.banrep.gov.co/es/publicaciones-investigaciones/reporte-infraestructura-financiera-instrumentos-pago/2026",
    anio: 2026,
  },
  {
    ambito: "colombia",
    eje: "uso",
    valor: "26,1%",
    titulo: "El pago digital no llegó al mostrador",
    detalle:
      "49,2% de los adultos hizo o recibió un pago digital, pero solo 26,1% le pagó a un comercio: la brecha más ancha de los seis países del índice. Un tercio de los adultos (33,3%) no usó tarjeta ni celular para ninguna compra presencial en todo el año.",
    fuente: "Global Findex 2025 (datos 2024), series g20.any, merchant.pay y fin25e2b",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "colombia",
    eje: "confianza",
    valor: "94%",
    titulo: "El freno es la costumbre, no el miedo",
    detalle:
      "De los colombianos que siguen pagando en efectivo en el comercio, el 94% dice que la razón es que está acostumbrado y apenas el 2,7% que desconfía de pagar con tarjeta o celular. La política pública que asume un problema de desconfianza en la tecnología está resolviendo el problema equivocado.",
    fuente: "Global Findex 2025 · fin25e4d y fin25e4c sobre fin25e2b",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "colombia",
    eje: "confianza",
    valor: "14,6",
    titulo: "Por cada 100 relaciones de depósito, 14,6 de crédito",
    detalle:
      "Colombia tiene 1.803 depositantes y 263 prestatarios por cada 1.000 adultos: el sistema abre cuentas mucho más rápido de lo que presta. Solo 26,8 de cada 100 colombianos que se endeudaron lo hicieron con una entidad formal — la peor formalidad crediticia de los seis.",
    fuente: "IMF Financial Access Survey 2024 y Global Findex 2025",
    url: "https://data.worldbank.org/indicator/FB.CBK.BRWR.P3",
    anio: 2024,
  },
  {
    ambito: "colombia",
    eje: "confianza",
    valor: "4,4%",
    titulo: "La conversión de estafa más alta de los seis",
    detalle:
      "22,0% de los adultos recibió una solicitud de dinero por teléfono o SMS y 0,97% envió el dinero: una conversión de 4,4%, la más alta del índice. Colombia no es el país más atacado de la región —Brasil lo es— pero sí uno de los que menos resiste el ataque.",
    fuente: "Global Findex 2025 · series con21 y con22",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    anio: 2024,
  },
  {
    ambito: "colombia",
    eje: "frontera",
    valor: "2,87% del PIB",
    titulo: "Remesas grandes, riel corto",
    detalle:
      "Las remesas ya son 2,87% del PIB colombiano y cuestan 2,43% del monto enviado, pero Bre-B nació sin interoperabilidad transfronteriza y el propio Banco de la República la señala como pendiente. Es el vacío más grande de los seis países frente al tamaño de su diáspora — y el punto exacto donde un estándar abierto de pagos cambia el resultado.",
    fuente: "Banco Mundial (remesas 2025 y RPW 2023); Banco de la República (Bre-B)",
    url: "https://www.banrep.gov.co/es/bre-b",
    anio: 2026,
  },
];

// -----------------------------------------------------------------------------
// Promedios del panel LATAM (21 economías) usados como referencia en el módulo.
// Calculados por el Observatorio: el Banco Mundial no publica agregado regional
// para varias de estas series del Findex.
// -----------------------------------------------------------------------------

export interface RefRegional {
  label: string;
  latam: number;
  mundo: number | null;
  altos: number | null;
  unidad: string;
  n: number;
  mejorAlto: boolean;
  fuente: string;
}

export const REF_REGIONALES: RefRegional[] = [
  {
    label: "Tenencia de cuenta",
    latam: 61.6,
    mundo: 78.7,
    altos: 94.9,
    unidad: "% adultos",
    n: 21,
    mejorAlto: true,
    fuente: "Findex 2025 (datos 2024)",
  },
  {
    label: "Pago digital a comercios",
    latam: 30.1,
    mundo: null,
    altos: null,
    unidad: "% adultos",
    n: 17,
    mejorAlto: true,
    fuente: "Findex 2025 · merchant.pay",
  },
  {
    label: "Formalidad del endeudamiento",
    latam: 38.8,
    mundo: null,
    altos: null,
    unidad: "% de quienes se endeudaron",
    n: 21,
    mejorAlto: true,
    fuente: "Findex 2025 · fin22a ÷ borrow.any.t.d",
  },
  {
    label: "Desconfianza como barrera",
    latam: 36.9,
    mundo: null,
    altos: null,
    unidad: "% de los no bancarizados",
    n: 16,
    mejorAlto: false,
    fuente: "Findex 2025 · fin11d normalizado",
  },
  {
    label: "Cuentas abandonadas",
    latam: 3.4,
    mundo: null,
    altos: null,
    unidad: "% adultos",
    n: 21,
    mejorAlto: false,
    fuente: "Findex 2025 · inactive.t.d",
  },
  {
    label: "Costo de enviar US$200",
    latam: 2.8,
    mundo: 6.36,
    altos: null,
    unidad: "% del monto",
    n: 15,
    mejorAlto: false,
    fuente: "RPW 2023 · promedio global 3T-2025",
  },
];

// -----------------------------------------------------------------------------
// Lo que hoy NO se puede medir. Es la agenda que el observatorio propone y el
// argumento de por qué hace falta financiar la medición.
// -----------------------------------------------------------------------------

export interface VacioMedicion {
  titulo: string;
  porQue: string;
  propuesta: string;
}

export const VACIOS: VacioMedicion[] = [
  {
    titulo: "No existe un dato mundial de transacciones por persona",
    porQue:
      "El Red Book del BIS solo cubre las 26 jurisdicciones del CPMI: de América Latina, únicamente Brasil, México y Argentina. Colombia, Chile y Perú publican cifras propias con perímetros distintos (Perú cuenta todos los medios de pago; Chile suma tarjetas y transferencias; Colombia informa el riel inmediato). Comparar sin armonizar produce rankings falsos.",
    propuesta:
      "Un armonizador abierto que reconstruya 'pagos por adulto' con un perímetro único a partir de los reportes de cada banco central, publicando la aritmética país por país. El índice ya lo hace para el riel inmediato de cinco países.",
  },
  {
    titulo: "La confianza declarada solo se le pregunta a los excluidos",
    porQue:
      "La única serie de desconfianza con cobertura casi mundial (fin11d del Findex) se le pregunta a quien NO tiene cuenta. De los que sí tienen, nadie mide a escala comparable si confían: el Edelman Trust Barometer cubre 28 países y ninguno andino.",
    propuesta:
      "Un módulo corto de confianza aplicado sobre panel latinoamericano, con las tres preguntas que el ICF hoy tiene que inferir del comportamiento: ¿dejaría su ahorro aquí?, ¿le devolverían el dinero si algo falla?, ¿entiende lo que le cobran?",
  },
  {
    titulo: "El fraude se mide por encuestas de industria, no por incidencia",
    porQue:
      "Los reportes disponibles (LexisNexis, TransUnion, GASA) encuestan a ejecutivos o a muestras de conveniencia, con metodologías propietarias que cambian entre ediciones. No hay una tasa de incidencia comparable de pérdida efectiva por país.",
    propuesta:
      "Usar las series con21/con22 del Findex como línea base pública de conversión de estafa —lo que hace este índice— y complementarlas con datos de reversión de los propios rieles inmediatos.",
  },
  {
    titulo: "La interoperabilidad transfronteriza no tiene indicador",
    porQue:
      "Se sabe cuánto cuesta enviar una remesa, pero no si el riel doméstico puede recibirla de forma nativa. Ningún organismo publica un indicador de conectividad entre sistemas de pago inmediato.",
    propuesta:
      "El indicador de interoperabilidad transfronteriza del índice es un primer intento construido; el paso siguiente es volverlo verificable con una matriz de corredores activos por riel.",
  },
];
