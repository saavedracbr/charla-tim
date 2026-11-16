import { useRef } from 'react';
import { gsap, reduced, useGSAP } from './anim';

/** Fondo vivo: tres manchas de luz que derivan lentamente. Solo transform, sin filtros. */
export function Ambient() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.blob', root.current!).forEach((b, i) => {
        const drift = () => {
          gsap.to(b, {
            x: gsap.utils.random(-220, 220),
            y: gsap.utils.random(-160, 160),
            scale: gsap.utils.random(0.85, 1.25),
            duration: gsap.utils.random(9, 15),
            ease: 'sine.inOut',
            onComplete: drift,
          });
        };
        gsap.delayedCall(i * 0.4, drift);
      });
    },
    { scope: root },
  );

  return (
    <div className="ambient" ref={root} aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="grid-overlay" />
    </div>
  );
}
