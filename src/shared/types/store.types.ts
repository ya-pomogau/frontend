import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';

export type TSystemSliceState = {
  user: TUser | null;
  vkUser: TVKUser | null;
  isPending: boolean;
  isNew: boolean;
};

export type TCustomSelector<T> = (state: RootState) => T;
