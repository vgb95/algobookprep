import type { Block } from "../content/blocks";
import Problem from "../pages/Problem";
import VizPlayer from "../components/viz/VizPlayer";

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <div className="prose-block" key={block.id}>
          <p>{block.text}</p>
        </div>
      );
    case "formula":
      return (
        <div className="formula-block" key={block.id}>
          <span className="latex">{block.latex}</span>
        </div>
      );
    case "divider":
      return <hr key={block.id} className="chapter-divider" />;
    case "viz":
      return <VizPlayer type={block.type} config={block.config} />;
    case "code":
      return (
        <div className="code-block" key={block.id}>
          <p className="prose-note">
            Ejemplo de código ({block.code.split("\n").length} líneas)
          </p>
        </div>
      );
    case "problem":
      return (
        <div className="problem-block" key={block.id}>
          <Problem id={block.problemId} />
        </div>
      );
    default:
      return null;
  }
}
