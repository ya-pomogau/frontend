import {
  changeCheckbox,
  changeCurrentStep,
  openPopup,
  setAddress,
  setCategory,
  setDate,
  setDescriptionForTask,
  setTemporary,
  setTime,
} from 'features/create-request/model';
import { format, isAfter, parseISO } from 'date-fns';
import {
  modalContentType,
  taskButtonType,
  userRole as userRoles,
} from 'shared/types/common.types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import { SquareButton } from 'shared/ui/square-buttons';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import classNames from 'classnames';
import styles from '../../styles.module.css';
import { useFulfillTaskMutation } from 'services/user-task-api';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { TaskButtonsProps } from '../../types';
export const TaskButtonsRecipient = ({
  taskId,
  address,
  description,
  category,
  date,
  conflict,
  extClassName,
  volunteerReport,
  recipientReport,
  volunteer,
  location,
}: TaskButtonsProps) => {
  const locationPath = useLocation();
  const dispatch = useAppDispatch();
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
  const initialData = {
    taskId,
    address,
    category,
    description,
    date,
    location: location.coordinates,
    time: date === null ? '' : format(new Date(date!), 'HH:mm'),
  };
  const [fulfillTask] = useFulfillTaskMutation();
  const handleFulfillClick = () => {
    const shouldFulfillTask =
      (userRole === userRoles.VOLUNTEER && !volunteerReport) ||
      (userRole === userRoles.RECIPIENT && !recipientReport && volunteer);
    if (shouldFulfillTask) {
      fulfillTask({ role: userRole.toLocaleLowerCase(), id: taskId });
    }
  };
  const handleEditButton = () => {
    if (date === null) {
      dispatch(changeCheckbox());
    } else {
      dispatch(setDate(format(new Date(date!), 'dd.MM.yyyy')));
      dispatch(setTime(format(new Date(date!), 'HH:mm')));
    }
    dispatch(setTemporary({ initialData }));
    dispatch(
      setAddress({ additinalAddress: address, coords: location.coordinates })
    );
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory(category));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
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
      {userRole === userRoles.RECIPIENT && isPageActive && (
        <ButtonWithModal
          closeButton
          extClassName={styles.close}
          modalContent={
            <ModalContent
              userRole={userRole}
              taskId={taskId}
              type={
                isTaskExpired || volunteer
                  ? modalContentType.responded
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
      {userRole === userRoles.RECIPIENT && !volunteer && isPageActive && (
        <SquareButton
          onClick={handleEditButton}
          buttonType="edit"
          extClassName={styles.edit}
        />
      )}
    </div>
  );
};

export default TaskButtonsRecipient;
