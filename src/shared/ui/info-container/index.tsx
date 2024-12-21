import { ReactNode } from 'react';
import classNames from 'classnames';

import { useAppSelector } from 'app/hooks';
import { isUserBlockedSelector } from 'entities/user/model';
import { useUser } from 'shared/hooks';

import { SettingsButton } from '../transforming-buttons';
import { Avatar } from '../avatar';

import styles from './info-container.module.css';

interface InfoContainerProps {
  extClassName?: string;
  children?: ReactNode;
  avatar?: string;
  name: string;
  onClickSettingsButton?: () => void;
}

export const InfoContainer = ({
  extClassName,
  children,
  avatar,
  name,
  onClickSettingsButton,
}: InfoContainerProps) => {
  const isAuth = useUser();
  const isBlockedSelector = useAppSelector(isUserBlockedSelector);

  return (
    <div
      className={classNames(
        styles['info-container-frame'],
        { [styles['infoContainerFrame-unauth']]: !isAuth },
        extClassName
      )}
    >
      <Avatar size="large" avatarLink={avatar} avatarName={name} />
      <div className={styles['info-container-content']}>{children}</div>
      {isAuth && !isBlockedSelector && (
        <SettingsButton
          extClassName={styles['info-container-settings-button']}
          onClick={onClickSettingsButton}
          disabled={!isAuth}
        />
      )}
    </div>
  );
};
