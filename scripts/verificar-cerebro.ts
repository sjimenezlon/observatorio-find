/**
 * Verificación de los datasets curados del Cerebro — corre con `npm run verificar`.
 *
 * Misma promesa que el resto del observatorio: cada cifra declara fuente, URL
 * https y año; `null` es «sin dato», nunca cero; nada se repite ni se inventa.
 */

import { JUGADORES } from "../data/cerebro/jugadores";
import { INVERSION } from "../data/cerebro/inversion";
import { PAISES_CEREBRO, HITOS } from "../data/cerebro/paises";
import { BIBLIOTECA } from "../data/cerebro/biblioteca";
import { NOMBRE_PAIS, NOMBRE_SEGMENTO } from "../data/cerebro/tipos";

const ANIO_MAX = new Date().getFullYear() + 1;
const ANIO_MIN = 2010;
const errores: string[] = [];
const avisos: string[] = [];
const err = (m: string) => errores.push(m);
const avi = (m: string) => avisos.push(m);
const esHttps = (u: unknown) => typeof u === "string" && /^https:\/\/[^\s"']+$/.test(u);
const esFecha = (f: unknown) => typeof f === "string" && /^\d{4}(-\d{2}){0,2}$/.test(f);
const PAISES = new Set(Object.keys(NOMBRE_PAIS));
const SEGMENTOS = new Set(Object.keys(NOMBRE_SEGMENTO));

// 1 · Jugadores
const ids = JUGADORES.map((j) => j.id);
if (new Set(ids).size !== ids.length) err(`JUGADORES: ids repetidos → ${ids.filter((k, n) => ids.indexOf(k) !== n).join(", ")}`);
for (const j of JUGADORES) {
  const d = `Jugador «${j.id}»`;
  if (!PAISES.has(j.pais)) err(`${d}: país «${j.pais}» no existe.`);
  if (!SEGMENTOS.has(j.segmento)) err(`${d}: segmento «${j.segmento}» no existe.`);
  if (!j.descripcion?.trim()) err(`${d}: sin descripción.`);
  if (!j.fuente?.trim()) err(`${d}: sin fuente.`);
  if (!esHttps(j.url)) err(`${d}: url «${j.url}» no es https válida.`);
  if (!Number.isInteger(j.anio) || j.anio < ANIO_MIN || j.anio > ANIO_MAX) err(`${d}: año ${j.anio} fuera de rango.`);
  if (j.valoracion_usd_m !== null && !(j.valoracion_usd_m > 0)) err(`${d}: valoración no positiva.`);
  if (j.valoracion_usd_m !== null && !j.valoracion_fecha) err(`${d}: valoración sin fecha.`);
  if (j.unicornio && (j.valoracion_usd_m ?? 0) < 1000) avi(`${d}: marcado unicornio con valoración ${j.valoracion_usd_m ?? "s. d."} (< US$ 1.000 M).`);
  if (j.estado === "cotiza" && !j.ticker) err(`${d}: cotiza pero no tiene ticker.`);
  if (j.ultima_ronda && j.ultima_ronda.monto_usd_m !== null && !(j.ultima_ronda.monto_usd_m > 0)) err(`${d}: monto de ronda no positivo.`);
  if (j.ultima_ronda?.fecha && !esFecha(j.ultima_ronda.fecha)) err(`${d}: fecha de ronda «${j.ultima_ronda.fecha}» inválida.`);
}

// 2 · Inversión
for (const s of INVERSION.serie_anual) {
  const d = `Serie anual ${s.anio}`;
  if (!s.fuente?.trim()) err(`${d}: sin fuente.`);
  if (!esHttps(s.url)) err(`${d}: url inválida.`);
  if (s.vc_total_usd_m !== null && s.vc_fintech_usd_m !== null && s.vc_fintech_usd_m > s.vc_total_usd_m) err(`${d}: VC fintech mayor que VC total.`);
}
for (const p of INVERSION.por_pais_2025) {
  if (!PAISES.has(p.pais)) err(`VC por país: «${p.pais}» no existe.`);
  if (!esHttps(p.url)) err(`VC por país ${p.pais}: url inválida.`);
}
for (const r of INVERSION.rondas) {
  const d = `Ronda ${r.empresa} (${r.fecha})`;
  if (!esFecha(r.fecha)) err(`${d}: fecha inválida.`);
  if (!PAISES.has(r.pais)) err(`${d}: país «${r.pais}» no existe.`);
  if (r.monto_usd_m !== null && !(r.monto_usd_m > 0)) err(`${d}: monto no positivo.`);
  if (!esHttps(r.url)) err(`${d}: url inválida.`);
  if (!r.fuente?.trim()) err(`${d}: sin fuente.`);
}
for (const s of INVERSION.salidas) {
  if (!esFecha(s.fecha)) err(`Salida ${s.empresa}: fecha inválida.`);
  if (!PAISES.has(s.pais)) err(`Salida ${s.empresa}: país «${s.pais}» no existe.`);
  if (!esHttps(s.url)) err(`Salida ${s.empresa}: url inválida.`);
}
for (const f of INVERSION.fondos_activos) if (!esHttps(f.url)) err(`Fondo ${f.nombre}: url inválida.`);
for (const a of INVERSION.anclas) {
  if (!esHttps(a.url)) err(`Ancla «${a.cifra}»: url inválida.`);
  if (!Number.isInteger(a.anio) || a.anio < ANIO_MIN || a.anio > ANIO_MAX) err(`Ancla «${a.cifra}»: año fuera de rango.`);
}
for (const p of INVERSION.participacion_fintech) {
  if (!(p.pct >= 0 && p.pct <= 100)) err(`Participación ${p.anio}: ${p.pct} % fuera de 0–100.`);
  if (!esHttps(p.url)) err(`Participación ${p.anio}: url inválida.`);
}

// 3 · Países e hitos
const codes = PAISES_CEREBRO.map((p) => p.code);
if (new Set(codes).size !== codes.length) err("PAISES_CEREBRO: códigos repetidos.");
for (const p of PAISES_CEREBRO) {
  const d = `País ${p.code}`;
  if (!PAISES.has(p.code)) err(`${d}: código no existe.`);
  if (p.fintechs && p.fintechs.n !== null && p.fintechs.n !== undefined && !esHttps(p.fintechs.url)) err(`${d}: conteo de fintechs sin url https.`);
  if (p.fintechs?.anio && (p.fintechs.anio < ANIO_MIN || p.fintechs.anio > ANIO_MAX)) err(`${d}: año del radar fuera de rango.`);
  for (const r of p.reguladores) if (!esHttps(r.url)) err(`${d}: regulador «${r.nombre}» sin url https.`);
  for (const l of p.lideres) if (l.usuarios_m !== null && !esHttps(l.url)) err(`${d}: líder «${l.nombre}» con usuarios pero sin url.`);
  if (p.riel_inmediato?.usuarios_m !== null && p.riel_inmediato?.usuarios_m !== undefined && !esHttps(p.riel_inmediato.url)) err(`${d}: riel con cifras pero sin url.`);
  if (p.inclusion?.cuenta_pct !== null && p.inclusion?.cuenta_pct !== undefined && !esHttps(p.inclusion.url)) err(`${d}: inclusión sin url.`);
  for (const [k, n] of [["ley_fintech", p.ley_fintech], ["sandbox", p.sandbox], ["open_finance", p.open_finance]] as const) {
    if (n && n.url !== null && !esHttps(n.url)) err(`${d}: ${k} con url no https.`);
  }
  if (p.cripto?.url && !esHttps(p.cripto.url)) err(`${d}: cripto con url no https.`);
  const seg = p.segmentos.reduce((s, x) => s + (x.pct ?? 0), 0);
  if (p.segmentos.length && seg > 102) avi(`${d}: los segmentos suman ${seg.toFixed(1)} % (> 100).`);
}
for (const h of HITOS) {
  const d = `Hito «${h.titulo}»`;
  if (!esFecha(h.fecha)) err(`${d}: fecha inválida.`);
  if (!PAISES.has(h.pais)) err(`${d}: país «${h.pais}» no existe.`);
  if (!esHttps(h.url)) err(`${d}: url inválida.`);
  if (!h.fuente?.trim()) err(`${d}: sin fuente.`);
}

// 4 · Biblioteca
for (const r of BIBLIOTECA.reportes) {
  const d = `Reporte «${r.titulo.slice(0, 50)}»`;
  if (!esHttps(r.url)) err(`${d}: url inválida.`);
  if (!Number.isInteger(r.anio) || r.anio < ANIO_MIN || r.anio > ANIO_MAX) err(`${d}: año ${r.anio} fuera de rango.`);
  if (!r.resumen?.trim()) err(`${d}: sin resumen.`);
}
const nombresDir = BIBLIOTECA.directorio.map((e) => e.nombre.toLowerCase());
if (new Set(nombresDir).size !== nombresDir.length) avi("Directorio: hay nombres repetidos.");
for (const e of BIBLIOTECA.directorio) {
  if (!esHttps(e.url)) err(`Entidad «${e.nombre}»: url inválida.`);
  if (e.rss && !esHttps(e.rss)) err(`Entidad «${e.nombre}»: rss no https.`);
  if (e.datos_abiertos && !esHttps(e.datos_abiertos)) err(`Entidad «${e.nombre}»: datos abiertos no https.`);
}
const hoy = new Date().toISOString().slice(0, 10);
for (const e of BIBLIOTECA.eventos) {
  if (e.fecha !== null && !esFecha(e.fecha)) err(`Evento «${e.nombre}»: fecha inválida.`);
  if (!esHttps(e.url)) err(`Evento «${e.nombre}»: url inválida.`);
  if (e.fecha !== null && e.fecha < hoy.slice(0, e.fecha.length)) avi(`Evento «${e.nombre}» (${e.fecha}) ya pasó.`);
}
for (const f of BIBLIOTECA.fuentes_datos) if (!esHttps(f.url)) err(`Fuente de datos «${f.nombre}»: url inválida.`);
for (const t of BIBLIOTECA.glosario) if (!t.definicion?.trim()) err(`Glosario «${t.termino}»: sin definición.`);

const resumen = [
  `${JUGADORES.length} jugadores`,
  `${INVERSION.rondas.length} rondas`,
  `${PAISES_CEREBRO.length} países`,
  `${HITOS.length} hitos`,
  `${BIBLIOTECA.reportes.length} reportes`,
  `${BIBLIOTECA.directorio.length} entidades`,
  `${BIBLIOTECA.eventos.length} eventos`,
  `${BIBLIOTECA.fuentes_datos.length} fuentes de datos`,
  `${BIBLIOTECA.glosario.length} términos`,
].join(" · ");
console.log(`\nCerebro fintech LATAM — ${resumen}\n`);
for (const a of avisos) console.log(`  aviso  ${a}`);
if (avisos.length) console.log("");
if (errores.length) {
  for (const e of errores) console.error(`  ERROR  ${e}`);
  console.error(`\n${errores.length} error(es) en los datos del Cerebro. No se publica.\n`);
  process.exit(1);
}
console.log("Cerebro verificado: toda cifra tiene fuente, url https y fecha válida.\n");
