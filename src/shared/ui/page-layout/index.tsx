import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from 'app/hooks';
import { isUserBlockedSelector } from 'entities/user/model';
import { UserInfo } from 'entities/user';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import {
  unauthorizedRecipientMessage,
  unauthorizedVolunteerMessage,
} from 'shared/libs/constants';
import { useMediaQuery, usePermission, useRouteMatch } from 'shared/hooks';
import { Breakpoints, Routes } from 'shared/config';
import { userRole as userRoles, userStatus } from 'shared/types/common.types';
import { BlockedPage } from 'features/error-boundary/pages/blockedPage';
import { NoConnectionPage } from 'features/error-boundary/pages/noConnectionPage';
import { RegistrationNotice } from '../registration-notice';

import styles from './styles.module.css';

interface PageLayoutProps {
  content?: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  const { isError, errorText } = useAppSelector((state) => state.error);
  const isBlockedSelector = useAppSelector(isUserBlockedSelector);
  // TODO: Добавить другие случаи сообщений (потеря связи и пр.)

  const location = useLocation();
  const isProfilePage = location.pathname === Routes.PROFILE;
  const isMobile = useMediaQuery(Breakpoints.L);

  const isUnconfirmedRecipient = usePermission(
    [userStatus.UNCONFIRMED],
    userRoles.RECIPIENT
  );
  const isUnconfirmedVolunteer = usePermission(
    [userStatus.UNCONFIRMED],
    userRoles.VOLUNTEER
  );

  const isPageWithoutSidebar = useRouteMatch([
    Routes.POLICY,
    Routes.BLOG,
    Routes.PICK,
    Routes.CONTACTS,
  ]);

  const hasUnconfirmedMessage =
    isUnconfirmedRecipient || isUnconfirmedVolunteer;

  const mainStyles = cn(styles.main, {
    [styles.mainWithMessage]: hasUnconfirmedMessage,
  });
  const sideStyles = cn(styles.side, {
    [styles.hidden]: isMobile && !isProfilePage,
  });

  return (
    <>
      {isPageWithoutSidebar ? (
        <div className={styles.content}> {content} </div>
      ) : (
        <div className={mainStyles}>
          <div className={sideStyles}>
            <div className={styles.user}>
              <UserInfo />
            </div>
            <SideMenuForAuthorized />
          </div>
          {isUnconfirmedRecipient && (
            <div className={styles.message}>
              <RegistrationNotice settingText={unauthorizedRecipientMessage} />
            </div>
          )}
          {isUnconfirmedVolunteer && (
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
