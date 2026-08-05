// =============================================================================
// Roadmap general — Mejora de procesos para fintechs en Colombia
// Derivado de los hallazgos del Observatorio Find y aterrizado en el marco
// regulatorio colombiano (SFC, UIAF/Ley 526, Habeas Data/Ley 1581, Bre-B,
// Finanzas Abiertas, sandbox SFC, Decreto 1297/2023, PL 510/2025).
// Cada acción referencia las líneas del catálogo Find que pueden apoyarla.
// =============================================================================

import { PilarKey } from "./dataset";

export type Tag = PilarKey | "transversal" | "seguras";

export const TAG_META: Record<Tag, { label: string; color: string }> = {
  inclusion: { label: "Inclusión & scoring", color: "#1FC9A0" },
  pagos: { label: "Pagos", color: "#E8825A" },
  adopcion: { label: "Adopción de IA", color: "#9FCE2E" },
  fraude: { label: "Fraude & AML", color: "#6C5CD6" },
  tokenizacion: { label: "Tokenización", color: "#5BD0E0" },
  regulacion: { label: "Regulación", color: "#E8B452" },
  transversal: { label: "Transversal", color: "#E8B452" },
  seguras: { label: "Gobernanza & certificación", color: "#FF8FA3" },
};

export interface Accion {
  tag: Tag;
  titulo: string;
  detalle: string;
  kpi: string;
  finhub?: string; // línea(s) del catálogo Find
}

export interface Horizonte {
  n: string;
  nombre: string;
  rango: string;
  lema: string;
  color: string;
  acciones: Accion[];
}

export const PRINCIPIOS = [
  {
    t: "Gobernanza antes que modelo",
    d: "El reto ya no es el modelo, es la trazabilidad y auditoría de toda la cadena de decisión.",
  },
  {
    t: "Explicabilidad regulada",
    d: "Cada decisión automatizada que afecta a un cliente debe poder explicarse ante la SFC y el usuario.",
  },
  {
    t: "Humano en el bucle",
    d: "Automatizar sin perder un punto de control humano sobre las decisiones de mayor riesgo.",
  },
  {
    t: "Dato local, equidad medible",
    d: "Aprovechar datos alternativos para incluir, midiendo sesgo por género y territorio.",
  },
];

export const HORIZONTES: Horizonte[] = [
  {
    n: "H1",
    nombre: "Cimientos",
    rango: "0–6 meses",
    lema: "Ordenar la casa de datos y ganar quick wins",
    color: "#9FCE2E",
    acciones: [
      {
        tag: "transversal",
        titulo: "Gobierno de datos e inventario de modelos",
        detalle:
          "Inventariar todos los modelos en producción con su dueño, datos de entrada y propósito; formalizar políticas de habeas data (Ley 1581) y retención.",
        kpi: "100% de modelos con ficha técnica y responsable asignado.",
        finhub: "P15 Memory blocks · P6 Sandbox de validación",
      },
      {
        tag: "adopcion",
        titulo: "Copiloto interno con RAG",
        detalle:
          "Asistente sobre normativa, productos y procesos internos con citación de fuentes, para soporte y cumplimiento. Quick win de productividad.",
        kpi: "−30% en tiempo de búsqueda/respuesta de soporte y cumplimiento.",
        finhub: "P1 RAG Asesor · P5 Copiloto regulatorio",
      },
      {
        tag: "inclusion",
        titulo: "Línea base de equidad del scoring",
        detalle:
          "Medir el sesgo del modelo de crédito actual por género y territorio antes de cambiar nada: no se mejora lo que no se mide.",
        kpi: "Reporte de fairness por segmento publicado internamente.",
        finhub: "P3 Tablero de inclusión",
      },
      {
        tag: "fraude",
        titulo: "Preparación para Bre-B",
        detalle:
          "Reglas base y monitoreo de velocidad/comportamiento en el riel instantáneo, con ventanas de respuesta mínimas desde el día uno.",
        kpi: "Cobertura de monitoreo en 100% de las transacciones A2A.",
        finhub: "P7 Antifraude para rails instantáneos",
      },
      {
        tag: "tokenizacion",
        titulo: "Vigilancia regulatoria cripto/RWA",
        detalle:
          "Mapear el Decreto 1297/2023 (PSAV/AML) y el Proyecto de Ley 510/2025; definir postura institucional frente a activos digitales.",
        kpi: "Documento de posición cripto/RWA aprobado por la junta.",
        finhub: "P9 Tokenización · P2 Observatorio",
      },
    ],
  },
  {
    n: "H2",
    nombre: "Escala con control",
    rango: "6–18 meses",
    lema: "Producto aplicado con dato e interlocución regulatoria",
    color: "#1FC9A0",
    acciones: [
      {
        tag: "inclusion",
        titulo: "Scoring con datos alternativos explicable",
        detalle:
          "Modelo de originación con huella digital y flujo de caja, con explicabilidad (XAI) y reporte de equidad por decisión. Amplía crédito a thin-file con trazabilidad.",
        kpi: "+ aprobación en thin-file con mora estable; explicación por cada decisión.",
        finhub: "P4 Agente de scoring explicable",
      },
      {
        tag: "adopcion",
        titulo: "Cadena multiagente con humano en el bucle",
        detalle:
          "Underwriting como cadena (extracción → spreading → riesgo → cumplimiento → memo) con bitácora auditable y control humano en los pasos críticos.",
        kpi: "% de casos automatizados con traza completa y revisión humana.",
        finhub: "P8 Plataforma de scoring multiagente · P14 Harness",
      },
      {
        tag: "fraude",
        titulo: "Antifraude adaptativo + AML explicable",
        detalle:
          "Detección sobre Bre-B con análisis de grafos para anillos de fraude y monitoreo AML auditable conforme a la UIAF (Ley 526).",
        kpi: "− pérdidas por fraude y − falsos positivos vs. línea base.",
        finhub: "P7 Antifraude · P5 Copiloto regulatorio",
      },
      {
        tag: "transversal",
        titulo: "Preparar Open Finance (Finanzas Abiertas)",
        detalle:
          "APIs de consentimiento y portabilidad listas para el esquema que la SFC mueve de voluntario a obligatorio; el dato como activo gobernado.",
        kpi: "APIs certificadas y consentimiento del usuario gestionado de extremo a extremo.",
        finhub: "P10 Identidad & Open Finance",
      },
      {
        tag: "seguras",
        titulo: "Validación independiente de modelos",
        detalle:
          "Auditoría externa de model risk, sesgo y robustez de los modelos críticos, articulada con el sandbox de la SFC.",
        kpi: "Modelos críticos validados por un tercero independiente.",
        finhub: "P6 Sandbox académico de validación",
      },
    ],
  },
  {
    n: "H3",
    nombre: "Frontera",
    rango: "18–36 meses",
    lema: "Diferenciación y nuevos rieles de valor",
    color: "#6C5CD6",
    acciones: [
      {
        tag: "tokenizacion",
        titulo: "Pilotos de tokenización de crédito/RWA",
        detalle:
          "Tokenizar crédito o activos reales con marco de riesgo, sobre infraestructura de aliados, dentro del sandbox y con métricas claras.",
        kpi: "1+ piloto en sandbox con métricas de liquidez y costo de fondeo.",
        finhub: "P9 Tokenización de activos & crédito",
      },
      {
        tag: "adopcion",
        titulo: "Agentes con memoria gobernada y mejora continua",
        detalle:
          "Agentes financieros con memoria persistente versionada y control de acceso, que mejoran de su experiencia sin perder explicabilidad.",
        kpi: "Desempeño al alza con trazabilidad y versionado completos.",
        finhub: "P12 Auto-mejorables · P13 Second brain · P15 Memory blocks",
      },
      {
        tag: "inclusion",
        titulo: "Identidad y credenciales verificables",
        detalle:
          "Identidad financiera portable y consentida para reducir fricción de onboarding y fraude de identidad como bien confiable del ecosistema.",
        kpi: "− tiempo de onboarding y − fraude de identidad.",
        finhub: "P10 Infraestructura de identidad",
      },
      {
        tag: "seguras",
        titulo: "Sello de IA Financiera Responsable",
        detalle:
          "Adoptar un estándar de explicabilidad, equidad y robustez que el regulador y el mercado reconozcan como señal de confianza.",
        kpi: "Certificación obtenida y comunicada al mercado.",
        finhub: "P11 Sello Find de IA Responsable",
      },
    ],
  },
];

// Anclas regulatorias colombianas referenciadas en el roadmap
export const ANCLAS_REGULATORIAS = [
  { sigla: "SFC", nombre: "Superintendencia Financiera de Colombia (supervisión, sandbox)" },
  { sigla: "UIAF · Ley 526", nombre: "Unidad de Información y Análisis Financiero (AML/CFT)" },
  { sigla: "Ley 1581", nombre: "Habeas data — protección de datos personales" },
  { sigla: "Bre-B", nombre: "Sistema de pagos inmediatos del Banco de la República (2025)" },
  { sigla: "Finanzas Abiertas", nombre: "Open Finance — proyecto de decreto SFC (obligatorio por fases)" },
  { sigla: "Decreto 1297/2023", nombre: "Registro de proveedores de servicios de activos virtuales (AML)" },
];
