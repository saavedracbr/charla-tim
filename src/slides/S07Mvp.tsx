import { useRef } from 'react';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const OPTIONS = [
  { title: 'Landing con lista de espera', text: 'Una página que explica la propuesta y pide un correo.', today: true },
  { title: 'Preventa por formulario', text: 'Pedidos reales antes de producir.' },
  { title: 'Prueba con 10 clientes', text: 'El producto hecho a mano, entregado por ustedes.' },
];

export function S07Mvp({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Qué es un MVP
      </p>
      <h2 className="title" data-enter>
        No es tu producto en pequeño. Es un <em>experimento</em>.
      </h2>
      <div className="cards c3" data-step="1">
        {OPTIONS.map((o) => (
          <div className={`card${o.today ? ' featured' : ''}`} key={o.title}>
            {o.today && <span className="badge">Hoy</span>}
            <h3>{o.title}</h3>
            <p>{o.text}</p>
          </div>
        ))}
      </div>
      <p className="punch" data-step="2">
        La pregunta que responde: <em>¿alguien deja su correo por esto?</em>
      </p>
    </section>
  );
}
