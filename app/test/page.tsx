import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import TestReadiness from "@/components/TestReadiness";
import { PREGUNTAS, META_TEST } from "@/data/test";
import { BANDAS } from "@/lib/test";

export const metadata: Metadata = {
  title: "Test de preparación para la IA · Observatorio Find",
  description:
    "Diez afirmaciones en escala Likert para saber qué tan lista está una entidad financiera para la inteligencia artificial, comparada con sus pares de América Latina y del mundo. Corte septiembre de 2026, sin registro.",
  openGraph: {
    title: "¿Qué tan lista está su entidad financiera para la IA?",
    description:
      "Test de diez afirmaciones con comparación frente a pares de LatAm y del mundo. Observatorio Find, Universidad EAFIT.",
    url: "/test",
  },
};

export default function TestPage() {
  const conMundo = PREGUNTAS.filter((p) => p.mundo).length;
  const conLatam = PREGUNTAS.filter((p) => p.latam).length;
  const fuentes = new Map<string, { fuente: string; url: string; anio: number; muestra: string }>();
  for (const p of PREGUNTAS) {
    for (const c of [p.mundo, p.latam]) {
      if (c && !fuentes.has(c.url)) {
        fuentes.set(c.url, { fuente: c.fuente, url: c.url, anio: c.anio, muestra: c.muestra });
      }
    }
  }

  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="hero-grid border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-teal">Test · preparación para la IA</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-lime">
              <span className="status-dot" />
              Vigente a {META_TEST.corte}
            </span>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-[18ch] text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
                ¿Qué tan lista está su entidad financiera para la IA?
              </h1>
              <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-fg/72 md:text-lg">
                Diez afirmaciones, cuatro minutos, sin registro. Pensado para
                entidades medianas vigiladas en Colombia: compañías de
                financiamiento, cooperativas, bancos de nicho, aseguradoras y
                fintech con licencia. Al final, un puntaje de 0 a 100 y, capacidad
                por capacidad, qué proporción de sus pares en el mundo y en
                América Latina ya la tiene.
              </p>
            </div>

            <aside className="technical-panel p-5">
              <div className="data-label text-muted">Instrumento / {META_TEST.version}</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  [String(PREGUNTAS.length).padStart(2, "0"), "afirmaciones"],
                  [String(conMundo).padStart(2, "0"), "con dato mundo"],
                  [String(conLatam).padStart(2, "0"), "con dato LatAm"],
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
                Las comparaciones no son percentiles: son la proporción de
                empresas que declara cada capacidad en encuestas publicadas, con
                fuente y año. Donde no hay encuesta comparable se dice{" "}
                <span className="text-amber">sin dato</span>, no se estima.
              </div>
            </aside>
          </div>
        </div>
      </header>

      <TestReadiness />

      {/* METODOLOGÍA */}
      <section id="metodo" className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="eyebrow text-teal">Cómo se calcula</div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            Un puntaje simple, una comparación honesta
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Escala",
                d: "Cinco puntos, de «totalmente en desacuerdo» (1) a «totalmente de acuerdo» (5). Cada respuesta se convierte en un nivel 0–100: 1 → 0, 3 → 50, 5 → 100.",
              },
              {
                t: "Puntaje",
                d: "Promedio simple de los diez niveles. Sin pesos: cada dimensión vale lo mismo. Una capacidad cuenta como consolidada con 4 o 5.",
              },
              {
                t: "Pares",
                d: "Para cada capacidad, la proporción de empresas que la declara en la encuesta más reciente disponible, del mundo y de América Latina, con n, año y URL.",
              },
              {
                t: "Lectura",
                d: "Brecha: nivel ≤ 50 donde al menos la mitad de los pares (mundo o LatAm, la proporción mayor) la declara. Ventaja: nivel ≥ 75 donde menos del 40 % la declara. El resto, en línea.",
              },
            ].map((x, i) => (
              <div key={x.t} className="card p-5">
                <div className="mb-2 font-mono text-2xl font-semibold text-teal/50">0{i + 1}</div>
                <h3 className="text-[15px] font-bold text-fg">{x.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="card p-5">
              <h3 className="text-[15px] font-bold text-fg">Las cuatro bandas</h3>
              <ul className="mt-3 space-y-3">
                {BANDAS.map((b) => (
                  <li key={b.key} className="flex gap-3 text-[13px]">
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: b.color }} />
                    <div>
                      <span className="font-bold text-fg">{b.label}</span>{" "}
                      <span className="font-mono text-[11px] text-muted">{b.rango}</span>
                      <p className="mt-0.5 leading-relaxed text-muted">{b.lectura}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="text-[15px] font-bold text-fg">Lo que este test no hace</h3>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-fg/85">No es una auditoría.</span> Mide lo que
                  la entidad declara de sí misma; un tercero puede llegar a otra conclusión.
                </li>
                <li>
                  <span className="font-semibold text-fg/85">No da percentiles.</span> No existe una
                  distribución publicada de entidades financieras por puntaje de preparación; inventarla
                  sería presentar una estimación como dato.
                </li>
                <li>
                  <span className="font-semibold text-fg/85">Las encuestas de pares no son muestras
                  probabilísticas.</span> Responden empresas que quisieron responder, en general más
                  grandes y más avanzadas que el promedio; las cifras tienden a sobrestimar la adopción.
                </li>
                <li>
                  <span className="font-semibold text-fg/85">Mundo y LatAm no siempre salen de la misma
                  encuesta.</span> Cada uno se contrasta con el nivel de la entidad; no se comparan entre
                  sí. La definición exacta de cada cifra está en «Por qué pesa» de cada afirmación.
                </li>
                <li>
                  <span className="font-semibold text-fg/85">No guarda nada.</span> Sin cookies, sin
                  registro, sin envío. El resultado se codifica en el enlace y se puede compartir o
                  borrar.
                </li>
              </ul>
            </div>
          </div>

          {fuentes.size > 0 && (
            <div className="mt-8">
              <h3 className="text-[15px] font-bold text-fg">Encuestas citadas</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[...fuentes.values()]
                  .sort((a, b) => b.anio - a.anio || a.fuente.localeCompare(b.fuente))
                  .map((f) => (
                    <li key={f.url} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12.5px]">
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-fg underline decoration-white/25 underline-offset-2 hover:text-lime"
                      >
                        {f.fuente}
                      </a>
                      <span className="text-muted"> · {f.anio} · {f.muestra}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* CIERRE */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card p-5">
              <div className="eyebrow text-teal">Después del test</div>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight">Elegir la herramienta correcta</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Buena parte de la brecha entre experimentar y producir está en usar la IA equivocada
                para la tarea. <a href="https://queianecesitas.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-lime underline decoration-lime/40 underline-offset-2">¿Qué IA necesito?</a> recomienda
                qué modelo o herramienta usar según lo que se quiere hacer.
              </p>
            </div>
            <div className="card p-5">
              <div className="eyebrow text-teal">Contexto regional</div>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight">Dónde está su país</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                El <a href="/#indice" className="font-semibold text-lime underline decoration-lime/40 underline-offset-2">índice IMIAF</a> y el <a href="/pagos#icf" className="font-semibold text-lime underline decoration-lime/40 underline-offset-2">ICF</a> muestran la madurez y la confianza del sistema financiero de seis países. La preparación de una entidad se lee mejor sobre ese mapa.
              </p>
            </div>
            <div className="card p-5">
              <div className="eyebrow text-teal">Hoja de ruta</div>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight">De la brecha a la acción</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                El <a href="/roadmap" className="font-semibold text-lime underline decoration-lime/40 underline-offset-2">roadmap fintech Colombia</a> traduce cada dimensión en acciones por horizonte, con KPI y marco regulatorio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-[12px] text-muted">
        Observatorio Find · Universidad EAFIT · Test de preparación para la IA {META_TEST.version}, corte {META_TEST.corte}. Cita sugerida: Observatorio Find (2026), <em>Test de preparación para la IA en entidades financieras</em>, EAFIT, observatorio-find.vercel.app/test.
      </footer>
    </main>
  );
}
