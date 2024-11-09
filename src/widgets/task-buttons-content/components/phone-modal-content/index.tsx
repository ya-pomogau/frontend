import { ModalContentProps } from 'widgets/task-buttons-content';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export const PhoneModalContent = ({ phoneNumber }: ModalContentProps) => {
  return (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'Номер телефона:'}
        extraClass={styles.modalTitle}
      />
      <a href={`tel:${phoneNumber}`}>
        <Typography
          tag={'span'}
          fontFamily={'secondaryFont'}
          content={phoneNumber}
          extraClass={styles.modalContent}
        />
      </a>
    </div>
  );
};

export default PhoneModalContent;
