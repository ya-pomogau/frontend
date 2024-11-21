import classNames from 'classnames';
import { useState } from 'react';

import { Typography, Checkbox, Button } from 'shared/ui';
import { useCancelTaskMutation, useRejectTaskMutation } from 'services';
import { userRole as userRoles } from 'shared/types/common.types';
import { ModalContentProps } from 'widgets/task-buttons-content';
import {
  reasonType as reasonTypes,
  ReasonType,
} from 'widgets/task-buttons-content/types';

import styles from './styles.module.css';

const CloseModalContent = ({
  userRole,
  taskId,
  openChat,
}: ModalContentProps) => {
  const [cancelTask] = useCancelTaskMutation();
  const [rejectTask] = useRejectTaskMutation();
  const [reason, setReason] = useState<ReasonType | null>(null);
  const isReasonUnselected = () => {
    return !reason;
  };

  const handleSetReason = (reasonType: ReasonType) => {
    if (reason === reasonType) {
      setReason(null);
    } else {
      setReason(reasonType);
    }
  };

  const handleCancelClick = () => {
    if (!taskId) return;

    if (userRole === userRoles.RECIPIENT) {
      cancelTask({ id: taskId });
    } else if (userRole === userRoles.VOLUNTEER) {
      rejectTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };

  return (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'Укажите причину отмены'}
        extraClass={styles.modalTitle}
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
          extClassName={styles.fitWidth}
          label="Помощь администратора"
          onClick={openChat}
        />
        <Button
          buttonType="primary"
          label="Отменить заявку"
          disabled={isReasonUnselected()}
          onClick={handleCancelClick}
        />
      </div>
    </div>
  );
};

export default CloseModalContent;
