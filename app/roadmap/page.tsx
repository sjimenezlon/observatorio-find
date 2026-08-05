import type { Metadata } from "next";
import {
  HORIZONTES,
  PRINCIPIOS,
  TAG_META,
  ANCLAS_REGULATORIAS,
  Tag,
} from "@/data/roadmap";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Roadmap fintech Colombia · Observatorio Find",
  description:
    "Roadmap general para que las fintech de Colombia mejoren sus procesos: tres horizontes (cimientos, escala con control y frontera) en inclusión, IA, fraude y tokenización, aterrizados al marco regulatorio colombiano.",
};

export default function Roadmap() {
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <span className="mb-4 inline-block rounded-full border border-lime/35 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
            Roadmap · mejora de procesos · fintech Colombia
          </span>
          <h1 className="max-w-[22ch] text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            De dónde está hoy el ecosistema a{" "}
            <span className="text-teal">procesos confiables con IA</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[17px] font-light text-fg/80">
            El Observatorio muestra que Colombia lidera en madurez de fraude/AML
            entre sus pares pero queda rezagada en inclusión y crédito formal.
            Este roadmap traduce ese diagnóstico en una ruta de tres horizontes
            para que las fintech locales mejoren sus procesos sin perder
            trazabilidad ni cumplimiento.
          </p>
        </div>
      </header>

      {/* PRINCIPIOS */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Principios que cruzan todo el roadmap
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPIOS.map((p, i) => (
              <div key={p.t} className="card p-5">
                <div className="mb-2 text-2xl font-extrabold text-teal/40">
                  0{i + 1}
                </div>
                <h3 className="text-[15px] font-bold text-fg">{p.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTES */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            Tres horizontes
          </h2>
          <p className="mb-9 max-w-2xl text-[15px] text-muted">
            Cada acción está etiquetada por pilar y referencia la línea del
            catálogo Find que puede acompañarla.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {HORIZONTES.map((h) => (
              <div
                key={h.n}
                className="card overflow-hidden"
                style={{ borderTop: `4px solid ${h.color}` }}
              >
                <div className="p-5">
                  <div className="flex items-baseline justify-between">
                    <span
                      className="rounded-lg px-2.5 py-1 text-xs font-extrabold"
                      style={{ background: `${h.color}22`, color: h.color }}
                    >
                      {h.n}
                    </span>
                    <span className="text-xs font-semibold text-muted">
                      {h.rango}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold text-fg">
                    {h.nombre}
                  </h3>
                  <p className="mt-1 text-[13px] text-fg/70">{h.lema}</p>
                </div>

                <div className="space-y-4 px-5 pb-6">
                  {h.acciones.map((a) => {
                    const meta = TAG_META[a.tag as Tag];
                    return (
                      <div
                        key={a.titulo}
                        className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                      >
                        <span
                          className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                          style={{
                            background: `${meta.color}22`,
                            color: meta.color,
                          }}
                        >
                          {meta.label}
                        </span>
                        <h4 className="mt-2 text-[15px] font-bold text-fg">
                          {a.titulo}
                        </h4>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">
                          {a.detalle}
                        </p>
                        <div className="mt-3 flex items-start gap-2 border-t border-white/8 pt-2.5 text-[12px]">
                          <span className="font-bold text-teal">KPI</span>
                          <span className="text-fg/75">{a.kpi}</span>
                        </div>
                        {a.finhub && (
                          <div className="mt-1.5 text-[11px] text-muted/80">
                            <span className="text-amber">Find:</span>{" "}
                            {a.finhub}
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
      </section>

      {/* ANCLAS REGULATORIAS */}
      <section className="border-t border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Marco regulatorio colombiano de referencia
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ANCLAS_REGULATORIAS.map((a) => (
              <div key={a.sigla} className="card p-4">
                <div className="text-sm font-bold text-fg">{a.sigla}</div>
                <div className="mt-0.5 text-[12px] text-muted">{a.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="mx-auto max-w-2xl text-[15px] text-muted">
            El roadmap se nutre del Índice de Madurez de IA Financiera. Volvé al
            tablero para ver dónde está cada país y descargar el dataset.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="/#indice"
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
            >
              Ver el índice
            </a>
            <a
              href="/metodologia"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-muted transition hover:text-fg"
            >
              Metodología
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
