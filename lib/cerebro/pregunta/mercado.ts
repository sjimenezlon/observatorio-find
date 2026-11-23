import "server-only";
import { getJSON } from "@/lib/cerebro/vivo/http";

// -----------------------------------------------------------------------------
// Cotización de mercado para «@findy» · Yahoo Finance (endpoint público de
// gráficas, el mismo que usa lib/cerebro/vivo/bolsa.ts)
//
// Es un dato de mercado, no una cifra del Observatorio: se muestra siempre con
// su fuente y su hora, y nada de lo que sale de aquí entra a los índices.
// Los rendimientos son aritmética sobre los cierres semanales ajustados; el
// pasado no dice nada del futuro y así se le advierte al modelo.
// -----------------------------------------------------------------------------

export interface Cotizacion {
  simbolo: string;
  nombre: string;
  moneda: string;
  bolsa: string;
  precio: number;
  cambioDiaPct: number | null;
  max52: number | null;
  min52: number | null;
  /** ISO de la última operación reportada. */
  hora: string | null;
  /** Variación porcentual del precio ajustado en cada ventana; null si no hay historia suficiente. */
  rendimientoPct: { mes1: number | null; meses3: number | null; anio1: number | null; anios5: number | null };
  /** Tasa anual compuesta de los últimos 5 años (o de la historia disponible si es más corta). */
  anualizadoPct: number | null;
  aniosDeHistoria: number;
  /** Peor caída de pico a valle dentro de la historia consultada, en % (negativa). */
  peorCaidaPct: number | null;
  fuente: "Yahoo Finance";
  url: string;
}

interface YahooChart {
  chart: {
    result?: Array<{
      meta: {
        symbol?: string;
        longName?: string;
        shortName?: string;
        currency?: string;
        fullExchangeName?: string;
        exchangeName?: string;
        regularMarketPrice?: number;
        fiftyTwoWeekHigh?: number;
        fiftyTwoWeekLow?: number;
        regularMarketTime?: number;
      };
      timestamp?: number[];
      indicators?: {
        quote?: Array<{ close?: Array<number | null> }>;
        adjclose?: Array<{ adjclose?: Array<number | null> }>;
      };
    }>;
    error?: { description?: string } | null;
  };
}

const SIMBOLO = /^[A-Z0-9][A-Z0-9.\-=^]{0,11}$/;
const UA = { "user-agent": "Mozilla/5.0 (compatible; ObservatorioFind/1.0)" };

export function simboloValido(s: string): boolean {
  return SIMBOLO.test(s);
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

function serie(res: NonNullable<YahooChart["chart"]["result"]>[number]): Array<{ t: number; c: number }> {
  const ts = res.timestamp ?? [];
  const adj = res.indicators?.adjclose?.[0]?.adjclose;
  const cierre = res.indicators?.quote?.[0]?.close;
  const valores = adj ?? cierre ?? [];
  const out: Array<{ t: number; c: number }> = [];
  for (let i = 0; i < ts.length; i++) {
    const c = valores[i];
    if (typeof c === "number" && Number.isFinite(c) && c > 0) out.push({ t: ts[i], c });
  }
  return out;
}

/** Variación entre el último cierre y el cierre más cercano a `dias` atrás; null si la historia no llega. */
function variacion(puntos: Array<{ t: number; c: number }>, dias: number): number | null {
  if (puntos.length < 2) return null;
  const ultimo = puntos[puntos.length - 1];
  const objetivo = ultimo.t - dias * 86_400;
  if (puntos[0].t > objetivo + 21 * 86_400) return null; // la historia empieza después de la ventana
  let base = puntos[0];
  for (const p of puntos) {
    if (p.t <= objetivo) base = p;
    else break;
  }
  return r1((ultimo.c / base.c - 1) * 100);
}

function peorCaida(puntos: Array<{ t: number; c: number }>): number | null {
  if (puntos.length < 2) return null;
  let pico = puntos[0].c;
  let peor = 0;
  for (const p of puntos) {
    if (p.c > pico) pico = p.c;
    const caida = p.c / pico - 1;
    if (caida < peor) peor = caida;
  }
  return r1(peor * 100);
}

export async function cotizar(simboloCrudo: string): Promise<Cotizacion> {
  const simbolo = simboloCrudo.trim().toUpperCase().replace(/^\$/, "");
  if (!simboloValido(simbolo)) throw new Error(`Símbolo no válido: «${simboloCrudo}»`);

  const base = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}`;
  const opciones = { timeoutMs: 12_000, revalidate: 300, headers: UA };
  const [largo, corto] = await Promise.all([
    getJSON<YahooChart>(`${base}?range=5y&interval=1wk`, opciones),
    getJSON<YahooChart>(`${base}?range=5d&interval=1d`, opciones).catch(() => null),
  ]);

  const res = largo.chart.result?.[0];
  const precio = res?.meta.regularMarketPrice;
  if (!res || typeof precio !== "number") {
    throw new Error(`Yahoo Finance no devolvió cotización para «${simbolo}»`);
  }

  const puntos = serie(res);
  const diarios = corto?.chart.result?.[0] ? serie(corto.chart.result[0]) : [];
  const previo = diarios.length >= 2 ? diarios[diarios.length - 2].c : null;
  const ultimoDiario = diarios.length >= 1 ? diarios[diarios.length - 1].c : null;

  const anios = puntos.length >= 2 ? (puntos[puntos.length - 1].t - puntos[0].t) / (365.25 * 86_400) : 0;
  const anualizado =
    anios >= 1 ? r1((Math.pow(puntos[puntos.length - 1].c / puntos[0].c, 1 / anios) - 1) * 100) : null;

  return {
    simbolo: res.meta.symbol ?? simbolo,
    nombre: res.meta.longName ?? res.meta.shortName ?? simbolo,
    moneda: res.meta.currency ?? "USD",
    bolsa: res.meta.fullExchangeName ?? res.meta.exchangeName ?? "",
    precio: r2(precio),
    cambioDiaPct: previo && ultimoDiario ? r2((ultimoDiario / previo - 1) * 100) : null,
    max52: res.meta.fiftyTwoWeekHigh != null ? r2(res.meta.fiftyTwoWeekHigh) : null,
    min52: res.meta.fiftyTwoWeekLow != null ? r2(res.meta.fiftyTwoWeekLow) : null,
    hora: res.meta.regularMarketTime ? new Date(res.meta.regularMarketTime * 1000).toISOString() : null,
    rendimientoPct: {
      mes1: variacion(puntos, 30),
      meses3: variacion(puntos, 91),
      anio1: variacion(puntos, 365),
      anios5: variacion(puntos, 5 * 365 - 14),
    },
    anualizadoPct: anualizado,
    aniosDeHistoria: r1(anios),
    peorCaidaPct: peorCaida(puntos),
    fuente: "Yahoo Finance",
    url: `https://finance.yahoo.com/quote/${encodeURIComponent(simbolo)}`,
  };
}
