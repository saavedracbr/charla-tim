import type { SlideDef } from '../deck/types';
import { DEMO_STEPS } from '../content/talk';
import { S01Portada } from './S01Portada';
import { S02QuienSoy } from './S02QuienSoy';
import { S03Ventas } from './S03Ventas';
import { S04Erp } from './S04Erp';
import { S05Puente } from './S05Puente';
import { S06Recorrido } from './S06Recorrido';
import { S07Mvp } from './S07Mvp';
import { S08Criterios } from './S08Criterios';
import { S09Preguntas } from './S09Preguntas';
import { S10Aloe } from './S10Aloe';
import { S11Demo } from './S11Demo';
import { S12Sprint } from './S12Sprint';
import { S13Cierre } from './S13Cierre';

/** Orden de la charla. `steps` = cuántas veces se pulsa → dentro de la diapositiva antes de avanzar. */
export const slides: SlideDef[] = [
  { id: 'portada', block: 'historia', steps: 0, C: S01Portada },
  { id: 'quien-soy', block: 'historia', steps: 1, C: S02QuienSoy },
  { id: 'ventas', block: 'historia', steps: 3, C: S03Ventas },
  { id: 'erp', block: 'historia', steps: 1, C: S04Erp },
  { id: 'puente', block: 'puente', steps: 1, C: S05Puente },
  { id: 'recorrido', block: 'puente', steps: 1, C: S06Recorrido },
  { id: 'mvp', block: 'puente', steps: 2, C: S07Mvp },
  { id: 'criterios', block: 'criterios', steps: 4, C: S08Criterios },
  { id: 'preguntas', block: 'preguntas', steps: 0, C: S09Preguntas },
  { id: 'aloe', block: 'demo', steps: 1, C: S10Aloe },
  { id: 'demo', block: 'demo', steps: DEMO_STEPS.length, C: S11Demo },
  { id: 'sprint', block: 'sprint', steps: 0, C: S12Sprint },
  { id: 'cierre', block: 'sprint', steps: 0, C: S13Cierre },
];
