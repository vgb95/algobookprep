import type { Block } from "../content/blocks";
import Problem from "../pages/Problem";
import VizPlayer from "../components/viz/VizPlayer";
import Markdown from "./Markdown";
import LatexLite from "./LatexLite";
import { useI18n } from "../engine/i18n";
import ErrorBoundary from "./ErrorBoundary";

export default function BlockRenderer({ block }: { block: Block }) {
  const { lang } = useI18n();
  switch (block.kind) {
    case "prose":
      return (
        <div className="prose-block" key={block.id}>
          <Markdown
            text={lang === "en" && block.textEn ? block.textEn : block.text}
          />
        </div>
      );
    case "formula":
      return (
        <div className="formula-block" key={block.id}>
          <LatexLite latex={block.latex} />
        </div>
      );
    case "divider":
      return <hr key={block.id} className="chapter-divider" />;
    case "viz":
      return <VizPlayer type={block.type} config={block.config} />;
    case "code":
      return (
        <div className="code-block" key={block.id}>
          <pre className="snippet">{block.code}</pre>
        </div>
      );
    case "problem":
      return (
        <div className="problem-block" key={block.id}>
          <ErrorBoundary>
            <Problem id={block.problemId} />
          </ErrorBoundary>
        </div>
      );
    default:
      return null;
  }
}
