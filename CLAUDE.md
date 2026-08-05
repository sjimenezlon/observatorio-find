# Observatorio Find — instrucciones de trabajo

Las convenciones de este repositorio viven en **[AGENTS.md](./AGENTS.md)**, un solo
documento compartido por Claude Code, Codex y quien trabaje aquí. Léelo antes de editar.

Lo mínimo que no se negocia:

1. **`git fetch origin` antes de editar.** Codex trabaja en paralelo sobre este mismo
   repositorio; editar sobre una copia vieja sobrescribe cifras verificadas.
2. **Nunca sobre `main`.** Rama con prefijo (`datos/`, `ui/`, `motor/`, `infra/`, `fix/`)
   y PR. `main` está protegida por *ruleset*.
3. **`npm run check` antes del PR** — tipos, integridad del dataset y build.
4. **Toda cifra declara fuente, URL https y año.** Fuente primaria, nunca prensa.
   `npm run verificar` lo bloquea si falta.
5. **`data/` y `lib/` los toca un solo agente a la vez.** Son archivos largos con
   estructuras literales: dos ediciones simultáneas chocan casi siempre.
6. **No despliegues con `vercel --prod`.** Vercel está conectado al repositorio.
