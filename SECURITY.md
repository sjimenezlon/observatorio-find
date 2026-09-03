# Política de seguridad

Observatorio Find · IA Financiera LATAM — Universidad EAFIT
<https://observatorio-find.vercel.app>

## Qué hay y qué no hay en este repositorio

Este es un observatorio de datos públicos con una capa de trabajo privada (`/cerebro`).
La postura de seguridad se apoya en una decisión de diseño, no en un control: **el
repositorio no contiene datos personales, credenciales ni información privilegiada.**

- Todas las cifras publicadas provienen de fuentes primarias abiertas (Banco Mundial /
  Global Findex, BIS, bancos centrales, Basel Institute, Chainalysis, Finnovista,
  Cuántico VP) o son cálculos del Observatorio sobre esas cifras. Cada indicador declara
  fuente, URL y año en `data/dataset.ts`.
- No hay microdatos, ni respuestas individuales de encuesta, ni registros de personas.
  Los paneles trabajan sobre agregados nacionales ya publicados.
- No hay base de datos ni cuentas de usuario. El sitio público es estático y no recibe
  datos de nadie. La única entrada es el formulario de clave del Cerebro
  (`/api/cerebro/entrar`), que no guarda lo que recibe: compara y responde.
- Los dos únicos secretos (`CEREBRO_PW`, la clave compartida del Cerebro, y
  `CEREBRO_SECRET`, con el que se firman las sesiones) viven en Vercel como variables de
  entorno y **nunca** en el repositorio. Los datasets del Cerebro (`data/cerebro/`) son
  públicos como todo lo demás: la clave protege la interfaz, no los datos.
- Un intento fallido de entrada queda en el registro de Vercel con la IP y el agente del
  navegador; ese registro dura lo que Vercel retenga los logs y no se usa para nada más.

Si detectas cualquier archivo que contradiga lo anterior, eso *es* el incidente. Repórtalo.

## Reportar una vulnerabilidad

Escribe a **sjimenezlon@gmail.com** con el asunto `[seguridad] observatorio-find`.
Incluye qué encontraste, cómo reproducirlo y el impacto que le atribuyes.

- Respuesta inicial: dentro de los 5 días hábiles.
- No abras un *issue* público para vulnerabilidades explotables.
- Divulgación coordinada: se acuerda una fecha una vez haya corrección desplegada.

No hay programa de recompensas. Sí hay crédito público en el repositorio y en
`/metodologia` para quien reporte de buena fe.

## Reportar un error en los datos

Una cifra equivocada le hace más daño a un observatorio que un XSS. Si encuentras un
dato mal atribuido, desactualizado o mal calculado, abre un *issue* público con la
fuente primaria que lo contradice. **Se tratan con la misma prioridad que un fallo de
seguridad.**

Corregir a la vista es parte del método: las correcciones se publican en
`/metodologia#auditoria` con fecha, cifra anterior, cifra nueva y razón.

## Superficie de ataque y controles

| Superficie | Control |
| --- | --- |
| Código en `main` | Protegida por *ruleset*: sin push directo, sin force-push, sin borrado. Todo entra por PR. |
| Calidad de lo que entra | CI obligatorio: tipos, integridad del dataset y build de producción. Un PR que falle no se puede fusionar. |
| Cadena de suministro | `npm ci` sobre `package-lock.json`; Dependabot semanal para npm y para las propias GitHub Actions; alertas y parches automáticos activos. |
| Análisis estático | CodeQL (`security-extended`) en cada PR y semanalmente. |
| Secretos | *Secret scanning* con *push protection*: GitHub rechaza el push si detecta una credencial. `.gitignore` bloquea `.env*`, `.vercel/`, llaves y certificados. |
| Permisos de CI | `permissions: contents: read` por defecto; `security-events: write` solo en el job de CodeQL. `persist-credentials: false` en cada checkout. |
| Navegador | Cabeceras en `next.config.ts`: CSP, `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y HSTS. |
| Despliegue | Vercel conectado al repositorio: producción solo desde `main`; cada PR genera una URL de *preview* aislada. |
| Capa privada `/cerebro` | Compuerta en el servidor (`proxy.ts`): sin cookie válida no sale HTML, payload RSC ni API. Sesión firmada con HMAC y caducidad de 30 días, cookie `__Host-` httpOnly; clave comparada en tiempo constante; solo peticiones del propio origen; 10 intentos por minuto y por IP en el firewall de Vercel; `Cache-Control: private, no-store`; `npm run compuerta` lo comprueba desde fuera. |

## Dependencias: por qué son tan pocas

El proyecto corre con `next`, `react`, `react-dom` y `recharts`. Nada más en producción.

Los mapas son SVG pre-proyectados generados fuera de línea y versionados como TypeScript
(`data/mapa.ts`, `data/mapaLatam.ts`): no hay librería de mapas, ni tiles, ni peticiones a
terceros en tiempo de ejecución. **El sitio no llama a ningún dominio externo cuando lo
visitas.** Esa es también una decisión de privacidad para quien lo consulta.

`xlsx` (SheetJS) se retiró en agosto de 2026 por no usarse: era una dependencia servida
desde un tarball externo al registro de npm, que Dependabot no puede auditar.

## Alcance

Aplica a este repositorio y al sitio desplegado en `observatorio-find.vercel.app`.
Quedan fuera: la infraestructura de Vercel y GitHub (repórtales directamente) y los
sitios de las fuentes citadas.
