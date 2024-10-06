import { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

import { Portal } from '../portal';

import styles from './overlaying-popup.module.css';

interface OverlayingPopupProps {
  children?: ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
  extClassName?: string;
}

export const OverlayingPopup = ({
  children,
  onClose,
  isOpened,
  extClassName,
}: OverlayingPopupProps) => {
  
  useEffect(() => {
    isOpened ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <Portal isOpened>
      <div className={classNames(styles.popup)} role="dialog" id="label">
        <div
          className={classNames(styles.overlay, extClassName)}
          role="button"
          tabIndex={0}
          onClick={onClose}
          aria-labelledby="label"
        ></div>
        {children}
      </div>
    </Portal>
  );
};
