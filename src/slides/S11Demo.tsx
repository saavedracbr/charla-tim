import { useEffect, useRef, useState } from 'react';
import { DEMO_BACKUP, DEMO_BRAND, DEMO_PUBLISHED_URL, DEMO_STEPS } from '../content/talk';
import { useSlideAnim } from '../deck/anim';
import type { SlideProps } from '../deck/types';

export function S11Demo({ step }: SlideProps) {
  const root = useRef<HTMLElement>(null);
  const [backup, setBackup] = useState(false);
  useSlideAnim(root, step);

  const shot = step > 0 ? DEMO_BACKUP[step - 1] : undefined;

  // B muestra u oculta la captura de respaldo del paso actual (si existe).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'b' || e.key === 'B') setBackup((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="slide s-demo" ref={root}>
      <div className="demo-left">
        <p className="kicker" data-enter>
          Demo en vivo
        </p>
        <h2 className="brand" data-enter>
          {DEMO_BRAND.name}
          <small>{DEMO_BRAND.meaning}</small>
        </h2>
        <p className="lede" data-enter>
          {DEMO_BRAND.tagline}
        </p>
        <dl className="mini-canvas">
          {DEMO_BRAND.canvas.map((c) => (
            <div key={c.k} data-enter>
              <dt>{c.k}</dt>
              <dd>{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="demo-steps">
        {DEMO_STEPS.map((s, i) => {
          const n = i + 1;
          const state = step === n ? 'active' : step > n ? 'done' : 'todo';
          return (
            // El estado va en un div interno: GSAP anima el <li> y dejaría fijos su opacidad y transform.
            <li key={s.title} data-enter>
              <div className={`demo-step ${state}`}>
                <span className="n">{step > n ? '✓' : n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {backup && shot && (
        <div className="backup">
          <img src={shot} alt={`Captura de respaldo del paso ${step}`} />
          {step === DEMO_STEPS.length && (
            <p className="backup-url">Publicada en {DEMO_PUBLISHED_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}</p>
          )}
        </div>
      )}
    </section>
  );
}
