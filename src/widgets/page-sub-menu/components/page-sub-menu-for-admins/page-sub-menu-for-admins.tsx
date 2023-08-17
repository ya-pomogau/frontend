import { useAppSelector } from 'app/hooks';

import { PageSubMenuAdmin } from '../page-sub-menu-admin';
import { PageSubMenuMaster } from '../page-sub-menu-master';

export const PageSubMenuForAdmins = () => {
  const { role } = useAppSelector((state) => state.user);

  if (role === 'admin') {
    return <PageSubMenuAdmin />;
  }

  if (role === 'master') {
    return <PageSubMenuMaster />;
  }

  return <PageSubMenuAdmin />;
};
