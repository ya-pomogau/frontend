import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { isRootSelector, isUserBlockedSelector } from 'entities/user/model';
import { userRole } from 'shared/types/common.types';
import { Breakpoints, Routes } from 'shared/config';
import { useMediaQuery } from 'shared/hooks';

export function ProfilePage() {
  const role = useAppSelector((state) => state.user.role);
  const isBlockedSelector = useAppSelector(isUserBlockedSelector);
  const isRoot = useAppSelector(isRootSelector);
  const isMobile = useMediaQuery(Breakpoints.L);

  if (isMobile) return null;

  if (isBlockedSelector) {
    return <Navigate to={Routes.PROFILE_BLOCKED} replace />;
  }

  if (role === userRole.VOLUNTEER) {
    return <Navigate to={Routes.PROFILE_MAP} replace />;
  }

  if (role === userRole.RECIPIENT) {
    return <Navigate to={Routes.PROFILE_ACTIVE} replace />;
  }

  if (role === userRole.ADMIN && !isRoot) {
    return <Navigate to={Routes.PROFILE_REQUESTS} replace />;
  }

  if (isRoot) {
    return <Navigate to={Routes.PROFILE_REQUESTS} replace />;
  }

  return <Navigate to="/" replace />;
}
