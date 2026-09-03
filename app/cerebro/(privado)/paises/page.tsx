import type { Metadata } from "next";
import Paises from "@/components/cerebro/Paises";
import Hitos from "@/components/cerebro/Hitos";
import { PAISES_CEREBRO, HITOS } from "@/data/cerebro/paises";
import { Seccion } from "@/components/cerebro/ui";

export const metadata: Metadata = { title: "Países · Cerebro fintech LATAM · Observatorio Find", robots: { index: false, follow: false } };

export default function Pagina() {
  return (
    <>
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <span className="eyebrow text-teal">Cerebro · países</span>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.05em]">El marco de cada país, lado a lado.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/72 md:text-[16px]">Cuántas fintechs hay, qué ley las rige, si hay sandbox y open finance, qué riel inmediato opera, cómo se tratan los criptoactivos y quién lidera el mercado. Debajo, la línea de tiempo regulatoria de 2025 y 2026.</p>
        </div>
      </header>
      <Seccion id="panel" numero="Panel" titulo="Ficha por país">
        <Paises datos={PAISES_CEREBRO} />
      </Seccion>
      <Seccion id="hitos" numero="Línea de tiempo" titulo="Lo que cambió desde enero de 2025" bajada="Leyes, decretos, rieles, licencias, open finance y cripto. Cada hito enlaza a su fuente." alterna>
        <Hitos datos={HITOS} />
      </Seccion>
    </>
  );
}
