import { Button, Typography } from 'shared/ui';

import { infoAdmin, PopupChat } from 'entities';
import { useControlModal } from 'shared/hooks';

import styles from './styles.module.css';

export const CancelModalContent = () => {
  const { isOpen, handleOpen, handleClose } = useControlModal();

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
