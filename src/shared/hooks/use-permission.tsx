import { useAppSelector } from 'app/hooks';

export default function usePermission(requirment: any) {
  const user = useAppSelector((state) => state.user.data);
  let isGranted = false;
  if (user) {
    const userRights = { status: user.status, permissions: user.permissions };
    const hasPermission = Object.values(userRights).some(
      (element) => element === requirment
    );
    hasPermission ? (isGranted = true) : (isGranted = false);
  }

  return isGranted;
}
