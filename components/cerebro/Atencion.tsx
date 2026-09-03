import type { Atencion as Fila } from "@/lib/cerebro/vivo/wikipedia";
import { BANDERA, type PaisCerebro } from "@/data/cerebro/tipos";
import { num, pct } from "@/lib/cerebro/formato";
import { Sparkline } from "./ui";

export default function Atencion({ datos }: { datos: Fila[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {datos.map((a) => (
        <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className="card block p-4 transition hover:border-lime/50">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">
                {BANDERA[a.pais as PaisCerebro]} {a.etiqueta}
              </div>
              <div className="tabnum mt-1 text-2xl font-extrabold tracking-[-0.04em]">{num(a.vistas30d)}</div>
              <div className="text-[10.5px] uppercase tracking-[0.1em] text-muted">vistas en 30 días</div>
            </div>
            <Sparkline serie={a.serie} color={a.variacionSemanalPct !== null && a.variacionSemanalPct < 0 ? "#ffc15c" : "var(--lime)"} />
          </div>
          <div className={`mt-2 text-xs ${a.variacionSemanalPct === null ? "text-muted" : a.variacionSemanalPct >= 0 ? "text-lime" : "text-amber"}`}>
            {pct(a.variacionSemanalPct, 0, true)} última semana frente a la anterior
          </div>
        </a>
      ))}
    </div>
  );
}
