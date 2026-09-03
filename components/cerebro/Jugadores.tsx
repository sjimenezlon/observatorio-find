"use client";

import { useMemo, useState } from "react";
import { BANDERA, NOMBRE_PAIS, NOMBRE_SEGMENTO, type Jugador, type PaisCerebro, type Segmento } from "@/data/cerebro/tipos";
import { fecha, num, usdM } from "@/lib/cerebro/formato";
import { Chip } from "./ui";

type Orden = "valoracion" | "ronda" | "usuarios" | "nombre" | "fundacion";

const ESTADO: Record<Jugador["estado"], string> = { privada: "Privada", cotiza: "Cotiza", adquirida: "Adquirida", cerrada: "Cerrada" };

export default function Jugadores({ datos }: { datos: Jugador[] }) {
  const [pais, setPais] = useState<string>("todos");
  const [segmento, setSegmento] = useState<string>("todos");
  const [estado, setEstado] = useState<string>("todos");
  const [unicornios, setUnicornios] = useState(false);
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<Orden>("valoracion");

  const porPais = useMemo(() => {
    const m = new Map<string, number>();
    for (const j of datos) m.set(j.pais, (m.get(j.pais) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [datos]);
  const porSegmento = useMemo(() => {
    const m = new Map<string, number>();
    for (const j of datos) m.set(j.segmento, (m.get(j.segmento) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [datos]);

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    const xs = datos.filter(
      (j) =>
        (pais === "todos" || j.pais === pais) &&
        (segmento === "todos" || j.segmento === segmento) &&
        (estado === "todos" || j.estado === estado) &&
        (!unicornios || j.unicornio) &&
        (!t || `${j.nombre} ${j.descripcion} ${j.subsegmento ?? ""} ${j.ciudad ?? ""}`.toLowerCase().includes(t)),
    );
    const v = (x: number | null | undefined) => x ?? -1;
    xs.sort((a, b) => {
      switch (orden) {
        case "valoracion":
          return v(b.valoracion_usd_m) - v(a.valoracion_usd_m) || a.nombre.localeCompare(b.nombre);
        case "ronda":
          return (b.ultima_ronda?.fecha ?? "").localeCompare(a.ultima_ronda?.fecha ?? "") || v(b.ultima_ronda?.monto_usd_m) - v(a.ultima_ronda?.monto_usd_m);
        case "usuarios":
          return v(b.usuarios_m) - v(a.usuarios_m);
        case "fundacion":
          return v(a.fundacion) - v(b.fundacion);
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });
    return xs;
  }, [datos, pais, segmento, estado, unicornios, q, orden]);

  const select = "rounded-full border border-white/18 bg-black/25 px-3 py-1.5 text-[11.5px] text-fg outline-none focus:border-lime";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Chip activo={pais === "todos"} onClick={() => setPais("todos")}>
          Todos <span className="opacity-60">{datos.length}</span>
        </Chip>
        {porPais.map(([p, n]) => (
          <Chip key={p} activo={pais === p} onClick={() => setPais(p)}>
            {BANDERA[p as PaisCerebro]} {NOMBRE_PAIS[p as PaisCerebro] ?? p} <span className="opacity-60">{n}</span>
          </Chip>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select className={select} value={segmento} onChange={(e) => setSegmento(e.target.value)} aria-label="Segmento">
          <option value="todos">Todos los segmentos</option>
          {porSegmento.map(([s, n]) => (
            <option key={s} value={s}>
              {NOMBRE_SEGMENTO[s as Segmento] ?? s} ({n})
            </option>
          ))}
        </select>
        <select className={select} value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado">
          <option value="todos">Cualquier estado</option>
          {(Object.keys(ESTADO) as Jugador["estado"][]).map((k) => (
            <option key={k} value={k}>
              {ESTADO[k]}
            </option>
          ))}
        </select>
        <Chip activo={unicornios} onClick={() => setUnicornios((u) => !u)}>
          Solo unicornios
        </Chip>
        <select className={select} value={orden} onChange={(e) => setOrden(e.target.value as Orden)} aria-label="Orden">
          <option value="valoracion">Por valoración</option>
          <option value="ronda">Por última ronda</option>
          <option value="usuarios">Por usuarios</option>
          <option value="fundacion">Por fundación</option>
          <option value="nombre">Por nombre</option>
        </select>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar nombre, ciudad, producto…"
          className={`${select} min-w-[220px] flex-1`}
          aria-label="Buscar"
        />
      </div>
      <div className="mt-4 text-xs text-muted">
        {filtrados.length} de {datos.length} jugadores
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((j) => (
          <li key={j.id} className="card flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-bold leading-tight">
                  {BANDERA[j.pais]} {j.nombre}
                  {j.ticker ? <span className="ml-2 rounded-full border border-white/20 px-2 py-[1px] font-mono text-[9px] text-muted">{j.ticker}</span> : null}
                </div>
                <div className="mt-1 text-[11px] text-muted">
                  {j.ciudad ? `${j.ciudad} · ` : ""}
                  {j.fundacion ?? "s. f."}
                </div>
              </div>
              {j.unicornio ? <span className="shrink-0 rounded-full bg-lime px-2 py-[2px] font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#322180]">Unicornio</span> : null}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-lime/40 px-2 py-[2px] text-[10px] font-semibold text-lime">{NOMBRE_SEGMENTO[j.segmento] ?? j.segmento}</span>
              {j.subsegmento ? <span className="rounded-full border border-white/18 px-2 py-[2px] text-[10px] text-fg/80">{j.subsegmento}</span> : null}
              <span className="rounded-full border border-white/18 px-2 py-[2px] text-[10px] text-fg/70">{ESTADO[j.estado]}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-fg/80">{j.descripcion}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-[11px]">
              <div>
                <dt className="text-muted">Valoración</dt>
                <dd className="tabnum font-semibold">{usdM(j.valoracion_usd_m)}</dd>
                {j.valoracion_fecha ? (
                  <dd className="text-[10px] text-muted">
                    {fecha(j.valoracion_fecha)}
                    {j.valoracion_nota ? ` · ${j.valoracion_nota}` : ""}
                  </dd>
                ) : null}
              </div>
              <div>
                <dt className="text-muted">Última ronda</dt>
                <dd className="tabnum font-semibold">{j.ultima_ronda ? `${j.ultima_ronda.tipo} · ${usdM(j.ultima_ronda.monto_usd_m)}` : "s. d."}</dd>
                {j.ultima_ronda?.fecha ? <dd className="text-[10px] text-muted">{fecha(j.ultima_ronda.fecha)}</dd> : null}
              </div>
              <div>
                <dt className="text-muted">Usuarios</dt>
                <dd className="tabnum font-semibold">{j.usuarios_m !== null ? `${num(j.usuarios_m, j.usuarios_m < 10 ? 1 : 0)} M` : "s. d."}</dd>
                {j.usuarios_nota ? <dd className="text-[10px] leading-snug text-muted">{j.usuarios_nota}</dd> : null}
              </div>
            </dl>
            {j.ultima_ronda?.inversores?.length ? (
              <div className="mt-2 text-[10.5px] text-muted">Inversores: {j.ultima_ronda.inversores.slice(0, 4).join(", ")}{j.ultima_ronda.inversores.length > 4 ? "…" : ""}</div>
            ) : null}
            <a href={j.url} target="_blank" rel="noreferrer" className="mt-auto pt-3 text-[10.5px] text-muted hover:text-lime">
              {j.fuente} · {j.anio} ↗{j.url_nota ? ` · ${j.url_nota}` : ""}
            </a>
          </li>
        ))}
      </ul>
      {!filtrados.length ? <p className="mt-6 text-sm text-muted">Ningún jugador coincide con ese filtro.</p> : null}
    </div>
  );
}
