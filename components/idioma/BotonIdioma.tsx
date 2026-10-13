"use client";

import { useEffect, useState } from "react";
import { idioma } from "./idioma";

/** Botón EN/ES de la barra. Recuerda la elección (localStorage) en todas las páginas. */
export default function BotonIdioma() {
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    const quitar = idioma.suscribir(setLang);
    if (idioma.guardado() === "en") void idioma.poner("en");
    return quitar;
  }, []);

  return (
    <button
      className="langbtn"
      type="button"
      data-noi18n
      aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
      onClick={() => void idioma.poner(lang === "en" ? "es" : "en")}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}
