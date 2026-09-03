import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { COOKIE_SESION, destinoSeguro, sesionValida } from "@/lib/cerebro/sesion";

export const metadata: Metadata = {
  title: "Entrar al Cerebro · Observatorio Find",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const jar = await cookies();
  if (await sesionValida(jar.get(COOKIE_SESION)?.value)) redirect(destinoSeguro(next));

  return (
    <main>
      <NavBar />
      <header className="hero-grid relative overflow-clip border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-teal">Capa privada</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-lime">
                  <span className="status-dot" />
                  Cerebro fintech LATAM
                </span>
              </div>
              <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
                El cerebro fintech de América Latina.
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg/72 md:text-lg">
                Jugadores, inversión, regulación por país, biblioteca y señales vivas
                del ecosistema fintech de la región. Es una capa de trabajo del
                Observatorio Find: se entra con clave.
              </p>
            </div>

            <form
              method="post"
              action="/api/cerebro/entrar"
              className="technical-panel p-6 md:p-8"
              aria-label="Entrar al Cerebro"
            >
              <input type="hidden" name="next" value={destinoSeguro(next)} />
              <label htmlFor="clave" className="data-label text-muted">
                Clave de acceso
              </label>
              <input
                id="clave"
                name="clave"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                className="mt-3 w-full rounded-full border border-white/25 bg-black/25 px-5 py-3.5 text-base text-fg outline-none placeholder:text-white/35 focus:border-lime"
                placeholder="••••••••"
              />
              {error ? (
                <p role="alert" className="mt-3 text-sm text-amber">
                  La clave no coincide. Vuelve a intentarlo.
                </p>
              ) : null}
              <button type="submit" className="action-primary mt-5 w-full px-5 py-3.5 text-sm">
                Entrar <span aria-hidden="true">→</span>
              </button>
              <p className="mt-5 text-xs leading-relaxed text-muted">
                La sesión dura 30 días en este navegador. Si no tienes clave, escribe al
                equipo de Find en EAFIT.
              </p>
            </form>
          </div>
        </div>
      </header>
      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Observatorio Find · Universidad EAFIT</span>
          <a className="hover:text-teal" href="/">
            Volver al observatorio público
          </a>
        </div>
      </footer>
    </main>
  );
}
