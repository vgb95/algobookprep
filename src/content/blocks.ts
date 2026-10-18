/**
 * Sistema de contenido por bloques (estilo MDX ligero).
 *
 * Un capítulo es una lista de bloques:
 *  - prose      → texto explicativo (markdown simple, KaTeX para fórmulas)
 *  - viz        → visualización interactiva (sorting, tree, graph, heap…)
 *  - code       → snippet de código editable (CodeMirror)
 *  - problem    → problema con evaluador y tests
 *  - divider    → separación visual
 */

export type BlockKind =
  | "prose"
  | "viz"
  | "code"
  | "problem"
  | "divider"
  | "formula";

export interface BlockBase {
  kind: BlockKind;
  id: string;
}

export interface ProseBlock extends BlockBase {
  kind: "prose";
  text: string;
  /** Versión inglesa del párrafo (traducción progresiva por fases). */
  textEn?: string;
}

export interface VizBlock extends BlockBase {
  kind: "viz";
  type: "sorting" | "tree" | "graph" | "heap" | "array" | "list";
  config: Record<string, string | number>;
}

export interface CodeBlock extends BlockBase {
  kind: "code";
  language: "python";
  code: string;
  readOnly?: boolean;
}

export interface ProblemBlock extends BlockBase {
  kind: "problem";
  problemId: string;
}

export interface FormulaBlock extends BlockBase {
  kind: "formula";
  latex: string;
}

export interface DividerBlock extends BlockBase {
  kind: "divider";
}

export type Block =
  | ProseBlock
  | VizBlock
  | CodeBlock
  | ProblemBlock
  | FormulaBlock
  | DividerBlock;

export interface ChapterContent {
  id: string;
  num: number;
  title: string;
  blurb: string;
  blocks: Block[];
}
