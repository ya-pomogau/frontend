import classNames from 'classnames';
import { useState } from 'react';

import { Typography, Checkbox, Button } from 'shared/ui';
import { useCancelTaskMutation } from 'services';
import { userRole as userRoles } from 'shared/types/common.types';
import { useControlModal } from 'shared/hooks';
import { PopupChat, infoAdmin } from 'entities';
import { ModalContentProps } from 'widgets/task-buttons-content';
import {
  reasonType as reasonTypes,
  ReasonType,
} from 'widgets/task-buttons-content/types';

import styles from './styles.module.css';

const CloseModalContent = ({ userRole, taskId }: ModalContentProps) => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const [cancelTask] = useCancelTaskMutation();
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
    if (userRole === userRoles.RECIPIENT && taskId) {
      cancelTask({ id: taskId });
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
