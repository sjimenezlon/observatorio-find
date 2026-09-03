import type { PixVivo as Datos } from "@/lib/cerebro/vivo/pix";
import { compacto, fecha, num, pct } from "@/lib/cerebro/formato";
import { Barra, Tile } from "./ui";

export default function PixVivo({ datos }: { datos: Datos }) {
  const max = Math.max(...datos.serie.map((m) => m.transacciones));
  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile valor={compacto(datos.ultimo.transacciones, 2)} etiqueta={`Transacciones · ${fecha(datos.ultimo.anoMes)}`} nota="Mes completo más reciente" tono="text-lime" />
        <Tile valor={pct(datos.variacionInteranualPct, 1, true)} etiqueta="Interanual" nota={datos.variacionMensualPct !== null ? `${pct(datos.variacionMensualPct, 1, true)} frente al mes anterior` : undefined} />
        <Tile valor={`R$ ${compacto(datos.ultimo.valorBRL, 2)}`} etiqueta="Valor movido en el mes" />
        <Tile valor={pct(datos.pctPixInstrumentos, 1)} etiqueta="Pix entre Pix, TED, boleto y cheque" nota="Del total de esas transacciones en el mes" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="card p-5">
          <div className="data-label text-muted">Serie mensual · transacciones Pix (Meios de Pagamentos, BCB)</div>
          <div className="mt-4 flex h-40 items-end gap-[3px]">
            {datos.serie.map((m) => (
              <div key={m.anoMes} className="group relative flex h-full flex-1 flex-col justify-end">
                <div
                  className="rounded-t-sm bg-lime/85 transition group-hover:bg-lime"
                  style={{ height: `${(m.transacciones / max) * 100}%` }}
                  title={`${fecha(m.anoMes)}: ${num(m.transacciones)} transacciones`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            <span>{fecha(datos.serie[0].anoMes)}</span>
            <span>{fecha(datos.ultimo.anoMes)}</span>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="data-label text-muted">Pix frente a los otros instrumentos · {fecha(datos.ultimo.anoMes)} · transacciones</div>
            {(() => {
              const u = datos.ultimo;
              const partes = [
                { k: "Pix", v: u.transacciones, c: "var(--lime)" },
                { k: "Boleto", v: u.boleto, c: "#78d8f5" },
                { k: "TED", v: u.ted, c: "#a99bff" },
                { k: "Cheque", v: u.cheque, c: "rgba(255,255,255,0.35)" },
              ];
              const tot = partes.reduce((s, x) => s + x.v, 0) || 1;
              return (
                <>
                  <div className="mt-3 flex h-[10px] w-full overflow-hidden rounded-full bg-white/10">
                    {partes.map((x) => (
                      <div key={x.k} style={{ width: `${(x.v / tot) * 100}%`, background: x.c }} title={`${x.k}: ${num(x.v)}`} />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
                    {partes.map((x) => (
                      <span key={x.k} className="inline-flex items-center gap-1.5">
                        <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: x.c }} />
                        {x.k} <span className="tabnum text-fg/85">{pct((x.v / tot) * 100, 1)}</span> · {compacto(x.v, 1)}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted">
                    Tarjetas no están en esta tabla del BCB (van en la estadística trimestral). Aun así, Pix ya mueve más transacciones que boleto, TED y cheque juntos.
                  </p>
                </>
              );
            })()}
          </div>
        </div>
        <div className="card space-y-3 p-5">
          <div className="data-label text-muted">Cómo se inicia un Pix · {fecha(datos.ultimo.anoMes)} · {pct(datos.pctPagadorPF, 1)} lo paga una persona</div>
          {datos.porIniciacion.slice(0, 6).map((f) => (
            <Barra key={f.forma} etiqueta={f.forma} pct={f.pct} />
          ))}
          <div className="data-label pt-3 text-muted">Quién le paga a quién</div>
          {datos.porNaturaleza.slice(0, 5).map((f) => (
            <Barra key={f.naturaleza} etiqueta={f.naturaleza} pct={f.pct} color="#78d8f5" />
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="card p-5">
          <div className="data-label text-muted">Llaves Pix registradas · {fecha(datos.llaves.fecha)}</div>
          <div className="tabnum mt-2 text-3xl font-extrabold tracking-[-0.04em]">{compacto(datos.llaves.total, 2)}</div>
          <p className="mt-2 text-xs leading-relaxed text-fg/75">
            <span className="font-semibold text-lime">{pct(datos.llaves.pctInstitucionesPago, 1)}</span> de las llaves están en instituciones de pago (fintechs con
            licencia del BCB), no en bancos. Una llave es una cuenta que la gente eligió para recibir dinero.
          </p>
          <div className="mt-4 space-y-2.5">
            {datos.llaves.porSegmento.slice(0, 6).map((s) => (
              <Barra key={s.segmento} etiqueta={s.segmento} pct={s.pct} valor={compacto(s.llaves, 1)} color="#a99bff" />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
            {datos.llaves.porTipo.map((t) => (
              <span key={t.tipo}>
                {t.tipo}: <span className="tabnum text-fg/80">{pct(t.pct, 1)}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <div className="data-label text-muted">Quién tiene al usuario · top 15 por llaves</div>
          <ol className="mt-4 space-y-2.5">
            {datos.llaves.topInstituciones.map((i, n) => (
              <li key={i.nombre} className="grid grid-cols-[1.4rem_minmax(0,1fr)] items-center gap-2">
                <span className="tabnum text-[11px] text-muted">{n + 1}</span>
                <Barra
                  etiqueta={i.nombre}
                  pct={i.pct}
                  valor={compacto(i.llaves, 1)}
                  ancho={datos.llaves.topInstituciones[0].pct}
                  color={/Instituição de Pagamento/i.test(i.segmento) ? "var(--lime)" : "#78d8f5"}
                />
              </li>
            ))}
          </ol>
          <div className="mt-3 flex gap-4 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-lime" /> Institución de pago</span>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#78d8f5]" /> Banco u otro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
