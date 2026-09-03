import { META } from "@/data/dataset";

export function NavBar() {
  const links = [
    { href: "/dashboards", label: "Dashboards" },
    { href: "/#mapa", label: "Mapa" },
    { href: "/#indice", label: "Índice IIIF" },
    { href: "/pagos", label: "Pagos e ICF" },
    { href: "/#referentes", label: "Benchmark global" },
    { href: "/frontera", label: "Frontera" },
    { href: "/agenda", label: "Agenda" },
    { href: "/presentacion", label: "Presentación" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/metodologia", label: "Metodología" },
    { href: "/cerebro", label: "Cerebro 🔒" },
  ];

  return (
    <div className="site-nav sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <a href="/" className="find-lockup flex shrink-0 items-center gap-3" aria-label="FIND, inicio">
            <span className="find-mark" aria-hidden="true">
              <span />
            </span>
            <span>
              <span className="block text-[1.35rem] font-bold leading-none tracking-[-0.055em]">
                FIND
              </span>
              <span className="mt-1 hidden text-[8px] font-semibold uppercase leading-none tracking-[0.13em] text-white/62 sm:block">
                Centro de Innovación Financiera
              </span>
            </span>
            <span className="hidden border-l border-white/18 pl-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-lime lg:inline">
              Observatorio LATAM
            </span>
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted md:flex">
              <span className="status-dot" />
              Corte {META.version} · ago 2026
            </div>
            <a href="/dashboards" className="action-primary px-4 py-2.5 text-xs">
              Abrir dashboards
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <nav
          aria-label="Navegación principal"
          className="nav-scroll -mx-1 flex gap-1 overflow-x-auto border-t border-white/[0.09] py-2"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-medium text-white/70 transition hover:bg-white/[0.1] hover:text-lime focus-visible:text-lime"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
