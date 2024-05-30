import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';

export type ExtraParamsThunkType<T = DefaultRejectValue> = {
  rejectValue: T;
  state: RootState;
};

export interface DefaultRejectValue {
  message?: string[] | string;
  statusCode?: number;
  error?: string;
}

export default <Returned, ThunkArg, RejectValue = DefaultRejectValue>(
  action: AsyncThunk<Returned, ThunkArg, ExtraParamsThunkType<RejectValue>>
) => {
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const execute = useCallback(
    async (actionPayload: ThunkArg) => {
      try {
        setIsExecuting(true);
        const thunkResult = await dispatch(action(actionPayload));
        return unwrapResult(thunkResult);
      } finally {
        setIsExecuting(false);
      }
    },
    [action, dispatch]
  );

  return [execute, isExecuting] as const;
};
