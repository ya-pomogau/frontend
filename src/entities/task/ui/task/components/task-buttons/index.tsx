import { TaskButtonType, UserRole } from 'shared/types/common.types';
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

  const [clickedConflict, setClickedConflict] = useState<boolean>(false);
  const [clickedConfirm, setClickedConfirm] = useState<boolean>(false);
  // TODO: при нажатии галочки:
  // -- отправка на сервер volunteerReport | recipientReport со значением TaskReport.FULFILLED
  // -- кнопка становится серой
  // -- при клике на кнопку открывается попап связи с адмиином
  // -- при этом кнопка воскл. знак становится серой (при нажатии появляется попап связи с админом)
  // TODO: при нажатии воскл.знак:
  // -- отправка на сервер volunteerReport | recipientReport со значением TaskReport.REJECTED
  // -- кнопка становится серой
  // -- при клике на кнопку открывается попап связи с адмиином
  // -- при этом кнопка галочка становится серой (при нажатии появляется попап связи с админом)
  //TODO: при статусе Taskstatus === complited при нажатии на воскл попап "Выполнена"
  // --- при статусе Taskstatus === conflicted при нажатии на воскл попап "Не Выполнена"
  // --- при условии что у таски date: больше текущего времени и volunteer: null && Taskstatus === complited  при нажатии на воскл попап "Никто не отозвался"
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
          setClicked={setClickedConfirm}
          modalContent={
            <ModalContent
              type={TaskButtonType.confirm}
              date={date}
              role={userRole}
            />
          }
          extClassName={styles.confirm}
        >
          <SquareButton
            buttonType={TaskButtonType.confirm}
            disabledColor={clickedConfirm}
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
                  ? TaskButtonType.responded
                  : isTaskUrgent
                  ? TaskButtonType.cancel
                  : TaskButtonType.close
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={
              isTaskUrgent ? TaskButtonType.responded : TaskButtonType.close
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.RECIPIENT && isPageActive && (
        <ButtonWithModal
          extClassName={styles.close}
          modalContent={
            <ModalContent
              type={
                isTaskExpired
                  ? TaskButtonType.responded
                  : volunteer
                  ? TaskButtonType.responded
                  : TaskButtonType.close
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={
              isTaskUrgent ? TaskButtonType.responded : TaskButtonType.close
            }
          />
        </ButtonWithModal>
      )}
      {(isTaskExpired || !date) && (
        <ButtonWithModal
          setClicked={setClickedConflict}
          extClassName={styles.conflict}
          modalContent={
            <ModalContent
              type={TaskButtonType.conflict}
              active={isPageActive}
              conflict={conflict}
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={TaskButtonType.conflict}
            disabledColor={conflict || clickedConflict}
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
