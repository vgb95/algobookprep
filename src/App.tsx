import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home";
import ChapterPage from "./pages/Chapter";
import CodePlayground from "./pages/CodePlayground";
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
  const problemId = route.startsWith("/problem/") ? route.slice("/problem/".length) : null;
  const chapterId = route.startsWith("/chapter/") ? route.slice("/chapter/".length) : null;

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        {problemId ? (
          <Problem id={problemId} />
        ) : route === "/code-playground" ? (
          <CodePlayground />
        ) : chapterId ? (
          <ChapterPage id={chapterId} />
        ) : (
          <HomePage />
        )}
      </main>
    </div>
  );
}
