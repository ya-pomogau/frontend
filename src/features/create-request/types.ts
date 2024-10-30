import { ValueOf } from 'shared/types/common.types';

export const currentPage = {
  DATE_STEP: 1,
  ADDRESS_STEP: 2,
  TASK_STEP: 3,
  COMMON_STEP: 4,
} as const;

export type CurrentPage = ValueOf<typeof currentPage>;
