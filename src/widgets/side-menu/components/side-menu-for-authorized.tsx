import { useAppSelector } from 'app/hooks';
import { VolunteerSideMenu } from './volunter-side-menu';
import { RecipientSideMenu } from './recipient-side-menu';
import { AdminSideMenu } from './admin-side-menu';
import { MasterSideMenu } from './master-side-menu';

export const SideMenuForAuthorized = (props: any) => {
  const { role } = useAppSelector((state) => state.user);

  if (role === 'volunteer') return <VolunteerSideMenu {...props} />;

  if (role === 'recipient') return <RecipientSideMenu {...props} />;

  if (role === 'admin') return <AdminSideMenu {...props} />;

  if (role === 'master') return <MasterSideMenu {...props} />;

  return <VolunteerSideMenu {...props} />;
};
