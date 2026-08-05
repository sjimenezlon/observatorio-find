"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { PAISES, PILARES, INDICADORES, CC, SNAPSHOT_ANTERIOR } from "@/data/dataset";
import { calcularIndice, normalizarIndicador, banda } from "@/lib/index";

const COLORS: Record<CC, string> = {
  CO: "#1FC9A0",
  MX: "#9FCE2E",
  BR: "#6C5CD6",
  CL: "#5BD0E0",
  PE: "#E8B452",
  AR: "#FF8FA3",
};

export default function FichaPais() {
  const [cc, setCc] = useState<CC>("CO");
  const pais = PAISES.find((p) => p.code === cc)!;

  const filas = useMemo(() => calcularIndice(), []);
  const fila = filas.find((f) => f.code === cc)!;
  const pos = filas.findIndex((f) => f.code === cc) + 1;
  const b = banda(fila.indice);

  const anterior = SNAPSHOT_ANTERIOR.scores[cc];
  const delta = Math.round((fila.indice - anterior) * 10) / 10;

  // radar: país vs promedio regional por pilar
  const radarData = PILARES.map((pl) => {
    const propio = fila.pilares[pl.key];
    const todos = filas
      .map((f) => f.pilares[pl.key])
      .filter((v): v is number => v !== null);
    const prom =
      Math.round((todos.reduce((x, y) => x + y, 0) / todos.length) * 10) / 10;
    return { pilar: pl.corto, pais: propio ?? 0, promedio: prom };
  });

  // fortalezas y brechas sobre el normalizado
  const normalizados = useMemo(
    () =>
      INDICADORES.map((ind) => ({
        ind,
        score: normalizarIndicador(ind)[cc],
      })).filter((x): x is { ind: (typeof INDICADORES)[number]; score: number } =>
        x.score !== null
      ),
    [cc]
  );
  const ordenados = [...normalizados].sort((x, y) => y.score - x.score);
  const fortalezas = ordenados.slice(0, 3);
  const brechas = ordenados.slice(-3).reverse();

  return (
    <section id="pais">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
        Ficha país
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
        El perfil completo, país por país
      </h2>
      <p className="mt-2 mb-7 max-w-3xl text-[15px] text-muted">
        Todo lo que el observatorio sabe de un país en una sola vista: índice,
        pilares contra el promedio regional, fortalezas, brechas y cada
        indicador con su fuente.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {PAISES.map((p) => {
          const on = p.code === cc;
          return (
            <button
              key={p.code}
              onClick={() => setCc(p.code)}
              className="rounded-full border px-3.5 py-1.5 text-sm font-medium transition"
              style={{
                background: on ? `${COLORS[p.code]}22` : "transparent",
                borderColor: on ? COLORS[p.code] : "rgba(255,255,255,0.14)",
                color: on ? COLORS[p.code] : "#8fa9a1",
              }}
            >
              {p.flag} {p.nombre}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
        {/* resumen + radar */}
        <div className="card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-2xl font-extrabold text-fg">
                {pais.flag} {pais.nombre}
              </div>
              <div className="mt-1 text-sm text-muted">
                Puesto <b className="tabnum text-fg">#{pos}</b> de 6 ·{" "}
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{ background: `${b.color}22`, color: b.color }}
                >
                  {b.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div
                className="tabnum text-5xl font-extrabold tracking-tight"
                style={{ color: b.color }}
              >
                {fila.indice}
              </div>
              <div className="text-xs text-muted">
                IMIAF / 100
                {delta !== 0 && (
                  <span
                    className="tabnum ml-1.5 font-semibold"
                    style={{ color: delta > 0 ? "#1FC9A0" : "#ff8fa3" }}
                  >
                    {delta > 0 ? "▲" : "▼"}
                    {Math.abs(delta)} vs {SNAPSHOT_ANTERIOR.fecha}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.12)" />
                <PolarAngleAxis
                  dataKey="pilar"
                  tick={{ fill: "#eaf3ef", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "#8fa9a1", fontSize: 9 }}
                  axisLine={false}
                />
                <Radar
                  name="Promedio regional"
                  dataKey="promedio"
                  stroke="#8fa9a1"
                  fill="#8fa9a1"
                  fillOpacity={0.08}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
                <Radar
                  name={pais.nombre}
                  dataKey="pais"
                  stroke={COLORS[cc]}
                  fill={COLORS[cc]}
                  fillOpacity={0.18}
                  strokeWidth={2.5}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0e3b36",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "#eaf3ef",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[11px] text-muted">
            <span style={{ color: COLORS[cc] }}>—</span> {pais.nombre} ·{" "}
            <span className="text-muted">- -</span> promedio de los 6 países
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-teal">
                Fortalezas
              </div>
              <div className="space-y-1.5">
                {fortalezas.map(({ ind, score }) => (
                  <div key={ind.key} className="text-[13px] text-fg/85">
                    <span className="tabnum font-bold text-teal">
                      {Math.round(score)}
                    </span>{" "}
                    · {ind.label}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-amber">
                Brechas
              </div>
              <div className="space-y-1.5">
                {brechas.map(({ ind, score }) => (
                  <div key={ind.key} className="text-[13px] text-fg/85">
                    <span className="tabnum font-bold text-amber">
                      {Math.round(score)}
                    </span>{" "}
                    · {ind.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* todos los indicadores */}
        <div className="card p-6">
          <h3 className="mb-4 font-semibold text-fg">
            Los {INDICADORES.length} indicadores de {pais.nombre}
          </h3>
          <div className="space-y-4">
            {PILARES.map((pl) => (
              <div key={pl.key}>
                <div
                  className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: pl.color }}
                >
                  {pl.corto}
                </div>
                <div className="space-y-2">
                  {INDICADORES.filter((i) => i.pilar === pl.key).map((ind) => {
                    const v = ind.valores[cc];
                    const norm = normalizarIndicador(ind)[cc];
                    const ov = ind.overrides?.[cc];
                    return (
                      <div
                        key={ind.key}
                        className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2"
                      >
                        <div className="flex items-baseline justify-between gap-3 text-[13px]">
                          <span className="text-fg/85">{ind.label}</span>
                          <span className="tabnum shrink-0 font-bold text-fg">
                            {v === null
                              ? "n/d"
                              : `${
                                  Math.abs(v) >= 1000
                                    ? v.toLocaleString("es-CO")
                                    : v
                                } ${ind.unidad}`}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06]">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${norm ?? 0}%`,
                              background: pl.color,
                              opacity: norm === null ? 0 : 0.9,
                            }}
                          />
                        </div>
                        <div className="mt-1 flex items-baseline justify-between gap-2 text-[10px] text-muted">
                          <span>
                            {ov?.fuente ?? ind.fuente} · {ov?.anio ?? ind.anio}
                          </span>
                          {norm !== null && (
                            <span className="tabnum shrink-0">
                              {Math.round(norm)} / 100 normalizado
                            </span>
                          )}
                        </div>
                        {ov?.nota && (
                          <div className="mt-1 text-[11px] leading-relaxed text-muted">
                            {ov.nota}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
