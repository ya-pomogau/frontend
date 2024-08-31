import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { isRootSelector } from 'entities/user/model';
import { UserRole } from 'shared/types/common.types';
import { Routes } from 'shared/config';

export function ProfilePage() {
  const role = useAppSelector((state) => state.user.role);
  const isRoot = useAppSelector(isRootSelector);

  // const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 920px)').matches);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(max-width: 920px)');
  //   const handler = (event:any) => setIsMobile(event.matches);
  //   mediaQuery.addEventListener('resize', handler);
  //   return () => {
  //     mediaQuery.removeEventListener('resize', handler);
  //   };
  // }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920)
  const prevWidth = useRef(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth
      if (currWidth <= 920 && prevWidth.current > 920){
        setIsMobile(true)
      } else if (currWidth > 920 && prevWidth.current <= 920) {
        setIsMobile(false)
      }
      prevWidth.current = currWidth
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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