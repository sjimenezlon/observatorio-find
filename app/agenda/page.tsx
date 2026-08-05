import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import Agenda from "@/components/Agenda";
import { FOCOS, AGENDA } from "@/data/agenda";
import { META } from "@/data/dataset";

export const metadata: Metadata = {
  title: "Agenda de medición · Observatorio Find",
  description:
    "Los 5 focos del Centro de Innovación Financiera de EAFIT como pilares del observatorio: bienestar financiero, impacto, conducta, fintech y seguridad — con los indicadores que vamos a construir.",
};

export default function AgendaPage() {
  const totalNuevos = AGENDA.length;
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <span className="mb-5 inline-block rounded-full border border-lime/35 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
            Agenda de medición · Centro de Innovación Financiera · EAFIT
          </span>
          <h1 className="max-w-[24ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Del IMIAF al tablero completo:{" "}
            <span className="text-teal">
              los pilares que vamos a construir
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-fg/80">
            El Centro de Innovación Financiera trabaja cinco focos estratégicos
            — finanzas para el desarrollo, sostenibles y climáticas,
            conductuales, emergentes y seguras. El observatorio es su
            instrumento de medición: el IMIAF ya cubre el foco de{" "}
            <b className="font-semibold text-fg">
              finanzas emergentes (donde vive fintech)
            </b>{" "}
            y parte de desarrollo y seguras; esta agenda define los{" "}
            <b className="font-semibold text-fg">
              {totalNuevos} indicadores nuevos
            </b>{" "}
            — bienestar financiero, impacto, sesgos, interoperabilidad — con
            qué método y qué fuentes.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-fg/60">
            <span>
              Pilares: <b className="text-teal">{FOCOS.length} focos del Centro</b>
            </span>
            <span>
              En agenda: <b className="text-teal">{totalNuevos} indicadores</b>
            </span>
            <span>
              Operando hoy: <b className="text-teal">IMIAF v3 (12 indicadores)</b>
            </span>
          </div>
        </div>
      </header>

      {/* AGENDA INTERACTIVA */}
      <section className="bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <Agenda />
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Reglas del juego
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Cómo se construye cada indicador
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Pregunta antes que dato",
                d: "Cada indicador nace de una pregunta de investigación del Centro, no de la disponibilidad del dato. El dato se persigue después.",
              },
              {
                t: "Misma vara para los seis",
                d: "Un indicador entra al índice solo cuando es comparable entre los seis países; mientras tanto se publica como serie nacional.",
              },
              {
                t: "Método abierto y replicable",
                d: "Como en el IMIAF: fuente, año, dirección y método publicados; los índices construidos se marcan explícitamente y se someten a crítica.",
              },
              {
                t: "Del proxy al instrumento propio",
                d: "Se parte del mejor dato público (Findex, gremios, supervisores) y se evoluciona a mediciones propias: encuestas, auditorías y protocolos del Centro.",
              },
            ].map((p) => (
              <div key={p.t} className="card p-6">
                <h3 className="font-bold text-fg">{p.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>

          <div
            className="card mt-10 p-8 text-center"
            style={{
              background:
                "linear-gradient(120deg, rgba(31,201,160,0.12), rgba(108,92,214,0.10))",
            }}
          >
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
              El IMIAF fue el primer paso. Esta agenda es el mapa de los
              siguientes.
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href="/#indice"
                className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
              >
                Ver el IMIAF vigente
              </a>
              <a
                href="/presentacion"
                className="rounded-full border border-teal/50 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                La presentación y el aliado →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-lg font-extrabold tracking-tight text-fg">
              fin<span className="text-lime">d</span>
            </span>
            <a href="/metodologia" className="text-teal hover:underline">
              Metodología completa →
            </a>
          </div>
          <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-muted/80">
            {META.marca} · {META.institucion}. El marco de focos proviene del
            Centro de Innovación Financiera (EAFIT); los indicadores en agenda
            son propuestas de medición del observatorio y pueden ajustarse al
            priorizar con aliados. Curado a {META.curado}.
          </p>
        </div>
      </footer>
    </main>
  );
}
