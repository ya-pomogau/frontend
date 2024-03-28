import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import stylesButton from '../styles.module.css';

interface ExcelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
}

export const ExcelButton = ({ extClassName, ...props }: ExcelButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['excel-button'],
      stylesButton.styles_button,
      extClassName
    )}
    {...props}
  >
    {' '}
  </button>
);
