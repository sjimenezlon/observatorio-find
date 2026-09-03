# Cómo se trabaja en este repositorio

Instrucciones para cualquier agente de código —Codex, Claude Code o el que venga— y
para cualquier persona. **Claude Code lee este archivo a través de `CLAUDE.md`, que
apunta aquí. Un solo documento, una sola convención.**

---

## 1 · Qué es esto

El **Observatorio Find · IA Financiera LATAM** (Universidad EAFIT) mide la madurez de
las finanzas emergentes en América Latina con tres índices propios:

- **IMIAF** — 6 pilares, 17 indicadores, 6 países.
- **ICF** — Índice de Confianza Financiera, 4 dimensiones, 8 indicadores, 21 economías.
- **ICF-S** — el mismo en versión reducida, desagregado por género, ingreso y territorio.

Sitio: <https://observatorio-find.vercel.app> · Stack: Next.js 16 · React 19 ·
Tailwind v4 · Recharts. Sin backend, sin base de datos, sin autenticación.

**La regla que gobierna todo lo demás:** este observatorio existe porque nadie más
produce una medición neutral y citable de la región. Su único activo es la
credibilidad. Una cifra sin fuente verificable no vale nada aquí, por bien que se vea.

---

## 2 · Antes de tocar nada

```bash
git fetch origin
git switch -c <rama>          # nunca trabajes sobre main
npm ci
```

**Sincroniza siempre antes de editar.** Claude y Codex trabajan en paralelo sobre este
repositorio: editar sobre una copia vieja produce conflictos que se resuelven mal y
sobrescriben cifras verificadas. Si tu rama lleva rato abierta, `git fetch origin &&
git rebase origin/main` antes de seguir.

`main` está protegida: no acepta push directo, ni force-push, ni borrado. Todo entra
por Pull Request con el CI en verde.

### Convención de ramas

| Prefijo | Para qué |
| --- | --- |
| `datos/` | Cifras, fuentes, cortes nuevos |
| `ui/` | Componentes, páginas, estilos |
| `motor/` | `lib/` — cómo se calculan los índices |
| `infra/` | CI, dependencias, configuración, seguridad |
| `fix/` | Correcciones puntuales |

Añade tu firma al nombre cuando haya trabajo simultáneo: `datos/codex-corte-agosto`,
`ui/claude-presentacion`. Así se ve de un vistazo quién tiene qué abierto.

### Reparto para no chocar

Cuando Claude y Codex trabajen a la vez, repartan por **zona de archivo**, no por tarea:

- `data/` y `lib/` — un solo agente a la vez. Son archivos largos con estructuras
  literales; dos ediciones simultáneas casi siempre chocan.
- `components/` y `app/` — se pueden repartir por archivo sin problema.
- `.github/`, `next.config.ts`, `package.json` — un solo agente a la vez.

---

## 3 · La regla de oro de los datos

**Toda cifra publicada declara fuente, URL https y año.** Sin excepción. `npm run
verificar` lo comprueba y bloquea el merge.

### Jerarquía de fuentes

1. **API o dataset oficial** (API del Banco Mundial, datos abiertos del banco central).
2. **PDF o portal oficial del emisor** (BIS, Basel Institute, SFC, Banrep, BCB).
3. **Reporte de la firma que produjo el dato** (Finnovista, Cuántico VP, Chainalysis).
4. **Prensa** — solo como pista para ir a buscar la fuente primaria. Nunca como cita.

La auditoría de julio de 2026 dejó esta lección por escrito: **los agregados de prensa
y las cifras de segunda mano son los que fallan.** Un «+24 % según KPMG» citado por un
medio resultó ser un −8,9 % en el informe original. Un benchmark «40 % vs 78 % (WEF)»
que circulaba por todas partes simplemente no existía en el reporte.

### Tres marcas que no se pueden confundir

| Marca | Qué significa | Qué exige |
| --- | --- | --- |
| *(ninguna)* | Dato medido por un tercero | Cita a la fuente primaria |
| `derivado: true` | Aritmética del Observatorio sobre cifras publicadas | La operación escrita en `desc` |
| `construido: true` | Índice cualitativo con rúbrica del Observatorio | La rúbrica publicada en `/metodologia` |

Nunca las dos últimas a la vez. El validador lo rechaza.

### Trampas que ya nos costaron una corrección

- **Un pico no es un promedio.** Bre-B se anualizó con los 5,2 M de transacciones del
  31 de enero —último día de mes, día de pago— en vez de los 5 M/día corrientes.
  Resultado: 46 pagos por adulto en vez de 44. Antes de anualizar una cifra diaria,
  averigua si es promedio o récord.
- **Un índice de los más baratos no es el promedio.** El costo de remesas se publicó en
  3,29 % usando el índice SmaRT, que solo mide los servicios más baratos de cada
  corredor. El promedio real de enviar US$200 es 6,36 %.
- **Dos fuentes que se contradicen pueden tener razón las dos.** 96,3 % de adultos con
  producto financiero (SFC, registros administrativos) frente a 57,1 % que declara tener
  cuenta (Findex, encuesta) no es un error: la brecha *es* el hallazgo. No las restes;
  explica por qué difieren.
- **Un dato ausente se escribe `null`, no se omite.** Omitir el país rompe la
  normalización en silencio.

### Publicar un corte nuevo

1. Copia los puntajes salientes a `SNAPSHOT_ANTERIOR` con su fecha.
2. Si la metodología cambió (pilar nuevo, indicador nuevo), pon
   `SNAPSHOT_COMPARABLE = false`: los deltas mezclarían datos con método y eso hay que
   avisarlo en pantalla.
3. Actualiza `META.version` y `META.curado`.
4. Anota en `/metodologia#auditoria` toda cifra que **corrija** una ya publicada:
   fecha, valor anterior, valor nuevo, razón. Corregir a la vista es parte del método.

---

## 4 · Antes de abrir el PR

```bash
npm run check     # tipos + integridad del dataset + build de producción
```

Los tres tienen que pasar. El CI corre exactamente lo mismo, así que si falla allá es
porque no lo corriste aquí.

En el PR:

- Título en español, en imperativo: `Actualizar el pilar de pagos con el corte de agosto`.
- Llena la plantilla. Las casillas de datos no son decorativas.
- Revisa la URL de *preview* que Vercel deja en el PR antes de pedir el merge.
- Merge por *squash*. La rama se borra sola.

---

## 5 · Estilo

**Código.** TypeScript estricto, sin `any`. Componentes de servidor por defecto;
`"use client"` solo donde de verdad hay interacción. Tailwind con los tokens de
`globals.css` (`text-fg`, `text-muted`, `text-teal`, `text-lime`), no colores sueltos.
La interfaz sigue la identidad FIND: violeta `#5538FC` · lima `#F0FF29` · negro
`#101010` · blanco `#FFFFFF`, con Inter y cápsulas redondeadas. Los colores adicionales
de las visualizaciones conservan su función semántica y deben distinguirse bajo
deuteranopía.

**Prosa.** El sitio está en español y se escribe para alguien inteligente que no es del
gremio: un regulador, un periodista, un decano. Frases con sujeto y verbo. Cifras con
coma decimal y punto de miles (`87,5` · `43.900`). Ninguna afirmación sin su cifra
detrás, ninguna cifra sin su fuente.

Lo que no se hace: adjetivos que no midan nada («revolucionario», «disruptivo»),
titulares que la cifra no sostiene, y presentar una estimación como si fuera un dato.

**Dependencias.** No añadas ninguna sin justificarla en el PR. El sitio no hace ni una
petición a un dominio externo en tiempo de ejecución, y eso es deliberado: los mapas son
SVG pre-proyectados versionados como TypeScript, no una librería de tiles. Mantenlo así.

**Secretos.** No hay ninguno y no debe haberlo. Nada de `.env` versionado, nada de claves
en el código. Ver `SECURITY.md`.

---

## 6 · Mapa del repositorio

```
app/                 Rutas. Cada page.tsx es servidor salvo que diga lo contrario.
  page.tsx           Home: hero, anclas, pilares, ranking, mapa, fuentes
  presentacion/      Qué es y qué hace el observatorio (deck público)
  aliados/           Interledger Foundation: por qué es el aliado natural
  pagos/             Pilar de pagos + ICF + panel LATAM
  frontera/          Radar regulatorio, prospectiva, tendencias, brechas Colombia
  agenda/            Los 5 focos del Centro y los 20 indicadores por construir
  roadmap/           Hoja de ruta fintech Colombia en 3 horizontes
  metodologia/       Cómo se construye todo, con la auditoría publicada

components/          Interfaz. Los que llevan "use client" son los interactivos.
data/                EL ACTIVO. Cifras verificadas con fuente. Trátalo con cuidado.
lib/                 Motores de índice: index.ts (IMIAF), confianza.ts (ICF),
                     segmentos.ts (ICF-S).
scripts/             verificar-datos.ts — el guardián de la integridad.
```

---

## 7 · Despliegue

Vercel está conectado al repositorio. `main` despliega a producción; cada PR genera su
*preview*. **No despliegues a mano con `vercel --prod`**: saltarse el repositorio deja
producción y `main` desincronizados, que es exactamente el problema que la conexión
resuelve.

Los commits deben ir con la identidad de GitHub de Santiago
(`sjimenezlon@gmail.com`). Un autor que Vercel no reconoce deja el despliegue en estado
`BLOCKED` sin logs, y parece un build colgado en cola.

## 8 · El Cerebro (`/cerebro`) — la capa privada

Rutas `/cerebro/*` y `/api/cerebro/*`. Es el mismo observatorio, con dos diferencias
deliberadas y acotadas a esa carpeta:

**Compuerta en el servidor.** `proxy.ts` (raíz) exige una cookie httpOnly cuyo valor es
un HMAC de `CEREBRO_SECRET`; la clave se compara en `/api/cerebro/entrar` en tiempo
constante contra `CEREBRO_PW`. Las dos variables viven en Vercel (producción, preview y
desarrollo) y en `.env.local`, nunca en el código. Rotar `CEREBRO_SECRET` cierra todas
las sesiones. Las páginas del Cerebro son estáticas con regeneración (ISR): el proxy
decide antes de servir el HTML o el payload RSC, así que sin cookie no sale nada.
Comprobación honesta: `curl -sI https://observatorio-find.vercel.app/cerebro` debe
responder 307 a `/cerebro/entrar`. Que el formulario pida clave no prueba nada.

Lo que la clave NO protege: los datasets curados (`data/cerebro/*.ts`) están en este
repositorio, que es público. La compuerta es de interfaz, no de datos. No pongas ahí
nada que no pueda ser público.

**Señales vivas (excepción a la regla de «ningún dominio externo»).** `lib/cerebro/vivo/`
consulta seis APIs abiertas —Google News RSS, App Store RSS, BCB Olinda (Pix y Meios de
Pagamentos), Yahoo Finance + SEC EDGAR, Wikimedia Pageviews, CoinGecko— **solo desde el
servidor y solo al regenerar la página** (cada 30–60 min). El navegador sigue sin hacer
una sola petición externa; la CSP no cambia. Reglas para tocar esa carpeta:

- Nunca `cache: "no-store"`: vuelve dinámica la página y las señales se pedirían en cada
  visita (ya pasó; el build lo delata con `ƒ /cerebro`). Usa `revalidate`.
- Toda carga pasa por `envolver()`: devuelve `{ ok:false, error }` y la sección lo dice.
  Ninguna señal se rellena a mano ni con el último valor bueno.
- Las respuestas de más de 2 MB no entran en la caché de datos de Next; se toleran porque
  solo corren al regenerar. Reduce con `$select`/`$filter` antes de añadir otra.
- Las señales vivas no son cifras del observatorio: se muestran con su fuente y su hora,
  y no alimentan ningún índice.

**Datasets curados.** `data/cerebro/{jugadores,inversion,paises,biblioteca}.ts` se generan
por script desde los JSON de investigación y los verifica `scripts/verificar-cerebro.ts`
(dentro de `npm run verificar`): fuente + URL https + fecha válida por cifra, `null` para
lo que no se pudo verificar, códigos de país y segmento cerrados en `data/cerebro/tipos.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
