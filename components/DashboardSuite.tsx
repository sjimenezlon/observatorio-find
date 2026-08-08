"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CC, INDICADORES, Indicador, PAISES } from "@/data/dataset";
import { SEGMENTOS } from "@/data/segmentos";
import { calcularICF } from "@/lib/confianza";
import { normalizarIndicador } from "@/lib/index";

type DashboardId =
  | "inclusion"
  | "fintech"
  | "regulacion"
  | "clima"
  | "conducta"
  | "ciberseguridad";
type CoverageState = "live" | "partial" | "gap";

interface CoverageItem {
  label: string;
  state: CoverageState;
  note: string;
}

interface DashboardSpec {
  id: DashboardId;
  number: string;
  title: string;
  short: string;
  priority: boolean;
  status: "Publicado" | "Cobertura parcial" | "En estructuración";
  cadence: string;
  audience: string;
  color: string;
  description: string;
  question: string;
  indicatorKeys: string[];
  coverage: CoverageItem[];
}

const SUITE: DashboardSpec[] = [
  {
    id: "inclusion",
    number: "01",
    title: "Inclusión Financiera Digital",
    short: "Inclusión",
    priority: true,
    status: "Publicado",
    cadence: "Trimestral",
    audience: "Policy makers · desarrollo · banca",
    color: "#1FC9A0",
    description:
      "Acceso, uso digital y exclusión. El promedio nacional se abre por género, ingreso y territorio para mostrar quién sigue quedando afuera.",
    question: "¿La cuenta se convirtió en uso financiero real y para quién?",
    indicatorKeys: ["cuenta", "pagodigital", "credito", "brechagenero"],
    coverage: [
      { label: "Penetración de cuenta", state: "live", note: "6 países · Findex 2024" },
      { label: "Adopción de pagos digitales", state: "live", note: "6 países · Findex 2024" },
      { label: "Crédito formal", state: "live", note: "6 países; Chile conserva dato 2021" },
      { label: "Género, ingreso y urbano/rural", state: "live", note: "21 economías en ICF-S" },
      { label: "Exclusión financiera", state: "live", note: "Derivada como 100 − tenencia de cuenta" },
      { label: "Formal vs. informal", state: "partial", note: "Disponible sobre quienes se endeudaron" },
      { label: "Edad", state: "gap", note: "Sin panel comparable incorporado" },
      { label: "Serie anual 2020–2026", state: "gap", note: "El corte vigente no es una serie histórica" },
    ],
  },
  {
    id: "fintech",
    number: "02",
    title: "Ecosistema Fintech & Startups",
    short: "Fintech",
    priority: true,
    status: "Cobertura parcial",
    cadence: "Semestral",
    audience: "Inversionistas · founders · banca",
    color: "#9FCE2E",
    description:
      "Densidad del ecosistema y capital disponible para innovar. Se separa lo comparable de las señales de mercado todavía fragmentadas.",
    question: "¿Dónde existe masa crítica y dónde solo hay volumen transitorio?",
    indicatorKeys: ["fintechs", "vc", "chainalysis"],
    coverage: [
      { label: "Fintechs activas por país", state: "live", note: "Finnovista y Distrito" },
      { label: "Capital de riesgo por país", state: "live", note: "VC equity 2025 · Cuántico VP" },
      { label: "Verticales emergentes", state: "partial", note: "Cripto y tokenización como señal disponible" },
      { label: "Distribución de VC por vertical", state: "partial", note: "Fintech representa 61% regional; falta desglose país" },
      { label: "Hot spots de innovación", state: "partial", note: "Notas disponibles; geocodificación pendiente" },
      { label: "Valuations y exits", state: "gap", note: "Sin serie homogénea auditable" },
      { label: "Supervivencia 1/3/5 años", state: "gap", note: "Requiere panel longitudinal de empresas" },
      { label: "Empleo fintech", state: "gap", note: "Sin taxonomía laboral regional común" },
    ],
  },
  {
    id: "regulacion",
    number: "03",
    title: "Madurez Regulatoria & Policy",
    short: "Regulación",
    priority: true,
    status: "Publicado",
    cadence: "Trimestral",
    audience: "Reguladores · fintechs · multilaterales",
    color: "#E8B452",
    description:
      "Compara apertura de datos, marco fintech y reglas de activos digitales con rúbricas explícitas y trazabilidad legal por país.",
    question: "¿La regulación habilita innovación con salvaguardas o crea espera?",
    indicatorKeys: ["openfinance", "marcofintech", "regulacion"],
    coverage: [
      { label: "Open banking / open finance", state: "live", note: "Rúbrica 0–100 · corte 2026" },
      { label: "Ley fintech, sandbox y datos", state: "live", note: "Rúbrica conjunta documentada" },
      { label: "Regulación de criptoactivos", state: "live", note: "Madurez 0–100 con nota país" },
      { label: "Protección de datos", state: "partial", note: "Integrada al marco fintech; falta vista autónoma" },
      { label: "Pipeline normativo", state: "partial", note: "Hitos próximos en notas de país" },
      { label: "Ciberseguridad normativa", state: "gap", note: "Sin estándar regional comparable" },
      { label: "Ranking global de regulación", state: "gap", note: "No se mezcla con el ranking LatAm sin fuente equivalente" },
    ],
  },
  {
    id: "clima",
    number: "04",
    title: "Riesgo Climático Financiero",
    short: "Clima",
    priority: true,
    status: "En estructuración",
    cadence: "Anual",
    audience: "Inversionistas · reguladores · aseguradoras",
    color: "#5BD0E0",
    description:
      "Contrato de datos para medir exposición, transición y brecha de financiamiento climático sin asignar puntajes antes de contar con evidencia comparable.",
    question: "¿Quién financia la transición y quién concentra el riesgo físico?",
    indicatorKeys: [],
    coverage: [
      { label: "Exposición bancaria a sectores intensivos", state: "gap", note: "Requiere taxonomía común y carteras públicas" },
      { label: "Compromisos de descarbonización", state: "gap", note: "Por validar contra reportes de entidades" },
      { label: "Financiamiento renovable", state: "gap", note: "Definir perímetro: bonos, crédito o ambos" },
      { label: "Brecha de financiamiento climático", state: "gap", note: "Necesita meta y necesidad comparables" },
      { label: "Riesgo físico por país", state: "gap", note: "Inundación, sequía y ciclón con fuente meteorológica" },
      { label: "Adopción TCFD / ISSB / GRI", state: "gap", note: "Censo anual de emisores y bancos" },
      { label: "Cobertura de reportes ESG", state: "gap", note: "Porcentaje con denominador explícito" },
    ],
  },
  {
    id: "conducta",
    number: "05",
    title: "Conducta y Salud Financiera",
    short: "Conducta",
    priority: false,
    status: "Cobertura parcial",
    cadence: "Anual",
    audience: "Bancos · ONGs · reguladores · academia",
    color: "#FF8FA3",
    description:
      "Usa confianza revelada y profundidad del vínculo como señales observables de salud financiera, sin confundir bancarización con bienestar.",
    question: "¿La relación financiera mejora capacidad y confianza o solo acceso?",
    indicatorKeys: ["cuenta", "credito", "merchantpay", "efectivocomercio"],
    coverage: [
      { label: "Confianza financiera", state: "live", note: "ICF: 8 indicadores, 21 economías" },
      { label: "Brechas por género, ingreso y territorio", state: "live", note: "ICF-S reducido y comparable" },
      { label: "Formalidad del endeudamiento", state: "live", note: "Derivada sobre adultos que tomaron deuda" },
      { label: "Estrés y sobreendeudamiento", state: "gap", note: "Falta mora/carga financiera comparable" },
      { label: "Alfabetización financiera digital", state: "gap", note: "Requiere encuesta específica" },
      { label: "Planificación y educación", state: "gap", note: "Sin fuente regional armonizada" },
      { label: "Impacto de nudges", state: "gap", note: "Debe publicarse como evidencia causal, no correlación" },
    ],
  },
  {
    id: "ciberseguridad",
    number: "06",
    title: "Ciberseguridad y Fraude Financiero",
    short: "Ciber & fraude",
    priority: false,
    status: "Cobertura parcial",
    cadence: "Trimestral",
    audience: "Reguladores · bancos · fintechs · usuarios",
    color: "#6C5CD6",
    description:
      "Distingue exposición, vulnerabilidad y daño. El tablero no usa el número de intentos como sustituto de pérdidas efectivas.",
    question: "¿Dónde el intento de fraude se convierte realmente en pérdida?",
    indicatorKeys: ["basel", "conversionestafa"],
    coverage: [
      { label: "Riesgo AML por país", state: "live", note: "Basel AML Index 2025" },
      { label: "Conversión de estafa telefónica", state: "live", note: "Findex: envío ÷ solicitud" },
      { label: "Tipos de fraude", state: "partial", note: "Fuentes globales; falta distribución comparable país" },
      { label: "Pérdidas por fraude", state: "partial", note: "Costo regional 3,68×; no monto por país" },
      { label: "Cobertura AML/KYC", state: "gap", note: "Sin denominador público homogéneo" },
      { label: "Sanciones y montos", state: "gap", note: "Requiere registro legal normalizado" },
      { label: "Adopción de MFA", state: "gap", note: "Sin reporte regional comparable" },
    ],
  },
];

const CC_TO_ISO3: Record<CC, string> = {
  CO: "COL",
  MX: "MEX",
  BR: "BRA",
  CL: "CHL",
  PE: "PER",
  AR: "ARG",
};

const STATUS_COPY: Record<CoverageState, { label: string; color: string; mark: string }> = {
  live: { label: "Publicado", color: "#1FC9A0", mark: "●" },
  partial: { label: "Parcial", color: "#E8B452", mark: "◐" },
  gap: { label: "Brecha", color: "#91AAA3", mark: "○" },
};

function fmt(value: number | null, unit: string) {
  if (value === null) return "n/d";
  const digits = Math.abs(value) >= 100 ? 0 : 1;
  const number = value.toLocaleString("es-CO", { maximumFractionDigits: digits });
  if (unit === "%" || unit === "pp") return `${number}${unit}`;
  if (unit === "ranking") return `#${number}`;
  if (unit === "US$ M") return `US$ ${number} M`;
  return `${number} ${unit}`;
}

function average(indicator: Indicador) {
  const values = PAISES.map((country) => indicator.valores[country.code]).filter(
    (value): value is number => value !== null,
  );
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function statusColor(status: DashboardSpec["status"]) {
  if (status === "Publicado") return "#1FC9A0";
  if (status === "Cobertura parcial") return "#E8B452";
  return "#91AAA3";
}

export default function DashboardSuite() {
  const [activeId, setActiveId] = useState<DashboardId>("inclusion");
  const [country, setCountry] = useState<CC>("CO");
  const active = SUITE.find((item) => item.id === activeId)!;
  const indicators = active.indicatorKeys
    .map((key) => INDICADORES.find((indicator) => indicator.key === key))
    .filter((indicator): indicator is Indicador => Boolean(indicator));
  const [metricKey, setMetricKey] = useState("cuenta");
  const metric = indicators.find((indicator) => indicator.key === metricKey) ?? indicators[0];

  const selectDashboard = (id: DashboardId) => {
    const next = SUITE.find((item) => item.id === id)!;
    setActiveId(id);
    setMetricKey(next.indicatorKeys[0] ?? "");
  };

  const coverage = active.coverage.reduce(
    (acc, item) => {
      acc[item.state] += 1;
      return acc;
    },
    { live: 0, partial: 0, gap: 0 },
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <section aria-label="Portafolio de dashboards">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow text-teal">Portfolio control</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
              Elige una pregunta de decisión
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            ● publicado&nbsp;&nbsp; ◐ parcial&nbsp;&nbsp; ○ brecha declarada
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {SUITE.map((dashboard) => {
            const selected = dashboard.id === activeId;
            return (
              <button
                key={dashboard.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectDashboard(dashboard.id)}
                className="group rounded-xl border p-4 text-left transition hover:-translate-y-0.5"
                style={{
                  borderColor: selected ? dashboard.color : "rgba(255,255,255,0.09)",
                  background: selected ? `${dashboard.color}12` : "rgba(255,255,255,0.018)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] font-semibold text-muted">
                    D{dashboard.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {dashboard.priority && (
                      <span className="rounded-full border border-lime/20 bg-lime/[0.06] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-lime">
                        prioritario
                      </span>
                    )}
                    <span style={{ color: statusColor(dashboard.status) }}>●</span>
                  </div>
                </div>
                <div className="mt-4 text-sm font-bold text-fg">{dashboard.title}</div>
                <div className="mt-1 text-[11px] text-muted">
                  {dashboard.cadence} · {dashboard.status}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-white/9 bg-panel/70">
        <div
          className="border-b border-white/8 px-5 py-6 md:px-7"
          style={{ boxShadow: `inset 4px 0 0 ${active.color}` }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: active.color }}>
                  Dashboard {active.number}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]"
                  style={{ color: statusColor(active.status), borderColor: `${statusColor(active.status)}55` }}
                >
                  {active.status}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-4xl">
                {active.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg/72 md:text-[15px]">
                {active.description}
              </p>
              <p className="mt-4 border-l border-white/15 pl-4 text-sm font-semibold text-fg">
                {active.question}
              </p>
            </div>

            <div className="grid min-w-[280px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8">
              <div className="bg-[#0a2926] p-4">
                <div className="data-label text-muted">Actualización</div>
                <div className="mt-1 text-sm font-semibold">{active.cadence}</div>
              </div>
              <div className="bg-[#0a2926] p-4">
                <div className="data-label text-muted">Cobertura live</div>
                <div className="mt-1 text-sm font-semibold">{coverage.live}/{active.coverage.length}</div>
              </div>
              <div className="col-span-2 bg-[#0a2926] p-4">
                <div className="data-label text-muted">Público principal</div>
                <div className="mt-1 text-xs font-semibold leading-relaxed">{active.audience}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/8 px-5 py-4 md:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <label className="data-label text-muted" htmlFor="country-filter">País de lectura</label>
              <select
                id="country-filter"
                value={country}
                onChange={(event) => setCountry(event.target.value as CC)}
                className="ml-3 rounded-lg border border-white/12 bg-bg-2 px-3 py-2 text-sm text-fg"
              >
                {PAISES.map((item) => (
                  <option key={item.code} value={item.code}>{item.flag} {item.nombre}</option>
                ))}
              </select>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              Fuente y año visibles en cada señal
            </span>
          </div>
        </div>

        <div className="p-5 md:p-7">
          {indicators.length > 0 ? (
            <>
              <KpiGrid indicators={indicators} country={country} color={active.color} />
              <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <BenchmarkPanel
                  indicators={indicators}
                  metric={metric}
                  metricKey={metric?.key ?? ""}
                  setMetricKey={setMetricKey}
                  color={active.color}
                />
                <Heatmap indicators={indicators} color={active.color} />
              </div>
              {active.id === "inclusion" && <Segmentation country={country} color={active.color} />}
              {active.id === "conducta" && <ConductSignal country={country} color={active.color} />}
              <CountryReading indicators={indicators} country={country} color={active.color} />
            </>
          ) : (
            <ClimateContract color={active.color} />
          )}

          <CoverageMatrix items={active.coverage} color={active.color} />
        </div>
      </section>
    </div>
  );
}

function KpiGrid({ indicators, country, color }: { indicators: Indicador[]; country: CC; color: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {indicators.slice(0, 4).map((indicator) => {
        const value = indicator.valores[country];
        const delta = value === null ? null : value - average(indicator);
        const positive = delta === null ? null : indicator.direccion === "higher" ? delta >= 0 : delta <= 0;
        const override = indicator.overrides?.[country];
        return (
          <article key={indicator.key} className="rounded-xl border border-white/8 bg-white/[0.018] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="data-label text-muted">{indicator.label}</div>
              <span className="font-mono text-[9px] text-muted">{override?.anio ?? indicator.anio}</span>
            </div>
            <div className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em]" style={{ color }}>
              {fmt(value, indicator.unidad)}
            </div>
            <div className="mt-2 min-h-4 font-mono text-[9px] uppercase tracking-[0.08em]">
              {delta === null ? (
                <span className="text-muted">sin dato comparable</span>
              ) : (
                <span style={{ color: positive ? "#1FC9A0" : "#E8B452" }}>
                  {delta >= 0 ? "+" : ""}{delta.toFixed(1)} vs promedio simple
                </span>
              )}
            </div>
            <a
              href={override?.url ?? indicator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block border-t border-white/6 pt-3 text-[10px] leading-snug text-muted hover:text-teal"
            >
              {override?.fuente ?? indicator.fuente} ↗
            </a>
          </article>
        );
      })}
    </div>
  );
}

function BenchmarkPanel({
  indicators,
  metric,
  metricKey,
  setMetricKey,
  color,
}: {
  indicators: Indicador[];
  metric: Indicador | undefined;
  metricKey: string;
  setMetricKey: (key: string) => void;
  color: string;
}) {
  if (!metric) return null;
  const data = PAISES.map((country) => ({
    code: country.code,
    label: `${country.flag} ${country.nombre}`,
    value: metric.valores[country.code],
  })).filter((item): item is typeof item & { value: number } => item.value !== null);
  data.sort((a, b) => metric.direccion === "higher" ? b.value - a.value : a.value - b.value);

  return (
    <div className="min-w-0 rounded-xl border border-white/8 bg-white/[0.018] p-4 md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="data-label text-muted">Benchmark regional</div>
          <h3 className="mt-1 text-base font-bold">Quién lidera y quién rezaga</h3>
        </div>
        <select
          aria-label="Métrica del benchmark"
          value={metricKey}
          onChange={(event) => setMetricKey(event.target.value)}
          className="rounded-lg border border-white/12 bg-bg-2 px-3 py-2 text-xs text-fg"
        >
          {indicators.map((indicator) => (
            <option key={indicator.key} value={indicator.key}>{indicator.label}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 54, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis type="number" hide />
            <YAxis dataKey="label" type="category" width={112} axisLine={false} tickLine={false} tick={{ fill: "#eef7f3", fontSize: 11 }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.035)" }}
              contentStyle={{ background: "#0e3b36", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#eef7f3" }}
              formatter={(value) => [fmt(Number(value), metric.unidad), metric.label]}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
              {data.map((item, index) => <Cell key={item.code} fill={index === 0 ? color : `${color}77`} />)}
              <LabelList dataKey="value" position="right" fill="#eef7f3" fontSize={11} formatter={(value) => fmt(Number(value), metric.unidad)} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-muted">
        {metric.direccion === "higher" ? "Mayor es mejor" : "Menor es mejor"} · {metric.fuente} · {metric.anio}
      </p>
    </div>
  );
}

function Heatmap({ indicators, color }: { indicators: Indicador[]; color: string }) {
  const normalized = useMemo(
    () => new Map(indicators.map((indicator) => [indicator.key, normalizarIndicador(indicator)])),
    [indicators],
  );
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.018]">
      <div className="border-b border-white/8 p-4 md:p-5">
        <div className="data-label text-muted">Heatmap / cobertura comparable</div>
        <h3 className="mt-1 text-base font-bold">País × indicador</h3>
      </div>
      <div className="overflow-x-auto p-3">
        <table className="w-full min-w-[540px] text-xs">
          <thead>
            <tr className="text-muted">
              <th className="p-2 text-left font-medium">Indicador</th>
              {PAISES.map((country) => (
                <th
                  key={country.code}
                  aria-label={country.nombre}
                  className="p-2 text-center font-medium"
                >
                  {country.flag}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator) => (
              <tr key={indicator.key} className="border-t border-white/5">
                <td className="max-w-36 p-2 text-[10px] font-medium leading-tight text-fg/80">{indicator.label}</td>
                {PAISES.map((country) => {
                  const value = indicator.valores[country.code];
                  const score = normalized.get(indicator.key)?.[country.code] ?? null;
                  const alpha = score === null ? "00" : Math.round((0.08 + score * 0.0032) * 255).toString(16).padStart(2, "0");
                  return (
                    <td key={country.code} className="p-1 text-center">
                      <span
                        className="block rounded-md px-1 py-2 font-mono text-[9px] text-fg"
                        style={{ background: score === null ? "rgba(255,255,255,0.025)" : `${color}${alpha}` }}
                        title={score === null ? "Sin dato" : `Puntaje normalizado: ${score}/100`}
                      >
                        {value === null ? "n/d" : fmt(value, indicator.unidad)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/8 px-4 py-3 text-[10px] text-muted">
        El color usa el puntaje normalizado; la celda conserva el valor original.
      </div>
    </div>
  );
}

function Segmentation({ country, color }: { country: CC; color: string }) {
  const rows = SEGMENTOS.filter((row) => row.cc === CC_TO_ISO3[country]);
  const pairs = [
    ["Género", "mujeres", "hombres"],
    ["Ingreso", "pobre40", "rico60"],
    ["Territorio", "rural", "urbano"],
  ];
  return (
    <div className="mt-8 rounded-xl border border-white/8 bg-white/[0.018] p-4 md:p-5">
      <div className="data-label" style={{ color }}>Exclusión / segmentación</div>
      <h3 className="mt-1 text-base font-bold">Quién queda afuera de la cuenta</h3>
      <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted">
        Tenencia y exclusión se calculan sobre Global Findex 2025 (datos 2024). La edad aún no forma parte del panel publicado.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {pairs.map(([family, firstKey, secondKey]) => {
          const first = rows.find((row) => row.seg === firstKey);
          const second = rows.find((row) => row.seg === secondKey);
          return (
            <div key={family} className="rounded-lg border border-white/7 bg-bg/30 p-4">
              <div className="data-label text-muted">{family}</div>
              {[first, second].map((row) => row && (
                <div key={row.seg} className="mt-3 flex items-end justify-between gap-3 border-t border-white/5 pt-3 first:border-0 first:pt-0">
                  <span className="text-xs font-medium">{row.segLabel}</span>
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold" style={{ color }}>{row.cuenta === null ? "n/d" : `${row.cuenta.toFixed(1)}%`}</div>
                    <div className="text-[9px] text-muted">{row.cuenta === null ? "sin dato" : `${(100 - row.cuenta).toFixed(1)}% excluido`}</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConductSignal({ country, color }: { country: CC; color: string }) {
  const row = calcularICF().find((item) => item.cc === CC_TO_ISO3[country]);
  if (!row) return null;
  return (
    <div className="mt-8 grid gap-4 rounded-xl border border-white/8 bg-white/[0.018] p-4 md:grid-cols-[0.42fr_1fr] md:p-5">
      <div>
        <div className="data-label text-muted">Índice de Confianza Financiera</div>
        <div className="mt-3 font-mono text-4xl font-semibold tracking-[-0.05em]" style={{ color }}>
          {row.icf === null ? "n/d" : row.icf}
        </div>
        <div className="mt-1 text-xs text-muted">/ 100 · cobertura {Math.round(row.cobertura * 100)}%</div>
      </div>
      <div>
        <h3 className="text-base font-bold">Confianza revelada, no reputación declarada</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          El ICF observa abandono de cuentas, dinero guardado, pago al comercio, formalidad del crédito y daño por fraude. No equivale todavía a un índice completo de salud financiera: estrés, sobreendeudamiento y alfabetización permanecen como brechas de medición.
        </p>
        <a href="/pagos#confianza" className="mt-3 inline-flex text-xs font-semibold text-teal hover:underline">Abrir metodología y panel ICF →</a>
      </div>
    </div>
  );
}

function CountryReading({ indicators, country, color }: { indicators: Indicador[]; country: CC; color: string }) {
  const notes = indicators
    .map((indicator) => ({ indicator, note: indicator.overrides?.[country]?.nota }))
    .filter((item): item is { indicator: Indicador; note: string } => Boolean(item.note));
  if (notes.length === 0) return null;
  return (
    <div className="mt-8 rounded-xl border border-white/8 bg-white/[0.018] p-4 md:p-5">
      <div className="data-label" style={{ color }}>Contexto país / lectura analítica</div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {notes.slice(0, 4).map(({ indicator, note }) => (
          <article key={indicator.key} className="border-l border-white/12 pl-4">
            <h3 className="text-xs font-bold text-fg">{indicator.label}</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">{note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ClimateContract({ color }: { color: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
        <div className="font-mono text-5xl font-semibold tracking-[-0.06em]" style={{ color }}>n/d</div>
        <h3 className="mt-4 text-lg font-bold">Sin ranking prematuro</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Find todavía no dispone de un panel climático homogéneo para los seis países. Publicar un puntaje hoy confundiría ausencia de reporte con bajo riesgo.
        </p>
      </div>
      <div className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
        <div className="data-label" style={{ color }}>Data contract / siguiente corte</div>
        <h3 className="mt-2 text-base font-bold">Condiciones para activar el tablero</h3>
        <ol className="mt-4 space-y-3 text-xs leading-relaxed text-muted">
          {[
            "Una taxonomía regional común para exposición sectorial y finanzas verdes.",
            "Un denominador explícito por métrica: cartera total, entidades o emisores.",
            "Separación entre riesgo físico, riesgo de transición y flujo de financiamiento.",
            "Fuentes primarias o reportes verificables; sin estimaciones opacas para completar vacíos.",
          ].map((item, index) => (
            <li key={item} className="flex gap-3"><span className="font-mono" style={{ color }}>0{index + 1}</span><span>{item}</span></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CoverageMatrix({ items, color }: { items: CoverageItem[]; color: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-white/8">
      <div className="flex flex-col gap-2 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
        <div>
          <div className="data-label" style={{ color }}>Coverage matrix</div>
          <h3 className="mt-1 text-base font-bold">Qué responde hoy y qué falta medir</h3>
        </div>
        <span className="text-[10px] text-muted">La brecha es información, no un cero.</span>
      </div>
      <div className="grid gap-px bg-white/7 md:grid-cols-2">
        {items.map((item) => {
          const status = STATUS_COPY[item.state];
          return (
            <div key={item.label} className="flex items-start gap-3 bg-[#0a2926] p-4">
              <span className="mt-0.5 font-mono text-xs" style={{ color: status.color }}>{status.mark}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-fg">{item.label}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: status.color }}>{status.label}</span>
                </div>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">{item.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
