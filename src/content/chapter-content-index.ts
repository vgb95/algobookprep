/**
 * Índice unificado de todos los capítulos con contenido.
 * Importa de chapter-content.ts y de los archivos chapter-content-extra-*.ts
 */
import { ChapterContent } from "./blocks";
import { chaptersContent as baseContent } from "./chapter-content";
import { complexityChapter } from "./chapter-content-extra-1";
import { hashTablesChapter } from "./chapter-content-extra-1";
import { searchChapter } from "./chapter-content-extra-1";
import { stringsChapter } from "./chapter-content-extra-2";
import { matricesChapter } from "./chapter-content-extra-2";
import { linkedListsChapter } from "./chapter-content-extra-2";
import { stacksChapter } from "./chapter-content-extra-3";
import { queuesChapter } from "./chapter-content-extra-3";
import { recursionChapter } from "./chapter-content-extra-3";
import { dpChapter } from "./chapter-content-extra-4";
import { bstChapter } from "./chapter-content-extra-4";
import { triesChapter } from "./chapter-content-extra-4";
import { graphAlgorithmsChapter } from "./chapter-content-extra-5";
import { unionFindChapter } from "./chapter-content-extra-5";
import { mstChapter } from "./chapter-content-extra-5";
import { backtrackingChapter } from "./chapter-content-extra-6";
import { bitOpsChapter } from "./chapter-content-extra-6";

export const chaptersContent: Record<string, ChapterContent> = {
  ...baseContent,
  complexity: complexityChapter,
  "hash-tables": hashTablesChapter,
  search: searchChapter,
  strings: stringsChapter,
  matrices: matricesChapter,
  "linked-lists": linkedListsChapter,
  stacks: stacksChapter,
  queues: queuesChapter,
  recursion: recursionChapter,
  "dynamic-programming": dpChapter,
  "binary-search-trees": bstChapter,
  tries: triesChapter,
  "graph-algorithms": graphAlgorithmsChapter,
  "union-find": unionFindChapter,
  mst: mstChapter,
  backtracking: backtrackingChapter,
  "bit-operations": bitOpsChapter,
};

/** ¿El capítulo está traducido por completo al inglés? (todos sus prose tienen textEn). */
export function chapterTranslated(id: string): boolean {
  const c = chaptersContent[id];
  if (!c) return false;
  for (const b of c.blocks) {
    if (b.kind === "prose" && b.textEn == null) return false;
  }
  return true;
}
