/** Parte un texto en palabras y letras para animarlas una por una. */
export function Split({ text }: { text: string }) {
  return (
    <span className="split" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="w" key={i} aria-hidden="true">
          {[...w].map((c, j) => (
            <span className="ch" key={j}>
              {c}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
