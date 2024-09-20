import { ValueOf } from 'shared/types/common.types';

export const fieldsetView = {
  COLUMN: 'COLUMN',
  TWO_COLUMNS: 'TWO_COLUMNS',
  ROW: 'ROW',
} as const;

export type FieldsetView = ValueOf<typeof fieldsetView>;
