"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { PREGUNTAS, META_TEST, DISTRIBUCIONES, type DimKey, type CitaPares } from "@/data/test";
import {
  ESCALA,
  UMBRAL_CONSOLIDADA,
  banda,
  codificar,
  comparar,
  completo,
  consolidadas,
  decodificar,
  promedioPares,
  puntaje,
  type Comparacion,
  type Lectura,
  type Respuesta,
  type Respuestas,
} from "@/lib/test";

const COLOR_TU = "#f0ff29";
const COLOR_MUNDO = "#ffffff";
const COLOR_LATAM = "#78d8f5";

const LECTURA: Record<Lectura, { label: string; color: string; desc: string }> = {
  brecha: {
    label: "Brecha",
    color: "#ffb4b4",
    desc: "La mayoría de pares ya declara esta capacidad y la entidad todavía no.",
  },
  linea: {
    label: "En línea",
    color: "#cfd4ff",
    desc: "El nivel de la entidad es coherente con lo que declaran sus pares.",
  },
  ventaja: {
    label: "Ventaja",
    color: "#f0ff29",
    desc: "La entidad la tiene y menos del 40 % de sus pares (mundo y LatAm) la declara.",
  },
  "sin-dato": {
    label: "Sin dato de pares",
    color: "rgba(255,255,255,0.5)",
    desc: "No hay encuesta comparable publicada para esta capacidad.",
  },
};

function fmt(n: number): string {
  return n.toLocaleString("es-CO", { maximumFractionDigits: 1 });
}

export default function TestReadiness() {
  const [resp, setResp] = useState<Respuestas>({});
  const [mostrar, setMostrar] = useState(false);
  const [copiado, setCopiado] = useState<"enlace" | "resumen" | null>(null);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const primeraRef = useRef<HTMLDivElement>(null);

  // Un enlace con #r=… reconstruye el resultado sin guardar nada en ningún lado.
  useEffect(() => {
    const d = decodificar(window.location.hash.replace(/^#r=/, ""));
    if (d && completo(d)) {
      setResp(d);
      setMostrar(true);
    }
  }, []);

  // El desplazamiento va en un efecto aparte: html lleva scroll-behavior smooth
  // y un scrollIntoView animado se cancela a medias; "instant" sí llega.
  useEffect(() => {
    if (mostrar) {
      resultadoRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [mostrar]);

  const listo = completo(resp);
  const respondidas = PREGUNTAS.filter((p) => resp[p.key] !== undefined).length;

  function responder(key: DimKey, v: Respuesta) {
    setResp((prev) => ({ ...prev, [key]: v }));
    if (mostrar) setMostrar(false);
  }

  function verResultado() {
    if (!completo(resp)) return;
    window.history.replaceState(null, "", `#r=${codificar(resp)}`);
    setMostrar(true);
  }

  function reiniciar() {
    setResp({});
    setMostrar(false);
    window.history.replaceState(null, "", window.location.pathname);
    primeraRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }

  const resultado = useMemo(() => {
    if (!completo(resp)) return null;
    const p = puntaje(resp);
    return {
      puntaje: p,
      banda: banda(p),
      consolidadas: consolidadas(resp),
      comparaciones: comparar(resp),
      codigo: codificar(resp),
    };
  }, [resp]);

  async function copiar(tipo: "enlace" | "resumen") {
    if (!resultado) return;
    const url = `${window.location.origin}/test#r=${resultado.codigo}`;
    const brechas = resultado.comparaciones
      .filter((c) => c.lectura === "brecha")
      .map((c) => c.pregunta.dimension.toLowerCase());
    const texto =
      tipo === "enlace"
        ? url
        : [
            `Test de preparación para la IA · Observatorio Find (EAFIT) · corte ${META_TEST.corte}`,
            `Puntaje ${fmt(resultado.puntaje)}/100 · ${resultado.banda.label} · ${resultado.consolidadas} de ${PREGUNTAS.length} capacidades consolidadas`,
            brechas.length ? `Brechas frente a pares: ${brechas.join(", ")}` : "Sin brechas frente a pares",
            url,
          ].join("\n");
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);
      window.setTimeout(() => setCopiado(null), 2200);
    } catch {
      window.prompt("Copia este texto:", texto);
    }
  }

  return (
    <>
      {/* ESCALA */}
      <section className="border-b border-white/8" ref={primeraRef}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="eyebrow text-teal">Cómo responder</div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                Diez afirmaciones. Responda por lo que hoy es cierto, no por lo
                que está en el plan.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                Cada afirmación describe una capacidad que las encuestas de 2025 y
                2026 separan a las empresas que capturan valor con IA de las que
                solo experimentan. Marque qué tan de acuerdo está con que su
                entidad ya la tiene. Un 4 o un 5 cuenta como capacidad
                consolidada. Nada se guarda: el resultado vive en el enlace.
              </p>
            </div>
            <div className="technical-panel p-5">
              <div className="data-label text-muted">Escala</div>
              <ol className="mt-3 grid gap-2 sm:grid-cols-5">
                {ESCALA.map((e) => (
                  <li
                    key={e.v}
                    className="rounded-2xl border border-white/12 bg-white/[0.04] p-3"
                  >
                    <div className="font-mono text-xl font-semibold text-lime">{e.v}</div>
                    <div className="mt-1 text-[12px] leading-snug text-fg/85">{e.label}</div>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[12px] text-muted">
                {PREGUNTAS.length} afirmaciones · unos {META_TEST.minutos} minutos · sin
                registro ni correo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="space-y-5">
            {PREGUNTAS.map((p) => {
              const v = resp[p.key];
              const consolidada = v !== undefined && v >= UMBRAL_CONSOLIDADA;
              return (
                <article
                  key={p.key}
                  id={`p-${p.key}`}
                  className="card overflow-hidden"
                  style={{ borderLeft: `4px solid ${p.color}` }}
                >
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-sm font-semibold"
                          style={{ color: p.color }}
                        >
                          {String(p.n).padStart(2, "0")}
                        </span>
                        <span className="eyebrow text-fg/80">{p.dimension}</span>
                      </div>
                      <span
                        className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          borderColor: consolidada ? COLOR_TU : "rgba(255,255,255,0.18)",
                          color: consolidada ? COLOR_TU : "rgba(255,255,255,0.55)",
                        }}
                      >
                        {v === undefined
                          ? "Sin responder"
                          : consolidada
                            ? "Capacidad consolidada"
                            : "Por consolidar"}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-[17px] font-semibold leading-snug text-fg md:text-[19px]">
                      {p.enunciado}
                    </p>
                    <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted">
                      <span className="font-semibold text-fg/80">Un 5 significa: </span>
                      {p.ayuda}
                    </p>

                    <div
                      role="radiogroup"
                      aria-label={`Respuesta a la afirmación ${p.n}`}
                      className="mt-5 grid grid-cols-5 gap-2"
                    >
                      {ESCALA.map((e) => {
                        const on = v === e.v;
                        return (
                          <button
                            key={e.v}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => responder(p.key, e.v)}
                            className="group flex flex-col items-center rounded-2xl border px-1 py-3 transition hover:-translate-y-0.5 focus-visible:outline-2"
                            style={{
                              borderColor: on ? COLOR_TU : "rgba(255,255,255,0.16)",
                              background: on ? "rgba(240,255,41,0.14)" : "rgba(255,255,255,0.03)",
                            }}
                          >
                            <span
                              className="font-mono text-xl font-semibold"
                              style={{ color: on ? COLOR_TU : "rgba(255,255,255,0.85)" }}
                            >
                              {e.v}
                            </span>
                            <span className="mt-1 hidden text-center text-[10.5px] leading-tight text-fg/70 sm:block">
                              {e.label}
                            </span>
                            <span className="mt-1 text-center text-[10.5px] leading-tight text-fg/70 sm:hidden">
                              {e.corto}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <details className="group mt-4">
                      <summary className="cursor-pointer list-none text-[12.5px] font-semibold text-lime/90 hover:text-lime">
                        <span className="mr-1 inline-block transition group-open:rotate-90">▸</span>
                        Por qué pesa en {META_TEST.corte}
                      </summary>
                      <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-fg/80">
                        {p.porque}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <Pares etiqueta="Mundo" cita={p.mundo} color={COLOR_MUNDO} />
                        <Pares etiqueta="América Latina" cita={p.latam} color={COLOR_LATAM} />
                      </div>
                    </details>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BARRA DE PROGRESO */}
      <div className="sticky bottom-0 z-40 border-t border-lime/25 bg-[#101010]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-white/12">
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${(respondidas / PREGUNTAS.length) * 100}%`,
                  background: COLOR_TU,
                }}
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg/80">
              {respondidas} de {PREGUNTAS.length} respondidas
            </span>
          </div>
          <div className="flex items-center gap-2">
            {mostrar && (
              <button type="button" onClick={reiniciar} className="action-quiet px-4 py-2 text-xs">
                Volver a responder
              </button>
            )}
            <button
              type="button"
              onClick={verResultado}
              disabled={!listo}
              className="action-primary px-5 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {mostrar ? "Actualizar resultado" : "Ver mi resultado"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      <div ref={resultadoRef} className="scroll-mt-32">
        {mostrar && resultado && (
          <Resultado
            puntaje={resultado.puntaje}
            bandaR={resultado.banda}
            consolidadasN={resultado.consolidadas}
            comparaciones={resultado.comparaciones}
            copiado={copiado}
            onCopiar={copiar}
            onReiniciar={reiniciar}
          />
        )}
      </div>
    </>
  );
}

function Pares({
  etiqueta,
  cita,
  color,
}: {
  etiqueta: string;
  cita: CitaPares | null;
  color: string;
}) {
  if (!cita) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 p-3 text-[12px] text-muted">
        <span className="font-semibold" style={{ color }}>
          {etiqueta}:
        </span>{" "}
        sin encuesta comparable publicada.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.03] p-3 text-[12px] leading-relaxed">
      <div className="flex items-baseline gap-2">
        <span className="font-semibold" style={{ color }}>
          {etiqueta}
        </span>
        <span className="font-mono text-lg font-semibold tabnum text-fg">
          {fmt(cita.valor)} %
        </span>
      </div>
      <p className="mt-1 text-fg/85">{cita.texto}</p>
      <p className="mt-1 text-muted">
        <a
          href={cita.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 underline-offset-2 hover:text-lime"
        >
          {cita.fuente}
        </a>{" "}
        · {cita.anio} · {cita.muestra}
        {cita.nota ? ` · ${cita.nota}` : ""}
      </p>
    </div>
  );
}

function Resultado({
  puntaje: p,
  bandaR,
  consolidadasN,
  comparaciones,
  copiado,
  onCopiar,
  onReiniciar,
}: {
  puntaje: number;
  bandaR: ReturnType<typeof banda>;
  consolidadasN: number;
  comparaciones: Comparacion[];
  copiado: "enlace" | "resumen" | null;
  onCopiar: (t: "enlace" | "resumen") => void;
  onReiniciar: () => void;
}) {
  const pm = promedioPares("mundo");
  const pl = promedioPares("latam");

  const radar = comparaciones.map((c) => ({
    dim: c.pregunta.corto,
    tu: c.nivel,
    mundo: c.mundo ?? undefined,
    latam: c.latam ?? undefined,
  }));

  const brechas = comparaciones.filter((c) => c.lectura === "brecha");
  const ventajas = comparaciones.filter((c) => c.lectura === "ventaja");
  const prioridades = [...comparaciones]
    .sort((a, b) => {
      const pa = a.lectura === "brecha" ? 0 : 1;
      const pb = b.lectura === "brecha" ? 0 : 1;
      if (pa !== pb) return pa - pb;
      if (a.nivel !== b.nivel) return a.nivel - b.nivel;
      return (b.mundo ?? 0) - (a.mundo ?? 0);
    })
    .slice(0, 3);

  return (
    <section id="resultado" className="border-b border-white/8 bg-[#101010]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="eyebrow text-lime">Resultado · corte {META_TEST.corte}</div>

        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Puntaje y banda */}
          <div>
            <div className="flex items-end gap-4">
              <div
                className="font-mono text-[clamp(4rem,9vw,6.5rem)] font-semibold leading-none tracking-[-0.06em] tabnum"
                style={{ color: bandaR.color }}
              >
                {fmt(p)}
              </div>
              <div className="pb-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  de 100
                </div>
                <div className="mt-1 text-2xl font-extrabold tracking-tight" style={{ color: bandaR.color }}>
                  {bandaR.label}
                </div>
                <div className="font-mono text-[11px] text-muted">rango {bandaR.rango}</div>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg/85">{bandaR.lectura}</p>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
              <span className="font-semibold text-fg/85">Siguiente paso: </span>
              {bandaR.siguiente}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Tile
                valor={`${consolidadasN}/${PREGUNTAS.length}`}
                label="capacidades consolidadas"
                color={COLOR_TU}
              />
              <Tile
                valor={`${fmt(pm.valor)} %`}
                label={`pares del mundo · promedio en ${pm.n} dimensiones`}
                color={COLOR_MUNDO}
              />
              <Tile
                valor={pl.n ? `${fmt(pl.valor)} %` : "n/d"}
                label={pl.n ? `pares de LatAm · promedio en ${pl.n} dimensiones` : "pares de LatAm · sin dato comparable"}
                color={COLOR_LATAM}
              />
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
              Los promedios de pares son aritmética propia sobre las proporciones
              publicadas: el porcentaje de empresas encuestadas que declara cada
              capacidad, promediado entre dimensiones. No son el puntaje de una
              empresa típica.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => onCopiar("enlace")} className="action-primary px-4 py-2.5 text-xs">
                {copiado === "enlace" ? "Enlace copiado ✓" : "Copiar enlace con mi resultado"}
              </button>
              <button type="button" onClick={() => onCopiar("resumen")} className="action-secondary px-4 py-2.5 text-xs">
                {copiado === "resumen" ? "Resumen copiado ✓" : "Copiar resumen"}
              </button>
              <button type="button" onClick={onReiniciar} className="action-quiet px-4 py-2.5 text-xs">
                Volver a responder
              </button>
            </div>
          </div>

          {/* Radar */}
          <div className="card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px] font-bold text-fg">Su nivel frente a la proporción de pares que ya tiene cada capacidad</h3>
              <span className="text-[11px] text-muted">0 – 100</span>
            </div>
            <div className="mt-2 h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar} outerRadius="68%">
                  <PolarGrid stroke="rgba(255,255,255,0.14)" />
                  <PolarAngleAxis dataKey="dim" tick={{ fill: "#eef0ff", fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 9 }} axisLine={false} />
                  <Radar name="Pares del mundo (% que la declara)" dataKey="mundo" stroke={COLOR_MUNDO} fill={COLOR_MUNDO} fillOpacity={0.07} strokeDasharray="4 4" strokeWidth={1.5} />
                  <Radar name="Pares de LatAm (% que la declara)" dataKey="latam" stroke={COLOR_LATAM} fill={COLOR_LATAM} fillOpacity={0.07} strokeDasharray="2 3" strokeWidth={1.5} />
                  <Radar name="Su entidad (nivel)" dataKey="tu" stroke={COLOR_TU} fill={COLOR_TU} fillOpacity={0.28} strokeWidth={2.2} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#eef0ff" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1240",
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: 12,
                      color: "#eef0ff",
                      fontSize: 12,
                    }}
                    formatter={(v) => (typeof v === "number" ? fmt(v) : "sin dato")}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Prioridades */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="card p-5 lg:col-span-2">
            <div className="eyebrow text-teal">Por dónde empezar</div>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight">Tres capacidades primero</h3>
            <p className="mt-1 text-[13px] text-muted">
              Ordenadas por brecha frente a pares y, a igual brecha, por el nivel más bajo.
            </p>
            <ol className="mt-4 space-y-3">
              {prioridades.map((c, i) => (
                <li key={c.pregunta.key} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="font-mono text-2xl font-semibold text-lime/70">0{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-bold text-fg">{c.pregunta.dimension}</span>
                      <Chip lectura={c.lectura} />
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-fg/85">{c.pregunta.accion}</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                      Su nivel: {fmt(c.nivel)} · pares del mundo {c.mundo !== null ? `${fmt(c.mundo)} %` : "sin dato"} · LatAm {c.latam !== null ? `${fmt(c.latam)} %` : "sin dato"}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="card p-5">
            <div className="eyebrow text-teal">Balance</div>
            <dl className="mt-3 space-y-3 text-[13px]">
              <div>
                <dt className="font-semibold" style={{ color: LECTURA.brecha.color }}>
                  Brechas · {brechas.length}
                </dt>
                <dd className="text-muted">
                  {brechas.length ? brechas.map((c) => c.pregunta.dimension).join(" · ") : "Ninguna dimensión queda por debajo de lo que declara la mayoría de pares."}
                </dd>
              </div>
              <div>
                <dt className="font-semibold" style={{ color: LECTURA.ventaja.color }}>
                  Ventajas · {ventajas.length}
                </dt>
                <dd className="text-muted">
                  {ventajas.length ? ventajas.map((c) => c.pregunta.dimension).join(" · ") : "Ninguna capacidad consolidada donde los pares aún sean minoría."}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-fg/85">Cómo leerlo</dt>
                <dd className="text-muted">
                  Brecha: nivel ≤ 50 donde ≥ 50 % de pares la declara (mundo o LatAm, la mayor). Ventaja: nivel ≥ 75 donde menos del 40 % la declara. El resto, en línea.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Distribución de pares */}
        <div className="mt-12">
          <div className="eyebrow text-teal">Referencia</div>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight">Cómo se reparten sus pares por nivel de preparación</h3>
          <p className="mt-1 max-w-3xl text-[13px] text-muted">
            Dos encuestas publican esa distribución. Las categorías son las de cada emisor y no
            equivalen a las bandas del test: su banda es <span className="font-semibold" style={{ color: bandaR.color }}>{bandaR.label}</span>; léalas lado a lado.
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {DISTRIBUCIONES.map((d) => {
              const color = d.ambito === "mundo" ? COLOR_MUNDO : COLOR_LATAM;
              const opac = [1, 0.72, 0.42, 0.2];
              return (
                <div key={d.url} className="card p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[15px] font-bold text-fg">{d.titulo}</h4>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color }}>
                      {d.ambito === "mundo" ? "Mundo" : "LatAm"}
                    </span>
                  </div>
                  <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-white/10">
                    {d.niveles.map((n, i) => (
                      <div
                        key={n.label}
                        title={`${n.label}: ${fmt(n.valor)} %`}
                        style={{ width: `${n.valor}%`, background: color, opacity: opac[i] ?? 0.2 }}
                      />
                    ))}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[12.5px]">
                    {d.niveles.map((n, i) => (
                      <li key={n.label} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-fg/85">
                          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: color, opacity: opac[i] ?? 0.2 }} />
                          {n.label}
                        </span>
                        <span className="font-mono tabnum text-fg">{fmt(n.valor)} %</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted">
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-2 hover:text-lime">
                      {d.fuente}
                    </a>{" "}
                    · {d.anio} · {d.muestra}
                    {d.nota ? ` · ${d.nota}` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabla por dimensión */}
        <div className="mt-12">
          <div className="eyebrow text-teal">Dimensión por dimensión</div>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight">Cada capacidad, con su fuente</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/15 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  <th className="py-2 pr-3">Dimensión</th>
                  <th className="py-2 pr-3">Su nivel</th>
                  <th className="py-2 pr-3">Mundo</th>
                  <th className="py-2 pr-3">LatAm</th>
                  <th className="py-2 pr-3">Lectura</th>
                </tr>
              </thead>
              <tbody>
                {comparaciones.map((c) => (
                  <tr key={c.pregunta.key} className="border-b border-white/8 align-top">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px]" style={{ color: c.pregunta.color }}>
                          {String(c.pregunta.n).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-fg">{c.pregunta.dimension}</span>
                      </div>
                      <div className="mt-1 text-[11.5px] text-muted">
                        {ESCALA.find((e) => e.v === c.respuesta)?.label}
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <Barra valor={c.nivel} color={COLOR_TU} />
                    </td>
                    <td className="py-3 pr-3">
                      <Barra valor={c.mundo} color={COLOR_MUNDO} cita={c.pregunta.mundo} />
                    </td>
                    <td className="py-3 pr-3">
                      <Barra valor={c.latam} color={COLOR_LATAM} cita={c.pregunta.latam} />
                    </td>
                    <td className="py-3 pr-3">
                      <Chip lectura={c.lectura} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ valor, label, color }: { valor: string; label: string; color: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-3">
      <div className="font-mono text-xl font-semibold tabnum" style={{ color }}>
        {valor}
      </div>
      <div className="mt-1 text-[10.5px] leading-snug text-muted">{label}</div>
    </div>
  );
}

function Chip({ lectura }: { lectura: Lectura }) {
  const l = LECTURA[lectura];
  return (
    <span
      title={l.desc}
      className="inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ borderColor: l.color, color: l.color }}
    >
      {l.label}
    </span>
  );
}

function Barra({
  valor,
  color,
  cita,
}: {
  valor: number | null;
  color: string;
  cita?: CitaPares | null;
}) {
  if (valor === null) {
    return <span className="text-[11.5px] text-muted">sin dato</span>;
  }
  return (
    <div className="min-w-[120px]">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-sm font-semibold tabnum text-fg">{fmt(valor)}</span>
        {cita && (
          <a
            href={cita.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${cita.texto} — ${cita.fuente}, ${cita.anio}, ${cita.muestra}`}
            className="text-[10.5px] text-muted underline decoration-white/25 underline-offset-2 hover:text-lime"
          >
            {cita.fuente.split(" · ")[0]} {cita.anio}
          </a>
        )}
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${valor}%`, background: color }} />
      </div>
    </div>
  );
}

