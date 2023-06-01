import classNames from "classnames";
import { Avatar } from "../avatar";
import { Button } from "../button";
import styles from "./settings-popup.module.css";

interface ISettingsPopup {
  extClassName?: string;
  avatarName: string;
  avatarLink: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
}

export const SettingsPopup = ({
  extClassName,
  avatarName,
  avatarLink,
  name,
  phoneNumber,
  address,
}: ISettingsPopup) => (
  <div className={classNames(styles.container, extClassName)}>
    <div className={classNames(styles.headerWrapper)}>
      <Avatar
        avatarLink={avatarLink}
        avatarName={avatarName}
        extClassName={styles.avatar}
      />
      <Button
        label="Изменить фото"
        buttonType="secondary"
        extClassName={styles.settingsButton}
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
          <span
            className={classNames(styles["wrapper-input-desc"])}
            id="phoneNumberId"
          >
            Тел.: &nbsp;
          </span>
          <input
            value={phoneNumber}
            type="text"
            id="phoneNumberId"
            className={classNames(styles.input)}
          />
        </label>
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
      <div className={styles.buttonsWrapper}>
        <Button
          label="Сохранить"
          buttonType="primary"
          extClassName={styles.saveButton}
        />
        <Button
          label="Выход"
          buttonType="secondary"
          extClassName={styles.unsaveButton}
        />
      </div>
    </form>
  </div>
);
