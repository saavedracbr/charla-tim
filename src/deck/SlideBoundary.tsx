import { Component, ReactNode } from 'react';

/**
 * Si una diapositiva falla, se muestra este aviso en su lugar y la navegación sigue funcionando.
 * Sin esto, un error en una sola diapositiva dejaría toda la presentación en negro.
 */
export class SlideBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Error en la diapositiva:', error);
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="slide slide-error">
          <p className="kicker">Algo falló en esta diapositiva</p>
          <p className="lede">Pulsa → para continuar con la siguiente.</p>
        </section>
      );
    }
    return this.props.children;
  }
}
