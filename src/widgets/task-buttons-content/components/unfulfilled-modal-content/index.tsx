import { FC } from 'react';

import { titleStyle } from 'widgets/task-buttons-content/utils';
import { ModalContentProps } from 'widgets/task-buttons-content';

import styles from './styles.module.css';

export const UnfulfilledModalContent: FC<ModalContentProps> = () => {
  return (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>На заявку не откликнулись</h3>
    </div>
  );
};

export default UnfulfilledModalContent;
