/**
 * Editor de código con CodeMirror 6 + sintaxis Python.
 */
import { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
  className?: string;
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "320px",
  className = "",
}: CodeEditorProps) {
  const viewRef = useRef<EditorView | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        python(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
        readOnly ? EditorView.editable.of(false) : EditorView.editable.of(true),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // Sincronizar valor externo → editor
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      const tr = view.state.update({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
      view.dispatch(tr);
    }
  }, [value]);

  return (
    <div className={`cm-editor ${className}`} style={{ height }} ref={containerRef} />
  );
}
