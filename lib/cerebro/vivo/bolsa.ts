import "server-only";
import { envolver, getJSON, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// Fintechs latinoamericanas en bolsa · precio (Yahoo Finance, endpoint público
// de gráficas) + últimos reportes ante la SEC (EDGAR, API oficial abierta)
//
// El precio es un dato de mercado, no una cifra del Observatorio. La
// capitalización NO se deriva aquí: la que se muestra viene del dataset
// curado con su fecha. Los 6-K/20-F son la fuente primaria de todo lo demás.
// -----------------------------------------------------------------------------

export interface Cotizada {
  ticker: string;
  nombre: string;
  bolsa: string;
  pais: string;
  cik: string;
}

export const COTIZADAS: Cotizada[] = [
  { ticker: "NU", nombre: "Nu Holdings (Nubank)", bolsa: "NYSE", pais: "BR", cik: "0001691493" },
  { ticker: "MELI", nombre: "MercadoLibre (Mercado Pago)", bolsa: "Nasdaq", pais: "AR", cik: "0001099590" },
  { ticker: "DLO", nombre: "dLocal", bolsa: "Nasdaq", pais: "UY", cik: "0001846832" },
  { ticker: "PAGS", nombre: "PagSeguro Digital (PagBank)", bolsa: "NYSE", pais: "BR", cik: "0001712807" },
  { ticker: "STNE", nombre: "StoneCo", bolsa: "Nasdaq", pais: "BR", cik: "0001745431" },
  { ticker: "INTR", nombre: "Inter & Co (Banco Inter)", bolsa: "Nasdaq", pais: "BR", cik: "0001864163" },
  { ticker: "XP", nombre: "XP Inc.", bolsa: "Nasdaq", pais: "BR", cik: "0001787425" },
  { ticker: "PICS", nombre: "PicPay", bolsa: "Nasdaq", pais: "BR", cik: "0001841644" },
  { ticker: "AGBK", nombre: "Agibank", bolsa: "NYSE", pais: "BR", cik: "0002081206" },
  { ticker: "EVTC", nombre: "Evertec", bolsa: "NYSE", pais: "REG", cik: "0001559865" },
];

export interface Cotizacion extends Cotizada {
  precio: number | null;
  cambioDiaPct: number | null;
  max52: number | null;
  min52: number | null;
  horaMercado: string | null;
  reportes: Array<{ fecha: string; forma: string; url: string; descripcion: string }>;
}

interface YahooChart {
  chart: {
    result?: Array<{
      meta: {
        regularMarketPrice?: number;
        regularMarketChangePercent?: number;
        fiftyTwoWeekHigh?: number;
        fiftyTwoWeekLow?: number;
        regularMarketTime?: number;
      };
    }>;
  };
}

interface SecSubmissions {
  filings: {
    recent: {
      accessionNumber: string[];
      filingDate: string[];
      form: string[];
      primaryDocument: string[];
      primaryDocDescription: string[];
    };
  };
}

const FORMAS_UTILES = new Set(["6-K", "20-F", "F-1", "F-3", "S-1", "10-Q", "10-K", "8-K", "SC 13G", "SC 13D"]);

export async function cargarBolsa(): Promise<Vivo<Cotizacion[]>> {
  return envolver({ nombre: "Yahoo Finance · SEC EDGAR", url: "https://www.sec.gov/edgar/search/" }, async () => {
    const filas = await Promise.all(
      COTIZADAS.map(async (c): Promise<Cotizacion> => {
        const [y, s] = await Promise.allSettled([
          getJSON<YahooChart>(`https://query1.finance.yahoo.com/v8/finance/chart/${c.ticker}?range=5d&interval=1d`, {
            timeoutMs: 12_000,
            revalidate: 1800,
            headers: { "user-agent": "Mozilla/5.0 (compatible; ObservatorioFind/1.0)" },
          }),
          getJSON<SecSubmissions>(`https://data.sec.gov/submissions/CIK${c.cik}.json`, { timeoutMs: 15_000, revalidate: 21_600 }),
        ]);
        const meta = y.status === "fulfilled" ? y.value.chart.result?.[0]?.meta : undefined;
        const r = (v: number | undefined) => (typeof v === "number" ? Math.round(v * 100) / 100 : null);
        const reportes: Cotizacion["reportes"] = [];
        if (s.status === "fulfilled") {
          const f = s.value.filings.recent;
          const cikNum = String(Number(c.cik));
          for (let i = 0; i < f.form.length && reportes.length < 4; i++) {
            if (!FORMAS_UTILES.has(f.form[i])) continue;
            const acc = f.accessionNumber[i].replace(/-/g, "");
            reportes.push({
              fecha: f.filingDate[i],
              forma: f.form[i],
              url: `https://www.sec.gov/Archives/edgar/data/${cikNum}/${acc}/${f.primaryDocument[i]}`,
              descripcion: f.primaryDocDescription[i] || f.form[i],
            });
          }
        }
        return {
          ...c,
          precio: r(meta?.regularMarketPrice),
          cambioDiaPct: r(meta?.regularMarketChangePercent),
          max52: r(meta?.fiftyTwoWeekHigh),
          min52: r(meta?.fiftyTwoWeekLow),
          horaMercado: meta?.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : null,
          reportes,
        };
      }),
    );
    if (filas.every((f) => f.precio === null && !f.reportes.length)) throw new Error("ni Yahoo ni EDGAR respondieron");
    return filas;
  });
}
