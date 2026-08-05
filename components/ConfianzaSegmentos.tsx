"use client";

import { useMemo, useState } from "react";
import { FAMILIAS, FamiliaSeg } from "@/data/segmentos";
import {
  calcularICFS,
  calcularBrechas,
  DIMS_SEG,
  INDICADORES_SEG,
} from "@/lib/segmentos";

const fmt = (v: number | null, d = 1) =>
  v === null ? "n/d" : v.toFixed(d).replace(".", ",");

export default function ConfianzaSegmentos() {
  const [familia, setFamilia] = useState<FamiliaSeg>("genero");
  const [pais, setPais] = useState("COL");

  const filas = useMemo(() => calcularICFS(), []);
  const brechas = useMemo(() => calcularBrechas(filas), [filas]);

  const paises = useMemo(
    () =>
      [...new Map(filas.map((f) => [f.cc, { cc: f.cc, nombre: f.nombre, flag: f.flag }])).values()].sort(
        (a, b) => a.nombre.localeCompare(b.nombre)
      ),
    [filas]
  );

  const fam = FAMILIAS[familia];

  // países que no alcanzan el umbral de cobertura en ningún segmento
  const noMedibles = useMemo(() => {
    const map = new Map<string, { flag: string; nombre: string }>();
    for (const f of filas) {
      if (!f.medible && !filas.some((g) => g.cc === f.cc && g.medible))
        map.set(f.cc, { flag: f.flag, nombre: f.nombre });
    }
    return [...map.values()];
  }, [filas]);
  const ordenadas = useMemo(
    () =>
      brechas
        .filter((b) => b.familia === familia && b.brecha !== null)
        .sort((a, b) => (b.brecha ?? 0) - (a.brecha ?? 0)),
    [brechas, familia]
  );

  const maxBrecha = Math.max(...ordenadas.map((b) => Math.abs(b.brecha ?? 0)), 1);
  const delPais = filas.filter((f) => f.cc === pais);
  const nombrePais = delPais[0]?.nombre ?? "";
  const flagPais = delPais[0]?.flag ?? "";

  // las tres brechas del país seleccionado
  const brechasPais = (["genero", "ingreso", "territorio"] as FamiliaSeg[]).map((f) => ({
    familia: f,
    ...brechas.find((b) => b.cc === pais && b.familia === f),
  }));

  return (
    <section id="segmentos" className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#FF7A9E" }}>
          ICF-S · confianza por segmento
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          El promedio nacional esconde a quien menos confía
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          El ICF dice cuánto confía un país. Esta capa dice{" "}
          <b className="font-semibold text-fg">quién, dentro de ese país, confía menos</b> —
          usando las desagregaciones oficiales del Findex por género, quintil de
          ingreso y territorio. Es la pregunta que importa si el objetivo es
          llegar a la población desatendida, porque el promedio se construye
          justamente encima de ella.
        </p>

        <div className="mb-6 rounded-xl border border-amber/25 bg-amber/8 p-4 text-[12px] leading-relaxed text-fg/85">
          <b className="text-amber">Índice reducido, y por eso se llama distinto.</b>{" "}
          El Findex no desagrega las cuentas inactivas, las estafas ni las
          comisiones inesperadas, y el FAS del FMI no desagrega prestatarios ni
          depositantes. El ICF-S usa por tanto{" "}
          <b className="text-fg">3 dimensiones y 4 indicadores</b>, no las 4 y 8
          del ICF completo. Sus valores no son intercambiables con los de aquel:
          sirven para comparar segmentos entre sí, no para reemplazar el índice.
        </div>

        {/* selector de familia */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {(Object.keys(FAMILIAS) as FamiliaSeg[]).map((f) => {
            const on = familia === f;
            return (
              <button
                key={f}
                onClick={() => setFamilia(f)}
                className="rounded-full border px-4 py-2 text-xs font-semibold transition"
                style={{
                  background: on ? `${FAMILIAS[f].color}22` : "transparent",
                  borderColor: on ? FAMILIAS[f].color : "rgba(255,255,255,0.14)",
                  color: on ? FAMILIAS[f].color : "#8fa9a1",
                }}
              >
                {FAMILIAS[f].label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* ranking de brechas */}
          <div className="card p-5">
            <div className="mb-1 text-sm font-bold">
              Brecha de confianza por {fam.label.toLowerCase()}
            </div>
            <p className="mb-4 text-[11px] text-muted">
              Distancia en puntos del ICF-S entre{" "}
              <span className="font-semibold text-fg">
                {fam.b === "hombres" ? "hombres" : fam.b === "rico60" ? "el 60% más rico" : "lo urbano"}
              </span>{" "}
              y{" "}
              <span className="font-semibold" style={{ color: fam.color }}>
                {fam.a === "mujeres" ? "mujeres" : fam.a === "pobre40" ? "el 40% más pobre" : "lo rural"}
              </span>
              . Barra a la derecha = el segundo grupo confía menos.
            </p>

            <div className="space-y-1.5">
              {ordenadas.map((b) => {
                const on = b.cc === pais;
                const neg = (b.brecha ?? 0) < 0;
                return (
                  <button
                    key={b.cc}
                    onClick={() => setPais(b.cc)}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <span
                      className={`w-[108px] shrink-0 truncate text-[11px] ${
                        on ? "font-bold text-fg" : "text-muted"
                      }`}
                    >
                      {b.flag} {b.nombre}
                    </span>
                    <span className="relative h-3.5 flex-1">
                      <span className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
                      <span
                        className="absolute inset-y-0 rounded-[3px]"
                        style={{
                          left: neg ? undefined : "50%",
                          right: neg ? "50%" : undefined,
                          width: `${(Math.abs(b.brecha ?? 0) / maxBrecha) * 50}%`,
                          background: neg ? "#1FC9A0" : fam.color,
                          opacity: on ? 1 : 0.72,
                        }}
                      />
                    </span>
                    <span
                      className="tabnum w-[52px] shrink-0 text-right text-[11px] font-bold"
                      style={{ color: neg ? "#1FC9A0" : fam.color }}
                    >
                      {(b.brecha ?? 0) > 0 ? "+" : ""}
                      {fmt(b.brecha)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 border-t border-white/8 pt-3 text-[11px] leading-relaxed text-muted">
              Nicaragua es el único país donde la brecha de género se invierte:
              sus mujeres puntúan por encima de sus hombres. En todos los demás,
              la desventaja apunta en la misma dirección.
            </p>
            {noMedibles.length > 0 && (
              <p className="mt-2 text-[11px] leading-relaxed text-amber/90">
                <b>Fuera del ranking:</b>{" "}
                {noMedibles.map((p) => `${p.flag} ${p.nombre}`).join(" · ")}. Del
                Findex 2024 solo tienen la serie de crédito desagregada — uno de
                cuatro indicadores. Puntuarlos con eso sería inventar la brecha.
              </p>
            )}
          </div>

          {/* ficha del país */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="text-lg font-extrabold">
                  {flagPais} {nombrePais}
                </div>
                <select
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className="rounded-full border border-white/14 bg-panel px-3 py-1 text-[11px] text-muted"
                  aria-label="Elegir país"
                >
                  {paises.map((p) => (
                    <option key={p.cc} value={p.cc}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* las tres brechas */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                {brechasPais.map((b) => (
                  <div key={b.familia} className="rounded-lg bg-white/[0.04] p-3">
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: FAMILIAS[b.familia].color }}
                    >
                      {FAMILIAS[b.familia].label}
                    </div>
                    <div className="tabnum text-xl font-extrabold leading-tight">
                      {b.brecha === null || b.brecha === undefined ? "n/d" : `${b.brecha > 0 ? "+" : ""}${fmt(b.brecha)}`}
                    </div>
                    <div className="tabnum text-[10px] text-muted">
                      {fmt(b.bajo ?? null)} → {fmt(b.alto ?? null)}
                    </div>
                  </div>
                ))}
              </div>

              {/* barras por segmento */}
              <div className="space-y-2">
                {delPais
                  .filter((f) => f.familia === familia)
                  .map((f) => (
                    <div key={f.seg}>
                      <div className="mb-1 flex items-baseline justify-between text-[11px]">
                        <span className="font-semibold text-fg/85">{f.segLabel}</span>
                        <span className="tabnum font-extrabold" style={{ color: fam.color }}>
                          {fmt(f.icfs)}
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-r-[4px] bg-white/6">
                        <div
                          className="h-full rounded-r-[4px]"
                          style={{
                            width: `${f.icfs ?? 0}%`,
                            background: fam.color,
                            transition: "width 400ms",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* detalle de indicadores */}
              <table className="mt-4 w-full border-t border-white/8 pt-3 text-left text-[11px]">
                <thead className="text-muted">
                  <tr>
                    <th className="py-1.5 font-semibold">Indicador</th>
                    {delPais
                      .filter((f) => f.familia === familia)
                      .map((f) => (
                        <th key={f.seg} className="py-1.5 text-right font-semibold">
                          {f.segLabel.split(" ")[0]}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {INDICADORES_SEG.map((ind) => (
                    <tr key={ind.campo as string} className="border-t border-white/6">
                      <td className="py-1.5">
                        <span className="text-fg/85">{ind.label}</span>
                        <div className="text-[9.5px] text-muted">{ind.unidad}</div>
                      </td>
                      {delPais
                        .filter((f) => f.familia === familia)
                        .map((f) => {
                          const v = f.fila[ind.campo];
                          return (
                            <td
                              key={f.seg}
                              className="tabnum py-1.5 text-right font-semibold"
                            >
                              {typeof v === "number" ? fmt(v) : "n/d"}
                            </td>
                          );
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-1 text-xs font-bold text-cyan">
                Lo que cambia cuando se mira por dentro
              </div>
              <p className="text-[11.5px] leading-relaxed text-muted">
                Colombia es el único país del panel con las{" "}
                <b className="text-fg">tres brechas por encima de 19 puntos</b> a
                la vez. Su población rural (15,7) y su 40% más pobre (16,1)
                puntúan por debajo de casi cualquier segmento de cualquier otro
                país de la región, mientras su 60% más rico (37,9) se parece al
                promedio regional. El problema de confianza colombiano no está
                repartido: tiene género, tiene ingreso y tiene territorio.
              </p>
            </div>
          </div>
        </div>

        {/* dimensiones usadas */}
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-muted">
          <span className="font-semibold text-fg/80">Dimensiones del ICF-S:</span>
          {DIMS_SEG.map((d) => (
            <span key={d.key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: d.color }}
              />
              {d.label} · {d.peso}%
            </span>
          ))}
          <span className="ml-auto">
            Normalización min–max sobre las 108 observaciones país×segmento
          </span>
        </div>
      </div>
    </section>
  );
}
