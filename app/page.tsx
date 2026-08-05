import Dashboard from "@/components/Dashboard";
import { NavBar } from "@/components/NavBar";
import Brecha from "@/components/Brecha";
import Anclas from "@/components/Anclas";
import MapaIndice from "@/components/MapaIndice";
import { FUENTES, META, PILARES } from "@/data/dataset";
import { DINAMICA, DINAMICA_STATS, TENDENCIAS } from "@/data/lentes";

export default function Home() {
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-2xl font-extrabold tracking-tight">
              fin<span className="text-lime">d</span>
            </span>
            <span className="border-l border-white/25 pl-3 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
              Universidad EAFIT
            </span>
          </div>

          <span className="mb-5 inline-block rounded-full border border-lime/35 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
            Observatorio · dataset abierto · curado a {META.curado}
          </span>

          <h1 className="max-w-[20ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Observatorio de <span className="text-teal">IA Financiera</span> en
            América Latina
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-fg/80">
            El campo del observatorio son las{" "}
            <b className="font-semibold text-fg">finanzas emergentes</b> — un
            mundo muy amplio. Dentro de ese universo, el foco de esta etapa es{" "}
            <b className="font-semibold text-fg">fintech y la IA financiera</b>:
            métricas neutrales de inclusión, <b className="font-semibold text-fg">pagos</b>,
            adopción de IA, fraude, tokenización y regulación —más un{" "}
            <b className="font-semibold text-fg">Índice de Confianza Financiera</b>{" "}
            para 21 economías—, leídas siempre como{" "}
            <b className="font-semibold text-fg">LatAm frente al mundo</b> y
            filtrables por tipo de actor. Metodología abierta: el insumo para
            papers y política pública que hoy nadie produce de forma
            independiente.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-fg/60">
            <span>
              Campo: <b className="text-teal">Finanzas emergentes → fintech</b>
            </span>
            <span>
              Eje: <b className="text-teal">LatAm vs. el mundo</b>
            </span>
            <span>
              Alcance: <b className="text-teal">6 países + panel de 21</b>
            </span>
            <span>
              Pilares: <b className="text-teal">6</b>
            </span>
            <span>
              Lentes: <b className="text-teal">6 actores</b>
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#indice"
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
            >
              Ver el índice
            </a>
            <a
              href="#datos"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
            >
              Descargar dataset
            </a>
            <a
              href="/presentacion"
              className="rounded-full border border-lime/40 px-5 py-2.5 text-sm font-semibold text-lime transition hover:bg-lime/10"
            >
              ¿Por qué un observatorio? →
            </a>
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
            Ocho señales que enmarcan el ecosistema
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
                  Nuevo en v4
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
                  { k: "498", l: "pagos inmediatos por adulto al año en Brasil", c: "#E8825A" },
                  { k: "46", l: "en Colombia: el riel es nuevo, no maduro", c: "#E8825A" },
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
            Cinco pilares
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
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
