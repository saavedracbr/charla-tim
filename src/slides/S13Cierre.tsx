import { useRef } from 'react';
import { QR } from '../components/QR';
import { KIT_URL, KIT_URL_LABEL, NEXT_STEPS, TALK } from '../content/talk';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S13Cierre({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide s-cierre" ref={root}>
      <div className="cierre-left">
        <p className="kicker" data-enter>
          Esta semana
        </p>
        <h2 className="title tight" data-enter>
          Pónganla frente a <em>10 personas</em>.
        </h2>
        <ol className="sprint-steps">
          {NEXT_STEPS.map((s, i) => (
            <li key={s} data-enter>
              <span className="n">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="thanks" data-enter>
          Gracias.
        </p>
      </div>
      <div className="cierre-right" data-enter>
        <QR url={KIT_URL} size={380} />
        <span className="tag">Kit MVP</span>
        <p className="url">{KIT_URL_LABEL}</p>
        <p className="contact">
          <strong>{TALK.speaker}</strong>
          <br />
          {TALK.web}
          <br />
          {TALK.linkedin}
        </p>
      </div>
    </section>
  );
}
