import { chaptersContent, chapterTranslated } from "../content/chapter-content-index";
import { entrevistas } from "../content/entrevistas";
import { chapters } from "../content/chapters";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BlockRenderer from "../components/BlockRenderer";
import SortingPlayground from "./SortingPlayground";
import ArraysPlayground from "./ArraysPlayground";
import TreePlayground from "./TreePlayground";
import GraphPlayground from "./GraphPlayground";
import HeapPlayground from "./HeapPlayground";
import { useI18n } from "../engine/i18n";
import { mundoReal } from "../content/mundo-real";

export default function ChapterPage({ id }: { id: string }) {
  const { lang, t } = useI18n();
  const [read, setRead] = useLocalStorage(`read:${id}`, false);

  const idx = chapters.findIndex((c) => c.id === id);
  const ch = idx === -1 ? null : chapters[idx];

  if (!ch) {
    return (
      <div className="notfound">
        <h1 className="serif">{t("chapter.notFoundTitle")}</h1>
        <p className="lede">{t("chapter.notFoundBody")}</p>
        <a className="btn primary" href="#/">{t("chapter.backHome")}</a>
      </div>
    );
  }

  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const content = chaptersContent[id];

  return (
    <article>
      <div className="kicker">
        {ch.status === "live" ? t("chapter.kickerLive") : t("chapter.kickerSoon", { n: ch.num })}
      </div>
      <h1 className="serif">
        {ch.num}. {ch.title}
      </h1>
      <p className="lede">{lang === "en" ? ch.blurbEn : ch.blurb}</p>
      {lang === "en" && content && !chapterTranslated(id) && (
        <div className="i18n-banner">{t("chapter.bannerEn")}</div>
      )}

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
          <h3 className="serif">{t("chapter.soonTitle")}</h3>
          <p className="prose-note">{t("chapter.soonBody")}</p>
          <a className="btn" href="#/chapter/sorting">{t("chapter.soonCta")}</a>
        </section>
      )}

      {mundoReal[id] && ch.status === "live" && (() => {
        const m = mundoReal[id];
        const analogia = lang === "en" ? m.analogiaEn : m.analogia;
        const casos = lang === "en" && m.casosEn ? m.casosEn : m.casos;
        return (
          <section className="mundo-real" aria-label={lang === "en" ? "In the real world" : "En el mundo real"}>
            <div className="mundo-head">
              <span className="mundo-tag">{lang === "en" ? "real world" : "mundo real"}</span>
              <h2 className="serif">{lang === "en" ? "In the wild" : "En el mundo real"}</h2>
            </div>
            <p className="mundo-analogia">
              <b>{lang === "en" ? "The analogy — " : "La analogía — "}</b>
              {analogia}
            </p>
            <div className="mundo-grid">
              {casos.map((c) => (
                <div className="mundo-caso" key={c.titulo}>
                  <h3>{c.titulo}</h3>
                  <p>{c.detalle}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {entrevistas[id] && ch.status === "live" && (
        <section className="entrevista" aria-label={lang === "en" ? "Interview tips" : "Consejos para la entrevista"}>
          <div className="entrevista-head">
            <span className="entrevista-tag">livecoding</span>
            <h2 className="serif">{t("chapter.interviewH")}</h2>
          </div>
          <p className="entrevista-enfoque">{entrevistas[id].enfoque}</p>
          <div className="entrevista-grid">
            <div className="entrevista-col">
              <h3>{t("chapter.interviewCom")}</h3>
              <p>{entrevistas[id].comunicacion}</p>
            </div>
            <div className="entrevista-col">
              <h3>{t("chapter.interviewVar")}</h3>
              <ul>
                {entrevistas[id].variantes.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
            <div className="entrevista-col">
              <h3>{t("chapter.interviewChg")}</h3>
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
          {read ? t("chapter.markedRead") : t("chapter.markRead")}
        </button>
      )}

      <nav className="pager">
        <a href={prev ? `#/chapter/${prev.id}` : "#/"}>
          ← {prev ? `${prev.num}. ${prev.title}` : t("chapter.pagerHome")}
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
