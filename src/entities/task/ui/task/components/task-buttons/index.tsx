import {
  ModalContentType,
  TaskButtonType,
  UserRole,
} from 'shared/types/common.types';
import { SquareButton } from 'shared/ui/square-buttons';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import styles from './styles.module.css';
import { isAfter, parseISO } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  changeCurrentStep,
  openPopup,
  setAddress,
  setCategory,
  setDate,
  setDescriptionForTask,
} from 'features/create-request/model';
import { Category, ResolveStatus, TaskReport } from 'entities/task/types';
import { useLocation } from 'react-router-dom';
import { UserProfile } from 'entities/user/types';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import { useState } from 'react';

interface TaskButtonsProps {
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
}

export const TaskButtons = ({
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
}: TaskButtonsProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const parsedDate = parseISO(date!);
  const additinalAddress = address;
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isTaskUrgent = checkTaskUrgency(date!);
  const isPageActive = location.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;

  //можно убрать этот useState после подключения бэка, т.к. кнопки будут закрашены в зависимости от репортов
  const [clicked, setClicked] = useState<boolean>(false);

  const handleEditButton = () => {
    dispatch(setDate(date));
    dispatch(setAddress({ additinalAddress }));
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory({ value: category._id, label: category.title }));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
  };
  return (
    <div className={classNames(extClassName, styles.buttons)}>
      {(isTaskExpired || !date) && isPageActive && (
        <ButtonWithModal
          setClicked={setClicked}
          modalContent={
            <ModalContent
              type={clicked ? ModalContentType.admin : ModalContentType.confirm}
              role={userRole}
            />
          }
          extClassName={styles.confirm}
        >
          <SquareButton
            buttonType={TaskButtonType.confirm}
            disabledColor={
              (userRole === UserRole.VOLUNTEER && !!volunteerReport) ||
              (userRole === UserRole.RECIPIENT && !!recipientReport) ||
              clicked
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.VOLUNTEER && isPageActive && (
        <ButtonWithModal
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
          setClicked={isPageActive ? setClicked : undefined}
          extClassName={styles.conflict}
          modalContent={
            <ModalContent
              type={
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
            />
          }
        >
          <SquareButton
            buttonType={TaskButtonType.conflict}
            disabledColor={
              (userRole === UserRole.VOLUNTEER &&
                !!volunteerReport &&
                isPageActive) ||
              (userRole === UserRole.RECIPIENT &&
                !!recipientReport &&
                isPageActive) ||
              conflict ||
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
