import { ValueOf } from 'shared/types/common.types';

export const ReasonType = {
  first: 'first',
  second: 'second',
  third: 'third',
} as const;

export type ReasonType = ValueOf<typeof ReasonType>;
