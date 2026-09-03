import { NextResponse } from "next/server";
import { COOKIE_SESION } from "@/lib/cerebro/sesion";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const origen = new URL(req.url).origin;
  const res = NextResponse.redirect(new URL("/cerebro/entrar", origen), 303);
  res.cookies.set(COOKIE_SESION, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
