"use client";

import { useRef, useState } from "react";
import type { CC } from "@/data/dataset";
import type { IndicadorInicio } from "@/lib/inicio";
import { useInicio } from "./Inicio";
import { cifra, cifraConUnidad, sinTildes, sufijo } from "./formato";

/* ---------------------------------------------------------------- bitácora */

export function Bitacora() {
  const { datos, abrir } = useInicio();
  const color = Object.fromEntries(datos.pilares.map((p) => [p.key, p.orbita]));
  const tarjeta = (dup: boolean) =>
    datos.bitacora.map((n, i) => {
      const contenido = (
        <>
          <span className="ico">
            <i style={{ background: color[n.pilar] }} />
          </span>
          <span>
            <span className="d">{`Auditoría · ${n.fecha}`}</span>
            <span className="t">{n.texto}</span>
          </span>
        </>
      );
      const extra = dup ? { tabIndex: -1, "aria-hidden": true as const } : {};
      return n.indicador ? (
        <button key={`${dup}-${i}`} className="newscard" type="button" onClick={() => abrir(n.indicador!)} {...extra}>
          {contenido}
        </button>
      ) : (
        <a key={`${dup}-${i}`} className="newscard" href="/metodologia#auditoria" {...extra}>
          {contenido}
        </a>
      );
    });
  return (
    <div className="news" aria-label="Bitácora de auditoría">
      <div className="track">
        {tarjeta(false)}
        {tarjeta(true)}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- explorador */

function MiniBarras({ ind, pais }: { ind: IndicadorInicio; pais: CC }) {
  const { datos } = useInicio();
  const vals = datos.paises.map((p) => ind.paises[p.code].valor);
  const con = vals.filter((v): v is number => v !== null);
  if (con.length < 2) return null;
  const mx = Math.max(...con.map(Math.abs));
  return (
    <span className="mini" aria-hidden="true">
      {datos.paises.map((p) => {
        const v = ind.paises[p.code].valor;
        return (
          <span key={p.code} className={`mb ${p.code === pais ? "me" : ""}`} title={p.nombre}>
            <span style={{ height: `${v === null ? 0 : Math.max(6, (Math.abs(v) / mx) * 100)}%` }} />
            <em>{p.nombre.slice(0, 2)}</em>
          </span>
        );
      })}
    </span>
  );
}

export function Explorador() {
  const { datos, pais, setPais, pilar, setPilar, q, setQ, abrir } = useInicio();
  const [orden, setOrden] = useState<"pilar" | "nombre">("pilar");
  const pl = (k: string) => datos.pilares.find((p) => p.key === k)!;
  const nombrePais = datos.paises.find((p) => p.code === pais)!.nombre;

  let lista = datos.indicadores.filter(
    (i) =>
      (pilar === "all" || i.pilar === pilar) &&
      (!q || sinTildes(`${i.label} ${i.corto} ${i.claves} ${pl(i.pilar).nombre}`).includes(sinTildes(q)))
  );
  if (orden === "nombre") lista = [...lista].sort((a, b) => a.label.localeCompare(b.label, "es"));

  return (
    <section className="band light" id="explorar" aria-labelledby="ex-t">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Explorador de indicadores</p>
            <h2 id="ex-t">
              Encuentre su dato en <em>tres pasos</em>
            </h2>
          </div>
          <p>1. Elija un pilar. 2. Escoja el país. 3. Abra el indicador para compararlo entre países y saber para qué le sirve.</p>
        </div>

        <div className="linechips" role="group" aria-label="Filtrar por pilar">
          <button className="lc" type="button" aria-pressed={pilar === "all"} onClick={() => setPilar("all")}>
            Todos <span className="n">{datos.indicadores.length}</span>
          </button>
          {datos.pilares.map((p) => (
            <button key={p.key} className="lc" type="button" aria-pressed={pilar === p.key} onClick={() => setPilar(p.key)}>
              <i style={{ background: p.color }} />
              {p.nombre}
              <span className="n">{p.n}</span>
            </button>
          ))}
        </div>

        <div className="toolbar">
          <div className="field-s">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="9" r="6" />
              <path d="M14 14l4 4" />
            </svg>
            <label htmlFor="fq" className="sr-only">
              Buscar en los indicadores
            </label>
            <input id="fq" type="search" placeholder="Filtrar por nombre o palabra clave" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fc" className="sr-only">
              País
            </label>
            <select id="fc" value={pais} onChange={(e) => setPais(e.target.value as CC)}>
              {datos.paises.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fs" className="sr-only">
              Ordenar
            </label>
            <select id="fs" value={orden} onChange={(e) => setOrden(e.target.value as "pilar" | "nombre")}>
              <option value="pilar">Ordenar por pilar</option>
              <option value="nombre">Ordenar por nombre</option>
            </select>
          </div>
        </div>

        <div className="resbar">
          <span aria-live="polite">{`${lista.length} indicadores · ${nombrePais} · ${
            pilar === "all" ? "todos los pilares" : pl(pilar).nombre
          }`}</span>
          {(q || pilar !== "all") && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setPilar("all");
              }}
            >
              Quitar filtros
            </button>
          )}
        </div>

        <ul className="tiles">
          {lista.map((i, n) => {
            const v = i.paises[pais].valor;
            const p = pl(i.pilar);
            return (
              <li key={`${i.key}-${pais}`} style={{ animationDelay: `${Math.min(n, 12) * 30}ms` }}>
                <button
                  className={`tile ${v === null ? "nd" : ""}`}
                  type="button"
                  onClick={() => abrir(i.key)}
                  aria-label={`${i.label}: ${v === null ? "sin dato publicado" : cifraConUnidad(i, v)} en ${nombrePais}. Abrir ficha`}
                >
                  <span className="top">
                    <span className="ln">
                      <i style={{ background: p.color }} />
                      {p.nombre}
                    </span>
                    <span className={`pill ${i.mayorEsMejor ? "good" : "bad"}`}>{i.mayorEsMejor ? "↑ mejor" : "↓ mejor"}</span>
                  </span>
                  <span className="big tab-n">
                    {cifra(v, i.unidad)}
                    <small>{v === null ? "" : sufijo(i.unidad).trim()}</small>
                  </span>
                  <span className="nm">{i.label}</span>
                  <span className="srcl">{`${i.paises[pais].fuente.split(/ · |, /)[0]} · ${i.paises[pais].anio}`}</span>
                  <MiniBarras ind={i} pais={pais} />
                  <span className="peek">
                    <b>Le sirve para</b>
                    {i.sirve}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {lista.length === 0 && (
          <p className="empty">Ningún indicador coincide con su búsqueda. Pruebe con otra palabra o quite los filtros.</p>
        )}
        <p className="fine">
          n/d significa que el Observatorio no publica ese dato para el país. Un vacío de fuente se marca como brecha, nunca
          como cero.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- perfiles */

export function Perfiles() {
  const { datos, ind, abrir } = useInicio();
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const elegir = (i: number, enfocar = false) => {
    setSel(i);
    if (enfocar) tabs.current[i]?.focus();
  };
  const n = datos.perfiles.length;

  return (
    <section className="band dark" id="perfiles" aria-labelledby="au-t">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Por perfil</p>
            <h2 id="au-t">
              Empiece por <em>lo que usted decide</em>
            </h2>
          </div>
          <p>Elija su perfil y vea los indicadores que más le sirven en Colombia. Cada uno abre su ficha.</p>
        </div>
        <div className="aud-tabs" role="tablist" aria-label="Perfiles de usuario">
          {datos.perfiles.map((a, i) => (
            <button
              key={a.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              className="aud-tab"
              role="tab"
              id={`at-${a.key}`}
              aria-controls={`ap-${a.key}`}
              aria-selected={i === sel}
              tabIndex={i === sel ? 0 : -1}
              onClick={() => elegir(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  elegir((i + 1) % n, true);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  elegir((i - 1 + n) % n, true);
                }
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
        {datos.perfiles.map((a, i) => (
          <div
            key={a.key}
            className="aud-panel"
            role="tabpanel"
            id={`ap-${a.key}`}
            aria-labelledby={`at-${a.key}`}
            hidden={i !== sel}
          >
            <div>
              <h3>{a.quien}</h3>
              <p>{a.para}</p>
            </div>
            <div className="aud-list">
              {a.indicadores.map((k) => {
                const m = ind(k);
                return (
                  <button key={k} className="aud-item" type="button" onClick={() => abrir(k)}>
                    <span>
                      <b>{m.label}</b>
                      <small>{`Le sirve para: ${m.sirve}`}</small>
                    </span>
                    <span className="v tab-n">{cifraConUnidad(m, m.paises.CO.valor)}</span>
                    <span className={`delta ${m.mayorEsMejor ? "good" : "bad"}`}>CO</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
