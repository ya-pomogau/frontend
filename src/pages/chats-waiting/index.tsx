import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import { SideMenu } from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';

import styles from './styles.module.css';
import { UserInfo } from '../../entities/user';
import { PageSubMenuForChats } from '../../widgets/page-sub-menu';
import { ChatsList } from '../../widgets/chats/components';
import { useState } from 'react';
import { Chat } from '../../widgets/chats/components/Chat';
import {
  getMockMessages,
  sortMessages,
} from '../../entities/chat/ui/chat/libs/utils';

export function ChatsWaitingPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>
          <SideMenu
            authRequired={false}
            extClassName={styles.button_container}
            links={
              <>
                <SideMenuLink
                  to="/"
                  icon={<Icon color="white" icon="BlockIcon" size="54" />}
                  text="Подтверждение/Блокировка"
                />
                <SideMenuLink
                  to="/"
                  icon={<Icon color="white" icon="StatisticIcon" size="54" />}
                  text="Статистика"
                />
                <SideMenuLink
                  to="/"
                  icon={
                    <Icon color="white" icon="CreateApplication" size="54" />
                  }
                  text="Заявки/Работа с заявками"
                />
              </>
            }
          />
        </>
      }
      content={
        <ContentLayout
          extClassName={styles.content}
          heading={
            <SmartHeader
              settingIcon={<Icon color="blue" icon="ContactsIcon" size="54" />}
              settingText="Чаты"
            />
          }
        >
          <PageSubMenuForChats />
          <div className={styles.container}>
            <ChatsList />
            <Chat
              messages={sortMessages(getMockMessages())}
              chatmateInfo={{
                userId: '1',
                name: 'Иванов Иван Иванович',
                phone: '+7(000) 000-00-00',
                userAvatarLink: 'https://i.pravatar.cc/300',
              }}
            />
          </div>
        </ContentLayout>
      }
    />
  );
}
