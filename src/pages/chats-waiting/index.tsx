import { Routes, Route, useNavigate } from 'react-router-dom';

import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';
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
              element={<Chat onClose={() => closeChat()} isMobile={isMobile} />}
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
              element={<Chat isMobile={isMobile} onClose={() => closeChat()} />}
            />
          </Routes>
        </div>
      )}
    </ContentLayout>
  );
}
