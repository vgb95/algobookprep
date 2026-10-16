import { chapters } from "../content/chapters";
import { problems } from "../content/problems";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SortingPlayground from "./SortingPlayground";
import ArraysPlayground from "./ArraysPlayground";

export default function ChapterPage({ id }: { id: string }) {
  const [read, setRead] = useLocalStorage(`read:${id}`, false);

  const idx = chapters.findIndex((c) => c.id === id);
  const ch = idx === -1 ? null : chapters[idx];

  if (!ch) {
    return (
      <div className="notfound">
        <h1 className="serif">Capítulo no encontrado</h1>
        <p className="lede">Ese capítulo no existe (todavía).</p>
        <a className="btn primary" href="#/">← Volver a portada</a>
      </div>
    );
  }

  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  const chapterProblems = problems.filter((p) => p.chapter === id);

  return (
    <article>
      <div className="kicker">
        {ch.status === "live" ? "capítulo interactivo" : `capítulo ${ch.num} · próximamente`}
      </div>
      <h1 className="serif">
        {ch.num}. {ch.title}
      </h1>
      <p className="lede">{ch.blurb}</p>

      {chapterProblems.length > 0 ? (
        <>
          <p className="prose-note" style={{ marginBottom: 10 }}>
            Práctica interactiva en este capítulo:
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {chapterProblems.map((p) => (
              <a
                key={p.id}
                href={`#/problem/${p.id}`}
                className="btn ghost"
              >
                {p.title}
              </a>
            ))}
          </div>
        </>
      ) : ch.status === "live" ? (
        ch.id === "sorting" ? <SortingPlayground /> : <ArraysPlayground />
      ) : (
        <section className="card soon-card">
          <h3 className="serif">En construcción 🚧</h3>
          <p className="prose-note">
            Este capítulo llega cuando el motor de visualizaciones crezca. Mientras tanto, el capítulo
            de sorting enseña el patrón entero del libro.
          </p>
          <a className="btn" href="#/chapter/sorting">Ver la demo que ya funciona →</a>
        </section>
      )}

      {ch.status === "live" && (
        <button className="btn ghost read-toggle" onClick={() => setRead(!read)}>
          {read ? "✓ leído — desmarcar" : "Marcar como leído"}
        </button>
      )}

      <nav className="pager">
        <a href={prev ? `#/chapter/${prev.id}` : "#/"}>
          ← {prev ? `${prev.num}. ${prev.title}` : "portada"}
        </a>
        {next ? (
          <a className="next" href={`#/chapter/${next.id}`}>
            {next.num}. {next.title} →
          </a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
