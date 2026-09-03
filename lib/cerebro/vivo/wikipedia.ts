import "server-only";
import { envolver, getJSON, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// Atención pública · vistas de Wikipedia (API Wikimedia, abierta)
//
// Cuántas veces se consultó el artículo de cada marca o riel en los últimos 30
// días. No mide usuarios ni transacciones: mide curiosidad, y sirve para ver
// picos (un lanzamiento, un escándalo, una caída) antes de que salgan en los
// reportes. El título tiene que ser el exacto del artículo, con redirecciones
// resueltas; de lo contrario la API devuelve ceros sin avisar.
// -----------------------------------------------------------------------------

export interface Articulo {
  etiqueta: string;
  proyecto: "es.wikipedia" | "pt.wikipedia" | "en.wikipedia";
  titulo: string;
  pais: string;
}

export const ARTICULOS: Articulo[] = [
  { etiqueta: "Nubank (pt)", proyecto: "pt.wikipedia", titulo: "Nubank", pais: "BR" },
  { etiqueta: "Nubank (es)", proyecto: "es.wikipedia", titulo: "Nubank", pais: "BR" },
  { etiqueta: "Pix (pt)", proyecto: "pt.wikipedia", titulo: "Pix", pais: "BR" },
  { etiqueta: "PicPay (pt)", proyecto: "pt.wikipedia", titulo: "PicPay", pais: "BR" },
  { etiqueta: "Bre-B (es)", proyecto: "es.wikipedia", titulo: "Bre-B", pais: "CO" },
  { etiqueta: "Nequi (es)", proyecto: "es.wikipedia", titulo: "Nequi", pais: "CO" },
  { etiqueta: "Mercado Pago (es)", proyecto: "es.wikipedia", titulo: "Mercado_Pago", pais: "AR" },
  { etiqueta: "Ualá (es)", proyecto: "es.wikipedia", titulo: "Ualá", pais: "AR" },
  { etiqueta: "Bitso (es)", proyecto: "es.wikipedia", titulo: "Bitso", pais: "MX" },
  { etiqueta: "Yape (es)", proyecto: "es.wikipedia", titulo: "Yape", pais: "PE" },
  { etiqueta: "dLocal (en)", proyecto: "en.wikipedia", titulo: "DLocal", pais: "UY" },
  { etiqueta: "Tecnología financiera (es)", proyecto: "es.wikipedia", titulo: "Tecnología_financiera", pais: "REG" },
  { etiqueta: "Fintech (pt)", proyecto: "pt.wikipedia", titulo: "Fintech", pais: "BR" },
];

export interface Atencion extends Articulo {
  vistas30d: number;
  vistas7d: number;
  vistas7dPrevias: number;
  variacionSemanalPct: number | null;
  serie: number[]; // diario, 30 puntos
  url: string;
}

interface RespuestaPV {
  items?: Array<{ timestamp: string; views: number }>;
}

function fecha(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "") + "00";
}

export async function cargarAtencion(): Promise<Vivo<Atencion[]>> {
  return envolver({ nombre: "Wikimedia · Pageviews API", url: "https://wikimedia.org/api/rest_v1/" }, async () => {
    const fin = new Date();
    fin.setUTCDate(fin.getUTCDate() - 1); // el día de hoy aún no está consolidado
    const inicio = new Date(fin);
    inicio.setUTCDate(inicio.getUTCDate() - 29);
    const res = await Promise.allSettled(
      ARTICULOS.map(async (a): Promise<Atencion> => {
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${a.proyecto}/all-access/user/${encodeURIComponent(a.titulo)}/daily/${fecha(inicio)}/${fecha(fin)}`;
        const j = await getJSON<RespuestaPV>(url, { timeoutMs: 12_000, revalidate: 43_200 });
        const serie = (j.items ?? []).map((i) => i.views);
        const suma = (xs: number[]) => xs.reduce((s, v) => s + v, 0);
        const vistas7d = suma(serie.slice(-7));
        const vistas7dPrevias = suma(serie.slice(-14, -7));
        return {
          ...a,
          vistas30d: suma(serie),
          vistas7d,
          vistas7dPrevias,
          variacionSemanalPct: vistas7dPrevias ? Math.round(((vistas7d - vistas7dPrevias) / vistas7dPrevias) * 1000) / 10 : null,
          serie,
          url: `https://${a.proyecto}.org/wiki/${a.titulo}`,
        };
      }),
    );
    const ok = res.filter((r): r is PromiseFulfilledResult<Atencion> => r.status === "fulfilled").map((r) => r.value);
    if (!ok.length) throw new Error("ningún artículo respondió");
    return ok.sort((a, b) => b.vistas30d - a.vistas30d);
  });
}
