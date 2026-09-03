// -----------------------------------------------------------------------------
// Sesión del Cerebro — compuerta en el servidor
//
// La clave se compara en el servidor (nunca viaja al HTML) y la sesión es una
// cookie httpOnly con un token firmado con CEREBRO_SECRET. El token lleva su
// caducidad dentro: cada entrada emite uno distinto y ninguno vive más de 30
// días aunque la cookie se copie. Rotar el secreto los invalida todos. Todo
// aquí usa Web Crypto para que funcione igual en el proxy y en los handlers.
// -----------------------------------------------------------------------------

const enc = new TextEncoder();

/** En Vercel (HTTPS) la cookie lleva el prefijo __Host-: exige Secure, Path=/ y sin Domain, así ningún subdominio puede sobrescribirla. */
export const COOKIE_SESION = process.env.VERCEL === "1" ? "__Host-find_cerebro" : "find_cerebro";
export const DIAS_SESION = 30;
const MS_SESION = DIAS_SESION * 24 * 60 * 60 * 1000;
const ETIQUETA = "observatorio-find/cerebro/v2";

async function firmar(secreto: string, mensaje: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const firma = await crypto.subtle.sign("HMAC", key, enc.encode(mensaje));
  return Array.from(new Uint8Array(firma))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token nuevo: `<caducidad en ms>.<HMAC(secreto, etiqueta + caducidad)>`. */
export async function emitirSesion(secreto: string, ahora = Date.now()): Promise<string> {
  const exp = ahora + MS_SESION;
  return `${exp}.${await firmar(secreto, `${ETIQUETA}/${exp}`)}`;
}

/** Comparación en tiempo constante (no corta en la primera diferencia). */
export function iguales(a: string, b: string): boolean {
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

/** ¿La cookie recibida está firmada con el secreto vigente y no ha caducado? */
export async function sesionValida(cookie: string | undefined, ahora = Date.now()): Promise<boolean> {
  const secreto = process.env.CEREBRO_SECRET;
  if (!secreto || !cookie || cookie.length > 120) return false;
  const m = cookie.match(/^(\d{10,16})\.([0-9a-f]{64})$/);
  if (!m) return false;
  const exp = Number(m[1]);
  // Caducado, o con una fecha imposible (más lejos de lo que este servidor emite).
  if (!(exp > ahora) || exp > ahora + MS_SESION) return false;
  return iguales(m[2], await firmar(secreto, `${ETIQUETA}/${exp}`));
}

/** Solo se vuelve a rutas del propio Cerebro: nada de redirecciones abiertas. */
export function destinoSeguro(n: unknown): string {
  const s = String(n ?? "/cerebro");
  return s.startsWith("/cerebro") && !s.startsWith("//") && !s.includes("\\") ? s : "/cerebro";
}

/** Origen del navegador que envía el formulario. Una petición de otro sitio no entra ni sale. */
export function mismoOrigen(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin) return false;
  return true;
}

/** IP del cliente para el registro de intentos (Vercel la pone en x-forwarded-for). */
export function ipCliente(req: Request): string {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "desconocida";
}
