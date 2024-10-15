import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Icon, SmartHeader } from 'shared/ui';
import { usePermission } from 'shared/hooks';

import { PageSubMenu } from 'widgets/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import {
  useGetTasksConfilctQuery,
  useGetTasksWorkConflictQuery,
} from 'services/admin-api';
import { adminPermission, userRole } from 'shared/types/common.types';

import styles from './styles.module.css';
import { id } from 'date-fns/esm/locale';
import { Routes } from 'shared/config';

interface ProfileChatsPagesProps {
  children: ReactNode;
}

export const ProfileChatsPages = ({ children }: ProfileChatsPagesProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isConflictsPermissionGranted = usePermission(
    [adminPermission.CONFLICTS],
    userRole.ADMIN
  );

  // TODO: Добавить хуки для работы с обращениями (нерассмотренные, в работе, завершенные)
  // const { data: hubUnreviewed } = useGetTasksHubUnreviewedQuery();
  // const { data: hubInWork } = useGetTasksHubInWorkQuery();
  // const { data: hubCompleted } = useGetTasksHubCompletedQuery();

  // TODO: Связать моковые данные с хуками
  const [notificationsQuantity, _] = useState({
    hub: { unreviewed: 2, inWork: 0, completed: 1 },
    hubTotal: 3,
    conflict: { unreviewed: 0, inWork: 0, completed: 0 },
    conflictTotal: 0,
  });

  const { data: conflict } = useGetTasksConfilctQuery('', {
    skip: !isConflictsPermissionGranted,
  });
  const { data: conflictIsWork } = useGetTasksWorkConflictQuery('', {
    skip: !isConflictsPermissionGranted,
  });

  // TODO: добавить данные для раздела "Конфликты" "Завершенные"
  // const { data: conflictCompleted } = useGetTasksConflictCompletedQuery('', {
  //   skip: !isConflictsPermissionGranted,
  // });

  const renderSubMenuLinks = (
    basePath: string,
    notificationsData: { [id: string]: number }
  ) => {
    return (
      <>
        <PageSubMenuLink
          text="Нерассмотренные"
          to={`${basePath}/unreviewed`}
          notifications={notificationsData.unreviewed}
        />
        <PageSubMenuLink
          text="В работе"
          to={`${basePath}/in-work`}
          notifications={notificationsData.inWork}
          styleSpan={styles['style-span']}
        />
        <PageSubMenuLink
          text="Завершенные"
          to={`${basePath}/completed`}
          notifications={notificationsData.completed}
          styleSpan={styles['style-span']}
        />
      </>
    );
  };

  useEffect(() => {
    const RoutesNaming = {
      [`${Routes.CHAT_HUB}`]: 'Обращения',
      [`${Routes.CHAT_HUB_UNREVIEWED}`]: 'Обращения → Нерассмотренные',
      [`${Routes.CHAT_HUB_IN_WORK}`]: 'Обращения → В работе',
      [`${Routes.CHAT_HUB_COMPLETED}`]: 'Обращения → Завершенные',
      [`${Routes.CHAT_CONFLICT}`]: 'Конфликты',
      [`${Routes.CHAT_CONFLICT_UNREVIEWED}`]: 'Конфликты → Нерассмотренные',
      [`${Routes.CHAT_CONFLICT_IN_WORK}`]: 'Конфликты → В работе',
      [`${Routes.CHAT_CONFLICT_COMPLETED}`]: 'Конфликты → Завершенные',
    } as const;

    console.log(
      '===============================\n',
      `Мы находимся в разделе ${RoutesNaming[currentPath]}`,
      '\n------------------------------\n',
      'Конфликтные задачи: ',
      conflict,
      '\n------------------------------\n',
      'Конфликты в работе: ',
      conflictIsWork,
      '\n------------------------------\n',
      'Кол-во  непрочитанных сообщений: ',
      notificationsQuantity,
      '\n==============================='
    );
  }, [conflict, conflictIsWork, currentPath, notificationsQuantity]);

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
              to="/chats-hub"
              notifications={notificationsQuantity.hubTotal}
            />
            <PageSubMenuLink
              text="Конфликты"
              to="/chats-conflict"
              notifications={notificationsQuantity.conflictTotal}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      {currentPath.startsWith('/chats-hub') && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks('/chats-hub', notificationsQuantity.hub)}
        />
      )}
      {currentPath.startsWith('/chats-conflict') && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks(
            '/chats-conflict',
            notificationsQuantity.conflict
          )}
        />
      )}
      {children}
    </>
  );
};
