import { chaptersContent } from "../content/chapter-content-index";
import { entrevistas } from "../content/entrevistas";
import { chapters } from "../content/chapters";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BlockRenderer from "../components/BlockRenderer";
import SortingPlayground from "./SortingPlayground";
import ArraysPlayground from "./ArraysPlayground";
import TreePlayground from "./TreePlayground";
import GraphPlayground from "./GraphPlayground";
import HeapPlayground from "./HeapPlayground";

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
  const content = chaptersContent[id];

  return (
    <article>
      <div className="kicker">
        {ch.status === "live" ? "capítulo interactivo" : `capítulo ${ch.num} · próximamente`}
      </div>
      <h1 className="serif">
        {ch.num}. {ch.title}
      </h1>
      <p className="lede">{ch.blurb}</p>

      {content ? (
        <section className="chapter-body" style={{ marginTop: 20 }}>
          {content.blocks.map((block: any) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </section>
      ) : ch.status === "live" ? (
        ch.id === "sorting" ? <SortingPlayground /> :
        ch.id === "arrays" ? <ArraysPlayground /> :
        ch.id === "trees" ? <TreePlayground /> :
        ch.id === "graphs" ? <GraphPlayground /> :
        ch.id === "heaps" ? <HeapPlayground /> :
        null
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

      {entrevistas[id] && ch.status === "live" && (
        <section className="entrevista" aria-label="Consejos para la entrevista">
          <div className="entrevista-head">
            <span className="entrevista-tag">livecoding</span>
            <h2 className="serif">En la entrevista</h2>
          </div>
          <p className="entrevista-enfoque">{entrevistas[id].enfoque}</p>
          <div className="entrevista-grid">
            <div className="entrevista-col">
              <h3>Cómo conducir la conversación</h3>
              <p>{entrevistas[id].comunicacion}</p>
            </div>
            <div className="entrevista-col">
              <h3>Variantes que te pueden poner</h3>
              <ul>
                {entrevistas[id].variantes.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
            <div className="entrevista-col">
              <h3>Giros a mitad de la entrevista</h3>
              <ul>
                {entrevistas[id].cambios.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
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
