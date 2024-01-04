import classnames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Icon } from 'shared/ui/icons';

import styles from './admin-button.module.css';

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  extraClass?: string;
  isMobile?: boolean;
  isDisabled?: boolean;
  buttonType?: string;
};

export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
  (
    {
      children,
      isMobile = false,
      isDisabled,
      extraClass,
      buttonType,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <button
        className={classnames(extraClass)}
        type="button"
        ref={ref}
        disabled={isDisabled}
        {...buttonProps}
      >
        {buttonType ? (
          <>
            <p className={styles.title}>{children}</p>
            <div className={isDisabled ? styles.icon_disable : styles.icon}>
              <Icon
                color="white"
                icon={isMobile ? 'ReadMessageIcon' : 'EmptyMessageIcon'}
                size="24"
              />
            </div>
          </>
        ) : (
          <>
            <p className={styles.title_logout}>{children}</p>
            <Icon color="blue" icon="ExitIcon" size="24" />
          </>
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

AdminButton.displayName = 'AdminButton';
