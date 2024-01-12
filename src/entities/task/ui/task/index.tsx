import { ReactNode, useState } from 'react';
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
import Checkbox from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';

enum ButtonsTypes {
  CLOSE = 'close',
  COMPLETED = 'completed',
  CONFLICT = 'conflict',
  CONFIRMED = 'confirmed',
  PHONE = 'phone',
}

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
  handleClickPhoneButton?: () => void;
  handleClickMessageButton?: () => void;
  handleClickConfirmButton?: () => void;
  handleClickCloseButton?: () => void;
  handleClickEditButton?: () => void;
  handleClickConflictButton?: () => void;
  extClassName?: string;
}

const titles: { [key: string]: string } = {
  CLOSE: 'Укажите причину отмены',
  CONFIRM: 'Благодарим за отзывчивость',
  CONFLICT: `Подтвердите, что заявка\nне выполнена`,
  PHONE: 'Номер телефона:',
};

const content: { [key: string]: ReactNode } = {
  close: (
    <div className={classNames(styles.modalContent, styles.flexColumn)}>
      <Checkbox label="Не смогу прийти" />
      <Checkbox label="Отмена по обоюдному согласию" />
      <Checkbox label="Не могу указать причину" />
    </div>
  ),
  edit: null,
  confirm: (
    <p
      className={classNames(
        'text',
        'text_size_medium',
        'text_type_regular',
        'm-0',
        styles.modalContent
      )}
    >
      Мы ждем ответ рецепиента
    </p>
  ),
  conflict: (
    <div className={classNames(styles.modalContent, styles.flexRow)}>
      <Button buttonType="secondary" label="Отменить" />
      <Button buttonType="primary" label="Подтвердить" />
    </div>
  ),
  phone: (
    <a
      className={classNames(
        'text',
        'text_size_medium',
        'text_type_regular',
        'm-0',
        styles.modalContent
      )}
      href="tel: +7 (800) 555-35-35"
    >
      +7 (800) 555-35-35
    </a>
  ),
  message: '',
  location: '',
  add: '',
  default: null,
};

const buttonsSection: {
  [key: string]: Array<{ type: 'primary' | 'secondary'; text: string }> | null;
} = {
  close: [
    { type: 'secondary', text: 'Помощь администратора' },
    { type: 'primary', text: 'Отменить заявку' },
  ],
  edit: null,
  confirm: null,
  conflict: [{ type: 'secondary', text: 'Помощь администратора' }],
  phone: null,
  message: null,
  location: null,
  add: null,
  default: null,
};

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
  handleClickPhoneButton,
  handleClickMessageButton,
  handleClickConfirmButton,
  handleClickCloseButton,
  handleClickEditButton,
  handleClickConflictButton,
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

  const getModalContent = (buttonType: string) => {
    return (
      <div className={styles.tooltip}>
        <h3
          className={classNames(
            styles.modalTitle,
            'text',
            'text_size_medium',
            'text_type_bold',
            'm-0'
          )}
        >
          {!isStatusActive && buttonType === 'conflict'
            ? conflict
              ? 'Не выполнена'
              : 'Выполнена'
            : titles[buttonType]}
        </h3>
        {!isStatusActive && buttonType === 'conflict'
          ? null
          : content[buttonType]}
        {buttonsSection[buttonType] && (
          <div className={styles.modalButtons}>
            {buttonsSection[buttonType]?.map((button, i) => (
              <Button key={i} buttonType={button.type} label={button.text} />
            ))}
          </div>
        )}
      </div>
    );
  };

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
            {handleClickConfirmButton && (
              <SquareButton
                buttonType="confirm"
                onClick={handleClickConfirmButton}
                extClassName={
                  recipientName && !date
                    ? ''
                    : recipientName
                    ? ''
                    : styles.item_hidden
                }
              />
            )}
            {handleClickCloseButton && (
              <SquareButton
                buttonType="close"
                onClick={handleClickCloseButton}
                extClassName={
                  !date && recipientName
                    ? styles.item_hidden
                    : styles.button_edit
                }
                disabled={comparedDateResult || completed}
              />
            )}
            {handleClickConflictButton && (
              <SquareButton
                buttonType="conflict"
                onClick={handleClickConflictButton}
                extClassName={
                  recipientName
                    ? ''
                    : !comparedDateResult
                    ? ''
                    : styles.item_hidden
                }
              />
            )}
            {handleClickEditButton && (
              <SquareButton
                buttonType="edit"
                onClick={handleClickEditButton}
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
              <ButtonWithModal modalContent={getModalContent('phone')}>
                <RoundButton
                  buttonType="phone"
                  onClick={handleClickPhoneButton}
                  disabled={completed && confirmed}
                />
              </ButtonWithModal>
              <ButtonWithModal modalContent={getModalContent('message')}>
                <RoundButton
                  buttonType="message"
                  onClick={handleClickMessageButton}
                  disabled={completed && confirmed}
                  unreadMessages={unreadMessages}
                />
              </ButtonWithModal>
            </div>
          </div>
        </div>
        <div className={styles.buttons_action}>
          {handleClickConfirmButton && (
            <ButtonWithModal modalContent={getModalContent('confirm')}>
              <SquareButton
                buttonType="confirm"
                onClick={handleClickConfirmButton}
                extClassName={
                  recipientName && !date
                    ? ''
                    : recipientName
                    ? ''
                    : styles.item_hidden
                }
              />
            </ButtonWithModal>
          )}
          {handleClickCloseButton && (
            <ButtonWithModal modalContent={getModalContent('close')}>
              <SquareButton
                buttonType="close"
                onClick={handleClickCloseButton}
                extClassName={
                  !date && recipientName
                    ? styles.item_hidden
                    : styles.button_edit
                }
                //disabled={comparedDateResult || !completed}
              />
            </ButtonWithModal>
          )}
          {handleClickConflictButton && (
            <ButtonWithModal modalContent={getModalContent('conflict')}>
              <SquareButton
                buttonType="conflict"
                onClick={handleClickConflictButton}
                extClassName={
                  recipientName && !date
                    ? ''
                    : recipientName
                    ? ''
                    : !comparedDateResult
                    ? ''
                    : styles.item_hidden
                }
              />
            </ButtonWithModal>
          )}
          {handleClickEditButton && (
            <ButtonWithModal modalContent={getModalContent('edit')}>
              <SquareButton
                buttonType="edit"
                onClick={handleClickEditButton}
                extClassName={
                  recipientName ? styles.item_hidden : styles.button_edit
                }
              />
            </ButtonWithModal>
          )}
        </div>
      </div>
    </div>
  );
};
