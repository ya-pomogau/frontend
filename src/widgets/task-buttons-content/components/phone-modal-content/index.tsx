import { FC } from 'react';

import { textStyle, titleStyle } from 'widgets/task-buttons-content/utils';
import { ModalContentProps } from 'widgets/task-buttons-content';

import styles from './styles.module.css';

export const PhoneModalContent: FC<ModalContentProps> = () => {
  return (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>Номер телефона:</h3>
      <a className={textStyle} href="tel: +7 (800) 555-35-35">
        +7 (800) 555-35-35
      </a>
    </div>
  );
};

export default PhoneModalContent;
