import { Button, Typography } from 'shared/ui';

import styles from './styles.module.css';
import { ModalContentProps } from 'widgets/task-buttons-content';

export const RespondedModalContent = ({ openChat }: ModalContentProps) => {
  return (
    <div className={styles.modalTooltip}>
      <Typography
        tag="h3"
        variant="paragraph-bold"
        content="На заявку откликнулись"
        extraClass={styles.modalTitle}
      />
      <Typography
        fontFamily="secondaryFont"
        content={
          'Вы не можете отменить или отредактировать заявку самостоятельно.'
        }
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

export default RespondedModalContent;
