import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface CategoriesBackgroundProps {
  extClassName?: string;
  theme: 'success' | 'primary' | 'warning' | 'secondary';
  content?: string | React.ReactNode;
  size?: 'medium' | 'large';
}

export const CategoriesBackground = ({
  extClassName,
  theme = 'primary',
  content,
  size = 'large',
}: CategoriesBackgroundProps) => (
  <div
    className={classnames(
      styles['categories-background'],
      styles[`categories-background--${size}`],
      styles[`categories-background--${theme}`],
      extClassName,
      'text',
      'text_size_small'
    )}
  >
    <div className={styles['categories-background-content']}>{content}</div>
  </div>
);
