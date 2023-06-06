import React from "react";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { Navigate } from "react-router-dom";
import { TRole } from "../../types";

interface Props {
  role: TRole;
}

const withRoleRedirect = (WrappedComponent: React.ComponentType<any>) => {
  const WithRoleRedirect: React.FC<Props> = ({ role, ...props }) => {
    const viewerRole = useAppSelector((state: RootState) => state.viewer.role);

    const shouldRedirect = viewerRole !== role;

    if (shouldRedirect) {
      return <Navigate to={`${role}`} />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithRoleRedirect;
};

export default withRoleRedirect;

export function ProfileReducer() {
  const viewerRole = useAppSelector((state: RootState) => state.viewer.role);
  return <Navigate to={viewerRole} />;
}
