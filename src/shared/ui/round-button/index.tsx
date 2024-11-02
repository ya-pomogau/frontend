import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import { AddLargeIcon } from '../icons/add-icon';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType:
    | 'phone'
    | 'message'
    | 'location'
    | 'addMedium'
    | 'addLarge'
    | 'default';
  onClick?: () => void;
  customIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  unreadMessages?: number;
}

const defautlIcons = {
  phone: <Icon icon="PhoneIcon" size="24" color="white" />,
  message: <Icon icon="EmptyMessageIcon" size="24" color="white" />,
  location: <Icon icon="LocationIcon" size="54" color="white" />,
  addMedium: <Icon icon="AddMediumIcon" size="48" color="white" />,
  addLarge: <AddLargeIcon size="66" color="white" />,
  default: null,
};

export const RoundButton = ({
  extClassName,
  buttonType,
  customIcon,
  size,
  unreadMessages,
  ...props
}: RoundButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['round-button'],
      styles[`round-button--${buttonType}`],
      styles[`round-button--${size}`],
      extClassName
    )}
    {...props}
  >
    <div className={styles['round-buttonImg']}>
      {customIcon || defautlIcons[buttonType]}
    </div>
    {buttonType === 'message' && unreadMessages ? (
      unreadMessages > 99 ? (
        <div className={styles.messages_additional}>{'99+'}</div>
      ) : (
        <div className={styles.messages}>{unreadMessages}</div>
      )
    ) : null}
  </button>
);
