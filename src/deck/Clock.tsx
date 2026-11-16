import { useEffect, useState } from 'react';
import { BLOCKS, BlockId, TALK } from '../content/talk';

const fmt = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/** Reloj de presentador: tiempo transcurrido y si el bloque actual va a tiempo. */
export function Clock({ startedAt, block }: { startedAt: number | null; block: BlockId }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  const elapsed = startedAt ? (now - startedAt) / 1000 : 0;
  const b = BLOCKS.find((x) => x.id === block)!;
  const blockEnd = b.end * 60;
  const late = elapsed - blockEnd;
  const state = !startedAt ? 'idle' : late > 0 ? 'late' : late > -30 ? 'warn' : 'ok';

  return (
    <div className={`clock ${state}`} role="timer" aria-label="Reloj de presentador">
      <span className="clock-time">{fmt(elapsed)}</span>
      <span className="clock-total">/ {TALK.totalMinutes}:00</span>
      <span className="clock-block">
        {b.label} · {state === 'late' ? `+${fmt(late)}` : `hasta ${fmt(blockEnd)}`}
      </span>
    </div>
  );
}
