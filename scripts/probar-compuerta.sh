#!/usr/bin/env bash
# Comprueba la compuerta del Cerebro desde fuera, como lo haría un desconocido.
#
#   npm run compuerta                              → contra http://localhost:3000
#   npm run compuerta -- https://observatorio-find.vercel.app
#   CEREBRO_PW='…' npm run compuerta -- <url>      → además prueba la entrada con clave
#
# Que la interfaz pida clave no prueba nada: lo que prueba es que sin cookie
# el servidor no entregue ni HTML, ni payload RSC, ni respuestas de la API.
set -u
BASE="${1:-http://localhost:3000}"
fallos=0
CJ="$(mktemp)"
trap 'rm -f "$CJ"' EXIT

espera() { # espera <descripción> <esperado> <obtenido>
  if [ "$2" = "$3" ]; then printf '  ok    %-48s %s\n' "$1" "$3"; else printf '  FALLO %-48s esperaba %s, obtuvo %s\n' "$1" "$2" "$3"; fallos=$((fallos + 1)); fi
}
codigo() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

# Token con formato válido y caducidad futura, pero firmado con ceros: solo el secreto real abre.
FALSA="$(( ($(date +%s) + 86400) * 1000 )).0000000000000000000000000000000000000000000000000000000000000000"

echo "Compuerta del Cerebro · $BASE"
espera "GET /cerebro sin cookie"            307 "$(codigo "$BASE/cerebro")"
espera "GET /cerebro/jugadores sin cookie"  307 "$(codigo "$BASE/cerebro/jugadores")"
espera "GET /cerebro?_rsc= (payload RSC)"    307 "$(codigo "$BASE/cerebro?_rsc=x")"
espera "GET /cerebro/entrar (pública)"       200 "$(codigo "$BASE/cerebro/entrar")"
espera "POST /api/cerebro/salir sin cookie"  401 "$(codigo -X POST "$BASE/api/cerebro/salir")"
espera "POST entrar con clave mala"          303 "$(codigo -X POST -d 'clave=no-es' "$BASE/api/cerebro/entrar")"
espera "POST entrar desde otro origen"       403 "$(codigo -X POST -H 'Origin: https://otro.example' -d 'clave=no-es' "$BASE/api/cerebro/entrar")"
espera "POST entrar con clave vacía"         400 "$(codigo -X POST -d 'clave=' "$BASE/api/cerebro/entrar")"
espera "Cookie con firma falsa no abre"     307 "$(codigo -b "find_cerebro=$FALSA; __Host-find_cerebro=$FALSA" "$BASE/cerebro")"
espera "Cache-Control sin almacenar (entrada)"  "no-store" "$(curl -sI "$BASE/cerebro/entrar" | tr -d '\r' | awk -F': ' 'tolower($1)=="cache-control"{print $2}' | grep -o 'no-store')"

if [ -n "${CEREBRO_PW:-}" ]; then
  espera "POST entrar con la clave"          303 "$(codigo -c "$CJ" -X POST --data-urlencode "clave=$CEREBRO_PW" "$BASE/api/cerebro/entrar")"
  espera "GET /cerebro con cookie"           200 "$(codigo -b "$CJ" "$BASE/cerebro")"
  espera "GET /cerebro/paises con cookie"    200 "$(codigo -b "$CJ" "$BASE/cerebro/paises")"
  espera "POST salir con cookie"             303 "$(codigo -b "$CJ" -X POST "$BASE/api/cerebro/salir")"
else
  echo "  (sin CEREBRO_PW en el entorno: no se prueba la entrada con clave)"
fi

if [ "$fallos" -eq 0 ]; then echo "Compuerta verificada."; else echo "$fallos comprobación(es) fallaron."; exit 1; fi
