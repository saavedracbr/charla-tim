import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, useRef } from 'react';

gsap.registerPlugin(useGSAP);

export const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stepOf = (el: HTMLElement) => Number(el.dataset.step ?? 0);

/**
 * Animación base de cada diapositiva.
 * - [data-enter]: entra al montar la diapositiva.
 * - [data-step="n"]: aparece cuando el paso actual llega a n.
 */
export function useSlideAnim(root: RefObject<HTMLElement | null>, step: number) {
  const prev = useRef(step);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const all = gsap.utils.toArray<HTMLElement>('[data-enter], [data-step]', el);
      const hidden = all.filter((n) => n.dataset.step !== undefined && stepOf(n) > step);
      const shown = all.filter((n) => !hidden.includes(n));
      gsap.set(hidden, { autoAlpha: 0, y: 36 });
      if (reduced) return;
      gsap.from(shown, {
        autoAlpha: 0,
        y: 46,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.08,
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prev.current === step) return;
      const forward = step > prev.current;
      prev.current = step;
      gsap.utils.toArray<HTMLElement>('[data-step]', el).forEach((n) => {
        const s = stepOf(n);
        if (s > step) {
          gsap.to(n, { autoAlpha: 0, y: 36, duration: reduced ? 0 : 0.25, overwrite: true });
        } else if (forward && s === step) {
          gsap.fromTo(
            n,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.6, ease: 'power3.out', overwrite: true },
          );
        }
      });
    },
    { dependencies: [step], scope: root },
  );
}

export { gsap, useGSAP };
