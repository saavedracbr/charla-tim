import { useRef } from 'react';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const USES = [
  { tag: 'Gemini en Gmail', title: 'Responder', text: 'Respuestas a clientes redactadas en minutos, no en horas.' },
  { tag: 'Gemini', title: 'Priorizar', text: 'Calificar leads: a quién llamar primero y por qué.' },
  { tag: 'Gemini en Workspace', title: 'Dar seguimiento', text: 'Reuniones, notas y tareas sin perder el hilo.' },
];

export function S03Ventas({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Primero
      </p>
      <h2 className="title" data-enter>
        La usé para <em>vender</em>.
      </h2>
      <div className="cards c3">
        {USES.map((u, i) => (
          <div className="card" key={u.title} data-step={i + 1}>
            <span className="tag">{u.tag}</span>
            <h3>{u.title}</h3>
            <p>{u.text}</p>
          </div>
        ))}
      </div>
      <p className="punch" data-step="3">
        Menos tiempo en el teclado. <em>Más tiempo con el cliente.</em>
      </p>
    </section>
  );
}
