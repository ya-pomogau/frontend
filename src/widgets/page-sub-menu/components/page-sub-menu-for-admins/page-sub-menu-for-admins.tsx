import { useAppSelector } from 'app/hooks';
import { isRootSelector } from 'entities/user/model';
import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';
import { UserRole } from 'shared/types/common.types';

interface PageSubMenuForAdminsProps {
  counters: {
    [key in 'volunteers' | 'recipients' | 'notprocessed' | 'admins']: number;
  };
}

export const PageSubMenuForAdmins = ({
  counters,
}: PageSubMenuForAdminsProps) => {
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector(isRootSelector);
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
          {role === UserRole.ADMIN && isRoot ? (
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
