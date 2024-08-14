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
// так же проверяет, если пользователь isRoot - возвращает true

type UserRequirements =
  | UserStatus.CONFIRMED
  | UserStatus.UNCONFIRMED
  | UserStatus.ACTIVATED
  | UserStatus.VERIFIED
  | UserStatus.BLOCKED;

type AdminRequirements = `${AdminPermission}`;

type Role = UserRole.VOLUNTEER | UserRole.RECIPIENT | UserRole.ADMIN;

type Requirements<R extends Role> = R extends UserRole.ADMIN
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

  if (userRole === UserRole.ADMIN && userIsRoot) {
    return true;
  }

  if (userRole !== role) {
    return false;
  }

  const hasPermission = 
    userRole === UserRole.ADMIN
      ? requirements.every((requirement) =>
          userPermissions.some((element) => element === requirement)
        )
      : requirements.some((requirement) => userStatus === requirement);

  return hasPermission && requirements.length > 0;
}
