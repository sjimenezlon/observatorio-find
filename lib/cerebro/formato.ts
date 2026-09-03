// Formato en español de Colombia: punto de miles, coma decimal.

export function num(n: number | null | undefined, dec = 0): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "s. d.";
  return n.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

/** 7.366.981.446 → "7.367 M" · 1.234.567 → "1,2 M" · 850.000 → "850 mil" */
export function compacto(n: number | null | undefined, dec = 1): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "s. d.";
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${num(n / 1e9, dec)} mil M`;
  if (abs >= 1e6) return `${num(n / 1e6, dec)} M`;
  if (abs >= 1e3) return `${num(n / 1e3, dec)} mil`;
  return num(n, 0);
}

/** Millones de USD ya expresados en millones: 2032 → "US$ 2.032 M" · 15700 → "US$ 15,7 mil M" */
export function usdM(m: number | null | undefined): string {
  if (m === null || m === undefined) return "s. d.";
  if (Math.abs(m) >= 1000) return `US$ ${num(m / 1000, 1)} mil M`;
  return `US$ ${num(m, m < 10 ? 1 : 0)} M`;
}

export function pct(n: number | null | undefined, dec = 1, signo = false): string {
  if (n === null || n === undefined) return "s. d.";
  const s = num(n, dec);
  return `${signo && n > 0 ? "+" : ""}${s} %`;
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** "2026-08" → "ago 2026" · "2026-08-15" → "15 ago 2026" */
export function fecha(iso: string | null | undefined): string {
  if (!iso) return "s. f.";
  const m = iso.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (!m) return iso;
  const mes = MESES[Number(m[2]) - 1] ?? m[2];
  return m[3] ? `${Number(m[3])} ${mes} ${m[1]}` : `${mes} ${m[1]}`;
}

export function hace(iso: string | null | undefined, ahora = Date.now()): string {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const min = Math.round((ahora - t) / 60_000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 48) return `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d < 30) return `hace ${d} d`;
  return fecha(iso.slice(0, 10));
}
