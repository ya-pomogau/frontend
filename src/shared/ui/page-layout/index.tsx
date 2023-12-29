import { ReactNode } from 'react';

import { useAppSelector } from 'app/hooks';
import { Loader } from '../loader';

import styles from './styles.module.css';
import { UserInfo } from 'entities/user';
import { FeedbackSideMenu, SideMenuForAuthorized } from 'widgets/side-menu';
import { useLocation } from 'react-router-dom';
import { ErrorDialog } from '../error-dialog';
import { NoConectionPage } from 'features/error-boundary/pages/NoConectionPage';
import { RegistrationNotice } from '../registration-notice';
import { UNCONFIRMED } from 'shared/libs/statuses';

interface PageLayoutProps {
  content?: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  const { isError, errorText } = useAppSelector((state) => state.error);
  const isLoadingUserData = useAppSelector((state) => state.user.isLoading);
  const isUnConfirmedUser = useAppSelector((state) => {
    return (state.user.data && state.user.data.status === UNCONFIRMED) || null;
  });
  // TODO: Добавить другие случаи сообщений (потеря связи и пр.)
  const hasMessage = isUnConfirmedUser;
  //const isLoadingTasksData = useAppSelector((state) => state.tasks.isLoading);
  const location = useLocation();
  console.log(isError);

  return (
    <>
      {isLoadingUserData && <Loader />}
      {location.pathname === '/policy' ||
      location.pathname === '/blog' ||
      location.pathname === '/pick' ? (
        <div className={styles.content}> {content} </div>
      ) : (
        <div
          className={styles.main + ' ' + (hasMessage && styles.mainWithMessage)}
        >
          <div className={styles.side}>
            <div className={styles.user}>
              <UserInfo />
            </div>
            {location.pathname === '/contacts' ||
            location.pathname === '/feedback' ? (
              <FeedbackSideMenu />
            ) : (
              <SideMenuForAuthorized />
            )}
          </div>

          {isUnConfirmedUser && (
            <div className={styles.message}>
              <RegistrationNotice settingText="Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки." />
            </div>
          )}
          <div className={styles.content}>
            {isError && <ErrorDialog text={errorText}></ErrorDialog>}
            {errorText != 'Ошибка подключения' ? content : <NoConectionPage />}
          </div>
        </div>
      )}
    </>
  );
};
