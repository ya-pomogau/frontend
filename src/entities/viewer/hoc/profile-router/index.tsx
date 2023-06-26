import { Navigate } from "react-router-dom";
import { UnauthPage } from "pages/demo";
import { useAppSelector } from "../../../../app/hooks";

export function ProfileRouter() {
  const userRole = useAppSelector((state) => state.user.role);

  return userRole ? <Navigate to={userRole} /> : <UnauthPage />;
}
