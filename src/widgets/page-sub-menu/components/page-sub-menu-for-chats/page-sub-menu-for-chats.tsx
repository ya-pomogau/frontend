import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';
import { useMediaQuery } from '../../../../shared/hooks';

export const PageSubMenuForChats: FC = () => {
  const isMobile = useMediaQuery('(max-width:1150px)');
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            isMobile={isMobile}
            to="/chats/waiting"
            text="Ждут ответа"
            notifications={3}
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/chats/in-work"
            text="В работе"
            notifications={5}
          />
          <PageSubMenuLink
            isMobile={isMobile}
            to="/chats/conflicts"
            text="Конфликтное закрытие"
            notifications={1}
            isImportant={true}
          />
        </>
      }
    />
  );
};
