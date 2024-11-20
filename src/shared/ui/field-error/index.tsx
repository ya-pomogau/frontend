import { type FC } from 'react';
import { Typography } from '../typography';
import styles from './styles.module.css';

interface Props {
  message?: string;
}

export const FieldError: FC<Props> = ({ message }) => {
  return (
    <div className={styles.container}>
      {message ? (
        <Typography
          tag={'span'}
          variant={'support'}
          color="orange"
          content={message}
        />
      ) : null}
    </div>
  );
};
