import { Button, Typography } from 'shared/ui';

import styles from './styles.module.css';
import { ModalContentProps } from 'widgets/task-buttons-content/index';

export const AdminModalContent = ({ openChat }: ModalContentProps) => {
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
          onClick={openChat}
        />
      </div>
    </div>
  );
};

export default AdminModalContent;
