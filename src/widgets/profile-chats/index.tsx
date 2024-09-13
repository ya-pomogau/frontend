import { ReactNode } from 'react';

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
  const isConflictsPermissionGranted = usePermission(
    [adminPermission.CONFLICTS],
    userRole.ADMIN
  );

  const { data: conflict } = useGetTasksConfilctQuery('', {
    skip: !isConflictsPermissionGranted,
  });
  const { data: conflictIsWork } = useGetTasksWorkConflictQuery('', {
    skip: !isConflictsPermissionGranted,
  });

  // TODO: добавить данные для раздела "В работе"
  // const { data: conflictInProgress } = useGetTasksProgressConflictQuery('');

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
              text="Ждут ответа"
              to="/chats-hub"
              notifications={conflict ? conflict?.length : 0}
            />
            <PageSubMenuLink
              text="В работе"
              to="/chats-in-work"
              // TODO: подключить данные количества конфликтов в работе
              // notifications={conflictInProgress ? conflictInProgress?.length : 0}
            />
            <PageSubMenuLink
              text="Конфликтное закрытие"
              to="/chats-conflict"
              notifications={conflictIsWork ? conflictIsWork?.length : 0}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      {children}
    </>
  );
};
