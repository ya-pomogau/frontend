import classNames from 'classnames';
import styles from './dialog.module.css';
import { Icon } from '../icons';

interface ErrorDialogProps {
  text?: string | null;
}

export const ErrorDialog = ({ text }: ErrorDialogProps) => (
  <div className={classNames(styles.container)}>
    <Icon color="blue" icon="ExclamationPMark" size="54" />
    <p className={classNames('text', 'text_size_medium', styles.headerText)}>
      {text}
    </p>
  </div>
);
