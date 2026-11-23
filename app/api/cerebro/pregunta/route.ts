import Anthropic from "@anthropic-ai/sdk";
import { ipCliente, mismoOrigen } from "@/lib/cerebro/sesion";
import { sistema } from "@/lib/cerebro/pregunta/contexto";
import { cotizar, simboloValido, type Cotizacion } from "@/lib/cerebro/pregunta/mercado";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

// -----------------------------------------------------------------------------
// «@findy» · preguntas al observatorio
//
// Vive bajo /api/cerebro, así que el proxy ya exigió la sesión antes de llegar
// aquí. La respuesta se transmite como NDJSON (una línea por evento):
//   {t:"texto", d}   fragmento de la respuesta
//   {t:"dato", c}    cotización consultada (para la tarjeta con su fuente)
//   {t:"error", m}   algo falló; el mensaje ya viene listo para mostrar
//   {t:"fin"}
// La llave del modelo (ANTHROPIC_API_KEY) solo existe en el servidor.
// -----------------------------------------------------------------------------

const MODELO = "claude-opus-5-5";
const MAX_TURNOS = 12;
const MAX_CARACTERES = 700;
const MAX_VUELTAS = 5;

type Turno = { rol: "usuario" | "findy"; texto: string };

const HERRAMIENTAS: Anthropic.Beta.BetaToolUnion[] = [
  {
    name: "cotizacion",
    description:
      "Consulta en Yahoo Finance el precio actual y la historia reciente de un activo: precio, moneda, variación del día, máximo y mínimo de 52 semanas, rendimiento a 1 mes, 3 meses, 1 año y 5 años, tasa anual compuesta y la peor caída de pico a valle del período. Úsala siempre que la pregunta mencione una acción, un ETF, un índice, una criptomoneda o un tipo de cambio, antes de dar cualquier cifra de mercado. Símbolos como los escribe Yahoo: acciones de EE. UU. por su ticker (NVDA, AAPL, NU, MELI), acciones colombianas con sufijo .CL (ECOPETROL.CL, CIB para Bancolombia en NYSE), índices con ^ (^GSPC para el S&P 500, ^IXIC Nasdaq), cripto contra dólar (BTC-USD, ETH-USD), monedas con =X (COP=X son pesos colombianos por dólar, MXN=X, BRL=X), oro GC=F. Puedes pedir varios símbolos a la vez con llamadas en paralelo.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        simbolo: { type: "string", description: "Símbolo de Yahoo Finance, por ejemplo NVDA, BTC-USD o COP=X." },
      },
      required: ["simbolo"],
      additionalProperties: false,
    },
  },
];

function leerTurnos(cuerpo: unknown): Turno[] | null {
  if (typeof cuerpo !== "object" || cuerpo === null) return null;
  const crudos = (cuerpo as { turnos?: unknown }).turnos;
  if (!Array.isArray(crudos) || crudos.length === 0 || crudos.length > MAX_TURNOS) return null;
  const turnos: Turno[] = [];
  for (const c of crudos) {
    if (typeof c !== "object" || c === null) return null;
    const { rol, texto } = c as { rol?: unknown; texto?: unknown };
    if ((rol !== "usuario" && rol !== "findy") || typeof texto !== "string") return null;
    const limpio = texto.trim();
    // Las respuestas de Findy pueden ser más largas que una pregunta; se acotan igual.
    if (!limpio || limpio.length > (rol === "usuario" ? MAX_CARACTERES : 6000)) return null;
    turnos.push({ rol, texto: limpio });
  }
  if (turnos[0].rol !== "usuario" || turnos[turnos.length - 1].rol !== "usuario") return null;
  return turnos;
}

function mensajeDeError(err: unknown): string {
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
    return "La llave del modelo no es válida. Hay que revisarla en la configuración del proyecto.";
  }
  if (err instanceof Anthropic.RateLimitError) return "Hay mucha fila en este momento. Intenta de nuevo en un minuto.";
  if (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500) {
    return "El modelo está ocupado en este momento. Intenta de nuevo en unos segundos.";
  }
  return "No pude terminar la respuesta. Intenta de nuevo.";
}

export async function POST(req: Request) {
  if (!mismoOrigen(req)) return Response.json({ error: "Origen no permitido" }, { status: 403 });

  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return Response.json({ error: "Petición inválida" }, { status: 400 });
  }
  const turnos = leerTurnos(cuerpo);
  if (!turnos) return Response.json({ error: "Pregunta inválida o demasiado larga" }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Findy todavía no tiene conectado el modelo: falta ANTHROPIC_API_KEY en el servidor." },
      { status: 503 },
    );
  }

  const cliente = new Anthropic();
  const mensajes: Anthropic.Beta.BetaMessageParam[] = turnos.map((t) => ({
    role: t.rol === "usuario" ? "user" : "assistant",
    content: t.texto,
  }));

  const codificador = new TextEncoder();
  const cuerpoRespuesta = new ReadableStream<Uint8Array>({
    async start(control) {
      const emitir = (evento: Record<string, unknown>) =>
        control.enqueue(codificador.encode(JSON.stringify(evento) + "\n"));

      try {
        let reintentos = 0;
        for (let vuelta = 0; vuelta < MAX_VUELTAS; vuelta++) {
          const flujo = cliente.beta.messages.stream(
            {
              model: MODELO,
              max_tokens: 16000,
              // Conversación corta y cercana: el esfuerzo bajo responde rápido y basta para la cuenta.
              output_config: { effort: "low" },
              // Si el modelo principal declina por sus filtros, la API reintenta en el de respaldo.
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default",
              system: [{ type: "text", text: sistema(), cache_control: { type: "ephemeral" } }],
              tools: HERRAMIENTAS,
              messages: mensajes,
            },
            { signal: req.signal },
          );
          flujo.on("text", (d) => emitir({ t: "texto", d }));

          let mensaje: Anthropic.Beta.BetaMessage;
          try {
            mensaje = await flujo.finalMessage();
          } catch (err) {
            // Un corte de conexión a mitad de respuesta se reintenta; los errores de la API no.
            if (err instanceof Anthropic.APIError || reintentos++ >= 1) throw err;
            vuelta--;
            continue;
          }

          if (mensaje.stop_reason === "refusal") {
            emitir({ t: "texto", d: "Esa no te la puedo responder. Pregúntame de plata, mercados o de lo que mide el Observatorio." });
            break;
          }
          if (mensaje.stop_reason === "pause_turn") {
            mensajes.push({ role: "assistant", content: mensaje.content });
            continue;
          }

          const llamadas = mensaje.content.filter(
            (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use",
          );
          if (llamadas.length === 0 || mensaje.stop_reason === "max_tokens") break;

          mensajes.push({ role: "assistant", content: mensaje.content });

          const resultados = await Promise.all(
            llamadas.map(async (ll): Promise<Anthropic.Beta.BetaToolResultBlockParam> => {
              const simbolo = (ll.input as { simbolo?: unknown }).simbolo;
              if (ll.name !== "cotizacion" || typeof simbolo !== "string" || !simboloValido(simbolo.trim().toUpperCase().replace(/^\$/, ""))) {
                return { type: "tool_result", tool_use_id: ll.id, is_error: true, content: "Símbolo no válido. Usa el formato de Yahoo Finance (NVDA, BTC-USD, COP=X)." };
              }
              try {
                const c: Cotizacion = await cotizar(simbolo);
                emitir({ t: "dato", c });
                return { type: "tool_result", tool_use_id: ll.id, content: JSON.stringify(c) };
              } catch (err) {
                const m = err instanceof Error ? err.message : "sin respuesta";
                return { type: "tool_result", tool_use_id: ll.id, is_error: true, content: `No se pudo consultar ${simbolo}: ${m}` };
              }
            }),
          );
          // Todos los resultados van en un solo mensaje.
          mensajes.push({ role: "user", content: resultados });
          // Si el texto sigue después de consultar, que no quede pegado al anterior.
          if (mensaje.content.some((b) => b.type === "text" && b.text.trim())) emitir({ t: "texto", d: "\n\n" });
        }
      } catch (err) {
        if (!req.signal.aborted) {
          console.error("[find] fallo al responder", { ip: ipCliente(req), error: err instanceof Error ? err.message : String(err) });
          emitir({ t: "error", m: mensajeDeError(err) });
        }
      } finally {
        try {
          emitir({ t: "fin" });
          control.close();
        } catch {
          // el cliente ya cerró la conexión
        }
      }
    },
  });

  return new Response(cuerpoRespuesta, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
