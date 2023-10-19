import { Routes, Route, useNavigate } from 'react-router-dom';

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
import { useMediaQuery } from '../../shared/hooks';

export function ChatsWaitingPage() {
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`${id}`);
  };

  const closeChat = () => {
    navigate('..', { relative: 'path' });
    setSelectedChatId(undefined);
  };

  const isMobile = useMediaQuery('(max-width:1150px)');

  return (
    <PageLayout
      // side={
      //   <>
      //     <div className={styles.user}>
      //       <UserInfo />
      //     </div>
      //     <SideMenu
      //       authRequired={false}
      //       extClassName={styles.button_container}
      //       links={
      //         <>
      //           <SideMenuLink
      //             to="/"
      //             icon={<Icon color="white" icon="BlockIcon" size="54" />}
      //             text="Подтверждение/Блокировка"
      //           />
      //           <SideMenuLink
      //             to="/"
      //             icon={<Icon color="white" icon="StatisticIcon" size="54" />}
      //             text="Статистика"
      //           />
      //           <SideMenuLink
      //             to="/"
      //             icon={
      //               <Icon color="white" icon="CreateApplication" size="54" />
      //             }
      //             text="Заявки/Работа с заявками"
      //           />
      //         </>
      //       }
      //     />
      //   </>
      // }
      content={
        <ContentLayout
          extClassName={styles.content}
          heading={
            <SmartHeader
              icon={<Icon color="blue" icon="ReadMessageIcon" size="54" />}
              text="Чат"
            />
          }
        >
          <PageSubMenuForChats />
          {isMobile ? (
            <>
              <ChatsList
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                handleNavigate={handleNavigate}
              />
              <Routes>
                <Route
                  path={'/:chatId'}
                  element={
                    <Chat onClose={() => closeChat()} isMobile={isMobile} />
                  }
                />
              </Routes>
            </>
          ) : (
            <div className={styles.container}>
              <ChatsList
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                handleNavigate={handleNavigate}
              />
              <Routes>
                <Route
                  path={'/:chatId'}
                  element={
                    <Chat isMobile={isMobile} onClose={() => closeChat()} />
                  }
                />
              </Routes>
            </div>
          )}
        </ContentLayout>
      }
    />
  );
}
