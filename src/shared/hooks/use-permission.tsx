import { useAppSelector } from 'app/hooks';
import {
  AdminPermission,
  UserRole,
  UserStatus,
} from 'shared/types/common.types';

// хук использует массив необходимых компоненту разрешений, роль, к которой они
// применяюся и сравнивает их с состоянием юзера, возвращая true или false, в зависимости
// от того удовлетворяет пользователь хотя бы одному из перечисленных
// требований или нет

type Requirments =
  | UserStatus.CONFIRMED
  | UserStatus.UNCONFIRMED
  | UserStatus.ACTIVATED
  | UserStatus.VERIFIED
  | UserStatus.BLOCKED
  | AdminPermission.CONFIRMATION
  | AdminPermission.TASKS
  | AdminPermission.KEYS
  | AdminPermission.CONFLICTS
  | AdminPermission.BLOG
  | AdminPermission.CATEGORIES;
// TODO: проверить что работает норм
type Role =
  | UserRole.VOLUNTEER
  | UserRole.RECIPIENT
  | UserRole.ADMIN
  | UserRole.USER;

export default function usePermission(
  requirments: Array<Requirments>,
  role: Role
) {
  const userStatus = useAppSelector((state) => state.user.data?.status);
  const userRole = useAppSelector((state) => state.user.data?.role);
  const userPermissions = useAppSelector(
    (state) => state.user.data?.permissions
  );

  let isAllowed = false;

  if (userRole === role) {
    if (userRole) {
      const userRights = { status: userStatus, ...userPermissions };
      const hasPermission = requirments.filter((requirment) =>
        Object.values(userRights).some(
          (element) => JSON.stringify(element) === JSON.stringify(requirment)
        )
      );
      hasPermission.length > 0 ? (isAllowed = true) : (isAllowed = false);
    }
  } else {
    isAllowed = true;
  }

  return isAllowed;
}
