"use client";

import { useMemo, useState } from "react";
import { PAISES, PILARES, INDICADORES, CC } from "@/data/dataset";
import {
  aplicarEscenario,
  calcularIndice,
  banda,
  Escenario,
  Pesos,
  PESOS_DEFAULT,
} from "@/lib/index";

const COLORS: Record<CC, string> = {
  CO: "#1FC9A0",
  MX: "#9FCE2E",
  BR: "#6C5CD6",
  CL: "#5BD0E0",
  PE: "#E8B452",
  AR: "#FF8FA3",
};

const nombre = (c: CC) => PAISES.find((p) => p.code === c)!.nombre;
const flag = (c: CC) => PAISES.find((p) => p.code === c)!.flag;

// Rango razonable del slider según la unidad del indicador.
function rangoSlider(indKey: string): { lo: number; hi: number; step: number } {
  const ind = INDICADORES.find((i) => i.key === indKey)!;
  const vals = PAISES.map((p) => ind.valores[p.code]).filter(
    (v): v is number => v !== null
  );
  const max = Math.max(...vals);
  if (ind.unidad === "%" || ind.unidad === "0–100")
    return { lo: 0, hi: 100, step: 1 };
  if (ind.unidad === "pp")
    return { lo: 0, hi: Math.ceil(max * 1.5), step: 0.1 };
  if (ind.unidad === "ranking") return { lo: 1, hi: 30, step: 1 };
  if (ind.unidad === "0–10") return { lo: 0, hi: 10, step: 0.01 };
  const hi = Math.ceil((max * 1.3) / 10) * 10;
  return { lo: 0, hi, step: hi > 500 ? 10 : 1 };
}

export default function Simulador({ pesos }: { pesos: Pesos }) {
  const [pais, setPais] = useState<CC>("CO");
  const [indKey, setIndKey] = useState<string>("credito");
  const [escenario, setEscenario] = useState<Escenario>({});

  const ind = INDICADORES.find((i) => i.key === indKey)!;
  const { lo, hi, step } = rangoSlider(indKey);
  const valorReal = ind.valores[pais];
  const valorEscenario = escenario[indKey]?.[pais];
  const valorSlider =
    valorEscenario ?? valorReal ?? Math.round(((lo + hi) / 2) * 10) / 10;

  const tweaks = useMemo(
    () =>
      Object.entries(escenario).flatMap(([k, porPais]) =>
        Object.entries(porPais ?? {}).map(([cc, v]) => ({
          indKey: k,
          cc: cc as CC,
          valor: v as number,
        }))
      ),
    [escenario]
  );

  const filasBase = useMemo(() => calcularIndice(pesos), [pesos]);
  const filasEsc = useMemo(
    () => calcularIndice(pesos, aplicarEscenario(escenario)),
    [pesos, escenario]
  );
  const posBase = (c: CC) => filasBase.findIndex((f) => f.code === c) + 1;
  const hayEscenario = tweaks.length > 0;

  const mover = (v: number) => {
    setEscenario((e) => ({
      ...e,
      [indKey]: { ...(e[indKey] ?? {}), [pais]: v },
    }));
  };
  const quitar = (k: string, cc: CC) => {
    setEscenario((e) => {
      const copia = { ...e, [k]: { ...(e[k] ?? {}) } };
      delete copia[k][cc];
      if (Object.keys(copia[k]).length === 0) delete copia[k];
      return copia;
    });
  };

  const usaPesosActuales = PILARES.some(
    (pl) => pesos[pl.key] !== PESOS_DEFAULT[pl.key]
  );

  return (
    <section id="simulador">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
        Simulador · ¿Y si…?
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
        Mové una cifra y mirá cómo se reordena la región
      </h2>
      <p className="mt-2 mb-7 max-w-3xl text-[15px] text-muted">
        Elegí un país, un indicador y un valor hipotético: el índice se recalcula
        en vivo. ¿Cuánto crédito formal necesita Colombia para alcanzar a Chile?
        ¿Qué pasa si Perú regula Open Finance? Armá un escenario con varios
        cambios a la vez{usaPesosActuales ? " (usa los pesos que definiste arriba)" : ""}.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
        {/* controles */}
        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            1 · País
          </div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {PAISES.map((p) => {
              const on = p.code === pais;
              return (
                <button
                  key={p.code}
                  onClick={() => setPais(p.code)}
                  className="rounded-full border px-3 py-1 text-xs font-medium transition"
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

          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            2 · Indicador
          </div>
          <select
            value={indKey}
            onChange={(e) => setIndKey(e.target.value)}
            className="mb-5 w-full rounded-xl border border-white/14 bg-panel-2 px-3 py-2 text-sm text-fg outline-none focus:border-teal"
          >
            {PILARES.map((pl) => (
              <optgroup key={pl.key} label={pl.nombre}>
                {INDICADORES.filter((i) => i.pilar === pl.key).map((i) => (
                  <option key={i.key} value={i.key}>
                    {i.label} ({i.unidad})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            3 · Valor hipotético{" "}
            <span className="normal-case font-normal">
              ({ind.direccion === "higher" ? "↑ mejor" : "↓ mejor"})
            </span>
          </div>
          <div className="flex items-baseline justify-between text-sm mb-1">
            <span className="text-muted">
              Hoy:{" "}
              <b className="text-fg tabnum">
                {valorReal === null ? "sin dato" : `${valorReal} ${ind.unidad}`}
              </b>
            </span>
            <span
              className="tabnum text-xl font-extrabold"
              style={{ color: COLORS[pais] }}
            >
              {valorSlider} {ind.unidad}
            </span>
          </div>
          <input
            type="range"
            min={lo}
            max={hi}
            step={step}
            value={valorSlider}
            onChange={(e) => mover(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: COLORS[pais] }}
          />
          {valorReal === null && (
            <p className="mt-2 text-[11px] text-amber">
              Este país no tiene dato hoy: al mover el slider estás agregando un
              valor hipotético donde antes había n/d.
            </p>
          )}

          {hayEscenario && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Tu escenario ({tweaks.length}{" "}
                  {tweaks.length === 1 ? "cambio" : "cambios"})
                </span>
                <button
                  onClick={() => setEscenario({})}
                  className="text-xs text-teal hover:underline"
                >
                  Restablecer todo
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tweaks.map((t) => {
                  const i = INDICADORES.find((x) => x.key === t.indKey)!;
                  return (
                    <span
                      key={`${t.indKey}-${t.cc}`}
                      className="flex items-center gap-1.5 rounded-full border border-white/14 bg-white/[0.04] px-2.5 py-1 text-[11px] text-fg/85"
                    >
                      {flag(t.cc)} {i.label}: <b className="tabnum">{t.valor}</b>
                      <button
                        onClick={() => quitar(t.indKey, t.cc)}
                        className="ml-0.5 text-muted hover:text-fg"
                        aria-label="Quitar cambio"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* resultado */}
        <div className="card p-5">
          <h3 className="font-semibold text-fg mb-3">
            Ranking IIIF: hoy → tu escenario
          </h3>
          <div className="space-y-2">
            {filasEsc.map((f, i) => {
              const antes = posBase(f.code);
              const delta = antes - (i + 1);
              const base = filasBase.find((x) => x.code === f.code)!;
              const dIndice = Math.round((f.indice - base.indice) * 10) / 10;
              const b = banda(f.indice);
              return (
                <div
                  key={f.code}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2"
                  style={
                    delta !== 0 || dIndice !== 0
                      ? { borderColor: `${COLORS[f.code]}55` }
                      : undefined
                  }
                >
                  <span className="tabnum w-5 text-sm text-muted">{i + 1}</span>
                  <span className="w-8 text-center text-xs font-bold">
                    {delta > 0 ? (
                      <span className="text-teal">▲{delta}</span>
                    ) : delta < 0 ? (
                      <span className="text-[#ff8fa3]">▼{-delta}</span>
                    ) : (
                      <span className="text-muted/60">=</span>
                    )}
                  </span>
                  <span className="flex-1 text-sm font-medium text-fg">
                    {flag(f.code)} {nombre(f.code)}
                  </span>
                  {hayEscenario && dIndice !== 0 && (
                    <span
                      className="tabnum text-xs font-semibold"
                      style={{ color: dIndice > 0 ? "#1FC9A0" : "#ff8fa3" }}
                    >
                      {dIndice > 0 ? "+" : ""}
                      {dIndice}
                    </span>
                  )}
                  <span className="tabnum text-xs text-muted">
                    {base.indice}
                  </span>
                  <span className="text-muted/50 text-xs">→</span>
                  <span
                    className="tabnum w-12 text-right text-base font-extrabold"
                    style={{ color: b.color }}
                  >
                    {f.indice}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            La normalización es relativa entre los seis países: mejorar un país
            también reacomoda el puntaje de los demás. Ejercicio hipotético — los
            datos reales están citados en cada indicador.
          </p>
        </div>
      </div>
    </section>
  );
}
