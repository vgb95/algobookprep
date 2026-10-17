import { problems } from "../content/problems";

const plan: { label: string; done: boolean }[] = [
  { label: "Fase 0 · Shell del libro — tipografía, 22 capítulos, progreso local", done: true },
  { label: "Fase 1 · Motor de cinta de cuadros + playgrounds (sorting y arrays)", done: true },
  { label: "Fase 2 · Code playback con Python real (Pyodide + sys.settrace)", done: true },
  { label: "Fase 3 · IDE embebido + evaluador de problemas con tests ocultos", done: true },
  { label: "Fase 4 · Biblioteca de vis: árboles, grafos, heaps, recursión, matrices…", done: true },
  { label: "Fase 5 · Contenido de los 22 capítulos completo y pulido", done: true },
  { label: "Fase 6 · PWA offline + despliegue a GitHub Pages", done: true },
  { label: "Fase 7 · Banco de problemas: 55 ejercicios con editor, tests y solución progresiva", done: true },
  { label: "Fase 8 · Evaluador blindado (tiempo/pasos) + sección «En la entrevista» en los 22 capítulos", done: true },
  { label: "Fase 9 · Pulido final, QA completo y despliegue a GitHub Pages", done: true },
];

const features = [
  {
    t: "22 capítulos completos",
    b: "Teoría, fórmulas y visualizaciones interactivas para todo el temario de DSA: complejidad, arrays, hash tables, búsqueda, ordenado, strings, matrices, listas, pilas, colas, recursión, DP, árboles, heaps, BST, tries, grafos, algoritmos de grafos, union-find, MST, backtracking y operaciones a nivel de bit.",
  },
  {
    t: "Pausa al profe",
    b: "Toda visualización es una cinta de cuadros precomputada: reprodúcela, paúsala, retrocede y rasca la línea de tiempo como si fuera un video.",
  },
  {
    t: "Tus propios datos",
    b: "Introduce tu array o elige uno aleatorio: la cinta se genera al instante y te narra cada comparación y cada intercambio.",
  },
  {
    t: "Code Playback real",
    b: "Escribe Python, pulsa Run, y una traza real (sys.settrace sobre Pyodide/WASM) se convierte en una cinta de cuadros navegable — línea resaltada, variables en vivo y arrays dibujados como barras.",
  },
  {
    t: "En la entrevista",
    b: "Cada capítulo cierra con la capa de livecoding: cómo afrontar la familia de problemas, qué decir en voz alta al entrevistador, las variantes que te pueden poner y los giros de mitad de sesión.",
  },
  {
    t: "Evaluador de problemas",
    b: "Editor CodeMirror 6 con tests visibles y ocultos, traza paso a paso del test fallido y solución de referencia al resolverlo.",
  },
  {
    t: "PWA offline",
    b: "Instalable como app y usable sin internet gracias al service worker con precache de assets y runtime cache de Pyodide.",
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
          <div className="stat"><b>22</b><span>capítulos completos y en vivo</span></div>
          <div className="stat"><b>{problems.length}</b><span>problemas con tests</span></div>
          <div className="stat"><b>5</b><span>playgrounds interactivos</span></div>
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

      <div className="cta-row">
        <a className="btn primary" href="#/problems">
          ✦ Banco de problemas ({problems.length})
        </a>
        <a className="btn" href="#/code-playground">
          Laboratorio de código
        </a>
      </div>

      <h2 className="serif section-h">Roadmap</h2>
      <ul className="roadmap">
        {plan.map((p) => (
          <li key={p.label} className={p.done ? "done" : ""}>{p.label}</li>
        ))}
      </ul>
      <p className="prose-note">
        Inspirado en cartesian.app — reconstruido con el mismo concepto, sobre una web
        abierta (React + Vite + TypeScript + Pyodide/WASM). Los 22 capítulos están
        completos y funciona como PWA offline.
      </p>
    </>
  );
}
