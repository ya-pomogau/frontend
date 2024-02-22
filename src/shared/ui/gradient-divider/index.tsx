import cn from 'classnames';
import styles from './styles.module.css';
import React from 'react';

interface PropsGradientDivider {
  extClassName?: string;
}

export const GradientDivider: React.FC<PropsGradientDivider> = (props) => {
  return <div className={cn(props.extClassName, styles.border)} />;
};
