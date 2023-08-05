import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuAdmin: FC = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to="/requests/volunteers"
            text="Волонтеры"
            notifications={50}
          />
          <PageSubMenuLink
            to="/requests/recipients"
            text="Реципиенты"
            notifications={1}
          />
          <PageSubMenuLink to="/requests/notprocessed" text="Не обработанные" />
        </>
      }
    />
  );
};
