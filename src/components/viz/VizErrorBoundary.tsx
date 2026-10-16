import { Component, type ReactNode } from "react";

/**
 * Si un visualizador lanza durante el render, sin esto React desmonta
 * TODA la página (pantalla en blanco). El boundary contiene el fallo
 * al stage: muestra aviso + reintentar, y se auto-limpia al cambiar
 * de cuadro (paso, scrub o cinta nueva).
 */

interface Props {
  children: ReactNode;
  /** Cambiarlo limpia un error previo (p. ej. el índice de cuadro). */
  resetKey: string | number;
  label?: string;
}

interface State {
  error: string | null;
  seenKey: string | number;
}

export default class VizErrorBoundary extends Component<Props, State> {
  state: State = { error: null, seenKey: this.props.resetKey };

  static getDerivedStateFromError(e: unknown): Partial<State> {
    return { error: e instanceof Error ? e.message : String(e) };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    if (props.resetKey !== state.seenKey) {
      return { error: null, seenKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(e: unknown) {
    console.error(`[viz:${this.props.label ?? "stage"}]`, e);
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="viz-error" role="alert">
          <p>
            <strong>La visualización se ha detenido.</strong>
          </p>
          <p className="prose-note">{this.state.error}</p>
          <button
            className="btn ghost"
            onClick={() => this.setState({ error: null, seenKey: this.props.resetKey })}
          >
            ↻ reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
