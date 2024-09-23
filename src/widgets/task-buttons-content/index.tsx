import classNames from 'classnames';
import { useState } from 'react';
import { differenceInHours, parseISO } from 'date-fns';
import Checkbox from 'shared/ui/checkbox';
import styles from './styles.module.css';
import { Button } from 'shared/ui/button';
import { reasonType as reasonTypes, ReasonType } from './types';
import { textStyle, titleStyle } from './utils';
import {
  UserRole,
  userRole as userRoles,
  ModalContentType,
  modalContentType,
} from 'shared/types/common.types';
import {
  useCancelTaskMutation,
  useRejectTaskMutation,
} from 'services/user-task-api';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { useControlModal } from 'shared/hooks';
import { infoAdmin, PopupChat } from 'entities';

interface ModalContentProps {
  type: ModalContentType;
  active?: boolean;
  conflict?: boolean;
  date?: string | null;
  userRole?: UserRole | null;
  taskId?: string;
  volunteer?: boolean;
}

export const ModalContent = ({
  type,
  active = true,
  conflict = true,
  date,
  userRole,
  taskId,
  volunteer,
}: ModalContentProps) => {
  const [reason, setReason] = useState<ReasonType | null>(null);
  const [rejectTask] = useRejectTaskMutation();
  const [cancelTask] = useCancelTaskMutation();
  const { isOpen, handleOpen, handleClose } = useControlModal();

  const handleRejectClick = () => {
    if (userRole && taskId) {
      rejectTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };

  const isRemainLessThanDay = (taskDeadline: string | null | undefined) => {
    if (!taskDeadline) return false;

    const now = new Date();
    const parsedDate = parseISO(taskDeadline);
    const hoursToDeadline = differenceInHours(parsedDate, now);
    return hoursToDeadline < 24;
  };

  const handleSetReason = (reasonType: ReasonType) => {
    if (reasonType !== null) {
      setReason(reasonType);
    }
  };

  const handleCancelClick = () => {
    if (userRole === userRoles.RECIPIENT && taskId) {
      cancelTask({ id: taskId });
    }
  };

  const isReasonUnselected = () => {
    return !reason;
  };

  switch (type) {
    case modalContentType.close:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Укажите причину отмены</h3>
          <div className={classNames(styles.modalContent, styles.flexColumn)}>
            <Checkbox
              label="Не смогу прийти"
              id={reasonTypes.first}
              onChange={() => handleSetReason(reasonTypes.first)}
              checked={reason === reasonTypes.first}
            />
            <Checkbox
              label="Отмена по обоюдному согласию"
              id={reasonTypes.second}
              onChange={() => handleSetReason(reasonTypes.second)}
              checked={reason === reasonTypes.second}
            />
            <Checkbox
              label="Не могу указать причину"
              id={reasonTypes.third}
              onChange={() => handleSetReason(reasonTypes.third)}
              checked={reason === reasonTypes.third}
            />
          </div>
          <div className={styles.modalButtons}>
            <Button
              buttonType="secondary"
              label="Помощь администратора"
              onClick={() => handleOpen()}
            />
            {isOpen && (
              <PopupChat
                isOpen={isOpen}
                onClick={handleClose}
                messages={[]}
                chatmateInfo={infoAdmin}
                onAttachFileClick={() => {}}
              />
            )}
            <ButtonWithModal
              closeButton
              modalContent={
                // TODO: проверить оба варианта
                // <ModalContent
                //   type={
                //     isRemainLessThanDay(date)
                //       ? modalContentType.cancel
                //       : modalContentType.confirm
                //   }
                //   date={date}
                // />
                <ModalContent
                  type={modalContentType.cancel}
                  taskId={taskId}
                  userRole={userRole}
                  date={date}
                />
              }
            >
              <Button
                buttonType="primary"
                label="Отменить заявку"
                disabled={isReasonUnselected()}
                // TODO: проверить оба варианта
                // onClick={handleDeleteClick}
              />
            </ButtonWithModal>
          </div>
        </div>
      );
    case modalContentType.conflict:
      return userRole === userRoles.RECIPIENT && volunteer === false ? (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Волонтер пока не откликнулся</h3>
          <p className={textStyle}>
            Вы не можете подтвердить не выполнение заявки, пока у заявки нет
            волонтера.
          </p>
        </div>
      ) : (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>
            {active
              ? 'Подтвердите, что заявка не выполнена'
              : conflict
              ? 'Не выполнена'
              : 'Выполнена'}
          </h3>
          {
            <>
              {active && (
                <div
                  className={classNames(styles.modalContent, styles.flexRow)}
                >
                  <Button buttonType="secondary" label="Отменить" />
                  <Button
                    buttonType="primary"
                    label="Подтвердить"
                    onClick={handleRejectClick}
                  />
                </div>
              )}
              {(active || !conflict) && (
                <div className={styles.modalButtons}>
                  <Button
                    buttonType="secondary"
                    label={
                      active
                        ? 'Помощь администратора'
                        : 'Написать администратору'
                    }
                    onClick={() => handleOpen()}
                  />
                  {isOpen && (
                    <PopupChat
                      isOpen={isOpen}
                      onClick={handleClose}
                      messages={[]}
                      chatmateInfo={infoAdmin}
                      onAttachFileClick={() => {}}
                    />
                  )}
                </div>
              )}
            </>
          }
        </div>
      );
    case modalContentType.confirm:
      return userRole === userRoles.RECIPIENT && volunteer === false ? (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Волонтер пока не откликнулся</h3>
          <p className={textStyle}>
            Вы не можете подтвердить выполнение заявки, пока у заявки нет
            волонтера.
          </p>
        </div>
      ) : (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Благодарим за отзывчивость</h3>
          <p className={textStyle}>
            {`Мы ждем ответ ${
              userRole === userRoles.RECIPIENT
                ? 'от волонтера'
                : 'от реципиента'
            }`}
          </p>
        </div>
      );
    case modalContentType.admin:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Связь с администратором</h3>
          <div className={styles.modalButtons}>
            <Button
              buttonType="secondary"
              label={'Написать администратору'}
              onClick={() => handleOpen()}
            />
            {isOpen && (
              <PopupChat
                isOpen={isOpen}
                onClick={handleClose}
                messages={[]}
                chatmateInfo={infoAdmin}
                onAttachFileClick={() => {}}
              />
            )}
          </div>
        </div>
      );
    case modalContentType.phone:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Номер телефона:</h3>
          <a className={textStyle} href="tel: +7 (800) 555-35-35">
            +7 (800) 555-35-35
          </a>
        </div>
      );
    case modalContentType.cancel:
      // TODO: сделать более нормальную проверку. Пока что дам возможность отменить бессрочные заявки.
      if (!date || !isRemainLessThanDay(date)) {
        return (
          <div className={styles.modalTooltip}>
            <h3 className={titleStyle}>Подтвердите удаление заявки</h3>
            <p className={textStyle}>
              Заявка будет отменена без возможности восстановления.
            </p>
            <div className={styles.modalButtons}>
              <Button
                buttonType="primary"
                label="Отменить"
                onClick={handleCancelClick}
              />
            </div>
          </div>
        );
      }

      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>До начала заявки менее 24 часа</h3>
          <p className={textStyle}>
            Вы не можете отменить заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button
              buttonType="primary"
              label="Написать администратору"
              onClick={() => handleOpen()}
            />
            {isOpen && (
              <PopupChat
                isOpen={isOpen}
                onClick={handleClose}
                messages={[]}
                chatmateInfo={infoAdmin}
                onAttachFileClick={() => {}}
              />
            )}
          </div>
        </div>
      );
    case modalContentType.responded:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>На заявку откликнулись</h3>
          <p className={textStyle}>
            Вы не можете отменить или отредактировать заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button
              buttonType="primary"
              label="Написать администратору"
              onClick={() => handleOpen()}
            />
            {isOpen && (
              <PopupChat
                isOpen={isOpen}
                onClick={handleClose}
                messages={[]}
                chatmateInfo={infoAdmin}
                onAttachFileClick={() => {}}
              />
            )}
          </div>
        </div>
      );
    case modalContentType.unfulfilled:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>На заявку не откликнулись</h3>
        </div>
      );
  }
};
