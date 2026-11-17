import { ALOE, CRITERIA, TALK } from '../content/talk';
import { BEYOND_PROMPTS, ITERATION_PROMPTS, SIGNAL_TEMPLATE } from '../content/prompts';
import { CopyButton } from './CopyButton';
import { PromptBuilder } from './PromptBuilder';

const NAV = [
  ['#cuenta', 'Tu cuenta'],
  ['#prompt', 'Prompt maestro'],
  ['#iterar', 'Iterar'],
  ['#lista', 'Lista de espera'],
  ['#publicar', 'Publicar'],
  ['#senal', 'Tu señal'],
  ['#mas', 'Ir más allá'],
  ['#criterios', 'Criterios'],
];

function PromptCard({ title, prompt, tool, why }: { title: string; prompt: string; tool?: string; why?: string }) {
  return (
    <article className="prompt-card">
      <header>
        <div>
          {tool && <span className="tag">{tool}</span>}
          <h3>{title}</h3>
        </div>
        <CopyButton text={prompt} />
      </header>
      {why && <p className="why">{why}</p>}
      <pre className="prompt-box small">{prompt}</pre>
    </article>
  );
}

export function Kit() {
  return (
    <div className="kit">
      <header className="kit-hero">
        <p className="kicker">Kit MVP · {TALK.event}</p>
        <h1>
          De la idea al <em>MVP</em> con IA
        </h1>
        <p className="lead">
          Todo lo que necesitas para construir la landing de tu emprendimiento con Gemini, usando la cuenta que ya te
          da la universidad. Empieza por el prompt maestro: en 8 minutos tienes una primera versión.
        </p>
        <nav className="kit-nav" aria-label="Secciones">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="cuenta">
          <span className="num">0</span>
          <h2>Entra con tu cuenta @aloe</h2>
          <p>
            Abre <a href="https://gemini.google.com" target="_blank" rel="noreferrer">gemini.google.com</a> y revisa,
            en tu foto de perfil, que estés en la cuenta de la universidad y no en la personal. No necesitas pagar nada.
          </p>
          <div className="grid-2">
            <div className="box">
              <h3>Modelos disponibles</h3>
              <ul className="plain">
                {ALOE.models.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="fine">
                Para construir la página usa un modelo Thinking o Pro: tardan un poco más y cometen menos errores.
              </p>
            </div>
            <div className="box">
              <h3>Herramientas</h3>
              <ul className="plain">
                {ALOE.tools.map((t) => (
                  <li key={t.name}>
                    <strong>{t.name}.</strong> {t.use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="note">{ALOE.privacy}</p>
        </section>

        <section id="prompt">
          <span className="num">1</span>
          <h2>Arma tu prompt maestro</h2>
          <p>
            Completa los 5 datos con lo que ya escribiste en tu Lienzo de Propuesta de Valor. Mientras más concreto el
            cliente y su dolor, mejor sale la página.
          </p>
          <PromptBuilder />
          <ol className="steps">
            <li>
              En Gemini, activa <strong>Canvas</strong> desde las herramientas del cuadro de mensaje.
            </li>
            <li>Pega el prompt y envíalo. La página aparece a la derecha, en la vista previa.</li>
            <li>Léela completa antes de cambiar nada: anota qué suena falso o genérico.</li>
          </ol>
        </section>

        <section id="iterar">
          <span className="num">2</span>
          <h2>Itera en el mismo chat</h2>
          <p>
            La primera versión nunca es la final. Pide un cambio a la vez y revisa el resultado antes de pedir el
            siguiente.
          </p>
          <div className="cards">
            {ITERATION_PROMPTS.map((p) => (
              <PromptCard key={p.title} title={p.title} prompt={p.prompt} />
            ))}
          </div>
        </section>

        <section id="lista">
          <span className="num">3</span>
          <h2>Conecta la lista de espera</h2>
          <p>La página generada no guarda datos por sí sola. Un formulario de Google resuelve eso en dos minutos.</p>
          <ol className="steps">
            <li>
              Crea un formulario en{' '}
              <a href="https://forms.new" target="_blank" rel="noreferrer">
                forms.new
              </a>{' '}
              con 3 preguntas: nombre, correo o WhatsApp, y "¿qué te haría comprarlo?". Si quieres segmentar, suma
              una o dos de opción múltiple (por ejemplo, cuánto gasta hoy en algo parecido). Cada pregunta extra te
              cuesta inscritos.
            </li>
            <li>
              Publica el formulario y copia el enlace para responder (botón <strong>Enviar</strong> o{' '}
              <strong>Publicar</strong>, ícono de enlace).
            </li>
            <li>
              Si lo creaste con tu cuenta @aloe, revisa quién puede responder: debe decir{' '}
              <strong>Cualquier persona que tenga el enlace</strong>, no solo usuarios de la universidad. Pruébalo
              abriendo el enlace en una ventana de incógnito.
            </li>
            <li>
              Pídele a Gemini: <em>"Haz que todos los botones abran este enlace en una pestaña nueva: [enlace]"</em>.
            </li>
            <li>
              En la pestaña <strong>Respuestas</strong> del formulario, vincúlalo a una hoja de cálculo. Ahí verás cada
              inscripción.
            </li>
          </ol>
        </section>

        <section id="publicar">
          <span className="num">4</span>
          <h2>Publica tu landing</h2>
          <p>
            Con la cuenta @aloe, Canvas no permite compartir con enlace ni exportar a Google Sites. Sí deja descargar el
            código, y con eso basta para publicarla gratis en un par de minutos.
          </p>
          <ol className="steps">
            <li>
              En Canvas, abre <strong>Exportar</strong> y elige <strong>Descargar código</strong>.
            </li>
            <li>
              Crea una carpeta con el nombre de tu proyecto y guarda el archivo dentro como <code>index.html</code>.
              Ábrelo con doble clic para comprobar que se ve bien y que el botón abre tu formulario.
            </li>
            <li>
              Entra a{' '}
              <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer">
                app.netlify.com/drop
              </a>{' '}
              y arrastra la carpeta. En segundos tendrás un enlace que termina en <code>netlify.app</code>.
            </li>
            <li>
              Crea una cuenta gratis (con GitHub o tu correo personal) y reclama el sitio. Sin cuenta, el enlace queda
              protegido con contraseña y se borra al poco tiempo.
            </li>
            <li>
              Cada vez que cambies la landing, descarga el código de nuevo y arrastra la carpeta en la pestaña{' '}
              <strong>Deploys</strong> de tu sitio: el enlace se mantiene.
            </li>
          </ol>
          <p className="note">
            Si no puedes publicar todavía, muéstrala desde tu laptop abriendo el <code>index.html</code>. Sirve para
            entrevistas cara a cara, pero no para medir inscripciones.
          </p>
        </section>

        <section id="senal">
          <span className="num">5</span>
          <h2>Define tu señal antes de compartir</h2>
          <p>
            Decide hoy qué resultado significa "seguimos". Si lo decides después de ver los números, cualquier resultado
            te va a parecer bueno.
          </p>
          <article className="prompt-card">
            <header>
              <h3>Plantilla de señal</h3>
              <CopyButton text={SIGNAL_TEMPLATE} />
            </header>
            <pre className="prompt-box small">{SIGNAL_TEMPLATE}</pre>
          </article>
          <p className="note">
            Comparte la página con personas que calcen con tu cliente ideal, no solo con amigos y familia: ellos se
            inscriben por cariño.
          </p>
        </section>

        <section id="mas">
          <span className="num">6</span>
          <h2>Ir más allá</h2>
          <p>Cuando la landing ya esté recibiendo visitas, estas cuatro tareas ayudan a entender mejor a tu cliente.</p>
          <div className="cards">
            {BEYOND_PROMPTS.map((p) => (
              <PromptCard key={p.title} title={p.title} prompt={p.prompt} tool={p.tool} why={p.why} />
            ))}
          </div>
        </section>

        <section id="criterios">
          <span className="num">7</span>
          <h2>Cuatro criterios para trabajar con IA</h2>
          <ol className="criteria">
            {CRITERIA.map((c) => (
              <li key={c.title}>
                <strong>{c.title}.</strong> {c.detail}
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="kit-footer">
        <p>
          Material de la charla "{TALK.title}", {TALK.date}. Preparado por {TALK.speaker} ·{' '}
          <a href={`https://${TALK.web}`} target="_blank" rel="noreferrer">
            {TALK.web}
          </a>{' '}
          ·{' '}
          <a href={`https://www.${TALK.linkedin}`} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
        <p className="fine">
          Modelos y funciones según lo disponible en las cuentas @aloe en noviembre de 2026. Google puede cambiarlos.
        </p>
        <p className="fine no-print">
          <a href="../">Ver la presentación</a> · <button type="button" className="link-btn" onClick={() => window.print()}>Guardar como PDF</button>
        </p>
      </footer>
    </div>
  );
}
