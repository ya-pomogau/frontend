import { ButtonHTMLAttributes, LegacyRef } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import stylesButton from '../styles.module.css';

interface SettingsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  buttonRef?: LegacyRef<HTMLButtonElement>;
}

export const SettingsButton = ({
  extClassName,
  buttonRef,
  ...props
}: SettingsButtonProps) => (
  <button
    ref={buttonRef}
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
