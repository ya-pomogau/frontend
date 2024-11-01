import classNames from 'classnames';
import { useState, Dispatch, SetStateAction } from 'react';
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
import { taskReport, TaskReport } from 'entities/task/types';
import { Typography } from 'shared/ui';

interface ModalContentProps {
  type: ModalContentType;
  active?: boolean;
  conflict?: boolean;
  date?: string | null;
  userRole?: UserRole | null;
  taskId?: string;
  volunteer?: boolean;
  volunteerReport?: TaskReport | null;
  recipientReport?: TaskReport | null;
  setConflictModalVisible?: Dispatch<SetStateAction<boolean>>;
  phoneNumber?: string;
}

export const ModalContent = ({
  type,
  active = true,
  conflict = true,
  date,
  userRole,
  taskId,
  volunteer,
  volunteerReport,
  recipientReport,
  setConflictModalVisible,
  phoneNumber,
}: ModalContentProps) => {
  const [reason, setReason] = useState<ReasonType | null>(null);
  const [rejectTask] = useRejectTaskMutation();
  const [cancelTask] = useCancelTaskMutation();
  const { isOpen, handleOpen, handleClose } = useControlModal();

  const handleRejectClick = () => {
    if (userRole && taskId) {
      rejectTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }

    setConflictModalVisible && setConflictModalVisible(false);
  };

  const isRemainLessThanDay = (taskDeadline: string | null | undefined) => {
    if (!taskDeadline) return false;

    const now = new Date();
    const parsedDate = parseISO(taskDeadline);
    const hoursToDeadline = differenceInHours(parsedDate, now);
    return hoursToDeadline < 24;
  };

  const handleSetReason = (reasonType: ReasonType) => {
    if (reason === reasonType) {
      setReason(null);
    } else {
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Укажите причину отмены'}
            extraClass={titleStyle}
          />
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Волонтер пока не откликнулся'}
            extraClass={titleStyle}
          />
          <Typography
            fontFamily={'secondaryFont'}
            content={
              'Вы не можете подтвердить не выполнение заявки, пока у заявки нет волонтера.'
            }
            extraClass={textStyle}
          />
        </div>
      ) : (
        <div className={styles.modalTooltip}>
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={
              active
                ? 'Подтвердите, что заявка не выполнена'
                : conflict
                ? 'Не выполнена'
                : 'Выполнена'
            }
            extraClass={titleStyle}
          />
          {
            <>
              {active && (
                <div
                  className={classNames(styles.modalContent, styles.flexRow)}
                >
                  <Button
                    buttonType="secondary"
                    label="Отменить"
                    onClick={() =>
                      setConflictModalVisible && setConflictModalVisible(false)
                    }
                  />
                  <Button
                    buttonType="primary"
                    label="Подтвердить"
                    onClick={handleRejectClick}
                    disabled={
                      conflict ||
                      (userRole === userRoles.VOLUNTEER &&
                        volunteerReport === taskReport.REJECTED) ||
                      (userRole === userRoles.RECIPIENT &&
                        recipientReport === taskReport.REJECTED)
                    }
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Волонтер пока не откликнулся'}
            extraClass={titleStyle}
          />
          <Typography
            fontFamily={'secondaryFont'}
            content={
              'Вы не можете подтвердить выполнение заявки, пока у заявки нет волонтера.'
            }
            extraClass={textStyle}
          />
        </div>
      ) : (
        <div className={styles.modalTooltip}>
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Благодарим за отзывчивость'}
            extraClass={titleStyle}
          />
          <Typography
            fontFamily={'secondaryFont'}
            content={`Мы ждем ответ ${
              userRole === userRoles.RECIPIENT
                ? 'от волонтера'
                : 'от реципиента'
            }`}
            extraClass={textStyle}
          />
        </div>
      );
    case modalContentType.admin:
      return (
        <div className={styles.modalTooltip}>
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Связь с администратором'}
            extraClass={titleStyle}
          />
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'Номер телефона:'}
            extraClass={titleStyle}
          />
          <a href={`tel:${phoneNumber}`}>
            <Typography
              tag={'span'}
              fontFamily={'secondaryFont'}
              content={phoneNumber}
              extraClass={textStyle}
            />
          </a>
        </div>
      );
    case modalContentType.cancel:
      // TODO: сделать более нормальную проверку. Пока что дам возможность отменить бессрочные заявки.
      if (!date || !isRemainLessThanDay(date)) {
        return (
          <div className={styles.modalTooltip}>
            <Typography
              tag={'h3'}
              variant={'paragraph-bold'}
              content={'Подтвердите удаление заявки'}
              extraClass={titleStyle}
            />
            <Typography
              fontFamily={'secondaryFont'}
              content={'Заявка будет отменена без возможности восстановления.'}
              extraClass={textStyle}
            />
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'До начала заявки менее 24 часа'}
            extraClass={titleStyle}
          />
          <Typography
            fontFamily={'secondaryFont'}
            content={'Вы не можете отменить заявку самостоятельно.'}
            extraClass={textStyle}
          />
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'На заявку откликнулись'}
            extraClass={titleStyle}
          />
          <Typography
            fontFamily={'secondaryFont'}
            content={
              'Вы не можете отменить или отредактировать заявку самостоятельно.'
            }
            extraClass={textStyle}
          />
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
          <Typography
            tag={'h3'}
            variant={'paragraph-bold'}
            content={'На заявку не откликнулись'}
            extraClass={titleStyle}
          />
        </div>
      );
  }
};
