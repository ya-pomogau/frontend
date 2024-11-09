import { differenceInHours, parseISO } from 'date-fns';

import { ModalContentProps } from 'widgets/task-buttons-content';
import { Button, Typography } from 'shared/ui';
import { useCancelTaskMutation } from 'services';
import { userRole as userRoles } from 'shared/types/common.types';
import { infoAdmin, PopupChat } from 'entities';
import { useControlModal } from 'shared/hooks';

import styles from './styles.module.css';

export const CancelModalContent = ({
  date,
  userRole,
  taskId,
}: ModalContentProps) => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const [cancelTask] = useCancelTaskMutation();
  const isRemainLessThanDay = (taskDeadline: string | null | undefined) => {
    if (!taskDeadline) return false;

    const now = new Date();
    const parsedDate = parseISO(taskDeadline);
    const hoursToDeadline = differenceInHours(parsedDate, now);
    return hoursToDeadline < 24;
  };
  const handleCancelClick = () => {
    if (userRole === userRoles.RECIPIENT && taskId) {
      cancelTask({ id: taskId });
    }
  };
  if (!date || !isRemainLessThanDay(date)) {
    return (
      <div className={styles.modalTooltip}>
        <Typography
          tag={'h3'}
          variant={'paragraph-bold'}
          content={'Подтвердите удаление заявки'}
          extraClass={styles.modalTitle}
        />
        <Typography
          fontFamily={'secondaryFont'}
          content={'Заявка будет отменена без возможности восстановления.'}
          extraClass={styles.modalContent}
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
        extraClass={styles.modalTitle}
      />
      <Typography
        fontFamily={'secondaryFont'}
        content={'Вы не можете отменить заявку самостоятельно.'}
        extraClass={styles.modalContent}
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
};

export default CancelModalContent;
