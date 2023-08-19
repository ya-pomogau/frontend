import { useEffect } from 'react';

import { useAppDispatch } from 'app/hooks';
import { logoutUser } from 'entities/user/model';

export function Logout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return null;
}
