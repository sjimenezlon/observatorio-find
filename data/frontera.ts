// =============================================================================
// La frontera · mapas de contexto global del Observatorio Find
//
// Procedencia: los tres mapas de trabajo de Santiago Jiménez Londoño
// (cambios regulatorios 2025–2026, hoja de ruta prospectiva 2026–2030 y mapa
// prospectivo de tendencias fintech), integrados aquí sin alterar su contenido.
// Corte original: 24 de julio de 2026.
//
// Por qué viven en el Observatorio: el índice mide dónde está América Latina;
// estos mapas muestran qué ya se decidió afuera. Ninguna de las 32 medidas es
// colombiana y solo una es brasileña — esa ausencia es, en sí misma, el dato.
//
// Cada tarjeta separa el CAMBIO (hecho verificable con fuente) de su lectura de
// IMPACTO (interpretación del autor), y cada hito prospectivo declara su grado
// de certeza. Generado por script desde los archivos fuente; no editar a mano.
// =============================================================================

export type Estatus = "Vigente" | "En curso" | "Propuesto" | "Revertido";
export type Certeza = "Fijado" | "En discusión" | "Tendencia";

export interface Medida {
  jurisdiccion: string;
  flag: string;
  regulador: string;
  estatus: string;
  fecha: string;
  ejes: string[];
  categorias: string[];
  riesgos: string[];
  titulo: string;
  /** hecho verificable */
  cambio: string;
  /** lectura de impacto sobre el bienestar financiero — interpretación */
  impacto: string;
  url: string;
  fuente: string;
}

export const MEDIDAS: Medida[] = [
  {
    jurisdiccion: "México", flag: "🇲🇽", regulador: "CNBV · Banxico",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Tecnología y datos","Pagos y cuentas"],
    riesgos: ["Fraude en API","Privacidad de datos","Ciberriesgo","Fallos de interoperabilidad"],
    titulo: "Finanzas Abiertas (Open Finance) — regulación pendiente",
    cambio: "El esquema completo de finanzas abiertas de la Ley Fintech sigue sin reglas secundarias. En 2026 se presentó un amparo por la omisión regulatoria, aunque el open banking básico ya opera con cientos de fintech integradas.",
    impacto: "Define la portabilidad de datos y la competencia por el cliente; su retraso frena productos de crédito basados en datos.",
    url: "https://armor-aml.com/que-viene-para-la-ley-fintech-en-el-2026-cuando-open-finance-y-el-sandbox-siguen-pendientes/", fuente: "ArmorAML / Legal Paradox",
  },
  {
    jurisdiccion: "México", flag: "🇲🇽", regulador: "Senado · Banxico · CNBV",
    estatus: "Propuesto", fecha: "May 2026",
    ejes: ["Innovación","Crédito"],
    categorias: ["Cripto y activos digitales","Pagos y cuentas"],
    riesgos: ["Contagio sistémico (stablecoins)","Riesgo de custodia","Lavado de dinero","Riesgo regulatorio"],
    titulo: "Activos Virtuales Estables (AVE) — stablecoins del peso",
    cambio: "Iniciativa del senador Murat (6 may 2026) para regular stablecoins ancladas 1:1 al peso, con reservas líquidas al 100% y supervisión Banxico/CNBV. El texto excluiría a startups y a las IFPE.",
    impacto: "Habilitaría pagos y remesas de bajo costo; su diseño podría concentrar el mercado en bancos y excluir a nuevos entrantes.",
    url: "https://www.criptonoticias.com/regulacion/mexico-regular-stablecoins-peso-senado/", fuente: "CriptoNoticias",
  },
  {
    jurisdiccion: "México", flag: "🇲🇽", regulador: "Banxico",
    estatus: "Vigente", fecha: "Jun 2026",
    ejes: ["Inclusión"],
    categorias: ["Pagos y cuentas","Protección al consumidor"],
    riesgos: ["Gaps en KYC/AML","Fraude"],
    titulo: "Cuenta simplificada «Nivel 2 Bis»",
    cambio: "Banxico creó un nuevo nivel de cuenta de expediente simplificado dentro de sus disposiciones de 2026, ampliando los límites de operación frente a las cuentas Nivel 2.",
    impacto: "Reduce la fricción de apertura y acerca la bancarización a población de bajos ingresos.",
    url: "https://trol.mx/trol-financiero-blog/nuevas-disposiciones-del-banco-de-mexico-para-2026", fuente: "TROL Financiero",
  },
  {
    jurisdiccion: "México", flag: "🇲🇽", regulador: "Banxico",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Inclusión","Innovación"],
    categorias: ["Pagos y cuentas"],
    riesgos: ["Fraude en tiempo real","Fallos de disponibilidad/resiliencia","Fallos de interoperabilidad"],
    titulo: "Integración de CoDi + DiMo (pagos instantáneos)",
    cambio: "Banxico unifica la tecnología QR de CoDi con la transferencia por número telefónico de DiMo hacia un ecosistema único e interoperable en SPEI. A sep-2025 CoDi sumaba 21.8 M de cuentas validadas.",
    impacto: "Simplifica los pagos instantáneos para personas no bancarizadas y micronegocios; sustituye efectivo.",
    url: "https://americaretail-malls.com/paises/mexico/codi-y-dimo-se-fusionan/", fuente: "América Retail / Banxico",
  },
  {
    jurisdiccion: "México", flag: "🇲🇽", regulador: "CNBV (DOF 23-jul-2025)",
    estatus: "Vigente", fecha: "Jul 2025",
    ejes: ["Crédito"],
    categorias: ["Cumplimiento y supervisión","Macroprudencial"],
    riesgos: ["Riesgo de crédito","Riesgo de liquidez","Protección al consumidor"],
    titulo: "Nuevas disposiciones para SOFIPOS",
    cambio: "Marco publicado en el DOF (vigor 24 jul 2025): límites de concentración de crédito (10% del capital neto a créditos individuales/familiares y 15% a grupos empresariales) y refuerzo de gestión de riesgos.",
    impacto: "Protege el ahorro popular, pero puede restringir el crédito disponible para ciertos grupos y sectores.",
    url: "https://www.libertad.com.mx/content/web-libertad-servicios-financieros/es/home/blog/nuevas-disposiciones-de-la-cnbv.html", fuente: "Libertad SF / Métricas",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "CFPB",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Tecnología y datos","Pagos y cuentas"],
    riesgos: ["Fraude en API","Privacidad de datos","Riesgo regulatorio","Protección al consumidor"],
    titulo: "Sección 1033 — Open Banking",
    cambio: "La regla final de 2024 fue suspendida por un tribunal (E.D. Kentucky). El CFPB la considera ilegal y abrió un nuevo proceso (ANPR ago-2025). La fecha de cumplimiento del 30 jun 2026 quedó en disputa.",
    impacto: "Genera incertidumbre sobre el derecho del consumidor a portar sus datos y sobre la competencia entre fintech y bancos.",
    url: "https://www.cozen.com/news-resources/publications/2026/section-1033-compliance-date-open-banking-rule-enjoined-and-under-reconsideration", fuente: "Cozen O'Connor / CFPB",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "Congreso · Fed · OCC · FDIC · FinCEN",
    estatus: "Vigente", fecha: "Jul 2025",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Pagos y cuentas"],
    riesgos: ["Contagio sistémico (stablecoins)","Riesgo de custodia","Lavado de dinero"],
    titulo: "GENIUS Act — stablecoins de pago",
    cambio: "Firmada el 18 jul 2025. Exige reservas al 100%, reporte mensual y supervisión de nivel bancario; prohíbe pagar rendimiento a los tenedores. Las reglas de implementación están en curso; entrada plena hacia ene-2027.",
    impacto: "Primer marco federal de pagos con stablecoins; puede abaratar pagos y remesas bajo protección regulatoria.",
    url: "https://www.federalregister.gov/documents/2025/09/19/2025-18226/genius-act-implementation", fuente: "Federal Register / DLA Piper",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "Congreso (Cámara)",
    estatus: "Propuesto", fecha: "Jul 2025",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Cumplimiento y supervisión"],
    riesgos: ["Riesgo regulatorio","Protección al inversor","Volatilidad de mercado"],
    titulo: "CLARITY Act — estructura de mercado cripto",
    cambio: "Ley de estructura de mercado para activos digitales; asigna a la CFTC jurisdicción exclusiva sobre mercados spot de commodities digitales. Aprobada por la Cámara (jul 2025), pendiente en el Senado.",
    impacto: "Daría certeza jurídica a plataformas y emisores; reduce el riesgo regulatorio de la innovación en activos digitales.",
    url: "https://www.lw.com/en/us-crypto-policy-tracker/legislative-developments", fuente: "Latham & Watkins",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "CFPB · Tribunal (E.D. Texas)",
    estatus: "Revertido", fecha: "Jul 2025",
    ejes: ["Crédito"],
    categorias: ["Protección al consumidor","Cumplimiento y supervisión"],
    riesgos: ["Tratamiento discriminatorio","Información asimétrica","Riesgo de crédito"],
    titulo: "Regla de deuda médica en reportes de crédito (Reg. V)",
    cambio: "El 11 jul 2025 un tribunal anuló la regla que prohibía considerar deuda médica en la evaluación crediticia, por exceder la autoridad del CFPB y contravenir la FCRA.",
    impacto: "La deuda médica vuelve a los reportes de crédito, lo que puede reducir los scores de millones de personas y su acceso al crédito.",
    url: "https://www.consumerfinance.gov/rules-policy/final-rules/prohibition-on-creditors-and-consumer-reporting-agencies-concerning-medical-information-regulation-v/", fuente: "CFPB / CFS Law Monitor",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "CFPB",
    estatus: "Vigente", fecha: "May 2026",
    ejes: ["Crédito"],
    categorias: ["Cumplimiento y supervisión","Protección al consumidor"],
    riesgos: ["Datos insuficientes para supervisión","Tratamiento discriminatorio"],
    titulo: "Sección 1071 — datos de crédito a PYMES (reducida)",
    cambio: "El 1 may 2026 el CFPB finalizó una versión reducida: alcanza a ~172–181 instituciones, elimina cinco puntos de dato discrecionales y excluye adelantos de efectivo y préstamos ≤US$1,000. Cumplimiento: 1 ene 2028.",
    impacto: "Menos transparencia para detectar discriminación en el crédito a pequeñas empresas y negocios de minorías.",
    url: "https://www.federalregister.gov/documents/2026/05/01/2026-08494/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b", fuente: "Federal Register / CFPB",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "CFPB",
    estatus: "Revertido", fecha: "Dic 2025",
    ejes: ["Crédito","Inclusión"],
    categorias: ["Modelos de negocio","Protección al consumidor"],
    riesgos: ["Información asimétrica","Producto no adecuado","Protección al consumidor"],
    titulo: "Earned Wage Access declarado «no es crédito»",
    cambio: "El CFPB (23 dic 2025) determinó que el acceso a salario devengado con patrón asociado no es crédito bajo TILA, y rescindió la interpretación propuesta en 2024 que buscaba tratarlo como crédito.",
    impacto: "Facilita el acceso a liquidez sin underwriting, pero retira protecciones sobre comisiones y transparencia de costo.",
    url: "https://www.federalregister.gov/documents/2025/12/23/2025-23735/truth-in-lending-regulation-z-non-application-to-earned-wage-access-products", fuente: "Federal Register / American Banker",
  },
  {
    jurisdiccion: "EE.UU.", flag: "🇺🇸", regulador: "CFPB · Estados (NY, CT)",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Crédito"],
    categorias: ["Modelos de negocio","Protección al consumidor"],
    riesgos: ["Riesgo de crédito","Información asimétrica","Fragmentación regulatoria"],
    titulo: "BNPL: repliegue federal, avance estatal",
    cambio: "Tras el retiro de la guía federal sobre «compra ahora, paga después», estados como Nueva York legislan BNPL y Connecticut trata ciertas comisiones de EWA como cargo financiero.",
    impacto: "Se fragmenta la protección al consumidor en un mosaico estatal; la cobertura depende del domicilio.",
    url: "https://www.regulatoryoversight.com/2026/02/payments-year-in-review-2025-federal-and-state-developments-part-2/", fuente: "Regulatory Oversight",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "Comisión Europea",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Tecnología y datos","Modelos de negocio"],
    riesgos: ["Privacidad de datos","Fraude en API","Fallos de interoperabilidad"],
    titulo: "FiDA — Marco de Acceso a Datos Financieros (Open Finance)",
    cambio: "En trílogo (abr 2026), con adopción prevista a mediados de 2026 y operación hacia 2029–2030. Extiende el intercambio de datos más allá de pagos: hipotecas, ahorro, inversiones, pensiones y seguros.",
    impacto: "Sentaría la base de un open finance amplio; habilita comparación y crédito personalizado, con debate sobre carga y privacidad.",
    url: "https://finance.ec.europa.eu/digital-finance/framework-financial-data-access_en", fuente: "Comisión Europea / BNP Paribas",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "Parlamento y Consejo UE",
    estatus: "En curso", fecha: "Nov 2025",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Pagos y cuentas","Protección al consumidor"],
    riesgos: ["Fraude en tiempo real","Fraude en API","Protección al consumidor"],
    titulo: "PSD3 + PSR — servicios de pago",
    cambio: "Acuerdo político el 27 nov 2025; entrada en vigor entre Q1 y Q2 2026 con transición de 21 meses. Refuerza el antifraude (incl. suplantación / fraude APP) y fusiona las figuras de EMI y entidad de pago.",
    impacto: "Pagos más seguros y competitivos; mayor reembolso ante fraude eleva la confianza del usuario.",
    url: "https://www.nortonrosefulbright.com/en/knowledge/publications/cedd39c6/psd3-and-psr-from-provisional-agreement-to-2026-readiness", fuente: "Norton Rose Fulbright / PwC",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "Unión Europea",
    estatus: "En curso", fecha: "Aplica 20-nov-2026",
    ejes: ["Crédito"],
    categorias: ["Protección al consumidor","Modelos de negocio"],
    riesgos: ["Sobreendeudamiento","Riesgo de crédito","Información asimétrica"],
    titulo: "CCD2 — Directiva de Crédito al Consumo II",
    cambio: "Transpuesta a legislación nacional (plazo nov 2025), aplica desde el 20 nov 2026. Por primera vez cubre BNPL, microcréditos <200€ y préstamos sin interés: evaluación de solvencia, límites de TAE y transparencia.",
    impacto: "Más protección frente al sobreendeudamiento; el chequeo de solvencia puede reducir el acceso al crédito marginal.",
    url: "https://www.hoganlovells.com/en/publications/eu-second-consumer-credit-directive-scope-and-impact-for-buy-now-pay-later-bnpl-providers", fuente: "Hogan Lovells / Signicat",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "Unión Europea",
    estatus: "En curso", fecha: "Desde 2-ago-2026",
    ejes: ["Crédito","Innovación"],
    categorias: ["Tecnología y datos","Protección al consumidor"],
    riesgos: ["Sesgo algorítmico","Falta de explicabilidad","Gobernanza de modelos algorítmicos"],
    titulo: "AI Act — scoring crediticio de alto riesgo",
    cambio: "El scoring y las decisiones de préstamo se clasifican como IA de alto riesgo (Anexo III). Desde el 2 ago 2026 aplican obligaciones de gobernanza de datos, supervisión humana y documentación; sanciones hasta 3% de la facturación global.",
    impacto: "Modelos de crédito más auditables y menos sesgados; sube el costo de cumplimiento para prestamistas digitales.",
    url: "https://euaicompass.com/eu-ai-act-for-financial-services.html", fuente: "EU AI Compass / RegulatoryAI",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "UE · ESMA · EBA",
    estatus: "Vigente", fecha: "2024–2025",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Cumplimiento y supervisión"],
    riesgos: ["Contagio sistémico (stablecoins)","Lavado de dinero","Riesgo de custodia","Protección al consumidor"],
    titulo: "MiCA — mercados de criptoactivos",
    cambio: "Reglas de stablecoins aplicables desde jun 2024 y autorización de proveedores (CASP) desde dic 2024, con transición nacional hasta jul 2026. La «Travel Rule» rige desde ene 2025 sin umbral mínimo.",
    impacto: "Primer mercado cripto regulado paneuropeo; protege al usuario minorista y da certeza a emisores.",
    url: "https://www.nortonrosefulbright.com/en/knowledge/publications/2cec201e/regulating-crypto-assets-in-europe-practical-guide-to-mica", fuente: "Norton Rose / Elliptic",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "UE · AES (EBA · ESMA · EIOPA)",
    estatus: "Vigente", fecha: "Desde 17-ene-2025",
    ejes: ["Innovación"],
    categorias: ["Tecnología y datos","Macroprudencial"],
    riesgos: ["Fallos de disponibilidad/resiliencia","Ciberriesgo","Concentración de proveedores críticos","Riesgo operacional"],
    titulo: "DORA — Resiliencia Operativa Digital",
    cambio: "Aplica desde el 17 ene 2025. Marco de resiliencia operativa digital del sector financiero; en nov 2025 las Autoridades Europeas de Supervisión designaron 19 proveedores tecnológicos «críticos» (incl. Amazon, Google, IBM) bajo supervisión directa.",
    impacto: "Reduce el riesgo de que la caída de un proveedor cloud paralice pagos y cuentas; atiende la concentración tecnológica.",
    url: "https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_en", fuente: "EIOPA / EBA",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "UE · AMLA (Fráncfort)",
    estatus: "En curso", fecha: "AMLA 2025 · AMLR 2027",
    ejes: ["Inclusión","Innovación"],
    categorias: ["Cumplimiento y supervisión"],
    riesgos: ["Gaps en KYC/AML","Lavado de dinero","Incumplimiento normativo","Sanciones"],
    titulo: "AMLA + Reglamento único AML (AMLR)",
    cambio: "La Autoridad Antilavado (AMLA), con sede en Fráncfort, es operativa desde el 1 jul 2025. El Reglamento único (AMLR) aplicará desde el 10 jul 2027, reemplazando cinco directivas por un rulebook común para banca, fintech y cripto.",
    impacto: "Armoniza el KYC/AML europeo; su endurecimiento puede acentuar el «de-risking» y excluir clientes considerados de alto riesgo.",
    url: "https://financialregulations.eu/blog/eu-aml-package-amla-amlr-guide", fuente: "FinancialRegulations.eu / PwC",
  },
  {
    jurisdiccion: "Unión Europea", flag: "🇪🇺", regulador: "BCE · co-legisladores UE",
    estatus: "En curso", fecha: "Fase siguiente oct-2025",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Pagos y cuentas","Cripto y activos digitales"],
    riesgos: ["Desintermediación bancaria","Privacidad de datos","Riesgo de liquidez","Ciberriesgo"],
    titulo: "Euro digital (CBDC minorista)",
    cambio: "El BCE pasó a la siguiente fase el 29 oct 2025 y apunta a estar listo para una posible primera emisión en 2029, si los colegisladores adoptan el reglamento en 2026. Propone límites de tenencia y remuneración cero.",
    impacto: "Dinero público digital de acceso universal; suscita debate por privacidad y por la desintermediación de depósitos bancarios.",
    url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html", fuente: "BCE",
  },
  {
    jurisdiccion: "Reino Unido", flag: "🇬🇧", regulador: "Parlamento · HM Treasury · FCA",
    estatus: "Vigente", fecha: "2025–2026",
    ejes: ["Innovación","Inclusión"],
    categorias: ["Tecnología y datos","Pagos y cuentas"],
    riesgos: ["Privacidad de datos","Fraude en API","Fallos de interoperabilidad"],
    titulo: "Data (Use and Access) Act 2025 + «Smart Data»",
    cambio: "Con sanción real en 2025, da base legal permanente al open banking dentro de un marco de «smart data» multisectorial. La FCA recibirá en 2026 nuevos poderes para fijar reglas de open banking y open finance.",
    impacto: "Portabilidad de datos más allá de la banca; potencia comparación y acceso a productos para consumidores y PYMES.",
    url: "https://www.fca.org.uk/news/press-releases/fca-sets-out-vision-open-finance", fuente: "FCA / Linklaters",
  },
  {
    jurisdiccion: "Reino Unido", flag: "🇬🇧", regulador: "Banco de Inglaterra · PRA · FCA",
    estatus: "Vigente", fecha: "Supervisión desde 13-jul-2026",
    ejes: ["Innovación"],
    categorias: ["Tecnología y datos","Macroprudencial"],
    riesgos: ["Concentración de proveedores críticos","Fallos de disponibilidad/resiliencia","Ciberriesgo","Riesgo operacional"],
    titulo: "Régimen de Terceros Críticos (CTP)",
    cambio: "Reglas en vigor desde ene 2025; el 13 jul 2026 los tres reguladores iniciaron la supervisión de los primeros proveedores críticos designados por el Tesoro: AWS, Google Cloud, Microsoft y Oracle.",
    impacto: "Mitiga el riesgo sistémico de la dependencia del sector financiero en unos pocos proveedores cloud globales.",
    url: "https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt", fuente: "Banco de Inglaterra / FCA",
  },
  {
    jurisdiccion: "Reino Unido", flag: "🇬🇧", regulador: "FCA",
    estatus: "En curso", fecha: "Desde 15-jul-2026",
    ejes: ["Crédito"],
    categorias: ["Protección al consumidor","Modelos de negocio"],
    riesgos: ["Riesgo de crédito","Información asimétrica","Producto no adecuado"],
    titulo: "BNPL bajo autorización de la FCA",
    cambio: "Desde el 15 jul 2026, los proveedores de «compra ahora, paga después» deben contar con autorización de la FCA o acogerse al Régimen de Permisos Temporales.",
    impacto: "Extiende protecciones de crédito al consumo (evaluación de asequibilidad, quejas) al BNPL antes no regulado.",
    url: "https://bratby.law/fca-open-banking-regulation/", fuente: "FCA / Bratby Law",
  },
  {
    jurisdiccion: "Brasil", flag: "🇧🇷", regulador: "Banco Central do Brasil",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Inclusión","Innovación"],
    categorias: ["Pagos y cuentas","Cripto y activos digitales"],
    riesgos: ["Fallos de disponibilidad/resiliencia","Concentración de proveedores","Fraude en tiempo real"],
    titulo: "Pix Internacional + Drex (real digital)",
    cambio: "Pix inicia su internacionalización (Argentina, mar 2026; corredores hacia EE.UU. y Portugal). El Drex avanza a su Fase 2 en liquidación de activos tokenizados, cesión de créditos y colateralización, sin acceso directo del consumidor aún.",
    impacto: "Pagos instantáneos gratuitos a escala poblacional y potencial de crédito con colateral tokenizado y menor costo.",
    url: "https://www.sciencedirect.com/science/article/pii/S2666143826000104", fuente: "ScienceDirect / ProMarket",
  },
  {
    jurisdiccion: "Asia", flag: "🇭🇰", regulador: "HKMA (Hong Kong)",
    estatus: "Vigente", fecha: "Ago 2025",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Cumplimiento y supervisión"],
    riesgos: ["Contagio sistémico (stablecoins)","Riesgo de custodia","Lavado de dinero"],
    titulo: "Hong Kong — Stablecoins Ordinance",
    cambio: "En vigor desde ago 2025: régimen obligatorio de licencias para emisores de stablecoins referenciadas a moneda fiat, con sandbox previo. Las primeras licencias (HSBC y Anchorpoint) se otorgaron en abr 2026 (36 solicitudes).",
    impacto: "Posiciona a Hong Kong como hub regulado de activos digitales; da confianza a pagos y liquidación transfronteriza.",
    url: "https://www.hkma.gov.hk/eng/key-functions/international-financial-centre/stablecoin-issuers/", fuente: "HKMA / FCKL Law",
  },
  {
    jurisdiccion: "Asia", flag: "🇸🇬", regulador: "MAS (Singapur)",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales"],
    riesgos: ["Contagio sistémico (stablecoins)","Riesgo de custodia","Protección al consumidor"],
    titulo: "Singapur — marco de stablecoins del MAS",
    cambio: "El MAS prepara legislación en 2026, con entrada en vigor hacia mediados de año. Solo las stablecoins ancladas al SGD o a monedas del G10, con respaldo total en activos líquidos de alta calidad, serán «MAS-regulated».",
    impacto: "Estándar de confianza para pagos digitales; sello regulatorio que distingue stablecoins seguras de las que no lo son.",
    url: "https://bvnk.com/blog/global-stablecoin-regulations-2026", fuente: "BVNK / Plasma",
  },
  {
    jurisdiccion: "Asia", flag: "🇮🇳", regulador: "RBI (India)",
    estatus: "Vigente", fecha: "May 2025",
    ejes: ["Crédito","Inclusión"],
    categorias: ["Modelos de negocio","Protección al consumidor"],
    riesgos: ["Riesgo de crédito","Privacidad de datos","Fraude en plataformas"],
    titulo: "India — Digital Lending Directions 2025",
    cambio: "Emitidas el 8 may 2025 para dar transparencia y protección en apps de préstamo. Se apoyan en el sistema de Account Aggregator y en líneas de crédito preaprobadas sobre UPI, con desembolso directo a cuenta en minutos.",
    impacto: "Crédito instantáneo con más resguardos al consumidor; amplía el acceso formal frente a prestamistas informales.",
    url: "https://www.lawrbit.com/article/reserve-bank-of-india-digital-lending-directions-2025/", fuente: "RBI / Lawrbit",
  },
  {
    jurisdiccion: "Asia", flag: "🇯🇵", regulador: "Dieta · FSA (Japón)",
    estatus: "Vigente", fecha: "Jul 2026",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Cumplimiento y supervisión"],
    riesgos: ["Volatilidad de mercado","Protección al inversor","Riesgo regulatorio"],
    titulo: "Japón — reforma de la Ley FIEA (activos digitales)",
    cambio: "El 15 jul 2026 la Dieta aprobó enmiendas a la Financial Instruments and Exchange Act que reclasifican muchos criptoactivos como instrumentos financieros (no solo medios de pago), con un impuesto plano cercano al 20%.",
    impacto: "Integra los criptoactivos al marco de valores, con más protección al inversionista y trato fiscal equiparable a acciones.",
    url: "https://www.financemagnates.com/cryptocurrency/regulation/japan-plans-20-crypto-tax-reclassifies-digital-assets-as-financial-products/", fuente: "Finance Magnates",
  },
  {
    jurisdiccion: "Asia", flag: "🇰🇷", regulador: "Asamblea Nacional · FSC (Corea)",
    estatus: "Propuesto", fecha: "2026",
    ejes: ["Innovación"],
    categorias: ["Cripto y activos digitales","Cumplimiento y supervisión"],
    riesgos: ["Riesgo de custodia","Contagio sistémico (stablecoins)","Protección al consumidor"],
    titulo: "Corea del Sur — Digital Asset Basic Act (DABA)",
    cambio: "Marco integral para el mercado privado de criptoactivos: licencias para exchanges y emisores de stablecoin, reglas de trading, estándares de custodia y requisitos de reserva. Avanza junto a la reclasificación de activos del Estado.",
    impacto: "Daría certidumbre a un mercado de alta adopción y abriría la emisión regulada de stablecoins en won.",
    url: "https://www.dlnews.com/articles/markets/south-korea-japan-aim-for-2026-stablecoin-breakthrough/", fuente: "DL News / TechTimes",
  },
  {
    jurisdiccion: "Internacional", flag: "🌐", regulador: "Comité de Basilea · Fed · OCC · FDIC",
    estatus: "En curso", fecha: "Mar 2026",
    ejes: ["Crédito"],
    categorias: ["Macroprudencial","Cumplimiento y supervisión"],
    riesgos: ["Requerimientos de capital","Prociclicidad","Riesgo de crédito"],
    titulo: "Basilea III «Endgame» — re-propuesta de capital",
    cambio: "El 19 mar 2026, los reguladores de EE.UU. reabrieron la implementación de las revisiones de Basilea III con tres propuestas de capital (comentarios al 18 jun 2026). Estiman que el capital total del sistema «bajaría modestamente».",
    impacto: "Los requisitos de capital bancario condicionan el apetito y el costo del crédito, sobre todo para hipotecas y PYMES.",
    url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260319a.htm", fuente: "Federal Reserve / Freshfields",
  },
  {
    jurisdiccion: "Internacional", flag: "🌐", regulador: "GAFI / FATF",
    estatus: "En curso", fecha: "2025–2026",
    ejes: ["Innovación"],
    categorias: ["Cumplimiento y supervisión","Cripto y activos digitales"],
    riesgos: ["Lavado de dinero","Riesgo regulatorio","Fallos de interoperabilidad"],
    titulo: "FATF — «Travel Rule» para criptoactivos",
    cambio: "La sexta actualización del GAFI reporta 99 jurisdicciones implementando la regla de trazabilidad de transferencias cripto, con foco creciente en stablecoins como vehículo de actividad ilícita on-chain.",
    impacto: "Estándar global de integridad: eleva la trazabilidad y el costo de cumplimiento, y condiciona la interoperabilidad transfronteriza.",
    url: "https://www.chainalysis.com/blog/2025-crypto-regulatory-round-up/", fuente: "Chainalysis / Elliptic",
  },
  {
    jurisdiccion: "Internacional", flag: "🌐", regulador: "FSB (Consejo de Estabilidad Financiera)",
    estatus: "En curso", fecha: "Revisión oct-2025",
    ejes: ["Innovación"],
    categorias: ["Macroprudencial","Cripto y activos digitales"],
    riesgos: ["Contagio sistémico (stablecoins)","Arbitraje regulatorio","Datos insuficientes para supervisión","Riesgo regulatorio"],
    titulo: "FSB — marco global para cripto y stablecoins",
    cambio: "La revisión de pares (oct 2025) halló implementación fragmentada e insuficiente del marco global «misma actividad, mismo riesgo, misma regulación»: solo 11 jurisdicciones con marco cripto completo y 5 para stablecoins, con un mercado cripto de US$4 billones.",
    impacto: "Señala vacíos de estabilidad financiera y espacio de arbitraje regulatorio que pueden transmitir shocks al sistema bancario.",
    url: "https://www.fsb.org/2025/10/fsb-finds-significant-gaps-and-inconsistencies-in-implementation-of-crypto-and-stablecoin-recommendations/", fuente: "Financial Stability Board",
  },
];

export interface Hito {
  periodo: string;
  fecha: string;
  jurisdiccion: string;
  flag: string;
  certeza: string;
  ejes: string[];
  titulo: string;
  que: string;
  url: string;
  fuente: string;
}

export const PERIODOS = ["2º sem. 2026","2027","2028","2029 y más allá","Sin fecha fija","Tendencias 2026–2030"];

export const HITOS: Hito[] = [
  {
    periodo: "2º sem. 2026", fecha: "2 ago 2026", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "Fijado", ejes: ["Crédito","Innovación"],
    titulo: "AI Act — obligaciones de alto riesgo para el scoring crediticio",
    que: "Entran en vigor gobernanza de datos, supervisión humana y documentación para modelos de scoring y decisiones de préstamo.",
    url: "https://euaicompass.com/eu-ai-act-for-financial-services.html", fuente: "EU AI Compass",
  },
  {
    periodo: "2º sem. 2026", fecha: "20 nov 2026", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "Fijado", ejes: ["Crédito"],
    titulo: "CCD2 — aplica la nueva Directiva de Crédito al Consumo",
    que: "BNPL, microcréditos y préstamos sin interés quedan sujetos a evaluación de solvencia, límites de TAE y transparencia.",
    url: "https://www.hoganlovells.com/en/publications/eu-second-consumer-credit-directive-scope-and-impact-for-buy-now-pay-later-bnpl-providers", fuente: "Hogan Lovells",
  },
  {
    periodo: "2º sem. 2026", fecha: "2º sem. 2026", jurisdiccion: "Reino Unido", flag: "🇬🇧",
    certeza: "Fijado", ejes: ["Innovación","Inclusión"],
    titulo: "FCA consulta el marco de largo plazo de open banking / open finance",
    que: "La FCA abrirá consulta sobre las reglas permanentes tras recibir nuevos poderes del Tesoro en 2026.",
    url: "https://www.fca.org.uk/news/press-releases/fca-sets-out-vision-open-finance", fuente: "FCA",
  },
  {
    periodo: "2º sem. 2026", fecha: "Fin 2026", jurisdiccion: "Internacional", flag: "🌐",
    certeza: "En discusión", ejes: ["Crédito"],
    titulo: "Basilea III «Endgame» — finalización de la re-propuesta de capital",
    que: "Tras cerrar comentarios el 18 jun 2026, se espera la finalización de las reglas de capital bancario en EE.UU.",
    url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260319a.htm", fuente: "Federal Reserve",
  },
  {
    periodo: "2º sem. 2026", fecha: "2º sem. 2026", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "En discusión", ejes: ["Innovación","Inclusión"],
    titulo: "Euro digital — adopción del reglamento por los colegisladores",
    que: "El BCE trabaja bajo el supuesto de que Parlamento y Consejo adopten el reglamento del euro digital durante 2026.",
    url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html", fuente: "BCE",
  },
  {
    periodo: "2º sem. 2026", fecha: "2026", jurisdiccion: "Asia", flag: "🇰🇷",
    certeza: "En discusión", ejes: ["Innovación"],
    titulo: "Corea del Sur — Digital Asset Basic Act (DABA)",
    que: "Se espera la aprobación del marco integral de criptoactivos: licencias de exchanges y emisores de stablecoin.",
    url: "https://www.dlnews.com/articles/markets/south-korea-japan-aim-for-2026-stablecoin-breakthrough/", fuente: "DL News",
  },
  {
    periodo: "2º sem. 2026", fecha: "2026", jurisdiccion: "EE.UU.", flag: "🇺🇸",
    certeza: "En discusión", ejes: ["Innovación"],
    titulo: "CFPB — regla 1033 revisada de open banking",
    que: "Tras el ANPR de ago 2025, el CFPB debe publicar una versión revisada; texto y fecha aún inciertos.",
    url: "https://www.cozen.com/news-resources/publications/2026/section-1033-compliance-date-open-banking-rule-enjoined-and-under-reconsideration", fuente: "Cozen O'Connor",
  },
  {
    periodo: "2027", fecha: "~ene 2027", jurisdiccion: "EE.UU.", flag: "🇺🇸",
    certeza: "Fijado", ejes: ["Innovación"],
    titulo: "GENIUS Act — entrada en vigor plena del marco de stablecoins",
    que: "Aplica a los 18 meses de la firma o 120 días tras las reglas finales de los reguladores federales.",
    url: "https://www.federalregister.gov/documents/2025/09/19/2025-18226/genius-act-implementation", fuente: "Federal Register",
  },
  {
    periodo: "2027", fecha: "10 jul 2027", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "Fijado", ejes: ["Inclusión","Innovación"],
    titulo: "AMLR — aplica el Reglamento único antilavado",
    que: "Rulebook común de KYC/AML para banca, fintech y cripto; inicio de la implementación por fases.",
    url: "https://financialregulations.eu/blog/eu-aml-package-amla-amlr-guide", fuente: "FinancialRegulations.eu",
  },
  {
    periodo: "2027", fecha: "2027 (objetivo)", jurisdiccion: "Internacional", flag: "🌐",
    certeza: "Fijado", ejes: ["Inclusión","Innovación"],
    titulo: "BIS Project Nexus — pagos instantáneos transfronterizos",
    que: "Go-live objetivo para interconectar los sistemas de India y cuatro países ASEAN mediante un hub común, reduciendo el costo de remesas.",
    url: "https://www.bis.org/about/bisih/topics/fmis/nexus.htm", fuente: "BIS",
  },
  {
    periodo: "2027", fecha: "~2027", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "Fijado", ejes: ["Innovación"],
    titulo: "PSD3 / PSR — fin del periodo de transición",
    que: "Concluye la transición de 21 meses; aplican plenamente las nuevas reglas de servicios de pago y antifraude.",
    url: "https://www.nortonrosefulbright.com/en/knowledge/publications/cedd39c6/psd3-and-psr-from-provisional-agreement-to-2026-readiness", fuente: "Norton Rose Fulbright",
  },
  {
    periodo: "2027", fecha: "Mediados 2027", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "En discusión", ejes: ["Innovación"],
    titulo: "Euro digital — posibles pruebas piloto y primeras transacciones",
    que: "El BCE prevé que los ejercicios piloto podrían iniciar hacia mediados de 2027, sujeto a la ley.",
    url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html", fuente: "BCE",
  },
  {
    periodo: "2027", fecha: "2027", jurisdiccion: "Brasil", flag: "🇧🇷",
    certeza: "En discusión", ejes: ["Inclusión"],
    titulo: "Pix internacional — expansión de corredores transfronterizos",
    que: "Proyecto para conectar Pix con más países y abaratar transferencias; en desarrollo con disputas competitivas abiertas.",
    url: "https://www.bis.org/cpmi/pietf/fps_feb_2026.pdf", fuente: "BIS CPMI",
  },
  {
    periodo: "2028", fecha: "1 ene 2028", jurisdiccion: "EE.UU.", flag: "🇺🇸",
    certeza: "Fijado", ejes: ["Crédito"],
    titulo: "Sección 1071 — cumplimiento de datos de crédito a PYMES",
    que: "Fecha de cumplimiento (versión reducida) para que las instituciones cubiertas reporten datos de préstamos a pequeñas empresas.",
    url: "https://www.federalregister.gov/documents/2026/05/01/2026-08494/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b", fuente: "Federal Register",
  },
  {
    periodo: "2029 y más allá", fecha: "2029", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "En discusión", ejes: ["Innovación","Inclusión"],
    titulo: "Euro digital — posible primera emisión",
    que: "Supuesto de trabajo del BCE para estar listo ante una eventual primera emisión del euro digital.",
    url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr251030~8c5b5beef0.en.html", fuente: "BCE",
  },
  {
    periodo: "2029 y más allá", fecha: "2029–2030", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "En discusión", ejes: ["Innovación","Inclusión"],
    titulo: "FiDA — entrada en operación del open finance amplio",
    que: "El marco de acceso a datos financieros (hipotecas, ahorro, seguros, pensiones) sería operativo hacia 2029–2030.",
    url: "https://finance.ec.europa.eu/digital-finance/framework-financial-data-access_en", fuente: "Comisión Europea",
  },
  {
    periodo: "2029 y más allá", fecha: "10 jul 2029", jurisdiccion: "Unión Europea", flag: "🇪🇺",
    certeza: "Fijado", ejes: ["Inclusión"],
    titulo: "AMLR — fin de la implementación por fases",
    que: "Concluye el despliegue escalonado del rulebook único antilavado en los 27 Estados miembros.",
    url: "https://financialregulations.eu/blog/eu-aml-package-amla-amlr-guide", fuente: "FinancialRegulations.eu",
  },
  {
    periodo: "Sin fecha fija", fecha: "Iniciativa", jurisdiccion: "México", flag: "🇲🇽",
    certeza: "En discusión", ejes: ["Innovación","Crédito"],
    titulo: "México — Ley de Activos Virtuales Estables (AVE)",
    que: "Iniciativa en el Senado para stablecoins del peso con reservas al 100%; sin fecha de dictamen.",
    url: "https://www.criptonoticias.com/regulacion/mexico-regular-stablecoins-peso-senado/", fuente: "CriptoNoticias",
  },
  {
    periodo: "Sin fecha fija", fecha: "Pendiente", jurisdiccion: "México", flag: "🇲🇽",
    certeza: "En discusión", ejes: ["Innovación","Inclusión"],
    titulo: "México — reglas de finanzas abiertas (Ley Fintech)",
    que: "Reglas secundarias de open finance aún no emitidas; existe amparo por la omisión regulatoria.",
    url: "https://armor-aml.com/que-viene-para-la-ley-fintech-en-el-2026-cuando-open-finance-y-el-sandbox-siguen-pendientes/", fuente: "ArmorAML",
  },
  {
    periodo: "Sin fecha fija", fecha: "En el Senado", jurisdiccion: "EE.UU.", flag: "🇺🇸",
    certeza: "En discusión", ejes: ["Innovación"],
    titulo: "EE.UU. — CLARITY Act (estructura de mercado cripto)",
    que: "Aprobada por la Cámara en jul 2025; pendiente de votación en el Senado.",
    url: "https://www.lw.com/en/us-crypto-policy-tracker/legislative-developments", fuente: "Latham & Watkins",
  },
  {
    periodo: "Tendencias 2026–2030", fecha: "Proyección", jurisdiccion: "Global", flag: "🌐",
    certeza: "Tendencia", ejes: ["Innovación"],
    titulo: "Convergencia global del estándar de stablecoins",
    que: "EE.UU., UE y Asia coinciden en reservas al 100% y licencia: se perfila un estándar de facto para pagos digitales.",
    url: "https://www.fsb.org/2025/10/fsb-finds-significant-gaps-and-inconsistencies-in-implementation-of-crypto-and-stablecoin-recommendations/", fuente: "FSB",
  },
  {
    periodo: "Tendencias 2026–2030", fecha: "Proyección", jurisdiccion: "Global", flag: "🌐",
    certeza: "Tendencia", ejes: ["Inclusión"],
    titulo: "Pagos instantáneos transfronterizos de bajo costo",
    que: "Nexus, Pix internacional y la interconexión UPI–Pix apuntan a una nueva capa de remesas rápida y barata.",
    url: "https://www.bis.org/about/bisih/topics/fmis/nexus.htm", fuente: "BIS",
  },
  {
    periodo: "Tendencias 2026–2030", fecha: "Proyección", jurisdiccion: "Global", flag: "🌐",
    certeza: "Tendencia", ejes: ["Crédito"],
    titulo: "La supervisión de IA en crédito se difunde más allá de la UE",
    que: "Auditoría de sesgo y explicabilidad del scoring tienden a volverse estándar en otras jurisdicciones.",
    url: "https://euaicompass.com/eu-ai-act-for-financial-services.html", fuente: "EU AI Compass",
  },
  {
    periodo: "Tendencias 2026–2030", fecha: "Proyección", jurisdiccion: "Global", flag: "🌐",
    certeza: "Tendencia", ejes: ["Innovación"],
    titulo: "Regímenes de proveedores «críticos» (cloud) se replican",
    que: "Tras DORA (UE) y el régimen CTP (UK), otros mercados podrían supervisar directamente a los grandes proveedores cloud.",
    url: "https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_en", fuente: "EIOPA",
  },
  {
    periodo: "Tendencias 2026–2030", fecha: "Proyección", jurisdiccion: "Global", flag: "🌐",
    certeza: "Tendencia", ejes: ["Innovación","Inclusión"],
    titulo: "Presión por reciprocidad y estándares comunes de open finance",
    que: "La expansión del acceso a datos (UE, UK, México, Brasil, India) empuja hacia interoperabilidad y estándares compartidos.",
    url: "https://finance.ec.europa.eu/digital-finance/framework-financial-data-access_en", fuente: "Comisión Europea",
  },
];

/** tipo: v = verificable · i = interpretación del autor · p = proyección */
export interface Tendencia {
  eje: string;
  nombre: string;
  adopcion: number;
  impacto: number;
  magnitud: number;
  horizonte: string;
  tipo: string;
  detalle: string;
}

export const EJES_TENDENCIA: Record<string, { label: string; color: string }> = {
  tech: { label: "Tecnología", color: "#1FC9A0" },
  infra: { label: "Infraestructura", color: "#5BD0E0" },
  reg: { label: "Regulación", color: "#E8B452" },
  modelo: { label: "Modelo de negocio", color: "#E8825A" },
  cap: { label: "Capital", color: "#9FCE2E" },
  geo: { label: "Geografía", color: "#9B8CF0" },
  prop: { label: "Propósito / impacto", color: "#FF7A9E" },
};

export const TIPOS_TENDENCIA: Record<string, { label: string; desc: string }> = {
  v: { label: "Verificable", desc: "dato con fuente" },
  i: { label: "Interpretación", desc: "lectura del autor" },
  p: { label: "Proyección", desc: "estimación a futuro" },
};

export const TENDENCIAS: Tendencia[] = [
  {
    eje: "tech", nombre: "IA agéntica (pagos)", adopcion: 44, impacto: 92, magnitud: 24,
    horizonte: "Siguiente", tipo: "p",
    detalle: "Agentes con credencial de pago que compran y liquidan de forma autónoma. McKinsey: USD 1–5 B en ventas agénticas a 2030.",
  },
  {
    eje: "tech", nombre: "IA en fraude y AML", adopcion: 67, impacto: 69, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "Investigación automatizada de fraude y lavado; uno de los usos más maduros hoy en producción.",
  },
  {
    eje: "tech", nombre: "IA en suscripción de crédito", adopcion: 58, impacto: 67, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "Modelos que evalúan riesgo y monitorean cartera; amplían acceso pero exigen explicabilidad.",
  },
  {
    eje: "tech", nombre: "Stablecoins · liquidación", adopcion: 60, impacto: 85, magnitud: 24,
    horizonte: "Ahora", tipo: "v",
    detalle: "De activo especulativo a 'plomería' de pago. ~USD 307–320 mil M; USD 2–4 B proyectados a 2030.",
  },
  {
    eje: "tech", nombre: "Tokenización de activos (RWA)", adopcion: 30, impacto: 80, magnitud: 22,
    horizonte: "Después", tipo: "p",
    detalle: "Activos reales on-chain con liquidación T+0. Proyección 2030: USD 2 B (McKinsey) – 16 B (BCG).",
  },
  {
    eje: "tech", nombre: "Pagos en tiempo real (A2A)", adopcion: 80, impacto: 63, magnitud: 18,
    horizonte: "Ahora", tipo: "v",
    detalle: "Transferencias instantáneas cuenta a cuenta; base del sistema (Pix, UPI).",
  },
  {
    eje: "tech", nombre: "Libro unificado / CBDC mayorista", adopcion: 22, impacto: 73, magnitud: 18,
    horizonte: "Después", tipo: "i",
    detalle: "Libro único regulado (BIS, Proyecto Agorá): banco central + depósitos + bonos tokenizados. Alternativa a las stablecoins privadas.",
  },
  {
    eje: "modelo", nombre: "Embedded finance / BaaS", adopcion: 62, impacto: 78, magnitud: 22,
    horizonte: "Ahora", tipo: "p",
    detalle: "Finanzas insertadas en apps no financieras. Mercado ~USD 7,2 B a 2030. Reduce el costo de adquisición.",
  },
  {
    eje: "modelo", nombre: "Verticalización B2B", adopcion: 54, impacto: 60, magnitud: 15,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Fintech especializada por industria y API-first: monetiza el momento financiero del recorrido del cliente.",
  },
  {
    eje: "modelo", nombre: "Monetización · lending", adopcion: 70, impacto: 70, magnitud: 18,
    horizonte: "Ahora", tipo: "v",
    detalle: "El libro de crédito y el ARPU cavan el foso: interchange, spread e interés. Núcleo de la rentabilidad.",
  },
  {
    eje: "modelo", nombre: "Escalera de suscripción", adopcion: 64, impacto: 55, magnitud: 14,
    horizonte: "Ahora", tipo: "v",
    detalle: "Planes recurrentes que elevan el ingreso por usuario; parte del manual de los rentables.",
  },
  {
    eje: "modelo", nombre: "Consolidación / M&A", adopcion: 47, impacto: 54, magnitud: 17,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Rentables y holdings de pago (Block, PayPal) compran fintechs sub-escala; bancos absorben stack y talento.",
  },
  {
    eje: "modelo", nombre: "Superapps financieras", adopcion: 40, impacto: 57, magnitud: 15,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Integración de múltiples servicios en una sola app (modelo asiático) como estrategia de retención.",
  },
  {
    eje: "reg", nombre: "GENIUS Act (stablecoins EE. UU.)", adopcion: 64, impacto: 72, magnitud: 17,
    horizonte: "Ahora", tipo: "v",
    detalle: "Marco legal para stablecoins de pago (2025); habilita adopción institucional.",
  },
  {
    eje: "reg", nombre: "MiCA (UE)", adopcion: 69, impacto: 66, magnitud: 15,
    horizonte: "Ahora", tipo: "v",
    detalle: "Estandariza cripto y stablecoins en el mercado único europeo.",
  },
  {
    eje: "reg", nombre: "Open finance · regla 1033", adopcion: 50, impacto: 67, magnitud: 17,
    horizonte: "Ahora", tipo: "v",
    detalle: "Fin del screen-scraping; API obligatorias en EE. UU. (en litigio).",
  },
  {
    eje: "reg", nombre: "PSD3 / PSR (UE)", adopcion: 46, impacto: 62, magnitud: 15,
    horizonte: "Siguiente", tipo: "v",
    detalle: "Reemplazo de PSD2: API exigibles y más antifraude (vigencia plena ~2028).",
  },
  {
    eje: "reg", nombre: "EU AI Act / Know Your Agent", adopcion: 35, impacto: 57, magnitud: 14,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Trazabilidad de decisiones automatizadas; identidad criptográfica de agentes.",
  },
  {
    eje: "reg", nombre: "Arbitraje regulatorio (riesgo)", adopcion: 56, impacto: 42, magnitud: 14,
    horizonte: "Ahora", tipo: "i",
    detalle: "Operar funciones cuasi-bancarias fuera del perímetro prudencial: motor de expansión y fuente de riesgo sistémico.",
  },
  {
    eje: "geo", nombre: "LatAm · Pix + Nubank", adopcion: 72, impacto: 76, magnitud: 22,
    horizonte: "Ahora", tipo: "v",
    detalle: "Mercado ~USD 48,7 mil M (2026) → ~240 mil M (2035). Nubank: 127 M clientes; 37 M nuevos al sistema formal.",
  },
  {
    eje: "geo", nombre: "India · UPI + Account Aggregators", adopcion: 70, impacto: 62, magnitud: 18,
    horizonte: "Ahora", tipo: "v",
    detalle: "Infraestructura pública de datos: ~3.000 M de cuentas en el marco de agregadores.",
  },
  {
    eje: "geo", nombre: "África · dinero móvil", adopcion: 66, impacto: 58, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "El dinero móvil impulsa la mayor alza de inclusión registrada (Findex 2025).",
  },
  {
    eje: "geo", nombre: "México subpenetrado", adopcion: 60, impacto: 66, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "Solo 46% de adultos bancarizado vs 76% global: el mayor reservorio de crecimiento de la región.",
  },
  {
    eje: "infra", nombre: "Protocolos de pago agéntico", adopcion: 32, impacto: 82, magnitud: 20,
    horizonte: "Siguiente", tipo: "v",
    detalle: "AP2 (Google), ACP (Stripe), x402 (Coinbase), Visa TAP, Mastercard Agent Suite. Quien lo estandarice captura la posición de las redes de tarjetas.",
  },
  {
    eje: "infra", nombre: "Liquidación atómica T+0", adopcion: 40, impacto: 66, magnitud: 15,
    horizonte: "Después", tipo: "i",
    detalle: "La tokenización comprime el ciclo de settlement de T+2 a T+0: menos capital inmovilizado.",
  },
  {
    eje: "infra", nombre: "Identidad digital / KYA", adopcion: 34, impacto: 63, magnitud: 15,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Registro y firma de agentes: la capa de confianza de los pagos autónomos.",
  },
  {
    eje: "infra", nombre: "Modernización del core bancario", adopcion: 52, impacto: 49, magnitud: 14,
    horizonte: "Ahora", tipo: "i",
    detalle: "Migración a la nube y sistemas modulares como condición previa para aprovechar la IA.",
  },
  {
    eje: "prop", nombre: "Inclusión financiera", adopcion: 68, impacto: 70, magnitud: 18,
    horizonte: "Ahora", tipo: "v",
    detalle: "79% de adultos con cuenta (Findex 2025, +5 pp desde 2021); 1.300 M aún sin bancarizar.",
  },
  {
    eje: "prop", nombre: "Ahorro formal", adopcion: 60, impacto: 60, magnitud: 15,
    horizonte: "Ahora", tipo: "v",
    detalle: "+16 pp de adultos ahorrando en una cuenta desde 2021 en economías en desarrollo: el mayor salto en una década.",
  },
  {
    eje: "prop", nombre: "Unit economics / sostenibilidad", adopcion: 55, impacto: 66, magnitud: 16,
    horizonte: "Siguiente", tipo: "i",
    detalle: "Adquisición barata (distribución embebida) o ARPU suficiente: el filtro real de la supervivencia.",
  },
  {
    eje: "prop", nombre: "Primer acceso al crédito", adopcion: 62, impacto: 57, magnitud: 14,
    horizonte: "Ahora", tipo: "v",
    detalle: "28,4 M obtuvieron su primera tarjeta con Nubank: inclusión que alimenta directamente la rentabilidad.",
  },
  {
    eje: "cap", nombre: "Colaboración incumbente–fintech", adopcion: 60, impacto: 64, magnitud: 20,
    horizonte: "Ahora", tipo: "v",
    detalle: "Inversión minoritaria + alianza (no adquisición total). >78% de bancos en EE. UU. aumentará su inversión. CVC: Visa Ventures, Mastercard Start Path, GS Growth.",
  },
  {
    eje: "cap", nombre: "Inversión de incumbentes (IA/tech)", adopcion: 73, impacto: 56, magnitud: 19,
    horizonte: "Ahora", tipo: "v",
    detalle: "Gasto récord: JPMorgan ~USD 19,8 mil M (1,2 mil M en IA); Bank of America ~USD 14 mil M.",
  },
  {
    eje: "cap", nombre: "Concentración del capital VC", adopcion: 65, impacto: 51, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "USD 28,6 mil M en H1-2026 (+22,7%). Operaciones -25% pero monto +23%. La IA capta ~80% del venture global.",
  },
  {
    eje: "cap", nombre: "Mortalidad de fintechs", adopcion: 83, impacto: 39, magnitud: 22,
    horizonte: "Ahora", tipo: "v",
    detalle: "~75% no triunfa; ~73% falla en 3 años (a menudo por regulación). Cierres +30%. Causas: sin mercado (42%), sin caja (29%).",
  },
  {
    eje: "cap", nombre: "Natalidad / nuevas fintechs", adopcion: 76, impacto: 46, magnitud: 16,
    horizonte: "Ahora", tipo: "v",
    detalle: "+30.000 fintechs nuevas en el mundo en 2024 (vs 12.200 en 2019): densidad creciente, selección darwiniana.",
  },
];
