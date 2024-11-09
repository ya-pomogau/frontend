import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export const UnfulfilledModalContent = () => {
  return (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'На заявку откликнулись'}
        extraClass={styles.modalTitle}
      />
    </div>
  );
};

export default UnfulfilledModalContent;
