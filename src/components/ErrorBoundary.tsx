import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Frontera de error mínima: si un componente explota en runtime, la web
 * muestra el mensaje del error en lugar de colgarse sin explicación
 * (antes: pestañas vacías y botones que "no hacían nada").
 * En desarrollo Vite añade el stack en consola; aquí hacemos visible
 * el fallo también fuera de línea y en producción.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Útil para depurar con las devtools remotas del móvil:
    console.error("[ErrorBoundary]", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="notfound">
          <h1 className="serif">Algo se rompió aquí 🙈</h1>
          <p className="prose-note">{this.state.error.message}</p>
          <a className="btn" href="#/">← Volver a portada</a>
        </div>
      );
    }
    return this.props.children;
  }
}
