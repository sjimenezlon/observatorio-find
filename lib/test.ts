/**
 * Motor del Test de preparación para la IA (`/test`).
 *
 * Diez afirmaciones en escala Likert de cinco puntos. Cada respuesta se
 * convierte en un nivel 0–100 (1 → 0 · 3 → 50 · 5 → 100); el puntaje es el
 * promedio simple de los diez niveles. No hay pesos: cada dimensión vale lo
 * mismo, y así se declara en pantalla.
 *
 * La comparación con pares no es un percentil (no existe una distribución
 * publicada de empresas financieras por puntaje). Lo que sí existe, con
 * fuente, es la proporción de empresas que declara tener cada capacidad en
 * encuestas globales y regionales. Eso es lo que se contrasta, capacidad por
 * capacidad, contra el nivel que la entidad se asigna.
 */

import { PREGUNTAS, type DimKey, type Pregunta } from "@/data/test";

export type Respuesta = 1 | 2 | 3 | 4 | 5;
export type Respuestas = Partial<Record<DimKey, Respuesta>>;

export const ESCALA: { v: Respuesta; label: string; corto: string }[] = [
  { v: 1, label: "Totalmente en desacuerdo", corto: "Nada" },
  { v: 2, label: "En desacuerdo", corto: "Poco" },
  { v: 3, label: "Ni de acuerdo ni en desacuerdo", corto: "A medias" },
  { v: 4, label: "De acuerdo", corto: "Bastante" },
  { v: 5, label: "Totalmente de acuerdo", corto: "Del todo" },
];

/** Umbral a partir del cual una capacidad se considera consolidada. */
export const UMBRAL_CONSOLIDADA: Respuesta = 4;

export function nivel(r: Respuesta): number {
  return (r - 1) * 25;
}

export function completo(r: Respuestas): r is Record<DimKey, Respuesta> {
  return PREGUNTAS.every((p) => r[p.key] !== undefined);
}

export function puntaje(r: Record<DimKey, Respuesta>): number {
  const suma = PREGUNTAS.reduce((acc, p) => acc + nivel(r[p.key]), 0);
  return Math.round((suma / PREGUNTAS.length) * 10) / 10;
}

export function consolidadas(r: Record<DimKey, Respuesta>): number {
  return PREGUNTAS.filter((p) => r[p.key] >= UMBRAL_CONSOLIDADA).length;
}

export interface Banda {
  key: "explorador" | "experimentador" | "escalador" | "transformador";
  label: string;
  rango: string;
  color: string;
  lectura: string;
  siguiente: string;
}

export const BANDAS: Banda[] = [
  {
    key: "explorador",
    label: "Explorador",
    rango: "0 – 34",
    color: "#a99bff",
    lectura:
      "La IA existe en la entidad como interés o como uso individual, no como capacidad de la organización. Es el punto de partida de la mayoría de las empresas medianas de la región.",
    siguiente:
      "Nombrar un responsable, hacer inventario de lo que ya se usa (incluida la IA que la gente usa por su cuenta) y elegir un caso con datos disponibles y valor medible.",
  },
  {
    key: "experimentador",
    label: "Experimentador",
    rango: "35 – 54",
    color: "#78d8f5",
    lectura:
      "Hay pilotos y entusiasmo, pero poco de eso llega a producción con impacto medido. Es donde se estanca la mayor parte de las empresas del mundo según las encuestas de 2025 y 2026.",
    siguiente:
      "Cerrar la brecha de datos y de gobierno antes de abrir más pilotos: un caso en producción con línea base vale más que cinco pruebas de concepto.",
  },
  {
    key: "escalador",
    label: "Escalador",
    rango: "55 – 74",
    color: "#f0ff29",
    lectura:
      "Modelos en producción, gobierno formal y datos utilizables. La entidad ya compite con las que capturan valor; el reto es hacerlo sostenible y explicable ante el cliente y el supervisor.",
    siguiente:
      "Industrializar: MLOps, monitoreo de deriva y sesgo, medición por segmento y controles para la IA generativa y los agentes.",
  },
  {
    key: "transformador",
    label: "Transformador",
    rango: "75 – 100",
    color: "#ffffff",
    lectura:
      "La IA es parte de cómo la entidad decide, atiende y se protege, con gobierno, medición y equidad verificadas. Es el grupo pequeño que en todas las encuestas concentra el impacto financiero.",
    siguiente:
      "Sostener la ventaja: auditoría externa de modelos, transparencia pública y participación en la definición de las reglas del sector.",
  },
];

export function banda(p: number): Banda {
  if (p >= 75) return BANDAS[3];
  if (p >= 55) return BANDAS[2];
  if (p >= 35) return BANDAS[1];
  return BANDAS[0];
}

export type Lectura = "brecha" | "linea" | "ventaja" | "sin-dato";

export interface Comparacion {
  pregunta: Pregunta;
  respuesta: Respuesta;
  nivel: number;
  mundo: number | null;
  latam: number | null;
  lectura: Lectura;
}

/**
 * Lectura por dimensión, contra la proporción de pares que declara la capacidad.
 *  - brecha:  la entidad no la tiene (nivel ≤ 50) y la mayoría de pares sí (≥ 50 %).
 *  - ventaja: la entidad la tiene (nivel ≥ 75) y menos del 40 % de pares la declara.
 *  - linea:   cualquier otro caso.
 * La referencia es la mayor de las dos proporciones disponibles (mundo o LatAm):
 * una entidad colombiana compite en las dos ligas a la vez.
 */
export function comparar(r: Record<DimKey, Respuesta>): Comparacion[] {
  return PREGUNTAS.map((p) => {
    const resp = r[p.key];
    const n = nivel(resp);
    const mundo = p.mundo?.valor ?? null;
    const latam = p.latam?.valor ?? null;
    const disponibles = [mundo, latam].filter((v): v is number => v !== null);
    const ref = disponibles.length ? Math.max(...disponibles) : null;
    let lectura: Lectura = "sin-dato";
    if (ref !== null) {
      if (n <= 50 && ref >= 50) lectura = "brecha";
      else if (n >= 75 && ref < 40) lectura = "ventaja";
      else lectura = "linea";
    }
    return { pregunta: p, respuesta: resp, nivel: n, mundo, latam, lectura };
  });
}

/** Promedio simple de las proporciones publicadas (aritmética propia, declarada). */
export function promedioPares(campo: "mundo" | "latam"): {
  valor: number;
  n: number;
} {
  const vals = PREGUNTAS.map((p) => p[campo]?.valor).filter(
    (v): v is number => typeof v === "number"
  );
  const valor = vals.length
    ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
    : 0;
  return { valor, n: vals.length };
}

// -----------------------------------------------------------------------------
// Codificación en la URL: diez dígitos en el orden de PREGUNTAS. Sin backend,
// sin cookies, sin registro: el resultado vive en el enlace.
// -----------------------------------------------------------------------------
export function codificar(r: Record<DimKey, Respuesta>): string {
  return PREGUNTAS.map((p) => String(r[p.key])).join("");
}

export function decodificar(s: string | null | undefined): Respuestas | null {
  if (!s) return null;
  const limpio = s.trim();
  if (!new RegExp(`^[1-5]{${PREGUNTAS.length}}$`).test(limpio)) return null;
  const out: Respuestas = {};
  PREGUNTAS.forEach((p, i) => {
    out[p.key] = Number(limpio[i]) as Respuesta;
  });
  return out;
}
