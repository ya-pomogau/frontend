import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuAdmin = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to="/profile/requests/volunteers"
            text="Волонтеры"
            notifications={50}
          />
          <PageSubMenuLink
            to="/profile/requests/recipients"
            text="Реципиенты"
            notifications={1}
          />
          <PageSubMenuLink
            to="/profile/requests/notprocessed"
            text="Не обработанные"
          />
        </>
      }
    />
  );
};
