import classNames from "classnames";
import { OverlayingPopup } from "../overlaying-popup";
import { Informer } from "../informer";
import styles from "./dialog.module.css";
import { SquareButton } from "../square-buttons";
import { Button } from "../button";

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
        <SquareButton buttonType="close" extClassName={styles.exitButton} />
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
        <div className={styles.buttonWrapper}>
          <Button
            label="Хочу"
            buttonType="primary"
            extClassName={styles.confirmButton}
          />
        </div>
      )}
    </div>
  </OverlayingPopup>
);
