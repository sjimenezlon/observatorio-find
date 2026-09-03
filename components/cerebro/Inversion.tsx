"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BANDERA, NOMBRE_PAIS, NOMBRE_SEGMENTO, type Inversion as Datos, type PaisCerebro, type Segmento } from "@/data/cerebro/tipos";
import { fecha, num, usdM } from "@/lib/cerebro/formato";
import { Barra, Chip } from "./ui";

export default function Inversion({ datos }: { datos: Datos }) {
  const [pais, setPais] = useState<string>("todos");
  const [orden, setOrden] = useState<"fecha" | "monto">("fecha");

  const serie = datos.serie_anual.map((s) => ({ ...s, anio: String(s.anio) }));
  const maxPais = Math.max(...datos.por_pais_2025.map((p) => p.vc_fintech_usd_m ?? p.vc_total_usd_m ?? 0), 1);
  const paisesRondas = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of datos.rondas) m.set(r.pais, (m.get(r.pais) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [datos.rondas]);
  const rondas = useMemo(() => {
    const xs = datos.rondas.filter((r) => pais === "todos" || r.pais === pais);
    xs.sort((a, b) => (orden === "fecha" ? b.fecha.localeCompare(a.fecha) : (b.monto_usd_m ?? 0) - (a.monto_usd_m ?? 0)));
    return xs;
  }, [datos.rondas, pais, orden]);
  const totalRondas = rondas.reduce((s, r) => s + (r.monto_usd_m ?? 0), 0);

  return (
    <div className="space-y-14">
      {serie.length ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="card p-5">
            <div className="data-label text-muted">Capital de riesgo en América Latina · US$ millones por año</div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serie} margin={{ left: 4, right: 8, top: 8, bottom: 0 }} barGap={2}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="anio" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000} mil` : String(v))} width={44} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.06)" }}
                    contentStyle={{ background: "#1c1060", border: "1px solid rgba(240,255,41,0.3)", borderRadius: 12, fontSize: 12 }}
                    formatter={(v, n) => [usdM(typeof v === "number" ? v : null), n === "vc_total_usd_m" ? "VC total" : "VC fintech"]}
                    labelStyle={{ color: "#f0ff29" }}
                  />
                  <Bar dataKey="vc_total_usd_m" name="vc_total_usd_m" fill="#78d8f5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="vc_fintech_usd_m" name="vc_fintech_usd_m" fill="#f0ff29" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#78d8f5]" /> VC total</span>
              <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-lime" /> VC fintech</span>
            </div>
            <ul className="mt-3 space-y-1 text-[10.5px] text-muted">
              {serie.map((s) => (
                <li key={s.anio}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-lime">
                    {s.anio}: {s.fuente} ↗
                  </a>
                  {s.nota ? ` · ${s.nota}` : ""}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="card p-5">
              <div className="data-label text-muted">Cuánto del VC regional va a fintech</div>
              <div className="mt-3 space-y-2.5">
                {datos.participacion_fintech.map((p) => (
                  <Barra key={String(p.anio)} etiqueta={`${p.anio} · ${p.fuente}`} pct={p.pct} />
                ))}
              </div>
            </div>
            <div className="card p-5">
              <div className="data-label text-muted">VC fintech por país · 2025 · US$ millones</div>
              <div className="mt-3 space-y-2.5">
                {[...datos.por_pais_2025]
                  .sort((a, b) => (b.vc_fintech_usd_m ?? b.vc_total_usd_m ?? 0) - (a.vc_fintech_usd_m ?? a.vc_total_usd_m ?? 0))
                  .map((p) => {
                    const v = p.vc_fintech_usd_m ?? p.vc_total_usd_m;
                    return (
                      <div key={p.pais} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
                        <div>
                          <div className="flex justify-between gap-2">
                            <span>
                              {BANDERA[p.pais]} {NOMBRE_PAIS[p.pais]}
                              {p.vc_fintech_usd_m === null ? <span className="ml-1 text-[10px] text-amber">(VC total)</span> : null}
                            </span>
                            <a href={p.url} target="_blank" rel="noreferrer" className="text-[10px] text-muted hover:text-lime">
                              {p.fuente} ↗
                            </a>
                          </div>
                          <div className="mt-1 h-[6px] overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-lime" style={{ width: `${((v ?? 0) / maxPais) * 100}%` }} />
                          </div>
                        </div>
                        <span className="tabnum w-24 text-right font-semibold">{usdM(v)}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="data-label text-muted">Las rondas más grandes · 2025–2026</div>
            <div className="mt-1 text-xs text-muted">
              {rondas.length} rondas · {usdM(totalRondas)} sumados{pais !== "todos" ? ` en ${NOMBRE_PAIS[pais as PaisCerebro]}` : ""}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip activo={pais === "todos"} onClick={() => setPais("todos")}>
              Todos
            </Chip>
            {paisesRondas.map(([p, n]) => (
              <Chip key={p} activo={pais === p} onClick={() => setPais(p)}>
                {BANDERA[p as PaisCerebro]} {p} <span className="opacity-60">{n}</span>
              </Chip>
            ))}
            <Chip activo={orden === "fecha"} onClick={() => setOrden("fecha")}>
              Por fecha
            </Chip>
            <Chip activo={orden === "monto"} onClick={() => setOrden("monto")}>
              Por monto
            </Chip>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/12">
          <table className="w-full min-w-[820px] text-xs">
            <thead className="bg-white/[0.05] text-left font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-3 py-3">Empresa</th>
                <th className="px-3 py-3">Segmento</th>
                <th className="px-3 py-3">Ronda</th>
                <th className="px-3 py-3 text-right">Monto</th>
                <th className="px-3 py-3 text-right">Valoración</th>
                <th className="px-3 py-3">Inversores</th>
                <th className="px-4 py-3">Fuente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {rondas.map((r) => (
                <tr key={`${r.empresa}-${r.fecha}`} className="align-top">
                  <td className="tabnum whitespace-nowrap px-4 py-2.5 text-muted">{fecha(r.fecha)}</td>
                  <td className="px-3 py-2.5 font-semibold">
                    {BANDERA[r.pais]} {r.empresa}
                  </td>
                  <td className="px-3 py-2.5 text-fg/80">{NOMBRE_SEGMENTO[r.segmento as Segmento] ?? r.segmento}</td>
                  <td className="px-3 py-2.5 text-fg/80">{r.tipo}</td>
                  <td className="tabnum px-3 py-2.5 text-right font-semibold text-lime">{usdM(r.monto_usd_m)}</td>
                  <td className="tabnum px-3 py-2.5 text-right text-fg/80">{usdM(r.valoracion_usd_m)}</td>
                  <td className="max-w-[240px] px-3 py-2.5 text-[11px] text-fg/75">{r.inversores.join(", ")}</td>
                  <td className="px-4 py-2.5 text-[11px]">
                    <a href={r.url} target="_blank" rel="noreferrer" className="text-muted hover:text-lime">
                      {r.fuente} ↗
                    </a>
                    {r.nota ? <div className="text-[10px] text-amber">{r.nota}</div> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="data-label mb-3 text-muted">Salidas · IPO, fusiones y adquisiciones</div>
          <ul className="divide-y divide-white/8 rounded-2xl border border-white/12">
            {[...datos.salidas]
              .sort((a, b) => b.fecha.localeCompare(a.fecha))
              .map((s) => (
                <li key={`${s.empresa}-${s.fecha}`} className="grid gap-1 px-4 py-3 text-xs sm:grid-cols-[90px_minmax(0,1fr)_auto]">
                  <span className="tabnum text-muted">{fecha(s.fecha)}</span>
                  <span>
                    <span className="font-semibold">
                      {BANDERA[s.pais]} {s.empresa}
                    </span>
                    <span className="text-fg/75">
                      {" "}
                      · {s.tipo}
                      {s.comprador ? ` · ${s.comprador}` : ""}
                    </span>
                    <a href={s.url} target="_blank" rel="noreferrer" className="ml-2 text-[10px] text-muted hover:text-lime">
                      {s.fuente} ↗
                    </a>
                  </span>
                  <span className="tabnum font-semibold text-lime sm:text-right">{usdM(s.valor_usd_m)}</span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="data-label mb-3 text-muted">Los fondos más activos en fintech</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {datos.fondos_activos.map((f) => (
              <li key={f.nombre} className="rounded-xl border border-white/12 bg-white/[0.03] p-3 text-xs">
                <div className="flex items-baseline justify-between gap-2">
                  <a href={f.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-lime">
                    {f.nombre} ↗
                  </a>
                  {f.deals_fintech_2025 !== null ? <span className="tabnum text-lime">{num(f.deals_fintech_2025)} deals</span> : null}
                </div>
                <div className="mt-0.5 text-[10.5px] text-muted">
                  {f.tipo} · {f.sede}
                  {f.nota ? ` · ${f.nota}` : ""}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
