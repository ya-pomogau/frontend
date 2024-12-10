import classNames from 'classnames';

import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';

import styles from './main-popup.module.css';
import { ReactNode } from 'react';
import { Typography } from '../../ui';

interface MainPopupProps {
  extClassName?: string;
  name?: string;
  phoneNumber?: string;
  avatarName: string;
  avatarLink?: string;
  children?: ReactNode;
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
            size={'medium'}
          />
          <div className={classNames(styles.profileDesc)}>
            <Typography
              tag={'h2'}
              fontFamily={'secondaryFont'}
              variant={'title'}
              content={name}
            />
            <div className={classNames(styles.phoneWrapper)}>
              <Typography
                tag={'span'}
                variant={'paragraph-bold'}
                fontFamily={'secondaryFont'}
                content={'Тел.: '}
              />
              <Typography
                tag={'span'}
                fontFamily={'secondaryFont'}
                content={phoneNumber}
              />
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
