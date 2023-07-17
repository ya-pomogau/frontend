import React from 'react';
import classNames from 'classnames';

import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';

import styles from './main-popup.module.css';

interface MainPopupProps {
  extClassName?: string;
  name?: string;
  phoneNumber?: string;
  avatarName: string;
  avatarLink: string;
  children?: React.ReactNode;
  handleCloseClick: () => void;
  isMobile?: boolean;
}

export const MainPopup = ({
  extClassName,
  name,
  avatarLink,
  avatarName,
  phoneNumber,
  children,
  isMobile,
  handleCloseClick,
}: MainPopupProps) => (
  <div className={classNames(styles.container, extClassName)}>
    {!isMobile && (
      <>
        <SquareButton
          buttonType="close"
          extClassName={styles.exitButton}
          onClick={handleCloseClick}
        />
        <div className={classNames(styles.headerWrapper)}>
          <Avatar
            avatarLink={avatarLink}
            avatarName={avatarName}
            extClassName={styles.avatar}
          />
          <div className={classNames(styles.profileDesc)}>
            <p
              className={classNames(
                'm-0',
                'text_size_large',
                'text_type_regular',
                'text',
                styles['info-name-wrapper']
              )}
            >
              {name}
            </p>
            <div className={classNames(styles.phoneWrapper)}>
              <span
                className={classNames(
                  'text_size_medium',
                  'text_type_bold',
                  'text'
                )}
              >
                Тел.: &nbsp;
              </span>
              <p
                className={classNames(
                  'm-0',
                  'text_size_medium',
                  'text_type_regular',
                  'text',
                  styles.phoneNumber
                )}
              >
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </>
    )}
    {isMobile && (
      <SquareButton
        buttonType="close"
        extClassName={styles.exitButton}
        onClick={handleCloseClick}
      />
    )}
    {children}
  </div>
);
