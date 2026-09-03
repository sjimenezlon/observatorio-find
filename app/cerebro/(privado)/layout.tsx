import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import CerebroNav from "@/components/cerebro/CerebroNav";

export const metadata: Metadata = {
  title: "Cerebro fintech LATAM · Observatorio Find",
  robots: { index: false, follow: false },
};

export default function CerebroLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <NavBar />
      <CerebroNav />
      {children}
      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Observatorio Find · Universidad EAFIT · Cerebro fintech LATAM (capa privada)</span>
          <div className="flex gap-4">
            <a className="hover:text-teal" href="/cerebro#metodo">Cómo se construye</a>
            <a className="hover:text-teal" href="/metodologia">Metodología del observatorio</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
