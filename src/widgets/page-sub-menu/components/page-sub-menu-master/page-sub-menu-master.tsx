import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuMaster = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink to="/profile/requests/volunteers" text="Волонтеры" />
          <PageSubMenuLink
            to="/profile/requests/recipients"
            text="Реципиенты"
          />
          <PageSubMenuLink
            to="/profile/requests/notprocessed"
            text="Не обработанные"
          />
          <PageSubMenuLink to="/profile/requests/admins" text="Админы" />
        </>
      }
    />
  );
};
