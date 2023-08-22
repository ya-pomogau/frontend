import classNames from 'classnames';

import { Informer } from '../informer';
import { SquareButton } from '../square-buttons';
import { Button } from '../button';

import styles from './dialog.module.css';

interface ErrorDialogProps {
  text?: string;
}

export const ErrorDialog = ({ text }: ErrorDialogProps) => (
  <div className={classNames(styles.container)}>
    <p className={classNames('text', 'text_size_medium', styles.headerText)}>
      {text}
    </p>
  </div>
);
