import type { Vivo } from "@/lib/cerebro/vivo/http";
import { hace } from "@/lib/cerebro/formato";

export function Seccion({
  id,
  numero,
  titulo,
  bajada,
  lado,
  children,
  alterna = false,
}: {
  id: string;
  numero: string;
  titulo: string;
  bajada?: string;
  lado?: React.ReactNode;
  children: React.ReactNode;
  alterna?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-32 border-b border-white/8 ${alterna ? "bg-white/[0.02]" : ""}`}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">{numero}</div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{titulo}</h2>
            {bajada ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/72 md:text-[15px]">{bajada}</p> : null}
          </div>
          {lado}
        </div>
        {children}
      </div>
    </section>
  );
}

export function EstadoFuente({ vivo, nota }: { vivo: Vivo<unknown>; nota?: string }) {
  return (
    <div className="flex flex-col items-start gap-1 text-[11px] text-muted sm:items-end">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]">
        <span className={`inline-block h-[7px] w-[7px] rounded-full ${vivo.ok ? "bg-lime shadow-[0_0_0_4px_rgba(240,255,41,0.14)]" : "bg-amber"}`} />
        {vivo.ok ? "En vivo" : "Sin respuesta"} · {hace(vivo.obtenido)}
      </span>
      <a href={vivo.fuente.url} target="_blank" rel="noreferrer" className="hover:text-teal">
        {vivo.fuente.nombre} ↗
      </a>
      {nota ? <span className="max-w-xs text-right leading-snug">{nota}</span> : null}
    </div>
  );
}

export function SinDatos({ vivo }: { vivo: Vivo<unknown> }) {
  if (vivo.ok) return null;
  return (
    <div className="card p-6 text-sm text-fg/80">
      <div className="font-semibold text-amber">La fuente no respondió en la última regeneración.</div>
      <div className="mt-1 text-xs text-muted">
        {vivo.fuente.nombre}: {vivo.error}. La sección se vuelve a intentar sola en la siguiente regeneración de la página; nada de esto se
        rellena a mano.
      </div>
    </div>
  );
}

export function Tile({ valor, etiqueta, nota, tono = "text-fg" }: { valor: string; etiqueta: string; nota?: string; tono?: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
      <div className={`tabnum text-[1.65rem] font-extrabold leading-none tracking-[-0.04em] ${tono}`}>{valor}</div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{etiqueta}</div>
      {nota ? <div className="mt-1 text-[11px] leading-snug text-fg/60">{nota}</div> : null}
    </div>
  );
}

export function Barra({ etiqueta, pct, valor, color = "var(--lime)", ancho = 100 }: { etiqueta: string; pct: number; valor?: string; color?: string; ancho?: number }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-fg/85">{etiqueta}</span>
          {valor ? <span className="tabnum shrink-0 text-muted">{valor}</span> : null}
        </div>
        <div className="mt-1 h-[6px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, (pct / ancho) * 100))}%`, background: color }} />
        </div>
      </div>
      <span className="tabnum w-12 text-right font-semibold">{pct.toLocaleString("es-CO", { maximumFractionDigits: 1 })} %</span>
    </div>
  );
}

/** Sparkline sin dependencias: 30 puntos → un path. */
export function Sparkline({ serie, color = "var(--lime)", alto = 36, ancho = 120 }: { serie: number[]; color?: string; alto?: number; ancho?: number }) {
  if (!serie.length) return null;
  const max = Math.max(...serie, 1);
  const min = Math.min(...serie, 0);
  const rango = max - min || 1;
  const paso = ancho / Math.max(serie.length - 1, 1);
  const puntos = serie.map((v, i) => `${(i * paso).toFixed(1)},${(alto - ((v - min) / rango) * (alto - 4) - 2).toFixed(1)}`);
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} width={ancho} height={alto} aria-hidden="true" className="overflow-visible">
      <polyline points={puntos.join(" ")} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition ${
        activo ? "border-lime bg-lime text-[#322180]" : "border-white/18 text-white/75 hover:border-lime/60 hover:text-lime"
      }`}
    >
      {children}
    </button>
  );
}
