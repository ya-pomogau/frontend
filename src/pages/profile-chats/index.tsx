import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';
import { PageSubMenu } from 'widgets/page-sub-menu';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import { ConversationWidget } from 'widgets/conversation-widget';

export function ProfileChatsPages() {
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
            <PageSubMenuLink text="Ждут ответа" to="/test" notifications={2} />
            <PageSubMenuLink text="В работе" to="/chat-one" notifications={3} />
            <PageSubMenuLink
              text="Конфликтное закрытие"
              to="/chat-two"
              notifications={4}
              styleSpan={styles['style-span']}
            />
          </>
        }
      />
      <ConversationWidget />
    </>
  );
}
