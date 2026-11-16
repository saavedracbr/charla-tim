import { useRef } from 'react';
import { JourneyChart } from '../components/JourneyChart';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S06Recorrido({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        El ciclo de TIM
      </p>
      <h2 className="title tight" data-enter>
        Ustedes ya hicieron <em>lo difícil</em>.
      </h2>
      <JourneyChart highlight={step >= 1} />
      <p className="punch" data-step="1">
        Ya saben para quién y por qué. Falta algo que el cliente pueda <em>ver y tocar</em>.
      </p>
    </section>
  );
}
