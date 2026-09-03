import type { CriptoVivo } from "@/lib/cerebro/vivo/cripto";
import { BANDERA, type PaisCerebro } from "@/data/cerebro/tipos";
import { num } from "@/lib/cerebro/formato";

export default function Cripto({ datos }: { datos: CriptoVivo }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {datos.exchanges.map((e) => (
        <a key={e.id} href={e.url} target="_blank" rel="noreferrer" className="card block p-4 transition hover:border-lime/50">
          <div className="text-sm font-semibold">
            {BANDERA[e.pais as PaisCerebro]} {e.nombre}
          </div>
          <div className="tabnum mt-2 text-2xl font-extrabold tracking-[-0.04em]">
            {e.volumen24hUSD !== null ? `US$ ${num(e.volumen24hUSD / 1e6, 1)} M` : `${num(e.volumen24hBTC, 1)} BTC`}
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.1em] text-muted">volumen reportado · 24 h</div>
          <div className="mt-2 text-xs text-muted">
            {num(e.volumen24hBTC, 1)} BTC · confianza {e.confianza ?? "s. d."}/10{e.ranking ? ` · puesto ${e.ranking} global` : ""}
          </div>
        </a>
      ))}
      <div className="rounded-2xl border border-dashed border-white/18 p-4 text-[11px] leading-relaxed text-muted sm:col-span-3">
        Volumen convertido a dólares con el precio de bitcoin de CoinGecko{datos.btcUSD ? ` (US$ ${num(datos.btcUSD)})` : ""}. Es el volumen que cada exchange
        reporta; CoinGecko lo pondera con su puntaje de confianza. Ripio, Lemon, Buenbit y Belo no publican volumen en esa API.
      </div>
    </div>
  );
}
