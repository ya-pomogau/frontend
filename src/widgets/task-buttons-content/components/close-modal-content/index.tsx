import classNames from 'classnames';
import { useState } from 'react';

import Checkbox from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';
import { PopupChat } from 'entities';
import { useControlModal } from 'shared/hooks';
import { infoAdmin } from 'entities';
import { ModalContent, ModalContentProps } from 'widgets/task-buttons-content';
import { ButtonWithModal } from 'widgets/button-with-modal';
import {
  reasonType as reasonTypes,
  ReasonType,
} from 'widgets/task-buttons-content/types';
import { titleStyle } from 'widgets/task-buttons-content/utils';
import { modalContentType } from 'shared/types/common.types';

import styles from './styles.module.css';

const CloseModalContent = ({ date, userRole, taskId }: ModalContentProps) => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
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
};

export default CloseModalContent;
