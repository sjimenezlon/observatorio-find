## Qué cambia y por qué

<!-- Una o dos frases. Si cambia una cifra publicada, di cuál era y cuál queda. -->

## Tipo

- [ ] Datos (`data/`) — cambia una cifra, una fuente o un corte
- [ ] Motor del índice (`lib/`) — cambia cómo se calcula
- [ ] Interfaz (`app/`, `components/`)
- [ ] Infraestructura (`.github/`, `next.config.ts`, dependencias)

## Si tocaste `data/` o `lib/`

- [ ] Cada cifra nueva o modificada declara **fuente, URL https y año**
- [ ] La fuente es **primaria** (API, PDF oficial, portal del emisor), no un agregado de prensa
- [ ] Si es cálculo propio, la operación está escrita en `desc` y marcada `derivado: true`
- [ ] Si es índice cualitativo, está marcado `construido: true` y la rúbrica está en `/metodologia`
- [ ] Si cambia el ranking, `SNAPSHOT_ANTERIOR` y `SNAPSHOT_COMPARABLE` quedan coherentes
- [ ] Si corrige una cifra ya publicada, queda anotada en `/metodologia#auditoria`

## Verificación

- [ ] `npm run check` pasa en local (tipos + integridad + build)
- [ ] Revisé la URL de *preview* que dejó Vercel en este PR

<!--
Recordatorio para agentes (Claude / Codex): `git fetch origin && git rebase origin/main`
ANTES de editar. Las convenciones completas están en AGENTS.md.
-->
