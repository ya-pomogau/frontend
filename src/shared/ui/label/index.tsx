import React, { LabelHTMLAttributes } from 'react';
import styles from './label.module.css'
import classnames from 'classnames';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  extClassName?: string;
  htmlFor?: string;
}

export const Label = ({ extClassName, children, htmlFor, ...props }: LabelProps) => {
  return (
    <label className={classnames(styles.label, extClassName)} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
};
