import classNames from "classnames";
import { ReactNode } from "react";
import { Avatar } from "../avatar";
import { OverlayingPopup } from "../overlaying-popup";
import styles from "./main-popup.module.css";

interface IMainPopupProps {
  isOpened?: boolean;
  onClose?: () => void;
  extClassName?: string;
  children?: ReactNode;
  avatarName: string;
  avatarLink: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
}
const f = "phoneNumberId";
export const MainPopup = ({
  isOpened,
  onClose,
  extClassName,
  children,
  avatarName,
  avatarLink,
  name = "Иванов Иван Иванович",
  phoneNumber = "+7(000) 000-00-00",
  address = "ул. Потолочного, д.4",
}: IMainPopupProps) => (
  <OverlayingPopup isOpened={isOpened} onClose={onClose}>
    <div className={classNames(styles.container, extClassName)}>
      <div className={classNames(styles.headerWrapper, extClassName)}>
        {children}
        <Avatar
          avatarLink={avatarLink}
          avatarName={avatarName}
          extClassName={styles.avatar}
        />
      </div>
      <form className={classNames(styles.form, extClassName)}>
        <div className={classNames(styles.labelForName, extClassName)}>
          <label
            htmlFor="nameId"
            className={classNames(
              extClassName,
              "text_size_small",
              "text_type_bold",
              "text"
            )}
          >
            <span
              className={classNames(styles["wrapper-input-desc"], extClassName)}
            >
              Имя.: &nbsp;
            </span>
            <input
              value={name}
              type="text"
              id="nameId"
              className={classNames(styles.input, extClassName)}
            />
          </label>
        </div>
        <div className={classNames(styles.labelForPhoneNumber, extClassName)}>
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
              className={classNames(styles["wrapper-input-desc"], extClassName)}
            >
              Тел.: &nbsp;
            </span>
          </label>
          <input
            value={phoneNumber}
            type="text"
            id="phoneNumberId"
            className={classNames(styles.input, extClassName)}
          />
        </div>
        <div className={classNames(styles.labelForAddress, extClassName)}>
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
            <span
              className={classNames(styles["wrapper-input-desc"], extClassName)}
            >
              Адрес: &nbsp;
            </span>
            <input
              value={address}
              type="text"
              id="addressId"
              className={classNames(styles.input, extClassName)}
            />
          </label>
        </div>
      </form>
    </div>
  </OverlayingPopup>
);
