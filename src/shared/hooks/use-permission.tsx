import { useAppSelector } from 'app/hooks';
import {
  BLOG,
  CREATE_TASKS,
  INCREASE_SCORE,
  PROFILES_APPROVAL,
  READ,
  RESOLVE_CONFLICTS,
  SET_KEYS,
} from 'shared/libs/permissions-names';
import {
  ACTIVATED,
  CONFIRMED,
  UNCONFIRMED,
  VERIFIED,
} from 'shared/libs/statuses';

// хук использует массив необходимых компоненту разрешений, роль, к которой они
// применяюся и сравнивает их с состоянием юзера, возвращая true или false, в зависимости
// от того удовлетворяет пользователь хотя бы одному из перечисленных
// требований или нет

type Requirments =
  | typeof UNCONFIRMED
  | typeof CONFIRMED
  | typeof ACTIVATED
  | typeof VERIFIED
  | { id: number; name: typeof READ }
  | { id: number; name: typeof PROFILES_APPROVAL }
  | { id: number; name: typeof CREATE_TASKS }
  | { id: number; name: typeof SET_KEYS }
  | { id: number; name: typeof RESOLVE_CONFLICTS }
  | { id: number; name: typeof BLOG }
  | { id: number; name: typeof INCREASE_SCORE };

type Role = 'volunteer' | 'recipient' | 'admin' | 'master' | 'any';

export default function usePermission(
  requirments: Array<Requirments>,
  role: Role | null
) {
  const userStatus = useAppSelector((state) => state.user.data?.status);
  const userRole = useAppSelector((state) => state.user.data?.role);
  const userPermissions = useAppSelector(
    (state) => state.user.data?.permissions
  );

  let isAllowed = false;

  if (userRole === role || role === 'any') {
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
