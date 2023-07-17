import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import stylesButton from '../styles.module.css';

interface SettingsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
}

export const SettingsButton = ({
  extClassName,
  ...props
}: SettingsButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['setting-button'],
      stylesButton.styles_button,
      extClassName
    )}
    {...props}
  >
    {' '}
  </button>
);
