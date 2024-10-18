import { Outlet, Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { UserRole } from 'shared/types/common.types';
import { isUserBlockedSelector } from 'entities/user/model';
import { Routes } from 'shared/config';

interface CommonRouteProps {
  someflag?: never;
}

interface PublicRouteProps extends CommonRouteProps {
  publicRoutes: true;
  allowed?: never;
  onlyUnauthorized?: never;
  isRoot?: never;
  onlyBlocked?: never;
  allowBlocked?: never;
}

interface OnlyUnauthorizedRouteProps extends CommonRouteProps {
  onlyUnauthorized: boolean;
  allowed?: never;
  publicRoutes?: never;
  isRoot?: never;
  onlyBlocked?: never;
  allowBlocked?: never;
}

interface RoledRouteProps extends CommonRouteProps {
  allowed: {
    [key in UserRole]?: boolean;
  };
  publicRoutes?: never;
  onlyUnauthorized?: never;
  isRoot?: boolean;
  onlyBlocked?: boolean;
  allowBlocked?: boolean;
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
  onlyBlocked,
  allowBlocked
}: RoutesGroupProps) => {
  const { isLoading, role } = useAppSelector((state) => state.user);
  const isBlockedSelector = useAppSelector(isUserBlockedSelector);

  if (isLoading) {
    return null;
  }

  if (isRoot) {
    return <Outlet />;
  }

  if (publicRoutes) {
    return <Outlet />;
  }

  if (onlyBlocked && isBlockedSelector) {
    return <Outlet />;
  }

  if (onlyBlocked) {
    return <Navigate to="/" replace />;
  }

  if (!allowBlocked && isBlockedSelector) {
    return <Navigate to={Routes.PROFILE_BLOCKED} replace />;
  }

  if (onlyUnauthorized) {
    if (!role) {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (allowed === undefined) {
    return <Navigate to="/" replace />;
  }

  if (!role || !allowed![role]) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
