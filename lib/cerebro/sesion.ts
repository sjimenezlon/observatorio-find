// -----------------------------------------------------------------------------
// Sesión del Cerebro — compuerta en el servidor
//
// La clave se compara en el servidor (nunca viaja al HTML) y la sesión es una
// cookie httpOnly con un token HMAC derivado de CEREBRO_SECRET. Todo aquí usa
// Web Crypto para que funcione igual en el proxy y en los route handlers.
// -----------------------------------------------------------------------------

const enc = new TextEncoder();

export const COOKIE_SESION = "find_cerebro";
export const DIAS_SESION = 30;

/** Token de sesión: HMAC-SHA256(secreto, etiqueta fija) en hex. Rotar el secreto cierra todas las sesiones. */
export async function tokenSesion(secreto: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign("HMAC", key, enc.encode("observatorio-find/cerebro/v1"));
  return Array.from(new Uint8Array(firma))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

/** ¿La cookie recibida corresponde al secreto vigente? */
export async function sesionValida(cookie: string | undefined): Promise<boolean> {
  const secreto = process.env.CEREBRO_SECRET;
  if (!secreto || !cookie) return false;
  return iguales(cookie, await tokenSesion(secreto));
}

/** Solo se vuelve a rutas del propio Cerebro: nada de redirecciones abiertas. */
export function destinoSeguro(n: unknown): string {
  const s = String(n ?? "/cerebro");
  return s.startsWith("/cerebro") && !s.startsWith("//") ? s : "/cerebro";
}
