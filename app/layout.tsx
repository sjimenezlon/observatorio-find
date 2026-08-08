import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://observatorio-find.vercel.app"),
  title: "Observatorio Find · Inteligencia Financiera LATAM",
  description:
    "Sistema público de evidencia para comparar inclusión, fintech, regulación, pagos, confianza y riesgo financiero en América Latina. Universidad EAFIT.",
  openGraph: {
    title: "Find · Inteligencia financiera latinoamericana",
    description:
      "Tres índices propios, fuentes trazables y metodología abierta. Corte agosto de 2026.",
    url: "/",
    siteName: "Observatorio Find",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-find-agosto-2026.png",
        width: 1734,
        height: 907,
        alt: "Observatorio Find: inteligencia financiera latinoamericana, medible y auditable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find · Inteligencia financiera latinoamericana",
    description: "Datos abiertos, índices auditables y benchmark regional. Corte agosto de 2026.",
    images: ["/og-find-agosto-2026.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${poppins.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
