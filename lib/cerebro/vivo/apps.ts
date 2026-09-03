import "server-only";
import { envolver, getJSON, type Vivo } from "./http";

// -----------------------------------------------------------------------------
// Ranking de apps de finanzas · App Store (RSS público de Apple)
//
// Top 25 gratuitas de la categoría Finanzas por país. Es adopción REVELADA, no
// declarada: nadie contesta una encuesta, la gente descarga. La clasificación
// banco / fintech / global es una heurística del Observatorio sobre el nombre
// del desarrollador y de la app; se muestra para que se pueda discutir.
// -----------------------------------------------------------------------------

export type ClaseApp = "fintech" | "banco" | "global" | "otro";

export interface AppRank {
  puesto: number;
  nombre: string;
  desarrollador: string;
  clase: ClaseApp;
  url: string;
}

export interface RankingPais {
  pais: string;
  apps: AppRank[];
  fintech: number; // cuántas de las 25
  banco: number;
  global: number;
  otro: number;
  top10Fintech: number;
}

const PAISES = ["CO", "MX", "BR", "AR", "CL", "PE", "UY", "EC", "GT", "DO", "PA", "CR", "BO", "PY", "SV", "HN"];

// Orden de evaluación: otro → global → digital → banco → fintech (por defecto).
// «Digital» va antes que «banco» para que una billetera de dueño bancario (Yape,
// DaviPlata, Deuna, MACH, Rutpay…) cuente como fintech: compite como fintech.

const RE_OTRO =
  /\b(porvenir|afp\b|afore|aforem[oó]vil|rap app|aportaciones|gestora|pensi[oó]n|pensiones|renta dignidad|infonavit|fgts|inss|caixa tem|dian\b|sat\b|sunat|sri\b|fel\b|hacienda|gobierno|tributaria|superintendencia|banco central|pluxee|sodexo|edenred|midatacr[eé]dito|experian|datacr[eé]dito|serasa|boa vista|apc\b|seguros?|insurance|metlife|mapfre|allianz|sura\b|colpatria|protecci[oó]n|colfondos|skandia|impuestos|receita|gov\.br|b3\b|cvm\b|contadores?|contabilidad|calculadora|presupuesto|budget|expense|money manager|controle de gastos|gastos|deudas|patrimonio|finanzas personales|splitwise|loter[ií]a|apuestas?|bet\b|casino|reniec|cuit|afip|arca\b|anses|mi argentina|tarjeta sube|sube\b|metro\b|transmilenio|peaje|servipag|sencillito|unired|pago f[aá]cil|rapipago|efecty|baloto|copec|ecopetrol|epm\b|enel|cfe\b|edesur|edenor|isapre|fonasa|eps\b|salud|sisben|colsubsidio|comfama|compensar|cafam|colsanitas|tuid|antel|habitanto|aseccss|solidarista|pass\b|token|llave digital|clave virtual|tarjeta de claves|c[oó]digo banrural|multipuntos|invitaci[oó]n|chivo)\b/i;

const RE_GLOBAL =
  /\b(binance|coinbase|paypal|iq option|okx|bybit|kraken|revolut|wise\b|western union|remitly|etoro|xtb|exness|trading|broker|br[oó]ker|libertex|quotex|pocket option|olymp|bitget|kucoin|crypto\.com|trust wallet|metamask|robinhood|interactive brokers|plus500|avatrade|payoneer|skrill|neteller|zelle|cash app|venmo|apple|google|samsung|huawei|tether|coinmarketcap|tradingview|investing\.com|moneygram|ria\b|xoom|metatrader|metaquotes|gocrypto|capital com)\b/i;

const RE_DIGITAL =
  /\b(nu\b|nubank|mercado pago|picpay|\binter\b|c6|neon|pagbank|pagseguro|will bank|\biti\b|plata\b|klar|stori|ual[aá]|brubank|naranja x|tenpo|mach\b|machbank|nequi|daviplata|yape|plin|deuna|yappy|tuapp|prex|lemon|dolarapp|arq\b|global66|takenos|astropay|cocos|modo\b|cuenta dni|bim\b|ligo|tunki|agora|izipay|niubiz|kushki|payphone|peigo|treinta|bold\b|addi|sistecr[eé]dito|rappipay|movii|dale\b|powwi|tpaga|kueski|aplazo|nelo|cashea|zinli|wally|mango|eko\b|ueno|toke|mio\b|qik|osmo|kash\b|n1co|tohkn|niu\b|infinitepay|cloudwalk|recargapay|pagaleve|maree|facio|99pay|stone|sumup|rutpay|hites pass|tapp\b|altoke|yasta|yolo pago|koin|bille\b|qr[aá]pido|za\$|el dorado|peso\b|wallbit|meru|openbank|punch|^io\b|\bio\b|sip\b|bipay|efectibank|kashin|doctor sol|takenos|midinero|miredpagos|pago despu[eé]s|paganza|abitab|crédito de la casa|gocuotas|iol\b|balanz|personal pay|claro pay|tigo money|spin by oxxo|cashi|didi|cartão magalu|mexdin|facio|morse|uglycash|wink\b|emma pay|monge pay|credisiman|multimoney|osmo|fri\b|akisi|blupy|vaquita|eclub|zigi|ub app|crediviva|billetera|wallet|neobanco|banco digital|cuenta digital|conta digital)\b/i;

const RE_BANCO =
  /\b(banco|bank|bancolombia|bbva|davivienda|ita[uú]|bradesco|santander|caixa|banorte|scotiabank|scotia|interbank|bcp\b|banistmo|bac\b|credomatic|citibanamex|banamex|hsbc|banregio|bancoestado|bci\b|banco estado|falabella|ripley|pichincha|guayaquil|produbanco|banreservas|popular|bnb\b|bisa\b|continental|galicia|macro\b|naci[oó]n|provincia|credicoop|supervielle|patagonia|hipotecario|ficohsa|atl[aá]ntida|agr[ií]cola|cuscatl[aá]n|promerica|lafise|caja social|occidente|av villas|agrario|bogot[aá]|bancoppel|azteca|afirme|banbaj[ií]o|invex|hey banco|banesco|global bank|bancamiga|mercantil|sicredi|sicoob|banrisul|brb\b|nordeste|amazonia|safra|btg|banpro|bam\b|g&t|industrial|coopeuch|mibanco|caja\b|cajas?\b|cooperativa|coop\w*|micoope|com[eé]dica|mutual|banco de chile|bice\b|security|citi|brou|banecuador|gnb\b|interbanco|bsc\b|banrural|bantrab|chn\b|apap\b|ademi|fondesa|bhd\b|bnf\b|sudameris|atlas\b|basa\b|solar\b|familiar|fie\b|bancosol|ganadero|bmsc|econ[oó]mico|uni[oó]n|austro|bolivariano|rumi[nñ]ahui|diners|pac[ií]fico|servicios financieros|financiera)\b/i;

function clasificar(nombre: string, dev: string): ClaseApp {
  const t = `${nombre} ${dev}`;
  if (RE_OTRO.test(t)) return "otro";
  if (RE_GLOBAL.test(t)) return "global";
  if (RE_DIGITAL.test(t)) return "fintech";
  if (RE_BANCO.test(t)) return "banco";
  return "fintech";
}

interface FeedApple {
  feed: {
    entry?: Array<{
      "im:name": { label: string };
      "im:artist": { label: string };
      id: { label: string };
    }>;
  };
}

export async function cargarApps(): Promise<Vivo<RankingPais[]>> {
  return envolver({ nombre: "Apple App Store · top gratuitas Finanzas", url: "https://www.apple.com/app-store/" }, async () => {
    const res = await Promise.allSettled(
      PAISES.map(async (p) => {
        const url = `https://itunes.apple.com/${p.toLowerCase()}/rss/topfreeapplications/limit=25/genre=6015/json`;
        const j = await getJSON<FeedApple>(url, { timeoutMs: 15_000, revalidate: 21_600 });
        const apps: AppRank[] = (j.feed.entry ?? []).map((e, i) => {
          const nombre = e["im:name"].label;
          const desarrollador = e["im:artist"].label;
          return { puesto: i + 1, nombre, desarrollador, clase: clasificar(nombre, desarrollador), url: e.id.label };
        });
        const cuenta = (c: ClaseApp, max = 25) => apps.filter((a) => a.puesto <= max && a.clase === c).length;
        return {
          pais: p,
          apps,
          fintech: cuenta("fintech"),
          banco: cuenta("banco"),
          global: cuenta("global"),
          otro: cuenta("otro"),
          top10Fintech: cuenta("fintech", 10),
        } satisfies RankingPais;
      }),
    );
    const ok = res.filter((r): r is PromiseFulfilledResult<RankingPais> => r.status === "fulfilled").map((r) => r.value);
    if (!ok.length) throw new Error("ningún país respondió");
    return ok;
  });
}
