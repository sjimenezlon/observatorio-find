import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import { NavBar } from "@/components/NavBar";
import Brecha from "@/components/Brecha";
import MapaIndice from "@/components/MapaIndice";
import GlobalBenchmarks from "@/components/GlobalBenchmarks";
import PiePagina from "@/components/PiePagina";
import { FUENTES, META, NOVEDADES_CORTE, PILARES } from "@/data/dataset";
import { DINAMICA, DINAMICA_STATS, TENDENCIAS } from "@/data/lentes";

export const metadata: Metadata = {
  title: "Índice IIIF · Observatorio Find",
  description:
    "Ranking del Índice Integral de Innovación Financiera: pesos ajustables, ficha por país, duelo, simulador y mapa regional.",
};

export default function Indice() {
  return (
    <main>
      <NavBar />

      <header className="vhead">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow-v">Índice Integral de Innovación Financiera · IIIF</p>
          <h1>
            Ranking, pesos <span>y escenarios</span>
          </h1>
          <p className="lead">
            El IIIF promedia {META.pilares} pilares normalizados de 0 a 100. Ajuste los pesos, revise la
            ficha de cada país, enfrente dos países y simule escenarios. Corte {META.version} · {META.curado}.
          </p>
        </div>
      </header>

      <section className="border-b border-white/8 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-lime">
                Qué cambió en {META.version}
              </div>
              <p className="mt-1 text-sm text-fg/80">
                Corte de {META.curado}. Los deltas ya son comparables con agosto.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NOVEDADES_CORTE.map((n) => (
              <a
                key={n.texto}
                href={n.href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-lime/35"
              >
                <div className="font-mono text-lg font-semibold tracking-tight text-lime">
                  {n.cifra}
                </div>
                <p className="mt-1 text-[12px] leading-snug text-fg/75">{n.texto}</p>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* DASHBOARD */}
      <div id="ranking" className="mx-auto max-w-6xl px-6 py-16">
        <Dashboard />
      </div>


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
                    color: "#C2552C",
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
                  style={{ background: "#C2552C" }}
                >
                  Abrir el módulo de pagos y confianza →
                </a>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/8">
                {[
                  { k: "502", l: "pagos inmediatos por adulto al año en Brasil", c: "#C2552C" },
                  { k: "70", l: "en Colombia: el riel aceleró, todavía lejos de Brasil", c: "#C2552C" },
                  { k: "6 de 10", l: "créditos de la región son informales", c: "#12866B" },
                  { k: "último", l: "lugar de Colombia en confianza (ICF) entre 16 países medibles", c: "#C23A62" },
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
      <section id="pilares" className="border-b border-white/8">
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


      <PiePagina />
    </main>
  );
}
