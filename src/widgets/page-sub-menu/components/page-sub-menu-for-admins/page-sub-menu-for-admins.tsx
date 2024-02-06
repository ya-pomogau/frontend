import { useAppSelector } from 'app/hooks';

import { PageSubMenuAdmin } from '../page-sub-menu-admin';
import { PageSubMenuMaster } from '../page-sub-menu-master';
import { UserRole } from 'shared/types/common.types';

export const PageSubMenuForAdmins = () => {
  const { role } = useAppSelector((state) => state.user);

  if (role === UserRole.ADMIN) {
    return <PageSubMenuAdmin />;
  }

  if (role === UserRole.USER) {
    return <PageSubMenuMaster />;
  }

  return <PageSubMenuAdmin />;
};
