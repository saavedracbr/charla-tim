import { useEffect, useMemo, useState } from 'react';
import { Brief, EMPTY_BRIEF, EXAMPLE_BRIEF, FIELDS, TONES, buildMasterPrompt } from '../content/prompts';
import { CopyButton } from './CopyButton';

const STORE_KEY = 'kit-mvp-brief-v1';

function loadBrief(): Brief {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return { ...EMPTY_BRIEF, ...JSON.parse(raw) };
  } catch {
    /* sin almacenamiento: se empieza en blanco */
  }
  return EMPTY_BRIEF;
}

export function PromptBuilder() {
  const [brief, setBrief] = useState<Brief>(loadBrief);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(brief));
    } catch {
      /* ignorar */
    }
  }, [brief]);

  const prompt = useMemo(() => buildMasterPrompt(brief), [brief]);
  const filled = FIELDS.filter((f) => brief[f.key].trim()).length;
  const set = (key: keyof Brief, value: string) => setBrief((b) => ({ ...b, [key]: value }));

  return (
    <div className="builder">
      <div className="builder-form">
        {FIELDS.map((f) => (
          <label key={f.key} className="field">
            <span className="field-label">{f.label}</span>
            <span className="field-hint">{f.hint}</span>
            {f.long ? (
              <textarea rows={3} value={brief[f.key]} onChange={(e) => set(f.key, e.target.value)} />
            ) : (
              <input type="text" value={brief[f.key]} onChange={(e) => set(f.key, e.target.value)} />
            )}
          </label>
        ))}

        <label className="field">
          <span className="field-label">Tono de la marca</span>
          <select value={brief.tono} onChange={(e) => set('tono', e.target.value)}>
            {TONES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Enlace de tu formulario (opcional)</span>
          <span className="field-hint">Si aún no lo tienes, déjalo vacío y agrégalo en el paso 3.</span>
          <input
            type="url"
            inputMode="url"
            placeholder="https://forms.gle/…"
            value={brief.formUrl}
            onChange={(e) => set('formUrl', e.target.value)}
          />
        </label>

        <div className="builder-actions">
          <button type="button" className="ghost-btn" onClick={() => setBrief(EXAMPLE_BRIEF)}>
            Ver ejemplo (Allqu)
          </button>
          <button type="button" className="ghost-btn" onClick={() => setBrief(EMPTY_BRIEF)}>
            Limpiar
          </button>
        </div>
      </div>

      <div className="builder-out">
        <div className="builder-out-head">
          <span className="builder-count">
            {filled} de {FIELDS.length} datos completos
          </span>
          <CopyButton text={prompt} label="Copiar prompt" big />
        </div>
        <pre className="prompt-box" tabIndex={0}>
          {prompt}
        </pre>
        <p className="builder-note">
          Los textos entre corchetes son datos que faltan. Puedes copiarlo igual y completarlos en Gemini.
        </p>
      </div>
    </div>
  );
}
