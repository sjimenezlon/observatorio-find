"use client";

import { useState } from "react";
import {
  AREAS_BRECHA,
  CONTEXTO_BRECHA,
  OFERTA_DEMANDA,
  FUENTES_BRECHA,
} from "@/data/brechasColombia";

const CORAL = "#E8825A";

export default function BrechasColombia() {
  const [abierta, setAbierta] = useState<string | null>(AREAS_BRECHA[0].area);

  return (
    <section id="colombia" className="border-b border-white/8 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
          Colombia · hoy frente a 2030
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          La brecha que la innovación tendría que cerrar
        </h2>
        <p className="mb-8 max-w-3xl text-[15px] text-muted">
          Siete áreas de innovación financiera, con el estado verificable de cada
          una y el escenario al que apuntaría. La barra de madurez es un{" "}
          <b className="font-semibold text-fg">índice cualitativo del autor</b>:
          ilustra brechas relativas, no es una métrica oficial.
        </p>

        {/* ------------------------------------------- oferta vs. demanda */}
        <div className="mb-10">
          <h3 className="mb-1 text-lg font-extrabold tracking-tight">
            El dato que cambia según a quién se le pregunte
          </h3>
          <p className="mb-5 max-w-3xl text-[13px] text-muted">
            La contradicción aparente entre las cifras oficiales y las de
            encuesta no es un error de ninguna de las dos: es el hallazgo.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {OFERTA_DEMANDA.map((p) => {
              const max = Math.max(p.oferta.valor, p.demanda.valor);
              return (
                <div key={p.tema} className="card p-5">
                  <div className="mb-4 text-sm font-bold text-fg">{p.tema}</div>

                  {[
                    { ...p.oferta, tipo: "Oferta · registros", color: CORAL },
                    { ...p.demanda, tipo: "Demanda · encuesta", color: "#1FC9A0" },
                  ].map((lado) => (
                    <div key={lado.tipo} className="mb-3">
                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.12em]"
                          style={{ color: lado.color }}
                        >
                          {lado.tipo}
                        </span>
                        <span
                          className="tabnum text-lg font-extrabold leading-none"
                          style={{ color: lado.color }}
                        >
                          {String(lado.valor).replace(".", ",")}
                          {lado.unidad}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-r-[4px] bg-white/6">
                        <div
                          className="h-full rounded-r-[4px]"
                          style={{
                            width: `${(lado.valor / max) * 100}%`,
                            background: lado.color,
                          }}
                        />
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-fg/75">
                        {lado.label}
                      </div>
                      <div className="text-[10px] text-muted">{lado.fuente}</div>
                    </div>
                  ))}

                  <p className="mt-3 border-t border-white/8 pt-3 text-[12px] leading-relaxed text-muted">
                    {p.lectura}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------- cifras ancla */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CONTEXTO_BRECHA.map((c) => (
            <div key={c.label} className="card p-4">
              <div className="mb-1 flex items-center justify-between">
                <span
                  className="tabnum text-xl font-extrabold leading-none"
                  style={{ color: c.ambito === "mundo" ? "#5BD0E0" : CORAL }}
                >
                  {c.valor}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted">
                  {c.ambito === "mundo" ? "Mundo" : "Colombia"}
                </span>
              </div>
              <div className="text-[11px] leading-snug text-fg/80">{c.label}</div>
              <div className="mt-1 text-[9.5px] leading-snug text-muted">
                {c.fuente}
              </div>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------- áreas hoy → 2030 */}
        <h3 className="mb-4 text-lg font-extrabold tracking-tight">
          Siete áreas, siete distancias
        </h3>
        <div className="space-y-2">
          {AREAS_BRECHA.map((a) => {
            const on = abierta === a.area;
            return (
              <div key={a.area} className="card overflow-hidden">
                <button
                  onClick={() => setAbierta(on ? null : a.area)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span
                    className={`w-[210px] shrink-0 text-[13px] ${
                      on ? "font-bold text-fg" : "font-medium text-fg/80"
                    }`}
                  >
                    {a.area}
                  </span>

                  {/* barra hoy → meta */}
                  <span className="relative h-3 flex-1 overflow-hidden rounded-r-[4px] bg-white/5">
                    <span
                      className="absolute left-0 top-0 h-full rounded-r-[4px]"
                      style={{
                        width: `${a.meta}%`,
                        background: "rgba(31,201,160,0.22)",
                      }}
                    />
                    <span
                      className="absolute left-0 top-0 h-full rounded-r-[4px]"
                      style={{ width: `${a.hoy}%`, background: CORAL }}
                    />
                  </span>

                  <span className="tabnum w-[74px] shrink-0 text-right text-[11px] text-muted">
                    {a.hoy} → {a.meta}
                  </span>
                  <span
                    className="w-[52px] shrink-0 rounded-full px-2 py-0.5 text-center text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: a.prioridad === "ALTA" ? "rgba(255,122,158,0.16)" : "rgba(232,180,82,0.16)",
                      color: a.prioridad === "ALTA" ? "#FF7A9E" : "#E8B452",
                    }}
                  >
                    {a.prioridad}
                  </span>
                </button>

                {on && (
                  <div className="grid gap-4 border-t border-white/8 p-4 md:grid-cols-3">
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: CORAL }}>
                        Hoy · 2024–2026
                      </div>
                      <p className="text-[12px] leading-relaxed text-fg/80">
                        {a.estadoHoy}
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-teal">
                        Escenario 2030
                      </div>
                      <p className="text-[12px] leading-relaxed text-fg/80">
                        {a.escenario2030}
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-lime">
                        Palanca
                      </div>
                      <p className="text-[12px] leading-relaxed text-fg/80">
                        {a.palanca}
                      </p>
                      {a.midePor && (
                        <p className="mt-2 text-[11px] text-muted">
                          El observatorio ya lo mide con:{" "}
                          <b className="text-teal">{a.midePor}</b>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm" style={{ background: CORAL }} />
            madurez hoy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm" style={{ background: "rgba(31,201,160,0.22)" }} />
            escenario 2030
          </span>
          <span>Índice cualitativo del autor · escala 0–100</span>
        </div>

        <details className="mt-6 text-[11px]">
          <summary className="cursor-pointer text-muted transition hover:text-fg">
            Fuentes del mapa de brechas ({FUENTES_BRECHA.length})
          </summary>
          <ul className="mt-2 space-y-1">
            {FUENTES_BRECHA.map((f) => (
              <li key={f.n}>
                <a
                  href={f.u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline decoration-teal/40 hover:decoration-teal"
                >
                  {f.n}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
