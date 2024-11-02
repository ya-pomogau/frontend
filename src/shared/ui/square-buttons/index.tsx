import type { ReactNode, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';
import { ConflictMessageIcon } from '../icons/conflict-message-icon';

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: 'close' | 'edit' | 'confirm' | 'conflict' | 'message';
  onClick?: () => void;
  customIcon?: ReactNode;
  disabledColor?: boolean;
}

const defaultIcons = {
  close: <Icon icon="CloseIcon" size="24" color="white" />,
  edit: <Icon icon="EditIcon" size="24" color="white" />,
  confirm: <Icon icon="DoneIcon" size="24" color="white" />,
  conflict: <Icon icon="ConflictIcon" size="24" color="white" />,
  message: <ConflictMessageIcon size="24" color="white" />,
};

export const SquareButton = ({
  extClassName,
  buttonType,
  customIcon,
  disabledColor = false,
  ...props
}: SquareButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['square-button'],
      disabledColor && styles.disabledColor,
      styles[`square-button--${buttonType}`],
      extClassName
    )}
    {...props}
  >
    <div className={styles['square-buttonImg']}>
      {customIcon || defaultIcons[buttonType]}
    </div>
  </button>
);
