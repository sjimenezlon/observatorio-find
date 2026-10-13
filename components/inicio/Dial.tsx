"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInicio } from "./Inicio";
import { valorPais } from "./formato";
import { sonido } from "./sonido";

const cx = 800;
const cy = 860;
const RD = 560;
const RO1 = 600;
const RO2 = 640;
const RL = 690;
const RI1 = 360;
const RI2 = 395;
const RIL = 455;

const P = (r: number, a: number) => {
  const t = ((a - 90) * Math.PI) / 180;
  return [Math.round((cx + r * Math.cos(t)) * 100) / 100, Math.round((cy + r * Math.sin(t)) * 100) / 100];
};

export default function Dial() {
  const { datos, pais, abrir, irAPilar } = useInicio();
  const { pilares, indicadores } = datos;
  const svg = useRef<SVGSVGElement>(null);
  const exterior = useRef<SVGGElement>(null);
  const interior = useRef<SVGGElement>(null);
  const envoltura = useRef<HTMLDivElement>(null);
  const seccion = useRef<HTMLElement>(null);
  const [foco, setFoco] = useState(0);
  const [movil, setMovil] = useState(false);

  const orden = useMemo(
    () =>
      [...indicadores].sort(
        (a, b) => pilares.findIndex((p) => p.key === a.pilar) - pilares.findIndex((p) => p.key === b.pilar)
      ),
    [indicadores, pilares]
  );
  const pasoExt = 360 / orden.length;
  const pasoInt = 360 / pilares.length;

  const giro = useRef({ scroll: 0, drag: 0, cur: 0, raf: 0, ultimo: -1 });

  useEffect(() => {
    const mq = matchMedia("(max-width:700px)");
    const f = () => setMovil(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = giro.current;
    const aplicar = () => {
      const objetivo = g.scroll + g.drag;
      g.cur += (objetivo - g.cur) * (reduce ? 1 : 0.12);
      exterior.current?.setAttribute("transform", `rotate(${g.cur} ${cx} ${cy})`);
      interior.current?.setAttribute("transform", `rotate(${-g.cur * 0.35} ${cx} ${cy})`);
      let idx = Math.round(-g.cur / pasoExt) % orden.length;
      if (idx < 0) idx += orden.length;
      if (idx !== g.ultimo) {
        g.ultimo = idx;
        setFoco(idx);
        sonido.tick();
      }
      g.raf = Math.abs(objetivo - g.cur) > 0.05 ? requestAnimationFrame(aplicar) : 0;
    };
    const empujar = () => {
      if (!g.raf) g.raf = requestAnimationFrame(aplicar);
    };
    const onScroll = () => {
      const s = seccion.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      if (p < 0 || p > 1) return;
      g.scroll = -(p * 180 - 20);
      empujar();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    aplicar();

    const w = envoltura.current!;
    let sx: number | null = null;
    let base = 0;
    let inicioX = 0;
    const down = (e: PointerEvent) => {
      inicioX = e.clientX;
      if ((e.target as Element).closest(".btn")) return;
      sx = e.clientX;
      base = g.drag;
      w.classList.add("drag");
    };
    const move = (e: PointerEvent) => {
      if (sx === null) return;
      if (Math.abs(e.clientX - inicioX) > 4 && !w.hasPointerCapture(e.pointerId)) w.setPointerCapture(e.pointerId);
      g.drag = base + (e.clientX - sx) * 0.25;
      empujar();
    };
    const up = () => {
      sx = null;
      w.classList.remove("drag");
    };
    const click = (e: MouseEvent) => {
      if (Math.abs(e.clientX - inicioX) > 6) return;
      const t = e.target as Element;
      const a = t.closest<SVGGElement>("[data-ind]");
      const b = t.closest<SVGGElement>("[data-pilar]");
      if (a) abrir(a.dataset.ind!);
      if (b) irAPilar(b.dataset.pilar!);
    };
    const tecla = (e: KeyboardEvent) => {
      const t = e.target as Element;
      const a = t.closest<SVGGElement>("[data-ind]");
      const b = t.closest<SVGGElement>("[data-pilar]");
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (a) abrir(a.dataset.ind!);
        if (b) irAPilar(b.dataset.pilar!);
      }
      if (a && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        e.preventDefault();
        g.drag += e.key === "ArrowRight" ? -pasoExt : pasoExt;
        empujar();
      }
    };
    const enfoque = (e: FocusEvent) => {
      const a = (e.target as Element).closest<SVGGElement>("[data-ind]");
      if (!a) return;
      const k = orden.findIndex((i) => i.key === a.dataset.ind);
      g.drag = -k * pasoExt - g.scroll;
      empujar();
    };
    w.addEventListener("pointerdown", down);
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerup", up);
    w.addEventListener("pointercancel", up);
    const s = svg.current!;
    s.addEventListener("click", click);
    s.addEventListener("keydown", tecla);
    s.addEventListener("focusin", enfoque);
    return () => {
      cancelAnimationFrame(g.raf);
      g.raf = 0;
      window.removeEventListener("scroll", onScroll);
      w.removeEventListener("pointerdown", down);
      w.removeEventListener("pointermove", move);
      w.removeEventListener("pointerup", up);
      w.removeEventListener("pointercancel", up);
      s.removeEventListener("click", click);
      s.removeEventListener("keydown", tecla);
      s.removeEventListener("focusin", enfoque);
    };
  }, [abrir, irAPilar, orden, pasoExt]);

  const marcasExt = [];
  for (let a = 0; a < 360; a += 3) {
    const [x1, y1] = P(RO1 + 12, a);
    const [x2, y2] = P(RO2, a);
    marcasExt.push(<line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0B0B12" strokeOpacity=".45" strokeWidth="2" />);
  }
  const marcasInt = [];
  for (let a = 0; a < 360; a += 2.5) {
    const [x1, y1] = P(RI1 + 18, a);
    const [x2, y2] = P(RI2, a);
    marcasInt.push(<line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F0F0F0" strokeOpacity=".5" strokeWidth="1.6" />);
  }

  const enFoco = orden[foco];
  const plFoco = pilares.find((p) => p.key === enFoco.pilar)!;
  const nombrePais = datos.paises.find((p) => p.code === pais)!.nombre;

  return (
    <section className="dialsec" id="mapa" aria-labelledby="dial-t" ref={seccion}>
      <div className="wrap dialhead">
        <div>
          <p className="eyebrow">Mapa del observatorio</p>
          <h2 id="dial-t">Gire el dial y descubra cada indicador</h2>
        </div>
        <p>
          {`El anillo exterior reúne los ${orden.length} indicadores del índice y el interior sus ${
            pilares.length === 6 ? "seis" : pilares.length
          } pilares. Desplácese o arrastre para girarlo. Toque cualquier nombre para abrirlo.`}
        </p>
      </div>
      <div className="dialwrap" ref={envoltura}>
        <svg
          ref={svg}
          viewBox={movil ? "330 170 940 550" : "0 0 1600 720"}
          role="group"
          aria-label="Dial de indicadores y pilares"
        >
          <defs>
            <radialGradient id="dome" cx="50%" cy="100%" r="80%">
              <stop offset="0" stopColor="#1A1530" />
              <stop offset="1" stopColor="#0B0B12" />
            </radialGradient>
          </defs>
          <g ref={exterior}>
            {marcasExt}
            {orden.map((i, k) => {
              const a = k * pasoExt;
              const [x1, y1] = P(RD + 8, a);
              const [x2, y2] = P(RO2 + 14, a);
              const pl = pilares.find((p) => p.key === i.pilar)!;
              return (
                <g key={i.key} className="dial-hit" role="button" tabIndex={0} data-ind={i.key} aria-label={`Abrir ${i.label}`}>
                  <line className="mk" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0B0B12" strokeWidth="2.5" />
                  <g transform={`rotate(${a} ${cx} ${cy})`}>
                    <circle cx={cx} cy={cy - RO2 - 26} r="6" fill={pl.color} stroke="#0B0B12" strokeWidth="1.5" />
                    <text className="dial-lbl" x={cx} y={cy - RL} textAnchor="middle">
                      {i.corto}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
          <circle cx={cx} cy={cy} r={RD} fill="url(#dome)" />
          <g ref={interior}>
            {marcasInt}
            {pilares.map((p, k) => {
              const a = k * pasoInt;
              const [x1, y1] = P(RI1 - 30, a);
              const [x2, y2] = P(RI2 + 10, a);
              return (
                <g
                  key={p.key}
                  className="dial-hit in"
                  role="button"
                  tabIndex={0}
                  data-pilar={p.key}
                  aria-label={`Ver indicadores de ${p.nombre}`}
                >
                  <line className="mk" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F0F0F0" strokeWidth="2.5" />
                  <g transform={`rotate(${a} ${cx} ${cy})`}>
                    <text className="dial-lbl in" x={cx} y={cy - RIL} textAnchor="middle">
                      {p.corto}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
          <path
            d={`M${cx - 12} ${cy - RD - 2} L${cx + 12} ${cy - RD - 2} L${cx} ${cy - RD + 18} Z`}
            fill="#E8F222"
            stroke="#0B0B12"
            strokeWidth="2"
          />
        </svg>
        <div className="focus-card" aria-live="polite">
          <span className="k">{`En foco · ${plFoco.nombre} · ${nombrePais}`}</span>
          <span className="n">{enFoco.label}</span>
          <span className="v">
            <b className="tab-n">{valorPais(enFoco, pais)}</b>
            <span className="delta good">{enFoco.mayorEsMejor ? "↑ mejor" : "↓ mejor"}</span>
          </span>
          <button className="btn btn-volt" type="button" onClick={() => abrir(enFoco.key)}>
            Abrir ficha
          </button>
        </div>
        <span className="dialhint">Arrastre para girar</span>
      </div>
    </section>
  );
}
