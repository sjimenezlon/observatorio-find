import Dashboard from "@/components/Dashboard";
import { NavBar } from "@/components/NavBar";
import Brecha from "@/components/Brecha";
import Anclas from "@/components/Anclas";
import MapaIndice from "@/components/MapaIndice";
import GlobalBenchmarks from "@/components/GlobalBenchmarks";
import { FUENTES, META, PILARES } from "@/data/dataset";
import { DINAMICA, DINAMICA_STATS, TENDENCIAS } from "@/data/lentes";

export default function Home() {
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="hero-grid relative overflow-hidden border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pb-14 md:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-teal">Find · Universidad EAFIT</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-lime">
                  <span className="status-dot" />
                  Dataset abierto · {META.curado}
                </span>
              </div>

              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                Inteligencia financiera latinoamericana,
                <span className="block text-teal">medible y auditable.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg/72 md:text-[18px]">
                Un sistema público de evidencia para comparar la madurez de la IA
                financiera, los pagos y la confianza en América Latina. Tres
                índices propios, fuentes trazables y una metodología que cualquiera
                puede replicar.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#indice" className="action-primary px-5 py-3 text-sm">
                  Explorar el IMIAF <span aria-hidden="true">→</span>
                </a>
                <a href="#mapa" className="action-secondary px-5 py-3 text-sm">
                  Ver mapa regional
                </a>
                <a href="/metodologia" className="action-quiet px-4 py-3 text-sm">
                  Auditar metodología ↗
                </a>
              </div>
            </div>

            <aside className="technical-panel" aria-label="Estado del observatorio">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4">
                <div>
                  <div className="data-label text-muted">System / dataset status</div>
                  <div className="mt-1 text-sm font-semibold text-fg">Corte {META.version}</div>
                </div>
                <span className="rounded-md border border-teal/25 bg-teal/[0.08] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-teal">
                  Validado
                </span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/8">
                {[
                  ["06", "países IMIAF"],
                  [String(META.indicadores).padStart(2, "0"), "indicadores"],
                  [String(META.pilares).padStart(2, "0"), "pilares"],
                  ["21", "economías ICF"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-[#0b2925] px-5 py-4">
                    <div className="font-mono text-2xl font-semibold tracking-[-0.05em] text-fg">
                      {value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 px-5 py-4 font-mono text-[10px]">
                <div className="flex justify-between gap-4">
                  <span className="text-muted">Última auditoría</span>
                  <span className="text-right text-fg/75">{META.auditoria}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted">Motores</span>
                  <span className="text-right text-fg/75">IMIAF · ICF · ICF-S</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted">Prioridad de fuente</span>
                  <span className="text-right text-fg/75">API / emisor / originador</span>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Diagnóstico", d: "Mapa y ranking por país", h: "#mapa" },
              { n: "02", t: "Escenarios", d: "Pesos y simulador en vivo", h: "#indice" },
              { n: "03", t: "Confianza", d: "Pagos e ICF para 21 economías", h: "/pagos" },
              { n: "04", t: "Evidencia", d: "Dataset, fuentes y método", h: "#datos" },
            ].map((item) => (
              <a key={item.n} href={item.h} className="quick-route group">
                <span className="font-mono text-[9px] text-teal">{item.n}</span>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-fg">{item.t}</div>
                    <div className="mt-1 text-[11px] text-muted">{item.d}</div>
                  </div>
                  <span className="text-fg/35 transition group-hover:translate-x-0.5 group-hover:text-teal">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ANCLAS */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            El contexto, en cifras verificadas
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Nueve señales que enmarcan el ecosistema
          </h2>
          <Anclas />
        </div>
      </section>

      {/* BANDA · PAGOS & CONFIANZA (nuevo en v4) */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div
            className="card overflow-hidden p-0"
            style={{ borderColor: "rgba(232,130,90,0.35)" }}
          >
            <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
              <div className="p-7">
                <span
                  className="mb-4 inline-block rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: "rgba(232,130,90,0.45)",
                    background: "rgba(232,130,90,0.12)",
                    color: "#E8825A",
                  }}
                >
                  Módulo de confianza
                </span>
                <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
                  Pagos y confianza: lo que la bancarización no mide
                </h2>
                <p className="mb-5 text-[14px] leading-relaxed text-fg/80">
                  El índice sumó un <b className="font-semibold text-fg">pilar de Pagos</b>{" "}
                  con cinco indicadores y un{" "}
                  <b className="font-semibold text-fg">
                    Índice de Confianza Financiera (ICF)
                  </b>{" "}
                  construido sobre confianza revelada —no declarada— para 21
                  economías de América Latina y el Caribe. Tener una cuenta no es
                  confiar: puede ser el requisito para cobrar el sueldo.
                </p>
                <a
                  href="/pagos"
                  className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-[#06231f] transition"
                  style={{ background: "#E8825A" }}
                >
                  Abrir el módulo de pagos y confianza →
                </a>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/8">
                {[
                  { k: "502", l: "pagos inmediatos por adulto al año en Brasil", c: "#E8825A" },
                  { k: "44", l: "en Colombia: el riel es nuevo, no maduro", c: "#E8825A" },
                  { k: "6 de 10", l: "créditos de la región son informales", c: "#1FC9A0" },
                  { k: "último", l: "lugar de Colombia en confianza (ICF) entre 16 países medibles", c: "#FF7A9E" },
                ].map((x) => (
                  <div key={x.l} className="bg-panel p-5">
                    <div
                      className="tabnum text-2xl font-extrabold leading-none"
                      style={{ color: x.c }}
                    >
                      {x.k}
                    </div>
                    <div className="mt-1.5 text-[11.5px] leading-snug text-muted">
                      {x.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAPA INTERACTIVO */}
      <MapaIndice />

      {/* TENDENCIAS */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Qué monitorea el observatorio
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TENDENCIAS.map((t) => (
              <div key={t.tema} className="card flex items-start gap-3 p-4">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: t.color }}
                />
                <div>
                  <div className="text-sm font-bold text-fg">{t.tema}</div>
                  <div className="text-[12px] leading-relaxed text-muted">
                    {t.nota}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATAM VS MUNDO */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-lime">
            La narrativa de fondo
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            LatAm frente al mundo: dónde estamos rezagados
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            El valor del observatorio no es solo mirar la región hacia adentro,
            sino contra el mundo: ahí aparecen los rezagos, los arbitrajes y las
            contradicciones que generan oportunidad y contenido.
          </p>
          <Brecha />
        </div>
      </section>

      <GlobalBenchmarks />

      {/* INCUMBENTES VS FINTECHS */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            La dinámica del ecosistema
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Incumbentes vs. retadores — y por qué ya no es una guerra
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            Bancos y fintechs llegaron desde lugares opuestos, pero el dato nuevo
            es que se necesitan: la colaboración —no la disrupción pura— define
            esta etapa.
          </p>

          <div className="card overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="p-4 font-medium text-muted"></th>
                  <th className="p-4 font-bold text-fg">🏛️ Bancos (incumbentes)</th>
                  <th className="p-4 font-bold text-fg">🚀 Fintechs (retadores)</th>
                </tr>
              </thead>
              <tbody>
                {DINAMICA.map((row) => (
                  <tr key={row.dim} className="border-b border-white/5">
                    <td className="p-4 font-semibold text-teal">{row.dim}</td>
                    <td className="p-4 text-fg/80">{row.banco}</td>
                    <td className="p-4 text-fg/80">{row.fintech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {DINAMICA_STATS.map((s) => (
              <div key={s.valor} className="card p-6">
                <div className="text-3xl font-extrabold tracking-tight text-lime">
                  {s.valor}
                </div>
                <p className="mt-2 text-sm text-fg/80">{s.label}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-[11px] text-muted hover:text-teal hover:underline"
                >
                  {s.fuente}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES intro */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            La estructura
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Seis pilares
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILARES.map((pl, i) => (
              <div key={pl.key} className="card p-6">
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold"
                  style={{ background: `${pl.color}22`, color: pl.color }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-fg">{pl.nombre}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {pl.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-muted">
            Estos seis pilares miden el foco fintech de hoy. El siguiente paso
            ya está trazado sobre los cinco focos del Centro de Innovación
            Financiera — bienestar financiero, impacto, conducta —:{" "}
            <a href="/agenda" className="font-semibold text-teal hover:underline">
              ver la agenda de medición →
            </a>
          </p>
        </div>
      </section>

      {/* DASHBOARD */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Dashboard />
      </div>

      {/* ROADMAP CTA */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div
            className="card relative overflow-hidden p-8 md:p-10"
            style={{
              background:
                "linear-gradient(120deg, rgba(31,201,160,0.12), rgba(108,92,214,0.10))",
            }}
          >
            <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-lime">
                  Del diagnóstico a la acción
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                  Roadmap para que las fintech de Colombia mejoren sus procesos
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] text-fg/80">
                  Tres horizontes —cimientos, escala con control y frontera— que
                  traducen los hallazgos del observatorio en acciones concretas
                  con KPIs, aterrizadas al marco regulatorio colombiano (SFC,
                  UIAF, Bre-B, Finanzas Abiertas).
                </p>
              </div>
              <div className="flex md:justify-end">
                <a
                  href="/roadmap"
                  className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
                >
                  Ver el roadmap →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUENTES */}
      <section className="border-t border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Transparencia
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Fuentes consultadas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {FUENTES.map((f) => (
              <a
                key={f.nombre}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block p-4 transition hover:border-teal/40"
              >
                <div className="text-sm font-semibold text-fg">{f.nombre}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-muted">
                  {f.nota}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-lg font-extrabold tracking-tight text-fg">
              fin<span className="text-lime">d</span>
            </span>
            <a href="/metodologia" className="text-teal hover:underline">
              Metodología completa →
            </a>
          </div>
          <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-muted/80">
            {META.marca} · {META.institucion}. Las cifras provienen de fuentes
            públicas citadas; los índices marcados como “del Observatorio” son
            construcciones cualitativas propias, documentadas en la metodología.
            Las proyecciones de terceros (RWA, IA agéntica) deben validarse antes
            de comprometer recursos. Demo con fines de benchmarking académico ·{" "}
            {META.version}.
          </p>
        </div>
      </footer>
    </main>
  );
}
