import { ValueOf } from 'shared/types/common.types';

export const reasonType = {
  first: 'first',
  second: 'second',
  third: 'third',
} as const;

export type ReasonType = ValueOf<typeof reasonType>;
