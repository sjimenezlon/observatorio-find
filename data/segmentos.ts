// =============================================================================
// Confianza por segmento · ¿quién confía menos?
//
// El ICF responde qué tanto confía un país. Esta capa responde quién, dentro de
// ese país, confía menos — la pregunta que le importa a cualquiera que quiera
// mover la aguja de la inclusión, porque el promedio nacional esconde justo a
// la población a la que un servicio de pagos abierto debería llegar primero.
//
// Fuente: Global Findex 2025 (datos 2024), desagregaciones oficiales del propio
// Banco Mundial (sufijos .1 mujeres · .2 hombres · .7 40% más pobre ·
// .8 60% más rico · .9 rural · .10 urbano), extraídas vía API (fuente 28).
//
// LÍMITE DECLARADO: el Findex no desagrega las series de cuentas inactivas, de
// estafas (con21/con22) ni de comisiones inesperadas (fin35), y el FAS del FMI
// no desagrega prestatarios ni depositantes. Por eso el índice por segmento es
// una versión REDUCIDA del ICF: tres dimensiones y cuatro indicadores, no ocho.
// Se llama ICF-S para no confundirlo con el ICF completo y sus valores no son
// intercambiables con los de aquel.
//
// Generado por script desde la API; no editar valores a mano.
// =============================================================================

export type FamiliaSeg = "genero" | "ingreso" | "territorio";

export interface Segmento {
  key: string;
  label: string;
  familia: FamiliaSeg;
}

export const SEGMENTOS_META: Segmento[] = [
  { key: "mujeres", label: "Mujeres", familia: "genero" },
  { key: "hombres", label: "Hombres", familia: "genero" },
  { key: "pobre40", label: "40% más pobre", familia: "ingreso" },
  { key: "rico60", label: "60% más rico", familia: "ingreso" },
  { key: "rural", label: "Rural", familia: "territorio" },
  { key: "urbano", label: "Urbano", familia: "territorio" },
];

export const FAMILIAS: Record<FamiliaSeg, { label: string; a: string; b: string; color: string }> = {
  genero: { label: "Género", a: "mujeres", b: "hombres", color: "#FF7A9E" },
  ingreso: { label: "Ingreso", a: "pobre40", b: "rico60", color: "#E8B452" },
  territorio: { label: "Territorio", a: "rural", b: "urbano", color: "#5BD0E0" },
};

export interface FilaSegmento {
  cc: string;
  nombre: string;
  flag: string;
  seg: string;
  segLabel: string;
  familia: FamiliaSeg;
  /** tenencia de cuenta del segmento, % (account.t.d) */
  cuenta: number | null;
  /** DERIVADO · % de los no bancarizados del segmento que declara desconfianza */
  desconfianza: number | null;
  /** guarda dinero en la cuenta, % (fin8) */
  guarda: number | null;
  /** paga a comercios por medios digitales, % (merchant.pay) */
  merchantpay: number | null;
  /** DERIVADO · formalidad del endeudamiento, % (fin22a ÷ borrow.any.t.d) */
  formalidad: number | null;
  creditoformal: number | null;
  borrowAny: number | null;
}

export const SEGMENTOS: FilaSegmento[] = [
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 84.25, desconfianza: 60.7, guarda: 28.13, merchantpay: 61.05, formalidad: 53.9, creditoformal: 30.17, borrowAny: 55.97 },
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 78.94, desconfianza: 56.5, guarda: 32.09, merchantpay: 59.24, formalidad: 50.2, creditoformal: 28.26, borrowAny: 56.34 },
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 74.66, desconfianza: 49.6, guarda: 19.81, merchantpay: 50.5, formalidad: 34.6, creditoformal: 18.9, borrowAny: 54.62 },
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 86.44, desconfianza: 69.4, guarda: 36.75, merchantpay: 66.62, formalidad: 63.2, creditoformal: 36.15, borrowAny: 57.16 },
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 76.65, desconfianza: 37.0, guarda: 21.68, merchantpay: 52.73, formalidad: 51.0, creditoformal: 27.8, borrowAny: 54.47 },
  { cc: "ARG", nombre: "Argentina", flag: "🇦🇷", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 84.25, desconfianza: 74.1, guarda: 34.09, merchantpay: 63.87, formalidad: 52.6, creditoformal: 29.99, borrowAny: 56.97 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 53.46, desconfianza: 45.3, guarda: 21.64, merchantpay: 15.26, formalidad: 41.5, creditoformal: 19.08, borrowAny: 45.96 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 60.33, desconfianza: 41.9, guarda: 32.04, merchantpay: 25.85, formalidad: 34.5, creditoformal: 17.36, borrowAny: 50.28 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 45.56, desconfianza: 46.0, guarda: 17.66, merchantpay: 11.79, formalidad: 36.1, creditoformal: 16.5, borrowAny: 45.71 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 64.38, desconfianza: 41.5, guarda: 32.84, merchantpay: 26.28, formalidad: 39.0, creditoformal: 19.39, borrowAny: 49.67 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 49.01, desconfianza: 40.2, guarda: 19.29, merchantpay: 11.73, formalidad: 33.7, creditoformal: 17.31, borrowAny: 51.33 },
  { cc: "BOL", nombre: "Bolivia", flag: "🇧🇴", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 63.91, desconfianza: 48.4, guarda: 33.51, merchantpay: 28.38, formalidad: 42.2, creditoformal: 19.06, borrowAny: 45.16 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 82.28, desconfianza: null, guarda: 23.85, merchantpay: 56.75, formalidad: 67.5, creditoformal: 40.39, borrowAny: 59.85 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 90.85, desconfianza: null, guarda: 39.45, merchantpay: 63.84, formalidad: 76.7, creditoformal: 51.95, borrowAny: 67.7 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 78.1, desconfianza: null, guarda: 17.54, merchantpay: 48.24, formalidad: 53.4, creditoformal: 30.44, borrowAny: 56.98 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 91.89, desconfianza: null, guarda: 40.48, merchantpay: 68.07, formalidad: 82.7, creditoformal: 56.23, borrowAny: 68.02 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 85.42, desconfianza: null, guarda: 30.51, merchantpay: 53.37, formalidad: 68.3, creditoformal: 42.17, borrowAny: 61.72 },
  { cc: "BRA", nombre: "Brasil", flag: "🇧🇷", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 87.09, desconfianza: null, guarda: 31.91, merchantpay: 65.17, formalidad: 74.9, creditoformal: 48.71, borrowAny: 65.01 },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 83.17, desconfianza: null, guarda: null, merchantpay: null, formalidad: 51.4, creditoformal: 20.46, borrowAny: 39.82 },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 87.09, desconfianza: null, guarda: null, merchantpay: null, formalidad: 59.1, creditoformal: 28.38, borrowAny: 48.04 },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 75.36, desconfianza: null, guarda: null, merchantpay: null, formalidad: 44.6, creditoformal: 18.4, borrowAny: 41.28 },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 91.53, desconfianza: null, guarda: null, merchantpay: null, formalidad: 61.9, creditoformal: 28.03, borrowAny: 45.29 },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 83.86, desconfianza: null, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: null },
  { cc: "CHL", nombre: "Chile", flag: "🇨🇱", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 85.64, desconfianza: null, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: null },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 50.99, desconfianza: 47.1, guarda: 9.57, merchantpay: 22.73, formalidad: 18.2, creditoformal: 7.85, borrowAny: 43.13 },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 63.66, desconfianza: 40.3, guarda: 22.69, merchantpay: 29.81, formalidad: 34.9, creditoformal: 17.35, borrowAny: 49.78 },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 42.92, desconfianza: 43.6, guarda: 8.37, merchantpay: 14.11, formalidad: 12.9, creditoformal: 5.75, borrowAny: 44.7 },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 66.49, desconfianza: 45.2, guarda: 20.85, merchantpay: 34.14, formalidad: 35.5, creditoformal: 16.84, borrowAny: 47.39 },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 51.53, desconfianza: 53.4, guarda: 7.12, merchantpay: 15.21, formalidad: 22.8, creditoformal: 10.88, borrowAny: 47.81 },
  { cc: "COL", nombre: "Colombia", flag: "🇨🇴", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 60.49, desconfianza: 37.4, guarda: 21.27, merchantpay: 32.88, formalidad: 29.4, creditoformal: 13.34, borrowAny: 45.38 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 68.28, desconfianza: null, guarda: 34.94, merchantpay: 44.87, formalidad: 37.1, creditoformal: 13.53, borrowAny: 36.51 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 74.52, desconfianza: null, guarda: 40.2, merchantpay: 49.71, formalidad: 38.4, creditoformal: 14.96, borrowAny: 38.98 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 62.82, desconfianza: null, guarda: 22.36, merchantpay: 33.36, formalidad: 21.6, creditoformal: 8.36, borrowAny: 38.77 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 77.04, desconfianza: null, guarda: 47.63, merchantpay: 56.49, formalidad: 49.0, creditoformal: 18.14, borrowAny: 37.03 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 71.57, desconfianza: null, guarda: 34.94, merchantpay: 45.77, formalidad: 36.5, creditoformal: 14.08, borrowAny: 38.55 },
  { cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 71.15, desconfianza: null, guarda: 39.91, merchantpay: 48.61, formalidad: 38.9, creditoformal: 14.37, borrowAny: 36.97 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 61.44, desconfianza: null, guarda: 22.79, merchantpay: 22.31, formalidad: 40.6, creditoformal: 24.34, borrowAny: 59.9 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 68.24, desconfianza: null, guarda: 34.13, merchantpay: 33.14, formalidad: 48.8, creditoformal: 33.08, borrowAny: 67.8 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 52.95, desconfianza: null, guarda: 17.59, merchantpay: 11.22, formalidad: 28.1, creditoformal: 15.38, borrowAny: 54.72 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 72.63, desconfianza: null, guarda: 35.5, merchantpay: 38.52, formalidad: 53.6, creditoformal: 37.42, borrowAny: 69.8 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 65.51, desconfianza: null, guarda: 28.0, merchantpay: 20.73, formalidad: 46.6, creditoformal: 30.14, borrowAny: 64.67 },
  { cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 64.39, desconfianza: null, guarda: 28.54, merchantpay: 31.26, formalidad: 44.0, creditoformal: 27.83, borrowAny: 63.31 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 63.51, desconfianza: 32.2, guarda: 23.82, merchantpay: 16.21, formalidad: 26.4, creditoformal: 11.63, borrowAny: 44.08 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 65.6, desconfianza: 35.0, guarda: 37.98, merchantpay: 25.85, formalidad: 40.2, creditoformal: 20.99, borrowAny: 52.22 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 56.45, desconfianza: 38.2, guarda: 16.18, merchantpay: 9.15, formalidad: 21.8, creditoformal: 10.18, borrowAny: 46.65 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 69.88, desconfianza: 29.0, guarda: 40.14, merchantpay: 28.56, formalidad: 41.0, creditoformal: 20.02, borrowAny: 48.83 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 62.56, desconfianza: 29.8, guarda: 26.66, merchantpay: 13.22, formalidad: 32.1, creditoformal: 15.04, borrowAny: 46.92 },
  { cc: "ECU", nombre: "Ecuador", flag: "🇪🇨", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 66.26, desconfianza: 37.3, guarda: 34.07, merchantpay: 27.62, formalidad: 34.8, creditoformal: 17.03, borrowAny: 48.88 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 34.44, desconfianza: 22.5, guarda: 10.55, merchantpay: null, formalidad: 26.6, creditoformal: 9.66, borrowAny: 36.28 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 54.69, desconfianza: 22.6, guarda: 24.44, merchantpay: null, formalidad: 33.7, creditoformal: 13.44, borrowAny: 39.9 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 24.73, desconfianza: 19.4, guarda: 6.08, merchantpay: null, formalidad: 20.3, creditoformal: 6.02, borrowAny: 29.63 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 55.84, desconfianza: 26.1, guarda: 23.77, merchantpay: null, formalidad: 34.3, creditoformal: 14.88, borrowAny: 43.38 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 39.67, desconfianza: 20.4, guarda: 13.61, merchantpay: null, formalidad: 25.4, creditoformal: 9.89, borrowAny: 38.87 },
  { cc: "SLV", nombre: "El Salvador", flag: "🇸🇻", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 48.25, desconfianza: 25.7, guarda: 20.71, merchantpay: null, formalidad: 36.1, creditoformal: 13.21, borrowAny: 36.6 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 32.5, desconfianza: 19.3, guarda: 8.12, merchantpay: null, formalidad: 22.7, creditoformal: 9.79, borrowAny: 43.11 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 44.65, desconfianza: 27.8, guarda: 14.79, merchantpay: null, formalidad: 32.8, creditoformal: 12.85, borrowAny: 39.2 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 28.34, desconfianza: 14.3, guarda: 5.74, merchantpay: null, formalidad: 17.3, creditoformal: 6.43, borrowAny: 37.15 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 44.88, desconfianza: 30.3, guarda: 14.98, merchantpay: null, formalidad: 32.8, creditoformal: 14.42, borrowAny: 43.97 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 32.73, desconfianza: 20.1, guarda: 8.3, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 41.32 },
  { cc: "GTM", nombre: "Guatemala", flag: "🇬🇹", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 50.62, desconfianza: 31.3, guarda: 17.94, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 41.09 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 34.08, desconfianza: 41.0, guarda: 12.92, merchantpay: null, formalidad: 17.7, creditoformal: 8.48, borrowAny: 48.0 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 52.79, desconfianza: 43.8, guarda: 21.62, merchantpay: null, formalidad: 24.5, creditoformal: 12.51, borrowAny: 51.14 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 33.71, desconfianza: 40.5, guarda: 13.2, merchantpay: null, formalidad: 12.1, creditoformal: 5.77, borrowAny: 47.66 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 48.24, desconfianza: 43.3, guarda: 19.21, merchantpay: null, formalidad: 26.3, creditoformal: 13.32, borrowAny: 50.56 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 37.27, desconfianza: 44.6, guarda: 13.61, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 51.72 },
  { cc: "HND", nombre: "Honduras", flag: "🇭🇳", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 49.73, desconfianza: 37.5, guarda: 21.32, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 46.14 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 47.4, desconfianza: 26.4, guarda: 16.46, merchantpay: 19.9, formalidad: 25.1, creditoformal: 10.03, borrowAny: 39.97 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 59.14, desconfianza: 30.8, guarda: 26.82, merchantpay: 32.52, formalidad: 46.4, creditoformal: 20.06, borrowAny: 43.23 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 39.6, desconfianza: 27.0, guarda: 10.74, merchantpay: 12.3, formalidad: 24.3, creditoformal: 8.53, borrowAny: 35.08 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 61.97, desconfianza: 29.5, guarda: 28.55, merchantpay: 35.04, formalidad: 41.6, creditoformal: 19.04, borrowAny: 45.82 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 47.1, desconfianza: 30.1, guarda: 14.9, merchantpay: 16.7, formalidad: 28.4, creditoformal: 12.67, borrowAny: 44.63 },
  { cc: "MEX", nombre: "México", flag: "🇲🇽", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 57.25, desconfianza: 26.6, guarda: 26.07, merchantpay: 32.52, formalidad: 41.6, creditoformal: 16.38, borrowAny: 39.33 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 21.23, desconfianza: 29.8, guarda: null, merchantpay: null, formalidad: 31.8, creditoformal: 13.09, borrowAny: 41.19 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 25.96, desconfianza: 37.1, guarda: null, merchantpay: null, formalidad: 24.3, creditoformal: 11.18, borrowAny: 46.0 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 19.59, desconfianza: 27.8, guarda: null, merchantpay: null, formalidad: 18.8, creditoformal: 8.14, borrowAny: 43.38 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 26.06, desconfianza: 37.0, guarda: null, merchantpay: null, formalidad: 34.1, creditoformal: 14.86, borrowAny: 43.53 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 19.95, desconfianza: 34.9, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 48.54 },
  { cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 27.59, desconfianza: 30.1, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: 36.52 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 58.12, desconfianza: 32.1, guarda: 28.26, merchantpay: 34.95, formalidad: 27.6, creditoformal: 12.75, borrowAny: 46.13 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 70.39, desconfianza: 36.5, guarda: 40.52, merchantpay: 37.6, formalidad: 34.4, creditoformal: 16.71, borrowAny: 48.53 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 45.48, desconfianza: 34.6, guarda: 16.66, merchantpay: 15.75, formalidad: 17.4, creditoformal: 6.65, borrowAny: 38.25 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 76.52, desconfianza: 32.7, guarda: 45.95, merchantpay: 49.91, formalidad: 37.6, creditoformal: 20.03, borrowAny: 53.34 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 55.87, desconfianza: 31.2, guarda: 28.34, merchantpay: 25.98, formalidad: 26.9, creditoformal: 10.7, borrowAny: 39.79 },
  { cc: "PAN", nombre: "Panamá", flag: "🇵🇦", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 73.86, desconfianza: 39.3, guarda: 41.23, merchantpay: 48.43, formalidad: 34.5, creditoformal: 19.41, borrowAny: 56.23 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 56.18, desconfianza: 45.5, guarda: 20.84, merchantpay: 27.96, formalidad: 37.8, creditoformal: 17.13, borrowAny: 45.28 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 62.48, desconfianza: 40.1, guarda: 30.34, merchantpay: 37.54, formalidad: 46.6, creditoformal: 23.02, borrowAny: 49.42 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 44.62, desconfianza: 43.7, guarda: 10.46, merchantpay: 15.7, formalidad: 23.9, creditoformal: 8.75, borrowAny: 36.62 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 69.06, desconfianza: 42.3, guarda: 35.59, merchantpay: 44.02, formalidad: 50.6, creditoformal: 27.56, borrowAny: 54.46 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 55.67, desconfianza: 33.5, guarda: 22.5, merchantpay: 24.62, formalidad: 46.2, creditoformal: 23.05, borrowAny: 49.84 },
  { cc: "PER", nombre: "Perú", flag: "🇵🇪", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 62.32, desconfianza: 52.3, guarda: 28.1, merchantpay: 39.42, formalidad: 38.8, creditoformal: 17.58, borrowAny: 45.27 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 60.11, desconfianza: 71.1, guarda: 13.15, merchantpay: 24.95, formalidad: 28.2, creditoformal: 15.35, borrowAny: 54.49 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 61.77, desconfianza: 67.2, guarda: 23.3, merchantpay: 27.02, formalidad: 36.1, creditoformal: 19.92, borrowAny: 55.14 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 50.08, desconfianza: 71.8, guarda: 6.29, merchantpay: 13.69, formalidad: 16.8, creditoformal: 8.39, borrowAny: 49.88 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 68.14, desconfianza: 66.6, guarda: 25.95, merchantpay: 34.13, formalidad: 40.8, creditoformal: 23.69, borrowAny: 58.09 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 57.58, desconfianza: 66.7, guarda: 13.55, merchantpay: 21.84, formalidad: 30.4, creditoformal: 16.4, borrowAny: 53.91 },
  { cc: "PRY", nombre: "Paraguay", flag: "🇵🇾", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 65.81, desconfianza: 74.0, guarda: 24.74, merchantpay: 31.99, formalidad: 34.4, creditoformal: 19.29, borrowAny: 56.12 },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 73.29, desconfianza: null, guarda: null, merchantpay: null, formalidad: 72.6, creditoformal: 42.36, borrowAny: 58.35 },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 74.25, desconfianza: null, guarda: null, merchantpay: null, formalidad: 78.6, creditoformal: 41.62, borrowAny: 52.93 },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 62.85, desconfianza: null, guarda: null, merchantpay: null, formalidad: 58.0, creditoformal: 29.29, borrowAny: 50.52 },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 81.0, desconfianza: null, guarda: null, merchantpay: null, formalidad: 85.1, creditoformal: 50.43, borrowAny: 59.26 },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 67.4, desconfianza: null, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: null },
  { cc: "URY", nombre: "Uruguay", flag: "🇺🇾", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 78.51, desconfianza: null, guarda: null, merchantpay: null, formalidad: null, creditoformal: null, borrowAny: null },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "mujeres", segLabel: "Mujeres", familia: "genero",
    cuenta: 87.7, desconfianza: null, guarda: 23.36, merchantpay: 70.63, formalidad: 17.8, creditoformal: 10.76, borrowAny: 60.45 },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "hombres", segLabel: "Hombres", familia: "genero",
    cuenta: 86.93, desconfianza: null, guarda: 36.97, merchantpay: 72.49, formalidad: 26.4, creditoformal: 16.85, borrowAny: 63.71 },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "pobre40", segLabel: "40% más pobre", familia: "ingreso",
    cuenta: 84.43, desconfianza: null, guarda: 21.04, merchantpay: 59.88, formalidad: 16.3, creditoformal: 8.88, borrowAny: 54.35 },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "rico60", segLabel: "60% más rico", familia: "ingreso",
    cuenta: 89.25, desconfianza: null, guarda: 36.2, merchantpay: 79.35, formalidad: 25.4, creditoformal: 17.07, borrowAny: 67.23 },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "rural", segLabel: "Rural", familia: "territorio",
    cuenta: 83.45, desconfianza: null, guarda: 25.55, merchantpay: 63.7, formalidad: 17.3, creditoformal: 11.71, borrowAny: 67.76 },
  { cc: "VEN", nombre: "Venezuela", flag: "🇻🇪", seg: "urbano", segLabel: "Urbano", familia: "territorio",
    cuenta: 93.63, desconfianza: null, guarda: 33.19, merchantpay: 79.09, formalidad: 22.8, creditoformal: 13.57, borrowAny: 59.5 },
];
