"use client";

import { useState } from "react";
import { BANDERA, type Norma, type Pais } from "@/data/cerebro/tipos";
import { fecha, num, pct } from "@/lib/cerebro/formato";
import { Barra, Chip } from "./ui";

function tono(estado: string | null | undefined): string {
  const e = (estado ?? "").toLowerCase();
  if (/vigente|obligatorio|operando|regulado/.test(e)) return "border-lime/50 bg-lime/15 text-lime";
  if (/parcial|voluntario|piloto|tr[aá]mite|discusi/.test(e)) return "border-amber/50 bg-amber/15 text-amber";
  if (/no hay|sin marco|prohibido|no existe/.test(e)) return "border-white/20 bg-white/5 text-fg/60";
  return "border-white/20 bg-white/5 text-fg/80";
}

function Estado({ estado }: { estado: string | null | undefined }) {
  return <span className={`rounded-full border px-2 py-[2px] font-mono text-[9.5px] uppercase tracking-[0.1em] ${tono(estado)}`}>{estado ?? "s. d."}</span>;
}

function BloqueNorma({ titulo, n }: { titulo: string; n: Norma | null }) {
  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="data-label text-muted">{titulo}</div>
        <Estado estado={n?.estado} />
      </div>
      {n ? (
        <>
          <div className="mt-2 text-sm font-semibold">
            {n.norma ?? n.nombre ?? "—"}
            {n.anio ? <span className="ml-1 text-xs font-normal text-muted">({n.anio})</span> : null}
          </div>
          {n.detalle ? <p className="mt-1 text-xs leading-relaxed text-fg/80">{n.detalle}</p> : null}
          {n.url ? (
            <a href={n.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[10.5px] text-muted hover:text-lime">
              Fuente ↗
            </a>
          ) : null}
        </>
      ) : (
        <div className="mt-2 text-xs text-muted">Sin dato verificado.</div>
      )}
    </div>
  );
}

export default function Paises({ datos }: { datos: Pais[] }) {
  const [sel, setSel] = useState(datos[0]?.code ?? "CO");
  const p = datos.find((d) => d.code === sel) ?? datos[0];
  if (!p) return <p className="text-sm text-muted">Aún no hay países cargados.</p>;
  const maxSeg = Math.max(...p.segmentos.map((s) => s.pct ?? 0), 1);
  const riel = p.riel_inmediato;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {datos.map((d) => (
          <Chip key={d.code} activo={sel === d.code} onClick={() => setSel(d.code)}>
            {d.flag} {d.nombre}
          </Chip>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="card p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="data-label text-muted">Ecosistema</div>
              <div className="tabnum mt-1 text-4xl font-extrabold tracking-[-0.04em] text-lime">{p.fintechs?.n !== null && p.fintechs?.n !== undefined ? num(p.fintechs.n) : "s. d."}</div>
              <div className="text-xs text-muted">
                fintechs activas{p.fintechs?.anio ? ` · ${p.fintechs.anio}` : ""}
                {p.fintechs?.url ? (
                  <a href={p.fintechs.url} target="_blank" rel="noreferrer" className="ml-1 hover:text-lime">
                    {p.fintechs.fuente} ↗
                  </a>
                ) : null}
              </div>
            </div>
            <div className="text-right text-xs text-muted">
              {p.fintechs_bid?.n !== null && p.fintechs_bid?.n !== undefined ? (
                <>
                  <div className="tabnum text-lg font-bold text-fg">{num(p.fintechs_bid.n)}</div>
                  <a href={p.fintechs_bid.url ?? "#"} target="_blank" rel="noreferrer" className="hover:text-lime">
                    {p.fintechs_bid.fuente ?? "BID/Finnovista"}
                    {p.fintechs_bid.anio ? ` · ${p.fintechs_bid.anio}` : ""} ↗
                  </a>
                </>
              ) : null}
              {p.poblacion_adulta_m !== null ? <div className="mt-2">Adultos: {num(p.poblacion_adulta_m, 1)} M</div> : null}
            </div>
          </div>
          {p.segmentos.length ? (
            <div className="mt-5 space-y-2">
              <div className="data-label text-muted">
                Por segmento
                {p.segmentos_fuente ? (
                  <a href={p.segmentos_fuente.url} target="_blank" rel="noreferrer" className="ml-2 normal-case tracking-normal hover:text-lime">
                    {p.segmentos_fuente.fuente} · {p.segmentos_fuente.anio} ↗
                  </a>
                ) : null}
              </div>
              {p.segmentos.map((s) => (
                <Barra key={s.segmento} etiqueta={s.segmento} pct={s.pct ?? 0} valor={s.n !== null ? num(s.n) : undefined} ancho={maxSeg} />
              ))}
            </div>
          ) : null}
          {p.inclusion ? (
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
              <div>
                <div className="tabnum text-xl font-bold">{pct(p.inclusion.cuenta_pct, 1)}</div>
                <div className="text-muted">adultos con cuenta</div>
              </div>
              <div>
                <div className="tabnum text-xl font-bold">{pct(p.inclusion.pago_digital_pct, 1)}</div>
                <div className="text-muted">hicieron o recibieron un pago digital</div>
              </div>
              {p.inclusion.url ? (
                <a href={p.inclusion.url} target="_blank" rel="noreferrer" className="col-span-2 text-[10.5px] text-muted hover:text-lime">
                  {p.inclusion.fuente} ↗
                </a>
              ) : null}
            </div>
          ) : null}
          {p.notas ? <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-fg/80">{p.notas}</p> : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <BloqueNorma titulo="Ley fintech" n={p.ley_fintech} />
          <BloqueNorma titulo="Open finance" n={p.open_finance} />
          <BloqueNorma titulo="Sandbox regulatorio" n={p.sandbox} />
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="data-label text-muted">Criptoactivos</div>
              <Estado estado={p.cripto?.regimen} />
            </div>
            {p.cripto ? (
              <>
                <div className="mt-2 text-sm font-semibold">{p.cripto.norma ?? "—"}</div>
                {p.cripto.detalle ? <p className="mt-1 text-xs leading-relaxed text-fg/80">{p.cripto.detalle}</p> : null}
                {p.cripto.url ? (
                  <a href={p.cripto.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[10.5px] text-muted hover:text-lime">
                    Fuente ↗
                  </a>
                ) : null}
              </>
            ) : (
              <div className="mt-2 text-xs text-muted">Sin dato verificado.</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="card p-5">
          <div className="data-label text-muted">Riel de pagos inmediatos</div>
          {riel && riel.nombre ? (
            <>
              <div className="mt-1 text-2xl font-extrabold tracking-tight">
                {riel.nombre} <span className="text-sm font-normal text-muted">· {riel.operador ?? "s. d."}{riel.lanzamiento ? ` · desde ${fecha(riel.lanzamiento)}` : ""}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  [riel.usuarios_m, "usuarios (M)"],
                  [riel.llaves_m, "llaves (M)"],
                  [riel.tx_mes_m, "tx / mes (M)"],
                  [riel.tx_dia_m, "tx / día (M)"],
                ].map(([v, l]) => (
                  <div key={String(l)}>
                    <div className="tabnum text-xl font-bold">{v !== null && v !== undefined ? num(Number(v), Number(v) < 10 ? 1 : 0) : "s. d."}</div>
                    <div className="text-[10.5px] uppercase tracking-[0.1em] text-muted">{String(l)}</div>
                  </div>
                ))}
              </div>
              {riel.detalle ? <p className="mt-3 text-xs leading-relaxed text-fg/80">{riel.detalle}</p> : null}
              <div className="mt-2 text-[10.5px] text-muted">
                {riel.fecha_dato ? `Dato a ${fecha(riel.fecha_dato)} · ` : ""}
                {riel.url ? (
                  <a href={riel.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                    {riel.fuente} ↗
                  </a>
                ) : (
                  riel.fuente
                )}
              </div>
            </>
          ) : (
            <div className="mt-2 text-xs text-muted">{riel?.detalle ?? "Sin riel inmediato con alias verificado."}</div>
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <div className="data-label text-muted">Reguladores y gremio</div>
            <ul className="mt-2 space-y-1 text-xs">
              {p.reguladores.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                    {r.sigla ? <span className="font-mono text-[10px] text-lime">{r.sigla}</span> : null} {r.nombre} ↗
                  </a>
                </li>
              ))}
              {p.gremio?.nombre ? (
                <li className="pt-1 text-fg/85">
                  {p.gremio.url ? (
                    <a href={p.gremio.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                      Gremio: {p.gremio.nombre}
                      {p.gremio.miembros ? ` (${num(p.gremio.miembros)} miembros)` : ""} ↗
                    </a>
                  ) : (
                    `Gremio: ${p.gremio.nombre}`
                  )}
                </li>
              ) : null}
            </ul>
          </div>
          {p.lideres.length ? (
            <div className="card p-5">
              <div className="data-label text-muted">Quién lidera</div>
              <ul className="mt-2 space-y-1.5 text-xs">
                {p.lideres.map((l) => (
                  <li key={l.nombre} className="flex items-baseline justify-between gap-2">
                    <span>
                      {l.url ? (
                        <a href={l.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-lime">
                          {l.nombre}
                        </a>
                      ) : (
                        <span className="font-semibold">{l.nombre}</span>
                      )}
                      {l.tipo ? <span className="text-muted"> · {l.tipo}</span> : null}
                    </span>
                    <span className="tabnum shrink-0 text-muted">
                      {l.usuarios_m !== null ? `${num(l.usuarios_m, l.usuarios_m < 10 ? 1 : 0)} M` : ""}
                      {l.fecha ? ` · ${fecha(l.fecha)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/12">
        <table className="w-full min-w-[900px] text-xs">
          <thead className="bg-white/[0.05] text-left font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">País</th>
              <th className="px-3 py-3 text-right">Fintechs</th>
              <th className="px-3 py-3">Ley fintech</th>
              <th className="px-3 py-3">Open finance</th>
              <th className="px-3 py-3">Sandbox</th>
              <th className="px-3 py-3">Riel inmediato</th>
              <th className="px-3 py-3">Cripto</th>
              <th className="px-3 py-3 text-right">Con cuenta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {datos.map((d) => (
              <tr key={d.code} className={`cursor-pointer hover:bg-white/[0.04] ${d.code === sel ? "bg-white/[0.06]" : ""}`} onClick={() => setSel(d.code)}>
                <td className="px-4 py-2.5 font-semibold">
                  {BANDERA[d.code]} {d.nombre}
                </td>
                <td className="tabnum px-3 py-2.5 text-right">
                  {d.fintechs?.n !== null && d.fintechs?.n !== undefined ? num(d.fintechs.n) : "s. d."}
                  {d.fintechs?.anio ? <span className="ml-1 text-[10px] text-muted">{d.fintechs.anio}</span> : null}
                </td>
                <td className="px-3 py-2.5"><Estado estado={d.ley_fintech?.estado} /></td>
                <td className="px-3 py-2.5"><Estado estado={d.open_finance?.estado} /></td>
                <td className="px-3 py-2.5"><Estado estado={d.sandbox?.estado} /></td>
                <td className="px-3 py-2.5">{d.riel_inmediato?.nombre ?? <span className="text-muted">—</span>}</td>
                <td className="px-3 py-2.5"><Estado estado={d.cripto?.regimen} /></td>
                <td className="tabnum px-3 py-2.5 text-right">{pct(d.inclusion?.cuenta_pct, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
