import classNames from "classnames";
import { FinishedApplicationIcon } from "../icons/finished-application-icon";
import { OverlayingPopup } from "../overlaying-popup";
import styles from "./dialog.module.css";

interface IDialogProps {
  isOpened?: boolean;
  onClose?: () => void;
  title?: string;
  isMobile?: boolean;
  isExitButton?: boolean;
  isApproveButton?: boolean;
}

export const Dialog = ({
  isOpened,
  onClose,
  title,
  isMobile = false,
  isExitButton = false,
  isApproveButton = false,
}: IDialogProps) => {
  let content = isApproveButton ? (
    <button type="button">df</button>
  ) : (
    <FinishedApplicationIcon color="white" size="54" className={styles.icon} />
  );

  if (isApproveButton) {
    content = <button type="button">df</button>;
  } else if (isMobile) {
    content = (
      <FinishedApplicationIcon
        color="white"
        size="24"
        className={styles.icon}
      />
    );
  } else {
    content = (
      <FinishedApplicationIcon
        color="white"
        size="54"
        className={styles.icon}
      />
    );
  }

  return (
    <OverlayingPopup isOpened={isOpened} onClose={onClose}>
      <div className={classNames(styles.container)}>
        {isExitButton && (
          <button type="button" className={styles.exitButton}>
            dv
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
        <div className={classNames(styles.contentWrapper)}>{content}</div>
      </div>
    </OverlayingPopup>
  );
};
