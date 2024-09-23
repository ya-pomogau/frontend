import { useAppSelector } from 'app/hooks';
import {
  AdminPermission,
  UserRole,
  UserStatus,
  userRole as userRoles,
} from 'shared/types/common.types';

// хук использует массив необходимых компоненту разрешений, роль, к которой они
// применяюся и сравнивает их с состоянием юзера, возвращая true или false, в зависимости
// от того удовлетворяет пользователь хотя бы одному из перечисленных
// требований или нет
// так же проверяет, если пользователь isRoot - возвращает true

type UserRequirements = UserStatus;

type AdminRequirements = AdminPermission;

type Role = UserRole;

type Requirements<R extends Role> = R extends typeof userRoles.ADMIN
  ? AdminRequirements
  : UserRequirements;

export default function usePermission<R extends Role>(
  requirements: Requirements<R>[],
  role: Role
) {
  const userIsRoot = useAppSelector((state) => state.user.data?.isRoot);
  const userStatus = useAppSelector((state) => state.user.data?.status);
  const userRole = useAppSelector((state) => state.user.data?.role);
  const userPermissions = useAppSelector(
    (state) => state.user.data?.permissions || []
  );

  if (userRole === userRoles.ADMIN && userIsRoot) {
    return true;
  }

  if (userRole !== role) {
    return false;
  }

  const hasPermission =
    userRole === userRoles.ADMIN
      ? requirements.every((requirement) =>
          userPermissions.some((element) => element === requirement)
        )
      : requirements.some((requirement) => userStatus === requirement);

  return hasPermission && requirements.length > 0;
}
