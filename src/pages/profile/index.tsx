import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { isRootSelector } from 'entities/user/model';
import { UserRole } from 'shared/types/common.types';
import { Breakpoints, Routes } from 'shared/config';
import { useMediaQuery } from 'shared/hooks';

export function ProfilePage() {
  const role = useAppSelector((state) => state.user.role);
  const isRoot = useAppSelector(isRootSelector);
  // const isMobile = useMediaQuery(Breakpoints.L)

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 920px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 920px)');
    const handler = (event:any) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);
  
  if (isMobile) return null;

  if (role === UserRole.VOLUNTEER) {
    return <Navigate to={Routes.PROFILE_MAP} replace />;
  }

  if (role === UserRole.RECIPIENT) {
    return <Navigate to={Routes.PROFILE_ACTIVE} replace />;
  }

  if (role === UserRole.ADMIN && !isRoot) {
    return <Navigate to={Routes.PROFILE_REQUESTS} replace />;
  }

  if (isRoot) {
    return <Navigate to={Routes.PROFILE_REQUESTS} replace />;
  }

  return <Navigate to="/" replace />;
}