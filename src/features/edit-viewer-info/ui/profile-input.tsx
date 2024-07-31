import { PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './edit-viewer-info.module.css';

export const ProfileInput = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => (
  <>
    <p
      className={classnames(
        styles.infoBlock__item,
        'text',
        'text_size_medium',
        'm-0',
        'p-0',
        'text_type_bold'
      )}
    >
      {label}
    </p>
    {children}
  </>
);
