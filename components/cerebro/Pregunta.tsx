"use client";

import { useEffect, useRef, useState } from "react";
import type { Cotizacion } from "@/lib/cerebro/pregunta/mercado";

// -----------------------------------------------------------------------------
// «@findy» · la conversación
//
// Cada pregunta se ve como una publicación y la respuesta de Findy como su
// réplica, con las cotizaciones que consultó en tarjetas con fuente y hora.
// El historial vive solo en la pestaña: al recargar empieza de cero.
// -----------------------------------------------------------------------------

interface Turno {
  rol: "usuario" | "findy";
  texto: string;
  datos?: Cotizacion[];
  error?: boolean;
}

const SUGERIDAS = [
  "hola @findy, si vendo mi casa y meto todo en $NVDA, ¿en cuánto tiempo me puedo retirar?",
  "@findy, ¿qué le pasó hoy a $NVDA y por qué todo el mundo habla de eso?",
  "@findy, si hace 5 años hubiera metido 10 millones de pesos en bitcoin, ¿cuánto tendría hoy?",
  "@findy, ¿por qué Colombia queda de última en confianza financiera?",
];

const MAX_CARACTERES = 700;
const MAX_TURNOS = 12;

const numero = (n: number, d = 2) =>
  n.toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = (n: number) => `${n > 0 ? "+" : ""}${numero(n, 1)} %`;

function hora(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

/** Párrafos y **negrita**; nada más. El texto del modelo nunca se inyecta como HTML. */
function Texto({ children }: { children: string }) {
  return (
    <>
      {children
        .split(/\n{2,}/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i} className={i ? "mt-3" : undefined}>
            {p.split(/(\*\*[^*]+\*\*)/g).map((trozo, j) =>
              trozo.startsWith("**") && trozo.endsWith("**") && trozo.length > 4 ? (
                <strong key={j} className="font-bold text-lime">
                  {trozo.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{trozo}</span>
              ),
            )}
          </p>
        ))}
    </>
  );
}

function Tarjeta({ c }: { c: Cotizacion }) {
  const sube = (c.cambioDiaPct ?? 0) >= 0;
  const rango = c.max52 != null && c.min52 != null && c.max52 > c.min52 ? c.max52 - c.min52 : null;
  const posicion = rango ? Math.min(100, Math.max(0, ((c.precio - (c.min52 ?? 0)) / rango) * 100)) : null;
  const ventanas: Array<[string, number | null]> = [
    ["1 mes", c.rendimientoPct.mes1],
    ["3 meses", c.rendimientoPct.meses3],
    ["1 año", c.rendimientoPct.anio1],
    ["5 años", c.rendimientoPct.anios5],
  ];
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="card block p-4 transition hover:border-lime/50"
      aria-label={`${c.simbolo}: ${numero(c.precio)} ${c.moneda}. Ver en Yahoo Finance`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-lime">{c.simbolo}</div>
          <div className="truncate text-xs text-muted">{c.nombre}</div>
        </div>
        <div className="text-right">
          <div className="tabnum text-xl font-extrabold tracking-[-0.03em]">
            {numero(c.precio)} <span className="text-[11px] font-medium text-muted">{c.moneda}</span>
          </div>
          {c.cambioDiaPct != null ? (
            <div className={`tabnum text-xs font-semibold ${sube ? "text-teal" : "text-[#FF8A7A]"}`}>
              {sube ? "▲" : "▼"} {pct(c.cambioDiaPct)} hoy
            </div>
          ) : null}
        </div>
      </div>

      {posicion != null ? (
        <div className="mt-3">
          <div className="relative h-1.5 rounded-full bg-white/10">
            <span className="absolute top-1/2 h-3 w-1 -translate-y-1/2 rounded-full bg-lime" style={{ left: `calc(${posicion}% - 2px)` }} />
          </div>
          <div className="tabnum mt-1 flex justify-between text-[10px] text-muted">
            <span>mín. 52 sem. {numero(c.min52 ?? 0)}</span>
            <span>máx. {numero(c.max52 ?? 0)}</span>
          </div>
        </div>
      ) : null}

      <dl className="tabnum mt-3 grid grid-cols-4 gap-2 text-center">
        {ventanas.map(([etiqueta, v]) => (
          <div key={etiqueta}>
            <dt className="text-[10px] text-muted">{etiqueta}</dt>
            <dd className={`text-xs font-semibold ${v == null ? "text-muted" : v >= 0 ? "text-teal" : "text-[#FF8A7A]"}`}>
              {v == null ? "s/d" : pct(v)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 text-[10px] text-muted">
        {c.fuente}
        {c.bolsa ? ` · ${c.bolsa}` : ""}
        {c.hora ? ` · ${hora(c.hora)}` : ""} · dato de mercado, no del Observatorio ↗
      </div>
    </a>
  );
}

function Avatar({ find }: { find?: boolean }) {
  return find ? (
    <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-[12px] font-extrabold tracking-[-0.06em] text-[#322180]">
      fin<span className="text-[#5538FC]">dy</span>
    </span>
  ) : (
    <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/12 text-sm font-semibold text-fg/80">
      tú
    </span>
  );
}

export default function Pregunta() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [borrador, setBorrador] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const fin = useRef<HTMLDivElement>(null);
  const corte = useRef<AbortController | null>(null);

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turnos]);

  useEffect(() => () => corte.current?.abort(), []);

  async function preguntar(texto: string) {
    const pregunta = texto.trim().slice(0, MAX_CARACTERES);
    if (!pregunta || ocupado) return;

    const previos = turnos.filter((t) => !t.error && t.texto.trim());
    const historial: Turno[] = [...previos, { rol: "usuario", texto: pregunta }];
    setTurnos([...historial, { rol: "findy", texto: "", datos: [] }]);
    setBorrador("");
    setOcupado(true);

    const actualizar = (cambio: (t: Turno) => Turno) =>
      setTurnos((ts) => ts.map((t, i) => (i === ts.length - 1 ? cambio(t) : t)));
    const fallar = (m: string) => actualizar((t) => ({ ...t, texto: t.texto ? `${t.texto}\n\n${m}` : m, error: true }));

    corte.current = new AbortController();
    try {
      const res = await fetch("/api/cerebro/pregunta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Solo viaja lo reciente: el servidor acepta hasta MAX_TURNOS y exige que empiece en una pregunta.
        body: JSON.stringify({
          turnos: historial.slice(-(MAX_TURNOS - 1)).map(({ rol, texto: t }) => ({ rol, texto: t })),
        }),
        signal: corte.current.signal,
      });

      if (res.status === 401) {
        window.location.href = "/cerebro/entrar?next=/cerebro/pregunta";
        return;
      }
      if (!res.ok || !res.body) {
        const cuerpo = (await res.json().catch(() => null)) as { error?: string } | null;
        fallar(cuerpo?.error ?? "No pude responder. Intenta de nuevo.");
        return;
      }

      const lector = res.body.getReader();
      const decodificador = new TextDecoder();
      let resto = "";
      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;
        resto += decodificador.decode(value, { stream: true });
        const lineas = resto.split("\n");
        resto = lineas.pop() ?? "";
        for (const linea of lineas) {
          if (!linea.trim()) continue;
          const ev = JSON.parse(linea) as { t: string; d?: string; c?: Cotizacion; m?: string };
          if (ev.t === "texto" && ev.d) actualizar((t) => ({ ...t, texto: t.texto + ev.d }));
          else if (ev.t === "dato" && ev.c) {
            const c = ev.c;
            actualizar((t) =>
              t.datos?.some((x) => x.simbolo === c.simbolo) ? t : { ...t, datos: [...(t.datos ?? []), c] },
            );
          } else if (ev.t === "error") fallar(ev.m ?? "No pude responder. Intenta de nuevo.");
        }
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) fallar("Se cortó la conexión. Intenta de nuevo.");
    } finally {
      setOcupado(false);
    }
  }

  // El servidor exige que la conversación empiece en una pregunta: si se llenó, se empieza otra.
  const llena = turnos.filter((t) => !t.error).length >= MAX_TURNOS - 1;

  return (
    <div className="mx-auto max-w-2xl">
      {turnos.length === 0 ? (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Para empezar</p>
          <div className="mt-3 grid gap-2">
            {SUGERIDAS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => preguntar(s)}
                className="card p-3.5 text-left text-[14px] leading-snug text-fg/88 transition hover:border-lime/50 hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ol className="mb-6 space-y-5" aria-live="polite">
          {turnos.map((t, i) => {
            const esFind = t.rol === "findy";
            const pensando = esFind && ocupado && i === turnos.length - 1 && !t.texto;
            return (
              <li key={i} className={`flex gap-3 ${esFind ? "" : "opacity-95"}`}>
                <Avatar find={esFind} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 text-[13px]">
                    <span className="font-bold">{esFind ? "Findy" : "Tú"}</span>
                    {esFind ? <span className="text-muted">@findy · Observatorio Find, EAFIT</span> : null}
                  </div>
                  <div className={`mt-1 text-[15.5px] leading-relaxed ${t.error ? "text-[#FF8A7A]" : "text-fg/92"}`}>
                    {pensando ? (
                      <span className="inline-flex items-center gap-2 text-muted">
                        <span className="status-dot" />
                        {t.datos?.length ? "haciendo la cuenta…" : "buscando el dato…"}
                      </span>
                    ) : (
                      <Texto>{t.texto}</Texto>
                    )}
                  </div>
                  {t.datos?.length ? (
                    <div className={`mt-3 grid gap-2 ${t.datos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {t.datos.map((c) => (
                        <Tarjeta key={c.simbolo} c={c} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <div ref={fin} />

      <form
        className="card sticky bottom-4 flex items-end gap-2 p-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          void preguntar(borrador);
        }}
      >
        <label htmlFor="pregunta-find" className="sr-only">
          Pregúntale a Find
        </label>
        <textarea
          id="pregunta-find"
          rows={2}
          value={borrador}
          maxLength={MAX_CARACTERES}
          disabled={llena}
          onChange={(e) => setBorrador(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void preguntar(borrador);
            }
          }}
          placeholder={llena ? "Esta conversación ya va larga: empieza una nueva." : "hola @findy, si vendo mi casa y meto todo en $NVDA…"}
          className="min-h-[52px] flex-1 resize-none bg-transparent px-2 py-1.5 text-[15px] leading-snug text-fg outline-none placeholder:text-muted"
        />
        {turnos.length > 0 ? (
          <button
            type="button"
            className="action-quiet shrink-0 px-3 py-2 text-[12px]"
            onClick={() => {
              corte.current?.abort();
              setTurnos([]);
              setOcupado(false);
            }}
          >
            Nueva
          </button>
        ) : null}
        <button
          type="submit"
          disabled={ocupado || llena || !borrador.trim()}
          className="shrink-0 rounded-full bg-lime px-4 py-2 text-[13px] font-bold text-[#322180] transition disabled:opacity-40"
        >
          {ocupado ? "…" : "Preguntar"}
        </button>
      </form>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
        Findy explica y hace cuentas con datos de mercado y del Observatorio; no recomienda inversiones. Los precios vienen de Yahoo Finance y pueden llegar con retraso.
      </p>
    </div>
  );
}
