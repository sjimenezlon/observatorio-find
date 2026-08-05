import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

// -----------------------------------------------------------------------------
// Política de seguridad de contenido
//
// El sitio no llama a ningún dominio externo en tiempo de ejecución: los mapas
// son SVG pre-proyectados versionados como TypeScript y la tipografía la
// auto-hospeda next/font. Por eso la política puede ser 'self' en casi todo.
//
// 'unsafe-inline' en script-src es la concesión consciente: Next inyecta el
// payload de hidratación como script en línea, y firmarlo con nonce obligaría a
// renderizar cada página en dinámico. El riesgo que compensaría ese costo —XSS
// reflejado— no existe aquí: no hay backend, ni base de datos, ni formularios,
// ni un solo dato que venga del visitante.
// -----------------------------------------------------------------------------
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'", // Recharts y Tailwind escriben estilos en línea
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${dev ? " ws: wss:" : ""}`, // en dev, el HMR de Turbopack
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const cabeceras = [
  { key: "Content-Security-Policy", value: csp },

  // Nadie embebe este observatorio en un iframe: una copia enmarcada puede
  // presentarse como propia o alterar el contexto de las cifras.
  { key: "X-Frame-Options", value: "DENY" },

  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },

  // El sitio no necesita ninguna capacidad del dispositivo. Se apagan todas.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },

  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },

  // No delatar la versión del framework en cada respuesta.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: cabeceras }];
  },
};

export default nextConfig;
