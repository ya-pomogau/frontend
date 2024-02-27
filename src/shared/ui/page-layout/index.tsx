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
import {
  unauthorizedRecipientMessage,
  unauthorizedVolunteerMessage,
} from 'shared/libs/constants';
import { UserRole } from 'shared/types/common.types';
import { isUnConfirmedSelector } from 'entities/user/model';

interface PageLayoutProps {
  content?: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  const { isError, errorText } = useAppSelector((state) => state.error);
  const isLoadingUserData = useAppSelector((state) => state.user.isLoading);
  const userRole = useAppSelector((state) => state.user.role);
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);
  // TODO: Добавить другие случаи сообщений (потеря связи и пр.)
  const hasMessage = isUnConfirmed;
  //const isLoadingTasksData = useAppSelector((state) => state.tasks.isLoading);
  const location = useLocation();

  return (
    <>
      {/* {isLoadingUserData && <Loader />} */}
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
          {isUnConfirmed && userRole === UserRole.RECIPIENT && (
            <div className={styles.message}>
              <RegistrationNotice settingText={unauthorizedRecipientMessage} />
            </div>
          )}
          {isUnConfirmed && userRole === UserRole.VOLUNTEER && (
            <div className={styles.message}>
              <RegistrationNotice settingText={unauthorizedVolunteerMessage} />
            </div>
          )}
          <div className={styles.content}>
            {isError && <ErrorDialog text={errorText}></ErrorDialog>}
            {errorText !== 'Ошибка подключения' ? content : <NoConectionPage />}
          </div>
        </div>
      )}
    </>
  );
};
