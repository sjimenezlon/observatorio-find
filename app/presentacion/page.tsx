import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import {
  META,
  PAISES,
  PILARES,
  INDICADORES,
  FUENTES,
} from "@/data/dataset";
import { calcularIndice, banda } from "@/lib/index";
import { INDICADORES_ICF, DIMENSIONES } from "@/data/confianza";
import { calcularICF } from "@/lib/confianza";
import { calcularICFS } from "@/lib/segmentos";
import { LATAM } from "@/data/latam";
import { ACTORES } from "@/data/lentes";
import { AGENDA, FOCOS } from "@/data/agenda";

export const metadata: Metadata = {
  title: "Qué hace el Observatorio · Observatorio Find",
  description:
    "Qué mide el Observatorio de IA Financiera LATAM, cómo lo construye, qué encuentra y qué no pretende medir. Tres índices propios sobre fuentes primarias, con metodología abierta y correcciones publicadas.",
};

// -----------------------------------------------------------------------------
// Presentación del observatorio.
//
// Las cifras de esta página se derivan del dataset en tiempo de build, no se
// escriben a mano: si cambia el corte, la presentación cambia con él. Lo único
// redactado son las lecturas — y cada una remite a la ruta donde está el dato.
// -----------------------------------------------------------------------------

const ranking = calcularIndice();
const icf = calcularICF().filter((f) => f.medible);
const icfs = calcularICFS();

const lider = ranking[0];
const ultimo = ranking[ranking.length - 1];
const nombrePais = (code: string) =>
  PAISES.find((p) => p.code === code)?.nombre ?? code;
/** Coma decimal, como el resto del sitio. */
const cifra = (n: number, dec = 1) => n.toFixed(dec).replace(".", ",");

const colombia = ranking.find((f) => f.code === "CO");
const puestoColombia = ranking.findIndex((f) => f.code === "CO") + 1;
const puestoColombiaICF = icf.findIndex((f) => f.cc === "COL") + 1;

const nConstruidos = INDICADORES.filter((i) => i.construido).length;
const nDerivados = INDICADORES.filter((i) => i.derivado).length;
const nMedidos = INDICADORES.length - nConstruidos - nDerivados;

const agendaPorEstado = (estado: string) =>
  AGENDA.filter((a) => a.estado === estado).length;

// --- Contenido redactado -----------------------------------------------------

const VACIO = [
  {
    icono: "🧭",
    titulo: "Nadie produce la métrica neutral",
    texto:
      "Las consultoras venden reportes, los gremios abogan por sus miembros y los proveedores inflan sus casos. No existía una medición independiente, citable y reproducible de las finanzas emergentes en América Latina. Ese vacío es la razón de ser del observatorio.",
  },
  {
    icono: "⚖️",
    titulo: "La política pública se decide sin evidencia comparable",
    texto:
      "Solo en 2026: Colombia volvió obligatorias las finanzas abiertas (Decreto 0368), Brasil puso en vigor su marco VASP (Resoluções 519–521), Argentina amplió la tokenización (RG 1150) y Chile completó sus reglas técnicas (NCG 569). Quien regula —y quien invierte— necesita ver los seis tableros con la misma vara.",
  },
  {
    icono: "🔬",
    titulo: "Sin método abierto no hay forma de estar en desacuerdo",
    texto:
      "Un ranking que no publica cómo se calcula solo se puede creer o ignorar. Aquí el índice se recalcula con un archivo editable, los pesos se mueven en pantalla y el dataset se descarga entero. Se puede replicar y se puede refutar: esa es la diferencia entre opinión y evidencia.",
  },
  {
    icono: "📈",
    titulo: "Una foto no dice nada; la serie sí",
    texto:
      "El observatorio publica cortes con la misma metodología. Entre junio y julio de 2026 Colombia subió 1,5 puntos por Bre-B y las finanzas abiertas obligatorias, mientras el archivo del proyecto de ley cripto la frenó. El movimiento es la noticia, no el puesto.",
  },
  {
    icono: "🎓",
    titulo: "Independencia académica",
    texto:
      "Nace en la Universidad EAFIT sin patrocinio de ningún actor medido. La credibilidad —el activo que ni bancos, ni fintechs, ni proveedores pueden comprar— es lo que lo vuelve una referencia común para todos ellos.",
  },
];

const METODO = [
  {
    n: "01",
    t: "Fuente primaria o nada",
    d: "Cada cifra sale de la API del Banco Mundial, del PDF oficial del emisor o del portal del banco central. La prensa sirve para saber dónde buscar, nunca para citar. La auditoría de julio dejó por qué: un «+24% según KPMG» citado por medios era un −8,9% en el informe original.",
  },
  {
    n: "02",
    t: "Se declara qué es dato y qué es construcción",
    d: `De los ${INDICADORES.length} indicadores, ${nMedidos} son mediciones de terceros que se citan, ${nDerivados} son aritmética del Observatorio sobre cifras publicadas —con la operación escrita— y ${nConstruidos} son índices cualitativos con rúbrica propia. La marca va en el dato, no en una nota al pie.`,
  },
  {
    n: "03",
    t: "Normalización relativa al panel, declarada como tal",
    d: "Cada indicador se lleva a 0–100 por min–max entre los países medidos, invirtiendo la escala cuando menos es mejor. Un puntaje no es una nota absoluta: dice dónde queda ese país frente a los otros de este corte. Cambiar el panel cambia los números, y por eso el panel se publica.",
  },
  {
    n: "04",
    t: "Los pesos son del lector, no del autor",
    d: `Los ${PILARES.length} pilares pesan igual por defecto porque ninguna teoría justifica otra cosa. Pero el peso se mueve con sliders y hay ${ACTORES.length} lentes por tipo de actor: si el orden se cae al cambiar la ponderación, eso también es un hallazgo.`,
  },
  {
    n: "05",
    t: "El dato ausente se declara, no se rellena",
    d: "Cuando un país no fue encuestado en un módulo, el valor es nulo y se omite del promedio de su pilar; no se imputa. En el ICF hay además una regla dura: con menos de la mitad de los indicadores, la economía no entra al ranking. Chile y Uruguay quedan fuera por eso.",
  },
  {
    n: "06",
    t: "Corregir a la vista es parte del método",
    d: "Toda cifra que corrige una ya publicada queda en la auditoría con fecha, valor anterior, valor nuevo y razón. Tres correcciones en julio de 2026: Bre-B se estaba anualizando sobre el pico de un solo día, PIX cambió de base, y el costo de remesas usaba el índice de los servicios más baratos en vez del promedio.",
  },
];

const HALLAZGOS = [
  {
    color: "#E8825A",
    kicker: "Madurez ≠ confianza",
    t: "Colombia construyó el riel y no logró que se use",
    d: `Queda ${puestoColombia}ª de ${PAISES.length} en el IMIAF y ${puestoColombiaICF}ª de ${icf.length} en el ICF, con una de las regulaciones de finanzas abiertas más ambiciosas de la región. Tener infraestructura y marco normativo no produce confianza por sí solo.`,
    href: "/pagos#confianza",
    cta: "Ver el ICF",
  },
  {
    color: "#1FC9A0",
    kicker: "El freno no es el miedo",
    t: "La desconfianza casi no se declara: se revela en el uso",
    d: "Solo el 2,7% de los colombianos que pagan en efectivo dice desconfiar de pagar con tarjeta o celular; el 94% lo hace por costumbre. El freno está en el hábito y en la aceptación del comercio. Por eso el ICF pesa más lo revelado que lo declarado.",
    href: "/pagos",
    cta: "Ver el pilar de pagos",
  },
  {
    color: "#6C5CD6",
    kicker: "Crédito",
    t: "Seis de cada diez créditos de la región son informales",
    d: "En 21 economías, apenas el 38,8% de quienes se endeudaron usó el sistema formal; el resto fue a la familia, al prestamista o al gota a gota. Colombia tiene la peor formalidad del panel: 26,8%. Abrir cuentas no resuelve esto.",
    href: "/pagos",
    cta: "Ver el panel LATAM",
  },
  {
    color: "#9FCE2E",
    kicker: "Segmentos",
    t: "El problema de confianza colombiano tiene género, ingreso y territorio",
    d: `Sobre ${icfs.length} observaciones país×segmento, Colombia es el único país del panel con las tres brechas por encima de 19 puntos a la vez: género +19,0 · ingreso +21,8 · territorio +22,7. Su 60% más rico está en el promedio regional; su población rural, por debajo de casi cualquier segmento de cualquier otro país.`,
    href: "/pagos#segmentos",
    cta: "Ver el ICF-S",
  },
  {
    color: "#5BD0E0",
    kicker: "Regulación",
    t: "La región adopta como nadie y no escribe casi ninguna regla",
    d: "De las 32 medidas regulatorias que están definiendo el futuro de estos rieles, ninguna es colombiana y solo una es brasileña. América Latina lidera el mundo en pagos inmediatos por habitante y no tiene autoría sobre las normas que van a gobernarlos.",
    href: "/frontera",
    cta: "Ver el radar regulatorio",
  },
  {
    color: "#B79CED",
    kicker: "Inclusión de papel",
    t: "96,3% con producto financiero frente a 57,1% que dice tener cuenta",
    d: "39 puntos de diferencia entre los registros de la Superintendencia y lo que la gente declara en la encuesta del Findex. No es que una fuente esté equivocada: la brecha es el hallazgo. Hay cuentas abiertas que su titular no reconoce como suyas.",
    href: "/frontera#colombia",
    cta: "Ver las brechas de Colombia",
  },
];

const LIMITES = [
  {
    t: "No califica instituciones ni productos",
    d: "Mide países. No hay ranking de bancos, ni de fintechs, ni de aplicaciones. Ningún actor medido puede aparecer premiado o castigado por nombre.",
  },
  {
    t: "No es una escala absoluta",
    d: "Un 85 no significa «maduro» en abstracto: significa que ese país está arriba entre los seis medidos en este corte. Cambiar el panel cambia todos los puntajes.",
  },
  {
    t: "No predice",
    d: "No hay proyecciones ni pronósticos. La sección de prospectiva recoge hitos anunciados por terceros, con su grado de certeza declarado, y los marca como tales.",
  },
  {
    t: "No mide lo que no tiene fuente comparable",
    d: `Finanzas sostenibles y conducta son focos del Centro sin datos comparables entre los seis países. Aparecen en la agenda como vacíos, no rellenados con estimaciones: ${agendaPorEstado("por-construir")} de los ${AGENDA.length} indicadores están por construir.`,
  },
  {
    t: "No sustituye al dato oficial",
    d: "Compila y cita; no relicencia. Cada cifra trae su URL para que quien la use vaya a la fuente. Los datos de terceros conservan las condiciones de su emisor.",
  },
  {
    t: "No se declara infalible",
    d: "Ha corregido cifras propias en público y las dejó anotadas con fecha y razón. Un observatorio que nunca se corrige no es más preciso: es menos transparente.",
  },
];

const RUTAS_SITIO = [
  { href: "/", t: "Inicio", d: "Ranking con pesos ajustables, mapa por capa, fichas y duelos país contra país." },
  { href: "/pagos", t: "Pagos & confianza", d: "El pilar de pagos, el ICF sobre 21 economías, el ICF-S por segmento y el panel LATAM completo." },
  { href: "/frontera", t: "Frontera", d: "Radar de 32 medidas regulatorias, línea de tiempo prospectiva, 36 tendencias y las brechas de Colombia." },
  { href: "/agenda", t: "Agenda", d: `Los ${FOCOS.length} focos del Centro de Innovación Financiera y los ${AGENDA.length} indicadores de la siguiente etapa.` },
  { href: "/roadmap", t: "Roadmap", d: "Hoja de ruta fintech para Colombia en tres horizontes, con KPI por acción." },
  { href: "/metodologia", t: "Metodología", d: "Cómo se calcula todo, con la aritmética de cada derivado y la auditoría de correcciones." },
];

export default function Presentacion() {
  return (
    <main>
      <NavBar />

      {/* HERO */}
      <header className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <span className="mb-5 inline-block rounded-full border border-lime/35 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
            {META.marca} · {META.institucion} · {META.version}, corte de {META.curado}
          </span>
          <h1 className="max-w-[22ch] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
            Mide si el sistema financiero de la región{" "}
            <span className="text-teal">de verdad le llegó a la gente</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-light text-fg/80">
            El Observatorio Find es un instrumento de medición público: convierte
            fuentes primarias dispersas —encuestas del Banco Mundial, estadísticas
            del BIS, cifras de bancos centrales, marcos normativos— en tres
            índices comparables, con el método abierto y cada cifra citada. No
            vende un reporte ni defiende a un gremio. Produce la evidencia que a
            esta conversación le faltaba.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: `${PILARES.length}`, l: "pilares", d: `${INDICADORES.length} indicadores en ${PAISES.length} países` },
              { n: `${icf.length}`, l: "economías en el ICF", d: `de ${LATAM.length} del panel latinoamericano` },
              { n: `${icfs.length}`, l: "observaciones por segmento", d: "género, ingreso y territorio" },
              { n: `${FUENTES.length}`, l: "fuentes primarias", d: "cada cifra con su URL y su año" },
            ].map((k) => (
              <div key={k.l} className="card p-5">
                <div className="tabnum text-3xl font-extrabold text-teal">{k.n}</div>
                <div className="mt-0.5 text-sm font-semibold text-fg">{k.l}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-muted">{k.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#que-mide"
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
            >
              Ver qué mide
            </a>
            <a
              href="/"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
            >
              Ir al observatorio →
            </a>
          </div>
        </div>
      </header>

      {/* EL VACÍO */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            La pregunta de fondo
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            ¿Por qué hace falta un observatorio?
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            Un observatorio no compite en el mercado que observa: produce el bien
            público que a ese mercado le falta. Cinco razones por las que este,
            aquí y ahora.
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VACIO.map((p) => (
              <div key={p.titulo} className="card p-6">
                <div className="text-3xl">{p.icono}</div>
                <h3 className="mt-3 font-bold text-fg">{p.titulo}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALCANCE */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            El alcance, sin ambigüedad
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Finanzas emergentes es el universo; fintech, el foco
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            El observatorio es el instrumento de medición del{" "}
            <b className="text-fg">Centro de Innovación Financiera</b> de EAFIT,
            que trabaja cinco focos estratégicos. Las finanzas emergentes abarcan
            mucho más de lo que un índice puede medir con rigor. Por eso el
            recorte se declara: dentro de ese mundo amplio, esta etapa mide el
            segmento fintech, con la IA como lente transversal. Los demás focos
            entran por la{" "}
            <a href="/agenda" className="text-teal hover:underline">
              agenda de medición
            </a>{" "}
            a medida que existan datos comparables entre los seis países.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-6" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                1 · El universo
              </div>
              <h3 className="mt-1.5 font-bold text-fg">Finanzas emergentes</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Todo lo que está redefiniendo el sistema financiero: DeFi, CBDCs,
                stablecoins, open finance, insurtech, microfinanzas digitales,
                embedded finance.
              </p>
            </div>
            <div className="card p-6" style={{ borderColor: "rgba(31,201,160,0.45)" }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                2 · El foco de esta etapa
              </div>
              <h3 className="mt-1.5 font-bold text-teal">Fintech</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                El segmento con datos comparables hoy: ecosistema de startups,
                rieles de pago instantáneo, crédito e inclusión, cripto-activos y
                los marcos que los regulan en los seis países.
              </p>
            </div>
            <div className="card p-6" style={{ borderColor: "rgba(159,206,46,0.45)" }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
                3 · La lente transversal
              </div>
              <h3 className="mt-1.5 font-bold text-lime">IA financiera</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                La pregunta que atraviesa todos los pilares: cómo el scoring, los
                agentes y la prevención de fraude con IA amplían — o cierran — las
                brechas del sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ MIDE: LOS TRES ÍNDICES */}
      <section id="que-mide" className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Qué mide
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Tres índices que responden tres preguntas distintas
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            Construir la infraestructura, lograr que la gente confíe en ella y
            que todos confíen por igual son tres cosas diferentes. Medirlas con
            un solo número las confunde.
          </p>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                sigla: "IMIAF",
                color: "#1FC9A0",
                nombre: "Índice de Madurez de IA Financiera",
                pregunta: "¿Qué tan madura es la infraestructura financiera del país?",
                alcance: `${PILARES.length} pilares · ${INDICADORES.length} indicadores · ${PAISES.length} países`,
                d: "Combina inclusión, pagos, ecosistema de IA, integridad, tokenización y regulación. Es el tablero de la oferta: lo que el sistema pone a disposición.",
              },
              {
                sigla: "ICF",
                color: "#E8825A",
                nombre: "Índice de Confianza Financiera",
                pregunta: "¿Confía la gente lo suficiente como para usarla?",
                alcance: `${DIMENSIONES.length} dimensiones · ${INDICADORES_ICF.length} indicadores · ${icf.length} economías rankeadas`,
                d: "Pesa más lo revelado que lo declarado: qué hace la gente con su dinero, no qué dice en una encuesta. Es el tablero de la demanda.",
              },
              {
                sigla: "ICF-S",
                color: "#9FCE2E",
                nombre: "Confianza por segmento",
                pregunta: "¿Confía toda la gente por igual?",
                alcance: `${icfs.length} observaciones país×segmento`,
                d: "El mismo índice, en versión reducida, desagregado por género, ingreso y territorio. Un promedio nacional puede esconder tres países dentro del mismo país.",
              },
            ].map((i) => (
              <div key={i.sigla} className="card p-6" style={{ borderColor: `${i.color}55` }}>
                <div className="text-2xl font-extrabold tracking-tight" style={{ color: i.color }}>
                  {i.sigla}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold text-fg">{i.nombre}</div>
                <p className="mt-3 text-[14px] font-medium leading-snug text-fg/85">
                  {i.pregunta}
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{i.d}</p>
                <div className="mt-4 border-t border-white/8 pt-3 text-[12px] text-muted">
                  {i.alcance}
                </div>
              </div>
            ))}
          </div>

          {/* Los pilares */}
          <h3 className="mt-12 mb-5 text-lg font-extrabold tracking-tight">
            Los {PILARES.length} pilares del IMIAF
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PILARES.map((pl) => {
              const inds = INDICADORES.filter((i) => i.pilar === pl.key);
              return (
                <div key={pl.key} className="card p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-bold" style={{ color: pl.color }}>
                      {pl.nombre}
                    </h4>
                    <span className="tabnum shrink-0 text-[12px] text-muted">
                      {inds.length} ind.
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{pl.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {inds.map((i) => (
                      <span
                        key={i.key}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-muted"
                      >
                        {i.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ranking vigente */}
          <div className="card mt-8 p-6">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-extrabold tracking-tight">
                Cómo queda el IMIAF hoy
              </h3>
              <span className="text-[12px] text-muted">
                pesos iguales · corte de {META.curado}
              </span>
            </div>
            <div className="space-y-2">
              {ranking.map((f, n) => {
                const b = banda(f.indice);
                return (
                  <div key={f.code} className="flex items-center gap-3">
                    <span className="tabnum w-5 text-right text-[12px] text-muted">{n + 1}</span>
                    <span className="w-32 shrink-0 text-[13px] font-semibold text-fg">
                      {PAISES.find((p) => p.code === f.code)?.flag} {nombrePais(f.code)}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/6">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${f.indice}%`,
                          background: `linear-gradient(90deg, ${b.color}99, ${b.color})`,
                        }}
                      />
                    </div>
                    <span className="tabnum w-12 text-right text-[13px] font-bold text-fg">
                      {cifra(f.indice)}
                    </span>
                    <span className="hidden w-32 text-[12px] text-muted sm:inline">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-muted">
              Los puntajes son relativos a estos {PAISES.length} países, no una escala
              absoluta. {nombrePais(lider.code)} marca el techo del panel con{" "}
              {cifra(lider.indice)} y {nombrePais(ultimo.code)} el piso con{" "}
              {cifra(ultimo.indice)}.{" "}
              {colombia && (
                <>
                  Colombia queda {puestoColombia}ª con {cifra(colombia.indice)}.{" "}
                </>
              )}
              En el inicio se pueden mover los pesos y ver si el orden aguanta.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO SE CONSTRUYE */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Cómo se construye
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Seis reglas que sostienen todo lo demás
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            El método completo está en{" "}
            <a href="/metodologia" className="text-teal hover:underline">
              /metodologia
            </a>
            , con la aritmética de cada cálculo propio. Estas son las reglas que lo
            gobiernan.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {METODO.map((m) => (
              <div key={m.n} className="card p-5">
                <div className="tabnum text-lg font-extrabold text-teal">{m.n}</div>
                <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-fg">{m.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{m.d}</p>
              </div>
            ))}
          </div>

          {/* Las tres marcas */}
          <div className="card mt-6 p-6">
            <h3 className="mb-4 text-sm font-bold text-teal">
              La línea entre lo medido y lo construido, en el propio dato
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "Dato de tercero",
                  n: nMedidos,
                  d: "Medido y publicado por la fuente que se cita. El observatorio solo lo recoge y lo compara.",
                  ej: "Tenencia de cuenta (Global Findex 2025)",
                },
                {
                  t: "Derivado",
                  n: nDerivados,
                  d: "Aritmética del Observatorio sobre cifras publicadas. La operación va escrita en la descripción del indicador.",
                  ej: "Pagos inmediatos por adulto = transacciones del riel ÷ población adulta",
                },
                {
                  t: "Construido",
                  n: nConstruidos,
                  d: "Índice cualitativo con rúbrica propia, para lo que ningún organismo mide todavía. La rúbrica se publica.",
                  ej: "Madurez de pagos inmediatos · Interoperabilidad transfronteriza",
                },
              ].map((m) => (
                <div key={m.t}>
                  <div className="flex items-baseline gap-2">
                    <span className="tabnum text-2xl font-extrabold text-fg">{m.n}</span>
                    <span className="text-[13px] font-bold text-teal">{m.t}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{m.d}</p>
                  <p className="mt-2 text-[12px] italic leading-relaxed text-muted/80">{m.ej}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ENCUENTRA */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Qué encuentra
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Seis hallazgos que no estaban publicados
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            No son opiniones: cada uno sale de una cifra con fuente y se puede
            seguir hasta el indicador que lo produce.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {HALLAZGOS.map((h) => (
              <div key={h.t} className="card flex flex-col p-6">
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: h.color }}
                >
                  {h.kicker}
                </div>
                <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-fg">{h.t}</h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">{h.d}</p>
                <a
                  href={h.href}
                  className="mt-4 text-[13px] font-semibold hover:underline"
                  style={{ color: h.color }}
                >
                  {h.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Para quién
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            El mismo dato, {ACTORES.length} lecturas distintas
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            Un inversionista y un regulador no le preguntan lo mismo a estas
            cifras. En el inicio, cada lente reordena los pesos del índice según
            lo que a ese actor le importa — y muestra qué cambia cuando cambia la
            pregunta.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ACTORES.map((a) => (
              <div key={a.key} className="card p-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{a.emoji}</span>
                  <h3 className="font-bold text-fg">{a.label}</h3>
                </div>
                <p className="mt-2 text-[12px] font-medium leading-relaxed text-teal">
                  {a.leImporta}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{a.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LÍMITES */}
      <section className="border-b border-white/8 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-amber">
            Los límites, declarados
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Lo que el observatorio no hace
          </h2>
          <p className="mb-8 max-w-3xl text-[15px] text-muted">
            Un instrumento que no declara su alcance invita a que lo usen mal.
            Estas son las seis cosas que este no pretende ser.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LIMITES.map((l) => (
              <div key={l.t} className="card p-5">
                <h3 className="text-[15px] font-bold leading-snug text-fg">{l.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{l.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECORRIDO */}
      <section className="border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            Cómo recorrerlo
          </div>
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
            Seis secciones, seis preguntas
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RUTAS_SITIO.map((r) => (
              <a
                key={r.href}
                href={r.href}
                className="card block p-5 transition hover:border-teal/40"
              >
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-teal">{r.t}</h3>
                  <span className="text-[11px] text-muted">{r.href}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{r.d}</p>
              </a>
            ))}
          </div>

          <div className="card mt-6 p-6">
            <h3 className="mb-2 text-sm font-bold text-teal">Qué sigue</h3>
            <p className="max-w-3xl text-[13px] leading-relaxed text-muted">
              La agenda de medición lista {AGENDA.length} indicadores para los{" "}
              {FOCOS.length} focos del Centro:{" "}
              <b className="text-fg">{agendaPorEstado("operando")} ya operan</b> dentro
              del IMIAF,{" "}
              <b className="text-fg">{agendaPorEstado("proximo-corte")} tienen fuente
              identificada</b>{" "}
              y entran en un corte próximo, y{" "}
              <b className="text-fg">{agendaPorEstado("por-construir")} exigen
              levantamiento propio o alianzas</b>. Entre estos últimos está la pieza
              bandera: un índice de bienestar financiero adaptado a la informalidad
              latinoamericana.{" "}
              <a href="/agenda" className="text-teal underline">
                Ver la agenda completa →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div
            className="card p-8 md:p-10"
            style={{
              background:
                "linear-gradient(120deg, rgba(31,201,160,0.12), rgba(108,92,214,0.10))",
            }}
          >
            <h2 className="max-w-[28ch] text-2xl font-extrabold tracking-tight md:text-3xl">
              Está publicado para que lo uses — y para que lo discutas
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] text-fg/80">
              El dataset se descarga completo en CSV y JSON, el código es abierto
              y la metodología está escrita con sus límites. Si una cifra está
              mal, la corrección se publica con fecha y razón. Eso es lo que hace
              que un ranking valga algo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/#datos"
                className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-[#06231f] transition hover:bg-teal-d"
              >
                Descargar el dataset
              </a>
              <a
                href="/metodologia"
                className="rounded-full border border-teal/50 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                Leer la metodología
              </a>
              <a
                href="https://github.com/sjimenezlon/observatorio-find"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg/80 transition hover:text-fg"
              >
                Ver el código →
              </a>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Cita sugerida
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg/75">
                {META.marca} · IA Financiera LATAM (2026). {META.institucion}.
                Índice IMIAF {META.version}, corte de {META.curado}.
                https://observatorio-find.vercel.app
              </p>
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
            <div className="flex flex-wrap gap-5">
              <a href="/metodologia" className="text-teal hover:underline">
                Metodología completa →
              </a>
              <a href="/aliados" className="text-muted hover:text-fg">
                Aliados
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-muted/80">
            {META.marca} · {META.institucion}. Datos curados a {META.curado} y
            auditados el {META.auditoria}. Los índices IMIAF, ICF e ICF-S son
            construcciones del Observatorio con normalización relativa al panel
            medido; no son escalas absolutas. Los datos de terceros conservan la
            licencia de su fuente original.
          </p>
        </div>
      </footer>
    </main>
  );
}
