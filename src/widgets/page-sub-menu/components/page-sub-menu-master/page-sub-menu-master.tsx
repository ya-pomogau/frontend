import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';
import { useMediaQuery } from '../../../../shared/hooks';

export const PageSubMenuMaster: FC = () => {
  const isMobile = useMediaQuery('(max-width:1150px)');
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to="/profile/requests/volunteers"
            text="Волонтеры"
            isMobile={isMobile}
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/profile/requests/recipients"
            text="Реципиенты"
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/profile/requests/notprocessed"
            text="Не обработанные"
          />
          <PageSubMenuLink
            to="/profile/requests/admins"
            text="Админы"
            isMobile={isMobile}
          />
        </>
      }
    />
  );
};
