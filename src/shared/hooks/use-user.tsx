import { useAppSelector } from 'app/hooks';

export default function useUser() {
  const user = useAppSelector((state) => state.user.data);
  return user?.isActive ?? false;
}
