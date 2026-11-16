export type Brief = {
  nombre: string;
  producto: string;
  cliente: string;
  dolor: string;
  beneficio: string;
  tono: string;
  formUrl: string;
};

export const EMPTY_BRIEF: Brief = {
  nombre: '',
  producto: '',
  cliente: '',
  dolor: '',
  beneficio: '',
  tono: 'Cercano y confiable',
  formUrl: '',
};

export const EXAMPLE_BRIEF: Brief = {
  nombre: 'Allqu',
  producto: 'Snacks naturales para perros hechos con quinua, camote y kiwicha',
  cliente: 'Dueños de perros en Lima, de 25 a 40 años, que tratan a su perro como parte de la familia',
  dolor: 'No confían en los snacks industriales porque no entienden sus ingredientes',
  beneficio: 'Premiar a su perro con un snack de 5 ingredientes andinos que sí pueden leer',
  tono: 'Cercano y confiable',
  formUrl: '',
};

export const TONES = ['Cercano y confiable', 'Divertido y juvenil', 'Premium y sobrio', 'Directo y práctico'];

export const FIELDS: { key: keyof Brief; label: string; hint: string; long?: boolean }[] = [
  { key: 'nombre', label: '1. Nombre del proyecto', hint: 'Como lo conocería un cliente.' },
  { key: 'producto', label: '2. Qué es', hint: 'El producto o servicio en una frase.', long: true },
  { key: 'cliente', label: '3. Cliente ideal', hint: 'Quién es y en qué situación está. Sácalo de tu lienzo.', long: true },
  { key: 'dolor', label: '4. Su mayor dolor hoy', hint: 'Lo que le frustra o le preocupa, en sus palabras.', long: true },
  { key: 'beneficio', label: '5. Lo que gana contigo', hint: 'El resultado para el cliente, no las características.', long: true },
];

const blank = (v: string, placeholder: string) => (v.trim() ? v.trim() : `[${placeholder}]`);

export function buildMasterPrompt(b: Brief): string {
  const link = b.formUrl.trim() || '[PEGA AQUÍ EL ENLACE DE TU FORMULARIO]';
  return `Actúa como diseñador web y redactor publicitario de un emprendimiento peruano que está validando su idea.

CONTEXTO DEL PROYECTO
- Nombre: ${blank(b.nombre, 'nombre del proyecto')}
- Qué es: ${blank(b.producto, 'producto o servicio en una frase')}
- Cliente ideal: ${blank(b.cliente, 'quién es el cliente')}
- Su mayor dolor hoy: ${blank(b.dolor, 'qué le frustra')}
- Lo que gana con nosotros: ${blank(b.beneficio, 'beneficio principal')}
- Tono de la marca: ${blank(b.tono, 'tono')}

TAREA
Crea en Canvas una landing page de una sola página, lista para mostrar a clientes reales. Su único objetivo es que el visitante se inscriba en la lista de espera.

ESTRUCTURA
1. Encabezado con el nombre, una frase principal centrada en el beneficio (no en el producto) y un botón "Quiero ser de los primeros".
2. Sección "El problema": 3 situaciones concretas que vive el cliente, dichas en sus palabras.
3. Sección "Cómo funciona": 3 pasos simples.
4. Sección de beneficios: 3 beneficios, cada uno con un ícono.
5. Cierre con el mismo botón y una frase que invite a inscribirse a la primera tanda.

REGLAS
- Español del Perú, frases cortas, sin tecnicismos.
- No inventes testimonios, cifras, precios, premios ni certificaciones. Si falta un dato, deja un texto entre corchetes, por ejemplo [precio por definir].
- Diseño moderno y adaptable a celular, con una paleta de 2 o 3 colores acorde al tono.
- Todos los botones abren este enlace en una pestaña nueva: ${link}
- Entrega todo en un solo archivo HTML, con el CSS y el JavaScript incluidos.`;
}

export const ITERATION_PROMPTS: { title: string; prompt: string }[] = [
  {
    title: 'Probar otros titulares',
    prompt:
      'Dame 5 versiones de la frase principal. Cada una debe hablar del resultado para el cliente y tener menos de 10 palabras. Luego aplica en la página la que consideres más clara y dime por qué.',
  },
  {
    title: 'Leerla como el cliente',
    prompt:
      'Revisa la página como si fueras el cliente ideal que te describí. Dime qué no se entiende, qué te haría desconfiar y qué te falta para inscribirte. Después corrige esos puntos en la página.',
  },
  {
    title: 'Ajustar el estilo',
    prompt:
      'Mantén el contenido y cambia el estilo visual: [describe el estilo, por ejemplo "más juvenil, colores cálidos, tipografía redondeada"]. Revisa que el botón principal sea lo que más destaca.',
  },
  {
    title: 'Revisar en celular',
    prompt:
      'Revisa cómo se ve la página en un celular de pantalla pequeña. Corrige textos que se corten, botones difíciles de tocar y secciones demasiado largas.',
  },
  {
    title: 'Acortar',
    prompt:
      'Reduce el texto de la página a la mitad sin perder el mensaje. Una persona debe entender la propuesta en 10 segundos.',
  },
];

export const BEYOND_PROMPTS: { tool: string; title: string; why: string; prompt: string }[] = [
  {
    tool: 'Deep Research',
    title: 'Mapa de la competencia',
    why: 'Para saber contra quién compites y qué hueco queda libre. Revisa las fuentes que cite antes de usar cualquier dato.',
    prompt:
      'Investiga la competencia de este emprendimiento en el Perú: [describe tu producto y tu cliente]. Identifica competidores directos e indirectos, sus precios, canales de venta y qué promete cada uno. Cierra con una tabla comparativa y con 3 oportunidades que ninguno esté cubriendo. Cita la fuente de cada dato y marca los que no pudiste confirmar.',
  },
  {
    tool: 'Gemini',
    title: 'Guion de entrevistas',
    why: 'Para hablar con clientes reales sin inducir sus respuestas.',
    prompt:
      'Voy a entrevistar a clientes potenciales de este proyecto: [pega tu contexto]. Escribe un guion de 8 preguntas abiertas sobre cómo resuelven hoy el problema, cuánto gastan y qué les frustra. No menciones mi producto ni preguntes "¿lo comprarías?". Agrega 3 señales de que el problema les importa de verdad.',
  },
  {
    tool: 'Gemini Notebook',
    title: 'Sintetizar entrevistas',
    why: 'Sube tus notas o transcripciones como fuentes: las respuestas salen solo de lo que dijeron tus clientes.',
    prompt:
      'A partir de estas entrevistas, lista los 5 problemas más repetidos, con una cita textual de respaldo para cada uno y cuántas personas lo mencionaron. Separa lo que dijeron que hacen de lo que dijeron que harían.',
  },
  {
    tool: 'Gemini',
    title: 'Contexto reutilizable',
    why: 'Guarda el resultado en un Google Doc y pégalo al inicio de cada chat nuevo. Si tu cuenta tiene Gems, crea uno con ese texto.',
    prompt:
      'Con todo lo que te conté de mi proyecto, redacta una ficha de contexto de máximo 200 palabras con: qué es, cliente ideal, dolor, beneficio, tono de marca y qué estamos validando ahora. La usaré para darte contexto en futuros chats.',
  },
];

export const SIGNAL_TEMPLATE =
  'Si en 7 días, de [N] personas que vean la página, se inscriben al menos [X], seguimos con este producto. Si no, cambiamos [el cliente / el mensaje / la oferta] y volvemos a probar.';
