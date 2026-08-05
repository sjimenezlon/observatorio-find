import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { META } from "@/data/dataset";

export const metadata: Metadata = {
  title: "Aliados · Interledger Foundation · Observatorio Find",
  description:
    "Por qué la Interledger Foundation es el aliado natural del Observatorio de IA Financiera LATAM: qué mide el observatorio sobre pagos y confianza, qué gana la Fundación y por dónde empezar.",
};

// -----------------------------------------------------------------------------
// Propuesta de alianza académica (jul-2026).
// Fuentes: interledger.org, verificadas el 10-jul-2026.
//
// Esta ruta está fuera de la navegación principal: se comparte por enlace
// directo. La presentación general del observatorio vive en /presentacion.
// -----------------------------------------------------------------------------

const ILF_TECNOLOGIA = [
  {
    nombre: "Interledger Protocol (ILP)",
    desc: "Estándar que enruta pagos entre ledgers y redes distintas en paquetes, como internet enruta información.",
    url: "https://interledger.org/interledger",
  },
  {
    nombre: "Open Payments",
    desc: "API estándar para que las aplicaciones interactúen con cuentas mediante wallet addresses — alias públicos tipo URL.",
    url: "https://interledger.org/open-payments",
  },
  {
    nombre: "Rafiki",
    desc: "Software open source (Apache 2.0) con el que una wallet, banco o cooperativa habilita Interledger en sus cuentas.",
    url: "https://rafiki.dev",
  },
  {
    nombre: "Web Monetization",
    desc: "Micropagos automáticos y pasivos de los visitantes de un sitio web a sus creadores.",
    url: "https://interledger.org/web-monetization",
  },
];

const HALLAZGOS = [
  {
    n: "01",
    t: "El riel doméstico está resuelto; el cruce de frontera, no",
    d: "Brasil hace 502 pagos inmediatos por adulto al año y Argentina 237 — dos de los tres primeros puestos del mundo en pagos inmediatos por habitante son latinoamericanos (BIS). Ninguno de los seis países tiene interoperabilidad transfronteriza nativa, y Project Nexus del BIS no tiene ningún participante latinoamericano.",
  },
  {
    n: "02",
    t: "Colombia es el vacío más grande frente al tamaño de su diáspora",
    d: "Las remesas ya son 2,87% del PIB colombiano y Bre-B nació sin conexión al exterior: el propio Banco de la República la señala como pendiente. Es el punto exacto donde un estándar abierto de pagos cambia el resultado — y el país donde la Fundación aún no tiene grantee.",
  },
  {
    n: "03",
    t: "El freno del pago digital no es el miedo a la tecnología",
    d: "En Colombia, el 94% de quienes siguen pagando en efectivo lo hace por costumbre y solo el 2,7% por desconfianza en pagar con tarjeta o celular. La desconfianza no está en el riel: está en la institución del otro lado. Seis de cada diez latinoamericanos que se endeudaron no usaron el sistema formal.",
  },
  {
    n: "04",
    t: "La confianza medible pone a Colombia de último",
    d: "El ICF ordena 16 economías con datos comparables y Colombia queda 16ª, con regulación de finanzas abiertas entre las más ambiciosas de la región. Madurez y confianza no son lo mismo — y hasta ahora nadie publicaba la segunda con fuentes primarias.",
  },
];

const GANA_ILF = [
  {
    titulo: "Evidencia para focalizar sus grants en LATAM",
    texto:
      "Tras su mayor apuesta regional (Summit + Hackathon en Ciudad de México, nov-2025) y con la ventana de Digital Financial Services 2026 por abrir, el observatorio le dice a la Fundación dónde un dólar de grant mueve más la aguja: qué país, qué riel, qué brecha.",
  },
  {
    titulo: "La interoperabilidad, por fin medida",
    texto:
      "Su tesis es que el valor debe fluir tan fácil como la información. El observatorio convierte esa narrativa en dato citable: PIX vs. Bre-B vs. SPEI/DiMo vs. Yape/Plin vs. Transferencias 3.0, con la misma vara y cada trimestre.",
  },
  {
    titulo: "Un ancla académica hispanohablante",
    texto:
      "Su socio académico de política pública en LATAM es lusófono (FGV, Brasil) y Colombia es un vacío visible en su portafolio de grantees. EAFIT llena el hueco hispano con capacidad de investigación instalada y un observatorio ya operando.",
  },
  {
    titulo: "Datos para abogar ante los reguladores andinos",
    texto:
      "Sus Public Policy Activation Grants financian investigación y diálogo estructurado con reguladores, pero exigen conocimiento local del paisaje normativo. El observatorio lo aporta llave en mano: URF y Banco de la República en Colombia, CNBV en México, SBS en Perú.",
  },
  {
    titulo: "El termómetro de la capa de IA sobre los rieles",
    texto:
      "La Fundación mide rieles de pago; el observatorio mide la IA que se monta sobre ellos — scoring, agentes de pago, prevención de fraude — y cómo amplía o cierra la exclusión del ~70% de población sub-bancarizada que ellos mismos citan para la región.",
  },
  {
    titulo: "Pipeline de talento y casos de uso",
    texto:
      "Semilleros, cursos y hackathones-satélite en EAFIT sobre Open Payments con datos reales del observatorio: estudiantes, prototipos y visibilidad universitaria en el país andino donde la Fundación aún no tiene grantee.",
  },
];

const RUTAS = [
  {
    cuando: "Ahora (hasta 31-jul-2026)",
    que: "Interledger on Campus: mini-grants de hasta US$5.000 para clubes estudiantiles — un semillero EAFIT sobre Open Payments con datos del observatorio.",
    url: "https://interledger.org/grant/education/on-campus",
  },
  {
    cuando: "Q3-2026 (reapertura esperada)",
    que: "Call for Papers: US$5.000 por paper sobre interoperabilidad, inclusión y marcos regulatorios — la evidencia del observatorio como base empírica.",
    url: "https://interledger.org/grant/call-for-papers",
  },
  {
    cuando: "2026 (por anunciar)",
    que: "NextGen Higher Education: hasta US$50.000 para instituciones de educación superior; y la ventana 2026 de Digital Financial Services (hasta US$250.000).",
    url: "https://interledger.org/grant/education/nextgen",
  },
  {
    cuando: "Vía policy@interledger.org",
    que: "Public Policy Activation: evidencia del observatorio en submissions formales ante URF, SFC y pares andinos por estándares abiertos e interoperables.",
    url: "https://interledger.org/grant/public-policy-activation",
  },
  {
    cuando: "Summit 2026 (sede sin anunciar)",
    que: "Proponer a Medellín como sede o escala del Interledger Summit 2026: la alianza le da a la Fundación un anfitrión académico y un caso regional (Bre-B) en pleno despegue.",
    url: "https://interledger.org/summit",
  },
];

export default function Aliados() {
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <span className="mb-5 inline-block rounded-full border border-lime/35 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
            Propuesta de alianza · {META.marca} · {META.institucion}
          </span>
          <h1 className="max-w-[26ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Ellos construyen los rieles abiertos.{" "}
            <span className="text-teal">
              Nosotros medimos si la región los está usando.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-fg/80">
            El Observatorio Find ya mide pagos y confianza con fuentes primarias
            y aritmética publicada. Esta página explica por qué la{" "}
            <b className="font-semibold text-fg">Interledger Foundation</b> es el
            aliado natural de ese trabajo — un aliado que financia y usa un bien
            público, no un cliente que lo compra.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#aliado"
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
            >
              Ver la alianza propuesta
            </a>
            <a
              href="/presentacion"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
            >
              ¿Qué es el observatorio? →
            </a>
          </div>
        </div>
      </header>

      {/* LO QUE YA ESTÁ MEDIDO */}
      <section id="pagos-ilf" className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div
            className="mb-1 text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: "#E8825A" }}
          >
            Construido sobre el foco de la Fundación
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Pagos y confianza, ya medidos
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            La Fundación pone el foco en la confianza y en el mundo de los pagos.
            El observatorio los incorporó al índice como{" "}
            <b className="text-fg">pilar propio</b> y como{" "}
            <b className="text-fg">índice complementario</b>, con fuentes
            primarias y la aritmética publicada. Cuatro hallazgos ordenan la
            agenda:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {HALLAZGOS.map((c) => (
              <div key={c.n} className="card p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span
                    className="tabnum text-lg font-extrabold leading-none"
                    style={{ color: "#E8825A" }}
                  >
                    {c.n}
                  </span>
                  <h3 className="text-[15px] font-bold leading-snug text-fg">
                    {c.t}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-muted">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="card mt-5 p-5">
            <h3 className="mb-2 text-sm font-bold text-teal">
              Y lo que todavía no se puede medir — la propuesta de trabajo
            </h3>
            <p className="text-[13px] leading-relaxed text-muted">
              No existe un dato mundial comparable de transacciones por persona
              (el Red Book del BIS cubre 26 jurisdicciones; de la región, tres).
              La única serie de desconfianza con cobertura casi mundial solo se le
              pregunta a quien no tiene cuenta. El fraude se mide con encuestas de
              industria de metodología propietaria. Y la interoperabilidad
              transfronteriza no tiene indicador en ningún organismo. El
              observatorio ya construyó un primer intento de los cuatro y publica
              cómo: eso es exactamente lo que un grant de investigación puede
              volver estándar.{" "}
              <a href="/pagos" className="text-teal underline">
                Ver el módulo completo →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ALIADO */}
      <section id="aliado" className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-lime">
            El aliado — no un cliente
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Interledger Foundation: la misma misión, desde el otro extremo del
            riel
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            La Interledger Foundation es una fundación sin ánimo de lucro cuya
            visión es la <i>Internet of Opportunity</i>: un mundo donde{" "}
            <b className="text-fg">
              enviar un pago sea tan fácil como enviar un correo
            </b>
            . Entre 2020 y 2025 invirtió más de{" "}
            <b className="text-fg">US$21 millones en 271 proyectos de 42 países</b>{" "}
            para que nadie quede por fuera de la economía digital. Ellos
            construyen y financian los rieles abiertos; el observatorio mide si
            la región los está aprovechando. Por eso la relación correcta no es
            proveedor-cliente sino co-creación de evidencia: un aliado que
            financia y usa el bien público, no que lo compra.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ILF_TECNOLOGIA.map((t) => (
              <a
                key={t.nombre}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block p-5 transition hover:border-teal/40"
              >
                <div className="text-sm font-bold text-teal">{t.nombre}</div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                  {t.desc}
                </p>
              </a>
            ))}
          </div>

          <h3 className="mt-12 mb-6 text-xl font-extrabold tracking-tight">
            ¿Qué ganaría Interledger con el Observatorio?
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GANA_ILF.map((g, i) => (
              <div key={g.titulo} className="card p-6">
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold"
                  style={{ background: "rgba(159,206,46,0.15)", color: "#9FCE2E" }}
                >
                  {i + 1}
                </div>
                <h4 className="font-bold text-fg">{g.titulo}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {g.texto}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-muted">
            ¿Y qué gana el Observatorio? Sostenibilidad para la investigación
            (fellowships y papers financiados), una red global de práctica en
            pagos abiertos, y el foco que más le falta a la conversación
            regional: la interoperabilidad como métrica, no como eslogan.
          </p>
        </div>
      </section>

      {/* RUTAS CONCRETAS */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            De la idea al primer paso
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Cinco rutas concretas para activar la alianza
          </h2>
          <div className="space-y-4">
            {RUTAS.map((r) => (
              <a
                key={r.que}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card grid gap-2 p-5 transition hover:border-teal/40 md:grid-cols-[220px_1fr] md:items-baseline"
              >
                <span className="text-sm font-bold text-lime">{r.cuando}</span>
                <span className="text-[14px] leading-relaxed text-fg/85">
                  {r.que}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-muted">
            Programas y fechas verificados en interledger.org al 10 de julio de
            2026; los montos y ventanas pueden cambiar con cada convocatoria.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div
            className="card p-8 text-center md:p-10"
            style={{
              background:
                "linear-gradient(120deg, rgba(31,201,160,0.12), rgba(108,92,214,0.10))",
            }}
          >
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              La evidencia ya está publicada. Falta recorrerla juntos.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] text-fg/80">
              El observatorio es un bien público en operación: índice, mapa,
              simulador y evidencia trazable, curados a {META.curado}. La alianza
              con Interledger lo convertiría, además, en el instrumento de
              medición de la interoperabilidad financiera de América Latina.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
              >
                Explorar el observatorio
              </a>
              <a
                href="/#datos"
                className="rounded-full border border-teal/50 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                Explorar los indicadores
              </a>
              <a
                href="https://interledger.org/es"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
              >
                Conocer a Interledger →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-lg font-extrabold tracking-tight text-fg">
              fin<span className="text-lime">d</span>
            </span>
            <a href="/metodologia" className="text-teal hover:underline">
              Metodología completa →
            </a>
          </div>
          <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-muted/80">
            {META.marca} · {META.institucion}. Los datos de la Interledger
            Foundation provienen de interledger.org y fuentes citadas
            (verificados el 10-jul-2026). Esta página es una propuesta de
            alianza académica, no un documento comercial ni una comunicación
            oficial de la Fundación.
          </p>
        </div>
      </footer>
    </main>
  );
}
