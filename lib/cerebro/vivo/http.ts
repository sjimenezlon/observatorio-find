// -----------------------------------------------------------------------------
// Señales vivas del Cerebro · utilidades de red (solo servidor)
//
// Estas son las ÚNICAS peticiones a dominios externos del sitio, y corren en el
// servidor durante la (re)generación de las páginas del Cerebro, nunca en el
// navegador. Cada fuente falla en silencio y por separado: si un proveedor no
// responde, la sección lo dice y el resto de la página sigue en pie.
// -----------------------------------------------------------------------------

import "server-only";

export const UA = "ObservatorioFind/1.0 (Universidad EAFIT; sjimenezlon@gmail.com)";

export interface Fuente {
  nombre: string;
  url: string;
}

export type Vivo<T> =
  | { ok: true; datos: T; obtenido: string; fuente: Fuente }
  | { ok: false; error: string; obtenido: string; fuente: Fuente };

interface Opciones {
  timeoutMs?: number;
  headers?: Record<string, string>;
  /** Segundos de caché de datos de Next (por defecto 3600). Las respuestas de más de 2 MB no entran en esa caché, pero la página sigue siendo estática y se regenera sola. */
  revalidate?: number;
}

async function pedir(url: string, o: Opciones = {}): Promise<Response> {
  const init: RequestInit & { next?: { revalidate: number } } = {
    headers: { "user-agent": UA, accept: "application/json, application/rss+xml, text/xml, text/plain;q=0.8, */*;q=0.5", ...(o.headers ?? {}) },
    signal: AbortSignal.timeout(o.timeoutMs ?? 20_000),
  };
  // Nunca `no-store`: eso volvería dinámica la página y las señales se pedirían en cada visita.
  init.next = { revalidate: o.revalidate && o.revalidate > 0 ? o.revalidate : 3600 };
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${new URL(url).host}`);
  return res;
}

export async function getJSON<T>(url: string, o?: Opciones): Promise<T> {
  const res = await pedir(url, o);
  return (await res.json()) as T;
}

export async function getTexto(url: string, o?: Opciones): Promise<string> {
  const res = await pedir(url, o);
  return await res.text();
}

export function ahora(): string {
  return new Date().toISOString();
}

/** Envuelve una carga: nunca lanza, siempre devuelve un Vivo<T>. */
export async function envolver<T>(fuente: Fuente, cargar: () => Promise<T>): Promise<Vivo<T>> {
  try {
    const datos = await cargar();
    return { ok: true, datos, obtenido: ahora(), fuente };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.warn(`[cerebro] ${fuente.nombre}: ${error}`);
    return { ok: false, error, obtenido: ahora(), fuente };
  }
}

/** Decodifica entidades XML básicas (los RSS vienen con &amp; y CDATA). */
export function desentificar(s: string): string {
  // Una sola pasada: cada entidad se decide de una vez y «&amp;lt;» queda como «&lt;»
  // (texto literal), no como «<». Así no hay doble desescape.
  const MAPA: Record<string, string> = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&amp;": "&" };
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(?:lt|gt|quot|amp|apos|#39|#(\d+));/g, (m, n?: string) => (n ? String.fromCodePoint(Number(n)) : MAPA[m] ?? m))
    .trim();
}

export function etiqueta(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return m ? desentificar(m[1]) : "";
}
