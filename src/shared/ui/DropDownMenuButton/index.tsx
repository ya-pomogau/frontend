import classnames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Icon } from 'shared/ui/icons';

import styles from './DropDownMenuButton.module.css';

type DropDownMenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isMobile?: boolean;
  isDisabled?: boolean;
  buttonType?: string;
};

export const DropDownMenuButton = forwardRef<
  HTMLButtonElement,
  DropDownMenuButtonProps
>(
  (
    { children, isMobile = false, isDisabled, buttonType, ...buttonProps },
    ref
  ) => {
    const sendMessageIcon = (
      <Icon
        color="white"
        icon={isMobile ? 'ReadMessageIcon' : 'EmptyMessageIcon'}
        size="24"
      />
    );
    const logoutIcon = <Icon color="blue" icon="ExitIcon" size="24" />;
    return (
      <button
        className={styles.adminButton}
        type="button"
        ref={ref}
        disabled={isDisabled}
        {...buttonProps}
      >
        {buttonType ? (
          <div className={styles.wrapper}>
            <p className={styles.title}>{children}</p>
            <div className={isDisabled ? styles.icon_disable : styles.icon}>
              {sendMessageIcon}
            </div>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <p className={styles.title_logout}>{children}</p>
            {logoutIcon}
          </div>
        )}

        {isMobile && (
          <svg
            className={`${styles.title__background}`}
            width="235"
            height="46"
            viewBox="0 0 235 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 17L235 0V46L0 39V17Z"
              fill={isDisabled ? '#818C99' : '#9798C9'}
            />
          </svg>
        )}
      </button>
    );
  }
);

DropDownMenuButton.displayName = 'DropDownMenuButton';
