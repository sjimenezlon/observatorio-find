import "./inicio.css";
import { NavBar } from "@/components/NavBar";
import PiePagina from "@/components/PiePagina";
import HeroOrbitas from "@/components/inicio/HeroOrbitas";
import Dial from "@/components/inicio/Dial";
import Intro from "@/components/inicio/Intro";
import ControlesInicio from "@/components/inicio/Controles";
import { InicioProvider } from "@/components/inicio/Inicio";
import { Bitacora, Explorador, Perfiles } from "@/components/inicio/Secciones";
import { datosInicio } from "@/lib/inicio";

const MODULOS = [
  {
    n: "01",
    t: "Dashboards",
    d: "Seis preguntas de decisión, con la cobertura de cada una declarada: publicado, parcial o brecha.",
    go: "Abrir los dashboards",
    href: "/dashboards",
  },
  {
    n: "02",
    t: "Índice y escenarios",
    d: "Ranking IIIF, pesos ajustables, mapa regional, ficha por país, duelo y simulador.",
    go: "Ver el ranking",
    href: "/indice",
  },
  {
    n: "03",
    t: "Pagos e ICF",
    d: "Confianza financiera en 21 economías y el uso de los rieles de pago inmediato.",
    go: "Ver pagos y confianza",
    href: "/pagos",
  },
  {
    n: "04",
    t: "Test de IA",
    d: "Diez afirmaciones, cuatro minutos y sin registro. Mida la preparación de su entidad.",
    go: "Hacer el test",
    href: "/test",
    hl: true,
  },
];

export default function Home() {
  const datos = datosInicio();
  const marquee = datos.senales.map((s, i) => (
    <span className="tick" key={i}>
      <span className="v tab-n">{s.valor}</span>
      <span className="tx">{s.texto}</span>
      <span className="src">{s.emisor}</span>
    </span>
  ));

  return (
    <div className="v44">
      {/* Si la entrada ya se vio en esta sesión, se oculta antes del primer pintado. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(sessionStorage.getItem('findIntro')==='1')document.documentElement.classList.add('sin-intro')}catch(e){}",
        }}
      />
      <noscript>
        <style>{".v44 .intro{display:none}"}</style>
      </noscript>
      <Intro />
      <NavBar extras={<ControlesInicio />} />
      <InicioProvider datos={datos}>
        <main id="inicio">
          <HeroOrbitas />

          <div className="strip" aria-label="Señales del corte">
            <span className="label">
              <span aria-hidden="true">●</span> Señales
            </span>
            <div className="track">
              {marquee}
              <span className="dup" aria-hidden="true">
                {marquee}
              </span>
            </div>
          </div>

          <section className="band light" id="senales" aria-labelledby="sen-t">
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <p className="eyebrow">Señales del corte {datos.meta.version}</p>
                  <h2 id="sen-t">
                    Nueve cifras para <em>leer la región</em>
                  </h2>
                </div>
                <p>
                  Cada señal cita su fuente. Úselas como punto de partida y abra el módulo correspondiente para ver el
                  detalle.
                </p>
              </div>
              <div className="signals">
                {datos.senales.map((s, i) => (
                  <article key={i} className={`sig ${i === 0 ? "hl" : ""}`}>
                    <b className="tab-n">{s.valor}</b>
                    <p>{s.texto}</p>
                    <a className="chip" href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.emisor} · {s.anio}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <Dial />
          <Bitacora />
          <Explorador />
          <Perfiles />

          <section className="band light" id="modulos" aria-labelledby="mod-t">
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <p className="eyebrow">Módulos del observatorio</p>
                  <h2 id="mod-t">
                    Cuatro rutas para <em>profundizar</em>
                  </h2>
                </div>
                <p>Cada módulo responde una pregunta de decisión distinta.</p>
              </div>
              <div className="modcards">
                {MODULOS.map((m) => (
                  <a key={m.n} className={`modcard ${m.hl ? "hl" : ""}`} href={m.href}>
                    <span className="n">{m.n}</span>
                    <h3>{m.t}</h3>
                    <p>{m.d}</p>
                    <span className="go">{`${m.go} →`}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </InicioProvider>
      <PiePagina />
    </div>
  );
}
