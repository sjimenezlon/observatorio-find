import type { Metadata } from "next";
import Jugadores from "@/components/cerebro/Jugadores";
import { JUGADORES } from "@/data/cerebro/jugadores";
import { NOMBRE_PAIS, NOMBRE_SEGMENTO, BANDERA, type PaisCerebro, type Segmento } from "@/data/cerebro/tipos";
import { Barra, Seccion, Tile } from "@/components/cerebro/ui";
import { usdM } from "@/lib/cerebro/formato";

function resumen() {
  const porPais = new Map<string, number>();
  const porSeg = new Map<string, number>();
  let valorados = 0;
  let valorTotal = 0;
  for (const j of JUGADORES) {
    porPais.set(j.pais, (porPais.get(j.pais) ?? 0) + 1);
    porSeg.set(j.segmento, (porSeg.get(j.segmento) ?? 0) + 1);
    if (j.valoracion_usd_m) {
      valorados++;
      valorTotal += j.valoracion_usd_m;
    }
  }
  const top = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return { porPais: top(porPais), porSeg: top(porSeg), valorados, valorTotal };
}

export const metadata: Metadata = { title: "Jugadores · Cerebro fintech LATAM · Observatorio Find", robots: { index: false, follow: false } };

export default function Pagina() {
  return (
    <>
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <span className="eyebrow text-teal">Cerebro · jugadores</span>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.05em]">Quién es quién en el fintech latinoamericano.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/72 md:text-[16px]">Empresas verificadas una por una: qué hacen, cuánto valen según la última cifra publicada, quién las financió y cuántos usuarios declaran. Lo que no se pudo verificar dice «s. d.».</p>
        </div>
      </header>
      {(() => {
        const r = resumen();
        const max = Math.max(...r.porPais.map((x) => x[1]), 1);
        const maxS = Math.max(...r.porSeg.map((x) => x[1]), 1);
        return (
          <Seccion id="resumen" numero="Panorama" titulo="El mapa en cifras">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Tile valor={String(JUGADORES.length)} etiqueta="jugadores verificados" tono="text-lime" />
              <Tile valor={String(JUGADORES.filter((j) => j.unicornio).length)} etiqueta="unicornios" />
              <Tile valor={String(JUGADORES.filter((j) => j.estado === "cotiza").length)} etiqueta="cotizan en bolsa" />
              <Tile valor={usdM(r.valorTotal)} etiqueta="valoración sumada" nota={`${r.valorados} con cifra publicada; capitalizaciones y rondas de fechas distintas, no es un total de mercado`} />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="card space-y-2 p-5">
                <div className="data-label text-muted">Por país</div>
                {r.porPais.map(([p, n]) => (
                  <Barra key={p} etiqueta={`${BANDERA[p as PaisCerebro]} ${NOMBRE_PAIS[p as PaisCerebro] ?? p}`} pct={n} ancho={max} valor={`${n}`} />
                ))}
              </div>
              <div className="card space-y-2 p-5">
                <div className="data-label text-muted">Por segmento</div>
                {r.porSeg.map(([s, n]) => (
                  <Barra key={s} etiqueta={NOMBRE_SEGMENTO[s as Segmento] ?? s} pct={n} ancho={maxS} valor={`${n}`} color="#78d8f5" />
                ))}
              </div>
            </div>
          </Seccion>
        );
      })()}
      <Seccion id="lista" numero="Directorio" titulo="Explorar" alterna>
        <Jugadores datos={JUGADORES} />
      </Seccion>
    </>
  );
}
