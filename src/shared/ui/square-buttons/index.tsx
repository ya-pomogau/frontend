import type { ReactNode, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import { EditIcon } from '../icons/edit-icon';
import { CloseIcon } from '../icons/close-icon';
import { DoneIcon } from '../icons/done-icon';

import styles from './styles.module.css';
import { ConflictIcon } from '../icons/conflict-icon';
import { ConflictMessageIcon } from '../icons/conflict-message-icon';

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  taskId?: number;
  extClassName?: string;
  buttonType: 'close' | 'edit' | 'confirm' | 'conflict' | 'message';
  onClick?: () => void;
  customIcon?: ReactNode;
  disabledColor?: boolean;
}

const defaultIcons = {
  close: <CloseIcon size="24" color="white" />,
  edit: <EditIcon size="24" color="white" />,
  confirm: <DoneIcon size="24" color="white" />,
  conflict: <ConflictIcon size="24" color="white" />,
  message: <ConflictMessageIcon size="24" color="white" />,
};

export const SquareButton = ({
  taskId,
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
