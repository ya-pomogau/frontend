import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from 'shared/config';

import { Icon, SmartHeader } from 'shared/ui';
import { PageSubMenu } from 'widgets/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import styles from './styles.module.css';

interface ProfileChatsPagesProps {
  children: ReactNode;
}

export const ProfileChatsPages = ({ children }: ProfileChatsPagesProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [notificationsQuantity, _] = useState({
    hub: { unreviewed: 2, inWork: 0, completed: 1 },
    hubTotal: 3,
    conflict: { unreviewed: 0, inWork: 0, completed: 0 },
    conflictTotal: 0,
  });

  const renderSubMenuLinks = (
    basePath: string,
    notificationsData: { [id: string]: number }
  ) => {
    return (
      <>
        <PageSubMenuLink
          text="Нерассмотренные"
          to={basePath + Routes.CHAT_SUB_UNREVIEWED}
          notifications={notificationsData.unreviewed}
        />
        <PageSubMenuLink
          text="В работе"
          to={basePath + Routes.CHAT_SUB_IN_WORK}
          notifications={notificationsData.inWork}
          styleSpan={styles['style-span']}
        />
        <PageSubMenuLink
          text="Завершенные"
          to={basePath + Routes.CHAT_SUB_COMPLETED}
          notifications={notificationsData.completed}
          styleSpan={styles['style-span']}
        />
      </>
    );
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="ReadMessageIcon" size="54" />}
        text="Чат"
      />
      <PageSubMenu
        style={styles['sub-menu']}
        links={
          <>
            <PageSubMenuLink
              text="Обращения"
              to={Routes.CHAT_HUB}
              notifications={notificationsQuantity.hubTotal}
            />
            <PageSubMenuLink
              text="Конфликты"
              to={Routes.CHAT_CONFLICT}
              notifications={notificationsQuantity.conflictTotal}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      {currentPath.startsWith(Routes.CHAT_HUB) && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks(Routes.CHAT_HUB, notificationsQuantity.hub)}
        />
      )}
      {currentPath.startsWith(Routes.CHAT_CONFLICT) && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks(
            Routes.CHAT_CONFLICT,
            notificationsQuantity.conflict
          )}
        />
      )}
      {children}
    </>
  );
};
