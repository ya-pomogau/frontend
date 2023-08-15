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
import { useMemo, useState } from 'react';
import { Chat } from '../../widgets/chats/components/Chat';
import {
  getMockMessages,
  sortMessages,
  mockChatsList,
} from '../../widgets/chats/components/Chat/libs/utils';
import { useMediaQuery } from '../../shared/hooks';

export function ChatsInWorkPage() {
  const [selectedChatId, setSelectedChatId] = useState<number>();
  const selectedChat = useMemo(
    () => mockChatsList.find((chat) => chat.id === selectedChatId),
    [selectedChatId]
  );

  const isMobile = useMediaQuery('(max-width:1150px)');

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
              settingIcon={
                <Icon color="blue" icon="ReadMessageIcon" size="54" />
              }
              settingText="Чат"
            />
          }
        >
          <PageSubMenuForChats />
          {isMobile ? (
            <ChatsList
              selectedChatId={selectedChatId}
              onSelectChat={setSelectedChatId}
              isMobile={isMobile}
            />
          ) : (
            <div className={styles.container}>
              <ChatsList
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                isMobile={isMobile}
              />
              {selectedChat && (
                <Chat
                  messages={sortMessages(getMockMessages())}
                  chatMateInfo={{
                    name: selectedChat.name,
                    id: selectedChat.id,
                    avatar: 'https://i.pravatar.cc/300',
                    phone: '+7(000) 000-00-00',
                  }}
                />
              )}
            </div>
          )}
        </ContentLayout>
      }
    />
  );
}
