"use client";

import { useMemo, useState } from "react";
import type { Noticia, Pulso as PulsoDatos, Tema } from "@/lib/cerebro/vivo/noticias";
import { BANDERA, NOMBRE_PAIS, type PaisCerebro } from "@/data/cerebro/tipos";
import { hace } from "@/lib/cerebro/formato";
import { Chip } from "./ui";

const TEMAS: Array<{ k: Tema | "todos"; label: string }> = [
  { k: "todos", label: "Todo" },
  { k: "inversion", label: "Inversión" },
  { k: "regulacion", label: "Regulación" },
  { k: "pagos", label: "Pagos" },
  { k: "cripto", label: "Cripto" },
  { k: "producto", label: "Producto" },
  { k: "general", label: "General" },
];

export default function Pulso({ datos }: { datos: PulsoDatos }) {
  const [pais, setPais] = useState<string>("todos");
  const [tema, setTema] = useState<Tema | "todos">("todos");
  const [limite, setLimite] = useState(40);

  const paises = useMemo(() => Object.entries(datos.porPais).sort((a, b) => b[1] - a[1]), [datos.porPais]);
  const filtradas = useMemo(
    () => datos.noticias.filter((n) => (pais === "todos" || n.pais === pais) && (tema === "todos" || n.tema === tema)),
    [datos.noticias, pais, tema],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <div className="flex flex-wrap gap-2">
          <Chip activo={pais === "todos"} onClick={() => setPais("todos")}>
            Todos los países
          </Chip>
          {paises.map(([p, n]) => (
            <Chip key={p} activo={pais === p} onClick={() => setPais(p)}>
              {BANDERA[p as PaisCerebro] ?? ""} {NOMBRE_PAIS[p as PaisCerebro] ?? p} <span className="opacity-60">{n}</span>
            </Chip>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TEMAS.map((t) => (
            <Chip key={t.k} activo={tema === t.k} onClick={() => setTema(t.k)}>
              {t.label} {t.k !== "todos" ? <span className="opacity-60">{datos.porTema[t.k]}</span> : null}
            </Chip>
          ))}
        </div>

        <ol className="mt-6 divide-y divide-white/8 rounded-2xl border border-white/12 bg-white/[0.03]">
          {filtradas.slice(0, limite).map((n: Noticia) => (
            <li key={n.url} className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-start">
              <div>
                <a href={n.url} target="_blank" rel="noreferrer" className="text-[14px] font-medium leading-snug text-fg hover:text-lime">
                  {n.titulo}
                </a>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
                  <span className="font-semibold text-fg/70">{n.medio}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {BANDERA[n.pais as PaisCerebro] ?? ""} {NOMBRE_PAIS[n.pais as PaisCerebro] ?? n.pais}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="rounded-full border border-white/15 px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em]">{n.tema}</span>
                </div>
              </div>
              <div className="tabnum text-[11px] text-muted sm:text-right">{hace(n.fecha)}</div>
            </li>
          ))}
          {!filtradas.length ? <li className="px-4 py-6 text-sm text-muted">Ningún titular con ese filtro en los últimos 14 días.</li> : null}
        </ol>
        {filtradas.length > limite ? (
          <button type="button" onClick={() => setLimite((l) => l + 40)} className="action-secondary mt-4 px-4 py-2 text-xs">
            Ver 40 más ({filtradas.length - limite} restantes)
          </button>
        ) : null}
      </div>

      <aside className="space-y-4">
        <div className="card p-5">
          <div className="data-label text-muted">Los medios que más publican</div>
          <ol className="mt-3 space-y-1.5 text-xs">
            {datos.medios.map((m) => (
              <li key={m.medio} className="flex items-center justify-between gap-2">
                <span className="truncate text-fg/85">{m.medio}</span>
                <span className="tabnum text-muted">{m.n}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="card p-5 text-xs leading-relaxed text-fg/75">
          <div className="data-label text-muted">Cómo leerlo</div>
          <p className="mt-2">
            {datos.consultas} consultas a Google News (una por país y cuatro temáticas), últimos 14 días, sin duplicados. El tema lo asigna una
            regla de palabras clave del Observatorio: sirve para filtrar, no para contar.
          </p>
          {datos.fallidas ? <p className="mt-2 text-amber">{datos.fallidas} consultas no respondieron en esta regeneración.</p> : null}
        </div>
      </aside>
    </div>
  );
}
