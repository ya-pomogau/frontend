import classNames from 'classnames';
import styles from './styles.module.css';

export const titleStyle = classNames(
  styles.modalTitle,
  'text',
  'text_size_medium',
  'text_type_bold',
  'm-0'
);

export const textStyle = classNames(
  'text',
  'text_size_medium',
  'text_type_regular',
  'm-0',
  styles.modalContent
);
