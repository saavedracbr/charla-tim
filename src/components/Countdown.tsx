import { useCallback, useEffect, useRef, useState } from 'react';

const R = 230;
const C = 2 * Math.PI * R;

/** Cronómetro del sprint. Enter inicia o pausa; 0 reinicia. Usa la hora real, así no se desfasa al cambiar de pestaña. */
export function Countdown({ seconds }: { seconds: number }) {
  const total = seconds * 1000;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const end = useRef(0);
  const leftRef = useRef(total);
  leftRef.current = left;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const tick = () => {
      const l = Math.max(0, end.current - Date.now());
      setLeft(l);
      if (l <= 0) {
        setRunning(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Si la pestaña queda en segundo plano, rAF se pausa: este intervalo mantiene el final exacto.
    const iv = window.setInterval(() => {
      if (end.current - Date.now() <= 0) {
        setLeft(0);
        setRunning(false);
      }
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
  }, [running]);

  const toggle = useCallback(() => {
    setRunning((r) => {
      if (r) return false;
      if (leftRef.current <= 0) return false;
      end.current = Date.now() + leftRef.current;
      return true;
    });
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setLeft(total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        toggle();
      } else if (e.key === '0') {
        reset();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle, reset]);

  const secs = Math.ceil(left / 1000);
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, '0');
  const done = left <= 0;
  const urgent = !done && secs <= 60;
  const state = done ? 'done' : urgent ? 'urgent' : running ? 'running' : 'idle';

  return (
    <div className={`countdown ${state}`}>
      <svg viewBox="0 0 520 520" aria-hidden="true">
        <circle className="track" cx="260" cy="260" r={R} />
        <circle
          className="ring"
          cx="260"
          cy="260"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - left / total)}
          transform="rotate(-90 260 260)"
        />
      </svg>
      <div className="countdown-face" role="timer" aria-live="off">
        {done ? (
          <span className="countdown-done">¡Tiempo!</span>
        ) : (
          <span className="countdown-time">
            {mm}:{ss}
          </span>
        )}
        <span className="countdown-hint">
          {done ? '0 para reiniciar' : running ? 'Enter para pausar' : 'Enter para iniciar'}
        </span>
      </div>
      <div className="countdown-btns">
        <button type="button" onClick={toggle} tabIndex={-1}>
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button type="button" onClick={reset} tabIndex={-1}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
