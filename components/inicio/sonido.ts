// Efectos de sonido del rediseño, sintetizados con Web Audio (sin archivos).
// Activados por defecto, como en el prototipo; el navegador solo deja sonar
// después de un gesto (Comenzar, o el primer clic). Se apagan desde la barra,
// desde el panel del héroe o con «Entrar sin sonido».

type Sonido = {
  activo: boolean;
  activar(v: boolean): void;
  desbloquear(): void;
  suscribir(fn: (v: boolean) => void): () => void;
  click(): void;
  tick(): void;
  whoosh(): void;
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambiente: GainNode | null = null;
let activo = true;
const oyentes = new Set<(v: boolean) => void>();

try {
  if (typeof window !== "undefined" && sessionStorage.getItem("findSonido") === "0") activo = false;
} catch {}
let ultimoTick = 0;

function iniciar() {
  if (ctx || typeof window === "undefined") return;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = activo ? 1 : 0;
    master.connect(ctx.destination);
  } catch {
    ctx = null;
  }
}

function tono(f1: number, f2: number, dur: number, vol: number, tipo: OscillatorType = "sine") {
  if (!ctx || !master || !activo) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(f1, t);
  o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function fondo() {
  if (!ctx || !master || ambiente) return;
  const t = ctx.currentTime;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.035, t + 3);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 700;
  [110, 164.8, 220.4].forEach((f, i) => {
    const o = ctx!.createOscillator();
    o.type = i === 1 ? "triangle" : "sine";
    o.frequency.value = f;
    o.detune.value = (i - 1) * 6;
    o.connect(lp);
    o.start();
  });
  const lfo = ctx.createOscillator();
  const lg = ctx.createGain();
  lfo.frequency.value = 0.07;
  lg.gain.value = 250;
  lfo.connect(lg);
  lg.connect(lp.frequency);
  lfo.start();
  lp.connect(g);
  g.connect(master);
  ambiente = g;
}

export const sonido: Sonido = {
  get activo() {
    return activo;
  },
  activar(v: boolean) {
    activo = v;
    try {
      sessionStorage.setItem("findSonido", v ? "1" : "0");
    } catch {}
    if (v) {
      iniciar();
      void ctx?.resume();
      fondo();
      tono(392, 784, 0.5, 0.05);
      setTimeout(() => tono(587, 1174, 0.6, 0.04), 120);
    }
    if (master && ctx) master.gain.setTargetAtTime(v ? 1 : 0, ctx.currentTime, 0.05);
    oyentes.forEach((fn) => fn(v));
  },
  /** Primer gesto de la persona: arranca el audio si el sonido está activo. */
  desbloquear() {
    if (!activo || ctx) return;
    iniciar();
    void (ctx as AudioContext | null)?.resume();
    fondo();
  },
  suscribir(fn) {
    oyentes.add(fn);
    return () => {
      oyentes.delete(fn);
    };
  },
  click() {
    tono(520, 880, 0.12, 0.06);
  },
  tick() {
    const n = performance.now();
    if (n - ultimoTick < 70) return;
    ultimoTick = n;
    tono(1500, 1200, 0.04, 0.012, "triangle");
  },
  whoosh() {
    if (!ctx || !master || !activo) return;
    const t = ctx.currentTime;
    const len = ctx.sampleRate * 0.6;
    const b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = ctx.createBufferSource();
    s.buffer = b;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + 0.5);
    const g = ctx.createGain();
    g.gain.value = 0.08;
    s.connect(bp);
    bp.connect(g);
    g.connect(master);
    s.start(t);
  },
};
