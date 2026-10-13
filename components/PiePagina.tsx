import { LATAM } from "@/data/latam";
import { META, PAISES } from "@/data/dataset";

export default function PiePagina() {
  return (
    <footer className="pie-find">
      <div className="pie-wrap">
        <div className="flogos">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/eafit.png" alt="Universidad EAFIT" width={520} height={172} />
          <span className="lg-sep" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/find.png" alt="Find, Centro de Innovación Financiera" width={520} height={297} />
        </div>
        <div className="fcols">
          <div>
            <h4>Observatorio</h4>
            <ul>
              <li>
                <a href="/dashboards">Dashboards</a>
              </li>
              <li>
                <a href="/indice">Índice IIIF</a>
              </li>
              <li>
                <a href="/pagos">Pagos e ICF</a>
              </li>
              <li>
                <a href="/test">Test de IA</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Más</h4>
            <ul>
              <li>
                <a href="/roadmap">Roadmap fintech Colombia</a>
              </li>
              <li>
                <a href="/agenda">Agenda de medición</a>
              </li>
              <li>
                <a href="/frontera">Frontera regulatoria</a>
              </li>
              <li>
                <a href="/metodologia">Metodología completa</a>
              </li>
              <li>
                <a href="/metodologia#auditoria">Auditoría</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Corte</h4>
            <ul>
              <li>{`Versión ${META.version} · ${META.curado}`}</li>
              <li>{`Última auditoría: ${META.auditoria}`}</li>
              <li>{`${PAISES.length} países · ${META.indicadores} indicadores · ${LATAM.length} economías en el ICF`}</li>
            </ul>
          </div>
        </div>
        <p className="disc">
          Las cifras provienen de las fuentes públicas citadas. Los índices marcados como del Observatorio son
          construcciones propias documentadas en la metodología. Las proyecciones de terceros deben validarse antes de
          comprometer recursos.{" "}
          <span>{`${META.marca} · Centro de Innovación Financiera · ${META.institucion}.`}</span>
        </p>
      </div>
    </footer>
  );
}
