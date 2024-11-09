import { useControlModal } from 'shared/hooks';
import { Button, Typography } from 'shared/ui';
import { infoAdmin, PopupChat } from 'entities';

import styles from './styles.module.css';

export const AdminModalContent = () => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
  return (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'Связь с администратором'}
        extraClass={styles.modalTitle}
      />
      <div className={styles.modalButtons}>
        <Button
          buttonType="secondary"
          label={'Написать администратору'}
          onClick={handleOpen}
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
