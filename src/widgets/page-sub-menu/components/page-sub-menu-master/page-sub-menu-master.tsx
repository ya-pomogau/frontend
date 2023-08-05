import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuMaster: FC = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink to="/requests/volunteers" text="Волонтеры" />
          <PageSubMenuLink to="/requests/recipients" text="Реципиенты" />
          <PageSubMenuLink to="/requests/notprocessed" text="Не обработанные" />
          <PageSubMenuLink to="/requests/admins" text="Админы" />
        </>
      }
    />
  );
};
