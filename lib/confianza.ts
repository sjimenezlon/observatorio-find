// =============================================================================
// Motor del ICF · Índice de Confianza Financiera
//
// Mismo método que el IMIAF: normalización min–max por indicador sobre el panel
// (aquí, 21 economías de LatAm y el Caribe), promedio por dimensión omitiendo
// los datos ausentes, y promedio ponderado de dimensiones renormalizado.
//
// La diferencia con el IMIAF es la honestidad sobre la cobertura: varios países
// no fueron encuestados en los módulos digitales del Findex 2024 y no reportan
// al FAS del FMI. En vez de imputar, el motor devuelve `cobertura` (cuántos de
// los 8 indicadores tienen dato) y quien no llegue al umbral queda fuera del
// ranking, marcado como no medible. Un índice que puntúa a un país con 2 de 8
// indicadores no está midiendo confianza: está midiendo qué encuesta llegó.
// =============================================================================

import { LATAM, PaisLatam } from "@/data/latam";
import {
  DIMENSIONES,
  DimKey,
  INDICADORES_ICF,
  IndicadorICF,
  COBERTURA_MINIMA,
} from "@/data/confianza";

export type PesosICF = Record<DimKey, number>;

export const PESOS_ICF_DEFAULT: PesosICF = Object.fromEntries(
  DIMENSIONES.map((d) => [d.key, d.peso])
) as PesosICF;

function valor(p: PaisLatam, ind: IndicadorICF): number | null {
  const v = p[ind.campo];
  return typeof v === "number" ? v : null;
}

/** Normaliza un indicador del ICF a 0–100 sobre el panel LATAM. */
export function normalizarICF(
  ind: IndicadorICF,
  panel: PaisLatam[] = LATAM
): Record<string, number | null> {
  const vals = panel
    .map((p) => valor(p, ind))
    .filter((v): v is number => v !== null);
  const out: Record<string, number | null> = {};
  if (vals.length === 0) {
    for (const p of panel) out[p.cc] = null;
    return out;
  }
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  for (const p of panel) {
    const v = valor(p, ind);
    if (v === null) {
      out[p.cc] = null;
      continue;
    }
    if (max === min) {
      out[p.cc] = 100;
      continue;
    }
    const s = ind.mejorAlto
      ? (100 * (v - min)) / (max - min)
      : (100 * (max - v)) / (max - min);
    out[p.cc] = Math.round(s * 10) / 10;
  }
  return out;
}

export interface FilaICF {
  cc: string;
  nombre: string;
  flag: string;
  dims: Record<DimKey, number | null>;
  icf: number | null;
  /** proporción de los 8 indicadores con dato (0–1) */
  cobertura: number;
  medible: boolean;
}

export function calcularICF(
  pesos: PesosICF = PESOS_ICF_DEFAULT,
  panel: PaisLatam[] = LATAM
): FilaICF[] {
  // normalización una sola vez por indicador
  const norm = new Map<string, Record<string, number | null>>();
  for (const ind of INDICADORES_ICF) norm.set(ind.key, normalizarICF(ind, panel));

  const filas: FilaICF[] = panel.map((p) => {
    const dims = {} as Record<DimKey, number | null>;
    let conDato = 0;

    for (const d of DIMENSIONES) {
      const inds = INDICADORES_ICF.filter((i) => i.dim === d.key);
      const scores: number[] = [];
      for (const i of inds) {
        const s = norm.get(i.key)![p.cc];
        if (s !== null && s !== undefined) {
          scores.push(s);
          conDato++;
        }
      }
      dims[d.key] =
        scores.length === 0
          ? null
          : Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) /
            10;
    }

    let acum = 0;
    let sumaPeso = 0;
    for (const d of DIMENSIONES) {
      const s = dims[d.key];
      if (s !== null) {
        acum += (s * pesos[d.key]) / 100;
        sumaPeso += pesos[d.key] / 100;
      }
    }
    const cobertura = conDato / INDICADORES_ICF.length;
    const medible = cobertura >= COBERTURA_MINIMA;
    return {
      cc: p.cc,
      nombre: p.nombre,
      flag: p.flag,
      dims,
      icf: sumaPeso > 0 && medible ? Math.round((acum / sumaPeso) * 10) / 10 : null,
      cobertura: Math.round(cobertura * 100) / 100,
      medible,
    };
  });

  return filas.sort((a, b) => {
    if (a.icf === null && b.icf === null) return b.cobertura - a.cobertura;
    if (a.icf === null) return 1;
    if (b.icf === null) return -1;
    return b.icf - a.icf;
  });
}

/** Banda cualitativa del ICF (relativa al panel regional). */
export function bandaICF(icf: number): { label: string; color: string } {
  if (icf >= 70) return { label: "Confianza alta", color: "#1FC9A0" };
  if (icf >= 50) return { label: "Confianza media", color: "#9FCE2E" };
  if (icf >= 32) return { label: "Confianza frágil", color: "#E8B452" };
  return { label: "Confianza baja", color: "#F0736A" };
}

/** Promedio simple del panel medible, para usar como referencia regional. */
export function promedioICF(filas: FilaICF[]): number {
  const v = filas.map((f) => f.icf).filter((x): x is number => x !== null);
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : 0;
}
