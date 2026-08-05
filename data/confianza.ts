// =============================================================================
// ICF · Índice de Confianza Financiera — especificación de dimensiones
//
// El problema: no existe una medición mundial y comparable de "confianza en los
// servicios financieros". Lo que hay son dos cosas distintas:
//
//   (a) Encuestas de reputación (Edelman Trust Barometer) — comparables entre
//       países pero solo 28 economías, ninguna andina, y miden la percepción de
//       la MARCA "sector financiero", no la relación real con el dinero.
//   (b) Penetración bancaria (Findex) — cobertura mundial, pero tener una cuenta
//       no es confiar: puede ser un requisito para cobrar el sueldo o un subsidio.
//
// El ICF se construye sobre una tesis: la confianza no se declara, se revela.
// Se observa en cuánto dinero deja la gente dentro del sistema, en si vuelve a
// usarlo cuando tiene opción, en si acude a él cuando necesita crédito y en si
// el sistema le devuelve trato justo. Las cuatro dimensiones siguen ese orden:
// de lo que la gente DICE a lo que la gente HACE, y de ahí a lo que el sistema
// LE HACE a la gente.
//
// Todos los insumos son series primarias del Global Findex 2025 (datos 2024) y
// del Financial Access Survey del FMI (2024), disponibles para 21 economías de
// América Latina y el Caribe. La normalización es min–max sobre el panel
// regional, no contra un estándar absoluto: el ICF dice quién confía MÁS que
// sus pares, no si el nivel es "bueno".
// =============================================================================

import { PaisLatam } from "./latam";

export type DimKey = "declarada" | "revelada" | "profundidad" | "integridad";

export interface Dimension {
  key: DimKey;
  nombre: string;
  corto: string;
  color: string;
  peso: number; // ponderación por defecto (suma 100)
  pregunta: string;
  desc: string;
}

export const DIMENSIONES: Dimension[] = [
  {
    key: "declarada",
    nombre: "Confianza declarada",
    corto: "Declarada",
    color: "#E8B452",
    peso: 20,
    pregunta: "¿Quién dice, explícitamente, que no confía?",
    desc: "La única pregunta de desconfianza con cobertura mundial: entre los adultos sin cuenta, qué proporción declara que la razón es la falta de confianza en las instituciones financieras. Pesa menos que las demás porque es una respuesta declarada y solo interroga a los excluidos.",
  },
  {
    key: "revelada",
    nombre: "Confianza revelada",
    corto: "Revelada",
    color: "#1FC9A0",
    peso: 30,
    pregunta: "¿La gente deja su dinero adentro y vuelve a usar el sistema?",
    desc: "Comportamiento observado, no opinión: cuentas que no se usan (abandono), dinero que se guarda en la cuenta en vez de retirarse completo, y pagos digitales a comercios — el uso que exige confiar en la cadena entera, no solo en recibir una transferencia.",
  },
  {
    key: "profundidad",
    nombre: "Profundidad del vínculo",
    corto: "Profundidad",
    color: "#9B8CF0",
    peso: 30,
    pregunta: "Cuando necesita crédito, ¿acude al sistema formal?",
    desc: "La prueba más exigente de confianza mutua: el crédito. De cada 100 personas que se endeudaron, cuántas lo hicieron con una entidad formal (el resto fue a familia, prestamistas o 'gota a gota'), y cuántas relaciones de crédito existen por cada 100 de depósito.",
  },
  {
    key: "integridad",
    nombre: "Integridad y daño",
    corto: "Integridad",
    color: "#FF7A9E",
    peso: 20,
    pregunta: "¿El sistema y su entorno le devuelven trato justo?",
    desc: "La confianza se destruye con la experiencia: cuántas de las solicitudes de dinero por teléfono o SMS terminan efectivamente en un envío (la conversión de la estafa), y qué proporción de quienes reciben su salario en una cuenta pagó comisiones mayores a las esperadas.",
  },
];

export interface IndicadorICF {
  key: string;
  dim: DimKey;
  label: string;
  unidad: string;
  /** true = más alto es mejor para la confianza */
  mejorAlto: boolean;
  /** de dónde sale el valor en PaisLatam */
  campo: keyof PaisLatam;
  fuente: string;
  derivado?: boolean;
  nota: string;
}

export const INDICADORES_ICF: IndicadorICF[] = [
  {
    key: "desconfianza",
    dim: "declarada",
    label: "Desconfianza como barrera de entrada",
    unidad: "% de los no bancarizados",
    mejorAlto: false,
    campo: "desconfianza",
    fuente: "Global Findex 2025 · fin11d (derivado)",
    derivado: true,
    nota: "fin11d ÷ (100 − tenencia de cuenta) × 100. La serie cruda está expresada en % de adultos 15+; dividirla por la población sin cuenta la vuelve comparable entre países con niveles de bancarización muy distintos. Sin esa corrección, Venezuela parecería el país que más confía solo porque casi todos tienen cuenta.",
  },
  {
    key: "inactiva",
    dim: "revelada",
    label: "Cuentas abandonadas",
    unidad: "% de adultos",
    mejorAlto: false,
    campo: "inactiva",
    fuente: "Global Findex 2025 · inactive.t.d",
    nota: "Adultos con una cuenta que no registró movimiento en 12 meses. Es el rastro estadístico de la inclusión de papel: la cuenta se abrió, pero la relación nunca ocurrió.",
  },
  {
    key: "guarda",
    dim: "revelada",
    label: "Guarda dinero en la cuenta",
    unidad: "% de adultos",
    mejorAlto: true,
    campo: "guarda",
    fuente: "Global Findex 2025 · fin8",
    nota: "Dejar saldo es la apuesta más simple y más honesta a favor del sistema: implica creer que el dinero seguirá ahí y que se podrá sacar cuando haga falta.",
  },
  {
    key: "merchantpay",
    dim: "revelada",
    label: "Paga a comercios por medios digitales",
    unidad: "% de adultos",
    mejorAlto: true,
    campo: "merchantpay",
    fuente: "Global Findex 2025 · merchant.pay",
    nota: "Distinto de 'hizo o recibió un pago digital': exige confiar en el comercio, en el riel y en la reversibilidad. Es el indicador de pagos que mejor separa a los países que solo reciben transferencias de los que ya transaccionan.",
  },
  {
    key: "formalidadCredito",
    dim: "profundidad",
    label: "Formalidad del endeudamiento",
    unidad: "% de quienes se endeudaron",
    mejorAlto: true,
    campo: "formalidadCredito",
    fuente: "Global Findex 2025 · fin22a / borrow.any.t.d (derivado)",
    derivado: true,
    nota: "De cada 100 adultos que se endeudaron por cualquier vía, cuántos lo hicieron con una entidad formal. Mide la decisión de a quién acudir teniendo la necesidad ya presente — por eso aísla mejor la confianza que la penetración de crédito.",
  },
  {
    key: "creditoDeposito",
    dim: "profundidad",
    label: "Crédito por cada 100 depósitos",
    unidad: "prestatarios / 100 depositantes",
    mejorAlto: true,
    campo: "creditoDeposito",
    fuente: "IMF Financial Access Survey 2024 (derivado)",
    derivado: true,
    nota: "Prestatarios por 1.000 adultos ÷ depositantes por 1.000 adultos. Responde a la pregunta del socio ('créditos por persona') pero normalizada: cuántas relaciones de crédito produce el sistema por cada relación de depósito que ya tiene. México y Chile no reportan depositantes al FAS: es un vacío de la fuente, no un cero.",
  },
  {
    key: "conversionEstafa",
    dim: "integridad",
    label: "Conversión de la estafa telefónica",
    unidad: "% de las solicitudes",
    mejorAlto: false,
    campo: "conversionEstafa",
    fuente: "Global Findex 2025 · con22 / con21 (derivado)",
    derivado: true,
    nota: "De cada 100 adultos que recibieron una llamada o SMS pidiéndoles dinero, cuántos enviaron el dinero. Aísla la vulnerabilidad de la exposición: casi todos reciben el intento, lo que cambia entre países es cuántos caen.",
  },
  {
    key: "comisiones",
    dim: "integridad",
    label: "Comisiones mayores a las esperadas",
    unidad: "% de adultos",
    mejorAlto: false,
    campo: "comisiones",
    fuente: "Global Findex 2025 · fin35",
    nota: "Quienes recibieron su salario en una cuenta y pagaron comisiones superiores a lo que esperaban. Es la medida más directa de asimetría de información en la relación cotidiana con el banco.",
  },
];

/** Umbral mínimo de cobertura para entrar al ranking del ICF. */
export const COBERTURA_MINIMA = 0.5;
