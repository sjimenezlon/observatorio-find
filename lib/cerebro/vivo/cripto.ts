import "server-only";
import { envolver, getJSON, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// Exchanges latinoamericanos · CoinGecko (API pública, sin llave)
//
// Volumen de 24 h y puntaje de confianza de los exchanges de la región que
// CoinGecko lista. El volumen es el que reporta el propio exchange a
// CoinGecko: es una señal de actividad, no una cifra auditada.
// -----------------------------------------------------------------------------

const EXCHANGES = [
  { id: "bitso", pais: "MX" },
  { id: "mercado_bitcoin", pais: "BR" },
  { id: "foxbit", pais: "BR" },
];

export interface ExchangeVivo {
  id: string;
  nombre: string;
  pais: string;
  volumen24hBTC: number;
  volumen24hUSD: number | null;
  confianza: number | null;
  ranking: number | null;
  url: string;
}

interface RespuestaExchange {
  name: string;
  url: string;
  trade_volume_24h_btc: number;
  trust_score: number | null;
  trust_score_rank: number | null;
}

export interface CriptoVivo {
  exchanges: ExchangeVivo[];
  btcUSD: number | null;
}

export async function cargarCripto(): Promise<Vivo<CriptoVivo>> {
  return envolver({ nombre: "CoinGecko · exchanges", url: "https://www.coingecko.com/es/exchanges" }, async () => {
    const precio = await getJSON<{ bitcoin?: { usd?: number } }>(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      { timeoutMs: 12_000, revalidate: 3600 },
    ).catch(() => ({ bitcoin: undefined }));
    const btcUSD = precio.bitcoin?.usd ?? null;
    const res = await Promise.allSettled(
      EXCHANGES.map(async (e): Promise<ExchangeVivo> => {
        const j = await getJSON<RespuestaExchange>(`https://api.coingecko.com/api/v3/exchanges/${e.id}`, { timeoutMs: 12_000, revalidate: 3600 });
        const btc = j.trade_volume_24h_btc ?? 0;
        return {
          id: e.id,
          nombre: j.name,
          pais: e.pais,
          volumen24hBTC: Math.round(btc * 10) / 10,
          volumen24hUSD: btcUSD ? Math.round(btc * btcUSD) : null,
          confianza: j.trust_score ?? null,
          ranking: j.trust_score_rank ?? null,
          url: j.url,
        };
      }),
    );
    const exchanges = res.filter((r): r is PromiseFulfilledResult<ExchangeVivo> => r.status === "fulfilled").map((r) => r.value);
    if (!exchanges.length) throw new Error("ningún exchange respondió");
    return { exchanges: exchanges.sort((a, b) => b.volumen24hBTC - a.volumen24hBTC), btcUSD };
  });
}
