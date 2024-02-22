import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { UserRole } from 'shared/types/common.types';

interface CommonRouteProps {
  someflag?: never;
}

interface PublicRouteProps extends CommonRouteProps {
  publicRoutes: true;
  allowed?: never;
  onlyUnauthorized?: never;
  isRoot?: never;
}

interface OnlyUnauthorizedRouteProps extends CommonRouteProps {
  onlyUnauthorized: boolean;
  allowed?: never;
  publicRoutes?: never;
  isRoot?: never;
}

interface RoledRouteProps extends CommonRouteProps {
  allowed: {
    [key in UserRole]?: boolean;
  };
  publicRoutes?: never;
  onlyUnauthorized?: never;
  isRoot?: boolean;
}

type RoutesGroupProps =
  | PublicRouteProps
  | RoledRouteProps
  | OnlyUnauthorizedRouteProps;

export const RoutesGroup = ({
  publicRoutes,
  onlyUnauthorized,
  allowed,
  isRoot,
}: RoutesGroupProps) => {
  const { isLoading, role } = useAppSelector((state) => state.user);

  if (publicRoutes) {
    return <Outlet />;
  }

  if (onlyUnauthorized) {
    if (!role) {
      return <Outlet />;
    } else {
      <Navigate to="/" replace />;
    }
  }

  if (isLoading) {
    return null;
  }
  if (isRoot) {
    return <Outlet />;
  }
  if (allowed === undefined) {
    return <Navigate to="/" replace />;
  }

  if (!role || !allowed![role]) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
