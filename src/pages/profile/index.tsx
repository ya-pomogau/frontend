import { useAppSelector } from 'app/hooks';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from 'services/auth-admin-api';
import { isRootSelector } from 'entities/user/model';
import { UserRole } from 'shared/types/common.types';

export function ProfilePage() {
  const role = useAppSelector((state) => state.user.role);
  const isRoot = useAppSelector(isRootSelector);

  if (role === UserRole.VOLUNTEER) {
    return <Navigate to="/profile/map" replace />;
  }

  if (role === UserRole.RECIPIENT) {
    return <Navigate to="/profile/active" replace />;
  }

  if (role === UserRole.ADMIN && !isRoot) {
    return <Navigate to="/profile/requests" replace />;
  }

  if (isRoot) {
    return <Navigate to="/profile/requests" replace />;
  }

  return <Navigate to="/" replace />;
}
