import { useRef } from 'react';
import { Split } from '../components/Split';
import { gsap, reduced, useGSAP, useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const MARKS = [
  { x: 1380, y: 150, s: 300, r: 12 },
  { x: 1620, y: 520, s: 180, r: -14 },
  { x: 1180, y: 700, s: 120, r: 20 },
  { x: 1560, y: 820, s: 90, r: -8 },
];

export function S09Preguntas({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  useSlideAnim(root, step);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.ch', { yPercent: 125, duration: 0.9, ease: 'power4.out', stagger: 0.04, delay: 0.1 });
      gsap.utils.toArray<HTMLElement>('.qmark').forEach((m, i) => {
        gsap.from(m, { scale: 0, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.8)', delay: 0.3 + i * 0.12 });
        gsap.to(m, {
          y: gsap.utils.random(-40, 40),
          rotate: `+=${gsap.utils.random(-10, 10)}`,
          duration: gsap.utils.random(3, 5),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="slide s-preguntas" ref={root}>
      {MARKS.map((m, i) => (
        <span
          key={i}
          className="qmark"
          aria-hidden="true"
          style={{ left: m.x, top: m.y, fontSize: m.s, transform: `rotate(${m.r}deg)` }}
        >
          ?
        </span>
      ))}
      <p className="kicker" data-enter>
        Hasta aquí
      </p>
      <h2 className="mega">
        <span className="mega-row">
          <Split text="¿Preguntas?" />
        </span>
      </h2>
      <p className="lede" data-enter>
        Lo que viene: una demo en vivo y, después, les toca a ustedes.
      </p>
    </section>
  );
}
