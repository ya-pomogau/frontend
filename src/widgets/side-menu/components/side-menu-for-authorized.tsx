import { useAppSelector } from 'app/hooks';
import { VolunteerSideMenu } from './volunter-side-menu';
import { RecipientSideMenu } from './recipient-side-menu';
import { AdminSideMenu } from './admin-side-menu';
import { MasterSideMenu } from './master-side-menu';

export const SideMenuForAuthorized = () => {
  const { role } = useAppSelector((state) => state.user);

  if (role === 'volunteer') return <VolunteerSideMenu />;

  if (role === 'recipient') return <RecipientSideMenu />;

  if (role === 'admin') return <AdminSideMenu />;

  if (role === 'master') return <MasterSideMenu />;

  return <VolunteerSideMenu />;
};
