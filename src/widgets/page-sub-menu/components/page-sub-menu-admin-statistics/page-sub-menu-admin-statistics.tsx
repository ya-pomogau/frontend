import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuAdminStatistics = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to={`/profile/admin/statistics/applications`}
            text="Заявки"
          />
          <PageSubMenuLink
            to={`/profile/admin/statistics/users`}
            text="Пользователи"
          />
        </>
      }
    />
  );
};
