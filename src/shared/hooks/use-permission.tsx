import { useAppSelector } from 'app/hooks';

export default function usePermission(requirment: any) {
  const user = useAppSelector((state) => state.user.data);
  let isGranted = false;
  if (user) {
    const hasPermission = Object.values(user).some(
      (element) => element === requirment
    );
    hasPermission ? (isGranted = true) : (isGranted = false);
  }

  return isGranted;
}
