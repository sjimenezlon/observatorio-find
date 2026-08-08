import { NavBar } from "@/components/NavBar";
import RadarRegulatorio from "@/components/RadarRegulatorio";
import Prospectiva from "@/components/Prospectiva";
import TendenciasMapa from "@/components/TendenciasMapa";
import BrechasColombia from "@/components/BrechasColombia";
import { MEDIDAS, HITOS, TENDENCIAS } from "@/data/frontera";
import { META } from "@/data/dataset";

export const metadata = {
  title: "La frontera · Observatorio Find",
  description:
    "Mapa de cambios regulatorios 2025–2026, hoja de ruta prospectiva 2026–2030, 36 tendencias fintech y las brechas de Colombia hoy frente a 2030. El contexto global que enmarca el índice del Observatorio Find.",
};

const CORAL = "#E8825A";

const conteo = (k: string) => MEDIDAS.filter((m) => m.estatus === k).length;
const pagos = MEDIDAS.filter((m) => m.categorias.includes("Pagos y cuentas")).length;
const latam = MEDIDAS.filter((m) =>
  ["México", "Brasil"].includes(m.jurisdiccion)
).length;

export default function FronteraPage() {
  return (
    <main>
      <NavBar />

      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <span
            className="mb-5 inline-block rounded-full border px-4 py-1.5 text-[13px] font-semibold"
            style={{ borderColor: "rgba(91,208,224,0.45)", background: "rgba(91,208,224,0.12)", color: "#5BD0E0" }}
          >
            Contexto · mapas de trabajo integrados al observatorio
          </span>

          <h1 className="max-w-[22ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            La frontera: lo que ya está{" "}
            <span style={{ color: "#5BD0E0" }}>decidido afuera</span>
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-light text-fg/80">
            El índice mide dónde está América Latina. Esta página muestra qué se
            está decidiendo en el resto del mundo y con qué grado de certeza —
            porque la regla que hoy entra en vigor en Bruselas o Washington llega
            a la región como estándar de facto tres o cinco años después, ya
            escrita por otros.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: String(MEDIDAS.length), l: "medidas regulatorias mapeadas", d: `${conteo("Vigente")} vigentes · ${conteo("En curso")} en curso · ${conteo("Revertido")} revertidas` },
              { k: String(pagos), l: "de ellas tocan pagos y cuentas", d: "la categoría más densa junto con cripto" },
              { k: String(HITOS.length), l: "hitos con horizonte a 2030", d: "cada uno declara su grado de certeza" },
              { k: String(latam), l: "medidas latinoamericanas de 32", d: "5 de México y 1 de Brasil; ninguna colombiana" },
            ].map((x) => (
              <div key={x.l} className="card p-4">
                <div className="tabnum text-3xl font-extrabold leading-none" style={{ color: "#5BD0E0" }}>
                  {x.k}
                </div>
                <div className="mt-1.5 text-[13px] font-semibold leading-snug text-fg">
                  {x.l}
                </div>
                <div className="mt-0.5 text-[11px] text-muted">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* cómo leer */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Hecho ≠ lectura",
                d: "Cada medida separa el cambio regulatorio —verificable, con fuente oficial o de alto rigor— de su lectura de impacto sobre el bienestar financiero, que es interpretación del analista y no del regulador.",
              },
              {
                t: "Fecha ≠ expectativa",
                d: "Cada hito prospectivo declara si su fecha está fijada por el regulador, si es una iniciativa en discusión o si es una tendencia proyectada. Confundirlas es el error más común de este tipo de mapas.",
              },
              {
                t: "Posición ≠ medición",
                d: "En el mapa de tendencias, la ubicación de cada punto es interpretación del autor a partir de las fuentes citadas. Las proyecciones a 2030 son estimaciones de sus autores y difieren entre sí — McKinsey y BCG discrepan en un orden de magnitud sobre tokenización.",
              },
            ].map((c) => (
              <div key={c.t} className="card p-5">
                <div className="mb-2 text-sm font-bold text-cyan">{c.t}</div>
                <p className="text-[12px] leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RadarRegulatorio />
      <Prospectiva />
      <TendenciasMapa />
      <BrechasColombia />

      {/* cierre */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">
            Por qué esta página está dentro del observatorio y no aparte
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <p className="text-[14px] leading-relaxed text-fg/80">
              Un índice sin contexto se lee como un ranking deportivo. Estos tres
              mapas hacen el trabajo contrario: muestran que la posición de cada
              país en el IIIF no es mérito ni culpa, sino el resultado de
              decisiones regulatorias tomadas —o no tomadas— en ventanas de
              tiempo concretas, muchas de ellas fuera de la región.
            </p>
            <p className="text-[14px] leading-relaxed text-fg/80">
              De las {MEDIDAS.length} medidas mapeadas, {pagos} tocan pagos y
              cuentas y solo {latam} son latinoamericanas. América Latina lidera
              el mundo en pagos inmediatos por habitante y no está escribiendo
              casi ninguna de las reglas que van a gobernarlos. Esa asimetría —
              adopción sin autoría normativa — es el argumento de fondo del
              observatorio.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/pagos"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#06231f] transition"
              style={{ background: CORAL }}
            >
              Ver pagos y confianza
            </a>
            <a
              href="/#indice"
              className="rounded-full border border-teal/40 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/10"
            >
              Volver al índice
            </a>
            <a
              href="/agenda"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
            >
              Agenda de medición
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-[11px] leading-relaxed text-muted">
        <p>
          {META.marca} · {META.institucion}. Los tres mapas de esta página
          (cambios regulatorios, hoja de ruta prospectiva y tendencias fintech)
          son mapas de trabajo con corte al 24 de julio de 2026, integrados sin
          alterar su contenido; {MEDIDAS.length} medidas, {HITOS.length} hitos y{" "}
          {TENDENCIAS.length} tendencias con su fuente individual. El mapa de
          brechas de Colombia se ajustó en dos puntos para no contradecir lo que
          este observatorio verificó en su corte de julio de 2026 — el archivo
          del PL 510/2025 y la cifra vigente de Bre-B —, y ambos ajustes están
          anotados en el archivo de datos.
        </p>
      </footer>
    </main>
  );
}
