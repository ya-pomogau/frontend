import type { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import { EditIcon } from '../icons/edit-icon';

import styles from './styles.module.css';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  label: string;
}

export const EditButton = ({
  extClassName,
  label,
  ...props
}: EditButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['edit-button'],
      extClassName,
      'text',
      'text_size_small',
      'p-0'
    )}
    {...props}
  >
    <div className={styles['edit-buttonContent']}>
      <EditIcon size="24" color="blue" />
      <span>{label}</span>
    </div>
  </button>
);
