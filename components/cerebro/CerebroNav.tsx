"use client";

import { usePathname } from "next/navigation";

const RUTAS = [
  { href: "/cerebro", label: "Panorama" },
  { href: "/cerebro/jugadores", label: "Jugadores" },
  { href: "/cerebro/inversion", label: "Inversión" },
  { href: "/cerebro/paises", label: "Países" },
  { href: "/cerebro/biblioteca", label: "Biblioteca" },
];

export default function CerebroNav() {
  const pathname = usePathname();
  const activa = (href: string) => (href === "/cerebro" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="sticky top-[115px] z-40 border-b border-white/10 bg-[#101010]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6">
        <nav aria-label="Secciones del Cerebro" className="nav-scroll -mx-1 flex gap-1 overflow-x-auto py-2">
          <span className="mr-2 hidden shrink-0 items-center gap-2 pl-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-lime sm:inline-flex">
            <span className="status-dot" />
            Cerebro
          </span>
          {RUTAS.map((r) => (
            <a
              key={r.href}
              href={r.href}
              aria-current={activa(r.href) ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition ${
                activa(r.href) ? "bg-lime text-[#322180]" : "text-white/70 hover:bg-white/[0.1] hover:text-lime"
              }`}
            >
              {r.label}
            </a>
          ))}
        </nav>
        <form method="post" action="/api/cerebro/salir">
          <button type="submit" className="action-quiet shrink-0 px-3 py-1.5 text-[11px]">
            Salir
          </button>
        </form>
      </div>
    </div>
  );
}
