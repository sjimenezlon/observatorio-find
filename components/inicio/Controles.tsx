"use client";

import { useEffect, useState } from "react";
import { sonido } from "./sonido";

/** Botón de sonido de la barra, solo en la portada (el de idioma está en todas). */
export default function ControlesInicio() {
  const [son, setSon] = useState(true);

  useEffect(() => {
    setSon(sonido.activo);
    return sonido.suscribir(setSon);
  }, []);

  return (
    <button
      className="navsound"
      type="button"
      data-noi18n
      aria-pressed={son}
      aria-label={son ? "Apagar el sonido" : "Activar el sonido"}
      onClick={() => sonido.activar(!son)}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M3 8v4h3l4 3V5L6 8H3z" fill="currentColor" />
        {son ? <path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.5 5a7 7 0 0 1 0 10" /> : <path d="M13.5 8l4 4M17.5 8l-4 4" />}
      </svg>
    </button>
  );
}
