"use client";

import { useMemo, useState } from "react";
import { FOCOS, AGENDA, ESTADOS, FocoKey, Estado } from "@/data/agenda";

export default function Agenda() {
  const [foco, setFoco] = useState<FocoKey>("desarrollo");
  const [estado, setEstado] = useState<Estado | "todos">("todos");

  const f = FOCOS.find((x) => x.key === foco)!;
  const items = useMemo(
    () =>
      AGENDA.filter(
        (i) => i.foco === foco && (estado === "todos" || i.estado === estado)
      ),
    [foco, estado]
  );

  const conteo = (k: Estado) => AGENDA.filter((i) => i.estado === k).length;

  return (
    <div>
      {/* resumen */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <div className="tabnum text-3xl font-extrabold text-teal">12</div>
          <p className="mt-1 text-[13px] text-muted">
            indicadores <b className="text-fg/80">ya operando</b> en el IIIF
            v3, mapeados a los focos del Centro.
          </p>
        </div>
        <div className="card p-5">
          <div className="tabnum text-3xl font-extrabold text-lime">
            {conteo("proximo-corte")}
          </div>
          <p className="mt-1 text-[13px] text-muted">
            indicadores con <b className="text-fg/80">fuente pública identificada</b>{" "}
            que entran en cortes próximos.
          </p>
        </div>
        <div className="card p-5">
          <div className="tabnum text-3xl font-extrabold text-amber">
            {conteo("por-construir")}
          </div>
          <p className="mt-1 text-[13px] text-muted">
            indicadores <b className="text-fg/80">por construir</b>: la agenda de
            investigación propia del Centro.
          </p>
        </div>
      </div>

      {/* selector de foco */}
      <div className="mb-3 flex flex-wrap gap-2">
        {FOCOS.map((x) => {
          const on = x.key === foco;
          return (
            <button
              key={x.key}
              onClick={() => setFoco(x.key)}
              className="rounded-full border px-4 py-2 text-sm font-semibold transition"
              style={{
                background: on ? `${x.color}22` : "transparent",
                borderColor: on ? x.color : "rgba(255,255,255,0.14)",
                color: on ? x.color : "#8fa9a1",
              }}
            >
              {x.corto}
            </button>
          );
        })}
      </div>

      {/* filtro por estado */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5 text-xs">
        <button
          onClick={() => setEstado("todos")}
          className="rounded-full border px-3 py-1 font-medium transition"
          style={{
            borderColor: estado === "todos" ? "#eaf3ef" : "rgba(255,255,255,0.14)",
            color: estado === "todos" ? "#eaf3ef" : "#8fa9a1",
          }}
        >
          Todos
        </button>
        {(Object.keys(ESTADOS) as Estado[])
          .filter((k) => k !== "operando")
          .map((k) => {
            const on = estado === k;
            return (
              <button
                key={k}
                onClick={() => setEstado(on ? "todos" : k)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium transition"
                style={{
                  borderColor: on ? ESTADOS[k].color : "rgba(255,255,255,0.14)",
                  color: on ? ESTADOS[k].color : "#8fa9a1",
                  background: on ? `${ESTADOS[k].color}18` : "transparent",
                }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: ESTADOS[k].color }}
                />
                {ESTADOS[k].label}
              </button>
            );
          })}
      </div>

      {/* panel del foco */}
      <div
        className="card mb-6 p-6"
        style={{ borderTop: `3px solid ${f.color}` }}
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="text-xl font-extrabold" style={{ color: f.color }}>
              {f.nombre}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-fg/80">
              {f.mision}
            </p>
            <div className="mt-4">
              <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Líneas de investigación del Centro
              </div>
              <ul className="space-y-1 text-[13px] text-muted">
                {f.lineas.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span style={{ color: f.color }}>—</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
              Lo que el IIIF ya mide en este foco
            </div>
            {f.proxiesIMIAF.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {f.proxiesIMIAF.map((p) => (
                  <a
                    key={p.key}
                    href="/#pilares"
                    className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-[12px] font-medium text-teal transition hover:bg-teal/20"
                  >
                    {p.label} ✓
                  </a>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-amber/30 bg-amber/10 px-3 py-2 text-[13px] text-amber">
                Vacío de medición hoy: este foco entra al observatorio con los
                indicadores de abajo. Ahí está la oportunidad.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* indicadores a construir */}
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((i) => {
          const e = ESTADOS[i.estado];
          return (
            <div
              key={i.nombre}
              className="card flex flex-col p-6"
              style={i.bandera ? { borderColor: `${f.color}55` } : undefined}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-bold text-fg">
                  {i.nombre}
                  {i.bandera && (
                    <span
                      className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold align-middle"
                      style={{ background: `${f.color}22`, color: f.color }}
                    >
                      indicador bandera
                    </span>
                  )}
                </h4>
              </div>
              <p className="mt-2 text-[13px] italic leading-relaxed text-fg/75">
                “{i.pregunta}”
              </p>
              <div className="mt-3 space-y-1.5 text-[12px] leading-relaxed text-muted">
                <div>
                  <b className="text-fg/75">Unidad:</b> {i.unidad}
                </div>
                <div>
                  <b className="text-fg/75">Método:</b> {i.metodo}
                </div>
                <div>
                  <b className="text-fg/75">Fuentes:</b> {i.fuentes}
                </div>
              </div>
              <div className="mt-auto pt-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: `${e.color}1c`, color: e.color }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: e.color }}
                  />
                  {e.label}
                </span>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-sm text-muted">
            No hay indicadores de este foco en el estado seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
