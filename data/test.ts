/**
 * Test de preparación para la IA — `/test`.
 *
 * Diez afirmaciones (escala Likert de cinco puntos) para una entidad
 * financiera mediana de Colombia: compañía de financiamiento, cooperativa,
 * banco de nicho, aseguradora o fintech con licencia. Cada afirmación es una
 * dimensión de preparación; cada dimensión trae la proporción de empresas
 * que declara tener esa capacidad en encuestas del mundo y de América
 * Latina, con fuente, URL y año. `null` = no hay dato publicado comparable.
 *
 * Vigencia: septiembre de 2026. Las anclas regulatorias y las encuestas
 * citadas son las últimas disponibles a esa fecha; al salir una edición
 * nueva, se reemplaza la cita y se anota en /metodologia#auditoria.
 */

export type DimKey =
  | "estrategia"
  | "produccion"
  | "generativa"
  | "datos"
  | "gobierno"
  | "explicabilidad"
  | "talento"
  | "infraestructura"
  | "fraude"
  | "equidad";

export interface CitaPares {
  /** Proporción (0–100) de empresas encuestadas que declara la capacidad. */
  valor: number;
  /** Qué mide exactamente la cifra, en palabras de la fuente. */
  texto: string;
  fuente: string;
  url: string;
  anio: number;
  /** Tamaño y universo de la muestra. */
  muestra: string;
  nota?: string;
}

export interface Pregunta {
  key: DimKey;
  n: number;
  dimension: string;
  corto: string;
  enunciado: string;
  /** Qué tiene que ser cierto para responder «totalmente de acuerdo». */
  ayuda: string;
  /** Por qué esta capacidad pesa en septiembre de 2026. */
  porque: string;
  /** Primera acción concreta si la dimensión sale como brecha. */
  accion: string;
  mundo: CitaPares | null;
  latam: CitaPares | null;
  color: string;
}

export const PREGUNTAS: Pregunta[] = [
  {
    key: "estrategia",
    n: 1,
    dimension: "Estrategia y junta directiva",
    corto: "Estrategia",
    enunciado:
      "La junta directiva y el comité de presidencia revisan, al menos cada trimestre, una estrategia de IA con metas medibles, un responsable nombrado y presupuesto propio.",
    ayuda:
      "existe un documento aprobado, con indicadores y fechas; la IA aparece en la agenda de la junta con un dueño identificable y una partida presupuestal, no como un tema de tecnología que se reporta cuando hay tiempo.",
    porque:
      "En 2026 la IA ya no es un tema que tecnología reporta cuando hay tiempo. En los bancos de América Latina solo el 5 % se declara totalmente preparado para la IA, el 62 % parcialmente y el 32 % no preparado; la gobernanza de IA está concentrada en el área de riesgos en el 79 % (Felaban-PwC, 2025). Entre las empresas grandes del mundo, el 58 % tiene una estrategia de IA bien definida, frente al 99 % de las que capturan valor (Cisco, 2025). En Colombia el marco lo fijan el CONPES 4144 (política nacional a 2030) y un proyecto de ley de IA, el PL 025 de 2026, que en septiembre de 2026 sigue en Comisión Sexta de la Cámara: la junta que espera a la ley llega tarde.",
    accion:
      "Llevar a la próxima junta una página: tres casos con dueño, meta y presupuesto, y una fecha trimestral de revisión. El responsable de IA se nombra ahí, no en tecnología.",
    mundo: {
      valor: 47,
      texto: "Entidades de servicios financieros que califican su preparación en estrategia como alta o muy alta para adoptar IA.",
      fuente: "Deloitte · State of AI in the Enterprise 2026, corte de servicios financieros",
      url: "https://www.deloitte.com/content/dam/assets-shared/docs/about/2026/state-of-ai-financial-services.pdf",
      anio: 2026,
      muestra: "573 directivos de servicios financieros dentro de 3.235 encuestados en 24 países, ago–sep 2025",
    },
    latam: {
      valor: 67.0,
      texto: "Empresas con preparación plena o moderada (Pacesetters + Chasers) en el pilar Estrategia: Brasil 66 %, México 68 %; promedio simple de los dos países. Colombia no está en la muestra.",
      fuente: "Cisco · AI Readiness Index 2025, herramienta de consulta por país",
      url: "https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m11/data/data_2025.js",
      anio: 2025,
      muestra: "8.039 líderes de empresas de 500+ empleados en 30 mercados; Brasil y México son los únicos latinoamericanos",
      nota: "Aritmética del Observatorio sobre los cuatro niveles publicados por Cisco",
    },
    color: "#f0ff29",
  },
  {
    key: "produccion",
    n: 2,
    dimension: "Valor en producción",
    corto: "Producción",
    enunciado:
      "Al menos un modelo de IA (scoring, fraude, cobranza, precios o servicio) opera en producción y su impacto en ingresos, costos o pérdida esperada se mide contra una línea base.",
    ayuda:
      "no es un piloto ni una prueba de concepto: el modelo decide o recomienda en el proceso real, y hay una cifra de antes y después que finanzas reconoce.",
    porque:
      "Tener un modelo dejó de ser el diferenciador: el 81 % de los establecimientos de crédito de Colombia ya usa IA o aprendizaje automático en riesgo de crédito, con 346 modelos inventariados por la Superintendencia Financiera (corte marzo de 2025). Medirlo sí diferencia. En agosto de 2026 solo el 37 % de las empresas del mundo atribuye algún impacto en su EBIT a la IA (McKinsey, 1.719 encuestados), los CEO reportan que apenas el 25 % de las iniciativas dio el retorno esperado (IBM, 2.000 CEO en 33 países) y Gartner prevé que hasta 2026 se abandone el 60 % de los proyectos que no tengan datos listos. La línea base es lo que convierte un piloto en evidencia.",
    accion:
      "Elegir el modelo que ya opera con más volumen y fijarle una línea base con finanzas: pérdida esperada, costo por operación o ingreso incremental. Sin esa cifra no hay caso de escala.",
    mundo: {
      valor: 37,
      texto: "Encuestados que atribuyen al menos algún impacto en el EBIT de su organización al uso de IA.",
      fuente: "McKinsey · The state of AI in 2026: On the road to ROI",
      url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      anio: 2026,
      muestra: "1.719 participantes en 97 países, encuesta 4-may a 8-jun-2026, todos los sectores",
    },
    latam: {
      valor: 81,
      texto: "Establecimientos de crédito colombianos que reportaron a la Superintendencia Financiera usar modelos de IA o aprendizaje automático en la gestión del riesgo de crédito (38 de 47; 346 modelos inventariados, corte marzo de 2025). Mide uso, no impacto medido.",
      fuente: "Superintendencia Financiera de Colombia · Caracterización de las prácticas en IA para la gestión del riesgo de crédito",
      url: "https://www.superfinanciera.gov.co/loader.php?lServicio=Tools2&lTipo=descargas&lFuncion=descargar&idFile=1082249",
      anio: 2026,
      muestra: "47 establecimientos de crédito con cartera, Colombia; corte marzo de 2025",
      nota: "Las entidades sin modelos son sobre todo cooperativas y corporaciones financieras de baja exposición crediticia",
    },
    color: "#ffffff",
  },
  {
    key: "generativa",
    n: 3,
    dimension: "IA generativa y agentes",
    corto: "Generativa",
    enunciado:
      "Usamos IA generativa o agentes en procesos reales del negocio (análisis de crédito, cumplimiento, servicio, desarrollo de software) bajo controles formales, no solo en pruebas individuales.",
    ayuda:
      "hay casos de uso aprobados, con política de uso, registro de lo que el modelo hace, revisión humana donde toca y cuentas corporativas; no depende de que cada empleado use su propia herramienta.",
    porque:
      "La IA generativa ya está adentro, con o sin controles: el 71 % de las entidades financieras del mundo la adopta de forma activa y el 52 % ya prueba agentes, aunque solo el 23 % los tiene en escala (CCAF, 352 entidades, abril de 2026). En Colombia el 86,8 % de los bancos declara haberla adoptado (Asobancaria, 38 entidades) y el 82 % de los trabajadores del país usa herramientas de IA personales en el trabajo (EY, febrero de 2026, 300 encuestados). El 71 % de las entidades financieras planea desplegar agentes en dos años, pero solo el 23 % tiene un modelo de gobierno maduro para ellos (Deloitte, 573 directivos). Lo que pesa en 2026 no es usar IA generativa sino haberla pasado de la cuenta personal al proceso: política de uso, registro, revisión humana y cuentas corporativas.",
    accion:
      "Inventariar en dos semanas qué herramientas de IA generativa usa la gente (incluidas las personales), aprobar cuentas corporativas para los tres usos más frecuentes y escribir la política de uso con lo que se prohíbe y lo que se registra.",
    mundo: {
      valor: 71,
      texto: "Entidades financieras con adopción activa de IA generativa (piloto, escala o transformación). Con agentes: 52 % en adopción activa y 23 % en escala o transformación.",
      fuente: "Cambridge Centre for Alternative Finance · The 2026 Global AI in Financial Services Report",
      url: "https://www.jbs.cam.ac.uk/wp-content/uploads/2026/05/ccaf-2026-04-28-global-ai-in-financial-services-report-2.pdf",
      anio: 2026,
      muestra: "352 entidades financieras (industria) dentro de 628 organizaciones en 151 jurisdicciones; publicado 28-abr-2026",
      nota: "Figura 1.4; adopción activa incluye pilotos, por eso la cifra es alta",
    },
    latam: {
      valor: 86.8,
      texto: "Bancos agremiados que declaran haber adoptado inteligencia artificial generativa (86,84 %); los usos principales son automatización de procesos (68,4 %), servicio al cliente (44,7 %) e innovación de productos (44,7 %).",
      fuente: "Asobancaria · Informe de Gestión Gremial 2025",
      url: "https://www.asobancaria.com/wp-content/uploads/2026/08/IGG-2025.pdf",
      anio: 2026,
      muestra: "38 de 38 entidades bancarias encuestadas en Colombia, año 2025",
      nota: "Bancos, en general más grandes que una compañía de financiamiento; en el inventario de modelos de crédito de la SFC la IA generativa es el 4,0 %",
    },
    color: "#78d8f5",
  },
  {
    key: "datos",
    n: 4,
    dimension: "Datos listos para modelos",
    corto: "Datos",
    enunciado:
      "Los datos de clientes, operaciones y riesgo están integrados, con calidad medida y linaje documentado, y un modelo nuevo puede entrenarse sin extracciones manuales.",
    ayuda:
      "existe una capa de datos gobernada (lago o almacén) con dueños por dominio, métricas de calidad que alguien revisa y acceso por permisos; armar la base de un modelo toma días, no meses.",
    porque:
      "Gartner prevé que hasta 2026 las organizaciones abandonen el 60 % de los proyectos de IA que no cuenten con datos listos, y el 63 % no tiene, o no sabe si tiene, prácticas de gestión de datos adecuadas para IA (1.203 líderes de datos). Solo el 35 % de las empresas grandes del mundo tiene datos limpios y centralizados con integración en tiempo real para agentes, frente al 93 % de las que capturan valor (Cisco, 8.039 líderes). Los datos son el pilar donde más empresas quedan rezagadas en todos los índices de 2025 y 2026, y el primero que un modelo de crédito o de fraude delata.",
    accion:
      "Nombrar dueño por dominio (clientes, operaciones, riesgo), medir la calidad de los diez campos que alimentan el modelo más importante y cerrar la extracción manual que más tiempo consume.",
    mundo: {
      valor: 43,
      texto: "Entidades de servicios financieros que califican su preparación en gestión de datos como alta o muy alta para adoptar IA.",
      fuente: "Deloitte · State of AI in the Enterprise 2026, corte de servicios financieros",
      url: "https://www.deloitte.com/content/dam/assets-shared/docs/about/2026/state-of-ai-financial-services.pdf",
      anio: 2026,
      muestra: "573 directivos de servicios financieros dentro de 3.235 encuestados en 24 países, ago–sep 2025",
    },
    latam: {
      valor: 43.5,
      texto: "Empresas con preparación plena o moderada (Pacesetters + Chasers) en el pilar Datos: Brasil 48 %, México 39 %; promedio simple de los dos países. Colombia no está en la muestra.",
      fuente: "Cisco · AI Readiness Index 2025, herramienta de consulta por país",
      url: "https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m11/data/data_2025.js",
      anio: 2025,
      muestra: "8.039 líderes de empresas de 500+ empleados en 30 mercados; Brasil y México son los únicos latinoamericanos",
      nota: "Aritmética del Observatorio sobre los cuatro niveles publicados por Cisco",
    },
    color: "#a99bff",
  },
  {
    key: "gobierno",
    n: 5,
    dimension: "Gobierno del riesgo de modelo",
    corto: "Gobierno",
    enunciado:
      "Tenemos una política de IA aprobada, con inventario de modelos (el que la Superintendencia Financiera ya pidió a los establecimientos de crédito), validación independiente, monitoreo de sesgo y de deriva, y cumplimiento de la Circular 002 de 2024 de la SIC.",
    ayuda:
      "cada modelo tiene ficha, dueño, fecha de validación y umbrales de alerta; alguien distinto de quien lo construyó lo revisa; la política nombra los riesgos de la IA generativa y las decisiones automatizadas sobre personas.",
    porque:
      "En septiembre de 2026 la Superintendencia Financiera no tiene una circular específica de IA, pero ya inventarió 346 modelos en 47 establecimientos de crédito y anunció que de ese ejercicio saldrán lineamientos de buenas prácticas: el inventario que la entidad tenga hoy es el que reportará mañana. Lo que sí rige es la Circular Externa 002 de 2024 de la SIC, que exige ponderar idoneidad, necesidad, razonabilidad y proporcionalidad y documentar un estudio de impacto de privacidad cuando la IA implique alto riesgo para los titulares. En la banca de la región solo el 19 % tiene políticas para mitigar riesgos de IA y el 9 % monitoreo (Felaban-PwC); en el mundo, el 32 % de las entidades financieras se declara muy preparada en riesgo y gobernanza (Deloitte). ISO/IEC 42001 (diciembre de 2023) y el NIST AI RMF, con su perfil de IA generativa (julio de 2024), son el molde disponible. En la Unión Europea, el Reglamento 2026/1744 aplazó al 2 de diciembre de 2027 las obligaciones de alto riesgo del AI Act, que incluyen el scoring de crédito: hay plazo, no exención.",
    accion:
      "Hacer el inventario de modelos con ficha, dueño y fecha de validación; separar quien construye de quien valida; documentar el estudio de impacto de privacidad que exige la Circular 002 de 2024 de la SIC para los modelos que deciden sobre personas.",
    mundo: {
      valor: 32,
      texto: "Entidades de servicios financieros que califican su preparación en riesgo y gobernanza como alta o muy alta para adoptar IA.",
      fuente: "Deloitte · State of AI in the Enterprise 2026, corte de servicios financieros",
      url: "https://www.deloitte.com/content/dam/assets-shared/docs/about/2026/state-of-ai-financial-services.pdf",
      anio: 2026,
      muestra: "573 directivos de servicios financieros dentro de 3.235 encuestados en 24 países, ago–sep 2025",
    },
    latam: {
      valor: 19,
      texto: "Entidades bancarias que declaran tener políticas como medida para mitigar los riesgos de la IA; monitoreo 9 %, capacitación 33 %, sin medidas 32 %.",
      fuente: "Felaban y PwC Interaméricas · Encuesta Regional sobre la Gestión de Riesgos y Analítica de Datos 2025",
      url: "https://www.pwc.com/ia/es/publicaciones/Imagenes-publicaciones/PDF/Encuesta-Riesgo-y-Analitica-de-Datos-Felaban-PwC-IA.pdf",
      anio: 2025,
      muestra: "Más de 95 líderes de bancos en 17 países de América Latina, levantamiento 25-ago a 12-sep-2025",
    },
    color: "#ffc15c",
  },
  {
    key: "explicabilidad",
    n: 6,
    dimension: "Explicabilidad y derechos del cliente",
    corto: "Explicabilidad",
    enunciado:
      "Cuando un modelo influye en una decisión sobre un cliente (aprobar, tasar, cobrar), podemos explicarla en lenguaje claro y el cliente tiene un canal de revisión humana.",
    ayuda:
      "el área de servicio puede decir por qué se negó o se tasó un crédito sin llamar a un científico de datos; existe un procedimiento para que una persona revise la decisión y se cumplen los plazos de habeas data.",
    porque:
      "Solo la mitad de las entidades financieras del mundo usa métodos de IA explicable, y los proveedores estiman que más de la mitad de sus clientes tiene poca o ninguna experiencia con esas herramientas (CCAF, 2026). El 43 % de las entidades financieras nombra la calidad, consistencia y explicabilidad de los modelos entre sus mayores preocupaciones (Deloitte, 2026). En Colombia, la Circular Externa 002 de 2024 de la SIC exige ponderar idoneidad, necesidad, razonabilidad y proporcionalidad del tratamiento con IA y documentar el impacto sobre los titulares; el habeas data (Ley 1581 de 2012) ya da al cliente el derecho a conocer y rectificar lo que se decide con sus datos. En la Unión Europea el scoring de crédito es un sistema de alto riesgo: el Reglamento 2026/1744 aplazó esas obligaciones al 2 de diciembre de 2027, pero fijó el estándar que los proveedores globales van a traer.",
    accion:
      "Escribir, para el modelo de crédito principal, las cinco razones de negación en lenguaje de cliente y el procedimiento de revisión humana con plazo; entrenar al área de servicio con ellas.",
    mundo: {
      valor: 50,
      texto: "Entidades financieras que declaran usar métodos de IA explicable (XAI) en sus modelos; 27 % no los usa y 23 % no sabe o no aplica.",
      fuente: "Cambridge Centre for Alternative Finance · The 2026 Global AI in Financial Services Report",
      url: "https://www.jbs.cam.ac.uk/wp-content/uploads/2026/05/ccaf-2026-04-28-global-ai-in-financial-services-report-2.pdf",
      anio: 2026,
      muestra: "340 entidades financieras (industria) que respondieron la pregunta; encuesta de 628 organizaciones en 151 jurisdicciones",
    },
    latam: null,
    color: "#ffb4b4",
  },
  {
    key: "talento",
    n: 7,
    dimension: "Talento y cultura",
    corto: "Talento",
    enunciado:
      "Más de la mitad de los colaboradores recibió formación en IA en los últimos doce meses, hay un equipo de datos e IA con roles definidos, y el uso responsable de la IA se reconoce en la evaluación de desempeño.",
    ayuda:
      "la formación es por rol (no un webinar general), el equipo tiene al menos ingeniería de datos, ciencia de datos y riesgo de modelo cubiertos, y usar bien la IA suma en la evaluación, no solo se tolera.",
    porque:
      "Talento es la dimensión más baja y la que cayó frente al año anterior entre las entidades financieras del mundo: solo el 19 % se declara muy preparada (Deloitte, 2026). El 36 % de los empleados está satisfecho con la formación en IA que recibió, y quienes reciben más de cinco horas usan la IA con regularidad en 79 % frente a 67 % (BCG, 10.635 encuestados en 11 países). Colombia ocupa el puesto 85 de 109 en habilidades (Coursera, 2025) mientras el 92 % de sus trabajadores ya usa IA (EY, 2026): la brecha no es de uso sino de formación por rol y de equipos con riesgo de modelo cubierto.",
    accion:
      "Diseñar formación por rol (comercial, riesgo, operaciones, tecnología) de al menos cinco horas, cubrir riesgo de modelo dentro del equipo de datos y meter el uso responsable de la IA en la evaluación del próximo ciclo.",
    mundo: {
      valor: 19,
      texto: "Entidades de servicios financieros que califican su preparación en talento como alta o muy alta para adoptar IA.",
      fuente: "Deloitte · State of AI in the Enterprise 2026, corte de servicios financieros",
      url: "https://www.deloitte.com/content/dam/assets-shared/docs/about/2026/state-of-ai-financial-services.pdf",
      anio: 2026,
      muestra: "573 directivos de servicios financieros dentro de 3.235 encuestados en 24 países, ago–sep 2025",
    },
    latam: {
      valor: 62.0,
      texto: "Empresas con preparación plena o moderada (Pacesetters + Chasers) en el pilar Talento: Brasil 66 %, México 58 %; promedio simple de los dos países. Colombia no está en la muestra.",
      fuente: "Cisco · AI Readiness Index 2025, herramienta de consulta por país",
      url: "https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m11/data/data_2025.js",
      anio: 2025,
      muestra: "8.039 líderes de empresas de 500+ empleados en 30 mercados; Brasil y México son los únicos latinoamericanos",
      nota: "Aritmética del Observatorio sobre los cuatro niveles publicados por Cisco",
    },
    color: "#9be7c4",
  },
  {
    key: "infraestructura",
    n: 8,
    dimension: "Infraestructura y proveedores",
    corto: "Infraestructura",
    enunciado:
      "Contamos con infraestructura (nube, MLOps, APIs) para llevar un modelo a producción en semanas, y los contratos con proveedores de IA cubren seguridad, uso de nuestros datos, localización y salida.",
    ayuda:
      "hay un camino estándar de despliegue con control de versiones y monitoreo; los contratos con proveedores de nube y de modelos dicen qué pueden hacer con los datos, dónde se procesan y cómo se sale sin perderlos.",
    porque:
      "El 38 % de las entidades financieras del mundo se declara muy preparada en infraestructura técnica, con caída frente a 2025 (Deloitte, 573 directivos). En Colombia cerca del 40 % de los modelos de IA de crédito los construyen proveedores externos, con más frecuencia en consumo y retail (Superintendencia Financiera, 2026): el riesgo de modelo es también riesgo de tercero. Entre las instituciones financieras de Estados Unidos apenas el 41 % incluye cláusulas de uso de IA en sus contratos con proveedores (Ncontracts, 2026). Un contrato que no dice qué pasa con los datos ni cómo se sale es una dependencia sin salida.",
    accion:
      "Definir el camino estándar de despliegue (versionado, monitoreo, retiro) y revisar los contratos con proveedores de nube y de modelos: uso de datos, localización, salida y responsabilidad por el modelo.",
    mundo: {
      valor: 38,
      texto: "Entidades de servicios financieros que califican su preparación en infraestructura técnica como alta o muy alta para adoptar IA.",
      fuente: "Deloitte · State of AI in the Enterprise 2026, corte de servicios financieros",
      url: "https://www.deloitte.com/content/dam/assets-shared/docs/about/2026/state-of-ai-financial-services.pdf",
      anio: 2026,
      muestra: "573 directivos de servicios financieros dentro de 3.235 encuestados en 24 países, ago–sep 2025",
    },
    latam: {
      valor: 53.0,
      texto: "Empresas con preparación plena o moderada (Pacesetters + Chasers) en el pilar Infraestructura: Brasil 57 %, México 49 %; promedio simple de los dos países. Colombia no está en la muestra.",
      fuente: "Cisco · AI Readiness Index 2025, herramienta de consulta por país",
      url: "https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m11/data/data_2025.js",
      anio: 2025,
      muestra: "8.039 líderes de empresas de 500+ empleados en 30 mercados; Brasil y México son los únicos latinoamericanos",
      nota: "Aritmética del Observatorio sobre los cuatro niveles publicados por Cisco",
    },
    color: "#cfd4ff",
  },
  {
    key: "fraude",
    n: 9,
    dimension: "Seguridad y fraude con IA",
    corto: "Fraude",
    enunciado:
      "Medimos el fraude potenciado por IA (deepfakes, voz clonada, documentos sintéticos, ingeniería social) y actualizamos en el último año los controles de identidad, autenticación y pagos inmediatos.",
    ayuda:
      "existe una cifra de intentos y pérdidas por este tipo de fraude, la verificación de identidad detecta rostros y documentos generados, y las alertas de pagos inmediatos operan en tiempo real.",
    porque:
      "Una de cada cuatro brechas maliciosas en 2026 fue potenciada con IA, 56 % más que el año anterior, y en servicios financieros cuestan en promedio US$6,3 millones (IBM, 602 organizaciones). El fraude de identidad en servicios financieros llega al 2,7 % de los intentos y los ataques sofisticados de varios pasos pasaron del 10 % al 28 % (Sumsub, más de 4 millones de intentos). Deloitte proyecta US$40.000 millones de pérdidas por fraude con IA generativa en Estados Unidos en 2027. En Colombia, Bre-B mueve unos 5 millones de operaciones inmediatas al día: el tiempo para detener un fraude se mide en segundos, y el 65,7 % de los bancos ya usa IA para detección temprana de amenazas (Asobancaria).",
    accion:
      "Medir el fraude con IA como categoría propia (deepfakes, voz, documentos sintéticos), probar la verificación de identidad contra rostros y documentos generados, y llevar las alertas de pagos inmediatos a tiempo real.",
    mundo: {
      valor: 29,
      texto: "Entidades financieras con detección de fraude basada en IA en despliegue pleno; otro 28 % la tiene en piloto o desarrollo. Mide defensa con IA, no medición del fraude hecho con IA.",
      fuente: "Cambridge Centre for Alternative Finance · The 2026 Global AI in Financial Services Report",
      url: "https://www.jbs.cam.ac.uk/wp-content/uploads/2026/05/ccaf-2026-04-28-global-ai-in-financial-services-report-2.pdf",
      anio: 2026,
      muestra: "352 entidades financieras (industria) dentro de 628 organizaciones en 151 jurisdicciones; publicado 28-abr-2026",
      nota: "Figura 2.0: es el caso de uso con mayor tasa de despliegue pleno junto con desarrollo de software",
    },
    latam: {
      valor: 65.7,
      texto: "Entidades bancarias que señalan utilizar inteligencia artificial, aprendizaje automático u otras herramientas analíticas avanzadas para la detección temprana de amenazas de ciberseguridad (+13,6 frente a 2024). Mide defensa con IA, no medición del fraude hecho con IA.",
      fuente: "Asobancaria · Informe de Gestión Gremial 2025",
      url: "https://www.asobancaria.com/wp-content/uploads/2026/08/IGG-2025.pdf",
      anio: 2026,
      muestra: "Entidades bancarias agremiadas en Colombia, año 2025",
    },
    color: "#ff9f7a",
  },
  {
    key: "equidad",
    n: 10,
    dimension: "Equidad e inclusión medidas",
    corto: "Equidad",
    enunciado:
      "Medimos si nuestros modelos producen resultados distintos para mujeres, población rural o clientes de menores ingresos, y tenemos un procedimiento para corregirlo.",
    ayuda:
      "las tasas de aprobación, precio y cobranza se desagregan por segmento con periodicidad fija; una diferencia que no se explica por riesgo dispara una revisión con dueño y plazo.",
    porque:
      "Dos de cada tres entidades financieras del mundo no monitorean sus modelos en busca de sesgo o discriminación, y solo el 5 % de los reguladores recoge datos sobre ello (CCAF, 2026). Colombia es el único país del panel del Observatorio con brechas de confianza financiera de 19 puntos o más en género, ingreso y territorio a la vez (ICF-S): un modelo entrenado sobre esa historia las reproduce salvo que alguien las mida. El 15,8 % de los bancos colombianos ya usa IA generativa para modelos de riesgo de crédito con información alternativa (Asobancaria), justo donde el sesgo entra sin avisar. La Circular 002 de 2024 de la SIC exige un estudio de impacto cuando la IA implique alto riesgo para los titulares, y el reglamento europeo trata el scoring de crédito como alto riesgo. Medir por segmento es la diferencia entre inclusión y automatizar la exclusión.",
    accion:
      "Desagregar aprobación, precio y cobranza por género, ruralidad e ingreso con periodicidad fija; definir el umbral que dispara revisión y el dueño que la responde.",
    mundo: {
      valor: 30,
      texto: "Entidades financieras que monitorean sus modelos de IA en busca de sesgo o discriminación arbitraria; el 65 % declara no hacerlo y el 5 % responde otra cosa.",
      fuente: "Cambridge Centre for Alternative Finance · The 2026 Global AI in Financial Services Report",
      url: "https://www.jbs.cam.ac.uk/wp-content/uploads/2026/05/ccaf-2026-04-28-global-ai-in-financial-services-report-2.pdf",
      anio: 2026,
      muestra: "263 entidades financieras (industria) que respondieron la pregunta; encuesta de 628 organizaciones en 151 jurisdicciones",
    },
    latam: null,
    color: "#e2b8ff",
  },
];

/**
 * Cómo se distribuyen los pares por nivel de preparación, en las dos encuestas
 * que publican esa distribución. Las categorías son las de cada emisor y no
 * equivalen a las bandas del test: se muestran lado a lado como referencia.
 */
export interface DistribucionPares {
  ambito: "mundo" | "latam";
  titulo: string;
  fuente: string;
  url: string;
  anio: number;
  muestra: string;
  niveles: { label: string; valor: number }[];
  nota?: string;
}

export const DISTRIBUCIONES: DistribucionPares[] = [
  {
    ambito: "mundo",
    titulo: "Servicios financieros en el mundo",
    fuente: "Cisco · AI Readiness Index 2025, corte de servicios financieros",
    url: "https://www.cisco.com/c/dam/m/en_us/solutions/ai/readiness-index/2025-m11/data/data_2025.js",
    anio: 2025,
    muestra: "Empresas de servicios financieros dentro de 8.039 líderes de organizaciones de 500+ empleados en 30 mercados",
    niveles: [
      { label: "Pacesetters · plenamente preparadas", valor: 17 },
      { label: "Chasers · moderadamente preparadas", valor: 42 },
      { label: "Followers · preparación limitada", valor: 38 },
      { label: "Laggards · no preparadas", valor: 2 },
    ],
    nota: "Suma 99 por redondeo del emisor",
  },
  {
    ambito: "latam",
    titulo: "Bancos de América Latina",
    fuente: "Felaban y PwC Interaméricas · Encuesta Regional sobre la Gestión de Riesgos y Analítica de Datos 2025",
    url: "https://www.pwc.com/ia/es/publicaciones/Imagenes-publicaciones/PDF/Encuesta-Riesgo-y-Analitica-de-Datos-Felaban-PwC-IA.pdf",
    anio: 2025,
    muestra: "Más de 95 líderes de bancos en 17 países, levantamiento 25-ago a 12-sep-2025",
    niveles: [
      { label: "Totalmente preparado para la IA", valor: 5 },
      { label: "Parcialmente listo", valor: 62 },
      { label: "No preparado", valor: 32 },
      { label: "No planea implementarla", valor: 1 },
    ],
  },
];

export const META_TEST = {
  version: "v1",
  corte: "septiembre de 2026",
  preguntas: 10,
  minutos: 4,
};
