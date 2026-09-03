import type { Metadata } from "next";
import Inversion from "@/components/cerebro/Inversion";
import { INVERSION } from "@/data/cerebro/inversion";
import { Seccion } from "@/components/cerebro/ui";

export const metadata: Metadata = { title: "Inversión · Cerebro fintech LATAM · Observatorio Find", robots: { index: false, follow: false } };

export default function Pagina() {
  return (
    <>
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <span className="eyebrow text-teal">Cerebro · inversión</span>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.05em]">Dónde está poniendo la plata el capital de riesgo.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/72 md:text-[16px]">Serie anual del capital de riesgo regional y su porción fintech, la foto por país, las rondas más grandes de 2025 y 2026, las salidas y los fondos más activos. Cuando dos fuentes se contradicen, aparecen las dos.</p>
        </div>
      </header>
      {INVERSION.anclas.length ? (
        <section className="border-b border-white/8">
          <div className="mx-auto grid max-w-6xl gap-3 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {INVERSION.anclas.map((a) => (
              <a key={a.texto} href={a.url} target="_blank" rel="noreferrer" className="card block p-4 transition hover:border-lime/50">
                <div className="tabnum text-2xl font-extrabold tracking-[-0.04em] text-lime">{a.cifra}</div>
                <div className="mt-1 text-xs leading-snug text-fg/85">{a.texto}</div>
                <div className="mt-2 text-[10px] text-muted">{a.fuente} · {a.anio} ↗</div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
      <Seccion id="datos" numero="Capital" titulo="Serie, países, rondas, salidas y fondos">
        <Inversion datos={INVERSION} />
      </Seccion>
    </>
  );
}
