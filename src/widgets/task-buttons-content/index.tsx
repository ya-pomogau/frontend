import classNames from 'classnames';
import { useState } from 'react';
import { differenceInHours, parseISO } from 'date-fns';
import Checkbox from 'shared/ui/checkbox';
import styles from './styles.module.css';
import { Button } from 'shared/ui/button';
import { ReasonType } from './types';
import { textStyle, titleStyle } from './utils';
import { UserRole, ModalContentType } from 'shared/types/common.types';
import {
  useDeleteTaskMutation,
  useRejectTaskMutation,
} from 'services/user-task-api';
import { ButtonWithModal } from 'widgets/button-with-modal';

interface ModalContentProps {
  type: ModalContentType;
  active?: boolean;
  conflict?: boolean;
  date?: string | null;
  userRole?: UserRole | null;
  taskId?: string;
}

export const ModalContent = ({
  type,
  active = true,
  conflict = true,
  date,
  userRole,
  taskId,
}: ModalContentProps) => {
  const [reason, setReason] = useState<ReasonType | null>(null);
  const [deleteTask] = useDeleteTaskMutation();
  const [rejectTask] = useRejectTaskMutation();

  const handleRejectClick = () => {
    if (userRole && taskId) {
      rejectTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };

  const handleDeleteClick = () => {
    if (userRole && taskId && !isRemainLessThanDay(date)) {
      deleteTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };

  const isRemainLessThanDay = (taskDeadline: string | null | undefined) => {
    if (!taskDeadline) return false;

    const now = new Date();
    const parsedDate = parseISO(taskDeadline);
    const hoursToDeadline = differenceInHours(parsedDate, now);
    if (hoursToDeadline < 24) return true;
    return false;
  };

  const handleSetReason = (reasonType: ReasonType) => {
    if (reasonType !== null) {
      setReason(reasonType);
    }
  };
  switch (type) {
    case ModalContentType.close:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Укажите причину отмены</h3>
          <div className={classNames(styles.modalContent, styles.flexColumn)}>
            <Checkbox
              label="Не смогу прийти"
              id={ReasonType.first}
              onChange={() => handleSetReason(ReasonType.first)}
              checked={reason === ReasonType.first}
            />
            <Checkbox
              label="Отмена по обоюдному согласию"
              id={ReasonType.second}
              onChange={() => handleSetReason(ReasonType.second)}
              checked={reason === ReasonType.second}
            />
            <Checkbox
              label="Не могу указать причину"
              id={ReasonType.third}
              onChange={() => handleSetReason(ReasonType.third)}
              checked={reason === ReasonType.third}
            />
          </div>
          <div className={styles.modalButtons}>
            <Button
              buttonType="secondary"
              label="Помощь администратора"
              onClick={() => 1}
            />
            <ButtonWithModal
              closeButton
              modalContent={
                <ModalContent
                  type={
                    isRemainLessThanDay(date)
                      ? ModalContentType.cancel
                      : ModalContentType.confirm
                  }
                  date={date}
                />
              }
            >
              <Button
                buttonType="primary"
                label="Отменить заявку"
                onClick={handleDeleteClick}
              />
            </ButtonWithModal>
          </div>
        </div>
      );
    case ModalContentType.conflict:
      return (
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
                    onClick={() => 1}
                  />
                </div>
              )}
            </>
          }
        </div>
      );
    case ModalContentType.confirm:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Благодарим за отзывчивость</h3>
          <p className={textStyle}>
            {`Мы ждем ответ ${
              userRole === UserRole.RECIPIENT ? 'от волонтера' : 'от реципиента'
            }`}
          </p>
        </div>
      );
    case ModalContentType.admin:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Связь с администратором</h3>
          <div className={styles.modalButtons}>
            <Button
              buttonType="secondary"
              label={'Написать администратору'}
              onClick={() => 1}
            />
          </div>
        </div>
      );
    case ModalContentType.phone:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Номер телефона:</h3>
          <a className={textStyle} href="tel: +7 (800) 555-35-35">
            +7 (800) 555-35-35
          </a>
        </div>
      );
    case ModalContentType.cancel:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>До начала заявки менее 24 часа</h3>
          <p className={textStyle}>
            Вы не можете отменить заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button buttonType="primary" label="Написать администратору" />
          </div>
        </div>
      );
    case ModalContentType.responded:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>На заявку откликнулись</h3>
          <p className={textStyle}>
            Вы не можете отменить или отредактировать заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button buttonType="primary" label="Написать администратору" />
          </div>
        </div>
      );
    case ModalContentType.unfulfilled:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>На заявку не откликнулись</h3>
        </div>
      );
  }
};
