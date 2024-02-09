import { useAppSelector } from 'app/hooks';

import { PageSubMenuAdmin } from '../page-sub-menu-admin';
import { PageSubMenuMaster } from '../page-sub-menu-master';
import { UserRole } from 'shared/types/common.types';
import { isRootSelector } from 'entities/user/model';

export const PageSubMenuForAdmins = () => {
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector(isRootSelector);

  if (role === UserRole.ADMIN && !isRoot) {
    return <PageSubMenuAdmin />;
  }

  if (isRoot) {
    return <PageSubMenuMaster />;
  }

  return <PageSubMenuAdmin />;
};
