import classNames from "classnames";
import { OverlayingPopup } from "../overlaying-popup";
import { Informer } from "../informer";
import styles from "./dialog.module.css";

interface IDialogProps {
  isOpened?: boolean;
  onClose?: () => void;
  title?: string;
  isExitButton?: boolean;
  isAlertDialog?: boolean;
  isConfirmDialog?: boolean;
  extClassName?: string;
}

export const Dialog = ({
  isOpened,
  onClose,
  title,
  isExitButton = false,
  isAlertDialog = false,
  isConfirmDialog = false,
  extClassName,
}: IDialogProps) => (
  <OverlayingPopup isOpened={isOpened} onClose={onClose}>
    <div className={classNames(styles.container, extClassName)}>
      {isExitButton && (
        <button type="button" className={styles.exitButton}>
          exit
        </button>
      )}
      <p
        className={classNames(
          "text",
          "text_size_medium",
          "text_type_bold ",
          styles.headerText
        )}
      >
        {title}
      </p>
      <div className={classNames(styles.headerWrapper)} />
      {isAlertDialog ? (
        <Informer extClassName={styles.informer} />
      ) : (
        <button type="button" className={styles.confirmButton}>
          ok
        </button>
      )}
    </div>
  </OverlayingPopup>
);
