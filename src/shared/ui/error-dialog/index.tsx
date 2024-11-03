import classNames from 'classnames';
import styles from './dialog.module.css';
import { Icon } from '../icons';
import { Typography } from '../../ui';

interface ErrorDialogProps {
  text?: string | null;
}

export const ErrorDialog = ({ text }: ErrorDialogProps) => (
  <div className={classNames(styles.container)}>
    <Icon color="blue" icon="ExclamationPMark" size="54" />
    <Typography content={text} />
  </div>
);
