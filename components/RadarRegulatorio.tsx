"use client";

import { useMemo, useState } from "react";
import { MEDIDAS } from "@/data/frontera";

const ESTATUS: Record<string, { color: string; desc: string }> = {
  Vigente: { color: "#1FC9A0", desc: "en aplicación" },
  "En curso": { color: "#E8B452", desc: "adoptado con transición, o en proceso activo" },
  Propuesto: { color: "#5BD0E0", desc: "iniciativa sin aprobar" },
  Revertido: { color: "#FF7A9E", desc: "anulado o desregulado" },
};

const EJE_COLOR: Record<string, string> = {
  Innovación: "#5BD0E0",
  Inclusión: "#1FC9A0",
  Crédito: "#E8B452",
};

const ORDEN_ESTATUS = ["Vigente", "En curso", "Propuesto", "Revertido"];

export default function RadarRegulatorio() {
  const [eje, setEje] = useState<string | null>(null);
  const [estatus, setEstatus] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [categoria, setCategoria] = useState<string | null>(null);

  const regiones = useMemo(
    () => [...new Set(MEDIDAS.map((m) => m.jurisdiccion))],
    []
  );
  const categorias = useMemo(
    () => [...new Set(MEDIDAS.flatMap((m) => m.categorias))].sort(),
    []
  );
  const ejes = useMemo(
    () => [...new Set(MEDIDAS.flatMap((m) => m.ejes))],
    []
  );

  const filtradas = useMemo(
    () =>
      MEDIDAS.filter(
        (m) =>
          (!eje || m.ejes.includes(eje)) &&
          (!estatus || m.estatus === estatus) &&
          (!region || m.jurisdiccion === region) &&
          (!categoria || m.categorias.includes(categoria))
      ).sort(
        (a, b) =>
          ORDEN_ESTATUS.indexOf(a.estatus) - ORDEN_ESTATUS.indexOf(b.estatus)
      ),
    [eje, estatus, region, categoria]
  );

  const hayFiltro = eje || estatus || region || categoria;
  const limpiar = () => {
    setEje(null);
    setEstatus(null);
    setRegion(null);
    setCategoria(null);
  };

  return (
    <section id="radar" className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan">
          Mapa de cambios regulatorios · 2025–2026
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          Lo que ya se decidió — en otra parte
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          {MEDIDAS.length} medidas vigentes o en curso con impacto sobre la
          innovación, la inclusión y el acceso al crédito.{" "}
          <b className="font-semibold text-fg">
            Ninguna es colombiana y solo una es brasileña
          </b>
          : la frontera regulatoria de los pagos se está escribiendo en Bruselas,
          Washington, Londres y Ciudad de México. Cada tarjeta separa el hecho
          verificable de su lectura de impacto.
        </p>

        {/* filtros */}
        <div className="card mb-6 space-y-3 p-4">
          <Fila titulo="Eje" activo={eje} set={setEje} items={ejes} colores={EJE_COLOR} />
          <Fila
            titulo="Estatus"
            activo={estatus}
            set={setEstatus}
            items={ORDEN_ESTATUS}
            colores={Object.fromEntries(
              Object.entries(ESTATUS).map(([k, v]) => [k, v.color])
            )}
          />
          <Fila titulo="Región" activo={region} set={setRegion} items={regiones} />
          <Fila
            titulo="Categoría"
            activo={categoria}
            set={setCategoria}
            items={categorias}
          />
          <div className="flex items-center justify-between border-t border-white/8 pt-3">
            <span className="text-[11px] text-muted">
              <b className="tabnum text-fg">{filtradas.length}</b> de{" "}
              {MEDIDAS.length} medidas
            </span>
            {hayFiltro && (
              <button
                onClick={limpiar}
                className="rounded-full border border-white/14 px-3 py-1 text-[11px] font-semibold text-muted transition hover:text-fg"
              >
                restablecer filtros
              </button>
            )}
          </div>
        </div>

        {/* leyenda de estatus */}
        <div className="mb-5 flex flex-wrap gap-x-5 gap-y-1.5">
          {ORDEN_ESTATUS.map((s) => (
            <span key={s} className="flex items-center gap-1.5 text-[11px] text-muted">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: ESTATUS[s].color }}
              />
              <b className="text-fg/80">{s}</b> — {ESTATUS[s].desc}
            </span>
          ))}
        </div>

        {filtradas.length === 0 ? (
          <div className="card p-8 text-center text-sm text-muted">
            Ninguna medida coincide con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtradas.map((m) => (
              <article
                key={m.titulo}
                className="card flex flex-col p-5"
                style={{ borderLeft: `2px solid ${ESTATUS[m.estatus].color}` }}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-fg/85">
                    {m.flag} {m.jurisdiccion}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${ESTATUS[m.estatus].color}1f`,
                      color: ESTATUS[m.estatus].color,
                    }}
                  >
                    {m.estatus}
                  </span>
                  <span className="tabnum ml-auto text-[10px] text-muted">
                    {m.fecha}
                  </span>
                </div>

                <h3 className="mb-1 text-[14px] font-bold leading-snug text-fg">
                  {m.titulo}
                </h3>
                <div className="mb-2 text-[10px] text-muted">{m.regulador}</div>

                <p className="mb-3 text-[12px] leading-relaxed text-fg/80">
                  {m.cambio}
                </p>

                <div className="mb-3 border-l-2 border-cyan/40 pl-3">
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-cyan">
                    Lectura de impacto
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted">{m.impacto}</p>
                </div>

                <div className="mb-3 flex flex-wrap gap-1">
                  {m.ejes.map((e) => (
                    <span
                      key={e}
                      className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                      style={{
                        background: `${EJE_COLOR[e] ?? "#8fa9a1"}1f`,
                        color: EJE_COLOR[e] ?? "#8fa9a1",
                      }}
                    >
                      {e}
                    </span>
                  ))}
                  {m.categorias.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/6 px-1.5 py-0.5 text-[9px] text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <details className="mb-3 text-[11px]">
                  <summary className="cursor-pointer text-muted transition hover:text-fg">
                    Riesgos asociados ({m.riesgos.length})
                  </summary>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {m.riesgos.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] text-muted"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </details>

                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-[10px] text-teal underline decoration-teal/40 hover:decoration-teal"
                >
                  {m.fuente}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Fila({
  titulo,
  activo,
  set,
  items,
  colores,
}: {
  titulo: string;
  activo: string | null;
  set: (v: string | null) => void;
  items: string[];
  colores?: Record<string, string>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-[68px] shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
        {titulo}
      </span>
      {items.map((i) => {
        const on = activo === i;
        const col = colores?.[i] ?? "#1FC9A0";
        return (
          <button
            key={i}
            onClick={() => set(on ? null : i)}
            className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition"
            style={{
              background: on ? `${col}22` : "transparent",
              borderColor: on ? col : "rgba(255,255,255,0.12)",
              color: on ? col : "#8fa9a1",
            }}
          >
            {i}
          </button>
        );
      })}
    </div>
  );
}
