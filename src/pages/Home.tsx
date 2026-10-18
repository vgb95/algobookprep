import { problems } from "../content/problems";
import { useI18n } from "../engine/i18n";
import { solvedCount } from "../engine/solved";

const plan: { label: string; labelEn: string; done: boolean }[] = [
  { label: "Fase 0 · Shell del libro — tipografía, 22 capítulos, progreso local", labelEn: "Phase 0 · Book shell — typography, 22 chapters, local progress", done: true },
  { label: "Fase 1 · Motor de cinta de cuadros + playgrounds (sorting y arrays)", labelEn: "Phase 1 · Frame-tape engine + playgrounds (sorting and arrays)", done: true },
  { label: "Fase 2 · Code playback con Python real (Pyodide + sys.settrace)", labelEn: "Phase 2 · Code playback with real Python (Pyodide + sys.settrace)", done: true },
  { label: "Fase 3 · IDE embebido + evaluador de problemas con tests ocultos", labelEn: "Phase 3 · Embedded IDE + problem evaluator with hidden tests", done: true },
  { label: "Fase 4 · Biblioteca de vis: árboles, grafos, heaps, recursión, matrices…", labelEn: "Phase 4 · Viz library: trees, graphs, heaps, recursion, matrices…", done: true },
  { label: "Fase 5 · Contenido de los 22 capítulos completo y pulido", labelEn: "Phase 5 · Content for all 22 chapters complete and polished", done: true },
  { label: "Fase 6 · PWA offline + despliegue a GitHub Pages", labelEn: "Phase 6 · Offline PWA + GitHub Pages deploy", done: true },
  { label: "Fase 7 · Banco de problemas: 67 ejercicios con editor, tests y solución progresiva", labelEn: "Phase 7 · Problem bank: 67 exercises with editor, tests and progressive solution", done: true },
  { label: "Fase 8 · Evaluador blindado (tiempo/pasos) + sección «En la entrevista» en los 22 capítulos", labelEn: "Phase 8 · Hardened evaluator (time/steps) + «In the interview» section in all 22 chapters", done: true },
  { label: "Fase 9 · Pulido final, QA completo y despliegue a GitHub Pages", labelEn: "Phase 9 · Final polish, full QA and GitHub Pages deploy", done: true },
];

export default function HomePage() {
  const { lang, t } = useI18n();

  const features = lang === "en"
    ? [
        {
          t: "22 chapters, complete",
          b: "Theory, formulas and interactive visualizations for the whole DSA syllabus: complexity, arrays, hash tables, search, sorting, strings, matrices, lists, stacks, queues, recursion, DP, trees, heaps, BST, tries, graphs, graph algorithms, union-find, MST, backtracking and bit operations.",
        },
        {
          t: "Pause the professor",
          b: "Every visualization is a precomputed frame tape: play it, pause it, rewind it and scratch the timeline as if it were a video.",
        },
        {
          t: "Your own data",
          b: "Type your array or pick a random one: the tape is generated on the spot and narrates every comparison and every swap.",
        },
        {
          t: "Real Code Playback",
          b: "Write Python, hit Run, and a real trace (sys.settrace over Pyodide/WASM) becomes a scrubbable frame tape — highlighted line, live variables and arrays drawn as bars.",
        },
        {
          t: "In the interview",
          b: "Every chapter closes with the livecoding layer: how to approach the problem family, what to say out loud to the interviewer, the variants you may be handed, and the mid-session twists.",
        },
        {
          t: "Problem evaluator",
          b: "CodeMirror 6 editor with visible and hidden tests, a step-by-step trace of the failing test, and the reference solution once you solve it.",
        },
        {
          t: "Offline PWA",
          b: "Installable as an app and usable without internet thanks to a service worker with asset precache and runtime caching of Pyodide.",
        },
      ]
    : [
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

  return (
    <>
      <header className="hero">
        <div className="kicker">{lang === "en" ? "v0.1 · phase 1 complete" : "v0.1 · fase 1 completada"}</div>
        <h1 className="serif">
          {lang === "en" ? (
            <>Learn algorithms by <em>touching</em> the numbers.</>
          ) : (
            <>Aprende algoritmos <em>tocando</em> los números.</>
          )}
        </h1>
        <p className="lede">
          {lang === "en" ? (
            <>
              An interactive Data Structures &amp; Algorithms book built on one simple idea:{" "}
              <strong>every visualization is a frame tape</strong> you can play, pause, rewind
              and scratch step by step. Nothing runs in real time — everything is precomputed,
              so controlling time is free.
            </>
          ) : (
            <>
              Un libro interactivo de Estructuras de Datos y Algoritmos construido sobre una idea sencilla:{" "}
              <strong>cada visualización es una cinta de cuadros</strong> que puedes reproducir, pausar,
              rebobinar y rasgar paso a paso. Nada corre en tiempo real — todo se precomputa, así que
              controlar el tiempo es gratis.
            </>
          )}
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#/chapter/sorting">{t("home.ctaDemo")}</a>
          <a className="btn" href="#/chapter/arrays">{t("home.ctaArrays")}</a>
          <a className="btn" href="#/code-playground">▶ Code Playback (Python)</a>
        </div>
        <div className="stats">
          <div className="stat"><b>22</b><span>{t("home.statChapters")}</span></div>
          <div className="stat"><b>{problems.length}</b><span>{t("home.statProblems")}</span></div>
          <div className="stat"><b>5</b><span>{t("home.statPlaygrounds")}</span></div>
          <div className="stat"><b>{solvedCount()}</b><span>{t("home.statTracking")}</span></div>
        </div>
      </header>

      <h2 className="serif section-h">{t("home.engineH")}</h2>
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
          {t("home.ctaBank", { n: problems.length })}
        </a>
        <a className="btn" href="#/code-playground">
          {t("home.ctaLab")}
        </a>
      </div>

      <h2 className="serif section-h">Roadmap</h2>
      <ul className="roadmap">
        {plan.map((p) => (
          <li key={p.label} className={p.done ? "done" : ""}>{lang === "en" ? p.labelEn : p.label}</li>
        ))}
      </ul>
      <p className="prose-note">
        {lang === "en" ? (
          <>
            Inspired by cartesian.app — rebuilt with the same concept, on an open web
            (React + Vite + TypeScript + Pyodide/WASM). All 22 chapters are complete
            and it works as an offline PWA.
          </>
        ) : (
          <>
            Inspirado en cartesian.app — reconstruido con el mismo concepto, sobre una web
            abierta (React + Vite + TypeScript + Pyodide/WASM). Los 22 capítulos están
            completos y funciona como PWA offline.
          </>
        )}
      </p>
    </>
  );
}
