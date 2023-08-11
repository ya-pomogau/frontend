import { useState } from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';

import { Avatar } from 'shared/ui/avatar';
import { CategoriesBackground } from 'shared/ui/categories-background';
import { Icon } from 'shared/ui/icons';
import { RoundButton } from 'shared/ui/round-button';
import { SquareButton } from 'shared/ui/square-buttons';

import styles from './styles.module.css';

interface TaskItemProps {
  isMobile: boolean;
  category: string;
  date: string;
  address: string;
  description: string;
  count: number;
  avatar: string;
  completed: boolean;
  confirmed: boolean;
  conflict: boolean;
  recipientName: string;
  recipientPhoneNumber: string;
  unreadMessages?: number | undefined;
  handleClickPhoneButton?: () => void;
  handleClickMessageButton?: () => void;
  handleClickConfirmButton?: () => void;
  handleClickCloseButton?: () => void;
  handleClickEditButton?: () => void;
  extClassName?: string;
}

export const TaskItem = ({
  isMobile,
  category,
  date,
  address,
  //title,
  description,
  count,
  avatar,
  completed,
  confirmed,
  conflict,
  recipientName,
  recipientPhoneNumber,
  unreadMessages,
  handleClickPhoneButton,
  handleClickMessageButton,
  handleClickConfirmButton,
  handleClickCloseButton,
  handleClickEditButton,
  extClassName,
}: TaskItemProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const taskLayout =
    confirmed && completed
      ? styles.container_main_default
      : confirmed
      ? styles.container_main_confirmed
      : conflict
      ? styles.container_main_conflict
      : styles.container_main_default;

  if (isMobile) {
    return (
      <div
        className={classNames(
          styles.mobile_container_main,
          'text',
          taskLayout,
          extClassName
        )}
      >
        <div className={styles.mobile_header}>
          <CategoriesBackground
            theme="primary"
            content={category}
            size={category.length > 20 ? 'large' : 'medium'}
            extClassName={styles.mobile_category}
          />
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
        <div className={styles.mobile_recipient_bio}>
          <Avatar
            avatarName={recipientName}
            avatarLink={avatar}
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
          <RoundButton
            buttonType="phone"
            onClick={handleClickPhoneButton}
            disabled={completed && confirmed}
          />
          <RoundButton
            buttonType="message"
            onClick={handleClickMessageButton}
            disabled={completed && confirmed}
          />
        </div>
        <div className={styles.mobile_section_description}>
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
            {isHidden ? 'Читать' : 'Свернуть'}
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
              'text_size_medium',
              'text_type_bold'
            )}
          >
            <Icon
              color="blue"
              icon="CalendarIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{format(new Date(date), 'dd.MM.yyyy')}</p>
          </div>
          <div
            className={classNames(
              styles.mobile_date,
              'text_size_medium',
              'text_type_bold'
            )}
          >
            <Icon
              color="blue"
              icon="ClockIcon"
              size="24"
              className={styles.icon}
            />
            <p className="m-0">{format(new Date(date), 'kk.mm')}</p>
          </div>
        </div>
        <div
          className={classNames(
            styles.mobile_address,
            'text_size_medium',
            'text_type_bold'
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

  //DESKTOP
  return (
    <div
      className={classNames(
        styles.container_main,
        'text',
        taskLayout,
        extClassName
      )}
    >
      <div className={styles.container}>
        <div className={styles.section_left}>
          <CategoriesBackground
            theme="primary"
            content={category}
            size={category.length > 20 ? 'large' : 'medium'}
            extClassName={styles.category}
          />
          {/* <div className={styles.main}> */}
          <div className={styles.info_date}>
            {/* todo посмотреть заглушку для бессрочного */}
            {date && date === '1000-10-10T00:00Z' ? (
              // <div className={styles.date_additional}>
              //   <div className={classNames(styles.date, 'text_size_large')}>
              //     <Icon
              //       color="blue"
              //       icon="CalendarIcon"
              //       size="24"
              //       className={styles.icon}
              //     />
              //   </div>
              //   <p
              //     className={classNames(
              //       styles.date_text_special,
              //       'm-0',
              //       'text_size_large'
              //     )}
              //   >
              //     бессрочно
              //   </p>
              //   <div className={classNames(styles.date, 'text_size_large')}>
              //     <Icon
              //       color="blue"
              //       icon="ClockIcon"
              //       size="24"
              //       className={styles.icon}
              //     />
              //   </div>
              // </div>
              // посмотреть другие варианты
              <>
                <div className={classNames(styles.date, 'text_size_large')}>
                  <Icon
                    color="blue"
                    icon="CalendarIcon"
                    size="24"
                    className={styles.icon}
                  />
                  <p className="m-0">бессрочно</p>
                </div>
                <div className={classNames(styles.date, 'text_size_large')}>
                  <Icon
                    color="blue"
                    icon="ClockIcon"
                    size="24"
                    className={styles.icon}
                  />
                  <p className="m-0">00:00-00:00</p>
                </div>
              </>
            ) : (
              <>
                <div className={classNames(styles.date, 'text_size_large')}>
                  <Icon
                    color="blue"
                    icon="CalendarIcon"
                    size="24"
                    className={styles.icon}
                  />
                  <p className="m-0">{format(new Date(date), 'dd.MM.yyyy')}</p>
                </div>
                <div className={classNames(styles.date, 'text_size_large')}>
                  <Icon
                    color="blue"
                    icon="ClockIcon"
                    size="24"
                    className={styles.icon}
                  />
                  <p className="m-0">{format(new Date(date), 'kk.mm')}</p>
                </div>
              </>
            )}
            <div className={styles.address}>
              <Icon
                color="blue"
                icon="LocationIcon"
                size="24"
                className={styles.icon}
              />
              <p className="m-0 text_size_medium">{address}</p>
            </div>
          </div>
        </div>
        <div className={styles.info_main}>
          <div className={styles.info_description}>
            <p
              className={
                isHidden ? styles.description_hidden : styles.description
              }
            >
              {description}
            </p>
            {description.length > 198 ? (
              <button
                type="button"
                className={`${
                  isHidden ? styles.button_hidden : styles.button
                } text text_size_medium`}
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? 'Читать' : 'Свернуть'}
              </button>
            ) : null}
          </div>
          <div className={styles.icon_points_container}>
            <Icon color="blue" icon="BallsIcon" size="46" />
            <p className={`${styles.count} text_size_small`}>{count}</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.section_right}>
          <Avatar
            avatarName={recipientName}
            avatarLink={avatar}
            extClassName={styles.avatar}
          />
          <p className={`${styles.recipient_name} m-0 text_size_medium`}>
            {recipientName}
          </p>
          <p className={`${styles.phone} text_size_medium`}>
            {recipientPhoneNumber}
          </p>
          <div className={styles.buttons_call}>
            <RoundButton
              buttonType="phone"
              onClick={handleClickPhoneButton}
              disabled={completed && confirmed}
            />
            <RoundButton
              buttonType="message"
              onClick={handleClickMessageButton}
              disabled={completed && confirmed}
              unreadMessages={unreadMessages}
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
