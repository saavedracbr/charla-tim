import { useRef } from 'react';
import { CRITERIA } from '../content/talk';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S08Criterios({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Antes de abrir Gemini
      </p>
      <h2 className="title tight" data-enter>
        Cuatro <em>criterios</em>.
      </h2>
      <div className="criteria">
        {CRITERIA.map((c, i) => (
          <div className={`criterion${step === i + 1 ? ' active' : ''}`} key={c.title} data-step={i + 1}>
            <span className="criterion-n">{i + 1}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
