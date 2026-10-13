// Cambio ES ↔ EN de todo el sitio, portado del prototipo: recorre el DOM y
// traduce texto y atributos con un diccionario (en.json, cargado a demanda).
// Lo que no está en el diccionario se queda en español. Las cifras cambian
// de formato (1.360,5 → 1,360.5) pero nunca de valor.

type Dic = Record<string, string>;

let D: Dic | null = null;
let lang: "es" | "en" = "es";
let busy = false;
let observador: MutationObserver | null = null;
let tituloOriginal = "";
const ORIG = new WeakMap<Node, string>();
const ATTR = ["placeholder", "aria-label", "title", "alt"];
const oyentes = new Set<(l: "es" | "en") => void>();

const swap = (x: string) =>
  x
    .replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1\u0001")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\u0001/g, ",");

const RX: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^(.+): (.+) en (.+)\. Abrir ficha$/, (m) => `${t1(m[1])}: ${m[2] === "sin dato publicado" ? "no published data" : swap(m[2])} in ${t1(m[3])}. Open profile`],
  [/^Le sirve para: (.+)$/, (m) => "Useful for: " + t1(m[1])],
  [/^(.+) sobre 100$/, (m) => `${t1(m[1])} out of 100`],
];

function t1(s: string): string {
  const d = D!;
  if (d[s] !== undefined) return d[s];
  for (const [re, f] of RX) {
    const m = s.match(re);
    if (m) return f(m);
  }
  let m = s.match(/^(\d+\.\s+)(.*)$/);
  if (m) return m[1] + t1(m[2]);
  for (const p of ["Abrir ", "Ver indicadores de "]) {
    if (s.startsWith(p) && s.length > p.length + 2 && d[p.trim()]) return d[p.trim()] + " " + t1(s.slice(p.length));
  }
  if (s.endsWith(" por país")) return t1(s.slice(0, -9)) + " by country";
  m = s.match(/^(.*?)(\s*:?\s*)([-+−▲▼]?\s?\d[\d.,]*\s?(?:%|pp|\/100|\/10|tx|US\$ M)?\s*(?:→)?)$/);
  if (m && m[1] && /[A-Za-zÁÉÍÓÚáéíóúñ]/.test(m[1])) {
    const h = t1(m[1]);
    if (h !== m[1] || d[m[1]] !== undefined) return h + m[2] + swap(m[3]);
  }
  m = s.match(/^([-+−▲▼]?\s?\d[\d.,]*%?\s+)(.+)$/);
  if (m) {
    const r = t1(m[2]);
    if (r !== m[2]) return swap(m[1]) + r;
  }
  return swap(s);
}

function tr(s: string): string {
  const core = s.replace(/\s+/g, " ").trim();
  if (!core) return s;
  const lead = /^\s/.test(s) ? " " : "";
  const trail = /\s$/.test(s) ? " " : "";
  let out: string;
  if (D![core] !== undefined) out = D![core];
  else if (core.includes(" · ") && core.length < 200) out = core.split(" · ").map(t1).join(" · ");
  else out = t1(core);
  return lead + out + trail;
}

const salta = (n: Node) => {
  const e = n.nodeType === 1 ? (n as Element) : n.parentElement;
  return !e || !!e.closest("script,style,[data-noi18n]");
};

function atributos(e: Element) {
  for (const a of ATTR) {
    if (!e.hasAttribute(a)) continue;
    const k = `data-o-${a}`;
    if (!e.hasAttribute(k)) e.setAttribute(k, e.getAttribute(a)!);
    const o = e.getAttribute(k)!;
    const v = lang === "en" ? tr(o) : o;
    if (e.getAttribute(a) !== v) e.setAttribute(a, v);
  }
}

function texto(n: Node) {
  if (salta(n)) return;
  if (!ORIG.has(n)) ORIG.set(n, n.nodeValue ?? "");
  const o = ORIG.get(n)!;
  const v = lang === "en" ? tr(o) : o;
  if (n.nodeValue !== v) n.nodeValue = v;
}

function nodo(n: Node) {
  if (n.nodeType === 3) return texto(n);
  if (n.nodeType !== 1 || salta(n)) return;
  atributos(n as Element);
  const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let c: Node | null;
  while ((c = w.nextNode())) {
    if (c.nodeType === 3) texto(c);
    else if (!salta(c)) atributos(c as Element);
  }
}

function observar(raiz: Element) {
  if (observador) return;
  observador = new MutationObserver((ms) => {
    if (busy) return;
    busy = true;
    for (const m of ms) {
      if (m.type === "characterData") {
        // React actualizó un texto: el nuevo valor es el original en español.
        ORIG.set(m.target, m.target.nodeValue ?? "");
        if (lang === "en") texto(m.target);
      } else if (m.type === "childList") {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 3) ORIG.set(n, n.nodeValue ?? "");
          else if (n.nodeType === 1) {
            const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
            let c: Node | null;
            while ((c = w.nextNode())) ORIG.set(c, c.nodeValue ?? "");
            [n as Element, ...(n as Element).querySelectorAll("*")].forEach((e) =>
              ATTR.forEach((a) => e.removeAttribute(`data-o-${a}`))
            );
          }
          if (lang === "en") nodo(n);
        });
      } else if (m.type === "attributes" && m.attributeName && ATTR.includes(m.attributeName)) {
        const e = m.target as Element;
        const k = `data-o-${m.attributeName}`;
        const actual = e.getAttribute(m.attributeName) ?? "";
        const esperado = lang === "en" ? tr(e.getAttribute(k) ?? "") : e.getAttribute(k);
        if (actual !== esperado) {
          e.setAttribute(k, actual);
          if (lang === "en") atributos(e);
        }
      }
    }
    observador!.takeRecords();
    busy = false;
  });
  observador.observe(raiz, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTR,
  });
}

export const idioma = {
  get lang() {
    return lang;
  },
  async poner(l: "es" | "en") {
    if (l === "en" && !D) {
      // en-prototipo: diccionario del diseño · en-portada: textos propios de la portada ·
      // en-sitio: páginas interiores (se regenera con scripts/textos-en.mjs).
      const [a, b, c] = await Promise.all([
        import("./en-prototipo.json"),
        import("./en-portada.json"),
        import("./en-sitio.json"),
      ]);
      D = { ...(a.default as Dic), ...(c.default as Dic), ...(b.default as Dic) };
    }
    lang = l;
    busy = true;
    document.documentElement.lang = l;
    observar(document.body);
    nodo(document.body);
    if (!tituloOriginal) tituloOriginal = document.title;
    document.title = l === "en" ? tr(tituloOriginal) : tituloOriginal;
    observador?.takeRecords();
    busy = false;
    try {
      localStorage.setItem("findLang", l);
    } catch {}
    oyentes.forEach((fn) => fn(l));
  },
  guardado(): "es" | "en" {
    try {
      return localStorage.getItem("findLang") === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  },
  suscribir(fn: (l: "es" | "en") => void) {
    oyentes.add(fn);
    return () => {
      oyentes.delete(fn);
    };
  },
  /** Al salir de la portada: volver a español y dejar de observar. */
  soltar() {
    if (lang === "en") {
      lang = "es";
      busy = true;
      nodo(document.body);
      busy = false;
    }
    document.documentElement.lang = "es";
    observador?.disconnect();
    observador = null;
  },
};
