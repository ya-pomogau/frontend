import { FC } from 'react';

import { useControlModal } from 'shared/hooks';
import { titleStyle } from 'widgets/task-buttons-content/utils';
import { Button } from 'shared/ui';
import { infoAdmin, PopupChat } from 'entities';
import { ModalContentProps } from 'widgets/task-buttons-content';

import styles from './styles.module.css';

export const AdminModalContent: FC<ModalContentProps> = () => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
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
};

export default AdminModalContent;
