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
} from '../../widgets/chats/libs/utils';
import { useMediaQuery } from '../../shared/hooks';
import { Routes, Route, useParams } from 'react-router-dom';

export function ChatsWaitingPage() {
  const chatId = useParams<{ chatId: string }>();
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const selectedChat = useMemo(
    () => mockChatsList.find((chat) => chat.chatId === selectedChatId),
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
              onClickOnChat={() => console.log(chatId)}
              selectedChatId={selectedChatId}
              onSelectChat={setSelectedChatId}
              isMobile={isMobile}
            />
          ) : (
            <div
              onClick={() => console.log(chatId)}
              className={styles.container}
            >
              <ChatsList
                onClickOnChat={() => console.log(chatId)}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                isMobile={isMobile}
              />
              {selectedChat && (
                <Chat
                  parentPage={'waiting'}
                  messages={sortMessages(getMockMessages())}
                  chatMateInfo={{
                    name: selectedChat.name,
                    userId: selectedChat.userId,
                    avatar: 'https://i.pravatar.cc/300',
                    phone: '+7(000) 000-00-00',
                  }}
                  onClose={() => setSelectedChatId(undefined)}
                />
              )}
            </div>
          )}
        </ContentLayout>
      }
    />
  );
}
