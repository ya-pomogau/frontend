import { Button, Typography } from 'shared/ui';

import styles from './styles.module.css';
import { ModalContentProps } from 'widgets/task-buttons-content/index';

export const CancelModalContent = ({ openChat }: ModalContentProps) => {
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
          onClick={openChat}
        />
      </div>
    </div>
  );
};

export default CancelModalContent;
