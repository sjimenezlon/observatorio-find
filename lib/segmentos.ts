// =============================================================================
// Motor del ICF-S · confianza por segmento
//
// Diferencia clave con el ICF completo: la normalización min–max no se hace
// sobre los países, sino sobre TODAS las observaciones país×segmento. Solo así
// un valor es comparable en las dos direcciones a la vez — entre segmentos de
// un mismo país y entre países para un mismo segmento.
//
// Tres dimensiones (el Findex no desagrega las series de las otras): declarada,
// revelada y profundidad. Sus pesos se reescalan a 100 respecto del ICF completo.
// =============================================================================

import { SEGMENTOS, FilaSegmento, FAMILIAS, FamiliaSeg } from "@/data/segmentos";

export type DimSeg = "declarada" | "revelada" | "profundidad";

export const DIMS_SEG: { key: DimSeg; label: string; color: string; peso: number }[] = [
  { key: "declarada", label: "Declarada", color: "#E8B452", peso: 25 },
  { key: "revelada", label: "Revelada", color: "#1FC9A0", peso: 45 },
  { key: "profundidad", label: "Profundidad", color: "#9B8CF0", peso: 30 },
];

interface Spec {
  campo: keyof FilaSegmento;
  dim: DimSeg;
  mejorAlto: boolean;
  label: string;
  unidad: string;
}

export const INDICADORES_SEG: Spec[] = [
  {
    campo: "desconfianza",
    dim: "declarada",
    mejorAlto: false,
    label: "Desconfianza como barrera",
    unidad: "% de los no bancarizados del segmento",
  },
  {
    campo: "guarda",
    dim: "revelada",
    mejorAlto: true,
    label: "Guarda dinero en la cuenta",
    unidad: "% del segmento",
  },
  {
    campo: "merchantpay",
    dim: "revelada",
    mejorAlto: true,
    label: "Paga a comercios por medios digitales",
    unidad: "% del segmento",
  },
  {
    campo: "formalidad",
    dim: "profundidad",
    mejorAlto: true,
    label: "Formalidad del endeudamiento",
    unidad: "% de los que se endeudaron",
  },
];

const num = (f: FilaSegmento, c: keyof FilaSegmento) => {
  const v = f[c];
  return typeof v === "number" ? v : null;
};

// Escalas calculadas una sola vez sobre todas las observaciones país×segmento.
const ESCALAS = new Map<string, { min: number; max: number }>();
for (const ind of INDICADORES_SEG) {
  const vals = SEGMENTOS.map((f) => num(f, ind.campo)).filter(
    (v): v is number => v !== null
  );
  ESCALAS.set(ind.campo as string, { min: Math.min(...vals), max: Math.max(...vals) });
}

function normalizar(f: FilaSegmento, ind: Spec): number | null {
  const v = num(f, ind.campo);
  if (v === null) return null;
  const { min, max } = ESCALAS.get(ind.campo as string)!;
  if (max === min) return 100;
  const s = ind.mejorAlto
    ? (100 * (v - min)) / (max - min)
    : (100 * (max - v)) / (max - min);
  return Math.round(s * 10) / 10;
}

/** Mismo principio que el ICF: por debajo de este umbral no se puntúa. */
export const COBERTURA_MINIMA_SEG = 0.5;

export interface FilaICFS {
  cc: string;
  nombre: string;
  flag: string;
  seg: string;
  segLabel: string;
  familia: FamiliaSeg;
  dims: Record<DimSeg, number | null>;
  icfs: number | null;
  cobertura: number;
  medible: boolean;
  fila: FilaSegmento;
}

export function calcularICFS(): FilaICFS[] {
  return SEGMENTOS.map((f) => {
    const dims = {} as Record<DimSeg, number | null>;
    let conDato = 0;
    for (const d of DIMS_SEG) {
      const inds = INDICADORES_SEG.filter((i) => i.dim === d.key);
      const scores = inds
        .map((i) => normalizar(f, i))
        .filter((s): s is number => s !== null);
      conDato += scores.length;
      dims[d.key] =
        scores.length === 0
          ? null
          : Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
    }
    let acum = 0;
    let peso = 0;
    for (const d of DIMS_SEG) {
      if (dims[d.key] !== null) {
        acum += (dims[d.key]! * d.peso) / 100;
        peso += d.peso / 100;
      }
    }
    const cobertura = conDato / INDICADORES_SEG.length;
    const medible = cobertura >= COBERTURA_MINIMA_SEG;
    return {
      cc: f.cc,
      nombre: f.nombre,
      flag: f.flag,
      seg: f.seg,
      segLabel: f.segLabel,
      familia: f.familia,
      dims,
      icfs: peso > 0 && medible ? Math.round((acum / peso) * 10) / 10 : null,
      cobertura,
      medible,
      fila: f,
    };
  });
}

export interface Brecha {
  cc: string;
  nombre: string;
  flag: string;
  familia: FamiliaSeg;
  /** segmento en desventaja */
  bajo: number | null;
  /** segmento en ventaja */
  alto: number | null;
  /** alto − bajo, en puntos del índice */
  brecha: number | null;
}

/** Brecha de confianza por familia (género, ingreso, territorio) y país. */
export function calcularBrechas(filas: FilaICFS[] = calcularICFS()): Brecha[] {
  const out: Brecha[] = [];
  const paises = [...new Set(filas.map((f) => f.cc))];
  for (const cc of paises) {
    const delPais = filas.filter((f) => f.cc === cc);
    for (const fam of Object.keys(FAMILIAS) as FamiliaSeg[]) {
      const a = delPais.find((f) => f.seg === FAMILIAS[fam].a);
      const b = delPais.find((f) => f.seg === FAMILIAS[fam].b);
      if (!a && !b) continue;
      const bajo = a?.icfs ?? null;
      const alto = b?.icfs ?? null;
      out.push({
        cc,
        nombre: delPais[0].nombre,
        flag: delPais[0].flag,
        familia: fam,
        bajo,
        alto,
        brecha:
          bajo !== null && alto !== null ? Math.round((alto - bajo) * 10) / 10 : null,
      });
    }
  }
  return out;
}
