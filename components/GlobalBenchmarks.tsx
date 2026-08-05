import { REFERENTES_GLOBALES } from "@/data/referentes";

export default function GlobalBenchmarks() {
  return (
    <section id="referentes" className="border-b border-white/8 bg-white/[0.018]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="eyebrow text-lime">Benchmark de producto</div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
              Cómo se mide la frontera financiera en el mundo
            </h2>
          </div>
          <p className="max-w-2xl text-[14px] leading-relaxed text-muted lg:justify-self-end">
            Find toma tres prácticas de los referentes globales: declarar la
            cobertura, separar evidencia de interpretación y dejar que el lector
            explore el ranking. Su aporte diferencial es reunir esas prácticas en
            una medición pública enfocada en América Latina.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {REFERENTES_GLOBALES.map((r, i) => (
            <article key={r.sigla} className="reference-card group">
              <div className="flex items-center justify-between gap-4">
                <span className="data-label" style={{ color: r.color }}>
                  {String(i + 1).padStart(2, "0")} / {r.sigla}
                </span>
                <span className="font-mono text-[10px] text-muted">{r.anio}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-fg">
                {r.nombre}
              </h3>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-fg/65">
                {r.alcance}
              </p>
              <div className="my-5 h-px bg-white/8" />
              <p className="text-[13px] leading-relaxed text-fg/80">
                {r.arquitectura}
              </p>
              <div className="mt-5 rounded-xl border border-white/8 bg-black/10 p-3.5">
                <div className="data-label text-muted">Patrón aplicado en Find</div>
                <p className="mt-2 text-[12px] leading-relaxed text-fg/75">
                  {r.patron}
                </p>
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-teal transition group-hover:gap-3"
              >
                Consultar referente <span aria-hidden="true">↗</span>
              </a>
              <span className="sr-only">{r.fuente}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
