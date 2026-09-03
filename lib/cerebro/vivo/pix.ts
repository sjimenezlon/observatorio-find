import "server-only";
import { envolver, getJSON, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// PIX en vivo · Banco Central do Brasil (Olinda, API OData abierta, sin llave)
//
// Tres consultas. (1) La serie mensual de «Meios de Pagamentos» —Pix, TED,
// boleto y cheque— que es la estadística oficial y pesa dos kilobytes. (2) El
// desglose del último mes de «Estatísticas de transações Pix» (SPI): cómo se
// inicia cada pago y quién le paga a quién; solo se usan porcentajes porque su
// base (pagos liquidados en el SPI) no coincide con la de (1). (3) El registro
// de llaves (DICT) por institución en el último cierre de mes: la foto más
// honesta de quién tiene al usuario, porque una llave es una cuenta que se usa.
// Las dos últimas pesan cerca de 1 MB y se leen solo al regenerar la página.
// -----------------------------------------------------------------------------

const BASE = "https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata";
const MPV = "https://olinda.bcb.gov.br/olinda/servico/MPV_DadosAbertos/versao/v1/odata";

interface FilaMPV {
  AnoMes: string; // "202607"
  quantidadePix: number; // miles de transacciones
  valorPix: number; // millones de BRL
  quantidadeTED: number;
  quantidadeBoleto: number;
  quantidadeCheque: number;
}

interface FilaStat {
  AnoMes: number;
  QUANTIDADE: number;
  VALOR: number;
  FORMAINICIACAO?: string;
  NATUREZA?: string;
  PAG_PFPJ?: string;
}

interface FilaChave {
  Data: string;
  Nome: string;
  NaturezaUsuario: string;
  TipoChave: string;
  qtdChaves: number;
  Segmento: string;
}

export interface MesPix {
  anoMes: string; // "2026-08"
  transacciones: number;
  valorBRL: number;
  ted: number;
  boleto: number;
  cheque: number;
}

export interface PixVivo {
  serie: MesPix[];
  ultimo: MesPix;
  variacionMensualPct: number | null;
  variacionInteranualPct: number | null;
  porIniciacion: Array<{ forma: string; pct: number }>;
  porNaturaleza: Array<{ naturaleza: string; pct: number }>;
  pctPagadorPF: number;
  /** Pix como % de las transacciones Pix + TED + boleto + cheque del mes */
  pctPixInstrumentos: number;
  llaves: {
    fecha: string;
    total: number;
    porSegmento: Array<{ segmento: string; llaves: number; pct: number }>;
    topInstituciones: Array<{ nombre: string; llaves: number; pct: number; segmento: string }>;
    pctInstitucionesPago: number;
    porTipo: Array<{ tipo: string; pct: number }>;
  };
}

const INICIACION: Record<string, string> = {
  QRDN: "QR dinámico",
  QRES: "QR estático",
  DICT: "Llave (DICT)",
  MANU: "Manual",
  INIC: "Iniciador (open finance)",
  AUTO: "Automático",
  APDN: "QR dinámico (app)",
  APES: "QR estático (app)",
  "Nao disponivel": "Sin dato",
};

const NATURALEZA: Record<string, string> = {
  P2P: "Persona → persona",
  P2B: "Persona → comercio",
  B2B: "Empresa → empresa",
  B2P: "Empresa → persona",
  P2G: "Persona → gobierno",
  G2P: "Gobierno → persona",
  B2G: "Empresa → gobierno",
  G2B: "Gobierno → empresa",
  G2G: "Gobierno → gobierno",
};

function ym(d: Date): string {
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function cargarPix(): Promise<Vivo<PixVivo>> {
  return envolver({ nombre: "Banco Central do Brasil · dados abertos (Pix e Meios de Pagamentos)", url: `${BASE}/` }, async () => {
    const hoy = new Date();
    const desde = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - 14, 1));

    // 1 · serie mensual oficial (la API devuelve ese mes y los siguientes, en orden descendente)
    const serieRes = await getJSON<{ value: FilaMPV[] }>(
      `${MPV}/MeiosdePagamentosMensalDA(AnoMes=@AnoMes)?@AnoMes='${ym(desde)}'&$format=json`,
      { timeoutMs: 30_000, revalidate: 21_600 },
    );
    const serie: MesPix[] = serieRes.value
      .map((f) => ({
        anoMes: `${f.AnoMes.slice(0, 4)}-${f.AnoMes.slice(4)}`,
        transacciones: Math.round(f.quantidadePix * 1000),
        valorBRL: Math.round(f.valorPix * 1e6),
        ted: Math.round(f.quantidadeTED * 1000),
        boleto: Math.round(f.quantidadeBoleto * 1000),
        cheque: Math.round(f.quantidadeCheque * 1000),
      }))
      .sort((a, b) => a.anoMes.localeCompare(b.anoMes));
    if (!serie.length) throw new Error("la serie mensual llegó vacía");
    const ultimo = serie[serie.length - 1];
    const previo = serie.length >= 2 ? serie[serie.length - 2] : null;
    const hace12 = serie.length >= 13 ? serie[serie.length - 13] : null;
    const pct = (a: number, b: number | null | undefined) => (b ? Math.round(((a - b) / b) * 1000) / 10 : null);
    const mesUltimo = ultimo.anoMes.replace("-", "");

    // 2 · desglose del mismo mes (solo porcentajes) · 3 · llaves al último cierre de mes
    const corteLlaves = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 0));
    const [desgloseRes, llavesRes] = await Promise.all([
      getJSON<{ value: FilaStat[] }>(
        `${BASE}/EstatisticasTransacoesPix(Database=@Database)?@Database='${mesUltimo}'&$format=json&$select=AnoMes,QUANTIDADE,VALOR,FORMAINICIACAO,NATUREZA,PAG_PFPJ&$filter=AnoMes eq ${mesUltimo}`,
        { timeoutMs: 90_000, revalidate: 21_600 },
      ),
      getJSON<{ value: FilaChave[] }>(
        `${BASE}/ChavesPix(Data=@Data)?@Data='${corteLlaves.toISOString().slice(0, 10)}'&$format=json&$select=Data,Nome,NaturezaUsuario,TipoChave,qtdChaves,Segmento`,
        { timeoutMs: 90_000, revalidate: 21_600 },
      ),
    ]);

    const filas = desgloseRes.value.filter((f) => String(f.AnoMes) === mesUltimo);
    const total = filas.reduce((s, f) => s + f.QUANTIDADE, 0) || 1;
    const agrupar = (campo: "FORMAINICIACAO" | "NATUREZA" | "PAG_PFPJ") => {
      const m = new Map<string, number>();
      for (const f of filas) m.set(f[campo] ?? "?", (m.get(f[campo] ?? "?") ?? 0) + f.QUANTIDADE);
      return [...m.entries()].sort((a, b) => b[1] - a[1]);
    };
    const porIniciacion = agrupar("FORMAINICIACAO")
      .map(([k, v]) => ({ forma: INICIACION[k] ?? k, pct: Math.round((v / total) * 1000) / 10 }))
      .filter((x) => x.pct >= 0.1);
    const porNaturaleza = agrupar("NATUREZA")
      .map(([k, v]) => ({ naturaleza: NATURALEZA[k] ?? k, pct: Math.round((v / total) * 1000) / 10 }))
      .filter((x) => x.pct >= 0.1);
    const pf = agrupar("PAG_PFPJ").find(([k]) => k === "PF")?.[1] ?? 0;

    const fechas = [...new Set(llavesRes.value.map((r) => r.Data))].sort();
    const fechaLlaves = fechas[fechas.length - 1];
    const llavesFilas = llavesRes.value.filter((r) => r.Data === fechaLlaves);
    const totalLlaves = llavesFilas.reduce((s, r) => s + r.qtdChaves, 0) || 1;
    const seg = new Map<string, number>();
    const inst = new Map<string, { llaves: number; segmento: string }>();
    const tipo = new Map<string, number>();
    for (const r of llavesFilas) {
      seg.set(r.Segmento, (seg.get(r.Segmento) ?? 0) + r.qtdChaves);
      const i = inst.get(r.Nome) ?? { llaves: 0, segmento: r.Segmento };
      i.llaves += r.qtdChaves;
      inst.set(r.Nome, i);
      tipo.set(r.TipoChave, (tipo.get(r.TipoChave) ?? 0) + r.qtdChaves);
    }
    const p = (v: number) => Math.round((v / totalLlaves) * 1000) / 10;
    const porSegmento = [...seg.entries()].sort((a, b) => b[1] - a[1]).map(([segmento, llaves]) => ({ segmento, llaves, pct: p(llaves) }));
    const topInstituciones = [...inst.entries()]
      .sort((a, b) => b[1].llaves - a[1].llaves)
      .slice(0, 15)
      .map(([nombre, v]) => ({ nombre, llaves: v.llaves, pct: p(v.llaves), segmento: v.segmento }));
    const ip = [...seg.entries()].filter(([s]) => /Instituição de Pagamento/i.test(s)).reduce((s, [, v]) => s + v, 0);
    const instrumentos = ultimo.transacciones + ultimo.ted + ultimo.boleto + ultimo.cheque || 1;

    return {
      serie,
      ultimo,
      variacionMensualPct: pct(ultimo.transacciones, previo?.transacciones),
      variacionInteranualPct: pct(ultimo.transacciones, hace12?.transacciones),
      porIniciacion,
      porNaturaleza,
      pctPagadorPF: Math.round((pf / total) * 1000) / 10,
      pctPixInstrumentos: Math.round((ultimo.transacciones / instrumentos) * 1000) / 10,
      llaves: {
        fecha: fechaLlaves,
        total: totalLlaves,
        porSegmento,
        topInstituciones,
        pctInstitucionesPago: p(ip),
        porTipo: [...tipo.entries()].sort((a, b) => b[1] - a[1]).map(([t, v]) => ({ tipo: t, pct: p(v) })),
      },
    };
  });
}
