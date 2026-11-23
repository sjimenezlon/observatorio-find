import "server-only";

// -----------------------------------------------------------------------------
// Tope de uso de Findy
//
// Cada pregunta le cuesta plata al Observatorio (el modelo se paga por uso), y
// la clave del Cerebro es compartida: quien la tenga no debe poder vaciar el
// presupuesto. Aquí se acota, antes de llamar al modelo:
//   · por persona (IP): preguntas por minuto y por hora, y una a la vez;
//   · en total: conversaciones simultáneas y preguntas por día.
//
// El conteo vive en la memoria de la instancia. En Vercel puede haber varias
// instancias, así que estos topes son por instancia: la barrera que sí es
// única para todo el tráfico es la regla del firewall de Vercel sobre
// /api/cerebro/pregunta (la misma mecánica que ya protege /api/cerebro/entrar).
// -----------------------------------------------------------------------------

const POR_MINUTO = 5;
const POR_HORA = 40;
const SIMULTANEAS_POR_IP = 1;
const SIMULTANEAS_TOTAL = 4;
const POR_DIA_TOTAL = 400;

const MINUTO = 60_000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

const porIp = new Map<string, number[]>();
const enCurso = new Map<string, number>();
let totalEnCurso = 0;
let delDia: number[] = [];

export type Permiso = { ok: true; liberar: () => void } | { ok: false; mensaje: string; reintentarEn: number };

export function pedirTurno(ip: string, ahora = Date.now()): Permiso {
  delDia = delDia.filter((t) => ahora - t < DIA);
  if (delDia.length >= POR_DIA_TOTAL) {
    return { ok: false, mensaje: "Findy ya respondió todo lo que podía por hoy. Vuelve mañana.", reintentarEn: 3600 };
  }

  const marcas = (porIp.get(ip) ?? []).filter((t) => ahora - t < HORA);
  if (marcas.filter((t) => ahora - t < MINUTO).length >= POR_MINUTO) {
    return { ok: false, mensaje: "Vas muy rápido. Dale un minuto a Findy y vuelve a preguntar.", reintentarEn: 60 };
  }
  if (marcas.length >= POR_HORA) {
    return { ok: false, mensaje: "Ya van muchas preguntas en esta hora. Findy descansa un rato y vuelve.", reintentarEn: 900 };
  }
  if ((enCurso.get(ip) ?? 0) >= SIMULTANEAS_POR_IP) {
    return { ok: false, mensaje: "Findy todavía está respondiendo tu pregunta anterior.", reintentarEn: 10 };
  }
  if (totalEnCurso >= SIMULTANEAS_TOTAL) {
    return { ok: false, mensaje: "Findy está atendiendo a varias personas a la vez. Intenta en unos segundos.", reintentarEn: 15 };
  }

  marcas.push(ahora);
  porIp.set(ip, marcas);
  delDia.push(ahora);
  enCurso.set(ip, (enCurso.get(ip) ?? 0) + 1);
  totalEnCurso++;

  // Que el mapa no crezca sin límite con IPs que ya no vuelven.
  if (porIp.size > 2000) {
    for (const [k, v] of porIp) if (!v.some((t) => ahora - t < HORA)) porIp.delete(k);
  }

  let liberado = false;
  return {
    ok: true,
    liberar: () => {
      if (liberado) return;
      liberado = true;
      totalEnCurso = Math.max(0, totalEnCurso - 1);
      const n = (enCurso.get(ip) ?? 1) - 1;
      if (n <= 0) enCurso.delete(ip);
      else enCurso.set(ip, n);
    },
  };
}
