import { Category, ResolveStatus, TaskReport } from 'entities/task/types';
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
import { ConflictRootAdminButton } from 'shared/ui/conflict-button';
import { ModalContent } from 'widgets/task-buttons-content';
import { PointGeoJSONInterface } from 'shared/types/point-geojson.types';
import { SquareButton } from 'shared/ui/square-buttons';
import { UserProfile } from 'entities/user/types';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import classNames from 'classnames';
import styles from './styles.module.css';
import { useFulfillTaskMutation } from 'services/user-task-api';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AdminSelectModal } from 'widgets';
import { useControlModal } from 'shared/hooks';

interface TaskButtonsProps {
  taskId: string;
  address: string;
  description: string;
  category: Category;
  date: string | null;
  conflict: boolean;
  extClassName?: string;
  volunteerReport: TaskReport | null;
  recipientReport: TaskReport | null;
  adminResolve: ResolveStatus | null;
  volunteer: UserProfile | null;
  location: PointGeoJSONInterface;
}

export const TaskButtons = ({
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
  const rootAdminRole = useAppSelector((state) => state.user.data?.isRoot);
  const parsedDate = parseISO(date!);
  // const additinalAddress = address;
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isTaskUrgent = checkTaskUrgency(date!);
  const isPageActive = locationPath.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;
  const { isOpen, handleOpen, handleClose } = useControlModal();

  //можно убрать этот useState после подключения бэка, т.к. кнопки будут закрашены в зависимости от репортов
  const [clicked, setClicked] = useState<boolean>(false);


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

  const handleConflictRootAdminButton = () => {
    console.log('Нажата кнопка инициации конфликта');
    handleOpen()
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
      {userRole === userRoles.ADMIN && rootAdminRole && (
        <ConflictRootAdminButton
          extClassName={styles.rootConflict}
          onClick={handleConflictRootAdminButton}
        />
      )}
      <AdminSelectModal isOpen={isOpen} onClose={handleClose}></AdminSelectModal>
    </div>
  );
};
