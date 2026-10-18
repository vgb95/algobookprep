/**
 * i18n mínimo del libro: ES por defecto, EN como alternativa.
 *
 * Diseño:
 *  - Provider global con `lang` en localStorage (clave "lang").
 *  - Diccionario plano para etiquetas cortas de UI (ES es la referencia;
 *    EN debe cubrir TODAS las claves — tsc lo obliga).
 *  - Los textos largos (features, roadmap, ledes) van inline bilingües
 *    en cada página: se autorian juntos y se auditan juntos.
 *  - El contenido de capítulos/problemas se traduce por fases: cada
 *    bloque prose acepta `textEn` y cada capítulo reporta si ya está
 *    completo (chapterTranslated). Si falta, se muestra un aviso.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const ES = {
  "lang.aria": "Idioma",
  "sidebar.problems": "Problemas",
  "sidebar.brandSub": "manual interactivo de DSA",
  "sidebar.problemBank": "Banco de problemas",
  "sidebar.foot": "AlgoBook v0.4 · {n} capítulos · PWA offline",
  "sidebar.read": "completado",
  "sidebar.dotLive": "demo interactiva — pendiente",
  "sidebar.dotSoon": "próximamente",
  "home.ctaDemo": "▶ Probar la demo",
  "home.ctaArrays": "Ver capítulo Arrays",
  "home.ctaBank": "✦ Banco de problemas ({n})",
  "home.ctaLab": "Laboratorio de código",
  "home.statChapters": "capítulos completos y en vivo",
  "home.statProblems": "problemas con tests",
  "home.statPlaygrounds": "playgrounds interactivos",
  "home.statTracking": "registros ni tracking",
  "home.engineH": "¿Cómo funciona el motor?",
  "chapter.kickerLive": "capítulo interactivo",
  "chapter.kickerSoon": "capítulo {n} · próximamente",
  "chapter.notFoundTitle": "Capítulo no encontrado",
  "chapter.notFoundBody": "Ese capítulo no existe (todavía).",
  "chapter.backHome": "← Volver a portada",
  "chapter.markRead": "Marcar como leído",
  "chapter.markedRead": "✓ leído — desmarcar",
  "chapter.soonTitle": "En construcción 🚧",
  "chapter.soonBody":
    "Este capítulo llega cuando el motor de visualizaciones crezca. Mientras tanto, el capítulo de sorting enseña el patrón entero del libro.",
  "chapter.soonCta": "Ver la demo que ya funciona →",
  "chapter.pagerHome": "portada",
  "chapter.interviewH": "En la entrevista",
  "chapter.interviewCom": "Cómo conducir la conversación",
  "chapter.interviewVar": "Variantes que te pueden poner",
  "chapter.interviewChg": "Giros a mitad de la entrevista",
  "chapter.bannerEn":
    "Traducción en curso: mientras llega la versión inglesa completa, el cuerpo del capítulo se muestra en español.",
  "problems.kicker": "práctica",
  "problems.h1": "Banco de problemas",
  "problems.lede":
    "{n} problemas con tests visibles y ocultos, pistas progresivas y solución de referencia que se desbloquea al resolverlos.",
  "problems.statEasy": "fáciles",
  "problems.statMedium": "medios",
  "problems.statHard": "difíciles",
  "problems.statChapters": "capítulos cubiertos",
  "problems.chap": "cap. {n}",
  "problem.notFoundTitle": "Problema no encontrado",
  "problem.notFoundBody": "Ese problema no existe todavía.",
  "problem.backToBank": "← Ver el banco de problemas",
  "problem.kickerA": "problema · cap.",
  "problem.moreChapter": "más del capítulo:",
  "problem.tabStatement": "Enunciado",
  "problem.tabHints": "Pistas",
  "problem.tabSolution": "Solución",
  "problem.tabSolved": "✓ solución",
  "problem.run": "▶ Ejecutar tests",
  "problem.running": "Ejecutando…",
  "problem.reset": "↺ reiniciar código",
  "problem.allPass": "✓ todos los tests pasan",
  "problem.testsH": "Tests",
  "problem.expected": "esperado:",
  "problem.got": "obtuviste:",
  "problem.hidden": "(oculto)",
  "problem.viewTrace": "ver traza paso a paso",
  "problem.hiddenFail": "falla — los datos del test oculto no se revelan",
  "problem.runHint": "Pulsa «Ejecutar tests» para comprobar tu solución.",
  "problem.output": "Salida:",
  "problem.hintsTitle": "Pistas progresivas",
  "problem.hintsIntro":
    "Intenta resolverlo con la primera antes de pedir la siguiente — cada una destapa solo una capa del razonamiento.",
  "problem.hintN": "pista {n}",
  "problem.moreHint": "+ otra pista ({a}/{b})",
  "problem.lastHint":
    "Era la última pista — ya tienes todo lo que necesita la solución.",
  "problem.solvedH": "✓ Resuelto — así lo hace la referencia",
  "problem.tradeoffLabel": "Tradeoff:",
  "problem.refCode": "Ver código de referencia",
  "problem.lockedH": "Solución bloqueada",
  "problem.lockedBody":
    "Pasa todos los tests para desbloquear la explicación, el tradeoff y el código de referencia. Si te atascas, tienes {n} pistas en la pestaña «Pistas».",
  "problem.goEditor": "Ir al editor",
  "problem.traceKicker": "Traza del test: {name}",
  "problem.closeTrace": "cerrar traza",
  "problem.traceError":
    "no se pudo dibujar la traza — tu código lanza un error o supera el límite de pasos antes de terminar este test",
  "problem.errPrefix": "Error:",
  "problem.tracePrefix": "Traza:",
  "problem.diffEasy": "fácil",
  "problem.diffMedium": "medio",
  "problem.diffHard": "difícil",
  "playground.note":
    "Cada línea ejecutada se graba como un frame de la cinta. El código corre en Python real (Pyodide/WASM) dentro de tu pestaña.",
  "playground.codeLabel": "código python",
  "playground.run": "▶ Run (traza)",
  "playground.running": "Ejecutando…",
  "playground.stdin": "entrada (stdin)",
  "playground.stdinPh":
    "Solo si tu código usa input(): una línea por cada llamada",
  "playground.lineExecuted": "Línea {n} ejecutada.",
  "playground.lineExecutedShort": "Línea {n} ejecutada",
  "playground.output": "Salida:",
  "playground.frames": "frames: {n}",
  "playground.arrays": "arrays: {list}",
  "playground.showArray": "mostrar array",
} as const;

export type I18nKey = keyof typeof ES;

const EN: Record<I18nKey, string> = {
  "lang.aria": "Language",
  "sidebar.problems": "Problems",
  "sidebar.brandSub": "interactive DSA handbook",
  "sidebar.problemBank": "Problem bank",
  "sidebar.foot": "AlgoBook v0.4 · {n} chapters · offline PWA",
  "sidebar.read": "done",
  "sidebar.dotLive": "interactive demo — pending",
  "sidebar.dotSoon": "coming soon",
  "home.ctaDemo": "▶ Try the demo",
  "home.ctaArrays": "See the Arrays chapter",
  "home.ctaBank": "✦ Problem bank ({n})",
  "home.ctaLab": "Code lab",
  "home.statChapters": "chapters complete and live",
  "home.statProblems": "problems with tests",
  "home.statPlaygrounds": "interactive playgrounds",
  "home.statTracking": "logins or tracking",
  "home.engineH": "How does the engine work?",
  "chapter.kickerLive": "interactive chapter",
  "chapter.kickerSoon": "chapter {n} · coming soon",
  "chapter.notFoundTitle": "Chapter not found",
  "chapter.notFoundBody": "That chapter doesn't exist (yet).",
  "chapter.backHome": "← Back to cover",
  "chapter.markRead": "Mark as read",
  "chapter.markedRead": "✓ read — unmark",
  "chapter.soonTitle": "Under construction 🚧",
  "chapter.soonBody":
    "This chapter arrives as the visualization engine grows. Meanwhile, the sorting chapter teaches the whole pattern of the book.",
  "chapter.soonCta": "See the working demo →",
  "chapter.pagerHome": "cover",
  "chapter.interviewH": "In the interview",
  "chapter.interviewCom": "How to steer the conversation",
  "chapter.interviewVar": "Variants you may be given",
  "chapter.interviewChg": "Mid-interview twists",
  "chapter.bannerEn":
    "Translation in progress: until the full English version lands, the chapter body is shown in Spanish.",
  "problems.kicker": "practice",
  "problems.h1": "Problem bank",
  "problems.lede":
    "{n} problems with visible and hidden tests, progressive hints, and a reference solution that unlocks when you solve them.",
  "problems.statEasy": "easy",
  "problems.statMedium": "medium",
  "problems.statHard": "hard",
  "problems.statChapters": "chapters covered",
  "problems.chap": "ch. {n}",
  "problem.notFoundTitle": "Problem not found",
  "problem.notFoundBody": "That problem doesn't exist yet.",
  "problem.backToBank": "← Back to the problem bank",
  "problem.kickerA": "problem · ch.",
  "problem.moreChapter": "more from this chapter:",
  "problem.tabStatement": "Statement",
  "problem.tabHints": "Hints",
  "problem.tabSolution": "Solution",
  "problem.tabSolved": "✓ solution",
  "problem.run": "▶ Run tests",
  "problem.running": "Running…",
  "problem.reset": "↺ reset code",
  "problem.allPass": "✓ all tests pass",
  "problem.testsH": "Tests",
  "problem.expected": "expected:",
  "problem.got": "got:",
  "problem.hidden": "(hidden)",
  "problem.viewTrace": "view step-by-step trace",
  "problem.hiddenFail": "fails — hidden test data is not revealed",
  "problem.runHint": "Press «Run tests» to check your solution.",
  "problem.output": "Output:",
  "problem.hintsTitle": "Progressive hints",
  "problem.hintsIntro":
    "Try to solve it with the first one before asking for the next — each one uncovers just one layer of the reasoning.",
  "problem.hintN": "hint {n}",
  "problem.moreHint": "+ one more hint ({a}/{b})",
  "problem.lastHint":
    "That was the last hint — you now have everything the solution needs.",
  "problem.solvedH": "✓ Solved — here is the reference approach",
  "problem.tradeoffLabel": "Tradeoff:",
  "problem.refCode": "Show reference code",
  "problem.lockedH": "Solution locked",
  "problem.lockedBody":
    "Pass every test to unlock the explanation, the tradeoff and the reference code. If you get stuck, there are {n} hints in the «Hints» tab.",
  "problem.goEditor": "Go to the editor",
  "problem.traceKicker": "Trace of test: {name}",
  "problem.closeTrace": "close trace",
  "problem.traceError":
    "couldn't draw the trace — your code raises an error or exceeds the step limit before finishing this test",
  "problem.errPrefix": "Error:",
  "problem.tracePrefix": "Trace:",
  "problem.diffEasy": "easy",
  "problem.diffMedium": "medium",
  "problem.diffHard": "hard",
  "playground.note":
    "Every executed line is recorded as a frame of the tape. The code runs in real Python (Pyodide/WASM) inside your tab.",
  "playground.codeLabel": "python code",
  "playground.run": "▶ Run (trace)",
  "playground.running": "Running…",
  "playground.stdin": "input (stdin)",
  "playground.stdinPh": "Only if your code uses input(): one line per call",
  "playground.lineExecuted": "Line {n} executed.",
  "playground.lineExecutedShort": "Line {n} executed",
  "playground.output": "Output:",
  "playground.frames": "frames: {n}",
  "playground.arrays": "arrays: {list}",
  "playground.showArray": "show array",
};

const DICT: Record<Lang, Record<I18nKey, string>> = { es: ES, en: EN };

export function translate(
  lang: Lang,
  key: I18nKey,
  vars?: Record<string, string | number>,
): string {
  let s: string = DICT[lang][key];
  if (vars) {
    for (const k of Object.keys(vars)) {
      s = s.split(`{${k}}`).join(String(vars[k]));
    }
  }
  return s;
}

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<I18nCtx>({ lang: "es", setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem("lang");
      return v === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "es";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* modo privado: sin persistencia */
    }
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const { lang, setLang } = useContext(Ctx);
  return {
    lang,
    setLang,
    t: (key: I18nKey, vars?: Record<string, string | number>) =>
      translate(lang, key, vars),
  };
}

/** Selector ES/EN: píldora de dos botones, se usa en sidebar y topbar. */
export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label="Idioma / Language">
      <button
        className={lang === "es" ? "on" : ""}
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
      >
        ES
      </button>
      <button
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
