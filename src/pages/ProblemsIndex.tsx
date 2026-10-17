import { problems, type Problem } from "../content/problems";
import { chapters } from "../content/chapters";

const DIFF_CLASS: Record<string, string> = {
  fácil: "diff-facil",
  medio: "diff-medio",
  difícil: "diff-dificil",
};

/**
 * Índice del banco de problemas, agrupado por capítulo (en el orden del
 * libro). Cada capítulo que tenga problemas muestra una tarjeta por
 * problema; el resto del libro queda a un scroll de distancia.
 */
export default function ProblemsIndex() {
  const byChapter = new Map<string, Problem[]>();
  for (const p of problems) {
    if (!byChapter.has(p.chapter)) byChapter.set(p.chapter, []);
    byChapter.get(p.chapter)!.push(p);
  }
  const groups = chapters
    .filter((c) => byChapter.has(c.id))
    .map((c) => ({ chapter: c, items: byChapter.get(c.id)! }));

  const counts = problems.reduce<Record<string, number>>((acc, p) => {
    acc[p.difficulty] = (acc[p.difficulty] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <article>
      <div className="kicker">práctica</div>
      <h1 className="serif">Banco de problemas</h1>
      <p className="lede">
        {problems.length} problemas con tests visibles y ocultos, pistas progresivas y
        solución de referencia que se desbloquea al resolverlos.
      </p>
      <div className="stats" style={{ marginBottom: 24 }}>
        <div className="stat"><b>{counts["fácil"] ?? 0}</b><span>fáciles</span></div>
        <div className="stat"><b>{counts["medio"] ?? 0}</b><span>medios</span></div>
        <div className="stat"><b>{counts["difícil"] ?? 0}</b><span>difíciles</span></div>
        <div className="stat"><b>{groups.length}</b><span>capítulos cubiertos</span></div>
      </div>

      {groups.map(({ chapter, items }) => (
        <section key={chapter.id} style={{ marginBottom: 28 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>
            cap. {chapter.num} · {chapter.title}
          </div>
          <div className="problem-grid">
            {items.map((p) => (
              <a key={p.id} href={`#/problem/${p.id}`} className="problem-card">
                <div className="problem-card-head">
                  <span className="serif">{p.title}</span>
                  <span className={`diff ${DIFF_CLASS[p.difficulty] ?? ""}`}>{p.difficulty}</span>
                </div>
                <p>{p.blurb}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
