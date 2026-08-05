/**
 * Verificación de integridad del dataset — se ejecuta en CI y bloquea el merge.
 *
 * El observatorio se sostiene sobre una promesa: cada cifra declara fuente, año
 * y método. Este script comprueba que la promesa se cumpla mecánicamente, para
 * que un cambio de datos —venga de quien venga— no la rompa en silencio.
 *
 *   npm run verificar
 */

import {
  PAISES,
  PILARES,
  INDICADORES,
  BENCHMARKS,
  ANCLAS,
  FUENTES,
  SNAPSHOT_ANTERIOR,
  META,
  type CC,
} from "../data/dataset";
import { calcularIndice, PESOS_DEFAULT } from "../lib/index";
import { INDICADORES_ICF, DIMENSIONES, COBERTURA_MINIMA } from "../data/confianza";
import { calcularICF } from "../lib/confianza";
import { calcularICFS } from "../lib/segmentos";
import { LATAM, LATAM_CORE } from "../data/latam";

const ANIO_MAX = new Date().getFullYear() + 1;
const ANIO_MIN = 2010;

const errores: string[] = [];
const avisos: string[] = [];

const err = (m: string) => errores.push(m);
const avi = (m: string) => avisos.push(m);

const esHttps = (u: string) => /^https:\/\/[^\s"']+$/.test(u);

// -----------------------------------------------------------------------------
// 1 · Países y pilares
// -----------------------------------------------------------------------------
const CODIGOS = PAISES.map((p) => p.code);
if (new Set(CODIGOS).size !== CODIGOS.length) err("PAISES: hay códigos repetidos.");

const KEYS_PILAR = PILARES.map((p) => p.key);
if (new Set(KEYS_PILAR).size !== KEYS_PILAR.length) err("PILARES: hay keys repetidas.");

for (const p of PILARES) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(p.color)) err(`Pilar «${p.key}»: color «${p.color}» no es hex de 6 dígitos.`);
  if (!p.desc?.trim()) err(`Pilar «${p.key}»: sin descripción.`);
  const n = INDICADORES.filter((i) => i.pilar === p.key).length;
  if (n === 0) err(`Pilar «${p.key}»: no tiene ningún indicador. El índice lo promediaría como vacío.`);
}

// -----------------------------------------------------------------------------
// 2 · Indicadores: la regla de oro es fuente + url + año por cifra
// -----------------------------------------------------------------------------
const KEYS_IND = INDICADORES.map((i) => i.key);
if (new Set(KEYS_IND).size !== KEYS_IND.length) {
  const dup = KEYS_IND.filter((k, n) => KEYS_IND.indexOf(k) !== n);
  err(`INDICADORES: keys repetidas → ${[...new Set(dup)].join(", ")}`);
}

for (const ind of INDICADORES) {
  const donde = `Indicador «${ind.key}»`;

  if (!KEYS_PILAR.includes(ind.pilar)) err(`${donde}: pilar «${ind.pilar}» no existe.`);
  if (!ind.label?.trim()) err(`${donde}: sin label.`);
  if (!ind.desc?.trim()) err(`${donde}: sin descripción — el lector no puede saber qué mide.`);
  if (!ind.unidad?.trim()) err(`${donde}: sin unidad.`);
  if (ind.direccion !== "higher" && ind.direccion !== "lower") {
    err(`${donde}: dirección «${ind.direccion}» inválida (higher | lower).`);
  }

  if (!ind.fuente?.trim()) err(`${donde}: sin fuente.`);
  if (!esHttps(ind.url)) err(`${donde}: url «${ind.url}» no es https válida.`);
  if (!Number.isInteger(ind.anio) || ind.anio < ANIO_MIN || ind.anio > ANIO_MAX) {
    err(`${donde}: año ${ind.anio} fuera de rango [${ANIO_MIN}, ${ANIO_MAX}].`);
  }

  // Todos los países deben estar presentes; el dato ausente se declara null, no se omite.
  for (const cc of CODIGOS) {
    if (!(cc in ind.valores)) {
      err(`${donde}: falta el país ${cc}. Un dato ausente se escribe como null, no se omite.`);
      continue;
    }
    const v = ind.valores[cc];
    if (v !== null && !Number.isFinite(v)) err(`${donde}: valor de ${cc} no es número finito ni null.`);
    if (typeof v === "number" && ind.unidad === "%" && (v < 0 || v > 100)) {
      err(`${donde}: ${cc} = ${v} fuera de 0–100 y la unidad es «%».`);
    }
  }
  for (const cc of Object.keys(ind.valores)) {
    if (!CODIGOS.includes(cc as CC)) err(`${donde}: país «${cc}» no está en PAISES.`);
  }

  const conDato = CODIGOS.filter((cc) => ind.valores[cc] !== null).length;
  if (conDato < 2) {
    err(`${donde}: solo ${conDato} país con dato. Con menos de 2 la normalización min–max no tiene sentido.`);
  }

  for (const [cc, ov] of Object.entries(ind.overrides ?? {})) {
    if (!CODIGOS.includes(cc as CC)) err(`${donde}: override para país inexistente «${cc}».`);
    if (ov?.url && !esHttps(ov.url)) err(`${donde}/${cc}: url de override no es https válida.`);
    if (ov?.anio && (ov.anio < ANIO_MIN || ov.anio > ANIO_MAX)) {
      err(`${donde}/${cc}: año de override ${ov.anio} fuera de rango.`);
    }
  }

  // La línea entre dato de tercero, aritmética propia e índice cualitativo es
  // lo que /metodologia publica. Tiene que quedar marcada en el dato, no solo
  // en la prosa.
  if (ind.construido && ind.derivado) {
    err(`${donde}: no puede ser a la vez construido (rúbrica) y derivado (aritmética). Elige uno.`);
  }
  if (/^Observatorio Find/i.test(ind.fuente) && !ind.construido && !ind.derivado) {
    err(`${donde}: la fuente es el propio Observatorio pero no está marcado como construido ni derivado.`);
  }
  if (ind.construido && !/construcción propia/i.test(ind.fuente)) {
    err(`${donde}: marcado construido pero la fuente no lo declara como construcción propia.`);
  }
  if (ind.derivado && !/(cálculo|aritmética|serie)/i.test(`${ind.fuente} ${ind.desc}`)) {
    err(`${donde}: marcado derivado pero ni la fuente ni la descripción dicen cuál es la operación.`);
  }
}

// -----------------------------------------------------------------------------
// 3 · El índice tiene que calcular
// -----------------------------------------------------------------------------
const filas = calcularIndice(PESOS_DEFAULT);
if (filas.length !== PAISES.length) err(`IMIAF: devolvió ${filas.length} filas para ${PAISES.length} países.`);
for (const f of filas) {
  if (!Number.isFinite(f.indice) || f.indice < 0 || f.indice > 100) {
    err(`IMIAF: ${f.code} = ${f.indice} — no es un puntaje 0–100 finito.`);
  }
}

for (const cc of CODIGOS) {
  if (!(cc in SNAPSHOT_ANTERIOR.scores)) err(`SNAPSHOT_ANTERIOR: falta ${cc}.`);
}
if (!SNAPSHOT_ANTERIOR.fecha?.trim()) err("SNAPSHOT_ANTERIOR: sin fecha del corte.");

// -----------------------------------------------------------------------------
// 4 · Anclas, benchmarks y fuentes
// -----------------------------------------------------------------------------
for (const a of ANCLAS) {
  if (!esHttps(a.url)) err(`Ancla «${a.label ?? a.valor}»: url no es https válida.`);
  if (!a.fuente?.trim()) err(`Ancla «${a.label ?? a.valor}»: sin fuente.`);
}
for (const b of BENCHMARKS) {
  if (b.url && !esHttps(b.url)) err(`Benchmark «${b.label ?? b.key}»: url no es https válida.`);
}
for (const f of FUENTES) {
  if (!esHttps(f.url)) err(`Fuente «${f.nombre}»: url no es https válida.`);
}

// -----------------------------------------------------------------------------
// 5 · ICF · Índice de Confianza Financiera
// -----------------------------------------------------------------------------
const pesoDims = DIMENSIONES.reduce((s, d) => s + d.peso, 0);
if (Math.abs(pesoDims - 100) > 0.01) err(`ICF: las dimensiones suman ${pesoDims}, deberían sumar 100.`);

const CAMPOS_LATAM = new Set(Object.keys(LATAM[0] ?? {}));
for (const i of INDICADORES_ICF) {
  if (!DIMENSIONES.some((d) => d.key === i.dim)) err(`ICF «${i.key}»: dimensión «${i.dim}» no existe.`);
  if (!i.fuente?.trim()) err(`ICF «${i.key}»: sin fuente.`);
  if (!i.nota?.trim()) err(`ICF «${i.key}»: sin nota de método — el ICF publica su aritmética.`);
  if (!CAMPOS_LATAM.has(i.campo as string)) {
    err(`ICF «${i.key}»: el campo «${String(i.campo)}» no existe en el panel LATAM.`);
  }
}

const icf = calcularICF();
const medibles = icf.filter((f) => f.medible);
for (const f of icf) {
  if (f.icf !== null && (!Number.isFinite(f.icf) || f.icf < 0 || f.icf > 100)) {
    err(`ICF: ${f.cc} = ${f.icf} fuera de 0–100.`);
  }
  // La regla de cobertura es la que impide rankear a quien casi no fue encuestado.
  if (f.icf !== null && f.cobertura < COBERTURA_MINIMA) {
    err(`ICF: ${f.cc} tiene puntaje con cobertura ${f.cobertura} < ${COBERTURA_MINIMA}.`);
  }
  if (f.icf === null && f.medible) err(`ICF: ${f.cc} es medible pero quedó sin puntaje.`);
}
if (medibles.length < 10) {
  avi(`ICF: solo ${medibles.length} economías medibles — revisa la regla de cobertura.`);
}

// -----------------------------------------------------------------------------
// 6 · ICF-S por segmento
// -----------------------------------------------------------------------------
const icfs = calcularICFS();
for (const f of icfs) {
  if (f.icfs !== null && (!Number.isFinite(f.icfs) || f.icfs < 0 || f.icfs > 100)) {
    err(`ICF-S: ${f.cc}/${f.seg} = ${f.icfs} fuera de 0–100.`);
  }
}
if (icfs.length === 0) err("ICF-S: no devolvió ninguna fila.");

// -----------------------------------------------------------------------------
// 7 · Panel LATAM
// -----------------------------------------------------------------------------
const ccs = LATAM.map((p) => p.cc);
if (new Set(ccs).size !== ccs.length) err("LATAM: hay códigos de país repetidos.");
// Los 6 del IMIAF tienen que estar también en el panel de 21 economías del ICF.
for (const core of LATAM_CORE) {
  if (!ccs.includes(core)) err(`LATAM: falta ${core}, que está en LATAM_CORE (los 6 países del IMIAF).`);
}

// -----------------------------------------------------------------------------
// 8 · META refleja el dataset
// -----------------------------------------------------------------------------
if (META.pilares !== PILARES.length) err(`META.pilares = ${META.pilares} ≠ ${PILARES.length} pilares reales.`);
if (META.indicadores !== INDICADORES.length) {
  err(`META.indicadores = ${META.indicadores} ≠ ${INDICADORES.length} indicadores reales.`);
}

// -----------------------------------------------------------------------------
// Informe
// -----------------------------------------------------------------------------
const resumen = [
  `${PAISES.length} países`,
  `${PILARES.length} pilares`,
  `${INDICADORES.length} indicadores`,
  `${FUENTES.length} fuentes`,
  `${icf.length} economías en el ICF`,
  `${icfs.length} observaciones país×segmento`,
].join(" · ");

console.log(`\nObservatorio Find ${META.version} — ${resumen}\n`);

for (const a of avisos) console.log(`  aviso  ${a}`);
if (avisos.length) console.log("");

if (errores.length) {
  for (const e of errores) console.error(`  ERROR  ${e}`);
  console.error(`\n${errores.length} problema(s) de integridad. El dataset no cumple la promesa de fuente y método.\n`);
  process.exit(1);
}

console.log("Integridad verificada: toda cifra tiene fuente, url https y año; los índices calculan.\n");
