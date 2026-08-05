// =============================================================================
// Motor del Índice de Madurez de IA Financiera (IMIAF)
// Normalización min–max por indicador (0–100), promedio por pilar,
// y combinación ponderada configurable. Todo el cálculo es reproducible.
// =============================================================================

import {
  CC,
  PilarKey,
  Indicador,
  INDICADORES,
  PAISES,
  PILARES,
} from "@/data/dataset";

export type Pesos = Record<PilarKey, number>;

// Pesos iguales por defecto, derivados dinámicamente de los pilares definidos.
export const PESOS_DEFAULT: Pesos = (() => {
  const w = Math.round(100 / PILARES.length);
  return Object.fromEntries(PILARES.map((p) => [p.key, w])) as Pesos;
})();

// Normaliza un indicador a 0–100 sobre el conjunto de países.
// higher → más es mejor; lower → menos es mejor (se invierte).
export function normalizarIndicador(ind: Indicador): Record<CC, number | null> {
  const vals = PAISES.map((p) => ind.valores[p.code]).filter(
    (v): v is number => v !== null
  );
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const out = {} as Record<CC, number | null>;
  for (const p of PAISES) {
    const v = ind.valores[p.code];
    if (v === null) {
      out[p.code] = null;
      continue;
    }
    if (max === min) {
      out[p.code] = 100;
      continue;
    }
    const score =
      ind.direccion === "higher"
        ? (100 * (v - min)) / (max - min)
        : (100 * (max - v)) / (max - min);
    out[p.code] = Math.round(score * 10) / 10;
  }
  return out;
}

// Escenario: valores modificados por indicador → país (para el simulador).
export type Escenario = Record<string, Partial<Record<CC, number>>>;

// Devuelve la lista de indicadores con los valores del escenario aplicados.
export function aplicarEscenario(escenario: Escenario): Indicador[] {
  return INDICADORES.map((ind) => {
    const mod = escenario[ind.key];
    if (!mod) return ind;
    return { ...ind, valores: { ...ind.valores, ...mod } };
  });
}

// Puntaje 0–100 de un pilar para cada país = promedio de sus indicadores
// normalizados (omitiendo los que no tienen dato para ese país).
export function puntajePilar(
  pilar: PilarKey,
  base: Indicador[] = INDICADORES
): Record<CC, number | null> {
  const inds = base.filter((i) => i.pilar === pilar);
  const norm = inds.map(normalizarIndicador);
  const out = {} as Record<CC, number | null>;
  for (const p of PAISES) {
    const scores = norm
      .map((n) => n[p.code])
      .filter((s): s is number => s !== null);
    out[p.code] =
      scores.length === 0
        ? null
        : Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) /
          10;
  }
  return out;
}

export interface FilaPais {
  code: CC;
  pilares: Record<PilarKey, number | null>;
  indice: number; // IMIAF compuesto 0–100
}

// Calcula la tabla completa con el índice compuesto bajo los pesos dados.
// `base` permite calcular sobre un escenario modificado (simulador).
export function calcularIndice(
  pesos: Pesos = PESOS_DEFAULT,
  base: Indicador[] = INDICADORES
): FilaPais[] {
  const porPilar = {} as Record<PilarKey, Record<CC, number | null>>;
  for (const pl of PILARES) porPilar[pl.key] = puntajePilar(pl.key, base);

  const filas: FilaPais[] = PAISES.map((p) => {
    const pilares = {} as Record<PilarKey, number | null>;
    let sumaPeso = 0;
    let acum = 0;
    for (const pl of PILARES) {
      const s = porPilar[pl.key][p.code];
      pilares[pl.key] = s;
      if (s !== null) {
        acum += (s * pesos[pl.key]) / 100;
        sumaPeso += pesos[pl.key] / 100;
      }
    }
    const indice = sumaPeso > 0 ? Math.round((acum / sumaPeso) * 10) / 10 : 0;
    return { code: p.code, pilares, indice };
  });

  return filas.sort((a, b) => b.indice - a.indice);
}

// Banda cualitativa de madurez a partir del puntaje compuesto.
export function banda(indice: number): { label: string; color: string } {
  if (indice >= 75) return { label: "Avanzado", color: "#1FC9A0" };
  if (indice >= 55) return { label: "En consolidación", color: "#9FCE2E" };
  if (indice >= 40) return { label: "Emergente", color: "#E8B452" };
  return { label: "Incipiente", color: "#6C5CD6" };
}
