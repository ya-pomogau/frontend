import classNames from 'classnames';
import { ReactNode } from 'react';
import { Portal } from '../portal';
import styles from './overlaying-popup.module.css';

interface OverlayingPopupProps {
  children?: ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
  handleKeyDown?: () => void;
  extClassName?: string;
}

export const OverlayingPopup = ({
  children,
  onClose,
  isOpened,
  handleKeyDown,
  extClassName,
}: OverlayingPopupProps) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal isOpened>
      <div
        className={classNames(styles.popup, extClassName)}
        role="dialog"
        id="label"
      >
        <div
          className={classNames(styles.overlay)}
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          aria-labelledby="label"
        ></div>
        {children}
      </div>
    </Portal>
  );
};
