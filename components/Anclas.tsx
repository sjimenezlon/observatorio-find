"use client";

import { useEffect, useRef, useState } from "react";
import { ANCLAS } from "@/data/dataset";

// Contador animado: anima el primer número del string (ej. "44%" → 0→44%,
// "US$4.100M" → US$0M→US$4.100M) cuando la tarjeta entra al viewport.
function CountUp({ valor }: { valor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(valor);
  const arrancado = useRef(false);

  useEffect(() => {
    const m = valor.match(/(\d{1,3}(?:\.\d{3})*(?:,\d+)?|\d+(?:[.,]\d+)?)/);
    if (!m || !ref.current) return;

    const raw = m[1];
    // interpreta formato es-CO: "." miles, "," decimales
    const target = parseFloat(raw.replace(/\./g, "").replace(",", "."));
    const decimales = raw.includes(",") ? raw.split(",")[1].length : 0;
    const miles = raw.includes(".");
    const fmt = (n: number) =>
      n.toLocaleString("es-CO", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,
        useGrouping: miles,
      });

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || arrancado.current) return;
        arrancado.current = true;
        const dur = 1200;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.max(0, Math.min(1, (t - t0) / dur));
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(valor.replace(raw, fmt(target * eased)));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(valor);
        };
        setDisplay(valor.replace(raw, fmt(0)));
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [valor]);

  return (
    <div ref={ref} className="tabnum text-3xl font-extrabold tracking-tight text-teal">
      {display}
    </div>
  );
}

export default function Anclas() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ANCLAS.map((a) => (
        <div key={a.label} className="card p-6 transition hover:border-teal/40">
          <CountUp valor={a.valor} />
          <p className="mt-2 text-sm text-fg/80">{a.label}</p>
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-[11px] text-muted hover:text-teal hover:underline"
          >
            {a.fuente} · {a.anio}
          </a>
        </div>
      ))}
    </div>
  );
}
