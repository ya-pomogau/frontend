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
import { unauthorizedVolunteerMessage } from 'shared/libs/constants';
import { UserRole } from 'shared/types/common.types';

interface PageLayoutProps {
  content?: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  const { isError, errorText } = useAppSelector((state) => state.error);
  const { isLoading, data } = useAppSelector((state) => state.user);

  const isUnConfirmedUser = (data && data.status === UNCONFIRMED) || null;
  console.log(isUnConfirmedUser);
  // TODO: Добавить другие случаи сообщений (потеря связи и пр.)
  const hasMessage = isUnConfirmedUser;
  const location = useLocation();
  const userRole = data?.role;
  console.log(UserRole.RECIPIENT);

  return (
    <>
      {isLoading && <Loader />}
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
          {isUnConfirmedUser && userRole === 'recipient' && (
            <div className={styles.message}>
              <RegistrationNotice settingText={unauthorizedVolunteerMessage} />
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
