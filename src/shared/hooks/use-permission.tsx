import { useAppSelector } from 'app/hooks';

// хук использует массив необходимых компоненту разрешений, роль, к которой они
// применяюся и сравнивает их с состоянием юзера, возвращая true или false, в зависимости
// от того удовлетворяет пользователь хотя бы одному из перечисленных
// требований или нет

export default function usePermission(requirments: Array<any>, role: string) {
  const user = useAppSelector((state) => state.user.data);
  let isAllowed = false;

  if (user?.role === role || role === 'any') {
    if (user) {
      const userRights = { status: user.status, permissions: user.permissions };
      const hasPermission = requirments.filter((requirment: any) =>
        Object.values(userRights).some((element) => element === requirment)
      );
      hasPermission.length > 0 ? (isAllowed = true) : (isAllowed = false);
    }
  } else {
    isAllowed = true;
  }

  return isAllowed;
}
