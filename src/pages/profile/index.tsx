import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from 'services/auth-admin-api';

export function ProfilePage() {
  const { role } = useAppSelector((state) => state.user);
  const { data: user } = useGetMeQuery('');
  console.log(user);

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

  return <Navigate to="/" replace />;
}
