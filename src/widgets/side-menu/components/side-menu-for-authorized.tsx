import { useAppSelector } from 'app/hooks';
import { VolunteerSideMenu } from './volunter-side-menu';
import { RecipientSideMenu } from './recipient-side-menu';
import { AdminSideMenu } from './admin-side-menu';
import { MasterSideMenu } from './master-side-menu';
import { UserRole } from 'shared/types/common.types';

export const SideMenuForAuthorized = () => {
  const { role } = useAppSelector((state) => state.user);

  if (role === UserRole.VOLUNTEER) return <VolunteerSideMenu />;

  if (role === UserRole.RECIPIENT) return <RecipientSideMenu />;

  if (role === UserRole.ADMIN) return <AdminSideMenu />;

  if (role === UserRole.USER) return <MasterSideMenu />;

  return <VolunteerSideMenu />;
};
