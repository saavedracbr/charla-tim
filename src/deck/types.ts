import type { ComponentType } from 'react';
import type { BlockId } from '../content/talk';

export type SlideProps = { step: number };

export type SlideDef = {
  id: string;
  block: BlockId;
  /** Cantidad de pasos internos (revelados con → antes de pasar a la siguiente). */
  steps: number;
  C: ComponentType<SlideProps>;
};
