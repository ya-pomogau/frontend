/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import { ReactNode } from "react";
import { Portal } from "../portal";
import styles from "./overlaying-popup.module.css";

interface IOverlayingPopupProps {
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
}: IOverlayingPopupProps) => {
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
          aria-labelledby="label"
        />
        {children}
      </div>
    </Portal>
  );
};
