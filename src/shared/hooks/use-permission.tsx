import { useAppSelector } from 'app/hooks';

// хук использует массив необходимых компоненту разрешений и сравнивает
// его с состоянием юзера, возвращая true или false, в зависимости
// от того удовлетворяет пользователь хотя бы одному из перечисленных
// требований или нет

export default function usePermission(requirments: Array<any>) {
  const user = useAppSelector((state) => state.user.data);
  let isGranted = false;
  if (user) {
    const userRights = { status: user.status, permissions: user.permissions };
    const hasPermission = requirments.filter((requirment: any) =>
      Object.values(userRights).some((element) => element === requirment)
    );
    hasPermission.length > 0 ? (isGranted = true) : (isGranted = false);
  }

  return isGranted;
}
