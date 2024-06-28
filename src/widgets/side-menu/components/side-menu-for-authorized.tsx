import { useAppSelector } from 'app/hooks';
import { VolunteerSideMenu } from './volunter-side-menu';
import { RecipientSideMenu } from './recipient-side-menu';
import { AdminSideMenu } from './admin-side-menu';
import { MasterSideMenu } from './master-side-menu';
import { UserRole } from 'shared/types/common.types';
import { isRootSelector } from 'entities/user/model';

export const SideMenuForAuthorized = () => {
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector(isRootSelector);

  if (role === UserRole.VOLUNTEER) return <VolunteerSideMenu />;

  if (role === UserRole.RECIPIENT) return <RecipientSideMenu />;

  if (role === UserRole.ADMIN && !isRoot) return <AdminSideMenu />;

  if (isRoot) return <MasterSideMenu />;

  return <VolunteerSideMenu />;
};
