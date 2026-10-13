"use client";

import { useEffect, useRef, useState } from "react";
import { sonido } from "./sonido";

/**
 * Pantalla de entrada del prototipo: «Cargando» con la píldora que avanza y,
 * al terminar, «Entre [Comenzar] al dato →». Se ve una vez por sesión; el
 * script en línea de la página la oculta antes de pintar si ya se vio.
 */
export default function Intro() {
  const [fase, setFase] = useState<"carga" | "entrar" | "fuera">("carga");
  const [pct, setPct] = useState(0);
  const [son, setSon] = useState(true);
  const raiz = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLSpanElement>(null);
  const bola = useRef<HTMLSpanElement>(null);
  const comenzar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let visto = false;
    try {
      visto = sessionStorage.getItem("findIntro") === "1";
    } catch {}
    if (visto) {
      setFase("fuera");
      return;
    }
    setSon(sonido.activo);
    const quitar = sonido.suscribir(setSon);
    document.body.classList.add("bloqueado");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cargado = document.readyState === "complete";
    const onLoad = () => {
      cargado = true;
    };
    window.addEventListener("load", onLoad);
    const MIN = reduce ? 300 : 2200;
    const t0 = performance.now();
    let p = 0;
    let fin = false;
    let previo = t0;
    // setInterval y no requestAnimationFrame: avanza aunque la pestaña esté en segundo plano.
    const iv = setInterval(() => {
      const ahora = performance.now();
      const el = ahora - t0;
      const dt = ahora - previo;
      previo = ahora;
      if (document.readyState === "complete") cargado = true;
      const objetivo = cargado && el > MIN ? 100 : Math.min(92, (el / MIN) * 92);
      // Suavizado proporcional al tiempo transcurrido: no se atasca si el navegador frena el intervalo.
      p += (objetivo - p) * (reduce ? 1 : Math.min(1, dt / 200));
      if (objetivo === 100 && p > 99.4) p = 100;
      setPct(Math.round(p));
      const b = barra.current;
      const o = bola.current;
      if (b && o) o.style.transform = `translate(${8 + ((b.clientWidth - o.offsetWidth - 16) * p) / 100}px,-50%)`;
      if (p >= 100 && !fin) {
        fin = true;
        clearInterval(iv);
        setTimeout(() => setFase("entrar"), reduce ? 0 : 350);
      }
    }, 16);
    return () => {
      clearInterval(iv);
      window.removeEventListener("load", onLoad);
      quitar();
    };
  }, []);

  useEffect(() => {
    if (fase === "entrar") comenzar.current?.focus({ preventScroll: true });
  }, [fase]);

  function entrar(conSonido: boolean) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    sonido.activar(conSonido);
    try {
      sessionStorage.setItem("findIntro", "1");
    } catch {}
    const b = comenzar.current?.getBoundingClientRect();
    const wipe = document.createElement("div");
    wipe.className = "wipe";
    const R = Math.hypot(innerWidth, innerHeight) * 2;
    wipe.style.cssText = `left:${b ? b.left + b.width / 2 : innerWidth / 2}px;top:${b ? b.top + b.height / 2 : innerHeight / 2}px;width:${R}px;height:${R}px`;
    document.body.appendChild(wipe);
    setTimeout(() => {
      wipe.style.transform = "translate(-50%,-50%) scale(1)";
    }, 20);
    setTimeout(
      () => {
        setFase("fuera");
        document.body.classList.remove("bloqueado");
        window.dispatchEvent(new Event("intro:hecha"));
        wipe.style.opacity = "0";
        setTimeout(() => wipe.remove(), 700);
        const h = document.querySelector<HTMLElement>(".hero3d h1");
        if (h) {
          h.setAttribute("tabindex", "-1");
          h.focus({ preventScroll: true });
        }
      },
      reduce ? 0 : 850
    );
  }

  if (fase === "fuera") return null;

  return (
    <div className="intro" ref={raiz} role="dialog" aria-modal="true" aria-label="Bienvenida al Observatorio Find">
      <div className="ilogos" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marca/eafit.png" alt="" width={520} height={172} />
        <span className="lg-sep" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marca/find.png" alt="" width={520} height={297} />
      </div>

      <div className={`stage ${fase === "carga" ? "" : "gone"}`}>
        <div className="loadrow" aria-hidden="true">
          <span className="big-t">Cargando</span>
          <span className="pillbar" ref={barra}>
            <span className="fill" style={{ width: `${pct}%` }} />
            <span className="ball" ref={bola} />
          </span>
          <span className="big-t pct">
            <span>{pct}</span>
            <sup>%</sup>
          </span>
        </div>
        <p className="sr-only" role="status">
          {fase === "carga" ? "Cargando el observatorio" : "Observatorio listo"}
        </p>
        <div className="soundbox">
          <button className="sbtn" type="button" aria-pressed={son} onClick={() => sonido.activar(!son)}>
            <svg viewBox="0 0 46 22" aria-hidden="true">
              <g className="wv">
                <path d="M0 11 C4 1,8 1,12 11 S20 21,24 11 S32 1,36 11 S44 21,48 11 S56 1,60 11" />
                <path d="M0 11 C4 18,8 18,12 11 S20 4,24 11 S32 18,36 11 S44 4,48 11 S56 18,60 11" opacity=".5" />
              </g>
            </svg>
            <span>{son ? "Sonido activado" : "Sonido apagado"}</span>
          </button>
          <p className="snote">Para una experiencia más inmersiva usamos efectos de sonido.</p>
        </div>
      </div>

      <div className={`stage ${fase === "entrar" ? "" : "gone"}`}>
        <div className="enterrow">
          <span className="big-t">Entre</span>
          <span className="startwrap">
            <span className="c1" />
            <span className="c2" />
            <button className="startbtn" type="button" ref={comenzar} onClick={() => entrar(son)}>
              Comenzar
            </button>
          </span>
          <span className="big-t">al dato</span>
          <svg className="arrow" viewBox="0 0 96 64" fill="none" stroke="#0B0B12" strokeWidth="9" aria-hidden="true">
            <path d="M2 32h84M58 4l28 28-28 28" />
          </svg>
        </div>
        <button className="skip" type="button" onClick={() => entrar(false)}>
          Entrar sin sonido
        </button>
      </div>
    </div>
  );
}
