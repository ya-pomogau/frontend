import { ReactNode } from 'react';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';
import { PageSubMenu } from 'widgets/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';

interface ProfileChatsPagesProps {
  children: ReactNode;
}

export const ProfileChatsPages = ({ children }: ProfileChatsPagesProps) => {
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
      />
      {children}
    </>
  );
};
