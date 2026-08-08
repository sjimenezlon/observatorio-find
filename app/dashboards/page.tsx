import type { Metadata } from "next";
import DashboardSuite from "@/components/DashboardSuite";
import { NavBar } from "@/components/NavBar";
import { META } from "@/data/dataset";

export const metadata: Metadata = {
  title: "Dashboards estratégicos · Observatorio Find",
  description:
    "Seis tableros para leer inclusión financiera digital, ecosistema fintech, regulación, riesgo climático, salud financiera y ciberseguridad en América Latina.",
};

export default function DashboardsPage() {
  return (
    <main>
      <NavBar />

      <header className="hero-grid relative overflow-hidden border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-teal">Decision intelligence / LatAm</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-lime">
              <span className="status-dot" />
              Corte {META.curado}
            </span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-[19ch] text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
                Seis tableros para pasar de la evidencia a la decisión.
              </h1>
              <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-fg/72 md:text-lg">
                La nueva arquitectura de Find organiza el observatorio por las
                preguntas de política pública, inversión y gestión que la región
                necesita responder. Cada cifra publicada conserva fuente, año y
                nivel de cobertura; lo que aún no puede medirse se declara.
              </p>
            </div>

            <aside className="technical-panel p-5">
              <div className="data-label text-muted">Portfolio / release 2026.08</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ["06", "tableros"],
                  ["04", "prioritarios"],
                  ["00", "datos imputados"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-mono text-2xl font-semibold tracking-[-0.05em] text-fg">
                      {value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-muted">
                La cobertura no se confunde con desempeño: un vacío de fuente se
                marca como <span className="text-amber">brecha</span>, nunca como cero.
              </div>
            </aside>
          </div>
        </div>
      </header>

      <DashboardSuite />

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Observatorio Find · Universidad EAFIT · {META.version}</span>
          <div className="flex gap-4">
            <a className="hover:text-teal" href="/metodologia">Metodología</a>
            <a className="hover:text-teal" href="/#datos">Evidencia del IIIF</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
