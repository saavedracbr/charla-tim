import { useRef } from 'react';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S05Puente({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide s-statement" ref={root}>
      <p className="statement" data-enter>
        La IA no me dijo
        <br />
        qué construir.
      </p>
      <p className="statement strong" data-step="1">
        Hizo <span className="hl">barato</span> construirlo.
      </p>
    </section>
  );
}
