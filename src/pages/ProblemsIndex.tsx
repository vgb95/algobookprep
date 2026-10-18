import { useReducer, useState } from "react";
import { problems, type Problem } from "../content/problems";
import { chapters } from "../content/chapters";
import { useI18n } from "../engine/i18n";
import { clearSolved, isSolved, solvedCount } from "../engine/solved";

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
  const { lang, t } = useI18n();

  const diffLabel = (d: string): string =>
    lang === "en"
      ? d === "fácil"
        ? t("problem.diffEasy")
        : d === "medio"
          ? t("problem.diffMedium")
          : t("problem.diffHard")
      : d;

  const [diffFilter, setDiffFilter] = useState<"todas" | "fácil" | "medio" | "difícil">("todas");
  const [, refresh] = useReducer((x: number) => x + 1, 0);

  const byChapter = new Map<string, Problem[]>();
  for (const p of problems) {
    if (!byChapter.has(p.chapter)) byChapter.set(p.chapter, []);
    byChapter.get(p.chapter)!.push(p);
  }
  const groups = chapters
    .filter((c) => byChapter.has(c.id))
    .map((c) => ({ chapter: c, items: byChapter.get(c.id)! }));
  const visible = groups
    .map((g) => ({
      chapter: g.chapter,
      items: g.items.filter((p) => diffFilter === "todas" || p.difficulty === diffFilter),
    }))
    .filter((g) => g.items.length > 0);

  const counts = problems.reduce<Record<string, number>>((acc, p) => {
    acc[p.difficulty] = (acc[p.difficulty] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <article>
      <div className="kicker">{t("problems.kicker")}</div>
      <h1 className="serif">{t("problems.h1")}</h1>
      <p className="lede">{t("problems.lede", { n: problems.length })}</p>
      <div className="stats" style={{ marginBottom: 24 }}>
        <div className="stat"><b>{counts["fácil"] ?? 0}</b><span>{t("problems.statEasy")}</span></div>
        <div className="stat"><b>{counts["medio"] ?? 0}</b><span>{t("problems.statMedium")}</span></div>
        <div className="stat"><b>{counts["difícil"] ?? 0}</b><span>{t("problems.statHard")}</span></div>
        <div className="stat"><b>{groups.length}</b><span>{t("problems.statChapters")}</span></div>
        <div className="stat"><b>{solvedCount()}</b><span>{t("problems.statSolved")}</span></div>
      </div>

      <div className="filter-row" style={{ marginBottom: 24 }}>
        <span className="prose-note">{t("problems.filterLabel")}:</span>
        {(["todas", "fácil", "medio", "difícil"] as const).map((d) => (
          <button
            key={d}
            className={`filter-pill ${diffFilter === d ? "on" : ""}`}
            onClick={() => setDiffFilter(d)}
          >
            {d === "todas" ? t("problems.filterAll") : diffLabel(d)}
            <span className="filter-n">{d === "todas" ? problems.length : counts[d] ?? 0}</span>
          </button>
        ))}
        <button
          className="reset-link"
          onClick={() => {
            const n = solvedCount();
            if (n > 0 && confirm(t("problems.resetConfirm", { n }))) {
              clearSolved();
              refresh();
            }
          }}
        >
          ⟲ {t("problems.reset")}
        </button>
      </div>

      {visible.map(({ chapter, items }) => (
        <section key={chapter.id} style={{ marginBottom: 28 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>
            {t("problems.chap", { n: chapter.num })} · {chapter.title}
          </div>
          <div className="problem-grid">
            {items.map((p) => (
              <a
                key={p.id}
                href={`#/problem/${p.id}`}
                className={`problem-card ${isSolved(p.id) ? "is-solved" : ""}`}
              >
                <div className="problem-card-head">
                  {isSolved(p.id) && (
                    <span className="solved-mark" title={t("problem.solvedBadge")}>✓</span>
                  )}
                  <span className="serif">{p.title}</span>
                  <span className={`diff ${DIFF_CLASS[p.difficulty] ?? ""}`}>{diffLabel(p.difficulty)}</span>
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
