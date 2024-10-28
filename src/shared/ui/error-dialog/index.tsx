import classNames from 'classnames';
import styles from './dialog.module.css';
import { Icon } from '../icons';
import { Typography } from '../typography';

interface ErrorDialogProps {
  text?: string | null;
}

export const ErrorDialog = ({ text }: ErrorDialogProps) => (
  <div className={classNames(styles.container)}>
    <Icon color="blue" icon="ExclamationPMark" size="54" />
    <Typography
      tag={'p'}
      fontFamily={'primaryFont'}
      variant={'paragraph'}
      content={text}
    />
  </div>
);
