"use client";

import { useMemo, useState } from "react";
import {
  TENDENCIAS,
  EJES_TENDENCIA,
  TIPOS_TENDENCIA,
} from "@/data/frontera";

const HORIZONTES = ["Ahora", "Siguiente", "Después"];

export default function TendenciasMapa() {
  const [eje, setEje] = useState<string | null>(null);
  const [hz, setHz] = useState<string | null>(null);
  const [sel, setSel] = useState<string | null>(null);

  const visibles = useMemo(
    () =>
      TENDENCIAS.map((t, i) => ({ ...t, n0: i + 1 })).filter(
        (t) => (!eje || t.eje === eje) && (!hz || t.horizonte === hz)
      ),
    [eje, hz]
  );

  const activo = visibles.find((t) => t.nombre === sel) ?? null;

  const W = 640;
  const H = 420;
  const M = { t: 18, r: 20, b: 40, l: 46 };
  const px = (v: number) => M.l + (v / 100) * (W - M.l - M.r);
  const py = (v: number) => H - M.b - (v / 100) * (H - M.t - M.b);
  const r = (m: number) => 4 + Math.sqrt(m) * 1.25;

  return (
    <section id="tendencias" className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#E8825A" }}>
          Mapa prospectivo · hacia dónde van las fintechs 2026–2030
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          {TENDENCIAS.length} tendencias, ordenadas por adopción e impacto
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          La tesis: las fintechs pasan de competir por{" "}
          <i>ser digitales</i> a competir por{" "}
          <b className="font-semibold text-fg">escala rentable</b> y por{" "}
          <b className="font-semibold text-fg">colaborar</b> con los bancos. Tres
          motores lo ordenan: dinero programable, IA agéntica y distribución
          embebida. El posicionamiento de cada punto es interpretación del autor a
          partir de las fuentes citadas.
        </p>

        {/* filtros */}
        <div className="mb-5 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-[62px] shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              Criterio
            </span>
            {Object.entries(EJES_TENDENCIA).map(([k, v]) => {
              const on = eje === k;
              return (
                <button
                  key={k}
                  onClick={() => setEje(on ? null : k)}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition"
                  style={{
                    background: on ? `${v.color}22` : "transparent",
                    borderColor: on ? v.color : "rgba(255,255,255,0.12)",
                    color: on ? v.color : "#8fa9a1",
                  }}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-[62px] shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              Horizonte
            </span>
            {HORIZONTES.map((h) => {
              const on = hz === h;
              return (
                <button
                  key={h}
                  onClick={() => setHz(on ? null : h)}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition"
                  style={{
                    background: on ? "rgba(31,201,160,0.18)" : "transparent",
                    borderColor: on ? "#1FC9A0" : "rgba(255,255,255,0.12)",
                    color: on ? "#1FC9A0" : "#8fa9a1",
                  }}
                >
                  {h}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] items-start">
          {/* scatter */}
          <div className="card p-4">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label="Mapa de tendencias fintech por adopción e impacto"
            >
              {/* cuadrantes */}
              <rect x={px(50)} y={py(100)} width={px(100) - px(50)} height={py(50) - py(100)} fill="rgba(31,201,160,0.05)" />
              <line x1={px(50)} y1={M.t} x2={px(50)} y2={H - M.b} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1={M.l} y1={py(50)} x2={W - M.r} y2={py(50)} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1={M.l} y1={H - M.b} x2={W - M.r} y2={H - M.b} stroke="rgba(255,255,255,0.16)" />
              <line x1={M.l} y1={M.t} x2={M.l} y2={H - M.b} stroke="rgba(255,255,255,0.16)" />

              {[0, 25, 50, 75, 100].map((t) => (
                <text key={`x${t}`} x={px(t)} y={H - M.b + 14} textAnchor="middle" style={{ fontSize: 9, fill: "#8fa9a1" }}>
                  {t}
                </text>
              ))}
              {[0, 25, 50, 75, 100].map((t) => (
                <text key={`y${t}`} x={M.l - 6} y={py(t) + 3} textAnchor="end" style={{ fontSize: 9, fill: "#8fa9a1" }}>
                  {t}
                </text>
              ))}
              <text x={(W + M.l) / 2} y={H - 6} textAnchor="middle" style={{ fontSize: 10, fill: "#8fa9a1", fontWeight: 600 }}>
                adopción / madurez · emergente → consolidado
              </text>
              <text x={13} y={(H - M.b + M.t) / 2} textAnchor="middle" transform={`rotate(-90 13 ${(H - M.b + M.t) / 2})`} style={{ fontSize: 10, fill: "#8fa9a1", fontWeight: 600 }}>
                impacto transformacional →
              </text>

              {visibles.map((t) => {
                const c = EJES_TENDENCIA[t.eje]?.color ?? "#8fa9a1";
                const on = sel === t.nombre;
                return (
                  <g
                    key={t.nombre}
                    className="cursor-pointer"
                    onMouseEnter={() => setSel(t.nombre)}
                    onClick={() => setSel(t.nombre)}
                  >
                    <circle
                      cx={px(t.adopcion)}
                      cy={py(t.impacto)}
                      r={r(t.magnitud)}
                      fill={c}
                      fillOpacity={on ? 0.9 : 0.5}
                      stroke={on ? "#eaf3ef" : "#0a2c28"}
                      strokeWidth={on ? 2 : 1.5}
                    />
                    <text
                      x={px(t.adopcion)}
                      y={py(t.impacto) + 3}
                      textAnchor="middle"
                      pointerEvents="none"
                      style={{ fontSize: 8.5, fontWeight: 800, fill: "#0a2c28" }}
                    >
                      {t.n0}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/8 pt-3">
              {Object.entries(EJES_TENDENCIA).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1.5 text-[10.5px] text-muted">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: v.color }} />
                  {v.label}
                </span>
              ))}
              <span className="ml-auto text-[10px] text-muted">
                tamaño = magnitud de reconfiguración
              </span>
            </div>
          </div>

          {/* panel + leyenda numerada */}
          <div className="space-y-4">
            {activo ? (
              <div className="card p-5" style={{ borderTop: `2px solid ${EJES_TENDENCIA[activo.eje]?.color}` }}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="tabnum flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold text-[#0a2c28]"
                    style={{ background: EJES_TENDENCIA[activo.eje]?.color }}
                  >
                    {activo.n0}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: EJES_TENDENCIA[activo.eje]?.color }}>
                    {EJES_TENDENCIA[activo.eje]?.label}
                  </span>
                  <span className="rounded-full bg-white/6 px-2 py-0.5 text-[9px] font-semibold text-muted">
                    {activo.horizonte}
                  </span>
                  <span className="rounded-full border border-white/12 px-2 py-0.5 text-[9px] text-muted">
                    {TIPOS_TENDENCIA[activo.tipo]?.label}
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-extrabold text-fg">{activo.nombre}</h3>
                <p className="text-[12.5px] leading-relaxed text-muted">{activo.detalle}</p>
                <div className="mt-3 flex gap-4 border-t border-white/8 pt-3 text-[11px] text-muted">
                  <span>
                    Adopción <b className="tabnum text-fg">{activo.adopcion}</b>
                  </span>
                  <span>
                    Impacto <b className="tabnum text-fg">{activo.impacto}</b>
                  </span>
                </div>
              </div>
            ) : (
              <div className="card p-5 text-[12px] text-muted">
                Pasá el cursor por un punto del mapa —o tocá un número de la
                lista— para leer la tendencia, su horizonte y si es dato,
                interpretación o proyección.
              </div>
            )}

            <div className="card max-h-[330px] overflow-auto p-4">
              <div className="mb-2 text-[11px] font-bold text-fg">
                Las {visibles.length} tendencias
              </div>
              <div className="space-y-0.5">
                {visibles.map((t) => (
                  <button
                    key={t.nombre}
                    onMouseEnter={() => setSel(t.nombre)}
                    onClick={() => setSel(t.nombre)}
                    className={`flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-[11px] transition ${
                      sel === t.nombre ? "bg-white/8 text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span
                      className="tabnum flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8.5px] font-extrabold text-[#0a2c28]"
                      style={{ background: EJES_TENDENCIA[t.eje]?.color }}
                    >
                      {t.n0}
                    </span>
                    <span className="truncate">{t.nombre}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-muted">
          {Object.entries(TIPOS_TENDENCIA).map(([k, v]) => (
            <span key={k}>
              <b className="text-fg/80">{v.label}</b> — {v.desc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
