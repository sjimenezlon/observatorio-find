import type { Metadata } from "next";
import { INDICADORES, PILARES, FUENTES, META } from "@/data/dataset";

export const metadata: Metadata = {
  title: "Metodología · Observatorio Find",
  description:
    "Metodología abierta del Índice de Madurez de IA Financiera (IMIAF): indicadores, normalización, ponderación y fuentes.",
};

export default function Metodologia() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <a href="/" className="text-sm text-teal hover:underline">
        ← Volver al observatorio
      </a>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
        Metodología abierta
      </h1>
      <p className="mt-3 text-[15px] text-muted">
        {META.marca} · {META.institucion}. Versión {META.version}, curada a{" "}
        {META.curado}. Este documento describe cómo se construye el Índice de
        Madurez de IA Financiera (IMIAF) para que cualquiera pueda auditarlo,
        replicarlo y citarlo.
      </p>

      <Section n="1" t="Qué mide el índice">
        <p>
          El IMIAF resume, en un puntaje de 0 a 100 por país, qué tan maduro está
          el ecosistema de IA financiera en seis pilares. No es un ranking de
          “mejor país”: es un mapa de fortalezas y brechas relativas entre los
          seis países comparados (Colombia, México, Brasil, Chile, Perú y
          Argentina).
        </p>
        <p>
          <b className="text-fg">Alcance:</b> el campo del observatorio son las
          finanzas emergentes — un universo que incluye DeFi, CBDCs,
          microfinanzas, insurtech y más. Dentro de ese mundo amplio, esta
          etapa mide el segmento <b className="text-fg">fintech</b>, con la IA
          como lente transversal; los demás segmentos se incorporarán a medida
          que existan datos comparables entre los seis países.
        </p>
      </Section>

      <Section n="2" t="Pilares e indicadores">
        <p className="mb-4">
          Cada pilar agrupa indicadores con una dirección explícita (↑ más es
          mejor; ↓ menos es mejor):
        </p>
        <div className="space-y-5">
          {PILARES.map((pl) => (
            <div key={pl.key} className="card p-4">
              <h3
                className="font-bold"
                style={{ color: pl.color }}
              >
                {pl.nombre}
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {INDICADORES.filter((i) => i.pilar === pl.key).map((i) => (
                  <li key={i.key} className="flex gap-2">
                    <span style={{ color: pl.color }}>
                      {i.direccion === "higher" ? "↑" : "↓"}
                    </span>
                    <span>
                      <b className="text-fg">{i.label}</b> ({i.unidad})
                      {i.construido && (
                        <span className="ml-1 text-amber">
                          · índice del Observatorio
                        </span>
                      )}{" "}
                      — {i.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section n="3" t="El pilar de Pagos" id="pagos">
        <p>
          Los pagos estaban repartidos entre dos pilares: la madurez del riel
          instantáneo dentro de “fraude” y el pago digital dentro de “inclusión”.
          Esa organización respondía a la pregunta{" "}
          <i>cuánta gente está adentro del sistema</i>. Desde {META.version} el
          pilar es propio y responde otra:{" "}
          <b className="text-fg">
            cuánto se usa el sistema, si el uso llega al comercio y si el riel
            cruza la frontera
          </b>
          . Cuatro de sus cinco indicadores vienen de fuente primaria o de
          aritmética explícita sobre fuente primaria.
        </p>
        <p>
          El indicador de <b className="text-fg">pagos inmediatos por adulto al
          año</b> merece una nota aparte, porque es la métrica que más se pide y
          la que menos existe. No hay una fuente mundial comparable: el Red Book
          del BIS solo cubre las 26 jurisdicciones del CPMI (de la región, apenas
          Brasil, México y Argentina) y cada banco central publica su propio
          perímetro. El Observatorio lo reconstruye con un{" "}
          <b className="text-fg">perímetro único</b> —solo el riel nacional de
          pagos inmediatos— y publica la aritmética país por país:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-[12.5px] leading-relaxed text-teal">
{`Brasil     87.800 M tx/año (PIX, BCB, 1S-2026 anualizado)      ÷ 175 M adultos = 502
Argentina   8.772 M tx/año (731 M/mes, BCRA mar-2026)           ÷  37 M adultos = 237
Perú        3.156 M tx/año (263 M/mes interoperables, BCRP)      ÷  26,5 M       = 119
México      7.300 M tx/año (SPEI usuarios finales, Banxico 2025) ÷ 100 M        =  73
Colombia    1.825 M tx/año (5 M/día corrientes, Banrep)          ÷  41,5 M      =  44
Chile       sin riel de pagos inmediatos → n/d`}
        </pre>
        <p className="mt-3">
          Las cifras de perímetro amplio de cada banco central{" "}
          <b className="text-fg">no son comparables con esas barras</b> y se
          muestran solo como contexto: Perú reporta 655 pagos digitales por
          adulto en 2025 contando todos los medios, Chile 382 pagos por persona
          sumando tarjetas y transferencias, y el BIS mide 242 pagos sin efectivo
          por habitante en economías emergentes contra 579 en avanzadas.
        </p>
      </Section>

      <Section n="4" t="ICF · Índice de Confianza Financiera" id="icf">
        <p>
          No existe una medición mundial y comparable de confianza en los
          servicios financieros. Hay dos cosas distintas, y ninguna sirve sola:
          las encuestas de reputación (Edelman Trust Barometer) son comparables
          pero cubren 28 economías y ninguna andina, y miden la percepción de la
          marca “sector financiero”; la penetración bancaria tiene cobertura
          mundial pero{" "}
          <b className="text-fg">tener una cuenta no es confiar</b> — puede ser el
          requisito para cobrar un sueldo o un subsidio.
        </p>
        <p>
          El ICF parte de una tesis: la confianza no se declara, se revela. Se
          construye con <b className="text-fg">ocho indicadores</b> del Global
          Findex 2025 y del Financial Access Survey del FMI, agrupados en cuatro
          dimensiones que van de lo que la gente dice a lo que la gente hace, y de
          ahí a lo que el sistema le hace a la gente:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>
            <b className="text-fg">Confianza declarada (20%).</b> Desconfianza como
            barrera de entrada, entre los adultos sin cuenta. Pesa menos porque es
            declarada y solo interroga a los excluidos.
          </li>
          <li>
            <b className="text-fg">Confianza revelada (30%).</b> Cuentas
            abandonadas, dinero que se deja en la cuenta y pagos a comercios: el
            uso que exige confiar en la cadena completa.
          </li>
          <li>
            <b className="text-fg">Profundidad del vínculo (30%).</b> Formalidad
            del endeudamiento y relaciones de crédito por cada 100 de depósito. El
            crédito es la prueba más exigente de confianza mutua.
          </li>
          <li>
            <b className="text-fg">Integridad y daño (20%).</b> Conversión de la
            estafa telefónica y comisiones mayores a las esperadas: la confianza se
            destruye con la experiencia.
          </li>
        </ul>
        <p className="mt-4">
          Cuatro de los ocho indicadores son{" "}
          <b className="text-fg">derivados</b>: no se inventa nada, se divide una
          serie por otra para volverla comparable. La aritmética completa:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-[12.5px] leading-relaxed text-teal">
{`desconfianza      = fin11d ÷ (100 − cuenta) × 100
                    # fin11d viene en % de adultos 15+; dividirlo por la
                    # población sin cuenta lo vuelve comparable entre países
                    # con bancarización muy distinta

formalidadCredito = fin22a ÷ borrow.any.t.d × 100
                    # de cada 100 que se endeudaron, cuántos usaron el
                    # sistema formal en vez de familia, prestamista o gota a gota

creditoDeposito   = prestatarios/1.000 ÷ depositantes/1.000 × 100   (FAS del FMI)

conversionEstafa  = con22 ÷ con21 × 100
                    # de cada 100 solicitudes de dinero por teléfono o SMS,
                    # cuántas terminaron en un envío efectivo`}
        </pre>
        <p className="mt-3">
          El panel son <b className="text-fg">21 economías</b> de América Latina y
          el Caribe y la normalización es min–max sobre ese panel: el ICF dice
          quién confía más que sus pares, no si el nivel es bueno en términos
          absolutos.
        </p>
        <p>
          <b className="text-fg">Regla de cobertura.</b> Cada país declara cuántos
          de los ocho indicadores tiene con dato. Quien no llegue al 50% queda{" "}
          <b className="text-fg">fuera del ranking</b>, marcado como no medible —
          Chile, Uruguay, Jamaica, Haití y Trinidad y Tobago, que no fueron
          encuestados en los módulos digitales del Findex 2024. Un índice que
          puntúa a un país con 2 de 8 indicadores no está midiendo confianza:
          está midiendo qué encuesta llegó.
        </p>
      </Section>

      <Section n="4b" t="Confianza por segmento (ICF-S)" id="icfs">
        <p>
          El ICF dice cuánto confía un país; el ICF-S dice{" "}
          <b className="text-fg">quién dentro de él confía menos</b>, usando las
          desagregaciones oficiales del Findex por género, quintil de ingreso y
          territorio (sufijos .1, .2, .7, .8, .9 y .10 de cada serie). Son 108
          observaciones país×segmento en 18 economías.
        </p>
        <p>
          Es un índice <b className="text-fg">reducido</b>, y por eso lleva otro
          nombre: el Findex no desagrega cuentas inactivas, estafas ni comisiones
          inesperadas, y el FAS del FMI no desagrega prestatarios ni
          depositantes. Quedan tres dimensiones y cuatro indicadores —
          desconfianza declarada, dinero guardado en la cuenta, pago a comercios
          y formalidad del endeudamiento — con pesos reescalados a 100 (25 / 45 /
          30). Sus valores <b className="text-fg">no son intercambiables</b> con
          los del ICF completo.
        </p>
        <p>
          La normalización min–max se hace sobre las 108 observaciones
          país×segmento, no sobre los países: solo así un valor es comparable en
          las dos direcciones a la vez — entre segmentos de un mismo país y entre
          países para un mismo segmento.
        </p>
      </Section>

      <Section n="5" t="Normalización">
        <p>
          Cada indicador se lleva a una escala 0–100 con normalización min–max
          sobre los seis países:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-[13px] text-teal">
{`# más es mejor:
score = 100 * (valor − min) / (max − min)

# menos es mejor (riesgo, ranking, brechas):
score = 100 * (max − valor) / (max − min)`}
        </pre>
        <p className="mt-3">
          El país con el mejor valor observado obtiene 100 y el peor, 0. La
          normalización es <b className="text-fg">relativa</b> al grupo: los
          puntajes describen posición entre estos seis países, no un estándar
          absoluto.
        </p>
      </Section>

      <Section n="6" t="Agregación y ponderación">
        <p>
          El puntaje de un pilar es el promedio simple de sus indicadores
          normalizados (omitiendo los que no tienen dato para ese país). El
          índice compuesto es el promedio ponderado de los seis pilares; por
          defecto cada pilar pesa ~17%. En el tablero los pesos son ajustables y
          se renormalizan a 100% automáticamente —con presets (Balanceado, Pagos &
          confianza, Tecnológico, Impacto) y lentes por tipo de actor— de modo que se puede
          leer el ecosistema bajo distintas prioridades.
        </p>
      </Section>

      <Section n="7" t="Tratamiento de datos faltantes (n/d)">
        <p>
          Cuando un indicador no tiene dato para un país, ese país no recibe
          puntaje en ese indicador y el pilar se promedia solo con los
          indicadores disponibles. No se imputan valores. Los casos de n/d (p.
          ej. ranking de adopción cripto fuera del top 20 público, o VC sin
          desglose país) están anotados en cada indicador del tablero.
        </p>
      </Section>

      <Section n="8" t="Índices construidos por el Observatorio">
        <p>
          Cinco indicadores no provienen de una cifra única publicada, sino que
          el Observatorio los construye (0–100) a partir de evidencia cualitativa
          citada, y se marcan explícitamente con la etiqueta “índice del
          Observatorio”:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>
            <b className="text-fg">Madurez de pagos inmediatos:</b> pondera
            antigüedad, adopción e interoperabilidad del riel nacional (PIX, Bre-B,
            CoDi/DiMo, Transferencias 3.0, Yape/Plin, TEF), con datos de los
            bancos centrales.
          </li>
          <li>
            <b className="text-fg">Madurez regulatoria de activos digitales:</b>{" "}
            gradúa el marco legal vigente para proveedores de activos virtuales y
            tokenización, desde ley integral operativa hasta solo normas de
            prevención de lavado.
          </li>
          <li>
            <b className="text-fg">Apertura de datos (Open Finance):</b> gradúa la
            madurez del marco de Finanzas Abiertas, desde obligatorio y operativo
            (Brasil) hasta inexistente, con base en decretos y normas por país.
          </li>
          <li>
            <b className="text-fg">Marco fintech, sandbox y datos:</b> combina la
            existencia de ley fintech dedicada, sandbox regulatorio activo y ley
            de protección de datos personales.
          </li>
          <li>
            <b className="text-fg">Interoperabilidad transfronteriza:</b> gradúa en
            qué medida el riel doméstico cruza la frontera, combinando la
            existencia de conexión internacional (Pix Internacional, corredores
            de remesas), el costo de enviar remesas al país y el uso de
            stablecoins como riel de facto. Es el único indicador del pilar de
            Pagos que no se apoya en una serie publicada, porque{" "}
            <b className="text-fg">ningún organismo publica todavía un indicador
            de conectividad entre sistemas de pago inmediato</b>.
          </li>
        </ul>
        <p className="mt-3">
          Son juicios transparentes y discutibles; se publican para que la
          comunidad los critique y mejore, no como verdad cerrada.
        </p>
      </Section>

      <Section n="9" t="Limitaciones">
        <ul className="space-y-2 text-sm text-muted">
          <li>• Comparación entre seis países; no es un estándar global absoluto.</li>
          <li>
            • Algunos datos tienen años distintos (p. ej. Findex 2021 para Chile en
            dos indicadores; Finnovista 2024 para Perú y Argentina). Cada caso está
            anotado.
          </li>
          <li>
            • La adopción de IA en banca por país aún no tiene una métrica pública
            comparable; se aproxima vía densidad fintech y capital de riesgo.
          </li>
          <li>
            • Las proyecciones de terceros (tokenización a 2030, IA agéntica 2026)
            son estimaciones y deben validarse.
          </li>
          <li>
            • <b className="text-fg">Cobertura desigual en el pilar de Pagos.</b>{" "}
            Chile no fue encuestado en los módulos de pagos digitales del Findex
            2024 y no tiene riel de pagos inmediatos, así que su pilar de Pagos se
            calcula con 2 de 5 indicadores — y son justamente los dos donde peor
            queda. El puntaje debe leerse con esa advertencia: es un vacío de
            fuente, no una medición completa.
          </li>
          <li>
            • <b className="text-fg">México y Chile no reportan depositantes</b> al
            Financial Access Survey del FMI, de modo que el indicador de crédito
            por cada 100 depósitos no existe para ellos.
          </li>
          <li>
            • El ICF infiere confianza del comportamiento y no puede distinguir la
            confianza de la coerción: donde el efectivo escasea (Venezuela), el
            pago digital deja de ser una elección. El caso se señala en el módulo
            en vez de corregirse a mano.
          </li>
        </ul>
      </Section>

      <Section n="10" t="Cómo se actualiza">
        <p>
          El seed vive en un único archivo de datos versionado. Cada actualización
          edita los valores y sus citas y vuelve a desplegar; el índice se
          recalcula automáticamente. La meta es publicar reportes periódicos con la
          misma metodología, de modo que las series sean comparables en el tiempo.
        </p>
        <p>
          Desde el corte de {META.curado}, el tablero muestra la variación del
          IMIAF de cada país frente al corte anterior (con pesos iguales).{" "}
          <b className="text-fg">
            Atención en esta versión: el corte anterior se calculó con cinco
            pilares, sin Pagos.
          </b>{" "}
          Los deltas de {META.version} mezclan por tanto cambio de datos y cambio
          de metodología, y sirven como referencia de posición, no como variación
          limpia. El próximo corte ya será comparable pilar a pilar. Como la
          normalización es relativa al grupo, un país puede bajar de puntaje aunque
          mejore en términos absolutos, si sus pares mejoran más rápido. El
          simulador “¿Y si…?” usa exactamente el mismo motor de cálculo sobre
          valores hipotéticos definidos por el usuario.
        </p>
      </Section>

      <Section n="10b" t={`Auditoría del ${META.auditoria}`} id="auditoria">
        <p>
          Cada corte se vuelve a verificar contra la fuente primaria antes de
          publicarse. Este es el registro de la última revisión: qué se comprobó,
          qué cambió y qué se confirmó vigente. Se publica porque un observatorio
          que corrige a la vista es más confiable que uno que nunca se equivoca.
        </p>

        <div className="mt-4 space-y-3">
          <div className="card p-4" style={{ borderColor: "rgba(31,201,160,0.35)" }}>
            <div className="mb-2 text-sm font-bold text-teal">
              Nuevo en el corte de agosto
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Se incorporó como benchmark el{" "}
              <a
                href="https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/2026-global-ai-in-financial-services-report/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-fg hover:text-teal hover:underline"
              >
                Global AI in Financial Services Report 2026 de Cambridge CCAF
              </a>
              : 628 organizaciones en 151 jurisdicciones. El 81% de las firmas
              financieras encuestadas adopta IA en algún nivel, pero solo 14%
              reporta una transformación del negocio. La cifra se usa como ancla
              global y no altera el cálculo del IMIAF.
            </p>
          </div>

          <div className="card p-4">
            <div className="mb-2 text-sm font-bold text-amber">
              Correcciones aplicadas el 26 de julio
            </div>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <b className="text-fg">Bre-B: 46 → 44 pagos por adulto.</b> El
                corte anterior anualizaba los 5,2 millones de transacciones del
                31-ene-2026, que son el <b className="text-fg">pico de un solo
                día</b> —el último del mes, día de pago— y no el nivel corriente.
                Se corrigió a los 5 millones diarios que reporta el Banco de la
                República tras triplicarse desde 1,5 millones en siete meses. De
                paso se actualizaron las cifras de adopción a las oficiales del
                banco central: 108 millones de llaves al 30-jun-2026, 34 millones
                de usuarios y más de 90.000 comercios con llave registrada. Se
                retiró la cifra de &ldquo;2,9 millones de comercios&rdquo;, que
                provenía de prensa y no cuadra con el dato del propio Banrep.
              </li>
              <li>
                <b className="text-fg">PIX: 498 → 502 pagos por adulto.</b> Se
                reemplazó la anualización de los datos de enero a mayo por la
                cifra cerrada del primer semestre de 2026: 43.900 millones de
                transacciones, +19,3% interanual.
              </li>
              <li>
                <b className="text-fg">
                  Costo de las remesas: 3,29% → 6,36%.
                </b>{" "}
                El corte anterior usaba como titular el índice SmaRT, que
                promedia únicamente los servicios más baratos de cada corredor.
                El promedio global real de enviar US$200 es 6,36% (3T-2025) —{" "}
                <b className="text-fg">más del doble de la meta 10.c de los
                ODS</b>. Ahora se muestran los cuatro valores: promedio global,
                digital (4,59%), no digital (7,30%) y SmaRT.
              </li>
            </ul>
          </div>

          <div className="card p-4">
            <div className="mb-2 text-sm font-bold text-teal">
              Confirmado vigente a agosto de 2026
            </div>
            <ul className="space-y-1.5 text-sm text-muted">
              <li>
                • <b className="text-fg">Basel AML Index 2025</b> (14ª edición
                pública, 177 jurisdicciones) sigue siendo la última; no hay
                edición 2026.
              </li>
              <li>
                • <b className="text-fg">Finnovista Radar Colombia 2025</b> (410
                fintechs locales) sigue siendo el último publicado; la edición
                2026 está en levantamiento.
              </li>
              <li>
                • <b className="text-fg">Global Findex 2025</b> (datos de encuesta
                2024) es la edición corriente; la siguiente ronda es 2028.
              </li>
              <li>
                • <b className="text-fg">BIS Red Book 2024</b> (CPMI Brief No 12,
                abril de 2026), <b className="text-fg">Edelman 2026</b> y{" "}
                <b className="text-fg">GASA 2025</b>: ediciones vigentes.
              </li>
              <li>
                • <b className="text-fg">Chainalysis</b> publica su índice de
                adopción entre septiembre y octubre: el de 2025 sigue siendo el
                último.
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-4">
          Ninguna de las tres correcciones cambió el orden del ranking: Colombia
          seguía y sigue última de los seis en el IMIAF y última de las
          dieciséis medibles en el ICF. Se corrigieron igual, porque el objetivo
          no es sostener una conclusión sino sostener el método que la produce.
        </p>
      </Section>

      <Section n="11" t="Fuentes">
        <ul className="space-y-2 text-sm">
          {FUENTES.map((f) => (
            <li key={f.nombre}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                {f.nombre}
              </a>
              <span className="text-muted"> — {f.nota}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-12 border-t border-white/8 pt-6">
        <a href="/" className="text-sm text-teal hover:underline">
          ← Volver al observatorio
        </a>
      </div>
    </main>
  );
}

function Section({
  n,
  t,
  id,
  children,
}: {
  n: string;
  t: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-6">
      <h2 className="mb-3 flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/15 text-sm text-teal">
          {n}
        </span>
        {t}
      </h2>
      <div className="space-y-2 text-[15px] leading-relaxed text-fg/85">
        {children}
      </div>
    </section>
  );
}
