import { ReactNode } from 'react';
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

  const { data: conflict } = useGetTasksConfilctQuery('', {
    skip: !isConflictsPermissionGranted,
  });
  const { data: conflictIsWork } = useGetTasksWorkConflictQuery('', {
    skip: !isConflictsPermissionGranted,
  });

  console.log(
    `this is conflict, conflictIsWork ===>`,
    conflict,
    conflictIsWork
  );

  // TODO: добавить данные для раздела "Конфликты" "Завершенные"
  // const { data: conflictCompleted } = useGetTasksConflictCompletedQuery('', {
  //   skip: !isConflictsPermissionGranted,
  // });
  // TODO: изменить тип notificationsData
  const renderSubMenuLinks = (basePath: string, notificationsData: any) => (
    <>
      <PageSubMenuLink
        text="Нерассмотренные"
        to={`${basePath}/unreviewed`}
        // TODO: подключить данные количества обращений
        // notifications={
        //   notificationsData.unreviewed ? notificationsData.unreviewed.length : 0
        // }
      />
      <PageSubMenuLink
        text="В работе"
        to={`${basePath}/in-work`}
        // TODO: подключить данные количества обращений
        // notifications={
        //   notificationsData.inWork ? notificationsData.inWork.length : 0
        // }
        styleSpan={styles['style-span']}
      />
      <PageSubMenuLink
        text="Завершенные"
        to={`${basePath}/completed`}
        // TODO: подключить данные количества обращений
        // notifications={
        //   notificationsData.completed ? notificationsData.completed.length : 0
        // }
        styleSpan={styles['style-span']}
      />
    </>
  );

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
              // TODO: подключить данные количества обращений
              // notifications={hubUnreviewed ? hubUnreviewed.length : 0}
            />
            <PageSubMenuLink
              text="Конфликты"
              to="/chats-conflict"
              // TODO: подключить данные количества конфликтов
              // notifications={conflictUnreviewed ? conflictUnreviewed.length : 0}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      {currentPath.startsWith('/chats-hub') && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks('/chats-hub', {
            // TODO: подключить данные количества обращений
            // unreviewed: hubUnreviewed,
            // inWork: hubInWork,
            // completed: hubCompleted,
          })}
        />
      )}
      {currentPath.startsWith('/chats-conflict') && (
        <PageSubMenu
          style={styles['sub-menu']}
          links={renderSubMenuLinks('/chats-conflict', {
            // TODO: подключить данные количества конфликтов
            // unreviewed: conflictUnreviewed,
            // inWork: conflictInWork,
            // completed: conflictCompleted
          })}
        />
      )}
      {children}
    </>
  );
};
