import { ReactNode } from 'react';
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
        {/* Возможно не понадобится в будущем т.к. оверлей перекрывает содержимое модалки и делает невозможным нажатие кнопок. Без него задний фон затемняется а интерфейс не доступен*/}
        {/* <div
          className={classNames(styles.overlay)}
          role="button"
          tabIndex={0}
          onClick={onClose}
          aria-labelledby="label"
        ></div> */}
        {children}
      </div>
    </Portal>
  );
};
