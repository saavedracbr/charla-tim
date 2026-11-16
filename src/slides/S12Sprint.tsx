import { useRef } from 'react';
import { Countdown } from '../components/Countdown';
import { QR } from '../components/QR';
import { KIT_URL, KIT_URL_LABEL, SPRINT_SECONDS, SPRINT_STEPS } from '../content/talk';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S12Sprint({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  return (
    <section className="slide s-sprint" ref={root}>
      <div className="sprint-left">
        <p className="kicker" data-enter>
          Su turno
        </p>
        <h2 className="title tight" data-enter>
          8 minutos. <em>Una landing v0.</em>
        </h2>
        <ol className="sprint-steps">
          {SPRINT_STEPS.map((s, i) => (
            <li key={s} data-enter>
              <span className="n">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="qr-row" data-enter>
          <QR url={KIT_URL} size={250} />
          <div>
            <span className="tag">Kit MVP</span>
            <p className="url">{KIT_URL_LABEL}</p>
          </div>
        </div>
      </div>
      <div className="sprint-right" data-enter>
        <Countdown seconds={SPRINT_SECONDS} />
      </div>
    </section>
  );
}
