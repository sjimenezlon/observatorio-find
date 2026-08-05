"use client";

import { useMemo, useState } from "react";
import { HECHOS_PAGOS, Ambito, REF_REGIONALES, VACIOS } from "@/data/pagosmundo";
import { INDICADORES, PAISES, CC } from "@/data/dataset";
import { LATAM } from "@/data/latam";

const fmt = (v: number | null, d = 1) =>
  v === null ? "n/d" : v.toFixed(d).replace(".", ",");
const CORAL = "#E8825A";

const AMBITOS: { key: Ambito; label: string; sub: string }[] = [
  { key: "mundo", label: "El mundo", sub: "la frontera" },
  { key: "latam", label: "América Latina", sub: "21 economías" },
  { key: "colombia", label: "Colombia", sub: "el caso" },
];

const EJES: Record<string, { label: string; color: string }> = {
  uso: { label: "Uso", color: CORAL },
  costo: { label: "Costo", color: "#E8B452" },
  confianza: { label: "Confianza", color: "#1FC9A0" },
  frontera: { label: "Frontera", color: "#5BD0E0" },
};

export default function PagosPanel() {
  const [ambito, setAmbito] = useState<Ambito>("mundo");
  const hechos = HECHOS_PAGOS.filter((h) => h.ambito === ambito);

  return (
    <section id="pagos" className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: CORAL }}>
          Pilar de pagos
        </div>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          De la frontera global a Colombia
        </h2>
        <p className="mb-6 max-w-3xl text-[15px] text-muted">
          El pilar de pagos no pregunta cuánta gente tiene un medio de pago, sino{" "}
          <b className="font-semibold text-fg">
            cuántas veces al año lo usa, si el pago llega al comercio y si el
            riel cruza la frontera
          </b>
          . Tres escalas, la misma pregunta.
        </p>

        {/* selector de ámbito */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {AMBITOS.map((a) => {
            const on = ambito === a.key;
            return (
              <button
                key={a.key}
                onClick={() => setAmbito(a.key)}
                className="rounded-full border px-4 py-2 text-xs font-semibold transition"
                style={{
                  background: on ? `${CORAL}22` : "transparent",
                  borderColor: on ? CORAL : "rgba(255,255,255,0.14)",
                  color: on ? CORAL : "#8fa9a1",
                }}
              >
                {a.label}
                <span className="ml-1.5 font-normal opacity-70">· {a.sub}</span>
              </button>
            );
          })}
        </div>

        {/* hechos del ámbito activo */}
        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hechos.map((h) => (
            <article key={h.titulo} className="card flex flex-col p-5">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{
                    background: `${EJES[h.eje].color}1f`,
                    color: EJES[h.eje].color,
                  }}
                >
                  {EJES[h.eje].label}
                </span>
                <span className="tabnum text-[10px] text-muted">{h.anio}</span>
              </div>
              <div
                className="tabnum mb-1 text-2xl font-extrabold leading-none"
                style={{ color: CORAL }}
              >
                {h.valor}
              </div>
              <div className="mb-2 text-sm font-bold text-fg">{h.titulo}</div>
              <p className="mb-3 flex-1 text-[12px] leading-relaxed text-muted">
                {h.detalle}
              </p>
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] leading-snug text-teal underline decoration-teal/40 hover:decoration-teal"
              >
                {h.fuente}
              </a>
            </article>
          ))}
        </div>

        {/* ------------------------------------------------ gráficos del pilar */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PagosPorAdulto />
          <FugaComercio />
        </div>

        {/* ------------------------------------------- referencias regionales */}
        <div className="card mt-6 p-5">
          <div className="mb-1 text-sm font-bold">
            América Latina frente a las referencias disponibles
          </div>
          <p className="mb-4 text-[11px] text-muted">
            Promedios simples del panel de 21 economías, calculados por el
            Observatorio: el Banco Mundial no publica agregado regional para
            varias de estas series. Donde no existe una referencia mundial
            comparable, la celda queda vacía en vez de rellenarse. En remesas,
            América Latina sale por debajo del promedio mundial y no es un error:
            los corredores desde Estados Unidos están entre los más competitivos
            del planeta, mientras el promedio global lo empujan hacia arriba
            África subsahariana y el Pacífico.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="text-muted">
                <tr className="border-b border-white/10">
                  <th className="py-2 font-semibold">Indicador</th>
                  <th className="py-2 text-right font-semibold">LATAM</th>
                  <th className="py-2 text-right font-semibold">Mundo</th>
                  <th className="py-2 text-right font-semibold">Altos ingresos</th>
                  <th className="py-2 pl-3 font-semibold">Unidad · n</th>
                </tr>
              </thead>
              <tbody>
                {REF_REGIONALES.map((r) => (
                  <tr key={r.label} className="border-b border-white/6">
                    <td className="py-2 font-medium">{r.label}</td>
                    <td className="tabnum py-2 text-right font-bold" style={{ color: CORAL }}>
                      {fmt(r.latam, r.latam < 10 ? 2 : 1)}
                    </td>
                    <td className="tabnum py-2 text-right">
                      {r.mundo === null ? (
                        <span className="text-muted">—</span>
                      ) : (
                        fmt(r.mundo, r.mundo < 10 ? 2 : 1)
                      )}
                    </td>
                    <td className="tabnum py-2 text-right">
                      {r.altos === null ? (
                        <span className="text-muted">—</span>
                      ) : (
                        fmt(r.altos)
                      )}
                    </td>
                    <td className="py-2 pl-3 text-[11px] text-muted">
                      {r.unidad} · n={r.n}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------------------------------------ vacíos de medición */}
        <div className="mt-10">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-amber">
            Lo que hoy no se puede medir
          </div>
          <h3 className="mb-2 text-xl font-extrabold tracking-tight">
            Cuatro vacíos que ningún organismo llena
          </h3>
          <p className="mb-5 max-w-3xl text-[13px] text-muted">
            La pregunta del socio —&ldquo;¿cuántas transacciones por persona?&rdquo;— no
            tiene hoy una respuesta mundial comparable. Declarar el vacío es
            parte del método: así se sabe qué se está midiendo y qué falta por
            construir.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {VACIOS.map((v, i) => (
              <div key={v.titulo} className="card p-5">
                <div className="mb-2 flex items-start gap-2.5">
                  <span className="tabnum mt-0.5 text-[11px] font-extrabold text-amber">
                    0{i + 1}
                  </span>
                  <div className="text-sm font-bold leading-snug">{v.titulo}</div>
                </div>
                <p className="mb-2 text-[12px] leading-relaxed text-muted">
                  {v.porQue}
                </p>
                <p className="border-l-2 border-teal/40 pl-3 text-[12px] leading-relaxed text-fg/85">
                  <b className="text-teal">Propuesta: </b>
                  {v.propuesta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Pagos inmediatos por adulto al año — barras ordenadas, seis países.
// Perímetro único (solo el riel inmediato) para que la comparación sea válida.
// -----------------------------------------------------------------------------

function PagosPorAdulto() {
  const ind = INDICADORES.find((i) => i.key === "pagosadulto")!;
  const [hover, setHover] = useState<CC | null>(null);

  const datos = useMemo(
    () =>
      PAISES.map((p) => ({
        ...p,
        v: ind.valores[p.code],
        nota: ind.overrides?.[p.code]?.nota ?? "",
      })).sort((a, b) => (b.v ?? -1) - (a.v ?? -1)),
    [ind]
  );
  const max = Math.max(...datos.map((d) => d.v ?? 0));

  return (
    <div className="card p-5">
      <div className="mb-1 text-sm font-bold">
        Pagos inmediatos por adulto al año
      </div>
      <p className="mb-4 text-[11px] text-muted">
        Transacciones del riel nacional de pagos inmediatos ÷ población adulta.
        Aritmética del Observatorio sobre cifras de cada banco central, con el
        mismo perímetro para los seis. Pasá el cursor para ver la operación.
      </p>

      <div className="space-y-2.5">
        {datos.map((d) => {
          const on = hover === d.code;
          return (
            <div
              key={d.code}
              onMouseEnter={() => setHover(d.code)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              <div className="mb-1 flex items-baseline justify-between text-[11px]">
                <span className={on ? "font-bold text-fg" : "text-fg/80"}>
                  {d.flag} {d.nombre}
                </span>
                <span className="tabnum font-extrabold" style={{ color: CORAL }}>
                  {d.v === null ? "sin riel" : d.v}
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-r-[4px] bg-white/5">
                {d.v !== null ? (
                  <div
                    className="h-full rounded-r-[4px]"
                    style={{
                      width: `${Math.max(1.5, (d.v / max) * 100)}%`,
                      background: CORAL,
                      opacity: on ? 1 : 0.8,
                      transition: "width 400ms",
                    }}
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.14) 0 2px, transparent 2px 6px)",
                    }}
                  />
                )}
              </div>
              {on && d.nota && (
                <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
                  {d.nota}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-white/8 pt-3 text-[10.5px] leading-relaxed text-muted">
        Referencia de otro perímetro, no comparable con las barras: el Red Book
        del BIS mide <b className="text-fg">todos</b> los pagos sin efectivo por
        habitante — 242 en economías emergentes y 579 en avanzadas (2024).
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// La fuga entre recibir y pagar — dumbbell: pago digital total vs. pago a
// comercios, por país. Una sola escala; dos marcas por fila.
// -----------------------------------------------------------------------------

function FugaComercio() {
  const [hover, setHover] = useState<string | null>(null);
  const datos = useMemo(
    () =>
      LATAM.filter((p) => p.merchantpay !== null && p.pagodigital !== null)
        .map((p) => ({
          cc: p.cc,
          nombre: p.nombre,
          flag: p.flag,
          total: p.pagodigital!,
          comercio: p.merchantpay!,
          fuga: p.pagodigital! - p.merchantpay!,
        }))
        .sort((a, b) => b.fuga - a.fuga),
    []
  );

  return (
    <div className="card p-5">
      <div className="mb-1 text-sm font-bold">La fuga entre recibir y pagar</div>
      <p className="mb-4 text-[11px] text-muted">
        Distancia entre quienes hicieron o recibieron{" "}
        <span className="font-semibold text-teal">algún pago digital</span> y
        quienes efectivamente{" "}
        <span className="font-semibold" style={{ color: CORAL }}>
          le pagaron a un comercio
        </span>
        . La brecha mide cuánta inclusión digital se queda en recibir dinero.
      </p>

      <div className="space-y-1.5">
        {datos.map((d) => {
          const on = hover === d.cc;
          return (
            <div
              key={d.cc}
              onMouseEnter={() => setHover(d.cc)}
              onMouseLeave={() => setHover(null)}
              className="flex items-center gap-2"
            >
              <span
                className={`w-[108px] shrink-0 truncate text-[11px] ${
                  on ? "font-bold text-fg" : "text-muted"
                }`}
              >
                {d.flag} {d.nombre}
              </span>
              <div className="relative h-4 flex-1">
                {/* conector */}
                <div
                  className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full"
                  style={{
                    left: `${d.comercio}%`,
                    width: `${d.fuga}%`,
                    background: "rgba(255,255,255,0.22)",
                  }}
                />
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    left: `${d.comercio}%`,
                    background: CORAL,
                    borderColor: "#0a2c28",
                  }}
                />
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    left: `${d.total}%`,
                    background: "#1FC9A0",
                    borderColor: "#0a2c28",
                  }}
                />
              </div>
              <span className="tabnum w-[64px] shrink-0 text-right text-[11px] font-semibold">
                {on ? (
                  <>
                    {fmt(d.comercio)}→{fmt(d.total)}
                  </>
                ) : (
                  <span className="text-muted">−{fmt(d.fuga)} pp</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/8 pt-3 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: CORAL }} />
          Pago a comercios
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal" />
          Cualquier pago digital
        </span>
        <span className="ml-auto text-[10px]">
          Escala 0–100% de adultos · Findex 2025
        </span>
      </div>
    </div>
  );
}
