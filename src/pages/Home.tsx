const plan: { label: string; done: boolean }[] = [
  { label: "Fase 0 · Shell del libro — tipografía, 22 capítulos, progreso local", done: true },
  { label: "Fase 1 · Motor de cinta de cuadros + playgrounds (sorting y arrays)", done: true },
  { label: "Fase 2 · Code playback con Python real (Pyodide + sys.settrace)", done: false },
  { label: "Fase 3 · IDE embebido + evaluador de problemas con tests ocultos", done: false },
  { label: "Fase 4 · Biblioteca de vis: árboles, grafos, heaps, recursión, matrices…", done: false },
  { label: "Fase 5 · Contenido de capítulos completo y pulido", done: false },
  { label: "Fase 6 · PWA offline + marcadores y notas", done: false },
];

const features = [
  {
    t: "Pausa al profe",
    b: "Toda visualización es una cinta de cuadros precomputada: reprodúcela, paúsala, retrocede y rascas la línea de tiempo como si fuera un video.",
  },
  {
    t: "Tus propios datos",
    b: "Introduce tu array o elige uno aleatorio: la cinta se genera al instante y te narra cada comparación y cada intercambio.",
  },
  {
    t: "Coste a la vista",
    b: "Cada cuadro cuenta comparaciones y escrituras para que el O(n²) deje de ser una abstracción y se convierta en observación.",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="kicker">v0.1 · fase 1 completada</div>
        <h1 className="serif">
          Aprende algoritmos <em>tocando</em> los números.
        </h1>
        <p className="lede">
          Un libro interactivo de Estructuras de Datos y Algoritmos construido sobre una idea sencilla:
          <strong> cada visualización es una cinta de cuadros</strong> que puedes reproducir, pausar,
          rebobinar y rasgar paso a paso. Nada corre en tiempo real — todo se precomputa, así que
          controlar el tiempo es gratis.
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#/chapter/sorting">▶ Probar la demo</a>
          <a className="btn" href="#/chapter/arrays">Ver capítulo Arrays</a>
          <a className="btn" href="#/code-playground">▶ Code Playback (Python)</a>
        </div>
        <div className="stats">
          <div className="stat"><b>22</b><span>capítulos planificados</span></div>
          <div className="stat"><b>2</b><span>playgrounds en vivo</span></div>
          <div className="stat"><b>3</b><span>algoritmos de sorting</span></div>
          <div className="stat"><b>0</b><span>registros ni tracking</span></div>
        </div>
      </header>

      <h2 className="serif section-h">¿Cómo funciona el motor?</h2>
      <pre className="snippet">{`function* bubbleSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    yield { array: a.slice(), compare: [i, i + 1],
            message: \`¿\${a[i]} > \${a[i + 1]}?\` };
  }
}

const frames = record(bubbleSort([7, 3, 9]));
// → la cinta es solo un array de frames: pausar y rebobinar son gratis.`}</pre>
      <div className="features">
        {features.map((f) => (
          <div className="feature" key={f.t}>
            <h3 className="serif">{f.t}</h3>
            <p>{f.b}</p>
          </div>
        ))}
      </div>

      <h2 className="serif section-h">Roadmap</h2>
      <ul className="roadmap">
        {plan.map((p) => (
          <li key={p.label} className={p.done ? "done" : ""}>{p.label}</li>
        ))}
      </ul>
      <p className="prose-note">
        Inspirado en cartesian.app — reconstruido con el mismo concepto, pero sobre una web abierta
        (React + Vite + Python/WASM en camino).
      </p>
    </>
  );
}
