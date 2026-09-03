// =============================================================================
// Cerebro fintech LATAM · tipos de los datasets curados
//
// Los archivos hermanos (jugadores.ts, inversion.ts, paises.ts, biblioteca.ts)
// se generan por script desde los JSON de investigación y se verifican con
// `npm run verificar` (scripts/verificar-cerebro.ts). Toda cifra lleva fuente,
// URL https y año; `null` significa «sin dato verificable», nunca cero.
// =============================================================================

export type PaisCerebro =
  | "BR" | "MX" | "CO" | "AR" | "CL" | "PE" | "UY" | "EC"
  | "GT" | "DO" | "PA" | "CR" | "VE" | "BO" | "PY" | "HN" | "SV" | "NI" | "REG";

export const NOMBRE_PAIS: Record<PaisCerebro, string> = {
  BR: "Brasil", MX: "México", CO: "Colombia", AR: "Argentina", CL: "Chile", PE: "Perú",
  UY: "Uruguay", EC: "Ecuador", GT: "Guatemala", DO: "Rep. Dominicana", PA: "Panamá",
  CR: "Costa Rica", VE: "Venezuela", BO: "Bolivia", PY: "Paraguay", HN: "Honduras",
  SV: "El Salvador", NI: "Nicaragua", REG: "Regional",
};

export const BANDERA: Record<PaisCerebro, string> = {
  BR: "🇧🇷", MX: "🇲🇽", CO: "🇨🇴", AR: "🇦🇷", CL: "🇨🇱", PE: "🇵🇪", UY: "🇺🇾", EC: "🇪🇨",
  GT: "🇬🇹", DO: "🇩🇴", PA: "🇵🇦", CR: "🇨🇷", VE: "🇻🇪", BO: "🇧🇴", PY: "🇵🇾", HN: "🇭🇳",
  SV: "🇸🇻", NI: "🇳🇮", REG: "🌎",
};

export type Segmento =
  | "pagos" | "credito" | "neobanco" | "cripto" | "insurtech" | "wealthtech" | "regtech"
  | "infraestructura" | "bnpl" | "remesas" | "open-finance" | "b2b" | "scoring";

export const NOMBRE_SEGMENTO: Record<Segmento, string> = {
  pagos: "Pagos", credito: "Crédito", neobanco: "Neobanco", cripto: "Cripto", insurtech: "Insurtech",
  wealthtech: "Wealthtech", regtech: "Regtech", infraestructura: "Infraestructura", bnpl: "BNPL",
  remesas: "Remesas", "open-finance": "Open finance", b2b: "B2B", scoring: "Scoring",
};

export interface Ronda {
  tipo: string;
  monto_usd_m: number | null;
  fecha: string | null;
  inversores: string[];
}

export interface Jugador {
  id: string;
  nombre: string;
  pais: PaisCerebro;
  ciudad: string | null;
  fundacion: number | null;
  segmento: Segmento;
  subsegmento: string | null;
  descripcion: string;
  estado: "privada" | "cotiza" | "adquirida" | "cerrada";
  ticker: string | null;
  unicornio: boolean;
  valoracion_usd_m: number | null;
  valoracion_fecha: string | null;
  valoracion_nota: string | null;
  ultima_ronda: Ronda | null;
  usuarios_m: number | null;
  usuarios_nota: string | null;
  fuente: string;
  url: string;
  url_nota: string | null;
  anio: number;
}

export interface SerieAnual {
  anio: number | string;
  vc_total_usd_m: number | null;
  vc_fintech_usd_m: number | null;
  deals_fintech: number | null;
  fuente: string;
  url: string;
  nota: string | null;
}

export interface VCPais {
  pais: PaisCerebro;
  vc_fintech_usd_m: number | null;
  vc_total_usd_m: number | null;
  fuente: string;
  url: string;
  nota: string | null;
}

export interface RondaGrande {
  fecha: string;
  empresa: string;
  pais: PaisCerebro;
  segmento: Segmento | string;
  tipo: string;
  monto_usd_m: number | null;
  valoracion_usd_m: number | null;
  inversores: string[];
  fuente: string;
  url: string;
  nota: string | null;
}

export interface Participacion {
  anio: number | string;
  pct: number;
  fuente: string;
  url: string;
  nota?: string | null;
}

export interface Salida {
  fecha: string;
  empresa: string;
  pais: PaisCerebro;
  tipo: string;
  comprador: string | null;
  valor_usd_m: number | null;
  fuente: string;
  url: string;
  nota?: string | null;
}

export interface Fondo {
  nombre: string;
  tipo: string;
  sede: string;
  deals_fintech_2025: number | null;
  fuente: string;
  url: string;
  nota: string | null;
}

export interface Ancla {
  cifra: string;
  texto: string;
  fuente: string;
  url: string;
  anio: number;
}

export interface Inversion {
  serie_anual: SerieAnual[];
  por_pais_2025: VCPais[];
  rondas: RondaGrande[];
  participacion_fintech: Participacion[];
  salidas: Salida[];
  fondos_activos: Fondo[];
  anclas: Ancla[];
}

export interface DatoConFuente {
  n?: number | null;
  anio?: number | null;
  fuente?: string | null;
  url?: string | null;
}

export interface SegmentoPais {
  segmento: string;
  n: number | null;
  pct: number | null;
}

export interface Norma {
  estado: string;
  norma?: string | null;
  nombre?: string | null;
  anio?: number | null;
  detalle: string | null;
  url: string | null;
}

export interface Regulador {
  nombre: string;
  sigla: string | null;
  url: string;
}

export interface Riel {
  nombre: string | null;
  operador: string | null;
  lanzamiento: string | null;
  usuarios_m: number | null;
  llaves_m: number | null;
  tx_mes_m: number | null;
  tx_dia_m: number | null;
  fecha_dato: string | null;
  detalle: string | null;
  fuente: string | null;
  url: string | null;
}

export interface Cripto {
  regimen: string;
  norma: string | null;
  detalle: string | null;
  url: string | null;
}

export interface Gremio {
  nombre: string | null;
  miembros: number | null;
  url: string | null;
}

export interface Lider {
  nombre: string;
  tipo: string | null;
  usuarios_m: number | null;
  fecha: string | null;
  url: string | null;
}

export interface Inclusion {
  cuenta_pct: number | null;
  pago_digital_pct: number | null;
  fuente: string | null;
  url: string | null;
}

export interface Pais {
  code: PaisCerebro;
  nombre: string;
  flag: string;
  fintechs: DatoConFuente | null;
  fintechs_bid: DatoConFuente | null;
  segmentos: SegmentoPais[];
  segmentos_fuente: { fuente: string; url: string; anio: number } | null;
  ley_fintech: Norma | null;
  reguladores: Regulador[];
  sandbox: Norma | null;
  open_finance: Norma | null;
  riel_inmediato: Riel | null;
  cripto: Cripto | null;
  gremio: Gremio | null;
  lideres: Lider[];
  inclusion: Inclusion | null;
  poblacion_adulta_m: number | null;
  notas: string | null;
}

export interface Hito {
  fecha: string;
  pais: PaisCerebro;
  tipo: "regulacion" | "riel" | "licencia" | "cripto" | "open-finance" | "mercado" | string;
  titulo: string;
  detalle: string | null;
  fuente: string;
  url: string;
}

export interface Reporte {
  titulo: string;
  institucion: string;
  anio: number;
  tipo: string;
  alcance: string;
  tema: string;
  url: string;
  url_nota?: string | null;
  resumen: string;
  cifras: string[];
}

export interface Entidad {
  nombre: string;
  sigla: string | null;
  pais: PaisCerebro | string;
  tipo: string;
  que: string;
  url: string;
  rss: string | null;
  datos_abiertos: string | null;
}

export interface Evento {
  nombre: string;
  organizador: string | null;
  ciudad: string | null;
  pais: PaisCerebro | string;
  /** null = el organizador aún no publica fecha */
  fecha: string | null;
  fecha_fin: string | null;
  url: string;
  estado: string | null;
}

export interface FuenteDatos {
  nombre: string;
  que: string;
  url: string;
  acceso: string;
  frecuencia: string | null;
  pais: PaisCerebro | string;
}

export interface Termino {
  termino: string;
  definicion: string;
  pais: PaisCerebro | string | null;
}

export interface Biblioteca {
  reportes: Reporte[];
  directorio: Entidad[];
  eventos: Evento[];
  fuentes_datos: FuenteDatos[];
  glosario: Termino[];
}
