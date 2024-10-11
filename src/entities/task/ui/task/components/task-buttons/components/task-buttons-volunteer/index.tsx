import { isAfter, parseISO } from 'date-fns';
import {
  modalContentType,
  taskButtonType,
  userRole as userRoles,
} from 'shared/types/common.types';
import { useAppSelector } from 'app/hooks';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import { SquareButton } from 'shared/ui/square-buttons';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import { useFulfillTaskMutation } from 'services/user-task-api';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { TaskButtonsProps } from '../../types';
import classNames from 'classnames';
import styles from '../../styles.module.css';

export const TaskButtonsVolunteer = ({
  taskId,
  date,
  conflict,
  extClassName,
  volunteerReport,
  recipientReport,
  volunteer,
}: TaskButtonsProps) => {
  const locationPath = useLocation();
  const userRole = useAppSelector((state) => state.user.role);
  const parsedDate = parseISO(date!);
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isTaskUrgent = checkTaskUrgency(date!);
  const isPageActive = locationPath.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;
  //можно убрать этот useState после подключения бэка, т.к. кнопки будут закрашены в зависимости от репортов
  const [clicked, setClicked] = useState<boolean>(false);
  const [conflictModalIsVisible, setConflictModalIsVisible] =
    useState<boolean>(true);
  const [fulfillTask] = useFulfillTaskMutation();
  const handleFulfillClick = () => {
    const shouldFulfillTask =
      (userRole === userRoles.VOLUNTEER && !volunteerReport) ||
      (userRole === userRoles.RECIPIENT && !recipientReport && volunteer);
    if (shouldFulfillTask) {
      fulfillTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };
  return (
    <div className={classNames(extClassName, styles.buttons)}>
      {(isTaskExpired || !date) && isPageActive && (
        <ButtonWithModal
          setClicked={setClicked}
          closeButton
          modalContent={
            <ModalContent
              volunteer={!!volunteer}
              type={
                !volunteer && userRole === userRoles.RECIPIENT
                  ? modalContentType.confirm
                  : clicked
                  ? modalContentType.admin
                  : modalContentType.confirm
              }
              userRole={userRole}
              taskId={taskId}
            />
          }
          extClassName={styles.confirm}
        >
          <SquareButton
            onClick={handleFulfillClick}
            buttonType={taskButtonType.confirm}
            disabledColor={
              !volunteer && userRole === userRoles.RECIPIENT
                ? true
                : (userRole === userRoles.VOLUNTEER && !!volunteerReport) ||
                  (userRole === userRoles.RECIPIENT && !!recipientReport) ||
                  clicked
            }
          />
        </ButtonWithModal>
      )}

      {userRole === userRoles.VOLUNTEER && isPageActive && (
        <ButtonWithModal
          closeButton
          extClassName={styles.close}
          modalContent={
            <ModalContent
              type={
                isTaskExpired || !date
                  ? modalContentType.responded
                  : isTaskUrgent
                  ? modalContentType.cancel
                  : modalContentType.close
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={taskButtonType.close}
            disabledColor={isTaskUrgent}
          />
        </ButtonWithModal>
      )}
      {(isTaskExpired || !date) && (
        <ButtonWithModal
          closeButton
          setClicked={isPageActive ? setClicked : undefined}
          conflictModalVisible={conflictModalIsVisible}
          setConflictModalVisible={setConflictModalIsVisible}
          extClassName={styles.conflict}
          modalContent={
            <ModalContent
              type={
                isPageActive && !volunteer && userRole === userRoles.RECIPIENT
                  ? modalContentType.conflict
                  : isPageActive
                  ? clicked
                    ? modalContentType.admin
                    : modalContentType.conflict
                  : unfulfilledTask
                  ? modalContentType.unfulfilled
                  : modalContentType.conflict
              }
              active={isPageActive}
              conflict={conflict}
              date={date}
              taskId={taskId}
              userRole={userRole}
              volunteer={!!volunteer}
              volunteerReport={volunteerReport}
              recipientReport={recipientReport}
              setConflictModalVisible={setConflictModalIsVisible}
            />
          }
        >
          <SquareButton
            buttonType={taskButtonType.conflict}
            disabledColor={
              !volunteer && userRole === userRoles.RECIPIENT
                ? true
                : (userRole === userRoles.VOLUNTEER &&
                    !!volunteerReport &&
                    isPageActive) ||
                  (userRole === userRoles.RECIPIENT &&
                    !!recipientReport &&
                    isPageActive) ||
                  (clicked && isPageActive)
            }
          />
        </ButtonWithModal>
      )}
    </div>
  );
};

export default TaskButtonsVolunteer;
