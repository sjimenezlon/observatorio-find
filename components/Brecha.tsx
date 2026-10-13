"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";
import { BENCHMARKS } from "@/data/dataset";

export default function Brecha() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {BENCHMARKS.map((b) => {
        const data = [
          { name: "LatAm", v: b.latam, fill: "#12866B" },
          ...(b.mundo !== null
            ? [{ name: "Mundo", v: b.mundo, fill: "#5E7F12" }]
            : []),
          ...(b.altos !== null
            ? [{ name: "Altos ingresos", v: b.altos, fill: "#1A8597" }]
            : []),
        ];
        return (
          <div key={b.key} className="card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-bold text-fg">{b.label}</h3>
              <span className="text-xs text-muted">{b.unidad}</span>
            </div>

            <div className="mt-3 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ left: 4, right: 40, top: 2, bottom: 2 }}
                >
                  <XAxis type="number" hide domain={[0, "dataMax"]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={92}
                    tick={{ fill: "#0B0B12", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(11,11,18,0.04)" }}
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid rgba(11,11,18,0.12)",
                      borderRadius: 12,
                      color: "#0B0B12",
                    }}
                    formatter={(v) => [`${v} ${b.unidad}`, ""]}
                  />
                  <Bar dataKey="v" radius={[0, 7, 7, 0]} barSize={22}>
                    {data.map((d) => (
                      <Cell key={d.name} fill={d.fill} />
                    ))}
                    <LabelList
                      dataKey="v"
                      position="right"
                      fill="#0B0B12"
                      fontSize={12}
                      fontWeight={700}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              {b.lectura}
            </p>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[11px] text-muted/80 hover:text-teal hover:underline"
            >
              {b.fuente} · {b.anio}
            </a>
          </div>
        );
      })}
    </div>
  );
}
