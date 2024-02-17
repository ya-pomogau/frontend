import { ReactNode } from 'react';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';
import { PageSubMenu } from 'widgets/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import {
  useGetConflictAdminQuery,
  useGetWorkConflictQuery,
} from 'services/messages-api';

interface ProfileChatsPagesProps {
  children: ReactNode;
}

export const ProfileChatsPages = ({ children }: ProfileChatsPagesProps) => {
  // TODO conflict
  const { data: conflict } = useGetConflictAdminQuery('addConflict');
  const { data: workConflict } = useGetWorkConflictQuery('hubConfict');

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="ReadMessageIcon" size="54" />}
        text="Чат"
      />
      {/* Закомментирована на время показа */}
      {/* <PageSubMenu
        style={styles['sub-menu']}
        links={
          <>
            <PageSubMenuLink text="Ждут ответа" to="/chat" notifications={2} />
            <PageSubMenuLink text="В работе" to="/chat-hub" notifications={3} />
            <PageSubMenuLink
              text="Конфликтное закрытие"
              to="/chat-conflict"
              notifications={4}
              styleSpan={styles['style-span']}
            />
          </>
        }
      /> */}
      {/* TODO conflict */}
      <PageSubMenu
        style={styles['sub-menu']}
        links={
          <>
            <PageSubMenuLink
              text="Конфликты"
              to="/conflict"
              notifications={conflict ? conflict.length : ''}
            />
            <PageSubMenuLink
              text="Конфликтное закрытие"
              to="/conflict-hub"
              notifications={workConflict ? workConflict.length : ''}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      {children}
    </>
  );
};
