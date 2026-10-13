"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PRINCIPALES = [
  { href: "/dashboards", label: "Dashboards" },
  { href: "/indice", label: "Índice" },
  { href: "/pagos", label: "Pagos e ICF" },
  { href: "/test", label: "Test de IA" },
];

const MAS = [
  { href: "/roadmap", label: "Roadmap fintech Colombia" },
  { href: "/agenda", label: "Agenda de medición" },
  { href: "/frontera", label: "Frontera regulatoria" },
  { href: "/presentacion", label: "Presentación" },
  { href: "/metodologia", label: "Metodología y auditoría" },
  { href: "/cerebro", label: "Cerebro" },
];

/** `extras`: controles que una página agrega a la barra (la portada pone EN y sonido). */
export function NavBar({ extras }: { extras?: React.ReactNode } = {}) {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [mas, setMas] = useState(false);
  const masRef = useRef<HTMLLIElement>(null);
  const masBtn = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const masId = useId();

  const actual = (href: string) => (ruta === href || ruta.startsWith(`${href}/`) ? "page" : undefined);
  const enMas = MAS.some((l) => actual(l.href));

  useEffect(() => {
    if (!abierto && !mas) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mas) masBtn.current?.focus();
      setAbierto(false);
      setMas(false);
    };
    const onClick = (e: MouseEvent) => {
      if (masRef.current && !masRef.current.contains(e.target as Node)) setMas(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [abierto, mas]);

  return (
    <nav className="nav-find" aria-label="Principal">
      <div className="nav-wrap">
        <a className="logos" href="/" aria-label="Observatorio Find, Universidad EAFIT. Ir al inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/eafit.png" alt="Universidad EAFIT" className="lg-eafit" width={520} height={172} />
          <span className="lg-sep" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/find.png" alt="Find, Centro de Innovación Financiera" className="lg-find" width={520} height={297} />
        </a>

        <ul className="mainnav">
          {PRINCIPALES.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={actual(l.href)}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="more" ref={masRef}>
            <button
              ref={masBtn}
              type="button"
              aria-expanded={mas}
              aria-controls={masId}
              data-activo={enMas || undefined}
              onClick={() => setMas((v) => !v)}
            >
              Más
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z" />
              </svg>
            </button>
            {mas && (
              <ul id={masId} className="moremenu">
                {MAS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} aria-current={actual(l.href)} onClick={() => setMas(false)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {extras}

        <button
          className="menubtn"
          type="button"
          aria-expanded={abierto}
          aria-controls={menuId}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>
      </div>

      {abierto && (
        <div className="mobilemenu" id={menuId}>
          <a href="/" aria-current={ruta === "/" ? "page" : undefined}>
            Inicio
          </a>
          {[...PRINCIPALES, ...MAS].map((l) => (
            <a key={l.href} href={l.href} aria-current={actual(l.href)} onClick={() => setAbierto(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
