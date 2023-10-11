import { LegacyRef, ReactNode } from 'react';
import classNames from 'classnames';
import { SettingsButton } from '../transforming-buttons/settings-button';
import { Avatar } from '../avatar';

import styles from './info-container.module.css';
import placeholder from './img/placeholder.svg';
import useUser from 'shared/hooks/use-user';

interface InfoContainerProps {
  extClassName?: string;
  children?: ReactNode;
  avatar?: string;
  name: string;
  onClickSettingsButton?: () => void;
  buttonRef?: LegacyRef<HTMLButtonElement>;
}

export const InfoContainer = ({
  extClassName,
  children,
  avatar,
  name,
  onClickSettingsButton,
  buttonRef,
}: InfoContainerProps) => {
  const isAuth = useUser();

  return (
    <div className={classNames(styles['info-container-frame'], extClassName)}>
      <img
        className={classNames(styles['info-container-border'])}
        src="data:image/png;base64,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"
        alt="Граница профиля"
      />
      <div className={classNames(styles['info-container-avatarWrapper'])}>
        <Avatar
          avatarLink={avatar || placeholder}
          avatarName={name}
          extClassName={styles['info-container-avatar']}
        />
      </div>
      <div className={classNames(styles['info-container-content'])}>
        {children}
      </div>
      {isAuth && (
        <SettingsButton
          extClassName={styles['info-container-settings-button']}
          onClick={onClickSettingsButton}
          disabled={!isAuth}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
};
