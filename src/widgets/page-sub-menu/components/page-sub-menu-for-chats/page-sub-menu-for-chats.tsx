import { FC } from 'react';

import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';

export const PageSubMenuForChats: FC = () => {
  return (
    <PageSubMenu
      links={
        <>
          <PageSubMenuLink
            to="/chats/waiting"
            text="Ждут ответа"
            notifications={3}
          />
          <PageSubMenuLink
            to="/chats/in-work"
            text="В работе"
            notifications={5}
          />
          <PageSubMenuLink
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
