import classNames from "classnames";
import { Avatar } from "../avatar";
import { OverlayingPopup } from "../overlaying-popup";
import styles from "./settings-popup.module.css";

interface ISettingsPopup {
  isOpened?: boolean;
  onClose?: () => void;
  extClassName?: string;
  avatarName: string;
  avatarLink: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
}

export const SettingsPopup = ({
  isOpened,
  onClose,
  extClassName,
  avatarName,
  avatarLink,
  name,
  phoneNumber,
  address,
}: ISettingsPopup) => (
  <OverlayingPopup isOpened={isOpened} onClose={onClose}>
    <div className={classNames(styles.container, extClassName)}>
      <div className={classNames(styles.headerWrapper)}>
        <Avatar
          avatarLink={avatarLink}
          avatarName={avatarName}
          extClassName={styles.avatar}
        />
      </div>
      <form className={classNames(styles.form)}>
        <div className={classNames(styles.labelForName)}>
          <label
            htmlFor="nameId"
            className={classNames(
              extClassName,
              "text_size_small",
              "text_type_bold",
              "text"
            )}
          >
            <span className={classNames(styles["wrapper-input-desc"])}>
              Имя.: &nbsp;
            </span>
            <input
              value={name}
              type="text"
              id="nameId"
              className={classNames(styles.input)}
            />
          </label>
        </div>
        <div className={classNames(styles.labelForPhoneNumber)}>
          <label
            htmlFor="phoneNumberId"
            className={classNames(
              extClassName,
              "m-0",
              "text_size_small",
              "text_type_bold",
              "text"
            )}
          >
            <span className={classNames(styles["wrapper-input-desc"])}>
              Тел.: &nbsp;
            </span>
          </label>
          <input
            value={phoneNumber}
            type="text"
            id="phoneNumberId"
            className={classNames(styles.input)}
          />
        </div>
        <div className={classNames(styles.labelForAddress)}>
          <label
            htmlFor="addressId"
            className={classNames(
              extClassName,
              "m-0",
              "text_size_small",
              "text_type_bold",
              "text"
            )}
          >
            <span className={classNames(styles["wrapper-input-desc"])}>
              Адрес: &nbsp;
            </span>
            <input
              value={address}
              type="text"
              id="addressId"
              className={classNames(styles.input)}
            />
          </label>
        </div>
      </form>
    </div>
  </OverlayingPopup>
);
