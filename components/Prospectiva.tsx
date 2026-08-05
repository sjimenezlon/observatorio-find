"use client";

import { useMemo, useState } from "react";
import { HITOS, PERIODOS } from "@/data/frontera";

const CERTEZA: Record<string, { color: string; desc: string }> = {
  Fijado: { color: "#1FC9A0", desc: "fecha oficial verificable en fuente del regulador" },
  "En discusión": { color: "#E8B452", desc: "iniciativa o expectativa anunciada, sin fecha cierta" },
  Tendencia: { color: "#9B8CF0", desc: "proyección analítica, no un hecho" },
};

export default function Prospectiva() {
  const [certeza, setCerteza] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  const regiones = useMemo(() => [...new Set(HITOS.map((h) => h.jurisdiccion))], []);
  const filtrados = useMemo(
    () =>
      HITOS.filter(
        (h) =>
          (!certeza || h.certeza === certeza) &&
          (!region || h.jurisdiccion === region)
      ),
    [certeza, region]
  );

  const conteo = (c: string) => HITOS.filter((h) => h.certeza === c).length;

  return (
    <section id="prospectiva" className="border-b border-white/8 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-lime">
          Hoja de ruta regulatoria · 2026–2030
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          Lo que ya tiene fecha
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          {HITOS.length} hitos ordenados por horizonte, cada uno con su grado de
          firmeza — para no confundir un hecho con una expectativa.{" "}
          <b className="font-semibold text-fg">
            Solo {conteo("Fijado")} tienen fecha oficial verificable
          </b>
          ; {conteo("En discusión")} están en discusión y {conteo("Tendencia")} son
          proyecciones analíticas.
        </p>

        {/* leyenda + filtros */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-[68px] shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              Certeza
            </span>
            {Object.keys(CERTEZA).map((c) => {
              const on = certeza === c;
              return (
                <button
                  key={c}
                  onClick={() => setCerteza(on ? null : c)}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition"
                  style={{
                    background: on ? `${CERTEZA[c].color}22` : "transparent",
                    borderColor: on ? CERTEZA[c].color : "rgba(255,255,255,0.12)",
                    color: on ? CERTEZA[c].color : "#8fa9a1",
                  }}
                >
                  {c} · {conteo(c)}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 w-[68px] shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              Región
            </span>
            {regiones.map((r) => {
              const on = region === r;
              return (
                <button
                  key={r}
                  onClick={() => setRegion(on ? null : r)}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition"
                  style={{
                    background: on ? "rgba(31,201,160,0.18)" : "transparent",
                    borderColor: on ? "#1FC9A0" : "rgba(255,255,255,0.12)",
                    color: on ? "#1FC9A0" : "#8fa9a1",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* línea de tiempo por período */}
        <div className="space-y-8">
          {PERIODOS.map((p) => {
            const hitos = filtrados.filter((h) => h.periodo === p);
            if (hitos.length === 0) return null;
            return (
              <div key={p}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-lime/15 px-3 py-1 text-[12px] font-extrabold text-lime">
                    {p}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="tabnum text-[11px] text-muted">
                    {hitos.length} hito{hitos.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {hitos.map((h) => (
                    <article
                      key={h.titulo}
                      className="card flex flex-col p-4"
                      style={{ borderTop: `2px solid ${CERTEZA[h.certeza].color}` }}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-fg/85">
                          {h.flag} {h.jurisdiccion}
                        </span>
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{
                            background: `${CERTEZA[h.certeza].color}1f`,
                            color: CERTEZA[h.certeza].color,
                          }}
                        >
                          {h.certeza}
                        </span>
                      </div>
                      <div className="tabnum mb-1.5 text-[11px] font-semibold text-lime">
                        {h.fecha}
                      </div>
                      <h3 className="mb-1.5 text-[13.5px] font-bold leading-snug text-fg">
                        {h.titulo}
                      </h3>
                      <p className="mb-3 flex-1 text-[12px] leading-relaxed text-muted">
                        {h.que}
                      </p>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {h.ejes.map((e) => (
                          <span
                            key={e}
                            className="rounded-full bg-white/6 px-1.5 py-0.5 text-[9px] text-muted"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                      <a
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-[10px] text-teal underline decoration-teal/40 hover:decoration-teal"
                      >
                        {h.fuente}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/8 pt-4">
          {Object.entries(CERTEZA).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5 text-[11px] text-muted">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: v.color }}
              />
              <b className="text-fg/80">{k}</b> — {v.desc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
