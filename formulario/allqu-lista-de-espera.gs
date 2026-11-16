/**
 * Allqu · Lista de espera
 * Formulario de Google para la demo de la charla "De la idea al MVP con IA" (Círculo TIM).
 * Allqu es una marca ficticia: el formulario lo dice en la descripción y en el mensaje final.
 *
 * CÓMO USARLO (2 minutos)
 *  1. Abre https://script.new con la cuenta de Google donde quieres el formulario.
 *  2. Borra el contenido, pega este archivo completo y guarda (Ctrl+S).
 *  3. Elige la función `crearFormularioAllqu` en la barra superior y pulsa Ejecutar.
 *  4. Autoriza el acceso cuando lo pida (Formularios y Hojas de cálculo).
 *  5. En el Registro de ejecución aparecen tres enlaces: responder, editar y la hoja de respuestas.
 *
 * ANTES DE LA CHARLA
 *  - Abre el enlace de "Responder" en una ventana de incógnito. Si pide iniciar sesión, el formulario
 *    quedó restringido a la universidad: en el formulario, entra a Publicar (o Configuración → Respuestas)
 *    y deja que responda "Cualquier persona que tenga el enlace".
 *  - Ejecuta `limpiarRespuestasDePrueba` para borrar los ensayos y empezar la demo en cero.
 *
 * QUÉ MIDE CADA PREGUNTA
 *  1. Nombre                → para escribirle a la persona, no a "un lead".
 *  2. Correo o WhatsApp     → la inscripción en sí: es el número que cuenta como señal.
 *  3. Tamaño del perro      → qué presentación fabricar primero.
 *  4. Gasto mensual actual  → cuánto están dispuestos a pagar; separa curiosos de compradores.
 *  5. Qué te haría comprar  → sus palabras exactas, para el siguiente texto de la landing. Opcional.
 */

const TITULO = 'Allqu · Lista de espera';

const DESCRIPCION = [
  'Snacks naturales para perros con quinua, camote y kiwicha. Cinco ingredientes que sí puedes leer.',
  '',
  'Déjanos tus datos y te avisamos cuando abramos los primeros pedidos en Lima. Toma menos de un minuto.',
  '',
  'Aviso: Allqu es una marca ficticia creada para una demostración en clase. No se venderá ningún producto ' +
    'y las respuestas se borran al terminar la sesión.',
].join('\n');

const CONFIRMACION =
  '¡Listo! Ya estás en la lista de espera de Allqu. Te escribiremos apenas abramos pedidos.\n\n' +
  '(Demostración en clase: Allqu es una marca ficticia.)';

function crearFormularioAllqu() {
  const form = FormApp.create(TITULO);

  form
    .setDescription(DESCRIPCION)
    .setConfirmationMessage(CONFIRMACION)
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(false);

  // Solo existe en cuentas de Workspace (como @aloe); en una cuenta personal lanza un error que se ignora.
  intentar(function () {
    form.setRequireLogin(false);
  });

  form.addTextItem().setTitle('¿Cómo te llamas?').setRequired(true);

  form
    .addTextItem()
    .setTitle('Correo o WhatsApp')
    .setHelpText('Solo para avisarte del lanzamiento.')
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('¿De qué tamaño es tu perro?')
    .setChoiceValues(['Pequeño (hasta 10 kg)', 'Mediano (10 a 25 kg)', 'Grande (más de 25 kg)', 'Tengo más de un perro'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('¿Cuánto gastas al mes en snacks para tu perro?')
    .setChoiceValues(['Hoy no le compro snacks', 'Menos de S/ 30', 'Entre S/ 30 y S/ 60', 'Más de S/ 60'])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('¿Qué te haría comprarlo?')
    .setHelpText('Opcional. Cuéntalo con tus palabras: precio, ingredientes, dónde lo encontrarías…')
    .setRequired(false);

  // Hoja de cálculo donde cae cada inscripción.
  const hoja = SpreadsheetApp.create(TITULO + ' (respuestas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hoja.getId());

  // Los formularios nuevos pueden nacer sin publicar; esto los deja listos para recibir respuestas.
  intentar(function () {
    if (form.supportsAdvancedResponderPermissions()) form.setPublished(true);
  });
  intentar(function () {
    form.setAcceptingResponses(true);
  });

  PropertiesService.getScriptProperties().setProperty('FORM_ID', form.getId());

  let enlace = form.getPublishedUrl();
  intentar(function () {
    enlace = form.shortenFormUrl(enlace);
  });

  Logger.log('Responder (este va en el botón de la landing): ' + enlace);
  Logger.log('Editar el formulario: ' + form.getEditUrl());
  Logger.log('Hoja de respuestas: ' + hoja.getUrl());
}

/** Borra las respuestas de ensayo del formulario y de la hoja. Úsalo justo antes de la charla y al terminar. */
function limpiarRespuestasDePrueba() {
  const id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!id) throw new Error('Primero ejecuta crearFormularioAllqu.');

  const form = FormApp.openById(id);
  form.deleteAllResponses();

  SpreadsheetApp.openById(form.getDestinationId())
    .getSheets()
    .filter(function (s) {
      return s.getFormUrl();
    })
    .forEach(function (s) {
      const filas = s.getLastRow() - 1;
      if (filas > 0) s.deleteRows(2, filas);
    });

  Logger.log('Respuestas borradas. El formulario sigue activo.');
}

function intentar(fn) {
  try {
    fn();
  } catch (e) {
    Logger.log('Paso omitido: ' + e.message);
  }
}
