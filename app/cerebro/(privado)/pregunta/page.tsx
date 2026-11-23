import type { Metadata } from "next";
import Pregunta from "@/components/cerebro/Pregunta";

export const metadata: Metadata = {
  title: "Pregúntale a Findy · Observatorio Find",
  robots: { index: false, follow: false },
};

export default function Pagina() {
  return (
    <>
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <span className="eyebrow text-teal">Cerebro · @findy</span>
          <h1 className="mt-4 max-w-[18ch] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.05em]">
            Pregúntale a Findy lo que no te atreves a preguntarle al banco.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/72 md:text-[16px]">
            Escríbele como le escribirías a una cuenta en redes. Findy consulta el precio real, hace la cuenta a la vista y te la explica sin jerga, con los datos del Observatorio cuando vienen al caso.
          </p>
        </div>
      </header>
      <section className="px-6 py-8 md:py-10">
        <Pregunta />
      </section>
    </>
  );
}
