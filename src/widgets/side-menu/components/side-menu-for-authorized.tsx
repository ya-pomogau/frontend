import { useAppSelector } from 'app/hooks';
import { VolunteerSideMenu } from './volunter-side-menu';
import { RecipientSideMenu } from './recipient-side-menu';
import { AdminSideMenu } from './admin-side-menu';
import { MasterSideMenu } from './master-side-menu';
import { userRole } from 'shared/types/common.types';
import { isRootSelector } from 'entities/user/model';

export const SideMenuForAuthorized = () => {
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector(isRootSelector);

  if (role === userRole.VOLUNTEER) return <VolunteerSideMenu />;

  if (role === userRole.RECIPIENT) return <RecipientSideMenu />;

  if (role === userRole.ADMIN && !isRoot) return <AdminSideMenu />;

  if (isRoot) return <MasterSideMenu />;

  return <VolunteerSideMenu />;
};
