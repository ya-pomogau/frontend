import { useState } from 'react';
import classNames from 'classnames';
import { parseISO, format, isAfter } from 'date-fns';
import { Avatar } from 'shared/ui/avatar';
import { CategoriesBackground } from 'shared/ui/categories-background';
import { Icon } from 'shared/ui/icons';
import { RoundButton } from 'shared/ui/round-button';
import { SquareButton } from 'shared/ui/square-buttons';
import placeholder from './img/placeholder.svg';

import styles from './styles.module.css';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ButtonType } from 'entities/task/types';
import { ModalContent } from 'widgets/task-buttons-content';

interface TaskItemProps {
  isMobile: boolean;
  category: string;
  date?: string;
  address: string;
  description: string;
  count: number;
  avatar?: string;
  completed: boolean;
  confirmed: boolean;
  conflict?: boolean;
  recipientName?: string;
  recipientPhoneNumber?: string;
  unreadMessages?: number;
  isStatusActive?: boolean;
  extClassName?: string;
}

export const TaskItem = ({
  isMobile,
  category,
  date,
  address,
  description,
  count,
  avatar = placeholder,
  completed,
  confirmed,
  conflict = false,
  recipientName,
  recipientPhoneNumber,
  unreadMessages,
  isStatusActive,
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

  const parsedDate = parseISO(date!);
  const comparedDateResult = isAfter(new Date(), parsedDate);

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
            size={category.length > 22 ? 'large' : 'medium'}
            extClassName={styles.mobile_category}
          />
          <div className={styles.mobile_buttons}>
            {completed && (
              //переписать completed на подходящий параметр
              <SquareButton
                buttonType={ButtonType.confirm}
                extClassName={
                  recipientName && !date
                    ? ''
                    : recipientName
                    ? ''
                    : styles.item_hidden
                }
              />
            )}
            {!completed && (
              //переписать completed на подходящий параметр
              <SquareButton
                buttonType={ButtonType.close}
                extClassName={
                  !date && recipientName
                    ? styles.item_hidden
                    : styles.button_edit
                }
                disabled={comparedDateResult || completed}
              />
            )}
            {!conflict && (
              //переписать true на подходящий параметр
              <SquareButton
                buttonType={ButtonType.conflict}
                extClassName={
                  recipientName
                    ? ''
                    : !comparedDateResult
                    ? ''
                    : styles.item_hidden
                }
              />
            )}
            {true && (
              //переписать true на подходящий параметр
              <SquareButton
                buttonType="edit"
                extClassName={
                  recipientName ? styles.item_hidden : styles.button_edit
                }
              />
            )}
          </div>
        </div>
        <div className={styles.mobile_recipient_bio}>
          <Avatar
            avatarName={recipientName || 'Пользователь не назначен'}
            avatarLink={avatar}
            extClassName={styles.mobile_avatar}
          />
          <div style={recipientName ? {} : { display: 'none' }}>
            <p className={`${styles.mobile_recipient_name} m-0`}>
              {recipientName}
            </p>
            <p className="m-0 text_size_medium">{recipientPhoneNumber}</p>
          </div>
        </div>
        <div
          className={styles.mobile_buttons_call}
          style={recipientName ? {} : { display: 'none' }}
        >
          <RoundButton
            buttonType={ButtonType.phone}
            disabled={completed && confirmed}
          />
          <RoundButton
            buttonType="message"
            disabled={completed && confirmed}
            unreadMessages={unreadMessages}
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
            <p className="m-0">
              {date ? format(new Date(date), 'dd.MM.yyyy') : 'бессрочно'}
            </p>
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
            <p className="m-0">
              {date ? format(new Date(date), 'kk.mm') : '00:00-00:00'}
            </p>
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
            size={category.length > 24 ? 'large' : 'medium'}
            extClassName={styles.category}
          />
          <div className={styles.info_date}>
            <div className={classNames(styles.date, 'text_size_large')}>
              <Icon
                color="blue"
                icon="CalendarIcon"
                size="24"
                className={styles.icon}
              />
              <p className="m-0">
                {date ? format(new Date(date), 'dd.MM.yyyy') : 'бессрочно'}
              </p>
            </div>
            <div className={classNames(styles.date, 'text_size_large')}>
              <Icon
                color="blue"
                icon="ClockIcon"
                size="24"
                className={styles.icon}
              />
              <p className="m-0">
                {date ? format(new Date(date), 'kk.mm') : '00:00-00:00'}
              </p>
            </div>
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
            avatarName={recipientName || 'Пользователь не назначен'}
            avatarLink={avatar}
            extClassName={styles.avatar}
          />
          <div style={recipientName ? {} : { display: 'none' }}>
            <p className={`${styles.recipient_name} m-0 text_size_medium`}>
              {recipientName}
            </p>
            <p className={`${styles.phone} text_size_medium`}>
              {recipientPhoneNumber}
            </p>
            <div className={styles.buttons_call}>
              <ButtonWithModal
                modalContent={
                  <ModalContent
                    type={ButtonType.phone}
                    active={isStatusActive}
                  />
                }
              >
                <RoundButton
                  buttonType={ButtonType.phone}
                  disabled={completed && confirmed}
                />
              </ButtonWithModal>
              <RoundButton
                buttonType="message"
                disabled={completed && confirmed}
                unreadMessages={unreadMessages}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttons_action}>
          <ButtonWithModal
            modalContent={
              <ModalContent
                type={ButtonType.confirm}
                active={isStatusActive}
                date={date}
              />
            }
          >
            <SquareButton
              buttonType={ButtonType.confirm}
              //переписать completed если бэк поменяется
              extClassName={
                recipientName && !date && completed
                  ? ''
                  : recipientName
                  ? ''
                  : styles.item_hidden
              }
            />
          </ButtonWithModal>
          <ButtonWithModal
            modalContent={<ModalContent type={ButtonType.close} />}
          >
            <SquareButton
              buttonType={ButtonType.close}
              extClassName={
                (!date && recipientName) || !isStatusActive
                  ? styles.item_hidden
                  : styles.button_edit
              }
              //переписать completed если бэк поменяется
              disabled={comparedDateResult || !completed}
            />
          </ButtonWithModal>
          <ButtonWithModal
            modalContent={
              <ModalContent
                type={ButtonType.conflict}
                active={isStatusActive}
                conflict={conflict}
              />
            }
          >
            <SquareButton
              buttonType={ButtonType.conflict}
              //переписать conflict на подходящий параметр
              extClassName={
                recipientName && !date && !conflict
                  ? ''
                  : recipientName
                  ? ''
                  : !comparedDateResult
                  ? ''
                  : styles.item_hidden
              }
            />
          </ButtonWithModal>
          <SquareButton
            buttonType="edit"
            extClassName={
              recipientName ? styles.item_hidden : styles.button_edit
            }
          />
        </div>
      </div>
    </div>
  );
};
