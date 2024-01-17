import { useAppSelector } from 'app/hooks';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

interface PageSubMenuForAdminsProps {
  counters: {
    [key in 'volunteers' | 'recipients' | 'notprocessed' | 'admins']: number;
  };
}

export const PageSubMenuForAdmins = ({
  counters,
}: PageSubMenuForAdminsProps) => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to="/profile/requests/volunteers"
            text="Волонтеры"
            notifications={counters.volunteers}
          />
          <PageSubMenuLink
            to="/profile/requests/recipients"
            text="Реципиенты"
            notifications={counters.recipients}
          />
          <PageSubMenuLink
            to="/profile/requests/notprocessed"
            text="Не обработанные"
            notifications={counters.notprocessed}
          />
          {role === 'master' ? (
            <PageSubMenuLink
              to="/profile/requests/admins"
              text="Админы"
              notifications={counters.admins}
            />
          ) : (
            ''
          )}
        </>
      }
    />
  );
};
