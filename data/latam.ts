// =============================================================================
// Panel LATAM · "doble clic" a América Latina y el Caribe (21 economías)
//
// Fuentes primarias, extraídas vía API oficial:
//   · Global Findex 2025 (Banco Mundial, datos de encuesta 2024) — fuente 28 de
//     la API del Banco Mundial. Series: account.t.d, g20.any, merchant.pay,
//     fin25e2b, inactive.t.d, fin8, fin11d, fin22a, con21, con22, fin35,
//     fin2.t.d, mobileaccount.t.d.
//   · IMF Financial Access Survey vía WDI — FB.CBK.BRWR.P3 (prestatarios por
//     1.000 adultos) y FB.CBK.DPTR.P3 (depositantes por 1.000 adultos), 2024.
//   · World Bank Remittance Prices Worldwide — SI.RMT.COST.IB.ZS (2023).
//   · Balanza de pagos — BX.TRF.PWKR.DT.GD.ZS, remesas recibidas % del PIB (2025).
//
// Tres campos son DERIVADOS por el Observatorio (aritmética explícita, no
// estimación): ver /metodologia.
//   desconfianza     = fin11d / (100 − cuenta) × 100
//   creditoDeposito  = prestatarios / depositantes × 100
//   conversionEstafa = con22 / con21 × 100
//   formalidadCredito = fin22a / borrow.any.t.d × 100
//
// Generado por script desde las APIs; no editar valores a mano.
// =============================================================================

export interface PaisLatam {
  cc: string;
  nombre: string;
  flag: string;
  /** Tenencia de cuenta, % adultos 15+ (Findex account.t.d, 2024) */
  cuenta: number | null;
  /** Hizo o recibió un pago digital, % adultos (Findex g20.any, 2024) */
  pagodigital: number | null;
  /** Hizo un pago digital a un comercio, % adultos (Findex merchant.pay, 2024) */
  merchantpay: number | null;
  /** NO usó tarjeta ni celular para una compra presencial, % adultos (fin25e2b) */
  efectivo: number | null;
  /** Tiene una cuenta inactiva, % adultos (Findex inactive.t.d, 2024) */
  inactiva: number | null;
  /** Guarda dinero en la cuenta, % adultos (Findex fin8, 2024) */
  guarda: number | null;
  /** DERIVADO · % de los no bancarizados que declara desconfianza */
  desconfianza: number | null;
  /** Serie cruda fin11d, % de adultos 15+ */
  desconfianzaRaw: number | null;
  /** Tomó crédito formal, % adultos (Findex fin22a, 2024) */
  creditoformal: number | null;
  /** Se endeudó por cualquier vía, % adultos (Findex borrow.any.t.d, 2024) */
  borrowAny: number | null;
  /** DERIVADO · de cada 100 que se endeudaron, cuántas usaron el sistema formal */
  formalidadCredito: number | null;
  /** Prestatarios de bancos comerciales por 1.000 adultos (FAS, 2024) */
  prestatarios: number | null;
  /** Depositantes en bancos comerciales por 1.000 adultos (FAS, 2024) */
  depositantes: number | null;
  /** DERIVADO · prestatarios por cada 100 depositantes */
  creditoDeposito: number | null;
  /** Recibió una llamada o SMS pidiéndole dinero, % adultos (Findex con21) */
  estafaOferta: number | null;
  /** Envió dinero a quien se lo pidió por teléfono/SMS, % adultos (con22) */
  estafaEnvio: number | null;
  /** DERIVADO · de cada 100 solicitudes, cuántas terminan en envío de dinero */
  conversionEstafa: number | null;
  /** Pagó comisiones mayores a las esperadas al recibir el salario (fin35) */
  comisiones: number | null;
  /** Remesas recibidas, % del PIB (2025) */
  remesasPib: number | null;
  /** Costo de enviar US$200 al país, % del monto (RPW, 2023) */
  costoRemesa: number | null;
  /** Tiene tarjeta débito, % adultos (Findex fin2.t.d, 2024) */
  debito: number | null;
  /** Cuenta de dinero móvil, % adultos (Findex mobileaccount.t.d, 2024) */
  movil: number | null;
}

export const LATAM: PaisLatam[] = [
  {
    cc: "ARG", nombre: "Argentina", flag: "🇦🇷",
    cuenta: 81.74, pagodigital: 72.21, merchantpay: 60.19, efectivo: 23.2,
    inactiva: 1.95, guarda: 29.99, desconfianza: 58.4, desconfianzaRaw: 10.66,
    creditoformal: 29.27, borrowAny: 56.14, formalidadCredito: 52.1,
    prestatarios: 389.59, depositantes: 992.37, creditoDeposito: 39.3,
    estafaOferta: 27.34, estafaEnvio: 0.64, conversionEstafa: 2.3, comisiones: 4.38,
    remesasPib: 0.13, costoRemesa: null, debito: 64.07, movil: 56.74,
  },
  {
    cc: "BOL", nombre: "Bolivia", flag: "🇧🇴",
    cuenta: 56.85, pagodigital: 43.64, merchantpay: 20.48, efectivo: 37.45,
    inactiva: 4.18, guarda: 26.77, desconfianza: 43.8, desconfianzaRaw: 18.89,
    creditoformal: 18.23, borrowAny: 48.09, formalidadCredito: 37.9,
    prestatarios: 81.14, depositantes: null, creditoDeposito: null,
    estafaOferta: 30.28, estafaEnvio: 1.09, conversionEstafa: 3.6, comisiones: 3.24,
    remesasPib: 1.96, costoRemesa: 3.45, debito: 33.75, movil: 19.98,
  },
  {
    cc: "BRA", nombre: "Brasil", flag: "🇧🇷",
    cuenta: 86.38, pagodigital: 77.36, merchantpay: 60.15, efectivo: 28.72,
    inactiva: 1.19, guarda: 31.31, desconfianza: 41.6, desconfianzaRaw: 5.67,
    creditoformal: 45.92, borrowAny: 63.61, formalidadCredito: 72.2,
    prestatarios: 767.6, depositantes: 954.94, creditoDeposito: 80.4,
    estafaOferta: 29.81, estafaEnvio: 0.8, conversionEstafa: 2.7, comisiones: 6.55,
    remesasPib: 0.21, costoRemesa: 2.42, debito: 73.85, movil: 58.17,
  },
  {
    cc: "CHL", nombre: "Chile", flag: "🇨🇱",
    cuenta: 85.07, pagodigital: 84.29, merchantpay: null, efectivo: null,
    inactiva: 1.07, guarda: null, desconfianza: null, desconfianzaRaw: null,
    creditoformal: 24.19, borrowAny: 43.69, formalidadCredito: 55.4,
    prestatarios: 355.49, depositantes: null, creditoDeposito: null,
    estafaOferta: null, estafaEnvio: null, conversionEstafa: null, comisiones: null,
    remesasPib: 0.03, costoRemesa: null, debito: 80.84, movil: 18.67,
  },
  {
    cc: "COL", nombre: "Colombia", flag: "🇨🇴",
    cuenta: 57.06, pagodigital: 49.23, merchantpay: 26.12, efectivo: 33.27,
    inactiva: 2.52, guarda: 15.86, desconfianza: 44.3, desconfianzaRaw: 19.03,
    creditoformal: 12.4, borrowAny: 46.31, formalidadCredito: 26.8,
    prestatarios: 263.02, depositantes: 1802.83, creditoDeposito: 14.6,
    estafaOferta: 21.95, estafaEnvio: 0.97, conversionEstafa: 4.4, comisiones: 6.19,
    remesasPib: 2.87, costoRemesa: 2.43, debito: 26.06, movil: 39.15,
  },
  {
    cc: "CRI", nombre: "Costa Rica", flag: "🇨🇷",
    cuenta: 71.35, pagodigital: 60.46, merchantpay: 47.25, efectivo: 25.39,
    inactiva: 2.8, guarda: 37.53, desconfianza: 28.0, desconfianzaRaw: 8.03,
    creditoformal: 14.23, borrowAny: 37.72, formalidadCredito: 37.7,
    prestatarios: 259.8, depositantes: 1958.0, creditoDeposito: 13.3,
    estafaOferta: 17.5, estafaEnvio: 0.57, conversionEstafa: 3.3, comisiones: 5.1,
    remesasPib: 0.83, costoRemesa: 2.26, debito: 62.91, movil: null,
  },
  {
    cc: "DOM", nombre: "Rep. Dominicana", flag: "🇩🇴",
    cuenta: 64.78, pagodigital: 52.53, merchantpay: 27.63, efectivo: 38.79,
    inactiva: 2.99, guarda: 28.35, desconfianza: 25.9, desconfianzaRaw: 9.13,
    creditoformal: 28.63, borrowAny: 63.78, formalidadCredito: 44.9,
    prestatarios: 250.49, depositantes: 895.77, creditoDeposito: 28.0,
    estafaOferta: 23.1, estafaEnvio: 0.65, conversionEstafa: 2.8, comisiones: 6.23,
    remesasPib: 9.74, costoRemesa: 2.52, debito: 43.24, movil: 18.02,
  },
  {
    cc: "ECU", nombre: "Ecuador", flag: "🇪🇨",
    cuenta: 64.51, pagodigital: 43.3, merchantpay: 20.8, efectivo: 45.8,
    inactiva: 5.59, guarda: 30.56, desconfianza: 33.5, desconfianzaRaw: 11.89,
    creditoformal: 16.08, borrowAny: 47.95, formalidadCredito: 33.5,
    prestatarios: 147.64, depositantes: 761.08, creditoDeposito: 19.4,
    estafaOferta: 22.15, estafaEnvio: 2.18, conversionEstafa: 9.8, comisiones: 2.85,
    remesasPib: 5.93, costoRemesa: 2.3, debito: 45.72, movil: 10.08,
  },
  {
    cc: "SLV", nombre: "El Salvador", flag: "🇸🇻",
    cuenta: 43.4, pagodigital: 27.96, merchantpay: 9.98, efectivo: 33.78,
    inactiva: 3.96, guarda: 16.7, desconfianza: 22.5, desconfianzaRaw: 12.75,
    creditoformal: 11.34, borrowAny: 37.88, formalidadCredito: 29.9,
    prestatarios: null, depositantes: 1111.15, creditoDeposito: null,
    estafaOferta: 14.59, estafaEnvio: 0.06, conversionEstafa: 0.4, comisiones: 2.24,
    remesasPib: 27.51, costoRemesa: 2, debito: 25.43, movil: 5.84,
  },
  {
    cc: "GTM", nombre: "Guatemala", flag: "🇬🇹",
    cuenta: 38.28, pagodigital: 22.58, merchantpay: 5.54, efectivo: 33.14,
    inactiva: 3.21, guarda: 11.29, desconfianza: 22.9, desconfianzaRaw: 14.14,
    creditoformal: 8.73, borrowAny: 41.25, formalidadCredito: 21.2,
    prestatarios: 167.44, depositantes: null, creditoDeposito: null,
    estafaOferta: 13.63, estafaEnvio: 0.59, conversionEstafa: 4.3, comisiones: 1.87,
    remesasPib: 19.12, costoRemesa: 2.56, debito: 18.12, movil: 3.3,
  },
  {
    cc: "HND", nombre: "Honduras", flag: "🇭🇳",
    cuenta: 42.44, pagodigital: 30.05, merchantpay: 9.94, efectivo: 33.53,
    inactiva: 3.27, guarda: 16.81, desconfianza: 42.0, desconfianzaRaw: 24.19,
    creditoformal: 9.64, borrowAny: 49.41, formalidadCredito: 19.5,
    prestatarios: 120.83, depositantes: null, creditoDeposito: null,
    estafaOferta: 15.62, estafaEnvio: 0, conversionEstafa: 0.0, comisiones: 2.22,
    remesasPib: 30.12, costoRemesa: 2.62, debito: 21.48, movil: 10.89,
  },
  {
    cc: "HTI", nombre: "Haití", flag: "🇭🇹",
    cuenta: 32.62, pagodigital: 27.52, merchantpay: null, efectivo: null,
    inactiva: 3.13, guarda: null, desconfianza: null, desconfianzaRaw: null,
    creditoformal: 12.86, borrowAny: 39.69, formalidadCredito: 32.4,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: null, estafaEnvio: null, conversionEstafa: null, comisiones: null,
    remesasPib: null, costoRemesa: null, debito: 10.86, movil: 13.52,
  },
  {
    cc: "JAM", nombre: "Jamaica", flag: "🇯🇲",
    cuenta: 73.3, pagodigital: 49.67, merchantpay: 24.85, efectivo: 50.39,
    inactiva: 11.82, guarda: null, desconfianza: null, desconfianzaRaw: null,
    creditoformal: 12.04, borrowAny: 31.82, formalidadCredito: 37.8,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: null, estafaEnvio: null, conversionEstafa: null, comisiones: null,
    remesasPib: 16.19, costoRemesa: 3.59, debito: 46.7, movil: 12.66,
  },
  {
    cc: "MEX", nombre: "México", flag: "🇲🇽",
    cuenta: 53.03, pagodigital: 41.39, merchantpay: 25.95, efectivo: 30.65,
    inactiva: 3.02, guarda: 21.43, desconfianza: 28.2, desconfianzaRaw: 13.26,
    creditoformal: 14.84, borrowAny: 41.53, formalidadCredito: 35.7,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: 21.3, estafaEnvio: 0.78, conversionEstafa: 3.7, comisiones: 3.82,
    remesasPib: 3.51, costoRemesa: 2.65, debito: 40.13, movil: 10.44,
  },
  {
    cc: "NIC", nombre: "Nicaragua", flag: "🇳🇮",
    cuenta: 23.47, pagodigital: 16.39, merchantpay: 5.51, efectivo: 18.06,
    inactiva: 2.0, guarda: 7.02, desconfianza: 33.1, desconfianzaRaw: 25.36,
    creditoformal: 6.65, borrowAny: 43.47, formalidadCredito: 15.3,
    prestatarios: null, depositantes: 483.83, creditoDeposito: null,
    estafaOferta: 10.78, estafaEnvio: 0.14, conversionEstafa: 1.3, comisiones: 0.72,
    remesasPib: 26.63, costoRemesa: 2.33, debito: 13.85, movil: 8.09,
  },
  {
    cc: "PAN", nombre: "Panamá", flag: "🇵🇦",
    cuenta: 64.1, pagodigital: 52.08, merchantpay: 36.24, efectivo: 30.52,
    inactiva: 2.78, guarda: 34.23, desconfianza: 33.9, desconfianzaRaw: 12.16,
    creditoformal: 14.68, borrowAny: 47.3, formalidadCredito: 31.0,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: 23.31, estafaEnvio: 1.97, conversionEstafa: 8.5, comisiones: 3.57,
    remesasPib: 0.7, costoRemesa: 2.49, debito: 49.4, movil: 38.05,
  },
  {
    cc: "PER", nombre: "Perú", flag: "🇵🇪",
    cuenta: 59.31, pagodigital: 51.71, merchantpay: 32.72, efectivo: 26.81,
    inactiva: 2.52, guarda: 25.56, desconfianza: 43.0, desconfianzaRaw: 17.51,
    creditoformal: 20.06, borrowAny: 47.34, formalidadCredito: 42.4,
    prestatarios: 167.06, depositantes: 1553.48, creditoDeposito: 10.8,
    estafaOferta: 22.25, estafaEnvio: 0.5, conversionEstafa: 2.2, comisiones: 5.01,
    remesasPib: 1.58, costoRemesa: 3.57, debito: 36.65, movil: 42.5,
  },
  {
    cc: "PRY", nombre: "Paraguay", flag: "🇵🇾",
    cuenta: 60.92, pagodigital: 55.47, merchantpay: 25.96, efectivo: 35.35,
    inactiva: 0.6, guarda: 18.09, desconfianza: 69.3, desconfianzaRaw: 27.08,
    creditoformal: 17.57, borrowAny: 54.81, formalidadCredito: 32.1,
    prestatarios: 465.52, depositantes: 1403.09, creditoDeposito: 33.2,
    estafaOferta: 33.74, estafaEnvio: 2.23, conversionEstafa: 6.6, comisiones: 3.11,
    remesasPib: 3.1, costoRemesa: 4.66, debito: 32.71, movil: 35.95,
  },
  {
    cc: "TTO", nombre: "Trinidad y Tobago", flag: "🇹🇹",
    cuenta: 74.59, pagodigital: 64.11, merchantpay: null, efectivo: null,
    inactiva: 7.53, guarda: null, desconfianza: null, desconfianzaRaw: null,
    creditoformal: 27.49, borrowAny: 46.55, formalidadCredito: 59.1,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: null, estafaEnvio: null, conversionEstafa: null, comisiones: null,
    remesasPib: null, costoRemesa: null, debito: 55.15, movil: null,
  },
  {
    cc: "URY", nombre: "Uruguay", flag: "🇺🇾",
    cuenta: 73.75, pagodigital: 67.99, merchantpay: null, efectivo: null,
    inactiva: 2.54, guarda: null, desconfianza: null, desconfianzaRaw: null,
    creditoformal: 42.01, borrowAny: 55.78, formalidadCredito: 75.3,
    prestatarios: 766.28, depositantes: 1327.18, creditoDeposito: 57.7,
    estafaOferta: null, estafaEnvio: null, conversionEstafa: null, comisiones: null,
    remesasPib: 0.18, costoRemesa: null, debito: 72.34, movil: 1.23,
  },
  {
    cc: "VEN", nombre: "Venezuela", flag: "🇻🇪",
    cuenta: 87.32, pagodigital: 75.52, merchantpay: 71.56, efectivo: 15.98,
    inactiva: 2.91, guarda: 30.13, desconfianza: 20.2, desconfianzaRaw: 2.56,
    creditoformal: 13.79, borrowAny: 62.07, formalidadCredito: 22.2,
    prestatarios: null, depositantes: null, creditoDeposito: null,
    estafaOferta: 27.09, estafaEnvio: 1.32, conversionEstafa: 4.9, comisiones: 5.75,
    remesasPib: null, costoRemesa: null, debito: 71.61, movil: 33.74,
  },
];

export const LATAM_CORE = ["COL", "MEX", "BRA", "CHL", "PER", "ARG"];

