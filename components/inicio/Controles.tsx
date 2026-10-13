"use client";

import { useEffect, useState } from "react";
import { idioma } from "./idioma";
import { sonido } from "./sonido";

/** Botones EN/ES y sonido de la barra, solo en la portada. */
export default function ControlesInicio() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [son, setSon] = useState(true);

  useEffect(() => {
    setSon(sonido.activo);
    const a = sonido.suscribir(setSon);
    const b = idioma.suscribir(setLang);
    if (idioma.guardado() === "en") void idioma.poner("en");
    return () => {
      a();
      b();
      idioma.soltar();
    };
  }, []);

  return (
    <>
      <button
        className="langbtn"
        type="button"
        data-noi18n
        aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
        onClick={() => void idioma.poner(lang === "en" ? "es" : "en")}
      >
        {lang === "en" ? "ES" : "EN"}
      </button>
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
          {son ? (
            <path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.5 5a7 7 0 0 1 0 10" />
          ) : (
            <path d="M13.5 8l4 4M17.5 8l-4 4" />
          )}
        </svg>
      </button>
    </>
  );
}
