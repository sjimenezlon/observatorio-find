import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESION, sesionValida } from "@/lib/cerebro/sesion";

// -----------------------------------------------------------------------------
// Compuerta del Cerebro (/cerebro y /api/cerebro)
//
// Se decide aquí, antes de servir nada: sin cookie válida no sale ni el HTML
// prerenderizado ni el payload RSC. Solo la página de entrada y su endpoint
// son públicos. El resto del observatorio no pasa por este archivo.
// -----------------------------------------------------------------------------

const PUBLICAS = new Set(["/cerebro/entrar", "/api/cerebro/entrar"]);

function privada(res: NextResponse): NextResponse {
  // Ningún intermediario ni el propio navegador deben guardar una copia de lo que hay tras la clave.
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLICAS.has(pathname)) return privada(NextResponse.next());

  if (await sesionValida(req.cookies.get(COOKIE_SESION)?.value)) return privada(NextResponse.next());

  if (pathname.startsWith("/api/")) {
    return privada(NextResponse.json({ error: "Sin sesión" }, { status: 401 }));
  }

  const url = req.nextUrl.clone();
  url.pathname = "/cerebro/entrar";
  url.search = "";
  if (pathname !== "/cerebro") url.searchParams.set("next", pathname);
  return privada(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/cerebro/:path*", "/api/cerebro/:path*"],
};
