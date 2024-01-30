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
import {
  changeCurrentStep,
  openPopup,
  setAddress,
  setCategory,
  setDate,
  setDescriptionForTask,
  setTime,
} from 'features/create-request/model';
import { useAppDispatch } from 'app/hooks';

enum ButtonType {
  close = 'close',
  conflict = 'conflict',
  confirm = 'confirm',
  phone = 'phone',
  cancel = 'cancel',
}

enum ReasonType {
  first = 'first',
  second = 'second',
  third = 'third',
}

type ButtonsTypes = keyof typeof ButtonType;
type ModalTitles = { [key in ButtonsTypes]: string };
type ModalContent = { [key in ButtonsTypes]: ReactNode };
type ModalButtons = {
  [key in ButtonsTypes]: Array<{
    type: 'primary' | 'secondary';
    text: string;
    modal?: boolean;
    handleclick?: () => void;
  }> | null;
};

interface TaskItemProps {
  time?: number;
  isMobile: boolean;
  category: {
    id: string;
    name: string;
    scope: number;
  };
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

const titles: ModalTitles = {
  close: 'Укажите причину отмены',
  confirm: 'Благодарим за отзывчивость',
  conflict: `Подтвердите, что заявка\nне выполнена`,
  phone: 'Номер телефона:',
  cancel: 'До начала заявки менее 24 часа',
};

const textStyle = classNames(
  'text',
  'text_size_medium',
  'text_type_regular',
  'm-0',
  styles.modalContent
);

export const TaskItem = ({
  isMobile,
  category,
  date,
  time,
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
  const [reason, setReason] = useState<ReasonType | null>(null);

  const content: ModalContent = {
    close: (
      <div className={classNames(styles.modalContent, styles.flexColumn)}>
        <Checkbox
          label="Не смогу прийти"
          id={ReasonType.first}
          onChange={() => setReason(ReasonType.first)}
          checked={reason === ReasonType.first}
        />
        <Checkbox
          label="Отмена по обоюдному согласию"
          id={ReasonType.second}
          onChange={() => setReason(ReasonType.second)}
          checked={reason === ReasonType.second}
        />
        <Checkbox
          label="Не могу указать причину"
          id={ReasonType.third}
          onChange={() => setReason(ReasonType.third)}
          checked={reason === ReasonType.third}
        />
      </div>
    ),
    confirm: <p className={textStyle}>Мы ждем ответ рецепиента</p>,
    conflict: (
      <div className={classNames(styles.modalContent, styles.flexRow)}>
        <Button buttonType="secondary" label="Отменить" />
        <Button buttonType="primary" label="Подтвердить" />
      </div>
    ),
    phone: (
      <a className={textStyle} href="tel: +7 (800) 555-35-35">
        +7 (800) 555-35-35
      </a>
    ),
    cancel: (
      <p className={textStyle}>Вы не можете отменить заявку самостоятельно.</p>
    ),
  };

  const buttonsSection: ModalButtons = {
    close: [
      { type: 'secondary', text: 'Помощь администратора' },
      {
        type: 'primary',
        text: 'Отменить заявку',
        modal: true,
        handleclick: () => console.log(reason),
      },
    ],
    confirm: null,
    conflict: [{ type: 'secondary', text: 'Помощь администратора' }],
    phone: null,
    cancel: [{ type: 'primary', text: 'Написать администратору' }],
  };

  const dispatch = useAppDispatch();

  const additinalAddress = address;

  const handleEditButton = () => {
    dispatch(setDate(date));
    dispatch(setAddress({ additinalAddress }));
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory({ value: category.id, label: category.name }));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
  };

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

  const getModalContent = (buttonType: ButtonsTypes) => {
    return (
      <div className={styles.modalTooltip}>
        <h3
          className={classNames(
            styles.modalTitle,
            'text',
            'text_size_medium',
            'text_type_bold',
            'm-0'
          )}
        >
          {isStatusActive
            ? titles[buttonType]
            : buttonType === ButtonType.conflict
            ? conflict
              ? 'Не Выполнена'
              : 'Выполнена'
            : buttonType === ButtonType.confirm
            ? 'Время выполнения'
            : ''}
        </h3>
        {isStatusActive ? (
          content[buttonType]
        ) : buttonType === ButtonType.confirm ? (
          <p className={textStyle}>
            {
              //в моковых заявках нет время завершения, как появится - обновить
              date ? format(new Date(date), 'dd.MM.yyyy hh:mm') : ''
            }
          </p>
        ) : (
          ''
        )}
        {isStatusActive
          ? buttonsSection[buttonType] && (
              <div className={styles.modalButtons}>
                {buttonsSection[buttonType]?.map((button, i) =>
                  button.modal ? (
                    <ButtonWithModal
                      key={i}
                      modalContent={getModalContent(ButtonType.cancel)}
                    >
                      <Button
                        buttonType={button.type}
                        label={button.text}
                        onClick={button.handleclick}
                      />
                    </ButtonWithModal>
                  ) : (
                    <Button
                      key={i}
                      buttonType={button.type}
                      label={button.text}
                      onClick={button.handleclick}
                    />
                  )
                )}
              </div>
            )
          : null}
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
            content={category.name}
            size={category.name.length > 22 ? 'large' : 'medium'}
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
            content={category.name}
            size={category.name.length > 24 ? 'large' : 'medium'}
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
              <ButtonWithModal modalContent={getModalContent(ButtonType.phone)}>
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
          <ButtonWithModal modalContent={getModalContent(ButtonType.confirm)}>
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
          <ButtonWithModal modalContent={getModalContent(ButtonType.close)}>
            <SquareButton
              buttonType={ButtonType.close}
              extClassName={
                !date && recipientName ? styles.item_hidden : styles.button_edit
              }
              //переписать completed если бэк поменяется
              disabled={comparedDateResult || !completed}
            />
          </ButtonWithModal>
          <ButtonWithModal modalContent={getModalContent(ButtonType.conflict)}>
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
            taskId={taskId}
            onClick={handleEditButton}
            buttonType="edit"
            extClassName={
              // не забыть удалить ! после подключения бека
              !recipientName ? styles.item_hidden : styles.button_edit
            }
          />
        </div>
      </div>
    </div>
  );
};
