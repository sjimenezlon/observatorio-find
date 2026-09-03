import type { Cotizacion } from "@/lib/cerebro/vivo/bolsa";
import type { Jugador } from "@/data/cerebro/tipos";
import { BANDERA } from "@/data/cerebro/tipos";
import { fecha, hace, num, pct, usdM } from "@/lib/cerebro/formato";

export default function Bolsa({ datos, jugadores }: { datos: Cotizacion[]; jugadores: Jugador[] }) {
  const cap = (t: string) => jugadores.find((j) => j.ticker === t);
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/12">
      <table className="w-full min-w-[760px] text-xs">
        <thead className="bg-white/[0.05] text-left font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
          <tr>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-3 py-3 text-right">Precio</th>
            <th className="px-3 py-3 text-right">Día</th>
            <th className="px-3 py-3 text-right">Rango 52 sem.</th>
            <th className="px-3 py-3 text-right">Capitalización (curada)</th>
            <th className="px-4 py-3">Último reporte a la SEC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {datos.map((c) => {
            const j = cap(c.ticker);
            const r = c.reportes[0];
            return (
              <tr key={c.ticker} className="align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold">
                    {BANDERA[c.pais as keyof typeof BANDERA]} {c.nombre}
                  </div>
                  <div className="font-mono text-[10px] text-muted">
                    {c.bolsa}: {c.ticker}
                  </div>
                </td>
                <td className="tabnum px-3 py-3 text-right">
                  {c.precio !== null ? `US$ ${num(c.precio, 2)}` : "s. d."}
                  {c.horaMercado ? <div className="text-[10px] text-muted">{hace(c.horaMercado)}</div> : null}
                </td>
                <td className={`tabnum px-3 py-3 text-right ${c.cambioDiaPct === null ? "" : c.cambioDiaPct >= 0 ? "text-lime" : "text-amber"}`}>{pct(c.cambioDiaPct, 2, true)}</td>
                <td className="tabnum px-3 py-3 text-right text-muted">
                  {c.min52 !== null && c.max52 !== null ? `${num(c.min52, 2)} – ${num(c.max52, 2)}` : "s. d."}
                </td>
                <td className="tabnum px-3 py-3 text-right">
                  {j?.valoracion_usd_m ? (
                    <>
                      {usdM(j.valoracion_usd_m)}
                      <div className="text-[10px] text-muted">{fecha(j.valoracion_fecha)}</div>
                    </>
                  ) : (
                    <span className="text-muted">s. d.</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {r ? (
                    <a href={r.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                      <span className="rounded-full border border-white/20 px-2 py-[1px] font-mono text-[9px]">{r.forma}</span> {fecha(r.fecha)} ↗
                    </a>
                  ) : (
                    <span className="text-muted">s. d.</span>
                  )}
                  {c.reportes.length > 1 ? (
                    <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-muted">
                      {c.reportes.slice(1).map((x) => (
                        <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                          {x.forma} {fecha(x.fecha)}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
