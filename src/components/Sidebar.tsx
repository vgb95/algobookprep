import { chapters } from "../content/chapters";
import { useI18n } from "../engine/i18n";
import { LangSwitch } from "../engine/i18n";

const isRead = (id: string): boolean => {
  try {
    return localStorage.getItem(`read:${id}`) === "true";
  } catch {
    return false;
  }
};

export default function Sidebar({ open = false }: { open?: boolean }) {
  const { t } = useI18n();
  const activeId = window.location.hash.startsWith("#/chapter/")
    ? window.location.hash.slice("#/chapter/".length)
    : null;

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <a href="#/" className="brand">
        <span className="brand-mark" aria-hidden>▤</span>
        <div>
          <div className="brand-name">AlgoBook</div>
          <div className="brand-sub">{t("sidebar.brandSub")}</div>
        </div>
      </a>
      <nav className="toc">
        <a href="#/problems" className="toc-item problems-link" title={t("sidebar.problemBank")}>
          <span className="toc-num">✦</span>
          <span>{t("sidebar.problems")}</span>
        </a>
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
              <span className="check" title={t("sidebar.read")}>✓</span>
            ) : (
              <span
                className="dot pending"
                title={c.status === "live" ? t("sidebar.dotLive") : t("sidebar.dotSoon")}
              />
            )}
          </a>
        ))}
      </nav>
      <div className="lang-row">
        <LangSwitch />
      </div>
      <div className="sidebar-foot">{t("sidebar.foot", { n: chapters.length })}</div>
    </aside>
  );
}
