export function NavBar() {
  const links = [
    { href: "/#mapa", label: "Mapa" },
    { href: "/#indice", label: "Índice" },
    { href: "/pagos", label: "Pagos" },
    { href: "/frontera", label: "Frontera" },
    { href: "/agenda", label: "Agenda" },
    { href: "/presentacion", label: "Presentación" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/metodologia", label: "Metodología" },
  ];
  return (
    <div className="sticky top-0 z-50 border-b border-white/8 bg-[#0a2c28]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-2.5">
          <span className="text-lg font-extrabold tracking-tight">
            fin<span className="text-lime">d</span>
          </span>
          <span className="hidden border-l border-white/20 pl-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-teal sm:inline">
            Observatorio
          </span>
        </a>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3 py-1.5 text-muted transition hover:bg-white/5 hover:text-fg md:inline-block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/roadmap"
            className="rounded-full px-3 py-1.5 text-muted transition hover:bg-white/5 hover:text-fg md:hidden"
          >
            Roadmap
          </a>
          <a
            href="/#datos"
            className="ml-1 rounded-full bg-teal px-3.5 py-1.5 font-semibold text-[#06231f] transition hover:bg-teal-d"
          >
            Datos
          </a>
        </nav>
      </div>
    </div>
  );
}
