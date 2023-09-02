import type { ReactNode, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import { EditIcon } from '../icons/edit-icon';
import { CloseIcon } from '../icons/close-icon';
import { DoneIcon } from '../icons/done-icon';

import styles from './styles.module.css';
import { UndoneIcon } from '../icons/undone-icon';

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: 'close' | 'edit' | 'confirm' | 'undone';
  onClick?: () => void;
  customIcon?: ReactNode;
}

const defautlIcons = {
  close: <CloseIcon size="24" color="white" />,
  edit: <EditIcon size="24" color="white" />,
  confirm: <DoneIcon size="24" color="white" />,
  undone: <UndoneIcon size="24" color="white" />,
};

export const SquareButton = ({
  extClassName,
  buttonType,
  customIcon,
  ...props
}: SquareButtonProps) => (
  <button
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
