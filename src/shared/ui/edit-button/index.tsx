import type { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';
import { Typography } from '../typography';

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
    className={classnames(styles['edit-button'], extClassName)}
    {...props}
  >
    <div className={styles['edit-buttonContent']}>
      <Icon icon="EditIcon" size="24" color="blue" />
      <Typography
        tag={'span'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'support'}
        content={label}
      />
    </div>
  </button>
);
