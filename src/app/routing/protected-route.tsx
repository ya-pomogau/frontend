import { useAppSelector } from 'app/hooks';
import { PropsWithChildren, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from 'shared/config';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  navigateTo?: string;
  children?: ReactNode;
  component?: JSX.Element;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  navigateTo,
  children,
  component,
}: ProtectedRouteProps) => {
  const { role } = useAppSelector((state) => state.user);
  const location = useLocation();
  console.log('->', role);

  // user unauth, but route only for auth users
  if (!role && !onlyUnAuth) {
    return (
      <Navigate to={navigateTo ?? Routes.LOGIN} state={{ from: location }} />
    );
  }

  // user auth, but route only for unauth user
  if (role && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: Routes.ROOT } };
    return <Navigate to={from} />;
  }

  return children ?? component;
};

export const OnlyAuth = ProtectedRoute;

type OnlyUnAuthProps = PropsWithChildren<
  Pick<ProtectedRouteProps, 'component' | 'navigateTo'>
>;

export const OnlyUnAuth = ({
  children,
  component,
  navigateTo,
}: OnlyUnAuthProps) =>
  children ? (
    <ProtectedRoute onlyUnAuth={true} navigateTo={navigateTo ?? Routes.ROOT}>
      {children}
    </ProtectedRoute>
  ) : (
    <ProtectedRoute
      onlyUnAuth={true}
      component={component}
      navigateTo={navigateTo}
    ></ProtectedRoute>
  );
