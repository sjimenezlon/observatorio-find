"use client";

import { useMemo, useState } from "react";
import { BANDERA, NOMBRE_PAIS, type Biblioteca as Datos, type PaisCerebro } from "@/data/cerebro/tipos";
import { fecha } from "@/lib/cerebro/formato";
import { Chip } from "./ui";

type Pestana = "reportes" | "directorio" | "eventos" | "fuentes" | "glosario";

const PESTANAS: Array<{ k: Pestana; label: string }> = [
  { k: "reportes", label: "Reportes" },
  { k: "directorio", label: "Directorio" },
  { k: "eventos", label: "Eventos" },
  { k: "fuentes", label: "Fuentes de datos" },
  { k: "glosario", label: "Glosario" },
];

const bandera = (p: string | null | undefined) => (p && p in BANDERA ? `${BANDERA[p as PaisCerebro]} ${NOMBRE_PAIS[p as PaisCerebro]}` : p ?? "");

export default function Biblioteca({ datos }: { datos: Datos }) {
  const [pestana, setPestana] = useState<Pestana>("reportes");
  const [q, setQ] = useState("");
  const [tema, setTema] = useState("todos");
  const [tipo, setTipo] = useState("todos");
  const t = q.trim().toLowerCase();
  const coincide = (s: string) => !t || s.toLowerCase().includes(t);

  const temas = useMemo(() => [...new Set(datos.reportes.map((r) => r.tema))].sort(), [datos.reportes]);
  const tiposDir = useMemo(() => [...new Set(datos.directorio.map((e) => e.tipo))].sort(), [datos.directorio]);

  const reportes = datos.reportes
    .filter((r) => (tema === "todos" || r.tema === tema) && coincide(`${r.titulo} ${r.institucion} ${r.resumen} ${r.cifras.join(" ")}`))
    .sort((a, b) => b.anio - a.anio || a.institucion.localeCompare(b.institucion));
  const directorio = datos.directorio
    .filter((e) => (tipo === "todos" || e.tipo === tipo) && coincide(`${e.nombre} ${e.sigla ?? ""} ${e.que} ${e.pais}`))
    .sort((a, b) => a.tipo.localeCompare(b.tipo) || a.nombre.localeCompare(b.nombre));
  const hoy = new Date().toISOString().slice(0, 10);
  const eventos = datos.eventos.filter((e) => coincide(`${e.nombre} ${e.ciudad ?? ""} ${e.organizador ?? ""}`)).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const fuentes = datos.fuentes_datos.filter((f) => coincide(`${f.nombre} ${f.que} ${f.acceso}`));
  const glosario = datos.glosario.filter((g) => coincide(`${g.termino} ${g.definicion}`)).sort((a, b) => a.termino.localeCompare(b.termino));

  const conteo: Record<Pestana, number> = {
    reportes: datos.reportes.length,
    directorio: datos.directorio.length,
    eventos: datos.eventos.length,
    fuentes: datos.fuentes_datos.length,
    glosario: datos.glosario.length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {PESTANAS.map((p) => (
          <Chip key={p.k} activo={pestana === p.k} onClick={() => setPestana(p.k)}>
            {p.label} <span className="opacity-60">{conteo[p.k]}</span>
          </Chip>
        ))}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar…"
          aria-label="Buscar en la biblioteca"
          className="ml-auto min-w-[220px] rounded-full border border-white/18 bg-black/25 px-4 py-1.5 text-[11.5px] text-fg outline-none focus:border-lime"
        />
      </div>

      {pestana === "reportes" ? (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <Chip activo={tema === "todos"} onClick={() => setTema("todos")}>
              Todos los temas
            </Chip>
            {temas.map((x) => (
              <Chip key={x} activo={tema === x} onClick={() => setTema(x)}>
                {x}
              </Chip>
            ))}
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {reportes.map((r) => (
              <li key={r.url} className="card flex flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted">
                  <span className="rounded-full border border-lime/40 px-2 py-[1px] font-semibold text-lime">{r.anio}</span>
                  <span className="rounded-full border border-white/15 px-2 py-[1px] font-mono uppercase tracking-[0.1em]">{r.tipo}</span>
                  <span>{r.tema}</span>
                  <span>· {bandera(r.alcance) || r.alcance}</span>
                </div>
                <a href={r.url} target="_blank" rel="noreferrer" className="mt-2 text-sm font-bold leading-snug hover:text-lime">
                  {r.titulo} ↗
                </a>
                <div className="mt-1 text-xs text-fg/70">{r.institucion}</div>
                <p className="mt-2 text-xs leading-relaxed text-fg/85">{r.resumen}</p>
                {r.cifras.length ? (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {r.cifras.map((c) => (
                      <li key={c} className="rounded-md bg-white/[0.06] px-2 py-[2px] text-[10.5px] text-fg/85">
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {r.url_nota ? <div className="mt-2 text-[10px] text-amber">{r.url_nota}</div> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {pestana === "directorio" ? (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            <Chip activo={tipo === "todos"} onClick={() => setTipo("todos")}>
              Todos
            </Chip>
            {tiposDir.map((x) => (
              <Chip key={x} activo={tipo === x} onClick={() => setTipo(x)}>
                {x}
              </Chip>
            ))}
          </div>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {directorio.map((e) => (
              <li key={e.url + e.nombre} className="rounded-xl border border-white/12 bg-white/[0.03] p-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <a href={e.url} target="_blank" rel="noreferrer" className="font-semibold leading-snug hover:text-lime">
                    {e.nombre}
                    {e.sigla ? <span className="ml-1 font-mono text-[10px] text-lime">{e.sigla}</span> : null} ↗
                  </a>
                  <span className="shrink-0 rounded-full border border-white/15 px-2 py-[1px] font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{e.tipo}</span>
                </div>
                <div className="mt-1 text-[10.5px] text-muted">{bandera(e.pais)}</div>
                <p className="mt-1 leading-relaxed text-fg/80">{e.que}</p>
                <div className="mt-1.5 flex gap-3 text-[10px] text-muted">
                  {e.rss ? (
                    <a href={e.rss} target="_blank" rel="noreferrer" className="hover:text-lime">
                      RSS ↗
                    </a>
                  ) : null}
                  {e.datos_abiertos ? (
                    <a href={e.datos_abiertos} target="_blank" rel="noreferrer" className="hover:text-lime">
                      Datos abiertos ↗
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {pestana === "eventos" ? (
        <ul className="mt-6 divide-y divide-white/8 rounded-2xl border border-white/12">
          {eventos.map((e) => (
            <li key={e.url + e.fecha} className={`grid gap-1 px-4 py-3 text-xs sm:grid-cols-[150px_minmax(0,1fr)] ${e.fecha < hoy.slice(0, e.fecha.length) ? "opacity-50" : ""}`}>
              <span className="tabnum text-muted">
                {fecha(e.fecha)}
                {e.fecha_fin && e.fecha_fin !== e.fecha ? ` – ${fecha(e.fecha_fin)}` : ""}
              </span>
              <span>
                <a href={e.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-lime">
                  {e.nombre} ↗
                </a>
                <span className="text-muted">
                  {" "}
                  · {e.ciudad ?? ""} {bandera(e.pais)}
                  {e.organizador ? ` · ${e.organizador}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {pestana === "fuentes" ? (
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {fuentes.map((f) => (
            <li key={f.url} className="card p-4 text-xs">
              <div className="flex items-start justify-between gap-2">
                <a href={f.url} target="_blank" rel="noreferrer" className="text-sm font-bold leading-snug hover:text-lime">
                  {f.nombre} ↗
                </a>
                <span className="shrink-0 text-[10.5px] text-muted">{bandera(f.pais)}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-fg/85">{f.que}</p>
              <div className="mt-2 flex flex-wrap gap-x-3 text-[10.5px] text-muted">
                <span className="text-lime">{f.acceso}</span>
                {f.frecuencia ? <span>{f.frecuencia}</span> : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {pestana === "glosario" ? (
        <dl className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {glosario.map((g) => (
            <div key={g.termino} className="border-b border-white/8 pb-3">
              <dt className="text-sm font-bold">
                {g.termino}
                {g.pais ? <span className="ml-2 text-[10.5px] font-normal text-muted">{bandera(g.pais)}</span> : null}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-fg/85">{g.definicion}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
