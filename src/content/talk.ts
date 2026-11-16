// Todo el contenido editable de la charla vive aquí y en prompts.ts.

/** Dirección pública del sitio. Los QR apuntan aquí aunque la presentación corra en local. */
export const PUBLIC_URL = 'https://tim.saavedracbr.com/';
export const KIT_URL = `${PUBLIC_URL}kit/`;
export const KIT_URL_LABEL = KIT_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

export const TALK = {
  title: 'De la idea al MVP con IA',
  event: 'Círculo TIM · Universidad de Lima',
  date: '17 de noviembre de 2026',
  speaker: 'Bruno Saavedra',
  speakerRole: 'Ingeniería Industrial · 8.º ciclo',
  web: 'saavedracbr.com',
  linkedin: 'linkedin.com/in/saavedracbr',
  totalMinutes: 30,
};

export type BlockId = 'historia' | 'puente' | 'criterios' | 'preguntas' | 'demo' | 'sprint';

/** Bloques del guion. `end` es el minuto en que el bloque debe terminar. */
export const BLOCKS: { id: BlockId; label: string; end: number }[] = [
  { id: 'historia', label: 'Historia', end: 4 },
  { id: 'puente', label: 'Puente', end: 6 },
  { id: 'criterios', label: 'Criterios', end: 10 },
  { id: 'preguntas', label: 'Preguntas', end: 14 },
  { id: 'demo', label: 'Demo', end: 22 },
  { id: 'sprint', label: 'Sprint', end: 30 },
];

export const SPRINT_SECONDS = 8 * 60;

/** Recorrido del ciclo, según lo que TIM ha publicado en su LinkedIn. */
export const JOURNEY: { label: string; now?: boolean }[] = [
  { label: 'Tendencias' },
  { label: 'Lean Canvas' },
  { label: 'Customer Journey' },
  { label: 'Propuesta de valor' },
  { label: 'MVP', now: true },
];

/**
 * Avance agregado por hito (equipos que lo completaron), en el mismo orden que JOURNEY.
 * Es un dato interno del círculo: se deja en null hasta confirmar con TIM que puede mostrarse.
 * Ejemplo: { total: 6, done: [6, 6, 6, 6, 0] }
 */
export const JOURNEY_PROGRESS: { total: number; done: number[] } | null = null;

export const CRITERIA: { title: string; detail: string }[] = [
  {
    title: 'El contexto pesa más que el prompt',
    detail: 'Pega tu lienzo completo. Sin contexto, la IA le escribe a un cliente genérico.',
  },
  {
    title: 'La IA construye; el cliente valida',
    detail: 'Una landing bonita no es evidencia. Un correo inscrito, sí.',
  },
  {
    title: 'Verifica lo que afirma',
    detail: 'Cifras, precios y competidores: confirma la fuente antes de usarlos.',
  },
  {
    title: 'Define la señal antes de lanzar',
    detail: '¿Cuántas inscripciones en una semana significan "seguimos"? Decídelo hoy.',
  },
];

/** Lo que incluye la cuenta @aloe (noviembre de 2026). */
export const ALOE = {
  models: ['Gemini 4 Hydrogen', 'Gemini 4 Hydrogen Thinking', 'Gemini 3.1 Pro'],
  tools: [
    { name: 'Canvas', use: 'Crea páginas web y prototipos que puedes ver y editar al instante.' },
    { name: 'Deep Research', use: 'Investiga competencia y mercado, con fuentes.' },
    { name: 'Gemini Notebook', use: 'Resume entrevistas y documentos largos.' },
  ],
  privacy: 'En las cuentas educativas, tus chats no se usan para entrenar modelos.',
};

/** Marca ficticia de la demo. */
export const DEMO_BRAND = {
  name: 'Allqu',
  meaning: '"perro" en quechua',
  tagline: 'Snacks naturales para perros con insumos andinos',
  canvas: [
    { k: 'Cliente', v: 'Dueños de perros en Lima, de 25 a 40 años, que los tratan como familia.' },
    { k: 'Dolor', v: 'No confían en snacks industriales con ingredientes que no entienden.' },
    { k: 'Beneficio', v: 'Premios con 5 ingredientes andinos que sí pueden leer.' },
  ],
};

export const DEMO_STEPS: { title: string; detail: string }[] = [
  { title: 'Pegar el lienzo como contexto', detail: 'Cliente, dolor y beneficio: lo que ya tienen escrito.' },
  { title: 'Prompt maestro con Canvas', detail: 'Gemini genera la landing completa en una sola respuesta.' },
  { title: 'Una iteración', detail: 'Pedir un cambio en lenguaje natural y ver el resultado.' },
  { title: 'Conectar la lista de espera', detail: 'El botón abre un Google Form; las respuestas caen en Sheets.' },
  { title: 'Compartir', detail: 'Un enlace que se puede enviar hoy a clientes reales.' },
];

/**
 * Respaldo de la demo: capturas en public/demo/ (una por paso, en orden).
 * Ejemplo: ['demo/paso-1.png', 'demo/paso-2.png', ...]
 */
export const DEMO_BACKUP: string[] = [];

export const SPRINT_STEPS = [
  'Abran el kit con el QR.',
  'Completen 5 datos de su lienzo y copien el prompt.',
  'Péguenlo en Gemini con Canvas, desde su cuenta @aloe.',
];

export const NEXT_STEPS = [
  'Conecten el botón a un Google Form.',
  'Compartan el enlace con 10 clientes reales.',
  'Cuenten inscripciones, no opiniones.',
];
