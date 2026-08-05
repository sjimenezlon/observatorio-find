import { NavBar } from "@/components/NavBar";
import PagosPanel from "@/components/PagosPanel";
import MapaLatam from "@/components/MapaLatam";
import Confianza from "@/components/Confianza";
import ConfianzaSegmentos from "@/components/ConfianzaSegmentos";
import { INDICADORES, PILARES, META } from "@/data/dataset";
import { LATAM } from "@/data/latam";
import { INDICADORES_ICF } from "@/data/confianza";

export const metadata = {
  title: "Pagos y confianza · Observatorio Find",
  description:
    "Pilar de pagos e Índice de Confianza Financiera (ICF) del Observatorio Find: intensidad de pago por adulto, pago a comercios, interoperabilidad transfronteriza y confianza revelada en 21 economías de América Latina y el Caribe. Fuentes primarias: Global Findex 2025, IMF FAS, BIS Red Book.",
};

const pagos = INDICADORES.filter((i) => i.pilar === "pagos");
const CORAL = "#E8825A";

export default function PagosPage() {
  return (
    <main>
      <NavBar />

      {/* ------------------------------------------------------------- HERO */}
      <header className="relative overflow-hidden border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <span
            className="mb-5 inline-block rounded-full border px-4 py-1.5 text-[13px] font-semibold"
            style={{ borderColor: `${CORAL}59`, background: `${CORAL}1a`, color: CORAL }}
          >
            Nuevo en {META.version} · pilar de Pagos + Índice de Confianza Financiera
          </span>

          <h1 className="max-w-[24ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Pagos y <span style={{ color: CORAL }}>confianza</span>: lo que la
            bancarización no mide
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-light text-fg/80">
            América Latina resolvió el pago doméstico —{" "}
            <b className="font-semibold text-fg">
              dos de los tres primeros puestos del mundo en pagos inmediatos por
              habitante son latinoamericanos
            </b>{" "}
            — y dejó intactos los dos problemas que siguen: el pago no llega al
            comercio y el riel no cruza la frontera. Detrás de ambos hay la misma
            variable que nadie mide bien: la confianza.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "5", l: "indicadores nuevos en el pilar de Pagos", d: "4 de fuente primaria o aritmética directa" },
              { k: "21", l: "economías en el panel LATAM", d: "Findex 2025 + FAS del FMI" },
              { k: String(INDICADORES_ICF.length), l: "indicadores del ICF", d: "4 dimensiones, 4 de ellos derivados" },
              { k: "0", l: "valores imputados", d: "el vacío se declara, no se rellena" },
            ].map((x) => (
              <div key={x.l} className="card p-4">
                <div className="tabnum text-3xl font-extrabold leading-none" style={{ color: CORAL }}>
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

      {/* --------------------------------------------- por qué un pilar nuevo */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
                La decisión metodológica
              </div>
              <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
                Por qué los pagos merecían un pilar propio
              </h2>
              <div className="space-y-3 text-[14px] leading-relaxed text-fg/80">
                <p>
                  Hasta la versión anterior, los pagos vivían escondidos dentro de
                  dos pilares: la madurez del riel instantáneo estaba en
                  &ldquo;fraude&rdquo; y el pago digital en &ldquo;inclusión&rdquo;.
                  Eso servía cuando la pregunta era{" "}
                  <i>cuánta gente está adentro del sistema</i>. Dejó de servir
                  cuando la pregunta pasó a ser{" "}
                  <b className="font-semibold text-fg">
                    cuánto se usa el sistema y para qué
                  </b>
                  .
                </p>
                <p>
                  El índice ahora tiene {PILARES.length} pilares y{" "}
                  {INDICADORES.length} indicadores. Pagos entró con cinco: cuatro
                  salen de fuente primaria o de aritmética explícita sobre fuente
                  primaria, y solo uno —interoperabilidad transfronteriza— es un
                  índice construido, porque no existe ninguna fuente que lo
                  publique.
                </p>
                <p>
                  El efecto sobre el ranking no fue cosmético:{" "}
                  <b className="font-semibold text-fg">
                    al incorporar pagos, Colombia pasó al último lugar de los seis
                  </b>{" "}
                  y Perú la superó. Un índice que no cambia cuando se le agrega
                  una dimensión relevante es un índice que no estaba midiendo.
                </p>
              </div>
            </div>

            <div className="card p-5">
              <div className="mb-4 text-sm font-bold">
                Los cinco indicadores del pilar
              </div>
              <div className="space-y-3">
                {pagos.map((i) => (
                  <div key={i.key} className="border-b border-white/6 pb-3 last:border-0 last:pb-0">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <span className="text-[13px] font-bold text-fg">{i.label}</span>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                        style={
                          i.construido
                            ? { background: "rgba(232,180,82,0.16)", color: "#E8B452" }
                            : { background: "rgba(31,201,160,0.14)", color: "#1FC9A0" }
                        }
                      >
                        {i.construido ? "construido" : "primaria"}
                      </span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-muted">{i.desc}</p>
                    <div className="mt-1 text-[10px] text-muted/80">
                      {i.fuente} · {i.anio} · unidad: {i.unidad} ·{" "}
                      {i.direccion === "higher" ? "más es mejor" : "menos es mejor"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PagosPanel />
      <Confianza />
      <ConfianzaSegmentos />
      <MapaLatam />

      {/* -------------------------------------------------------- Interledger */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan">
            Dónde se cruza con un estándar abierto de pagos
          </div>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">
            El hallazgo que ordena la agenda
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "El riel doméstico está resuelto; el cruce de frontera, no",
                d: "Brasil hace 502 pagos inmediatos por adulto al año y Argentina 237. Ninguno de los seis países tiene interoperabilidad transfronteriza nativa: la única oferta estructurada de la región es Pix Internacional, y la interconexión multilateral de rieles (Project Nexus del BIS) no tiene ningún participante latinoamericano.",
              },
              {
                t: "El costo de cruzar sigue por encima de la meta",
                d: "Las remesas son 8,4% del PIB promedio del panel y llegan a 30,1% en Honduras. Enviar US$200 cuesta 2,8% en promedio regional, pero 4,66% a Paraguay y 3,57% al Perú, contra la meta 10.c de los ODS de 3% a 2030. En Colombia las remesas ya son 2,87% del PIB y Bre-B nació sin conexión al exterior.",
              },
              {
                t: "La confianza es el cuello de botella, no la tecnología",
                d: "En Colombia, el 94% de quienes siguen pagando en efectivo lo hace por costumbre y solo el 2,7% por desconfianza en la tecnología. Pero 6 de cada 10 latinoamericanos que se endeudaron no usaron el sistema formal. El problema no es que la gente no confíe en el celular: es que no confía en la institución del otro lado.",
              },
            ].map((c) => (
              <div key={c.t} className="card p-5">
                <div className="mb-2 text-sm font-bold leading-snug text-cyan">{c.t}</div>
                <p className="text-[12px] leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/presentacion"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#06231f] transition"
              style={{ background: CORAL }}
            >
              Ver la presentación
            </a>
            <a
              href="/metodologia#pagos"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
            >
              Metodología del pilar y del ICF
            </a>
            <a
              href="/#datos"
              className="rounded-full border border-teal/40 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/10"
            >
              Descargar el dataset
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10 text-[11px] leading-relaxed text-muted">
        <p>
          {META.marca} · {META.institucion} · corte {META.curado} ({META.version}).
          Panel LATAM: {LATAM.length} economías. Fuentes primarias del módulo de
          pagos y confianza: World Bank Global Findex 2025 (datos 2024), IMF
          Financial Access Survey 2024, BIS CPMI Red Book 2024, World Bank
          Remittance Prices Worldwide, Edelman Trust Barometer 2026, GASA Global
          State of Scams 2025 y los reportes de sistemas de pago del Banco de la
          República, Banxico, BCB, BCRP, BCRA y BCCh. Los indicadores derivados
          son aritmética explícita sobre esas fuentes; los construidos se
          declaran como tales.
        </p>
      </footer>
    </main>
  );
}
