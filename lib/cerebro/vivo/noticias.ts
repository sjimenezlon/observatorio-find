import "server-only";
import { envolver, etiqueta, getTexto, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// Pulso de noticias · Google News RSS
//
// Una consulta por país y cuatro temáticas, últimos 14 días. Google News no es
// una fuente citable: es un radar. Cada titular enlaza al medio que lo publicó
// y el nombre del medio va al lado, para que la cita se haga allá.
// -----------------------------------------------------------------------------

export type Tema = "inversion" | "regulacion" | "pagos" | "cripto" | "producto" | "general";

export interface Noticia {
  titulo: string;
  medio: string;
  url: string;
  fecha: string; // ISO
  pais: string; // código o "REG"
  tema: Tema;
}

interface Consulta {
  pais: string;
  q: string;
  hl: string;
  gl: string;
  ceid: string;
}

const CONSULTAS: Consulta[] = [
  { pais: "CO", q: "fintech colombia", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
  { pais: "MX", q: "fintech méxico", hl: "es-419", gl: "MX", ceid: "MX:es-419" },
  { pais: "BR", q: "fintech brasil", hl: "pt-BR", gl: "BR", ceid: "BR:pt-419" },
  { pais: "AR", q: "fintech argentina", hl: "es-419", gl: "AR", ceid: "AR:es-419" },
  { pais: "CL", q: "fintech chile", hl: "es-419", gl: "CL", ceid: "CL:es-419" },
  { pais: "PE", q: "fintech perú", hl: "es-419", gl: "PE", ceid: "PE:es-419" },
  { pais: "UY", q: "fintech uruguay", hl: "es-419", gl: "UY", ceid: "UY:es-419" },
  { pais: "EC", q: "fintech ecuador", hl: "es-419", gl: "EC", ceid: "EC:es-419" },
  { pais: "REG", q: "fintech latinoamérica OR latam", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
  { pais: "REG", q: "\"open finance\" OR \"finanzas abiertas\" latinoamérica", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
  { pais: "REG", q: "\"Bre-B\" OR \"Pix\" OR \"SPEI\" OR \"Transferencias 3.0\" pagos inmediatos", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
  { pais: "REG", q: "stablecoin OR cripto regulación latinoamérica", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
  { pais: "REG", q: "fintech ronda inversión latinoamérica", hl: "es-419", gl: "CO", ceid: "CO:es-419" },
];

const TEMAS: Array<[Tema, RegExp]> = [
  ["inversion", /\b(ronda|serie [a-e]\b|levant[aó]|inversi[oó]n|invest|funding|valuaci[oó]n|valoraci[oó]n|unicornio|IPO|adquiere|adquisici[oó]n|compra|fusi[oó]n|M&A|capital|aporte|rodada)\b/i],
  ["regulacion", /\b(regulaci[oó]n|regula|ley|decreto|superintendencia|banco central|SFC|CNBV|CMF|SBS|BCRA|BCB|Banxico|Banrep|licencia|sandbox|norma|resoluci[oó]n|circular|open finance|finanzas abiertas|sanci[oó]n|multa|congreso|proyecto de ley|regulação|lei\b)\b/i],
  ["pagos", /\b(pagos?|Bre-B|Pix|SPEI|CoDi|DiMo|Yape|Plin|transferencias?|billetera|wallet|QR|remesas?|adquirencia|tarjeta|pagamentos?)\b/i],
  ["cripto", /\b(cripto|crypto|bitcoin|stablecoin|USDT|USDC|blockchain|token|tokenizaci[oó]n|exchange|Drex|CBDC)\b/i],
  ["producto", /\b(lanza|lanzamiento|app|producto|cr[eé]dito|pr[eé]stamo|cuenta|tarjeta|neobanco|banco digital|usuarios|clientes|lança)\b/i],
];

function clasificar(titulo: string): Tema {
  for (const [tema, re] of TEMAS) if (re.test(titulo)) return tema;
  return "general";
}

function parsear(xml: string, pais: string): Noticia[] {
  const items = xml.split("<item>").slice(1);
  const out: Noticia[] = [];
  for (const it of items) {
    const tituloCrudo = etiqueta(it, "title");
    const medio = etiqueta(it, "source") || tituloCrudo.split(" - ").slice(-1)[0] || "";
    const titulo = tituloCrudo.replace(new RegExp(`\\s+-\\s+${medio.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`), "").trim();
    const url = etiqueta(it, "link");
    const fechaCruda = etiqueta(it, "pubDate");
    const fecha = fechaCruda ? new Date(fechaCruda).toISOString() : "";
    if (!titulo || !url || !fecha) continue;
    out.push({ titulo, medio, url, fecha, pais, tema: clasificar(titulo) });
  }
  return out;
}

export interface Pulso {
  noticias: Noticia[];
  porPais: Record<string, number>;
  porTema: Record<Tema, number>;
  medios: Array<{ medio: string; n: number }>;
  consultas: number;
  fallidas: number;
}

export async function cargarNoticias(): Promise<Vivo<Pulso>> {
  return envolver({ nombre: "Google News RSS", url: "https://news.google.com/" }, async () => {
    const resultados = await Promise.allSettled(
      CONSULTAS.map((c) => {
        const q = encodeURIComponent(`${c.q} when:14d`);
        const url = `https://news.google.com/rss/search?q=${q}&hl=${c.hl}&gl=${c.gl}&ceid=${c.ceid}`;
        return getTexto(url, { timeoutMs: 15_000, revalidate: 3600 }).then((xml) => parsear(xml, c.pais));
      }),
    );
    const vistos = new Set<string>();
    const noticias: Noticia[] = [];
    let fallidas = 0;
    for (const r of resultados) {
      if (r.status !== "fulfilled") {
        fallidas++;
        continue;
      }
      for (const n of r.value) {
        const clave = n.titulo.toLowerCase().replace(/[^a-z0-9áéíóúñ]+/g, " ").trim();
        if (vistos.has(clave)) continue;
        vistos.add(clave);
        noticias.push(n);
      }
    }
    noticias.sort((a, b) => b.fecha.localeCompare(a.fecha));

    const porPais: Record<string, number> = {};
    const porTema: Record<Tema, number> = { inversion: 0, regulacion: 0, pagos: 0, cripto: 0, producto: 0, general: 0 };
    const mediosMap = new Map<string, number>();
    for (const n of noticias) {
      porPais[n.pais] = (porPais[n.pais] ?? 0) + 1;
      porTema[n.tema]++;
      if (n.medio) mediosMap.set(n.medio, (mediosMap.get(n.medio) ?? 0) + 1);
    }
    const medios = [...mediosMap.entries()]
      .map(([medio, n]) => ({ medio, n }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 12);

    return { noticias: noticias.slice(0, 400), porPais, porTema, medios, consultas: CONSULTAS.length, fallidas };
  });
}
