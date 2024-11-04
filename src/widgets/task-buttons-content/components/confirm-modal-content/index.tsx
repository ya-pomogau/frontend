import { ModalContentProps } from 'widgets/task-buttons-content';
import { titleStyle, textStyle } from 'widgets/task-buttons-content/utils';
import { userRole as userRoles } from 'shared/types/common.types';

import styles from './styles.module.css';

export const ConfirmModalContent = ({
  userRole,
  volunteer,
}: ModalContentProps) => {
  return userRole === userRoles.RECIPIENT && volunteer === false ? (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>Волонтер пока не откликнулся</h3>
      <p className={textStyle}>
        Вы не можете подтвердить выполнение заявки, пока у заявки нет волонтера.
      </p>
    </div>
  ) : (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>Благодарим за отзывчивость</h3>
      <p className={textStyle}>
        {`Мы ждем ответ ${
          userRole === userRoles.RECIPIENT ? 'от волонтера' : 'от реципиента'
        }`}
      </p>
    </div>
  );
};

export default ConfirmModalContent;
