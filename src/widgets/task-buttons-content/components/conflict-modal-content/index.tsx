import classNames from 'classnames';

import { ModalContentProps } from 'widgets/task-buttons-content';
import { userRole as userRoles } from 'shared/types/common.types';
import { textStyle, titleStyle } from 'widgets/task-buttons-content/utils';
import { Button } from 'shared/ui';
import { useRejectTaskMutation } from 'services';
import { taskReport } from 'entities/task/types';
import { useControlModal } from 'shared/hooks';
import { PopupChat, infoAdmin } from 'entities';

import styles from './styles.module.css';

export const ConflictModalContent = ({
  active = true,
  conflict = true,
  taskId,
  userRole,
  volunteer,
  volunteerReport,
  recipientReport,
  setConflictModalVisible,
}: ModalContentProps) => {
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const [rejectTask] = useRejectTaskMutation();
  const handleRejectClick = () => {
    if (userRole && taskId) {
      rejectTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }

    setConflictModalVisible && setConflictModalVisible(false);
  };
  return userRole === userRoles.RECIPIENT && volunteer === false ? (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>Волонтер пока не откликнулся</h3>
      <p className={textStyle}>
        Вы не можете подтвердить не выполнение заявки, пока у заявки нет
        волонтера.
      </p>
    </div>
  ) : (
    <div className={styles.modalTooltip}>
      <h3 className={titleStyle}>
        {active
          ? 'Подтвердите, что заявка не выполнена'
          : conflict
          ? 'Не выполнена'
          : 'Выполнена'}
      </h3>
      {
        <>
          {active && (
            <div className={classNames(styles.modalContent, styles.flexRow)}>
              <Button
                buttonType="secondary"
                label="Отменить"
                onClick={() =>
                  setConflictModalVisible && setConflictModalVisible(false)
                }
              />
              <Button
                buttonType="primary"
                label="Подтвердить"
                onClick={handleRejectClick}
                disabled={
                  conflict ||
                  (userRole === userRoles.VOLUNTEER &&
                    volunteerReport === taskReport.REJECTED) ||
                  (userRole === userRoles.RECIPIENT &&
                    recipientReport === taskReport.REJECTED)
                }
              />
            </div>
          )}
          {(active || !conflict) && (
            <div className={styles.modalButtons}>
              <Button
                buttonType="secondary"
                label={
                  active ? 'Помощь администратора' : 'Написать администратору'
                }
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
          )}
        </>
      }
    </div>
  );
};

export default ConflictModalContent;
