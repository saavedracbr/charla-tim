import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BLOCKS } from '../content/talk';
import { slides } from '../slides';
import { Ambient } from './Ambient';
import { Clock } from './Clock';
import { gsap, reduced } from './anim';

type Pos = { i: number; step: number };

const STAGE_W = 1920;
const STAGE_H = 1080;
const START_KEY = 'charla-tim-inicio';

const clampPos = (i: number, step: number): Pos => {
  const ci = Math.min(Math.max(i, 0), slides.length - 1);
  return { i: ci, step: Math.min(Math.max(step, 0), slides[ci].steps) };
};

function readHash(): Pos {
  const m = window.location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
  if (!m) return { i: 0, step: 0 };
  return clampPos(Number(m[1]) - 1, Number(m[2] ?? 0));
}

function readStart(): number | null {
  try {
    const v = sessionStorage.getItem(START_KEY);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

function writeStart(v: number | null) {
  try {
    if (v) sessionStorage.setItem(START_KEY, String(v));
    else sessionStorage.removeItem(START_KEY);
  } catch {
    /* ignorar */
  }
}

export function Deck() {
  const [pos, setPos] = useState<Pos>(readHash);
  const [scale, setScale] = useState(1);
  const [startedAt, setStartedAt] = useState<number | null>(readStart);
  const [showClock, setShowClock] = useState(true);
  const posRef = useRef(pos);
  const startRef = useRef(startedAt);
  const wrap = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const apply = useCallback((next: Pos) => {
    posRef.current = next;
    setPos(next);
    const hash = `#/${next.i + 1}${next.step ? `/${next.step}` : ''}`;
    window.history.replaceState(null, '', hash);
  }, []);

  const move = useCallback(
    (next: Pos) => {
      const cur = posRef.current;
      if (next.i === cur.i && next.step === cur.step) return;
      if (cur.i === 0 && next.i > 0 && !startRef.current) {
        const t = Date.now();
        startRef.current = t;
        setStartedAt(t);
        writeStart(t);
      }
      if (next.i === cur.i || reduced || !wrap.current) {
        apply(next);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      gsap.to(wrap.current, {
        autoAlpha: 0,
        scale: 0.985,
        duration: 0.16,
        ease: 'power1.in',
        onComplete: () => {
          flushSync(() => apply(next));
          gsap.set(wrap.current, { autoAlpha: 1, scale: 1 });
          busy.current = false;
        },
      });
    },
    [apply],
  );

  const next = useCallback(() => {
    const { i, step } = posRef.current;
    if (step < slides[i].steps) move({ i, step: step + 1 });
    else if (i < slides.length - 1) move({ i: i + 1, step: 0 });
  }, [move]);

  const prev = useCallback(() => {
    const { i, step } = posRef.current;
    if (step > 0) move({ i, step: step - 1 });
    else if (i > 0) move({ i: i - 1, step: slides[i - 1].steps });
  }, [move]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'ArrowDown') {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (k === 'Home') {
        move({ i: 0, step: 0 });
      } else if (k === 'End') {
        move({ i: slides.length - 1, step: 0 });
      } else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      } else if (k === 't' || k === 'T') {
        setShowClock((v) => !v);
      } else if (k === 'r' || k === 'R') {
        startRef.current = null;
        setStartedAt(null);
        writeStart(null);
      }
    };
    const onHash = () => {
      const h = readHash();
      if (h.i !== posRef.current.i || h.step !== posRef.current.step) move(h);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, [next, prev, move]);

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const def = slides[pos.i];
  const Slide = def.C;
  const blockIdx = BLOCKS.findIndex((b) => b.id === def.block);
  const inBlock = slides.filter((s) => s.block === def.block);
  const blockProgress = (inBlock.indexOf(def) + (pos.step + 1) / (def.steps + 1)) / inBlock.length;

  return (
    <div className="deck">
      <Ambient />
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <div className="slide-wrap" ref={wrap}>
          <Slide key={def.id} step={pos.step} />
        </div>

        <div className="chrome">
          <span className="counter">
            {String(pos.i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <div className="progress" aria-hidden="true">
            {BLOCKS.map((b, idx) => {
              const prevEnd = idx ? BLOCKS[idx - 1].end : 0;
              const fill = idx < blockIdx ? 1 : idx === blockIdx ? Math.min(blockProgress, 1) : 0;
              return (
                <div key={b.id} className={`seg${idx === blockIdx ? ' current' : ''}`} style={{ flexGrow: b.end - prevEnd }}>
                  <i style={{ transform: `scaleX(${fill})` }} />
                  <span>{b.label}</span>
                </div>
              );
            })}
          </div>
          {showClock && <Clock startedAt={startedAt} block={def.block} />}
        </div>
      </div>
    </div>
  );
}
