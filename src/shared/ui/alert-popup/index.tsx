import classNames from "classnames";
import { ReactNode } from "react";
import { OverlayingPopup } from "../overlaying-popup";
import styles from "./alert-popup.module.css";

interface IAlertPopup {
  isOpened?: boolean;
  onClose?: () => void;
  extClassName?: string;
  title?: string;
  children?: ReactNode;
}

export const AlertPopup = ({
  isOpened,
  onClose,
  extClassName,
  title = "Благодарю за отзывчивость",
  children,
}: IAlertPopup) => (
  <OverlayingPopup isOpened={isOpened} onClose={onClose}>
    <div className={classNames(styles.container, extClassName)}>
      <p>{title}</p>
      {children}
    </div>
  </OverlayingPopup>
);
