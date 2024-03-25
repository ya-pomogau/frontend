import {
  ModalContentType,
  TaskButtonType,
  UserRole,
} from 'shared/types/common.types';
import { SquareButton } from 'shared/ui/square-buttons';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import styles from './styles.module.css';
import { format, isAfter, parseISO } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
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
import { Category, ResolveStatus, TaskReport } from 'entities/task/types';
import { useLocation } from 'react-router-dom';
import { UserProfile } from 'entities/user/types';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import { useState } from 'react';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import {
  useFulfillTaskMutation,
  useRejectTaskMutation,
} from 'services/user-task-api';

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
  location: GeoCoordinates;
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
  adminResolve,
  volunteer,
  location,
}: TaskButtonsProps) => {
  const locationPath = useLocation();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const parsedDate = parseISO(date!);
  // const additinalAddress = address;
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isTaskUrgent = checkTaskUrgency(date!);
  const isPageActive = locationPath.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;

  //можно убрать этот useState после подключения бэка, т.к. кнопки будут закрашены в зависимости от репортов
  const [clicked, setClicked] = useState<boolean>(false);

  const initialData = {
    taskId,
    address,
    category,
    description,
    date,
    location,
    time: date === null ? '' : format(new Date(date!), 'HH:mm'),
  };
  const [fulfillTask] = useFulfillTaskMutation();

  const handleFulfillClick = () => {
    const shouldFulfillTask =
      (userRole === UserRole.VOLUNTEER && !volunteerReport) ||
      (userRole === UserRole.RECIPIENT && !recipientReport && volunteer);

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
    dispatch(setAddress({ additinalAddress: address, coords: location }));
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
                !volunteer && userRole === UserRole.RECIPIENT
                  ? ModalContentType.confirm
                  : clicked
                  ? ModalContentType.admin
                  : ModalContentType.confirm
              }
              userRole={userRole}
            />
          }
          extClassName={styles.confirm}
        >
          <SquareButton
            onClick={handleFulfillClick}
            buttonType={TaskButtonType.confirm}
            disabledColor={
              !volunteer && userRole === UserRole.RECIPIENT
                ? true
                : (userRole === UserRole.VOLUNTEER && !!volunteerReport) ||
                  (userRole === UserRole.RECIPIENT && !!recipientReport) ||
                  clicked
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.VOLUNTEER && isPageActive && (
        <ButtonWithModal
          closeButton
          extClassName={styles.close}
          modalContent={
            <ModalContent
              type={
                isTaskExpired || !date
                  ? ModalContentType.responded
                  : isTaskUrgent
                  ? ModalContentType.cancel
                  : ModalContentType.close
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={TaskButtonType.close}
            disabledColor={isTaskUrgent}
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.RECIPIENT && isPageActive && (
        <ButtonWithModal
          closeButton
          extClassName={styles.close}
          modalContent={
            <ModalContent
              type={
                isTaskExpired || volunteer
                  ? ModalContentType.responded
                  : ModalContentType.close
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={TaskButtonType.close}
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
                // isPageActive && !volunteer && userRole === UserRole.RECIPIENT
                //   ? ModalContentType.conflict
                //   : isPageActive
                //   ? clicked
                //     ? ModalContentType.admin
                //     : ModalContentType.conflict
                //   : unfulfilledTask
                //   ? ModalContentType.unfulfilled
                //   : ModalContentType.conflict

                isPageActive
                  ? clicked
                    ? ModalContentType.admin
                    : ModalContentType.conflict
                  : unfulfilledTask
                  ? ModalContentType.unfulfilled
                  : ModalContentType.conflict
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
            buttonType={TaskButtonType.conflict}
            disabledColor={
              // (userRole === UserRole.VOLUNTEER &&
              //   !!volunteerReport &&
              //   isPageActive) ||
              // (userRole === UserRole.RECIPIENT &&
              //   !!recipientReport &&
              //   isPageActive) ||
              // conflict ||
              // (clicked && isPageActive)
              !volunteer && userRole === UserRole.RECIPIENT
                ? true
                : (userRole === UserRole.VOLUNTEER &&
                    !!volunteerReport &&
                    isPageActive) ||
                  (userRole === UserRole.RECIPIENT &&
                    !!recipientReport &&
                    isPageActive) ||
                  (clicked && isPageActive)
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.RECIPIENT && !volunteer && isPageActive && (
        <SquareButton
          onClick={handleEditButton}
          buttonType="edit"
          extClassName={styles.edit}
        />
      )}
    </div>
  );
};
