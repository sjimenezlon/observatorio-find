import "server-only";
import { cargarApps } from "./apps";
import { cargarAtencion } from "./wikipedia";
import { cargarBolsa } from "./bolsa";
import { cargarCripto } from "./cripto";
import { cargarNoticias } from "./noticias";
import { cargarPix } from "./pix";

/** Todas las señales vivas a la vez; cada una falla por separado. */
export async function cargarSenales() {
  const [noticias, apps, pix, bolsa, atencion, cripto] = await Promise.all([
    cargarNoticias(),
    cargarApps(),
    cargarPix(),
    cargarBolsa(),
    cargarAtencion(),
    cargarCripto(),
  ]);
  return { noticias, apps, pix, bolsa, atencion, cripto };
}

export type Senales = Awaited<ReturnType<typeof cargarSenales>>;
