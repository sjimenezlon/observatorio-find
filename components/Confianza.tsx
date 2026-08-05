"use client";

import { useMemo, useState } from "react";
import { LATAM } from "@/data/latam";
import { DIMENSIONES, DimKey, INDICADORES_ICF } from "@/data/confianza";
import {
  calcularICF,
  bandaICF,
  promedioICF,
  PESOS_ICF_DEFAULT,
  PesosICF,
} from "@/lib/confianza";
import { calcularIndice } from "@/lib/index";
import { PAISES, CC } from "@/data/dataset";

const fmt = (v: number | null, d = 1) =>
  v === null ? "n/d" : v.toFixed(d).replace(".", ",");

const ISO3: Record<CC, string> = {
  CO: "COL",
  MX: "MEX",
  BR: "BRA",
  CL: "CHL",
  PE: "PER",
  AR: "ARG",
};

export default function Confianza() {
  const [pesos, setPesos] = useState<PesosICF>({ ...PESOS_ICF_DEFAULT });
  const [sel, setSel] = useState<string>("COL");

  const filas = useMemo(() => calcularICF(pesos), [pesos]);
  const prom = useMemo(() => promedioICF(filas), [filas]);
  const medibles = filas.filter((f) => f.medible);
  const noMedibles = filas.filter((f) => !f.medible);
  const sumaPesos = DIMENSIONES.reduce((a, d) => a + pesos[d.key], 0) || 1;
  const porDefecto = DIMENSIONES.every((d) => pesos[d.key] === PESOS_ICF_DEFAULT[d.key]);

  // cruce madurez × confianza para los seis del índice principal
  const imiaf = useMemo(() => calcularIndice(), []);
  const cruce = PAISES.map((p) => {
    const f = filas.find((x) => x.cc === ISO3[p.code]);
    return {
      code: p.code,
      iso: ISO3[p.code],
      nombre: p.nombre,
      flag: p.flag,
      x: imiaf.find((r) => r.code === p.code)!.indice,
      y: f?.icf ?? null,
    };
  });

  const selFila = filas.find((f) => f.cc === sel);
  const selPais = LATAM.find((p) => p.cc === sel);

  return (
    <section id="confianza" className="border-b border-white/8 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
          Índice de Confianza Financiera · ICF
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          La confianza no se declara: se revela
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          No existe una medición mundial comparable de confianza en los servicios
          financieros. Las encuestas de reputación cubren 28 países y ninguno
          andino; la penetración bancaria mide cobertura, no confianza —{" "}
          <b className="font-semibold text-fg">
            tener una cuenta puede ser un requisito para cobrar el sueldo
          </b>
          . El ICF la infiere del comportamiento: cuánto dinero deja la gente
          adentro, si vuelve a usar el sistema, si acude a él cuando necesita
          crédito y si el sistema le devuelve trato justo.
        </p>

        {/* ------------------------------------------------ las 4 dimensiones */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DIMENSIONES.map((d) => (
            <div
              key={d.key}
              className="card p-4"
              style={{ borderTop: `2px solid ${d.color}` }}
            >
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-sm font-bold" style={{ color: d.color }}>
                  {d.nombre}
                </span>
                <span className="tabnum text-[11px] font-semibold text-muted">
                  {Math.round((pesos[d.key] / sumaPesos) * 100)}%
                </span>
              </div>
              <div className="mb-2 text-[13px] font-medium text-fg/90">
                {d.pregunta}
              </div>
              <p className="text-[11px] leading-relaxed text-muted">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* -------------------------------------------------------- controles */}
        <div className="card mb-6 p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-bold">
              Ponderá las dimensiones y mirá qué se mueve
            </div>
            <button
              onClick={() => setPesos({ ...PESOS_ICF_DEFAULT })}
              disabled={porDefecto}
              className="rounded-full border border-white/14 px-3 py-1 text-[11px] font-semibold text-muted transition enabled:hover:text-fg disabled:opacity-40"
            >
              restablecer
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIMENSIONES.map((d) => (
              <div key={d.key}>
                <div className="mb-1 flex items-baseline justify-between text-[11px]">
                  <span className="font-semibold" style={{ color: d.color }}>
                    {d.corto}
                  </span>
                  <span className="tabnum text-muted">{pesos[d.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={pesos[d.key]}
                  onChange={(e) =>
                    setPesos((p) => ({ ...p, [d.key]: Number(e.target.value) }))
                  }
                  className="w-full"
                  aria-label={`Peso de ${d.nombre}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* ------------------------------------------------------- ranking */}
          <div className="card p-5">
            <div className="mb-1 text-sm font-bold">
              Ranking del ICF · {medibles.length} economías medibles
            </div>
            <p className="mb-4 text-[11px] text-muted">
              Cada barra se compone de las cuatro dimensiones según su peso.
              Promedio del panel:{" "}
              <b className="tabnum text-fg">{fmt(prom)}</b>.
            </p>

            <div className="space-y-2">
              {medibles.map((f, i) => {
                const on = f.cc === sel;
                return (
                  <button
                    key={f.cc}
                    onClick={() => setSel(f.cc)}
                    className="block w-full text-left"
                  >
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="tabnum w-5 shrink-0 text-[11px] font-bold text-muted">
                        {i + 1}
                      </span>
                      <span
                        className={`flex-1 truncate text-[12px] ${
                          on ? "font-bold text-fg" : "text-fg/80"
                        }`}
                      >
                        {f.flag} {f.nombre}
                      </span>
                      <span
                        className="tabnum text-[12px] font-extrabold"
                        style={{ color: bandaICF(f.icf!).color }}
                      >
                        {fmt(f.icf)}
                      </span>
                    </div>
                    <div className="ml-7 flex h-3.5 gap-[2px] overflow-hidden rounded-r-[4px]">
                      {DIMENSIONES.map((d) => {
                        const s = f.dims[d.key];
                        if (s === null) return null;
                        const aporte = (s * pesos[d.key]) / sumaPesos;
                        return (
                          <span
                            key={d.key}
                            title={`${d.nombre}: ${fmt(s)}`}
                            style={{
                              width: `${aporte}%`,
                              background: d.color,
                              opacity: on ? 1 : 0.72,
                              transition: "width 400ms",
                            }}
                          />
                        );
                      })}
                      <span className="flex-1 bg-white/5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* leyenda */}
            <div className="mt-4 flex flex-wrap gap-3 border-t border-white/8 pt-3">
              {DIMENSIONES.map((d) => (
                <span key={d.key} className="flex items-center gap-1.5 text-[11px] text-muted">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ background: d.color }}
                  />
                  {d.corto}
                </span>
              ))}
            </div>

            {noMedibles.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber/25 bg-amber/8 p-3">
                <div className="mb-1 text-[11px] font-bold text-amber">
                  Sin datos suficientes para puntuar ({noMedibles.length})
                </div>
                <p className="text-[11px] leading-relaxed text-fg/80">
                  {noMedibles.map((f) => `${f.flag} ${f.nombre}`).join(" · ")}.
                  No fueron encuestados en los módulos digitales del Findex 2024
                  y/o no reportan al FAS del FMI. Imputarles un valor sería
                  inventar el dato: el vacío es el hallazgo, y define la agenda
                  de medición.
                </p>
              </div>
            )}
          </div>

          {/* -------------------------------------- ficha + cruce de índices */}
          <div className="space-y-4">
            {/* cruce madurez × confianza */}
            <div className="card p-5">
              <div className="mb-1 text-sm font-bold">
                Madurez ≠ confianza
              </div>
              <p className="mb-3 text-[11px] text-muted">
                Eje horizontal: IMIAF (madurez del sistema). Eje vertical: ICF
                (confianza). Los seis países del índice principal.
              </p>
              <CruceScatter datos={cruce} />
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                Colombia es el caso más nítido de la región:{" "}
                <b className="text-fg">
                  regulación ambiciosa y confianza en el último lugar
                </b>
                . Chile no aparece en el eje vertical porque no es medible con
                datos comparables.
              </p>
            </div>

            {/* ficha del país seleccionado */}
            {selFila && selPais && (
              <div className="card p-5">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <div className="text-lg font-extrabold">
                    {selFila.flag} {selFila.nombre}
                  </div>
                  {selFila.icf !== null && (
                    <span
                      className="tabnum rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        background: `${bandaICF(selFila.icf).color}22`,
                        color: bandaICF(selFila.icf).color,
                      }}
                    >
                      ICF {fmt(selFila.icf)}
                    </span>
                  )}
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead className="text-muted">
                    <tr>
                      <th className="pb-1 font-semibold">Indicador</th>
                      <th className="pb-1 text-right font-semibold">Valor</th>
                      <th className="pb-1 text-right font-semibold">
                        Normalizado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {INDICADORES_ICF.map((ind) => {
                      const dim = DIMENSIONES.find((d) => d.key === ind.dim)!;
                      const bruto = selPais[ind.campo];
                      return (
                        <tr key={ind.key} className="border-t border-white/6">
                          <td className="py-1.5">
                            <span
                              className="mr-1.5 inline-block h-2 w-2 rounded-sm align-middle"
                              style={{ background: dim.color }}
                            />
                            <span className="align-middle">{ind.label}</span>
                            {ind.derivado && (
                              <span className="ml-1 align-middle text-[9px] font-bold uppercase text-amber">
                                derivado
                              </span>
                            )}
                          </td>
                          <td className="tabnum py-1.5 text-right font-semibold">
                            {typeof bruto === "number" ? fmt(bruto) : "n/d"}
                          </td>
                          <td className="tabnum py-1.5 text-right text-muted">
                            {ind.mejorAlto ? "↑" : "↓"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="mt-3 text-[10px] leading-relaxed text-muted">
                  ↑ más alto es mejor para la confianza · ↓ más bajo es mejor.
                  Las unidades de cada indicador están en{" "}
                  <a href="/metodologia#icf" className="text-teal underline">
                    metodología
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------- cautelas */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-1 text-xs font-bold text-cyan">
              Lo que un índice de comportamiento no puede distinguir
            </div>
            <p className="text-[11px] leading-relaxed text-muted">
              Venezuela queda en la mitad de la tabla con el uso digital más alto
              de la región (71,6% paga a comercios). No es confianza: es
              escasez de efectivo. Cuando el billete desaparece, el pago digital
              deja de ser una elección — y la confianza revelada deja de
              revelar confianza. Se señala en vez de corregirse a mano.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-1 text-xs font-bold text-cyan">
              Por qué el ICF no se compara con el mundo
            </div>
            <p className="text-[11px] leading-relaxed text-muted">
              La normalización es min–max sobre las 21 economías del panel: el
              ICF dice quién confía <b className="text-fg">más que sus pares</b>,
              no si el nivel es bueno en términos absolutos. Un ICF de 70 en
              América Latina no equivale a un 70 europeo, y el índice no
              pretende que sí.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Scatter madurez × confianza. SVG propio: seis puntos, etiquetas directas y
// cuadrantes con lectura. No hay doble eje: son dos índices en la misma escala
// 0–100, cada uno en su dimensión.
// -----------------------------------------------------------------------------

interface Punto {
  code: string;
  nombre: string;
  flag: string;
  x: number;
  y: number | null;
}

function CruceScatter({ datos }: { datos: Punto[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const W = 420;
  const H = 300;
  const M = { t: 14, r: 16, b: 34, l: 40 };
  const px = (v: number) => M.l + (v / 100) * (W - M.l - M.r);
  const py = (v: number) => H - M.b - (v / 100) * (H - M.t - M.b);

  const conY = datos.filter((d) => d.y !== null);
  const sinY = datos.filter((d) => d.y === null);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label="Dispersión de madurez del sistema financiero contra confianza financiera">
        {/* cuadrantes */}
        <rect x={px(50)} y={py(100)} width={px(100) - px(50)} height={py(50) - py(100)}
          fill="rgba(31,201,160,0.05)" />
        <rect x={M.l} y={py(50)} width={px(50) - M.l} height={py(0) - py(50)}
          fill="rgba(255,122,158,0.05)" />
        <line x1={px(50)} y1={M.t} x2={px(50)} y2={H - M.b}
          stroke="rgba(255,255,255,0.09)" strokeDasharray="3 3" />
        <line x1={M.l} y1={py(50)} x2={W - M.r} y2={py(50)}
          stroke="rgba(255,255,255,0.09)" strokeDasharray="3 3" />

        {/* ejes */}
        <line x1={M.l} y1={H - M.b} x2={W - M.r} y2={H - M.b} stroke="rgba(255,255,255,0.16)" />
        <line x1={M.l} y1={M.t} x2={M.l} y2={H - M.b} stroke="rgba(255,255,255,0.16)" />
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={`x${t}`}>
            <text x={px(t)} y={H - M.b + 14} textAnchor="middle"
              style={{ fontSize: 9, fill: "#8fa9a1" }}>{t}</text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map((t) => (
          <text key={`y${t}`} x={M.l - 6} y={py(t) + 3} textAnchor="end"
            style={{ fontSize: 9, fill: "#8fa9a1" }}>{t}</text>
        ))}
        <text x={(W + M.l) / 2} y={H - 2} textAnchor="middle"
          style={{ fontSize: 9.5, fill: "#8fa9a1", fontWeight: 600 }}>
          IMIAF · madurez →
        </text>
        <text x={11} y={(H - M.b + M.t) / 2} textAnchor="middle"
          transform={`rotate(-90 11 ${(H - M.b + M.t) / 2})`}
          style={{ fontSize: 9.5, fill: "#8fa9a1", fontWeight: 600 }}>
          ICF · confianza →
        </text>

        {/* puntos */}
        {conY.map((d) => {
          const on = hover === d.code;
          return (
            <g key={d.code}
              onMouseEnter={() => setHover(d.code)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer">
              <circle cx={px(d.x)} cy={py(d.y!)} r={on ? 9 : 6.5}
                fill="#1FC9A0" fillOpacity={0.85}
                stroke="#0a2c28" strokeWidth={2} />
              <text x={px(d.x)} y={py(d.y!) - 12} textAnchor="middle"
                style={{ fontSize: 10, fontWeight: 700, fill: "#eaf3ef" }}>
                {d.code}
              </text>
            </g>
          );
        })}
        {/* países sin ICF: marcador abierto sobre el eje x */}
        {sinY.map((d) => (
          <g key={d.code}>
            <circle cx={px(d.x)} cy={H - M.b} r={5.5} fill="none"
              stroke="#E8B452" strokeWidth={1.8} strokeDasharray="2.5 2" />
            <text x={px(d.x)} y={H - M.b - 10} textAnchor="middle"
              style={{ fontSize: 9.5, fontWeight: 700, fill: "#E8B452" }}>
              {d.code} n/d
            </text>
          </g>
        ))}
      </svg>

      {hover && (
        <div className="pointer-events-none absolute right-2 top-2 rounded-lg border border-white/12 bg-[#0a2c28]/95 px-2.5 py-1.5 text-[11px] shadow-lg">
          {(() => {
            const d = datos.find((x) => x.code === hover)!;
            return (
              <>
                <div className="font-bold">
                  {d.flag} {d.nombre}
                </div>
                <div className="tabnum text-muted">
                  IMIAF <b className="text-fg">{fmt(d.x)}</b> · ICF{" "}
                  <b className="text-fg">{fmt(d.y)}</b>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
