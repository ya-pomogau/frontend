import { Avatar } from "shared/ui/avatar";
import { CategoriesBackground } from "shared/ui/categories-background";
import { Icon } from "shared/ui/icons";
import classNames from "classnames";
import { useState } from "react";
import { RoundButton } from "shared/ui/round-button";
import { SquareButton } from "shared/ui/square-buttons";
import styles from "./styles.module.css";

interface Props {
  isMobile: boolean;
  category: string;
  date: string;
  time: string;
  address: string;
  title: string;
  description: string;
  count: string;
  avatarName: string;
  avatarLink: string;
  recipientName: string;
  recipientPhoneNumber: string;
  handleClickPnoneButton?: () => void;
  handleClickMessageButton?: () => void;
  handleClickConfirmButton?: () => void;
  handleClickCloseButton?: () => void;
  handleClickEditButton?: () => void;
  extClassName?: string;
}

export const Task = ({
  isMobile,
  category,
  date,
  time,
  address,
  title,
  description,
  count,
  avatarName,
  avatarLink,
  recipientName,
  recipientPhoneNumber,
  handleClickPnoneButton,
  handleClickMessageButton,
  handleClickConfirmButton,
  handleClickCloseButton,
  handleClickEditButton,
  extClassName,
}: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  if (isMobile) {
    return (
      <div
        className={classNames(
          styles.mobile_container_main,
          "text",
          extClassName
        )}
      >
        <div className={styles.mobile_header}>
          <CategoriesBackground
            theme="primary"
            content={category}
            size="medium"
            extClassName={styles.mobile_category}
          />
          <SquareButton buttonType="close" onClick={handleClickCloseButton} />
        </div>
        <div className={styles.mobile_recipient_bio}>
          <Avatar
            avatarName={avatarName}
            avatarLink={avatarLink}
            extClassName={styles.mobile_avatar}
          />
          <div>
            <p className={`${styles.mobile_recipient_name} m-0`}>
              {recipientName}
            </p>
            <p className="m-0 text_size_medium">{recipientPhoneNumber}</p>
          </div>
        </div>
        <div className={styles.mobile_buttons_call}>
          <RoundButton buttonType="phone" onClick={handleClickPnoneButton} />
          <RoundButton
            buttonType="message"
            onClick={handleClickMessageButton}
          />
        </div>
        <div className={styles.mobile_section_description}>
          <h2
            className={`${styles.mobile_title} text_size_large text_type_regular`}
          >
            {title}
          </h2>
          <p
            className={
              isHidden
                ? styles.mobile_description_hidden
                : styles.mobile_description
            }
          >
            {description}
          </p>
          <button
            type="button"
            className={`${
              isHidden ? styles.button_hidden : styles.button
            } text text_size_medium`}
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "Читать" : "Свернуть"}
          </button>
        </div>
        <div className={styles.icon_finish_container}>
          <Icon color="blue" icon="FinishedApplicationIcon" size="32" />
          <p className={`${styles.count} text_size_small`}>{count}</p>
        </div>
        <div className={styles.mobile_data_time}>
          <div
            className={classNames(
              styles.mobile_date,
              "text_size_medium",
              "text_type_bold"
            )}
          >
            <Icon
              color="blue"
              icon="CalendarIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{date}</p>
          </div>
          <div
            className={classNames(
              styles.mobile_date,
              "text_size_medium",
              "text_type_bold"
            )}
          >
            <Icon
              color="blue"
              icon="ClockIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{time}</p>
          </div>
        </div>
        <div
          className={classNames(
            styles.mobile_address,
            "text_size_medium",
            "text_type_bold"
          )}
        >
          <Icon
            color="blue"
            icon="LocationIcon"
            size="24"
            className={styles.icon}
          />
          <p className="m-0">{address}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={classNames(styles.container_main, "text", extClassName)}>
      <div className={styles.container}>
        <div className={styles.section_left}>
          <CategoriesBackground
            theme="primary"
            content={category}
            size="medium"
            extClassName={styles.category}
          />
          <div className={classNames(styles.date, "text_size_large")}>
            <Icon
              color="blue"
              icon="CalendarIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{date}</p>
          </div>
          <div className={classNames(styles.date, "text_size_large")}>
            <Icon
              color="blue"
              icon="ClockIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{time}</p>
          </div>
          <div className={styles.date}>
            <Icon
              color="blue"
              icon="LocationIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0 text_size_medium">{address}</p>
          </div>
        </div>
        <div>
          <h2 className={`${styles.title} text_size_large text_type_regular`}>
            {title}
          </h2>
          <p
            className={
              isHidden ? styles.description_hidden : styles.description
            }
          >
            {description}
          </p>
          <button
            type="button"
            className={`${
              isHidden ? styles.button_hidden : styles.button
            } text text_size_medium`}
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "Читать" : "Свернуть"}
          </button>
          <div className={styles.icon_balls_container}>
            <Icon color="blue" icon="BallsIcon" size="46" />
            <p className={`${styles.count} text_size_small`}>{count}</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.section_right}>
          <Avatar
            avatarName={avatarName}
            avatarLink={avatarLink}
            extClassName={styles.avatar}
          />
          <p className={`${styles.recipient_name} m-0 text_size_medium`}>
            {recipientName}
          </p>
          <p className={`${styles.phone} text_size_medium`}>
            {recipientPhoneNumber}
          </p>
          <div className={styles.buttons_call}>
            <RoundButton buttonType="phone" onClick={handleClickPnoneButton} />
            <RoundButton
              buttonType="message"
              onClick={handleClickMessageButton}
            />
          </div>
        </div>
        <div className={styles.buttons_action}>
          {handleClickConfirmButton && (
            <SquareButton
              buttonType="confirm"
              onClick={handleClickConfirmButton}
            />
          )}
          {handleClickCloseButton && (
            <SquareButton
              buttonType="close"
              onClick={handleClickCloseButton}
              extClassName={styles.button_edit}
            />
          )}
          {handleClickEditButton && (
            <SquareButton
              buttonType="edit"
              onClick={handleClickEditButton}
              extClassName={styles.button_edit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
