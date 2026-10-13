"use client";

import { useEffect, useRef, useState } from "react";
import { SUGERENCIAS } from "@/data/explorador";
import { useInicio } from "./Inicio";
import { sonido } from "./sonido";

type Modo = "orbitas" | "esfera" | "ola";

interface Control {
  modo: Modo;
  velocidad: number;
  densidad: number;
  ondas: boolean;
  reiniciar: number;
}

export default function HeroOrbitas() {
  const { datos, irAPilar, buscar, sonidoActivo, setSonido } = useInicio();
  const hero = useRef<HTMLElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const etiquetas = useRef<HTMLDivElement>(null);
  const brillo = useRef<HTMLDivElement>(null);
  const [sinWebGL, setSinWebGL] = useState(false);
  const [texto, setTexto] = useState("");
  const [ctl, setCtl] = useState<Control>({ modo: "orbitas", velocidad: 1, densidad: 100, ondas: true, reiniciar: 0 });
  const vivo = useRef(ctl);
  vivo.current = ctl;

  const { meta, pilares } = datos;

  useEffect(() => {
    const h = hero.current;
    const cv = lienzo.current;
    const lb = etiquetas.current;
    const gw = brillo.current;
    if (!h || !cv || !lb || !gw) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setCtl((c) => ({ ...c, velocidad: 0, ondas: false }));

    let cancelado = false;
    let limpiar = () => {};

    import("three")
      .then((THREE) => {
        if (cancelado) return;
        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
        } catch {
          setSinWebGL(true);
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.set(0, 0, 10);

        const PER = 1600;
        const NP = pilares.length;
        const N = PER * NP;
        const cur = new Float32Array(N * 3);
        const shown = new Float32Array(N * 3);
        const col = new Float32Array(N * 3);
        const rnd = new Float32Array(N);
        const T: Record<Modo, Float32Array> = {
          orbitas: new Float32Array(N * 3),
          esfera: new Float32Array(N * 3),
          ola: new Float32Array(N * 3),
        };
        const tilt = [
          [0.42, 0],
          [0.5, 0.35],
          [0.58, -0.3],
          [0.66, 0.6],
          [0.74, -0.55],
          [0.82, 0.15],
        ];
        const golden = Math.PI * (3 - Math.sqrt(5));
        const rot = (x: number, y: number, z: number, li: number) => {
          const [tx, tz] = tilt[li % tilt.length];
          const y1 = y * Math.cos(tx) - z * Math.sin(tx);
          const z1 = y * Math.sin(tx) + z * Math.cos(tx);
          return [x * Math.cos(tz) - y1 * Math.sin(tz) + 1.6, x * Math.sin(tz) + y1 * Math.cos(tz), z1];
        };
        for (let k = 0; k < N; k++) {
          const li = k % NP;
          const j = Math.floor(k / NP);
          const g = li * PER + j;
          rnd[k] = Math.random();
          const R = 1.25 + li * 0.62;
          const a = Math.random() * Math.PI * 2;
          const jr = (Math.random() - 0.5) * 0.22;
          const jy = (Math.random() - 0.5) * 0.12;
          T.orbitas.set(rot((R + jr) * Math.cos(a), jy, (R + jr) * Math.sin(a), li), k * 3);
          const yy = 1 - (g / (N - 1)) * 2;
          const rr = Math.sqrt(1 - yy * yy);
          const th = golden * g;
          const S = 3.1 + (Math.random() - 0.5) * 0.08;
          T.esfera.set([Math.cos(th) * rr * S + 1.6, yy * S, Math.sin(th) * rr * S], k * 3);
          const c = g % 120;
          const r = Math.floor(g / 120);
          T.ola.set([(c / 119 - 0.5) * 13 + 1.2, -0.6, (r / 79 - 0.5) * 7.5], k * 3);
          const cc = new THREE.Color(pilares[li].orbita);
          col.set([cc.r, cc.g, cc.b], k * 3);
          cur.set([(Math.random() - 0.5) * 26, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12], k * 3);
        }
        const anclas = pilares.map((_, li) => {
          const R = 1.25 + li * 0.62;
          const a = -0.55 + li * 0.08;
          const [x, y, z] = rot(R * Math.cos(a), 0, R * Math.sin(a), li);
          return new THREE.Vector3(x, y, z);
        });

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(shown, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        const sc = document.createElement("canvas");
        sc.width = sc.height = 64;
        const sx = sc.getContext("2d")!;
        const gr = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(255,255,255,1)");
        gr.addColorStop(0.35, "rgba(255,255,255,.85)");
        gr.addColorStop(1, "rgba(255,255,255,0)");
        sx.fillStyle = gr;
        sx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(sc);
        const mat = new THREE.PointsMaterial({
          size: 0.075,
          map: tex,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.95,
        });
        const pts = new THREE.Points(geo, mat);
        scene.add(pts);

        const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: false };
        const onMove = (e: PointerEvent) => {
          const r = h.getBoundingClientRect();
          mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
          mouse.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
          mouse.on = true;
          gw.style.left = `${e.clientX - r.left}px`;
          gw.style.top = `${e.clientY - r.top}px`;
        };
        const onLeave = () => {
          mouse.on = false;
        };
        h.addEventListener("pointermove", onMove);
        h.addEventListener("pointerleave", onLeave);
        // Al cruzar la pantalla de entrada, las partículas llegan desde lejos.
        const alEntrar = () => {
          for (let k = 0; k < N * 3; k++) cur[k] = (Math.random() - 0.5) * 26;
        };
        window.addEventListener("intro:hecha", alEntrar);

        const size = () => {
          const w = h.clientWidth;
          const hh = h.clientHeight;
          renderer.setSize(w, hh, false);
          camera.aspect = w / hh;
          camera.position.z = w < 700 ? 14 : 10;
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(size);
        ro.observe(h);
        size();
        let visible = true;
        const io = new IntersectionObserver((es) => {
          visible = es[0].isIntersecting;
        });
        io.observe(h);

        const lbls = [...lb.children] as HTMLElement[];
        const v3 = new THREE.Vector3();
        const inv = new THREE.Matrix4();
        let t = 0;
        let rotY = 0;
        let modoPrevio: Modo = "orbitas";
        let densidadPrevia = 100;
        let reinicioPrevio = 0;
        let raf = 0;

        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;
          const st = vivo.current;
          if (st.modo !== modoPrevio) {
            sonido.whoosh();
            modoPrevio = st.modo;
          }
          if (st.densidad !== densidadPrevia) {
            densidadPrevia = st.densidad;
            geo.setDrawRange(0, Math.floor((N * st.densidad) / 100 / NP) * NP);
          }
          if (st.reiniciar !== reinicioPrevio) {
            reinicioPrevio = st.reiniciar;
            for (let k = 0; k < N * 3; k++) cur[k] = (Math.random() - 0.5) * 16;
          }
          t += 0.016 * st.velocidad;
          rotY += 0.0018 * st.velocidad * (st.modo === "ola" ? 0 : 1);
          mouse.x += (mouse.tx - mouse.x) * 0.05;
          mouse.y += (mouse.ty - mouse.y) * 0.05;
          pts.rotation.y = st.modo === "ola" ? pts.rotation.y * 0.95 : rotY;
          pts.rotation.x = st.modo === "ola" ? 0.35 + mouse.y * 0.1 : mouse.y * 0.15;
          camera.position.x = mouse.x * 0.6;
          camera.lookAt(1.2, 0, 0);
          pts.updateMatrixWorld();
          v3.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();
          const dist = -camera.position.z / v3.z;
          const mw = camera.position.clone().add(v3.multiplyScalar(dist));
          inv.copy(pts.matrixWorld).invert();
          mw.applyMatrix4(inv);
          const tgt = T[st.modo];
          const ease = reduce ? 1 : 0.045;
          for (let k = 0; k < N; k++) {
            const i3 = k * 3;
            cur[i3] += (tgt[i3] - cur[i3]) * ease;
            cur[i3 + 1] += (tgt[i3 + 1] - cur[i3 + 1]) * ease;
            cur[i3 + 2] += (tgt[i3 + 2] - cur[i3 + 2]) * ease;
            let x = cur[i3];
            let y = cur[i3 + 1];
            let z = cur[i3 + 2];
            if (st.ondas) {
              if (st.modo === "ola") {
                y += Math.sin(x * 0.9 + t * 1.6) * 0.45 + Math.cos(z * 1.3 + t * 1.1) * 0.35;
              } else {
                const s = Math.sin(t * 1.4 + rnd[k] * 6.283) * 0.06;
                x += s;
                y += Math.sin(x * 1.1 + t * 1.2) * 0.12;
                z += s;
              }
            }
            if (mouse.on) {
              const dx = x - mw.x;
              const dy = y - mw.y;
              const dz = z - mw.z;
              const d2 = dx * dx + dy * dy + dz * dz;
              if (d2 < 1.6) {
                const f = ((1.6 - d2) * 0.55) / Math.sqrt(d2 + 0.001);
                x += dx * f;
                y += dy * f;
                z += dz * f;
              }
            }
            shown[i3] = x;
            shown[i3 + 1] = y;
            shown[i3 + 2] = z;
          }
          geo.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
          const W = h.clientWidth;
          const H = h.clientHeight;
          const mostrar = st.modo === "orbitas";
          lbls.forEach((b, i) => {
            v3.copy(anclas[i]).applyMatrix4(pts.matrixWorld).project(camera);
            const detras = v3.z > 1;
            b.style.left = `${((v3.x + 1) / 2) * W}px`;
            b.style.top = `${((1 - v3.y) / 2) * H}px`;
            b.style.opacity = mostrar && !detras ? "1" : "0";
            b.tabIndex = mostrar ? 0 : -1;
          });
        };
        frame();

        limpiar = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          h.removeEventListener("pointermove", onMove);
          h.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("intro:hecha", alEntrar);
          geo.dispose();
          mat.dispose();
          tex.dispose();
          renderer.dispose();
        };
      })
      .catch(() => setSinWebGL(true));

    return () => {
      cancelado = true;
      limpiar();
    };
  }, [pilares]);

  const conteo = [
    [meta.paises, "países comparados"],
    [meta.indicadores, "indicadores en el índice"],
    [meta.pilares, "pilares del IIIF"],
    [meta.economiasICF, "economías en el ICF"],
  ] as const;

  return (
    <header className="hero3d dark" id="hero" ref={hero}>
      {sinWebGL ? (
        <div className="fallback-orbit" aria-hidden="true">
          <svg viewBox="0 0 520 520" fill="none">
            {[245, 205, 165, 125, 85, 45].map((r, i) => (
              <circle key={r} cx="260" cy="260" r={r} stroke={pilares[i]?.orbita} strokeOpacity=".6" />
            ))}
            <circle cx="260" cy="260" r="30" fill="#E8F222" />
          </svg>
        </div>
      ) : (
        <canvas id="gl" ref={lienzo} aria-hidden="true" />
      )}
      <div className="glow" ref={brillo} aria-hidden="true" />
      <div className="gl-labels" ref={etiquetas}>
        {pilares.map((p) => (
          <button key={p.key} className="gl-label" type="button" onClick={() => irAPilar(p.key)}>
            <i style={{ background: p.orbita }} />
            {p.nombre}
            <span className="n">{p.n} ind.</span>
          </button>
        ))}
      </div>

      <div className="wrap hud">
        <span className="live">{`Corte ${meta.version} · ${meta.curado} · auditado el ${meta.auditoria.replace(
          / de \d{4}$/,
          ""
        )}`}</span>
        <span className="counters">
          <span>
            <b>{meta.paises}</b> países
          </span>
          <span>
            <b>{meta.indicadores}</b> indicadores
          </span>
          <span>
            <b>{meta.pilares}</b> pilares
          </span>
          <span>
            <b>{meta.economiasICF}</b> economías en el ICF
          </span>
        </span>
      </div>

      <div className="wrap herobody-wrap">
        <div className="hero-body">
          <h1>
            Inteligencia financiera <span className="out">latinoamericana,</span>{" "}
            <span className="v">medible y auditable.</span>
          </h1>
          <p className="lead">
            Un sistema público de evidencia para comparar inclusión, pagos, ecosistema, regulación,
            confianza y riesgo financiero en América Latina. Seis dashboards, fuentes trazables y una
            metodología que cualquiera puede replicar.
          </p>
          <div className="herocta">
            <a className="btn btn-volt" href="/dashboards">
              Abrir los 6 dashboards
            </a>
            <a className="btn btn-line" href="#mapa">
              Ver el mapa del índice
            </a>
            <a className="btn btn-line" href="/metodologia">
              Auditar la metodología
            </a>
          </div>
          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              buscar(texto);
            }}
          >
            <label htmlFor="q" className="sr-only">
              Buscar un indicador, país o tema
            </label>
            <svg className="ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="9" r="6" />
              <path d="M14 14l4 4" />
            </svg>
            <input
              id="q"
              type="search"
              placeholder="Busque un indicador, país o tema, por ejemplo Bre-B Colombia"
              autoComplete="off"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-volt" type="submit">
              Buscar
            </button>
          </form>
          <div className="suggest">
            <span>Lo más consultado:</span>
            {SUGERENCIAS.map((s) => (
              <button key={s.q} type="button" onClick={() => buscar(s.q)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {!sinWebGL && (
          <section className="panel3d" aria-label="Personalice la vista de datos">
            <h2>
              Personalice la vista
              <button
                type="button"
                onClick={() =>
                  setCtl((c) => ({ modo: "orbitas", velocidad: 1, densidad: 100, ondas: true, reiniciar: c.reiniciar + 1 }))
                }
              >
                Restablecer
              </button>
            </h2>
            <div className="seg3" role="group" aria-label="Forma de la visualización">
              {(
                [
                  ["orbitas", "Órbitas"],
                  ["esfera", "Esfera"],
                  ["ola", "Ola"],
                ] as const
              ).map(([m, l]) => (
                <button key={m} type="button" aria-pressed={ctl.modo === m} onClick={() => setCtl((c) => ({ ...c, modo: m }))}>
                  {l}
                </button>
              ))}
            </div>
            <div className="ctl">
              <div className="row">
                <label htmlFor="glVel">Velocidad</label>
                <output htmlFor="glVel">{ctl.velocidad.toFixed(1).replace(".", ",")}x</output>
              </div>
              <input
                type="range"
                id="glVel"
                min="0"
                max="3"
                step="0.1"
                value={ctl.velocidad}
                onChange={(e) => setCtl((c) => ({ ...c, velocidad: +e.target.value }))}
              />
            </div>
            <div className="ctl">
              <div className="row">
                <label htmlFor="glDen">Densidad</label>
                <output htmlFor="glDen">{ctl.densidad}%</output>
              </div>
              <input
                type="range"
                id="glDen"
                min="15"
                max="100"
                step="5"
                value={ctl.densidad}
                onChange={(e) => setCtl((c) => ({ ...c, densidad: +e.target.value }))}
              />
            </div>
            <div className="sw">
              <span id="glOndasL">Ondas</span>
              <button
                type="button"
                role="switch"
                aria-checked={ctl.ondas}
                aria-labelledby="glOndasL"
                onClick={() => setCtl((c) => ({ ...c, ondas: !c.ondas }))}
              />
            </div>
            <div className="sw">
              <span id="glSonL">Sonido</span>
              <button
                type="button"
                role="switch"
                aria-checked={sonidoActivo}
                aria-labelledby="glSonL"
                onClick={() => setSonido(!sonidoActivo)}
              />
            </div>
            <p className="hint">Mueva el cursor sobre los puntos para dispersarlos.</p>
          </section>
        )}

        <div className="legend" aria-label="Abrir un pilar en el explorador">
          {pilares.map((p) => (
            <button key={p.key} type="button" onClick={() => irAPilar(p.key)}>
              <i style={{ background: p.orbita }} />
              {p.nombre}
            </button>
          ))}
        </div>
        <div className="stats">
          {conteo.map(([n, t]) => (
            <div className="stat" key={t}>
              <b className="tab-n">{n}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
