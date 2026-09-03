import { NextResponse } from "next/server";
import { COOKIE_SESION, mismoOrigen } from "@/lib/cerebro/sesion";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!mismoOrigen(req)) return NextResponse.json({ ok: false, error: "Origen no permitido" }, { status: 403 });
  const origen = new URL(req.url).origin;
  const res = NextResponse.redirect(new URL("/cerebro/entrar", origen), 303);
  res.cookies.set(COOKIE_SESION, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
