import { NextResponse } from "next/server";
import { COOKIE_SESION, DIAS_SESION, destinoSeguro, emitirSesion, iguales, ipCliente, mismoOrigen } from "@/lib/cerebro/sesion";

export const dynamic = "force-dynamic";

// Acepta el formulario clásico (POST urlencoded → 303, funciona sin JavaScript)
// y JSON (para pruebas). La clave no distingue mayúsculas en la primera letra
// porque el teclado del celular la capitaliza solo.
//
// Defensas: solo peticiones del propio origen (nada de formularios ajenos),
// clave acotada a 128 caracteres, comparación en tiempo constante, medio
// segundo de castigo por fallo, y el firewall de Vercel corta a 10 intentos
// por minuto y por IP. Cada fallo queda en el registro con IP y agente.

const limpiar = (s: unknown) => String(s ?? "").trim();
const normalizar = (s: string) => (s.length ? s[0].toLowerCase() + s.slice(1) : s);

export async function POST(req: Request) {
  if (!mismoOrigen(req)) {
    console.warn("[cerebro] entrada rechazada por origen", { ip: ipCliente(req), origin: req.headers.get("origin") });
    return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
  }

  const tipo = req.headers.get("content-type") ?? "";
  let clave = "";
  let next = "/cerebro";
  let esForm = false;
  try {
    if (tipo.includes("application/json")) {
      const body = (await req.json()) as { clave?: string; next?: string };
      clave = limpiar(body.clave);
      next = destinoSeguro(body.next);
    } else {
      const form = await req.formData();
      clave = limpiar(form.get("clave"));
      next = destinoSeguro(form.get("next"));
      esForm = true;
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (clave.length === 0 || clave.length > 128) {
    return NextResponse.json({ ok: false, error: "Clave inválida" }, { status: 400 });
  }

  const esperada = process.env.CEREBRO_PW ?? "";
  const secreto = process.env.CEREBRO_SECRET ?? "";
  const ok = esperada.length > 0 && secreto.length > 0 && iguales(normalizar(clave), normalizar(esperada));
  const origen = new URL(req.url).origin;

  if (!ok) {
    console.warn("[cerebro] clave rechazada", { ip: ipCliente(req), ua: (req.headers.get("user-agent") ?? "").slice(0, 120) });
    await new Promise((r) => setTimeout(r, 500));
    if (esForm) {
      return NextResponse.redirect(new URL(`/cerebro/entrar?error=1&next=${encodeURIComponent(next)}`, origen), 303);
    }
    return NextResponse.json({ ok: false, error: "Clave incorrecta" }, { status: 401 });
  }

  const res = esForm ? NextResponse.redirect(new URL(next, origen), 303) : NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_SESION, await emitirSesion(secreto), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * DIAS_SESION,
  });
  return res;
}
