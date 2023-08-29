import styles from './styles.module.css';

import { PageLayout } from '../../shared/ui/page-layout';
import { UserInfo } from '../../entities/user';
import { SideMenu, SideMenuLink } from '../../widgets/side-menu';
import { ContentLayout } from '../../shared/ui/content-layout';
import { SmartHeader } from '../../shared/ui/smart-header';
import { PageSubMenuForChats } from '../../widgets/page-sub-menu';
import { Conflict } from '../../widgets/chats/components/Conflict';

import { Icon } from '../../shared/ui/icons';
import { ChatsList } from '../../widgets/chats/components';
import { useState } from 'react';
import { useMediaQuery } from '../../shared/hooks';
import { Route, Routes, useNavigate } from 'react-router-dom';

export function ConflictsPage() {
  const [selectedConflictId, setSelectedConflictId] = useState<string>();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`${id}`);
  };

  const closeConflict = () => {
    navigate('..', { relative: 'path' });
    setSelectedConflictId(undefined);
  };

  const isMobile = useMediaQuery('(max-width:800px)');

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
            <>
              <ChatsList
                selectedChatId={selectedConflictId}
                onSelectChat={setSelectedConflictId}
                handleNavigate={handleNavigate}
              />
              <Routes>
                <Route
                  path={'/:conflictId'}
                  element={
                    <Conflict
                      isMobile={isMobile}
                      onClose={() => closeConflict()}
                    />
                  }
                />
              </Routes>
            </>
          ) : (
            <div className={styles.container}>
              <ChatsList
                selectedChatId={selectedConflictId}
                onSelectChat={setSelectedConflictId}
                handleNavigate={handleNavigate}
              />
              <Routes>
                <Route
                  path={'/:conflictId'}
                  element={
                    <Conflict
                      isMobile={isMobile}
                      onClose={() => closeConflict()}
                    />
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
