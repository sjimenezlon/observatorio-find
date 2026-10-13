import type { IndicadorInicio } from "@/lib/inicio";

/** Número con los decimales que trae el dato, en formato es-CO. */
export function numero(v: number): string {
  const d = (String(v).split(".")[1] || "").length;
  return v.toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function un1(v: number): string {
  return v.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Sufijo de unidad para mostrar junto al valor. */
export function sufijo(u: string): string {
  if (u === "%" || u === "/100" || u === "/10") return u;
  if (u === "#" || u === "") return "";
  return ` ${u}`;
}

export function cifra(v: number | null, u: string): string {
  if (v === null) return "n/d";
  if (u === "#") return `#${v}`;
  return numero(v);
}

export function cifraConUnidad(ind: IndicadorInicio, v: number | null): string {
  return v === null ? "n/d" : cifra(v, ind.unidad) + sufijo(ind.unidad);
}

export const sinTildes = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
