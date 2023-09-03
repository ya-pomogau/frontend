import type { ReactNode, ButtonHTMLAttributes, LegacyRef } from 'react';
import classnames from 'classnames';

import { EditIcon } from '../icons/edit-icon';
import { CloseIcon } from '../icons/close-icon';
import { DoneIcon } from '../icons/done-icon';

import styles from './styles.module.css';
import { ConflictIcon } from '../icons/conflict-icon';
import { UndoneIcon } from '../icons/undone-icon';

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: 'close' | 'edit' | 'confirm' | 'conflict' | 'undone';
  onClick?: () => void;
  customIcon?: ReactNode;
  buttonRef?: LegacyRef<HTMLButtonElement>;
}

const defautlIcons = {
  close: <CloseIcon size="24" color="white" />,
  edit: <EditIcon size="24" color="white" />,
  confirm: <DoneIcon size="24" color="white" />,
  conflict: <ConflictIcon size="24" color="white" />,
  undone: <UndoneIcon size="24" color="white" />,
};

export const SquareButton = ({
  buttonRef,
  extClassName,
  buttonType,
  customIcon,
  ...props
}: SquareButtonProps) => (
  <button
    ref={buttonRef}
    type="button"
    className={classnames(
      styles['square-button'],
      styles[`square-button--${buttonType}`],
      extClassName
    )}
    {...props}
  >
    <div className={styles['square-buttonImg']}>
      {customIcon || defautlIcons[buttonType]}
    </div>
  </button>
);
