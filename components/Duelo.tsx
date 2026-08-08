"use client";

import { useMemo, useState } from "react";
import { PAISES, PILARES, INDICADORES, CC } from "@/data/dataset";
import { calcularIndice, normalizarIndicador, banda } from "@/lib/index";

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

function fmtValor(v: number | null, unidad: string) {
  if (v === null) return "n/d";
  const s = Math.abs(v) >= 1000 ? v.toLocaleString("es-CO") : String(v);
  return `${s} ${unidad}`;
}

export default function Duelo() {
  const [a, setA] = useState<CC>("CO");
  const [b, setB] = useState<CC>("BR");

  const filas = useMemo(() => calcularIndice(), []);
  const fA = filas.find((f) => f.code === a)!;
  const fB = filas.find((f) => f.code === b)!;

  // por indicador: normalizados (0–100 relativo a los 6) y ganador
  const rondas = useMemo(
    () =>
      INDICADORES.map((ind) => {
        const norm = normalizarIndicador(ind);
        const nA = norm[a];
        const nB = norm[b];
        let gana: "A" | "B" | "empate" | "nd" = "empate";
        if (nA === null && nB === null) gana = "nd";
        else if (nA === null) gana = "B";
        else if (nB === null) gana = "A";
        else if (nA > nB) gana = "A";
        else if (nB > nA) gana = "B";
        return { ind, nA, nB, gana };
      }),
    [a, b]
  );

  const winsA = rondas.filter((r) => r.gana === "A").length;
  const winsB = rondas.filter((r) => r.gana === "B").length;
  const lider = winsA > winsB ? a : winsB > winsA ? b : null;

  const Selector = ({
    sel,
    setSel,
    excluir,
    lado,
  }: {
    sel: CC;
    setSel: (c: CC) => void;
    excluir: CC;
    lado: string;
  }) => (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
        {lado}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PAISES.map((p) => {
          const on = p.code === sel;
          const off = p.code === excluir;
          return (
            <button
              key={p.code}
              disabled={off}
              onClick={() => setSel(p.code)}
              className="rounded-full border px-3 py-1 text-xs font-medium transition disabled:opacity-30"
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
    </div>
  );

  return (
    <section id="duelo">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
        Duelo · cara a cara
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
        Dos países, indicador por indicador
      </h2>
      <p className="mt-2 mb-7 max-w-3xl text-[15px] text-muted">
        Elegí dos países y compará quién gana en cada uno de los indicadores del
        índice (sobre el puntaje normalizado 0–100; en los de “menor es mejor”
        gana el que tiene menos).
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Selector sel={a} setSel={setA} excluir={b} lado="Rincón A" />
        <Selector sel={b} setSel={setB} excluir={a} lado="Rincón B" />
      </div>

      {/* marcador */}
      <div className="card mb-5 p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-bold text-fg">
              {flag(a)} {nombre(a)}
            </div>
            <div className="tabnum text-sm text-muted">
              IIIF <b style={{ color: banda(fA.indice).color }}>{fA.indice}</b>
            </div>
          </div>
          <div className="px-4 text-center">
            <div className="tabnum text-3xl font-extrabold tracking-tight">
              <span style={{ color: COLORS[a] }}>{winsA}</span>
              <span className="mx-2 text-muted/50">–</span>
              <span style={{ color: COLORS[b] }}>{winsB}</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted">
              indicadores ganados
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-fg">
              {flag(b)} {nombre(b)}
            </div>
            <div className="tabnum text-sm text-muted">
              IIIF <b style={{ color: banda(fB.indice).color }}>{fB.indice}</b>
            </div>
          </div>
        </div>
        {lider && (
          <p className="mt-3 border-t border-white/10 pt-3 text-center text-sm text-fg/80">
            {flag(lider)} <b>{nombre(lider)}</b> gana el duelo{" "}
            {Math.max(winsA, winsB)}–{Math.min(winsA, winsB)}
            {rondas.some((r) => r.gana === "empate" || r.gana === "nd")
              ? " (el resto: empates o sin dato)"
              : ""}
            .
          </p>
        )}
      </div>

      {/* rondas por pilar */}
      <div className="space-y-4">
        {PILARES.map((pl) => (
          <div key={pl.key} className="card p-5">
            <div
              className="mb-3 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: pl.color }}
            >
              {pl.nombre}
            </div>
            <div className="space-y-3">
              {rondas
                .filter((r) => r.ind.pilar === pl.key)
                .map(({ ind, nA, nB, gana }) => (
                  <div key={ind.key}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 text-[13px]">
                      <span
                        className="tabnum w-28 shrink-0 font-semibold"
                        style={{
                          color: gana === "A" ? COLORS[a] : "#8fa9a1",
                        }}
                      >
                        {gana === "A" && "● "}
                        {fmtValor(ind.valores[a], ind.unidad)}
                      </span>
                      <span className="flex-1 text-center text-xs text-fg/75">
                        {ind.label}
                        {ind.direccion === "lower" && (
                          <span className="text-muted"> · ↓ mejor</span>
                        )}
                      </span>
                      <span
                        className="tabnum w-28 shrink-0 text-right font-semibold"
                        style={{
                          color: gana === "B" ? COLORS[b] : "#8fa9a1",
                        }}
                      >
                        {fmtValor(ind.valores[b], ind.unidad)}
                        {gana === "B" && " ●"}
                      </span>
                    </div>
                    {/* barras espejo sobre el normalizado */}
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex justify-end rounded-l-full bg-white/[0.05]">
                        <div
                          className="h-2 rounded-l-full transition-all"
                          style={{
                            width: `${nA ?? 0}%`,
                            background: COLORS[a],
                            opacity: gana === "A" ? 1 : 0.35,
                          }}
                        />
                      </div>
                      <div className="rounded-r-full bg-white/[0.05]">
                        <div
                          className="h-2 rounded-r-full transition-all"
                          style={{
                            width: `${nB ?? 0}%`,
                            background: COLORS[b],
                            opacity: gana === "B" ? 1 : 0.35,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
