import { META } from "@/data/dataset";

export function NavBar() {
  const links = [
    { href: "/#mapa", label: "Mapa" },
    { href: "/#indice", label: "Índice IMIAF" },
    { href: "/pagos", label: "Pagos e ICF" },
    { href: "/#referentes", label: "Benchmark global" },
    { href: "/frontera", label: "Frontera" },
    { href: "/agenda", label: "Agenda" },
    { href: "/presentacion", label: "Presentación" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/metodologia", label: "Metodología" },
  ];

  return (
    <div className="site-nav sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Find, inicio">
            <span className="text-xl font-extrabold tracking-[-0.04em]">
              fin<span className="text-lime">d</span>
            </span>
            <span className="hidden border-l border-white/15 pl-3 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-fg/55 sm:inline">
              Intelligence observatory
            </span>
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted md:flex">
              <span className="status-dot" />
              Corte {META.version} · ago 2026
            </div>
            <a href="/#datos" className="action-primary px-4 py-2 text-xs">
              Explorar datos
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <nav
          aria-label="Navegación principal"
          className="nav-scroll -mx-1 flex gap-1 overflow-x-auto border-t border-white/[0.055] py-2"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-medium text-muted transition hover:bg-white/[0.055] hover:text-fg focus-visible:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
