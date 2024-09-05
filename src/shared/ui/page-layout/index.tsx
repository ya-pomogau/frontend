import { ReactNode } from 'react';

import { useAppSelector } from 'app/hooks';

import styles from './styles.module.css';
import { UserInfo } from 'entities/user';
import { FeedbackSideMenu, SideMenuForAuthorized } from 'widgets/side-menu';
import { useLocation } from 'react-router-dom';
import { NoConnectionPage } from 'features/error-boundary/pages/noConnectionPage';
import { RegistrationNotice } from '../registration-notice';
import {
  unauthorizedRecipientMessage,
  unauthorizedVolunteerMessage,
} from 'shared/libs/constants';
import { UserRole } from 'shared/types/common.types';
import {
  isUnConfirmedSelector,
  isUserBlockedSelector,
} from 'entities/user/model';
import { BlockedPage } from '../../../features/error-boundary/pages/blockedPage';

interface PageLayoutProps {
  content?: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  const { isError, errorText } = useAppSelector((state) => state.error);
  const userRole = useAppSelector((state) => state.user.role);
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);
  const isBlockedSelector = useAppSelector(isUserBlockedSelector);
  // TODO: Добавить другие случаи сообщений (потеря связи и пр.)
  const hasMessage = isUnConfirmed;
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
              userRole ? (
                ''
              ) : (
                <FeedbackSideMenu />
              )
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
            {isError
              ? (errorText === 'Ошибка подключения' && (
                  <NoConnectionPage errorText={errorText as string} />
                )) ||
                (isBlockedSelector && <BlockedPage />)
              : content}
          </div>
        </div>
      )}
    </>
  );
};
