import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Observatorio Find · IA Financiera LATAM",
  description:
    "Dataset y tablero público de benchmarking de la IA financiera en América Latina: adopción de IA, scoring e inclusión, fraude y AML, y tokenización. Métricas neutrales con metodología abierta. Universidad EAFIT.",
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
