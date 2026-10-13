"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CC } from "@/data/dataset";
import type { DatosInicio, IndicadorInicio } from "@/lib/inicio";
import { cifra, cifraConUnidad, sufijo } from "./formato";
import { sonido } from "./sonido";

interface Ctx {
  datos: DatosInicio;
  pais: CC;
  setPais: (c: CC) => void;
  pilar: string;
  setPilar: (p: string) => void;
  q: string;
  setQ: (q: string) => void;
  abrir: (key: string) => void;
  irAPilar: (p: string) => void;
  buscar: (texto: string) => void;
  ind: (key: string) => IndicadorInicio;
  sonidoActivo: boolean;
  setSonido: (v: boolean) => void;
}

const InicioCtx = createContext<Ctx | null>(null);

export function useInicio() {
  const c = useContext(InicioCtx);
  if (!c) throw new Error("useInicio fuera de <InicioProvider>");
  return c;
}

const sinTildes = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function irA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
}

export function InicioProvider({ datos, children }: { datos: DatosInicio; children: React.ReactNode }) {
  const [pais, setPais] = useState<CC>("CO");
  const [pilar, setPilar] = useState("all");
  const [q, setQ] = useState("");
  const [abierto, setAbierto] = useState<string | null>(null);
  const [sonidoActivo, setSonidoActivo] = useState(true);

  useEffect(() => {
    setSonidoActivo(sonido.activo);
    return sonido.suscribir(setSonidoActivo);
  }, []);

  const porKey = useMemo(
    () => Object.fromEntries(datos.indicadores.map((i) => [i.key, i])),
    [datos.indicadores]
  );
  const ind = useCallback((key: string) => porKey[key], [porKey]);

  const irAPilar = useCallback((p: string) => {
    setPilar(p);
    setQ("");
    setTimeout(() => irA("explorar"), 30);
  }, []);

  const buscar = useCallback(
    (texto: string) => {
      const t = sinTildes(texto);
      const encontrado = datos.paises.find((p) => t.includes(sinTildes(p.nombre)));
      if (encontrado) setPais(encontrado.code);
      setQ(encontrado ? t.replace(sinTildes(encontrado.nombre), "").trim() : texto.trim());
      setPilar("all");
      setTimeout(() => irA("explorar"), 30);
    },
    [datos.paises]
  );

  const setSonido = useCallback((v: boolean) => sonido.activar(v), []);

  // Clics y pasos del cursor suenan solo si el sonido está activo.
  useEffect(() => {
    const sel = ".tile,.btn,.lc,.gl-label,.legend button,.aud-item,.seg3 button,.newscard";
    const over = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(sel)) sonido.tick();
    };
    const click = (e: MouseEvent) => {
      sonido.desbloquear();
      if ((e.target as Element)?.closest?.(sel)) sonido.click();
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, []);

  const valor: Ctx = {
    datos,
    pais,
    setPais,
    pilar,
    setPilar,
    q,
    setQ,
    abrir: setAbierto,
    irAPilar,
    buscar,
    ind,
    sonidoActivo,
    setSonido,
  };

  return (
    <InicioCtx.Provider value={valor}>
      {children}
      <FichaIndicador indKey={abierto} onClose={() => setAbierto(null)} />
    </InicioCtx.Provider>
  );
}

const TIPO: Record<IndicadorInicio["tipo"], string> = {
  tercero: "Dato publicado por un tercero",
  derivado: "Cálculo del Observatorio sobre cifras publicadas",
  construido: "Índice construido por el Observatorio (rúbrica)",
};

function FichaIndicador({ indKey, onClose }: { indKey: string | null; onClose: () => void }) {
  const { datos, pais, ind } = useInicio();
  const [visible, setVisible] = useState(false);
  const [mostrado, setMostrado] = useState<string | null>(null);
  const [estado, setEstado] = useState("");
  const panel = useRef<HTMLElement>(null);
  const cerrar = useRef<HTMLButtonElement>(null);
  const previo = useRef<Element | null>(null);

  useEffect(() => {
    if (indKey) {
      previo.current = document.activeElement;
      setMostrado(indKey);
      setEstado("");
      document.body.classList.add("bloqueado");
      const t = setTimeout(() => {
        setVisible(true);
        cerrar.current?.focus();
      }, 20);
      return () => clearTimeout(t);
    } else if (mostrado) {
      setVisible(false);
      document.body.classList.remove("bloqueado");
      const t = setTimeout(() => setMostrado(null), 280);
      (previo.current as HTMLElement | null)?.focus?.({ preventScroll: true });
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indKey]);

  useEffect(() => {
    if (!indKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = [
        ...panel.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],input,[tabindex]:not([tabindex="-1"])'
        ),
      ];
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [indKey, onClose]);

  if (!mostrado) return null;
  const m = ind(mostrado);
  const pl = datos.pilares.find((p) => p.key === m.pilar)!;
  const d = m.paises[pais];
  const nombrePais = datos.paises.find((p) => p.code === pais)!.nombre;
  const filas = datos.paises.map((p) => ({ ...p, v: m.paises[p.code].valor }));
  const max = Math.max(...filas.filter((f) => f.v !== null).map((f) => Math.abs(f.v!))) || 1;

  async function copiar(texto: string, ok: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado(ok);
    } catch {
      setEstado("Su navegador no permitió copiar. Seleccione los datos de la ficha manualmente.");
    }
  }

  const csv = () =>
    copiar(
      [
        "pais,valor,unidad,anio,fuente,url",
        ...datos.paises.map((p) => {
          const x = m.paises[p.code];
          return `${p.nombre},${x.valor ?? ""},${m.unidad || "conteo"},${x.anio},"${x.fuente}",${x.url}`;
        }),
      ].join("\n"),
      "Datos copiados en CSV. Péguelos en su hoja de cálculo."
    );

  const cita = () =>
    copiar(
      `Observatorio Find, Universidad EAFIT (2026). ${m.label}. Corte ${datos.meta.version}, ${datos.meta.curado}. Fuente primaria: ${m.fuente}. https://observatorio-find.vercel.app/`,
      "Cita copiada."
    );

  return (
    <>
      <div className={`backdrop ${visible ? "show" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside
        ref={panel}
        className={`drawer ${visible ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fichaTitulo"
      >
        <div className="dh">
          <div className="row">
            <div>
              <p className="eyebrow">{pl.nombre}</p>
              <h2 id="fichaTitulo" style={{ marginTop: 8 }}>
                {m.label}
              </h2>
            </div>
            <button ref={cerrar} className="x" type="button" onClick={onClose} aria-label="Cerrar ficha del indicador">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
          <div className="bigval">
            <b className="tab-n">
              {cifra(d.valor, m.unidad)}
              {d.valor !== null && <span style={{ fontSize: 22 }}>{sufijo(m.unidad)}</span>}
            </b>
            <span className="chip">
              {nombrePais} · {d.anio}
            </span>
            {d.norm !== null && <span className="chip">Puntaje normalizado {Math.round(d.norm)}/100</span>}
          </div>
        </div>

        <div className="db">
          <div className="ctrl">
            <span className="k2">Valor publicado por país</span>
            <span className="chip">{m.mayorEsMejor ? "Mayor es mejor" : "Menor es mejor"}</span>
          </div>
          <div className="chartbox">
            <svg viewBox="0 0 600 284" role="img" aria-label={`${m.label} por país`}>
              {filas.map((f, i) => {
                const y = 12 + i * 44;
                const w = f.v === null ? 0 : (Math.abs(f.v) / max) * 330;
                const yo = f.code === pais;
                return (
                  <g key={f.code}>
                    <text x="0" y={y + 22} fontSize="14" fontWeight={yo ? 700 : 500} fill="#0B0B12">
                      {f.nombre}
                    </text>
                    {f.v === null ? (
                      <text x="110" y={y + 22} fontSize="13" fill="#3A3A48">
                        sin dato publicado
                      </text>
                    ) : (
                      <>
                        <rect x="110" y={y + 6} width={Math.max(w, 3)} height="24" rx="12" fill={yo ? "#5538FC" : "#C9C0FF"} />
                        <text x={118 + w} y={y + 23} fontSize="13" fontWeight="700" fill="#0B0B12">
                          {cifraConUnidad(m, f.v)}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <dl className="facts">
            <div className="fact wide">
              <dt>Qué mide</dt>
              <dd>{m.desc}</dd>
            </div>
            <div className="fact wide">
              <dt>Le sirve para</dt>
              <dd>{m.sirve}</dd>
            </div>
            <div className="fact">
              <dt>Fuente · {nombrePais}</dt>
              <dd>
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.fuente}
                </a>
              </dd>
            </div>
            <div className="fact">
              <dt>Año del dato</dt>
              <dd>{d.anio}</dd>
            </div>
            <div className="fact">
              <dt>Tipo de cifra</dt>
              <dd>{TIPO[m.tipo]}</dd>
            </div>
            <div className="fact">
              <dt>Dirección</dt>
              <dd>{m.mayorEsMejor ? "Mayor es mejor" : "Menor es mejor"}</dd>
            </div>
            {d.nota && (
              <div className="fact wide">
                <dt>Nota del Observatorio</dt>
                <dd>{d.nota}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="df">
          <button className="btn btn-violet" type="button" onClick={csv}>
            Copiar datos en CSV
          </button>
          <button className="btn btn-line" type="button" onClick={cita}>
            Copiar cita
          </button>
          <a className="btn btn-line" href="/metodologia">
            Metodología
          </a>
          <p className="status" role="status" aria-live="polite">
            {estado}
          </p>
        </div>
      </aside>
    </>
  );
}
