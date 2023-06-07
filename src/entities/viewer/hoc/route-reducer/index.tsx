import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { Navigate } from "react-router-dom";

export function ProfileReducer() {
  const viewerRole = useAppSelector((state: RootState) => state.viewer.role);

  return <Navigate to={viewerRole} />;
}
