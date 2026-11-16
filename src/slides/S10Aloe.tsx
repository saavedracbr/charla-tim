import { useRef } from 'react';
import { ALOE } from '../content/talk';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S10Aloe({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Tu cuenta @aloe
      </p>
      <h2 className="title" data-enter>
        Ya lo tienen. <em>Y no cuesta nada.</em>
      </h2>
      <div className="aloe">
        <div className="aloe-models" data-enter>
          <span className="tag">Modelos</span>
          {ALOE.models.map((m) => (
            <span className="chip" key={m}>
              {m}
            </span>
          ))}
        </div>
        <div className="aloe-tools">
          {ALOE.tools.map((t) => (
            <div className="row" key={t.name} data-enter>
              <h3>{t.name}</h3>
              <p>{t.use}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="punch small" data-step="1">
        {ALOE.privacy}
      </p>
    </section>
  );
}
