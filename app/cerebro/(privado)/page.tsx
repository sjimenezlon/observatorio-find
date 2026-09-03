import { cargarSenales } from "@/lib/cerebro/vivo";
import { INVERSION } from "@/data/cerebro/inversion";
import { JUGADORES } from "@/data/cerebro/jugadores";
import { PAISES_CEREBRO, HITOS } from "@/data/cerebro/paises";
import { BIBLIOTECA } from "@/data/cerebro/biblioteca";
import { hace } from "@/lib/cerebro/formato";
import Pulso from "@/components/cerebro/Pulso";
import AppsRanking from "@/components/cerebro/AppsRanking";
import PixVivo from "@/components/cerebro/PixVivo";
import Bolsa from "@/components/cerebro/Bolsa";
import Atencion from "@/components/cerebro/Atencion";
import Cripto from "@/components/cerebro/Cripto";
import { EstadoFuente, Seccion, SinDatos } from "@/components/cerebro/ui";

// La página se regenera cada hora en segundo plano (ISR). Las señales vivas se
// consultan en esa regeneración, nunca desde el navegador; la compuerta del
// proxy decide quién ve el resultado.
export const revalidate = 3600;

export default async function CerebroPage() {
  const s = await cargarSenales();
  const senales = [
    { k: "Noticias", v: s.noticias },
    { k: "App Store", v: s.apps },
    { k: "Pix (BCB)", v: s.pix },
    { k: "Bolsa · SEC", v: s.bolsa },
    { k: "Wikipedia", v: s.atencion },
    { k: "CoinGecko", v: s.cripto },
  ];
  const vivas = senales.filter((x) => x.v.ok).length;
  const conteos = [
    [JUGADORES.length, "jugadores"],
    [INVERSION.rondas.length, "rondas"],
    [PAISES_CEREBRO.length, "países"],
    [HITOS.length, "hitos"],
    [BIBLIOTECA.reportes.length, "reportes"],
    [BIBLIOTECA.directorio.length, "entidades"],
  ] as const;

  return (
    <>
      <header className="hero-grid relative overflow-clip border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-12 md:pb-16 md:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-teal">Cerebro · capa privada</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-lime">
                  <span className="status-dot" />
                  {vivas}/{senales.length} señales en vivo
                </span>
              </div>
              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5.5vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                Lo que el ecosistema fintech de América Latina está haciendo <span className="text-teal">ahora</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-fg/72 md:text-[17px]">
                Dos capas. La curada: jugadores, rondas, regulación por país y biblioteca, cada cifra con su fuente. La viva: titulares, rankings de apps,
                Pix, bolsa, atención pública y exchanges, leídos de APIs abiertas cada vez que la página se regenera.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/cerebro/jugadores" className="action-primary px-5 py-3 text-sm">
                  Ver jugadores <span aria-hidden="true">→</span>
                </a>
                <a href="/cerebro/paises" className="action-secondary px-5 py-3 text-sm">
                  Panel por país
                </a>
                <a href="#pulso" className="action-quiet px-4 py-3 text-sm">
                  Ir al pulso ↓
                </a>
              </div>
            </div>

            <aside className="technical-panel" aria-label="Estado de las señales">
              <div className="border-b border-white/8 px-5 py-4">
                <div className="data-label text-muted">Señales vivas · última regeneración</div>
              </div>
              <ul className="divide-y divide-white/8">
                {senales.map((x) => (
                  <li key={x.k} className="flex items-center justify-between gap-3 px-5 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-2">
                      <span className={`inline-block h-[7px] w-[7px] rounded-full ${x.v.ok ? "bg-lime" : "bg-amber"}`} />
                      {x.k}
                    </span>
                    <span className="tabnum text-muted">{x.v.ok ? hace(x.v.obtenido) : "sin respuesta"}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-3 border-t border-white/8 px-5 py-4">
                {conteos.map(([n, l]) => (
                  <div key={l}>
                    <div className="tabnum font-mono text-xl font-semibold tracking-[-0.04em]">{n}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{l}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </header>

      {INVERSION.anclas.length ? (
        <section className="border-b border-white/8">
          <div className="mx-auto grid max-w-6xl gap-3 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {INVERSION.anclas.slice(0, 8).map((a) => (
              <a key={a.texto} href={a.url} target="_blank" rel="noreferrer" className="card block p-4 transition hover:border-lime/50">
                <div className="tabnum text-2xl font-extrabold tracking-[-0.04em] text-lime">{a.cifra}</div>
                <div className="mt-1 text-xs leading-snug text-fg/85">{a.texto}</div>
                <div className="mt-2 text-[10px] text-muted">
                  {a.fuente} · {a.anio} ↗
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <Seccion
        id="pulso"
        numero="01 · Pulso"
        titulo="Lo que se publicó en los últimos 14 días"
        bajada="Titulares de prensa por país y tema. Google News es el radar; la cita se hace al medio que publicó."
        lado={<EstadoFuente vivo={s.noticias} />}
      >
        {s.noticias.ok ? <Pulso datos={s.noticias.datos} /> : <SinDatos vivo={s.noticias} />}
      </Seccion>

      <Seccion
        id="apps"
        numero="02 · Adopción revelada"
        titulo="Qué apps de finanzas descarga la gente hoy"
        bajada="Top 25 gratuitas de la categoría Finanzas en la App Store de cada país. Nadie contesta una encuesta: la gente descarga. La proporción de fintechs en el top 10 es la señal."
        lado={<EstadoFuente vivo={s.apps} nota="Se actualiza cada 6 horas" />}
        alterna
      >
        {s.apps.ok ? <AppsRanking datos={s.apps.datos} /> : <SinDatos vivo={s.apps} />}
      </Seccion>

      <Seccion
        id="pix"
        numero="03 · Pix en vivo"
        titulo="El riel que marca el ritmo de la región"
        bajada="Datos abiertos del Banco Central do Brasil: transacciones mensuales, cómo se inician, quién le paga a quién y en qué instituciones vive la llave del usuario."
        lado={<EstadoFuente vivo={s.pix} nota="Datos mensuales; llaves al último cierre de mes" />}
      >
        {s.pix.ok ? <PixVivo datos={s.pix.datos} /> : <SinDatos vivo={s.pix} />}
      </Seccion>

      <Seccion
        id="bolsa"
        numero="04 · En bolsa"
        titulo="Las fintechs latinoamericanas que cotizan en Nueva York"
        bajada="Precio y rango de 52 semanas (Yahoo Finance) y los últimos reportes radicados ante la SEC (EDGAR). La capitalización viene del dataset curado con su fecha; el precio es del mercado, no del Observatorio."
        lado={<EstadoFuente vivo={s.bolsa} />}
        alterna
      >
        {s.bolsa.ok ? <Bolsa datos={s.bolsa.datos} jugadores={JUGADORES} /> : <SinDatos vivo={s.bolsa} />}
      </Seccion>

      <Seccion
        id="atencion"
        numero="05 · Atención pública"
        titulo="Cuánto busca la gente cada marca y cada riel"
        bajada="Vistas de los artículos de Wikipedia en 30 días. No mide usuarios: mide curiosidad, y un pico suele anticipar un titular."
        lado={<EstadoFuente vivo={s.atencion} />}
      >
        {s.atencion.ok ? <Atencion datos={s.atencion.datos} /> : <SinDatos vivo={s.atencion} />}
      </Seccion>

      <Seccion
        id="cripto"
        numero="06 · Exchanges"
        titulo="Volumen de los exchanges de la región"
        bajada="Lo que Bitso, Mercado Bitcoin y Foxbit reportan a CoinGecko en las últimas 24 horas."
        lado={<EstadoFuente vivo={s.cripto} />}
        alterna
      >
        {s.cripto.ok ? <Cripto datos={s.cripto.datos} /> : <SinDatos vivo={s.cripto} />}
      </Seccion>

      <Seccion
        id="metodo"
        numero="07 · Cómo se construye"
        titulo="Dos capas, una regla"
        bajada="La regla del observatorio no cambia por estar detrás de una clave: ninguna cifra sin fuente verificable."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Capa curada",
              d: "Jugadores, inversión, países, hitos y biblioteca se investigaron con fuentes primarias y se guardaron en archivos versionados con fuente, URL https y año. Un script los verifica antes de cada despliegue. Lo que no se pudo verificar quedó como «sin dato», nunca como estimación.",
            },
            {
              t: "Capa viva",
              d: "Seis fuentes abiertas (Google News, App Store, BCB Olinda, Yahoo Finance + SEC EDGAR, Wikimedia, CoinGecko) se consultan desde el servidor cuando la página se regenera, cada hora como máximo. Si una falla, su sección lo dice; nada se rellena.",
            },
            {
              t: "Lo que no hace",
              d: "No estima, no promedia fuentes que se contradicen, no llama a ningún proveedor desde el navegador y no guarda datos de quien entra. La clave protege la interfaz; los archivos curados viven en el repositorio público del observatorio.",
            },
          ].map((c) => (
            <div key={c.t} className="card p-5">
              <div className="text-sm font-bold text-lime">{c.t}</div>
              <p className="mt-2 text-xs leading-relaxed text-fg/80">{c.d}</p>
            </div>
          ))}
        </div>
      </Seccion>
    </>
  );
}
