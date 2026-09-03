"use client";

import { useState } from "react";
import type { ClaseApp, RankingPais } from "@/lib/cerebro/vivo/apps";
import { BANDERA, NOMBRE_PAIS, type PaisCerebro } from "@/data/cerebro/tipos";
import { Chip } from "./ui";

const COLOR: Record<ClaseApp, string> = {
  fintech: "var(--lime)",
  banco: "#78d8f5",
  global: "#a99bff",
  otro: "rgba(255,255,255,0.28)",
};
const NOMBRE: Record<ClaseApp, string> = { fintech: "Fintech", banco: "Banco", global: "Global / cripto", otro: "Otro" };

export default function AppsRanking({ datos }: { datos: RankingPais[] }) {
  const orden = [...datos].sort((a, b) => b.top10Fintech - a.top10Fintech || b.fintech - a.fintech);
  const [sel, setSel] = useState(orden[0]?.pais ?? "CO");
  const actual = datos.find((d) => d.pais === sel);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-muted">
          {(Object.keys(NOMBRE) as ClaseApp[]).map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR[c] }} />
              {NOMBRE[c]}
            </span>
          ))}
        </div>
        <ol className="space-y-2">
          {orden.map((r) => (
            <li key={r.pais}>
              <button
                type="button"
                onClick={() => setSel(r.pais)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${sel === r.pais ? "border-lime/60 bg-white/[0.06]" : "border-white/10 hover:border-white/30"}`}
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold">
                    {BANDERA[r.pais as PaisCerebro]} {NOMBRE_PAIS[r.pais as PaisCerebro] ?? r.pais}
                  </span>
                  <span className="tabnum text-muted">
                    {r.top10Fintech}/10 en el top 10 · {r.fintech}/25
                  </span>
                </div>
                <div className="mt-1.5 flex h-[8px] w-full overflow-hidden rounded-full bg-white/10">
                  {(["fintech", "banco", "global", "otro"] as ClaseApp[]).map((c) => (
                    <div key={c} style={{ width: `${(r[c] / 25) * 100}%`, background: COLOR[c] }} />
                  ))}
                </div>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="data-label text-muted">Top 25 · Finanzas · {actual ? NOMBRE_PAIS[actual.pais as PaisCerebro] : ""}</div>
          <div className="flex gap-1">
            {orden.slice(0, 6).map((r) => (
              <Chip key={r.pais} activo={sel === r.pais} onClick={() => setSel(r.pais)}>
                {r.pais}
              </Chip>
            ))}
          </div>
        </div>
        <ol className="mt-4 space-y-1">
          {actual?.apps.map((a) => (
            <li key={a.url} className="grid grid-cols-[1.6rem_minmax(0,1fr)_auto] items-center gap-2 text-xs">
              <span className="tabnum text-muted">{a.puesto}</span>
              <span className="min-w-0">
                <a href={a.url} target="_blank" rel="noreferrer" className="block truncate font-medium text-fg hover:text-lime">
                  {a.nombre}
                </a>
                <span className="block truncate text-[10.5px] text-muted">{a.desarrollador}</span>
              </span>
              <span className="rounded-full px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.1em]" style={{ background: COLOR[a.clase], color: a.clase === "otro" ? "#fff" : "#1a1050" }}>
                {NOMBRE[a.clase]}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          La clase es una heurística sobre el nombre de la app y del desarrollador. <span className="text-fg/80">Fintech</span> = app nativa digital
          (billetera, neobanco, fintech), aunque su dueño sea un banco: compite como fintech. <span className="text-fg/80">Banco</span> = app de banca
          tradicional. <span className="text-fg/80">Global</span> = exchanges, brókers y remesadoras internacionales. <span className="text-fg/80">Otro</span>{" "}
          = gobierno, impuestos, pensiones, seguros, tokens de seguridad y finanzas personales. Si una etiqueta está mal, es un error de la regla, no del dato.
        </p>
      </div>
    </div>
  );
}
