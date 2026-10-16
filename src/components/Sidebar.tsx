import { chapters } from "../content/chapters";

const isRead = (id: string): boolean => {
  try {
    return localStorage.getItem(`read:${id}`) === "true";
  } catch {
    return false;
  }
};

export default function Sidebar() {
  const activeId = window.location.hash.startsWith("#/chapter/")
    ? window.location.hash.slice("#/chapter/".length)
    : null;

  return (
    <aside className="sidebar">
      <a href="#/" className="brand">
        <span className="brand-mark" aria-hidden>▤</span>
        <div>
          <div className="brand-name">AlgoBook</div>
          <div className="brand-sub">interactive DSA handbook</div>
        </div>
      </a>
      <nav className="toc">
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#/chapter/${c.id}`}
            className={`toc-item ${c.status}${activeId === c.id ? " active" : ""}`}
            title={c.title}
          >
            <span className="toc-num">{c.num}</span>
            <span className="toc-title">{c.title}</span>
            {isRead(c.id) ? (
              <span className="check" title="completado">✓</span>
            ) : (
              <span
                className="dot pending"
                title={
                  c.status === "live"
                    ? "demo interactiva — pendiente"
                    : "próximamente"
                }
              />
            )}
          </a>
        ))}
      </nav>
      <div className="sidebar-foot">AlgoBook v0.1 · hecho para estudiar</div>
    </aside>
  );
}
