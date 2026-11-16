import { useRef } from 'react';
import { Split } from '../components/Split';
import { TALK } from '../content/talk';
import { gsap, reduced, useGSAP, useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const RINGS = [110, 190, 270, 350, 430];

export function S01Portada({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  useGSAP(
    () => {
      if (reduced) return;
      gsap
        .timeline({ delay: 0.15 })
        .from('.ch', { yPercent: 125, rotate: 8, duration: 0.95, ease: 'power4.out', stagger: 0.03 })
        .from('.mvp-line', { scaleX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from(
          '.rings circle',
          { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%', duration: 1.3, ease: 'power3.out', stagger: 0.07 },
          0,
        );
      gsap.to('.rings-spin', { rotate: 360, duration: 80, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      gsap.to('.rings-spin-rev', { rotate: -360, duration: 55, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    },
    { scope: root },
  );

  return (
    <section className="slide s-portada" ref={root}>
      <svg className="rings" viewBox="0 0 900 900" aria-hidden="true">
        <g className="rings-spin">
          {RINGS.map((r, i) => (
            <circle key={r} className={i % 2 ? 'ring-dash' : 'ring-solid'} cx="450" cy="450" r={r} />
          ))}
          <circle className="ring-dot" cx={450 + 270} cy="450" r="12" />
          <circle className="ring-dot alt" cx="450" cy={450 - 430} r="9" />
        </g>
        <g className="rings-spin-rev">
          <circle className="ring-dot" cx={450 - 190} cy="450" r="16" />
          <circle className="ring-dot alt" cx="450" cy={450 + 350} r="10" />
        </g>
        <circle className="ring-core" cx="450" cy="450" r="46" />
      </svg>

      <p className="kicker" data-enter>
        {TALK.event} · {TALK.date}
      </p>
      <h1 className="mega">
        <span className="mega-row">
          <Split text="De la idea" />
        </span>
        <span className="mega-row">
          <Split text="al" />
          <span className="mvp">
            <Split text="MVP" />
            <i className="mvp-line" />
          </span>
        </span>
        <span className="mega-row">
          <Split text="con IA" />
        </span>
      </h1>
      <p className="lede" data-enter>
        Lo que ya tienes en tu cuenta @aloe alcanza para construirlo.
      </p>
      <p className="who" data-enter>
        <strong>{TALK.speaker}</strong> · {TALK.speakerRole}
      </p>
    </section>
  );
}
