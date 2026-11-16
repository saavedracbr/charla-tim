import { useRef } from 'react';
import { gsap, reduced, useGSAP, useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

const MODULES = 23;
const STATS = ['15+ usuarios en planta', '4 procesos conectados', 'Odoo 17 → 19, migrado en 2026'];

export function S04Erp({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  useSlideAnim(root, step);

  useGSAP(
    () => {
      if (reduced || !num.current) return;
      const o = { v: 0 };
      gsap.to(o, {
        v: MODULES,
        duration: 1.8,
        delay: 0.35,
        ease: 'power2.out',
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(o.v));
        },
      });
      gsap.from('.tile', {
        scale: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'back.out(2)',
        stagger: { each: 0.06, from: 'start' },
        delay: 0.4,
      });
    },
    { scope: root },
  );

  return (
    <section className="slide" ref={root}>
      <p className="kicker" data-enter>
        Después
      </p>
      <h2 className="title" data-enter>
        La usé para <em>construir</em>.
      </h2>
      <div className="erp">
        <div className="erp-num" data-enter>
          <span className="count" ref={num}>
            {reduced ? MODULES : 0}
          </span>
          <span className="count-label">módulos propios en producción</span>
        </div>
        <div className="erp-side">
          <div className="tiles" aria-hidden="true">
            {Array.from({ length: MODULES }, (_, i) => (
              <i className="tile" key={i} />
            ))}
          </div>
          <ul className="stats">
            {STATS.map((s) => (
              <li key={s} data-enter>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="punch" data-step="1">
        Yo ponía el proceso. <em>La IA, la sintaxis.</em>
      </p>
    </section>
  );
}
