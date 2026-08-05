export interface ReferenteGlobal {
  sigla: string;
  nombre: string;
  alcance: string;
  arquitectura: string;
  patron: string;
  fuente: string;
  url: string;
  anio: number;
  color: string;
}

export const REFERENTES_GLOBALES: ReferenteGlobal[] = [
  {
    sigla: "CCAF",
    nombre: "Global AI in Financial Services",
    alcance: "628 organizaciones · 151 jurisdicciones",
    arquitectura: "6 capas: adopción, impacto, barreras, riesgos, supervisión y horizonte 2030.",
    patron: "Separar adopción de transformación real y mostrar el tamaño de la evidencia desde el primer vistazo.",
    fuente: "Cambridge Centre for Alternative Finance · informe 2026",
    url: "https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/",
    anio: 2026,
    color: "#1FC9A0",
  },
  {
    sigla: "GOFI",
    nombre: "Global Open Finance Index",
    alcance: "400+ expertos · 23 mercados · 150+ datos secundarios",
    arquitectura: "Madurez por regulación, colaboración del ecosistema, confianza y seguridad.",
    patron: "Combinar índice y narrativa: explicar qué mueve la adopción, no limitarse a publicar el puesto.",
    fuente: "Open Banking Excellence · Global Open Finance Index",
    url: "https://www.openbankingexcellence.org/index/",
    anio: 2023,
    color: "#E8B452",
  },
  {
    sigla: "EVIDENT",
    nombre: "AI Banking Index",
    alcance: "50 bancos globales · 70+ indicadores · 4 pilares",
    arquitectura: "Ranking comparable por talento, innovación, liderazgo y transparencia.",
    patron: "Hacer el ranking escaneable, permitir lentes regionales y mantener cada pilar visible en la tabla.",
    fuente: "Evident Insights · AI Banking Index 2025",
    url: "https://evidentinsights.com/ai-index/",
    anio: 2025,
    color: "#6C5CD6",
  },
];
