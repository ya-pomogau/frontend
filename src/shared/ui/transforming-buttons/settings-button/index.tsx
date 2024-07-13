import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

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
      styles.styles_button,
      extClassName
    )}
    {...props}
  />
);
