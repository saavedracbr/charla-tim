import { useRef } from 'react';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const FACTS = [
  { big: '8.º ciclo', text: 'Ingeniería Industrial, Universidad de Lima.' },
  { big: 'Ventas B2B', text: 'Vendí material POP a equipos de trade marketing.' },
  { big: 'ERP', text: 'Lidero el sistema con el que opera una planta de empaques.' },
];

export function S02QuienSoy({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Quién les habla
      </p>
      <h2 className="title" data-enter>
        Soy estudiante, <em>igual que ustedes</em>.
      </h2>
      <div className="cards c3">
        {FACTS.map((f) => (
          <div className="card" key={f.big} data-enter>
            <h3>{f.big}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
      <p className="punch" data-step="1">
        No soy programador de carrera. Aprendí construyendo, <em>con IA al lado</em>.
      </p>
    </section>
  );
}
