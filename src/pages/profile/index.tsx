import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';

export function ProfilePage() {
  const { role } = useAppSelector((state) => state.user);

  if (role === 'volunteer') {
    return <Navigate to="/profile/map" replace />;
  }

  if (role === 'recipient') {
    return <Navigate to="/profile/active" replace />;
  }

  if (role === 'admin') {
    return <Navigate to="/requests" replace />;
  }

  if (role === 'master') {
    return <Navigate to="/requests" replace />;
  }

  return <Navigate to="/" replace />;
}
