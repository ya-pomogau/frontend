import { ModalContentProps } from 'widgets/task-buttons-content';
import { userRole as userRoles } from 'shared/types/common.types';
import { Typography } from 'shared/ui';

import styles from './styles.module.css';

export const ConfirmModalContent = ({
  userRole,
  volunteer,
}: ModalContentProps) => {
  return userRole === userRoles.RECIPIENT && volunteer === false ? (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'Волонтер пока не откликнулся'}
        extraClass={styles.modalTitle}
      />
      <Typography
        fontFamily={'secondaryFont'}
        content={
          'Вы не можете подтвердить выполнение заявки, пока у заявки нет волонтера.'
        }
        extraClass={styles.modalContent}
      />
    </div>
  ) : (
    <div className={styles.modalTooltip}>
      <Typography
        tag={'h3'}
        variant={'paragraph-bold'}
        content={'Благодарим за отзывчивость'}
        extraClass={styles.modalTitle}
      />
      <Typography
        fontFamily={'secondaryFont'}
        content={`Мы ждем ответ ${
          userRole === userRoles.RECIPIENT ? 'от волонтера' : 'от реципиента'
        }`}
        extraClass={styles.modalContent}
      />
    </div>
  );
};

export default ConfirmModalContent;
