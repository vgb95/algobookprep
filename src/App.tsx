import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { I18nProvider, LangSwitch } from "./engine/i18n";
import HomePage from "./pages/Home";
import ChapterPage from "./pages/Chapter";
import CodePlayground from "./pages/CodePlayground";
import ProblemsIndex from "./pages/ProblemsIndex";
import Problem from "./pages/Problem";

/** Minimal hash router — no deps needed. */
function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash.replace(/^#/, "");
}

export default function App() {
  const route = useHashRoute();
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    setNavOpen(false);
  }, [route]);
  const problemId = route.startsWith("/problem/") ? route.slice("/problem/".length) : null;
  const chapterId = route.startsWith("/chapter/") ? route.slice("/chapter/".length) : null;

  return (
    <I18nProvider>
      <div className="app">
        <div className="topbar">
          <button
            className="topbar-menu"
            aria-label="Abrir navegación"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}
          >
            ☰
          </button>
          <a href="#/" className="topbar-brand">
            ▤ AlgoBook
          </a>
          <LangSwitch />
        </div>
      {navOpen && (
        <button className="scrim" aria-label="Cerrar navegación" onClick={() => setNavOpen(false)} />
      )}
      <Sidebar open={navOpen} />
      <main className="content">
        {problemId ? (
          <Problem id={problemId} />
        ) : route === "/code-playground" ? (
          <CodePlayground />
        ) : route === "/problems" ? (
          <ProblemsIndex />
        ) : chapterId ? (
          <ChapterPage id={chapterId} />
        ) : (
          <HomePage />
        )}
      </main>
    </div>
    </I18nProvider>
  );
}
