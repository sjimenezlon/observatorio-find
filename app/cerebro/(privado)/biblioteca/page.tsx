import type { Metadata } from "next";
import Biblioteca from "@/components/cerebro/Biblioteca";
import { BIBLIOTECA } from "@/data/cerebro/biblioteca";
import { Seccion } from "@/components/cerebro/ui";

export const metadata: Metadata = { title: "Biblioteca · Cerebro fintech LATAM · Observatorio Find", robots: { index: false, follow: false } };

export default function Pagina() {
  return (
    <>
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <span className="eyebrow text-teal">Cerebro · biblioteca</span>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.05em]">Todo lo que hay que leer, y dónde está.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/72 md:text-[16px]">Reportes y radares con su cifra principal, directorio de reguladores, gremios, hubs y medios, agenda de eventos, fuentes de datos automatizables y un glosario de la jerga de la región.</p>
        </div>
      </header>
      <Seccion id="biblioteca" numero="Biblioteca" titulo="Reportes, directorio, eventos, datos y glosario">
        <Biblioteca datos={BIBLIOTECA} />
      </Seccion>
    </>
  );
}
