import { FC } from 'react';

import { ModalContentProps } from 'widgets/task-buttons-content';
import { textStyle, titleStyle } from 'widgets/task-buttons-content/utils';
import { Button } from '@pbe/react-yandex-maps';
import { infoAdmin, PopupChat } from 'entities';
import { useControlModal } from 'shared/hooks';

import styles from './styles.module.css';

export const RespondedModalContent: FC<ModalContentProps> = () => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
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
};

export default RespondedModalContent;
