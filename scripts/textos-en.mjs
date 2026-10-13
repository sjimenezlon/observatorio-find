// =============================================================================
// Textos sin traducir al inglés.
//
// Recorre las rutas públicas con Chrome sin cabeza, abre pestañas, conmutadores
// y selectores, junta los textos visibles y los atributos accesibles, y lista
// los que no están en los diccionarios de components/idioma/. Correrlo después
// de un corte nuevo y traducir lo que salga en en-sitio.json.
//
//   npm run build && npx next start -p 3000      (en otra terminal)
//   npm run textos-en                             → scripts/salida/textos-sin-traducir.json
//
// Requiere Google Chrome instalado y Node 22+ (o node --experimental-websocket).
// =============================================================================
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const rutas = ["/", "/indice", "/dashboards", "/pagos", "/test", "/test#r=4523241352", "/roadmap", "/agenda", "/frontera", "/metodologia", "/presentacion", "/aliados"];
const chrome = spawn(CHROME, ["--headless=new","--remote-debugging-port=9334","--user-data-dir=/tmp/cdp-textos-"+Date.now(),"about:blank"], {stdio:"ignore"});
await new Promise(r=>setTimeout(r,2500));
const tabs = await (await fetch("http://127.0.0.1:9334/json")).json();
const ws = new WebSocket(tabs.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0; const pend=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}};
const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});
const ev=async(expr)=>(await send("Runtime.evaluate",{expression:expr,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Emulation.setDeviceMetricsOverride",{width:1400,height:900,deviceScaleFactor:1,mobile:false});
const COLECTA=`(()=>{const out=[];const seen=new Set();const add=t=>{t=t.replace(/\\s+/g,' ').trim();if(t.length<2||!/[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(t)||seen.has(t))return;seen.add(t);out.push(t)};
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||p.closest('script,style,noscript,[data-noi18n]'))continue;add(n.nodeValue)}
document.querySelectorAll('[placeholder],[aria-label],[title],img[alt]').forEach(e=>['placeholder','aria-label','title','alt'].forEach(a=>{const v=e.getAttribute(a);if(v)add(v)}));
document.querySelectorAll('select option').forEach(o=>add(o.textContent));add(document.title);return out})()`;
const todo={};
for (const r of rutas){
  await send("Page.navigate",{url:BASE+r});
  await new Promise(x=>setTimeout(x,4000));
  await ev(`try{sessionStorage.setItem('findIntro','1')}catch(e){}`);
  const lista=[...(await ev(COLECTA))];
  // estados: pulsar pestañas y botones conmutables, uno por uno
  const n = await ev(`document.querySelectorAll('[role=tab],button[aria-pressed],button[aria-selected],button[aria-expanded],details>summary').length`);
  for (let k=0;k<Math.min(n,160);k++){
    await ev(`(()=>{const b=document.querySelectorAll('[role=tab],button[aria-pressed],button[aria-selected],button[aria-expanded],details>summary')[${k}]; if(b && !b.closest('nav,.nav-find,.intro')) b.click();})()`);
    await new Promise(x=>setTimeout(x,120));
    for (const t of await ev(COLECTA)) if(!lista.includes(t)) lista.push(t);
  }
  // selects: recorrer opciones
  const ns = await ev(`document.querySelectorAll('select').length`);
  for (let s=0;s<ns;s++){
    const no = await ev(`document.querySelectorAll('select')[${s}].options.length`);
    for (let o=0;o<Math.min(no,25);o++){
      await ev(`(()=>{const el=document.querySelectorAll('select')[${s}];const set=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;set.call(el,el.options[${o}].value);el.dispatchEvent(new Event('change',{bubbles:true}));})()`);
      await new Promise(x=>setTimeout(x,120));
      for (const t of await ev(COLECTA)) if(!lista.includes(t)) lista.push(t);
    }
  }
  todo[r]=lista; console.log(r, lista.length);
}
const D = {};
for (const f of ["en-prototipo", "en-portada", "en-sitio"]) Object.assign(D, JSON.parse(readFileSync(new URL(`../components/idioma/${f}.json`, import.meta.url))));
const faltan = [];
const vistos = new Set();
for (const [ruta, lista] of Object.entries(todo))
  for (const es of lista) if (D[es] === undefined && /[a-záéíóúñ]{3,}/i.test(es) && !vistos.has(es)) { vistos.add(es); faltan.push({ ruta, es }); }
mkdirSync(new URL("./salida/", import.meta.url), { recursive: true });
writeFileSync(new URL("./salida/textos-sin-traducir.json", import.meta.url), JSON.stringify(faltan, null, 1));
console.log(`${faltan.length} textos sin traducir → scripts/salida/textos-sin-traducir.json`);
ws.close(); chrome.kill();
