// =============================================================================
// Datos de la portada, armados en el servidor a partir del dataset y del motor.
// Nada aquí se escribe a mano: un corte nuevo en data/dataset.ts actualiza la
// portada sola. La capa editorial (textos de uso, perfiles, bitácora) vive en
// data/explorador.ts.
// =============================================================================

import {
  ANCLAS,
  CC,
  INDICADORES,
  META,
  PAISES,
  PILARES,
  PilarKey,
} from "@/data/dataset";
import { BITACORA, FICHAS, PERFILES, PILAR_UI } from "@/data/explorador";
import { banda, calcularIndice, normalizarIndicador } from "@/lib/index";
import { LATAM } from "@/data/latam";

export interface DatoPais {
  valor: number | null;
  /** Texto de un valor censurado («>20»); si existe, se muestra en lugar del número. */
  cota?: string;
  norm: number | null;
  anio: number;
  fuente: string;
  url: string;
  nota?: string;
}

export interface IndicadorInicio {
  key: string;
  pilar: PilarKey;
  label: string;
  corto: string;
  unidad: string;
  mayorEsMejor: boolean;
  desc: string;
  sirve: string;
  claves: string;
  tipo: "tercero" | "derivado" | "construido";
  fuente: string;
  url: string;
  anio: number;
  paises: Record<CC, DatoPais>;
}

export interface PilarInicio {
  key: PilarKey;
  nombre: string;
  corto: string;
  color: string;
  orbita: string;
  n: number;
}

export interface FilaRanking {
  code: CC;
  nombre: string;
  indice: number;
  banda: string;
}

export interface DatosInicio {
  paises: { code: CC; nombre: string }[];
  pilares: PilarInicio[];
  indicadores: IndicadorInicio[];
  ranking: FilaRanking[];
  senales: { valor: string; texto: string; emisor: string; url: string; anio: number }[];
  bitacora: typeof BITACORA;
  perfiles: typeof PERFILES;
  meta: {
    version: string;
    curado: string;
    auditoria: string;
    paises: number;
    indicadores: number;
    pilares: number;
    economiasICF: number;
  };
}

/** «Inclusión & scoring» → «Inclusión y scoring». */
const conY = (s: string) => s.replace(/\s*&\s*/g, " y ");

export function datosInicio(): DatosInicio {
  const pilares: PilarInicio[] = PILARES.map((p) => ({
    key: p.key,
    nombre: conY(p.nombre),
    corto: PILAR_UI[p.key].corto,
    color: PILAR_UI[p.key].color,
    orbita: PILAR_UI[p.key].orbita,
    n: INDICADORES.filter((i) => i.pilar === p.key).length,
  }));

  const indicadores: IndicadorInicio[] = INDICADORES.map((ind) => {
    const ed = FICHAS[ind.key];
    if (!ed) throw new Error(`Falta la ficha editorial de «${ind.key}» en data/explorador.ts`);
    const norm = normalizarIndicador(ind);
    const paises = {} as Record<CC, DatoPais>;
    for (const p of PAISES) {
      const o = ind.overrides?.[p.code];
      paises[p.code] = {
        valor: ind.valores[p.code],
        cota: ind.cotas?.[p.code],
        norm: norm[p.code],
        anio: o?.anio ?? ind.anio,
        fuente: o?.fuente ?? ind.fuente,
        url: o?.url ?? ind.url,
        nota: o?.nota,
      };
    }
    return {
      key: ind.key,
      pilar: ind.pilar,
      label: ind.label,
      corto: ed.corto,
      unidad: ed.unidad,
      mayorEsMejor: ind.direccion === "higher",
      desc: ind.desc,
      sirve: ed.sirve,
      claves: ed.claves,
      tipo: ind.construido ? "construido" : ind.derivado ? "derivado" : "tercero",
      fuente: ind.fuente,
      url: ind.url,
      anio: ind.anio,
      paises,
    };
  });

  const nombre = (c: CC) => PAISES.find((p) => p.code === c)!.nombre;
  const ranking = calcularIndice().map((f) => ({
    code: f.code,
    nombre: nombre(f.code),
    indice: f.indice,
    banda: banda(f.indice).label,
  }));

  const senales = ANCLAS.map((a) => ({
    valor: a.valor,
    texto: a.corto ?? a.label,
    emisor: a.emisor ?? a.fuente,
    url: a.url,
    anio: a.anio,
  }));

  return {
    paises: PAISES.map((p) => ({ code: p.code, nombre: p.nombre })),
    pilares,
    indicadores,
    ranking,
    senales,
    bitacora: BITACORA,
    perfiles: PERFILES,
    meta: {
      version: META.version,
      curado: META.curado,
      auditoria: META.auditoria,
      paises: PAISES.length,
      indicadores: META.indicadores,
      pilares: META.pilares,
      economiasICF: LATAM.length,
    },
  };
}
