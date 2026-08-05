"use client";

import { useMemo, useRef, useState } from "react";
import { LATAM, PaisLatam } from "@/data/latam";
import { LATAM_PATHS, LATAM_VIEWBOX } from "@/data/mapaLatam";
import { DIMENSIONES, INDICADORES_ICF } from "@/data/confianza";
import { calcularICF, bandaICF, promedioICF } from "@/lib/confianza";

// -----------------------------------------------------------------------------
// Capas. Cada una declara su campo, dirección, unidad y familia de color.
// La rampa es secuencial de un solo tono (claro→oscuro invertido para fondo
// oscuro): la magnitud se lee por luminosidad, no por matiz.
// -----------------------------------------------------------------------------

type Familia = "pagos" | "confianza";

interface Capa {
  key: string;
  label: string;
  campo: keyof PaisLatam | "icf";
  unidad: string;
  mejorAlto: boolean;
  familia: Familia;
  nota: string;
}

const CAPAS: Capa[] = [
  {
    key: "merchantpay",
    label: "Pago a comercios",
    campo: "merchantpay",
    unidad: "% adultos",
    mejorAlto: true,
    familia: "pagos",
    nota: "Adultos que pagaron a un comercio por medios digitales (Findex merchant.pay, 2024).",
  },
  {
    key: "pagodigital",
    label: "Pago digital (cualquiera)",
    campo: "pagodigital",
    unidad: "% adultos",
    mejorAlto: true,
    familia: "pagos",
    nota: "Hizo o recibió algún pago digital. Compará con la capa anterior: la diferencia es la fuga entre recibir y gastar.",
  },
  {
    key: "efectivo",
    label: "Resistencia del efectivo",
    campo: "efectivo",
    unidad: "% adultos",
    mejorAlto: false,
    familia: "pagos",
    nota: "Adultos que NO usaron tarjeta ni celular en ninguna compra presencial del año. Menos es mejor.",
  },
  {
    key: "remesasPib",
    label: "Remesas / PIB",
    campo: "remesasPib",
    unidad: "% del PIB",
    mejorAlto: true,
    familia: "pagos",
    nota: "Peso de los pagos transfronterizos en la economía. No es 'bueno' ni 'malo': marca dónde el costo de cruzar la frontera pesa más.",
  },
  {
    key: "costoRemesa",
    label: "Costo de enviar US$200",
    campo: "costoRemesa",
    unidad: "% del monto",
    mejorAlto: false,
    familia: "pagos",
    nota: "Costo promedio de enviar remesas al país (RPW, 2023). La meta 10.c de los ODS es 3% o menos.",
  },
  {
    key: "icf",
    label: "ICF (índice completo)",
    campo: "icf",
    unidad: "0–100",
    mejorAlto: true,
    familia: "confianza",
    nota: "Índice de Confianza Financiera: cuatro dimensiones, ocho indicadores primarios.",
  },
  {
    key: "desconfianza",
    label: "Desconfianza declarada",
    campo: "desconfianza",
    unidad: "% no bancarizados",
    mejorAlto: false,
    familia: "confianza",
    nota: "De los adultos sin cuenta, cuántos dicen que la razón es no confiar en las instituciones financieras.",
  },
  {
    key: "formalidadCredito",
    label: "Formalidad del crédito",
    campo: "formalidadCredito",
    unidad: "% de deudores",
    mejorAlto: true,
    familia: "confianza",
    nota: "De cada 100 que se endeudaron, cuántos usaron el sistema formal en vez de familia, prestamista o 'gota a gota'.",
  },
  {
    key: "conversionEstafa",
    label: "Conversión de la estafa",
    campo: "conversionEstafa",
    unidad: "% de solicitudes",
    mejorAlto: false,
    familia: "confianza",
    nota: "De cada 100 solicitudes de dinero por teléfono o SMS, cuántas terminaron en un envío.",
  },
  {
    key: "inactiva",
    label: "Cuentas abandonadas",
    campo: "inactiva",
    unidad: "% adultos",
    mejorAlto: false,
    familia: "confianza",
    nota: "Cuentas sin movimiento en 12 meses: el rastro de la inclusión de papel.",
  },
];

// rampas secuenciales de un solo tono, ancladas al fondo #0A2C28
const RAMPAS: Record<Familia, [number[], number[]]> = {
  pagos: [
    [74, 42, 32],
    [255, 158, 114],
  ],
  confianza: [
    [15, 67, 60],
    [53, 224, 180],
  ],
};

function rampa(fam: Familia, t: number): string {
  const [a, b] = RAMPAS[fam];
  const k = Math.max(0, Math.min(1, t));
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const fmt = (v: number | null, dec = 1) =>
  v === null ? "n/d" : v.toFixed(dec).replace(".", ",");

export default function MapaLatam() {
  const [capaKey, setCapaKey] = useState("icf");
  const [hover, setHover] = useState<string | null>(null);
  const [sel, setSel] = useState<string>("COL");
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [tabla, setTabla] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);

  const capa = CAPAS.find((c) => c.key === capaKey)!;
  const filasICF = useMemo(() => calcularICF(), []);
  const promICF = useMemo(() => promedioICF(filasICF), [filasICF]);

  const valor = (cc: string): number | null => {
    if (capa.campo === "icf") return filasICF.find((f) => f.cc === cc)?.icf ?? null;
    const p = LATAM.find((x) => x.cc === cc);
    if (!p) return null;
    const v = p[capa.campo as keyof PaisLatam];
    return typeof v === "number" ? v : null;
  };

  const { min, max } = useMemo(() => {
    const vs = LATAM.map((p) => valor(p.cc)).filter((v): v is number => v !== null);
    return { min: Math.min(...vs), max: Math.max(...vs) };
  }, [capaKey, filasICF]);

  const fillDe = (cc: string) => {
    const v = valor(cc);
    if (v === null) return "url(#sinDato)";
    const t = max === min ? 1 : (v - min) / (max - min);
    return rampa(capa.familia, capa.mejorAlto ? t : 1 - t);
  };

  const activo = hover ?? sel;
  const pActivo = LATAM.find((p) => p.cc === activo) ?? null;
  const icfActivo = filasICF.find((f) => f.cc === activo) ?? null;

  const moverTip = (e: React.MouseEvent) => {
    const r = contRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const ordenados = useMemo(
    () =>
      [...LATAM]
        .map((p) => ({ p, v: valor(p.cc) }))
        .sort((a, b) => {
          if (a.v === null) return 1;
          if (b.v === null) return -1;
          return capa.mejorAlto ? b.v - a.v : a.v - b.v;
        }),
    [capaKey, filasICF]
  );

  return (
    <section id="mapa-latam" className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#E8825A" }}>
          Doble clic a América Latina
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          21 economías, dos preguntas: ¿cuánto se paga y cuánto se confía?
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          El índice principal compara seis países. Este panel abre el foco a{" "}
          <b className="font-semibold text-fg">21 economías de la región</b>{" "}
          usando solo series con cobertura regional completa: el Global Findex
          2025 y el Financial Access Survey del FMI. Elegí una capa; pasá el
          cursor o tocá un país.
        </p>

        {/* selector de capas, agrupado por familia */}
        <div className="mb-5 space-y-2">
          {(["pagos", "confianza"] as Familia[]).map((fam) => (
            <div key={fam} className="flex flex-wrap items-center gap-1.5">
              <span
                className="mr-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: fam === "pagos" ? "#E8825A" : "#1FC9A0" }}
              >
                {fam === "pagos" ? "Pagos" : "Confianza"}
              </span>
              {CAPAS.filter((c) => c.familia === fam).map((c) => {
                const on = capaKey === c.key;
                const col = fam === "pagos" ? "#E8825A" : "#1FC9A0";
                return (
                  <button
                    key={c.key}
                    onClick={() => setCapaKey(c.key)}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium transition"
                    style={{
                      background: on ? `${col}22` : "transparent",
                      borderColor: on ? col : "rgba(255,255,255,0.14)",
                      color: on ? col : "#8fa9a1",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
          {/* ---------------------------------------------------------- mapa */}
          <div ref={contRef} className="card relative overflow-hidden p-3">
            <svg
              viewBox={LATAM_VIEWBOX}
              className="h-full max-h-[620px] w-full"
              role="img"
              aria-label={`Mapa de América Latina y el Caribe coloreado por ${capa.label}`}
            >
              <defs>
                <pattern
                  id="sinDato"
                  width="6"
                  height="6"
                  patternTransform="rotate(45)"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="6" height="6" fill="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
                </pattern>
                <filter id="glowLatam" x="-25%" y="-25%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#eaf3ef" floodOpacity="0.4" />
                </filter>
              </defs>

              {LATAM_PATHS.map((p) => {
                const conDato = LATAM.some((x) => x.cc === p.cc);
                const on = activo === p.cc;
                return (
                  <path
                    key={p.cc}
                    d={p.d}
                    fill={conDato ? fillDe(p.cc) : "url(#sinDato)"}
                    stroke={on ? "#eaf3ef" : "rgba(10,44,40,0.85)"}
                    strokeWidth={on ? 1.6 : 0.7}
                    filter={on ? "url(#glowLatam)" : undefined}
                    className={conDato ? "cursor-pointer" : ""}
                    style={{ transition: "fill 400ms" }}
                    onMouseEnter={() => conDato && setHover(p.cc)}
                    onMouseMove={moverTip}
                    onMouseLeave={() => {
                      setHover(null);
                      setTip(null);
                    }}
                    onClick={() => conDato && setSel(p.cc)}
                  />
                );
              })}

              {/* etiqueta directa solo del país activo: evita el ruido de 26 rótulos */}
              {LATAM_PATHS.filter((p) => p.cc === activo).map((p) => {
                const v = valor(p.cc);
                return (
                  <g key={`lbl${p.cc}`} pointerEvents="none">
                    <text
                      x={p.cx}
                      y={p.cy - 4}
                      textAnchor="middle"
                      className="tabnum"
                      style={{ fontSize: 15, fontWeight: 800, fill: "#eaf3ef" }}
                    >
                      {v === null ? "n/d" : fmt(v, capa.key === "costoRemesa" ? 2 : 1)}
                    </text>
                    <text
                      x={p.cx}
                      y={p.cy + 9}
                      textAnchor="middle"
                      style={{ fontSize: 9, fontWeight: 600, fill: "rgba(234,243,239,0.65)" }}
                    >
                      {p.cc}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* leyenda de la rampa */}
            <div className="mt-1 flex items-center gap-3 px-2 pb-1">
              <span className="text-[10px] font-semibold text-muted">
                {capa.mejorAlto ? "menor" : "peor"}
              </span>
              <div
                className="h-2 flex-1 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${rampa(capa.familia, 0)}, ${rampa(
                    capa.familia,
                    0.5
                  )}, ${rampa(capa.familia, 1)})`,
                }}
              />
              <span className="text-[10px] font-semibold text-muted">
                {capa.mejorAlto ? "mayor" : "mejor"}
              </span>
              <span className="ml-2 flex items-center gap-1 text-[10px] text-muted">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm border border-white/20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 1.5px, transparent 1.5px 4px)",
                  }}
                />
                sin dato
              </span>
            </div>

            {tip && pActivo && (
              <div
                className="pointer-events-none absolute z-20 rounded-xl border border-white/12 bg-[#0a2c28]/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
                style={{
                  left: Math.min(tip.x + 12, 300),
                  top: Math.max(tip.y - 46, 4),
                }}
              >
                <div className="font-bold">
                  {pActivo.flag} {pActivo.nombre}
                </div>
                <div className="tabnum text-muted">
                  {capa.label}:{" "}
                  <b className="text-fg">
                    {fmt(valor(pActivo.cc), capa.key === "costoRemesa" ? 2 : 1)}
                  </b>{" "}
                  {capa.unidad}
                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------- panel */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <div className="text-lg font-extrabold">
                  {pActivo?.flag} {pActivo?.nombre ?? "—"}
                </div>
                {icfActivo?.icf !== null && icfActivo && (
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={{
                      background: `${bandaICF(icfActivo.icf!).color}22`,
                      color: bandaICF(icfActivo.icf!).color,
                    }}
                  >
                    {bandaICF(icfActivo.icf!).label}
                  </span>
                )}
              </div>
              <p className="mb-4 text-xs text-muted">{capa.nota}</p>

              {icfActivo && (
                <>
                  <div className="mb-3 flex items-end gap-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        ICF
                      </div>
                      <div className="tabnum text-3xl font-extrabold leading-none text-teal">
                        {icfActivo.icf === null ? "n/d" : fmt(icfActivo.icf)}
                      </div>
                    </div>
                    <div className="pb-1 text-xs text-muted">
                      promedio del panel medible{" "}
                      <b className="tabnum text-fg">{fmt(promICF)}</b> · cobertura
                      de datos{" "}
                      <b className="tabnum text-fg">
                        {Math.round(icfActivo.cobertura * INDICADORES_ICF.length)}/
                        {INDICADORES_ICF.length}
                      </b>
                    </div>
                  </div>

                  {!icfActivo.medible && (
                    <div className="mb-3 rounded-xl border border-amber/30 bg-amber/8 p-3 text-xs text-fg/85">
                      <b className="text-amber">No medible con datos comparables.</b>{" "}
                      Este país no fue encuestado en los módulos digitales del
                      Findex 2024 y/o no reporta al FAS del FMI. En vez de imputar
                      un valor, el índice lo deja fuera del ranking: el vacío es
                      el hallazgo.
                    </div>
                  )}

                  {/* dimensiones del ICF */}
                  <div className="space-y-2">
                    {DIMENSIONES.map((d) => {
                      const s = icfActivo.dims[d.key];
                      return (
                        <div key={d.key}>
                          <div className="mb-1 flex items-baseline justify-between text-[11px]">
                            <span className="font-semibold text-fg/85">
                              {d.nombre}
                            </span>
                            <span className="tabnum text-muted">
                              {s === null ? "sin dato" : fmt(s)}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/6">
                            {s !== null && (
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${s}%`,
                                  background: d.color,
                                  transition: "width 400ms",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {pActivo && (
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/8 pt-4 text-xs">
                  {[
                    ["Cuenta", pActivo.cuenta, "%"],
                    ["Pago a comercios", pActivo.merchantpay, "%"],
                    ["Formalidad del crédito", pActivo.formalidadCredito, "%"],
                    ["Crédito / 100 depósitos", pActivo.creditoDeposito, ""],
                    ["Desconfianza (no banc.)", pActivo.desconfianza, "%"],
                    ["Remesas / PIB", pActivo.remesasPib, "%"],
                  ].map(([l, v, u]) => (
                    <div key={l as string} className="flex justify-between gap-2">
                      <span className="text-muted">{l as string}</span>
                      <span className="tabnum font-semibold">
                        {fmt(v as number | null)}
                        {u as string}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ranking de la capa activa */}
            <div className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-bold">
                  Ranking · {capa.label}
                </div>
                <button
                  onClick={() => setTabla((t) => !t)}
                  className="rounded-full border border-white/14 px-2.5 py-1 text-[11px] font-semibold text-muted transition hover:text-fg"
                >
                  {tabla ? "ver barras" : "ver tabla"}
                </button>
              </div>

              {tabla ? (
                <div className="max-h-[300px] overflow-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-panel text-muted">
                      <tr>
                        <th className="py-1 font-semibold">País</th>
                        <th className="py-1 text-right font-semibold">
                          {capa.unidad}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenados.map(({ p, v }) => (
                        <tr key={p.cc} className="border-t border-white/6">
                          <td className="py-1">
                            {p.flag} {p.nombre}
                          </td>
                          <td className="tabnum py-1 text-right font-semibold">
                            {fmt(v, capa.key === "costoRemesa" ? 2 : 1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="max-h-[300px] space-y-1.5 overflow-auto pr-1">
                  {ordenados.map(({ p, v }) => {
                    const t =
                      v === null || max === min ? 0 : (v - min) / (max - min);
                    const on = p.cc === activo;
                    return (
                      <button
                        key={p.cc}
                        onClick={() => setSel(p.cc)}
                        onMouseEnter={() => setHover(p.cc)}
                        onMouseLeave={() => setHover(null)}
                        className="flex w-full items-center gap-2 text-left"
                      >
                        <span
                          className={`w-[112px] shrink-0 truncate text-[11px] ${
                            on ? "font-bold text-fg" : "text-muted"
                          }`}
                        >
                          {p.flag} {p.nombre}
                        </span>
                        <span className="h-3 flex-1 overflow-hidden rounded-r-[4px] bg-white/5">
                          <span
                            className="block h-full rounded-r-[4px]"
                            style={{
                              width: v === null ? "0%" : `${Math.max(2, t * 100)}%`,
                              background:
                                v === null
                                  ? "transparent"
                                  : rampa(
                                      capa.familia,
                                      capa.mejorAlto ? t : 1 - t
                                    ),
                              transition: "width 400ms",
                            }}
                          />
                        </span>
                        <span className="tabnum w-[54px] shrink-0 text-right text-[11px] font-semibold">
                          {fmt(v, capa.key === "costoRemesa" ? 2 : 1)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-4xl text-[11px] leading-relaxed text-muted">
          Fuentes: Global Findex 2025 (Banco Mundial, datos de encuesta 2024) ·
          IMF Financial Access Survey 2024 · Remittance Prices Worldwide 2023 ·
          balanza de pagos 2025. Las series marcadas como derivadas son
          aritmética explícita sobre esas fuentes, documentada en{" "}
          <a href="/metodologia" className="text-teal underline">
            metodología
          </a>
          . Cuba, Guyana, Surinam y Belice aparecen sin dato porque no están en
          el Findex 2025.
        </p>
      </div>
    </section>
  );
}
