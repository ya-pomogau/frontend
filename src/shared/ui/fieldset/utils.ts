import { ValueOf } from 'shared/types/common.types';

export const FieldsetView = {
  COLUMN: 'COLUMN',
  TWO_COLUMNS: 'TWO_COLUMNS',
  ROW: 'ROW',
} as const;

export type FieldsetView = ValueOf<typeof FieldsetView>;
