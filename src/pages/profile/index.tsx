import { useAppSelector } from 'app/hooks';
import { ProfileMobile } from 'pages/profile-mobile';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from 'services/auth-admin-api';

export function ProfilePage() {
  const { role } = useAppSelector((state) => state.user);
  const [width, setWidth] = useState(1);
  const { data: user } = useGetMeQuery('');
  const initWidth = window.innerWidth;

  useEffect(() => {
    window.addEventListener('resize', calcWidth);

    return () => {
      window.removeEventListener('resize', calcWidth);
    };
  }, []);

  const calcWidth = useCallback(() => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  }, []);

  if (initWidth > 900) {
    if (role === 'volunteer') {
      return <Navigate to="/profile/map" replace />;
    }

    if (role === 'recipient') {
      return <Navigate to="/profile/active" replace />;
    }

    if (role === 'admin') {
      return <Navigate to="/profile/requests" replace />;
    }

    if (role === 'master') {
      return <Navigate to="/profile/requests" replace />;
    }
  }

  return <>{width > 0 && width < 900 && <ProfileMobile />}</>;
}
