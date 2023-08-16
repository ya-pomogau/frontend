import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';
import { useMediaQuery } from '../../../../shared/hooks';

export const PageSubMenuAdmin: FC = () => {
  const isMobile = useMediaQuery('(max-width:1150px)');
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            isMobile={isMobile}
            to="/profile/requests/volunteers"
            text="Волонтеры"
            notifications={50}
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/profile/requests/recipients"
            text="Реципиенты"
            notifications={1}
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/profile/requests/notprocessed"
            text="Не обработанные"
          />
        </>
      }
    />
  );
};
