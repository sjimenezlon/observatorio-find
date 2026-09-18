"use client";

import { useEffect, useId, useRef, useState } from "react";
import { META } from "@/data/dataset";

const PRINCIPALES = [
  { href: "/dashboards", label: "Dashboards" },
  { href: "/#indice", label: "Índice" },
  { href: "/pagos", label: "Pagos e ICF" },
  { href: "/test", label: "Test de IA" },
];

const MAS = [
  { href: "/#mapa", label: "Mapa" },
  { href: "/#referentes", label: "Benchmark global" },
  { href: "/frontera", label: "Frontera" },
  { href: "/agenda", label: "Agenda" },
  { href: "/presentacion", label: "Presentación" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/cerebro", label: "Cerebro" },
];

export function NavBar() {
  const [abierto, setAbierto] = useState(false);
  const [mas, setMas] = useState(false);
  const masRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const masId = useId();

  useEffect(() => {
    if (!abierto && !mas) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        setMas(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (masRef.current && !masRef.current.contains(e.target as Node)) {
        setMas(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [abierto, mas]);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

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

          <nav
            aria-label="Secciones principales"
            className="hidden items-center gap-1 lg:flex"
          >
            {PRINCIPALES.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white/78 transition hover:bg-white/[0.1] hover:text-lime"
              >
                {link.label}
              </a>
            ))}
            <div className="relative" ref={masRef}>
              <button
                type="button"
                className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white/78 transition hover:bg-white/[0.1] hover:text-lime"
                aria-expanded={mas}
                aria-controls={masId}
                onClick={() => setMas((v) => !v)}
              >
                Más
                <span aria-hidden="true" className="ml-1 text-[10px]">
                  {mas ? "▴" : "▾"}
                </span>
              </button>
              {mas && (
                <div
                  id={masId}
                  className="absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[13rem] rounded-2xl border border-white/12 bg-[#3d24be] p-1.5 shadow-[0_18px_40px_rgba(16,8,72,0.35)]"
                >
                  {MAS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-[12.5px] text-white/80 transition hover:bg-white/[0.08] hover:text-lime"
                      onClick={() => setMas(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted md:flex">
              <span className="status-dot" />
              Corte {META.version} · {META.curado.replace(" de ", " ")}
            </div>
            <a href="/dashboards" className="action-primary hidden px-4 py-2.5 text-xs sm:inline-flex">
              Abrir dashboards
              <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 text-fg lg:hidden"
              aria-expanded={abierto}
              aria-controls={menuId}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setAbierto((v) => !v)}
            >
              <span className="sr-only">{abierto ? "Cerrar" : "Menú"}</span>
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span className={`block h-px w-4 bg-lime transition ${abierto ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-lime transition ${abierto ? "opacity-0" : ""}`} />
                <span className={`block h-px w-4 bg-lime transition ${abierto ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {abierto && (
        <nav
          id={menuId}
          aria-label="Navegación completa"
          className="border-t border-white/10 bg-[#3d24be] px-6 py-4 lg:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-1">
            <p className="px-2 pb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-lime">
              Corte {META.version} · {META.curado}
            </p>
            {[...PRINCIPALES, ...MAS].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/85 hover:bg-white/[0.08] hover:text-lime"
                onClick={() => setAbierto(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dashboards"
              className="action-primary mt-2 justify-center px-4 py-2.5 text-sm sm:hidden"
              onClick={() => setAbierto(false)}
            >
              Abrir dashboards
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
