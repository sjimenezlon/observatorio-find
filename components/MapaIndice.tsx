"use client";

import { useMemo, useRef, useState } from "react";
import { PAISES, PILARES, CC, PilarKey, SNAPSHOT_ANTERIOR } from "@/data/dataset";
import { MAPA_PAISES, MAPA_CONTEXTO, MAPA_VIEWBOX } from "@/data/mapa";
import { calcularIndice, banda } from "@/lib/index";

type Capa = "imiaf" | PilarKey;

const nombre = (c: CC) => PAISES.find((p) => p.code === c)!.nombre;
const flag = (c: CC) => PAISES.find((p) => p.code === c)!.flag;

export default function MapaIndice() {
  const [capa, setCapa] = useState<Capa>("imiaf");
  const [hover, setHover] = useState<CC | null>(null);
  const [sel, setSel] = useState<CC>("BR");
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const contRef = useRef<HTMLDivElement>(null);

  const moverTip = (e: React.MouseEvent) => {
    const r = contRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const filas = useMemo(() => calcularIndice(), []);
  const pilar = capa === "imiaf" ? null : PILARES.find((p) => p.key === capa)!;

  const score = (cc: CC): number | null => {
    const f = filas.find((x) => x.code === cc)!;
    return capa === "imiaf" ? f.indice : f.pilares[capa];
  };

  const fillDe = (cc: CC): { fill: string; opacity: number } => {
    const s = score(cc);
    if (s === null) return { fill: "#2c4a44", opacity: 0.6 };
    if (capa === "imiaf") return { fill: banda(s).color, opacity: 0.9 };
    return { fill: pilar!.color, opacity: 0.18 + 0.78 * (s / 100) };
  };

  const activo = hover ?? sel;
  const fSel = filas.find((f) => f.code === activo)!;
  const posSel = filas.findIndex((f) => f.code === activo) + 1;
  const bSel = banda(fSel.indice);
  const deltaSel =
    Math.round((fSel.indice - SNAPSHOT_ANTERIOR.scores[activo]) * 10) / 10;

  return (
    <section id="mapa" className="border-b border-white/8 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
          El mapa del índice
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          Seis países, una región en movimiento
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          Pasá el cursor o tocá un país para leer su puntaje; cambiá de capa
          para ver el índice completo o cada pilar por separado.
        </p>

        {/* selector de capa */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          <button
            onClick={() => setCapa("imiaf")}
            className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition"
            style={{
              background: capa === "imiaf" ? "rgba(31,201,160,0.18)" : "transparent",
              borderColor: capa === "imiaf" ? "#1FC9A0" : "rgba(255,255,255,0.14)",
              color: capa === "imiaf" ? "#1FC9A0" : "#8fa9a1",
            }}
          >
            IIIF (índice completo)
          </button>
          {PILARES.map((pl) => {
            const on = capa === pl.key;
            return (
              <button
                key={pl.key}
                onClick={() => setCapa(pl.key)}
                className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
                style={{
                  background: on ? `${pl.color}22` : "transparent",
                  borderColor: on ? pl.color : "rgba(255,255,255,0.14)",
                  color: on ? pl.color : "#8fa9a1",
                }}
              >
                {pl.corto}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* mapa */}
          <div ref={contRef} className="card relative overflow-hidden p-3">
            <svg
              viewBox={MAPA_VIEWBOX}
              className="h-full max-h-[560px] w-full"
              role="img"
              aria-label="Mapa de América Latina coloreado por puntaje"
            >
              <defs>
                <filter id="glowPais" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="4"
                    floodColor="#eaf3ef"
                    floodOpacity="0.35"
                  />
                </filter>
              </defs>
              {MAPA_CONTEXTO.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="rgba(255,255,255,0.045)"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth={0.8}
                />
              ))}
              {MAPA_PAISES.map((p) => {
                const { fill, opacity } = fillDe(p.cc);
                const on = activo === p.cc;
                return (
                  <path
                    key={p.cc}
                    d={p.d}
                    fill={fill}
                    fillOpacity={on ? Math.min(1, opacity + 0.15) : opacity}
                    stroke={on ? "#eaf3ef" : "rgba(10,44,40,0.9)"}
                    strokeWidth={on ? 1.8 : 0.9}
                    filter={on ? "url(#glowPais)" : undefined}
                    className="cursor-pointer"
                    style={{ transition: "fill 400ms, fill-opacity 400ms" }}
                    onMouseEnter={() => setHover(p.cc)}
                    onMouseMove={moverTip}
                    onMouseLeave={() => {
                      setHover(null);
                      setTip(null);
                    }}
                    onClick={() => setSel(p.cc)}
                  />
                );
              })}
              {MAPA_PAISES.map((p) => {
                const s = score(p.cc);
                return (
                  <g key={`l${p.cc}`} pointerEvents="none">
                    <text
                      x={p.cx}
                      y={p.cy - 4}
                      textAnchor="middle"
                      fontSize={15}
                      fontWeight={800}
                      fill="#eaf3ef"
                      style={{ paintOrder: "stroke", stroke: "rgba(10,44,40,0.75)", strokeWidth: 3 }}
                    >
                      {p.cc}
                    </text>
                    <text
                      x={p.cx}
                      y={p.cy + 13}
                      textAnchor="middle"
                      fontSize={13}
                      fontWeight={700}
                      fill="#eaf3ef"
                      style={{ paintOrder: "stroke", stroke: "rgba(10,44,40,0.75)", strokeWidth: 3 }}
                    >
                      {s === null ? "n/d" : Math.round(s)}
                    </text>
                  </g>
                );
              })}
            </svg>
            {/* tooltip que sigue el cursor */}
            {hover && tip && (
              <div
                className="pointer-events-none absolute z-10 rounded-xl border border-white/15 bg-[#0e3b36] px-3 py-2 shadow-xl"
                style={{
                  left: Math.min(tip.x + 14, (contRef.current?.clientWidth ?? 400) - 170),
                  top: Math.max(tip.y - 54, 8),
                }}
              >
                <div className="text-[13px] font-bold text-fg">
                  {flag(hover)} {nombre(hover)}
                </div>
                <div className="tabnum text-[12px] text-muted">
                  {capa === "imiaf" ? "IIIF" : pilar!.corto}:{" "}
                  <b
                    style={{
                      color:
                        capa === "imiaf"
                          ? banda(score(hover) ?? 0).color
                          : pilar!.color,
                    }}
                  >
                    {score(hover) ?? "n/d"}
                  </b>
                  {capa === "imiaf" && (
                    <span className="ml-1.5">
                      · {banda(score(hover) ?? 0).label}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-muted/70">clic para fijar →</div>
              </div>
            )}
            {/* leyenda */}
            <div className="absolute bottom-3 left-4 flex flex-wrap gap-3 text-[11px] text-muted">
              {capa === "imiaf" ? (
                [76, 56, 41, 10].map((t) => {
                  const b = banda(t);
                  return (
                    <span key={t} className="flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: b.color }}
                      />
                      {b.label}
                    </span>
                  );
                })
              ) : (
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-16 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${pilar!.color}30, ${pilar!.color})`,
                    }}
                  />
                  0 → 100 en {pilar!.corto}
                </span>
              )}
            </div>
          </div>

          {/* panel del país activo */}
          <div className="card flex flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xl font-extrabold text-fg">
                  {flag(activo)} {nombre(activo)}
                </div>
                <div className="mt-0.5 text-sm text-muted">
                  Puesto <b className="tabnum text-fg">#{posSel}</b> de 6 ·{" "}
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ background: `${bSel.color}22`, color: bSel.color }}
                  >
                    {bSel.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className="tabnum text-4xl font-extrabold tracking-tight"
                  style={{ color: bSel.color }}
                >
                  {fSel.indice}
                </div>
                <div className="text-[11px] text-muted">
                  IIIF
                  {deltaSel !== 0 && (
                    <span
                      className="tabnum ml-1 font-semibold"
                      style={{ color: deltaSel > 0 ? "#1FC9A0" : "#ff8fa3" }}
                    >
                      {deltaSel > 0 ? "▲" : "▼"}
                      {Math.abs(deltaSel)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {PILARES.map((pl) => {
                const s = fSel.pilares[pl.key];
                return (
                  <div key={pl.key}>
                    <div className="mb-1 flex justify-between text-[12px]">
                      <span className="text-fg/80">{pl.corto}</span>
                      <span className="tabnum text-muted">
                        {s === null ? "n/d" : s}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06]">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${s ?? 0}%`,
                          background: pl.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-5">
              <a
                href="#pais"
                className="inline-block rounded-full border border-teal/50 px-4 py-2 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                Ver ficha completa de {nombre(activo)} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
