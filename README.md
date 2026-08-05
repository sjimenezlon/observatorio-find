# Observatorio Find · IA Financiera LATAM

**<https://observatorio-find.vercel.app>**

Medición independiente, citable y reproducible de la madurez de las finanzas
emergentes en América Latina. Universidad EAFIT.

Las consultoras venden reportes, los gremios abogan por sus miembros y los proveedores
inflan sus casos. No existía una medición neutral de la región. Ese vacío es la razón
de ser de este observatorio.

---

## Qué mide

| Índice | Qué responde | Alcance |
| --- | --- | --- |
| **IMIAF** | ¿Qué tan madura es la infraestructura financiera de cada país? | 6 pilares · 17 indicadores · 6 países |
| **ICF** | ¿Confía la gente lo suficiente como para *usarla*? | 4 dimensiones · 8 indicadores · 21 economías |
| **ICF-S** | ¿Confía toda la gente por igual? | 3 dimensiones · 4 indicadores · 108 observaciones país×segmento |

Los tres normalizan min–max **relativo al panel medido**: un puntaje solo tiene sentido
frente a los otros países del mismo corte, no como escala absoluta.

**Ranking IMIAF, corte de julio de 2026 (pesos iguales):**
Brasil 85,9 · Chile 60,0 · Argentina 48,0 · México 32,6 · Perú 24,9 · Colombia 19,7.

## Tres hallazgos

- **Madurez no es confianza.** Colombia queda última en el IMIAF de seis y última entre
  las 16 economías medibles del ICF. Construir el riel no basta si nadie lo usa.
- **La desconfianza casi no se declara.** Solo el 2,7 % de los colombianos que pagan en
  efectivo dice desconfiar de lo digital; el 94 % lo hace por costumbre. El freno es
  hábito y aceptación en el comercio, no miedo.
- **Adopción sin autoría normativa.** De las 32 medidas regulatorias que están
  definiendo el futuro de estos rieles, ninguna es colombiana y solo una es brasileña.
  La región lidera el mundo en pagos inmediatos por habitante y no escribe casi ninguna
  de las reglas que van a gobernarlos.

## Cómo se construye

Cada cifra declara **fuente, URL y año**. Las fuentes son primarias: API del Banco
Mundial (Global Findex 2025), BIS Red Book, Basel AML Index, Chainalysis, Finnovista,
Cuántico VP y los bancos centrales de los seis países.

Tres marcas separan lo medido de lo construido, y el validador las hace cumplir:

- sin marca → dato de un tercero, con su cita
- `derivado: true` → aritmética del Observatorio, con la operación escrita
- `construido: true` → índice cualitativo con rúbrica publicada en `/metodologia`

Las correcciones se publican con fecha, cifra anterior, cifra nueva y razón en
`/metodologia#auditoria`. Corregir a la vista es parte del método.

## Rutas

`/` ranking, mapa y anclas · `/presentacion` qué es y qué hace ·
`/pagos` pilar de pagos y confianza · `/frontera` radar regulatorio y prospectiva ·
`/agenda` los 20 indicadores por construir · `/roadmap` hoja de ruta Colombia ·
`/metodologia` cómo se calcula todo, con la auditoría

## Desarrollo

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # tipos + integridad del dataset + build
```

`npm run verificar` comprueba que toda cifra tenga fuente, URL https y año, que los
índices calculen, que las reglas de cobertura se respeten y que nada esté marcado a la
vez como construido y derivado. Corre en CI y **bloquea el merge**.

## Contribuir

Las convenciones están en **[AGENTS.md](./AGENTS.md)** — valen igual para personas y
para agentes de código. `main` está protegida: todo entra por PR con el CI en verde.

**Un dato equivocado le hace más daño a un observatorio que un fallo de seguridad.** Si
encuentras una cifra mal atribuida o mal calculada, abre un *issue* con la fuente
primaria que la contradice. Ver [SECURITY.md](./SECURITY.md).

## Licencia

Código MIT · Datos CC BY 4.0. Los datos de terceros conservan la licencia de su fuente
original. Ver [LICENSE](./LICENSE).

> Observatorio Find · IA Financiera LATAM (2026). Universidad EAFIT.
> Índice IMIAF v4.2, corte de julio de 2026. https://observatorio-find.vercel.app
