"use client";

import { useMemo, useState } from "react";
import { BANDERA, NOMBRE_PAIS, type Hito, type PaisCerebro } from "@/data/cerebro/tipos";
import { fecha } from "@/lib/cerebro/formato";
import { Chip } from "./ui";

const TIPOS: Record<string, string> = {
  regulacion: "Regulación",
  riel: "Rieles de pago",
  licencia: "Licencias",
  cripto: "Cripto",
  "open-finance": "Open finance",
  mercado: "Mercado",
};

export default function Hitos({ datos }: { datos: Hito[] }) {
  const [tipo, setTipo] = useState("todos");
  const [pais, setPais] = useState("todos");
  const tipos = useMemo(() => [...new Set(datos.map((h) => h.tipo))], [datos]);
  const paises = useMemo(() => [...new Set(datos.map((h) => h.pais))].sort(), [datos]);
  const lista = useMemo(
    () => datos.filter((h) => (tipo === "todos" || h.tipo === tipo) && (pais === "todos" || h.pais === pais)).sort((a, b) => b.fecha.localeCompare(a.fecha)),
    [datos, tipo, pais],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip activo={tipo === "todos"} onClick={() => setTipo("todos")}>
          Todos los tipos
        </Chip>
        {tipos.map((t) => (
          <Chip key={t} activo={tipo === t} onClick={() => setTipo(t)}>
            {TIPOS[t] ?? t}
          </Chip>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Chip activo={pais === "todos"} onClick={() => setPais("todos")}>
          Todos los países
        </Chip>
        {paises.map((p) => (
          <Chip key={p} activo={pais === p} onClick={() => setPais(p)}>
            {BANDERA[p as PaisCerebro]} {p}
          </Chip>
        ))}
      </div>
      <ol className="mt-6 space-y-3 border-l border-white/15 pl-5">
        {lista.map((h) => (
          <li key={`${h.fecha}-${h.titulo}`} className="relative">
            <span className="absolute -left-[27px] top-2 h-3 w-3 rounded-full border-2 border-lime bg-[#3d24be]" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-muted">
              <span className="tabnum">{fecha(h.fecha)}</span>
              <span>
                {BANDERA[h.pais]} {NOMBRE_PAIS[h.pais]}
              </span>
              <span className="rounded-full border border-white/15 px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em]">{TIPOS[h.tipo] ?? h.tipo}</span>
            </div>
            <div className="mt-1 text-sm font-semibold">{h.titulo}</div>
            {h.detalle ? <p className="mt-1 text-xs leading-relaxed text-fg/80">{h.detalle}</p> : null}
            <a href={h.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[10.5px] text-muted hover:text-lime">
              {h.fuente} ↗
            </a>
          </li>
        ))}
      </ol>
      {!lista.length ? <p className="mt-4 text-sm text-muted">Ningún hito con ese filtro.</p> : null}
    </div>
  );
}
