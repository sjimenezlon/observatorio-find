"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LabelList,
} from "recharts";
import {
  PAISES,
  PILARES,
  INDICADORES,
  CC,
  PilarKey,
  Indicador,
  SNAPSHOT_ANTERIOR,
  SNAPSHOT_COMPARABLE,
  META,
} from "@/data/dataset";
import {
  calcularIndice,
  normalizarIndicador,
  banda,
  Pesos,
  PESOS_DEFAULT,
} from "@/lib/index";
import { ACTORES, PRESETS } from "@/data/lentes";
import { LATAM } from "@/data/latam";
import { DIMENSIONES } from "@/data/confianza";
import { calcularICF } from "@/lib/confianza";
import Simulador from "@/components/Simulador";
import Duelo from "@/components/Duelo";
import FichaPais from "@/components/FichaPais";

const COLORS: Record<CC, string> = {
  CO: "#1FC9A0",
  MX: "#9FCE2E",
  BR: "#6C5CD6",
  CL: "#5BD0E0",
  PE: "#E8B452",
  AR: "#FF8FA3",
};

const nombre = (c: CC) => PAISES.find((p) => p.code === c)!.nombre;
const flag = (c: CC) => PAISES.find((p) => p.code === c)!.flag;

function fmt(v: number | null, unidad?: string) {
  if (v === null) return "n/d";
  const s =
    Math.abs(v) >= 1000 ? v.toLocaleString("es-CO") : String(Math.round(v * 10) / 10);
  return unidad ? `${s}` : s;
}

// ---------------------------------------------------------------------------
export default function Dashboard() {
  const [pesos, setPesos] = useState<Pesos>({ ...PESOS_DEFAULT });
  const filas = useMemo(() => calcularIndice(pesos), [pesos]);

  return (
    <div className="space-y-20">
      <ActorLens pesos={pesos} setPesos={setPesos} />
      <RankingIndice filas={filas} pesos={pesos} setPesos={setPesos} />
      <Simulador pesos={pesos} />
      <Duelo />
      <Comparador />
      <FichaPais />
      <ExploradorPilar />
      <Descargas />
    </div>
  );
}

// ---------------------------------------------------------------------------
function ActorLens({
  pesos,
  setPesos,
}: {
  pesos: Pesos;
  setPesos: (p: Pesos) => void;
}) {
  const [activo, setActivo] = useState<string | null>(null);
  const actor = ACTORES.find((a) => a.key === activo);

  // ¿coincide el peso actual con el de algún actor? (para resaltar)
  const matchActor = (a: (typeof ACTORES)[number]) =>
    PILARES.every((pl) => pesos[pl.key] === a.pesos[pl.key]);

  return (
    <section id="lente">
      <Eyebrow>Lente por actor</Eyebrow>
      <H2>¿Desde dónde mirás el ecosistema?</H2>
      <Sub>
        El observatorio no es un bloque genérico. Elegí tu rol y ajustamos la
        lectura del índice a tu prioridad —y te dejamos una pregunta para
        provocar la conversación.
      </Sub>

      <div className="flex flex-wrap gap-2">
        {ACTORES.map((a) => {
          const on = a.key === activo || (activo === null && matchActor(a) && false);
          return (
            <button
              key={a.key}
              onClick={() => {
                setActivo(a.key);
                setPesos({ ...a.pesos });
              }}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition"
              style={{
                background: on ? "rgba(31,201,160,0.16)" : "transparent",
                borderColor: on ? "#1FC9A0" : "rgba(255,255,255,0.14)",
                color: on ? "#1FC9A0" : "#8fa9a1",
              }}
            >
              <span className="text-base">{a.emoji}</span>
              {a.label}
            </button>
          );
        })}
      </div>

      {actor && (
        <div
          className="card mt-5 p-6"
          style={{
            background:
              "linear-gradient(120deg, rgba(31,201,160,0.10), rgba(108,92,214,0.08))",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">{actor.emoji}</div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                Le importa
              </div>
              <p className="text-sm text-fg/80">{actor.leImporta}</p>
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
                  La pregunta que te deja el observatorio
                </div>
                <p className="mt-1 text-[15px] font-medium text-fg">
                  {actor.insight}
                </p>
              </div>
              <p className="mt-3 text-xs text-muted">
                Ajustamos los pesos del índice a esta prioridad — mirá cómo cambia
                el ranking abajo. Podés afinarlos a mano cuando quieras.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
function RankingIndice({
  filas,
  pesos,
  setPesos,
}: {
  filas: ReturnType<typeof calcularIndice>;
  pesos: Pesos;
  setPesos: (p: Pesos) => void;
}) {
  const sumaPesos = PILARES.reduce((a, p) => a + pesos[p.key], 0) || 1;
  const data = filas.map((f) => ({
    code: f.code,
    name: `${flag(f.code)} ${nombre(f.code)}`,
    indice: f.indice,
    fill: banda(f.indice).color,
  }));
  const top3 = filas.slice(0, 3);
  const medallas = ["🥇", "🥈", "🥉"];
  const bandColors = ["#1FC9A0", "#9FCE2E", "#E8B452", "#6C5CD6"];
  const gid = (hex: string) => "grad" + hex.replace("#", "");
  // evolución vs. el corte anterior — solo comparable con pesos iguales
  const pesosDefault = PILARES.every((pl) => pesos[pl.key] === PESOS_DEFAULT[pl.key]);
  const deltaAnterior = (c: CC) =>
    Math.round((filas.find((f) => f.code === c)!.indice - SNAPSHOT_ANTERIOR.scores[c]) * 10) / 10;

  return (
    <section id="indice">
      <Eyebrow>Sección bandera · Índice compuesto</Eyebrow>
      <H2>Índice de Madurez de IA Financiera (IMIAF)</H2>
      <Sub>
        Un puntaje 0–100 por país que combina los seis pilares. Cada indicador
        se normaliza 0–100 sobre los seis países y se promedia por pilar; el
        índice es el promedio ponderado de los pilares. Mové los pesos para ver
        cómo cambia el ranking según la prioridad de política pública.
      </Sub>

      {/* podio */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {top3.map((f, i) => {
          const b = banda(f.indice);
          return (
            <div
              key={f.code}
              className="card relative overflow-hidden p-5"
              style={{ borderTop: `3px solid ${b.color}` }}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full"
                style={{ background: `${b.color}22` }}
              />
              <div className="flex items-center justify-between">
                <span className="text-2xl">{medallas[i]}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ background: `${b.color}22`, color: b.color }}
                >
                  {b.label}
                </span>
              </div>
              <div className="mt-3 text-lg font-bold">
                {flag(f.code)} {nombre(f.code)}
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span
                  className="tabnum text-4xl font-extrabold"
                  style={{ color: b.color }}
                >
                  {f.indice}
                </span>
                <span className="text-sm text-muted">/ 100</span>
                {pesosDefault && deltaAnterior(f.code) !== 0 && (
                  <span
                    className="tabnum ml-2 text-xs font-semibold"
                    style={{
                      color: deltaAnterior(f.code) > 0 ? "#1FC9A0" : "#ff8fa3",
                    }}
                  >
                    {deltaAnterior(f.code) > 0 ? "▲" : "▼"}
                    {Math.abs(deltaAnterior(f.code))} vs {SNAPSHOT_ANTERIOR.fecha}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
        {/* ranking */}
        <div className="card p-5">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ left: 8, right: 44, top: 4, bottom: 4 }}
              >
                <defs>
                  {bandColors.map((c) => (
                    <linearGradient
                      key={c}
                      id={gid(c)}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor={c} stopOpacity={0.55} />
                      <stop offset="100%" stopColor={c} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fill: "#eaf3ef", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#0e3b36",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "#eaf3ef",
                  }}
                  formatter={(v) => [`${v} / 100`, "IMIAF"]}
                />
                <Bar dataKey="indice" radius={[0, 8, 8, 0]} barSize={26}>
                  {data.map((d) => (
                    <Cell key={d.code} fill={`url(#${gid(d.fill)})`} />
                  ))}
                  <LabelList
                    dataKey="indice"
                    position="right"
                    fill="#eaf3ef"
                    fontSize={13}
                    fontWeight={700}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
            {[75, 55, 40, 0].map((t) => {
              const b = banda(t + 1);
              return (
                <span key={t} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: b.color }}
                  />
                  {b.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* weight controls */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-fg">Pesos de los pilares</h3>
            <button
              onClick={() => setPesos({ ...PESOS_DEFAULT })}
              className="text-xs text-teal hover:underline"
            >
              Restablecer
            </button>
          </div>
          <p className="text-xs text-muted mb-3">
            Los pesos se renormalizan automáticamente. Por defecto, 20% cada uno.
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {PRESETS.map((pr) => {
              const on = PILARES.every((pl) => pesos[pl.key] === pr.pesos[pl.key]);
              return (
                <button
                  key={pr.key}
                  onClick={() => setPesos({ ...pr.pesos })}
                  title={pr.desc}
                  className="rounded-full border px-3 py-1 text-xs font-medium transition"
                  style={{
                    background: on ? "rgba(159,206,46,0.18)" : "transparent",
                    borderColor: on ? "#9FCE2E" : "rgba(255,255,255,0.14)",
                    color: on ? "#9FCE2E" : "#8fa9a1",
                  }}
                >
                  {pr.label}
                </button>
              );
            })}
          </div>
          <div className="space-y-4">
            {PILARES.map((pl) => {
              const efectivo = Math.round((pesos[pl.key] / sumaPesos) * 100);
              return (
                <div key={pl.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: pl.color }}
                      />
                      {pl.corto}
                    </span>
                    <span className="tabnum text-muted">{efectivo}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={pesos[pl.key]}
                    onChange={(e) =>
                      setPesos({ ...pesos, [pl.key]: Number(e.target.value) })
                    }
                    className="w-full"
                    style={{ accentColor: pl.color }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* detail table */}
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead>
            <tr className="text-left text-muted border-b border-white/10">
              <th className="p-3 font-medium">#</th>
              <th className="p-3 font-medium">País</th>
              {PILARES.map((pl) => (
                <th key={pl.key} className="p-3 font-medium text-center">
                  {pl.corto}
                </th>
              ))}
              <th className="p-3 font-medium text-center">IMIAF</th>
              {pesosDefault && (
                <th className="p-3 font-medium text-center">
                  Δ vs {SNAPSHOT_ANTERIOR.fecha}
                </th>
              )}
              <th className="p-3 font-medium">Banda</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f, i) => {
              const b = banda(f.indice);
              return (
                <tr key={f.code} className="border-b border-white/5">
                  <td className="p-3 tabnum text-muted">{i + 1}</td>
                  <td className="p-3 font-medium">
                    {flag(f.code)} {nombre(f.code)}
                  </td>
                  {PILARES.map((pl) => (
                    <td
                      key={pl.key}
                      className="p-3 text-center tabnum text-muted"
                    >
                      {f.pilares[pl.key] === null ? "n/d" : f.pilares[pl.key]}
                    </td>
                  ))}
                  <td className="p-3 text-center tabnum font-bold text-fg">
                    {f.indice}
                  </td>
                  {pesosDefault && (
                    <td
                      className="p-3 text-center tabnum text-xs font-semibold"
                      style={{
                        color:
                          deltaAnterior(f.code) > 0
                            ? "#1FC9A0"
                            : deltaAnterior(f.code) < 0
                              ? "#ff8fa3"
                              : "#8fa9a1",
                      }}
                    >
                      {deltaAnterior(f.code) > 0
                        ? `▲${deltaAnterior(f.code)}`
                        : deltaAnterior(f.code) < 0
                          ? `▼${Math.abs(deltaAnterior(f.code))}`
                          : "="}
                    </td>
                  )}
                  <td className="p-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: `${b.color}22`, color: b.color }}
                    >
                      {b.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!SNAPSHOT_COMPARABLE && (
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          <b className="text-amber">Sobre la columna Δ:</b> el corte anterior se
          calculó con cinco pilares, sin Pagos. Los deltas de esta versión mezclan
          cambio de datos y cambio de metodología, así que sirven como referencia
          de posición y no como variación limpia. El detalle está en{" "}
          <a href="/metodologia" className="text-teal underline">
            metodología
          </a>
          .
        </p>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
function Comparador() {
  const [sel, setSel] = useState<CC[]>(["CO", "BR", "MX"]);
  const toggle = (c: CC) =>
    setSel((s) =>
      s.includes(c) ? s.filter((x) => x !== c) : s.length < 4 ? [...s, c] : s
    );

  const pilarScores = useMemo(() => {
    const m: Record<PilarKey, Record<CC, number | null>> = {} as never;
    for (const pl of PILARES) {
      const inds = INDICADORES.filter((i) => i.pilar === pl.key).map(
        normalizarIndicador
      );
      const row = {} as Record<CC, number | null>;
      for (const p of PAISES) {
        const sc = inds
          .map((n) => n[p.code])
          .filter((v): v is number => v !== null);
        row[p.code] =
          sc.length === 0
            ? null
            : Math.round((sc.reduce((a, b) => a + b, 0) / sc.length) * 10) / 10;
      }
      m[pl.key] = row;
    }
    return m;
  }, []);

  const data = PILARES.map((pl) => {
    const row: Record<string, number | string> = { pilar: pl.corto };
    for (const c of sel) row[c] = pilarScores[pl.key][c] ?? 0;
    return row;
  });

  return (
    <section id="comparador">
      <Eyebrow>Comparador</Eyebrow>
      <H2>Perfil de madurez por país</H2>
      <Sub>
        Seleccioná hasta cuatro países para comparar su puntaje (0–100) en cada
        pilar. Útil para leer fortalezas y brechas relativas de un vistazo.
      </Sub>

      <div className="flex flex-wrap gap-2 mb-5">
        {PAISES.map((p) => {
          const on = sel.includes(p.code);
          return (
            <button
              key={p.code}
              onClick={() => toggle(p.code)}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition border"
              style={{
                background: on ? `${COLORS[p.code]}22` : "transparent",
                borderColor: on ? COLORS[p.code] : "rgba(255,255,255,0.14)",
                color: on ? COLORS[p.code] : "#8fa9a1",
              }}
            >
              {p.flag} {p.nombre}
            </button>
          );
        })}
      </div>

      <div className="card p-5">
        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis
                dataKey="pilar"
                tick={{ fill: "#eaf3ef", fontSize: 13 }}
              />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fill: "#8fa9a1", fontSize: 10 }}
                axisLine={false}
              />
              {sel.map((c) => (
                <Radar
                  key={c}
                  name={nombre(c)}
                  dataKey={c}
                  stroke={COLORS[c]}
                  fill={COLORS[c]}
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              ))}
              <Tooltip
                contentStyle={{
                  background: "#0e3b36",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  color: "#eaf3ef",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
function ExploradorPilar() {
  const [activo, setActivo] = useState<PilarKey>("inclusion");
  const [modo, setModo] = useState<"crudo" | "norm">("crudo");
  const pilar = PILARES.find((p) => p.key === activo)!;
  const inds = INDICADORES.filter((i) => i.pilar === activo);

  return (
    <section id="pilares">
      <Eyebrow>Explorador por pilar</Eyebrow>
      <H2>Los datos detrás del índice</H2>
      <Sub>
        Cada indicador con su valor por país, su fuente y su año. Alterná entre
        el valor crudo y el puntaje normalizado 0–100 que alimenta el índice.
      </Sub>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {PILARES.map((pl) => {
            const on = pl.key === activo;
            return (
              <button
                key={pl.key}
                onClick={() => setActivo(pl.key)}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium transition border"
                style={{
                  background: on ? `${pl.color}22` : "transparent",
                  borderColor: on ? pl.color : "rgba(255,255,255,0.14)",
                  color: on ? pl.color : "#8fa9a1",
                }}
              >
                {pl.corto}
              </button>
            );
          })}
        </div>
        <div className="flex rounded-full border border-white/14 p-0.5 text-xs">
          {(["crudo", "norm"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              className="rounded-full px-3 py-1 font-medium transition"
              style={{
                background: modo === m ? "rgba(31,201,160,0.2)" : "transparent",
                color: modo === m ? "#1FC9A0" : "#8fa9a1",
              }}
            >
              {m === "crudo" ? "Valor crudo" : "Normalizado 0–100"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted mb-6 max-w-3xl">{pilar.desc}</p>

      <div className="grid gap-6 md:grid-cols-2">
        {inds.map((ind) => (
          <IndicadorCard key={ind.key} ind={ind} modo={modo} color={pilar.color} />
        ))}
      </div>
    </section>
  );
}

function IndicadorCard({
  ind,
  modo,
  color,
}: {
  ind: Indicador;
  modo: "crudo" | "norm";
  color: string;
}) {
  const norm = useMemo(() => normalizarIndicador(ind), [ind]);
  const data = PAISES.map((p) => ({
    code: p.code,
    name: `${p.flag}`,
    full: p.nombre,
    crudo: ind.valores[p.code],
    norm: norm[p.code],
  }));
  const valor = (d: (typeof data)[number]) =>
    modo === "crudo" ? d.crudo : d.norm;

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-fg flex items-center gap-2">
            {ind.label}
            {ind.construido && (
              <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-amber">
                índice del Observatorio
              </span>
            )}
          </h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">{ind.desc}</p>
        </div>
        <span className="shrink-0 text-xs text-muted">
          {ind.direccion === "higher" ? "↑ mejor" : "↓ mejor"}
        </span>
      </div>

      <div className="h-[180px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 6, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id={`ig${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                <stop offset="100%" stopColor={color} stopOpacity={0.45} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 16 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8fa9a1", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={modo === "norm" ? [0, 100] : ["auto", "auto"]}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "#0e3b36",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#eaf3ef",
              }}
              formatter={(v) => [
                v === null || v === undefined
                  ? "n/d"
                  : `${v}${modo === "crudo" ? " " + ind.unidad : " / 100"}`,
                modo === "crudo" ? "Valor" : "Normalizado",
              ]}
              labelFormatter={(_, p) =>
                p && p[0] ? (p[0].payload as { full: string }).full : ""
              }
            />
            <Bar dataKey={modo === "crudo" ? "crudo" : "norm"} radius={[6, 6, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.code}
                  fill={valor(d) === null ? "#2c4a44" : `url(#ig${color.replace("#", "")})`}
                  fillOpacity={valor(d) === null ? 0.4 : 1}
                />
              ))}
              <LabelList
                dataKey={modo === "crudo" ? "crudo" : "norm"}
                position="top"
                fill="#eaf3ef"
                fontSize={10}
                formatter={(v) => (v === null || v === undefined ? "n/d" : v)}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 border-t border-white/8 pt-3 text-[11px] leading-relaxed text-muted">
        <a
          href={ind.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal hover:underline"
        >
          {ind.fuente}
        </a>{" "}
        · {ind.anio}
        {ind.overrides &&
          Object.entries(ind.overrides).map(([cc, ov]) =>
            ov?.nota ? (
              <div key={cc} className="mt-1">
                <b className="text-fg/80">{nombre(cc as CC)}:</b> {ov.nota}
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function Descargas() {
  const descargarJSON = () => {
    const payload = {
      meta: {
        observatorio: `${META.marca} · IA Financiera LATAM`,
        institucion: META.institucion,
        version: META.version,
        curado: META.curado,
      },
      paises: PAISES,
      indice: calcularIndice(),
      indicadores: INDICADORES,
      panel_latam: LATAM,
      icf: calcularICF(),
      icf_dimensiones: DIMENSIONES,
    };
    download(
      JSON.stringify(payload, null, 2),
      "observatorio-finhub-dataset.json",
      "application/json"
    );
  };

  const descargarCSV = () => {
    const head = ["indicador", "pilar", "unidad", "direccion", "fuente", "anio", ...PAISES.map((p) => p.code)];
    const rows = INDICADORES.map((i) =>
      [
        i.label,
        i.pilar,
        i.unidad,
        i.direccion,
        `"${i.fuente}"`,
        i.anio,
        ...PAISES.map((p) => (i.valores[p.code] ?? "n/d")),
      ].join(",")
    );
    download([head.join(","), ...rows].join("\n"), "observatorio-finhub-dataset.csv", "text/csv");
  };

  // Panel LATAM (21 economías) + ICF calculado, en un CSV aparte: el IMIAF
  // compara seis países y este panel abre a la región, así que mezclarlos en un
  // mismo archivo confundiría los universos.
  const descargarLatamCSV = () => {
    const icf = calcularICF();
    const campos: (keyof (typeof LATAM)[number])[] = [
      "cuenta", "pagodigital", "merchantpay", "efectivo", "inactiva", "guarda",
      "desconfianza", "desconfianzaRaw", "creditoformal", "borrowAny",
      "formalidadCredito", "prestatarios", "depositantes", "creditoDeposito",
      "estafaOferta", "estafaEnvio", "conversionEstafa", "comisiones",
      "remesasPib", "costoRemesa", "debito", "movil",
    ];
    const head = [
      "iso3", "pais", ...campos, "icf",
      ...DIMENSIONES.map((d) => `icf_${d.key}`),
      "cobertura_icf", "medible_icf",
    ];
    const rows = LATAM.map((p) => {
      const f = icf.find((x) => x.cc === p.cc)!;
      return [
        p.cc,
        `"${p.nombre}"`,
        ...campos.map((c) => p[c] ?? "n/d"),
        f.icf ?? "n/d",
        ...DIMENSIONES.map((d) => f.dims[d.key] ?? "n/d"),
        f.cobertura,
        f.medible ? "si" : "no",
      ].join(",");
    });
    download(
      [head.join(","), ...rows].join("\n"),
      "observatorio-find-panel-latam-icf.csv",
      "text/csv"
    );
  };

  return (
    <section id="datos">
      <div className="card p-7 text-center">
        <H3>Dataset abierto</H3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Descargá la base completa con valores por país, fuentes y el índice
          calculado. Metodología abierta y reproducible: cualquiera puede
          auditar, replicar y citar. El panel LATAM va aparte porque cubre 21
          economías, no los seis del IMIAF.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={descargarCSV}
            className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] hover:bg-teal-d transition"
          >
            Descargar CSV
          </button>
          <button
            onClick={descargarJSON}
            className="rounded-full border border-teal/50 px-5 py-2.5 text-sm font-semibold text-teal hover:bg-teal/10 transition"
          >
            Descargar JSON
          </button>
          <button
            onClick={descargarLatamCSV}
            className="rounded-full border px-5 py-2.5 text-sm font-semibold transition"
            style={{ borderColor: "rgba(232,130,90,0.5)", color: "#E8825A" }}
          >
            Panel LATAM + ICF (CSV)
          </button>
          <a
            href="/metodologia"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-muted hover:text-fg transition"
          >
            Ver metodología →
          </a>
        </div>
      </div>
    </section>
  );
}

function download(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// primitives
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
      {children}
    </div>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-extrabold tracking-tight text-fg">{children}</h3>;
}
function Sub({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 mb-7 max-w-3xl text-[15px] text-muted">{children}</p>;
}
