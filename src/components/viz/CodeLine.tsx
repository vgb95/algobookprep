/**
 * Editor de código minimalista: numeración de líneas y resaltado de la
 * línea en ejecución. Sin dependencias externas (CodeMirror llega en la Fase 3).
 */
export default function CodeLine({
  lines,
  activeLine,
}: {
  lines: string[];
  activeLine: number | null;
}) {
  return (
    <div className="code">
      {lines.map((raw, i) => {
        const n = i + 1;
        const active = activeLine === n;
        return (
          <div key={i} className={`code-line ${active ? "active" : ""}`}>
            <span className="code-ln">{n}</span>
            <span className="code-text">{escapeHtml(raw)}</span>
          </div>
        );
      })}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
