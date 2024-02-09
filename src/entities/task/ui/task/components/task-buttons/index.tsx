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
import {
  checkTimeDifference,
  variantBtn,
  variantBtnRec,
} from 'shared/libs/utils';

interface TaskButtonsProps {
  recipientName?: string;
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
  recipientName,
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
  const parsedDate = parseISO(date!);
  const comparedDateResult = isAfter(new Date(), parsedDate);
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const additinalAddress = address;
  const overdueTask = () => new Date() > parsedDate;
  const visibilityBtn = location.pathname === '/profile/completed';

  const handleEditButton = () => {
    dispatch(setDate(date));
    dispatch(setAddress({ additinalAddress }));
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory({ value: category._id, label: category.title }));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
  };
  return (
    <div
      className={classNames(extClassName, styles.buttons_action, {
        [styles.item_hidden]: !recipientName,
      })}
    >
      {(comparedDateResult || !date) && !visibilityBtn && (
        <ButtonWithModal
          modalContent={
            <ModalContent
              type={TaskButtonType.confirm}
              active={true}
              date={date}
              role={userRole}
            />
          }
        >
          <SquareButton
            buttonType={TaskButtonType.confirm}
            extClassName={
              recipientName && !date
                ? ''
                : recipientName
                ? ''
                : styles.item_hidden
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.VOLUNTEER && !visibilityBtn && date && (
        <ButtonWithModal
          modalContent={
            <ModalContent
              type={
                !overdueTask()
                  ? variantBtn(parsedDate)
                  : TaskButtonType.responded
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={
              checkTimeDifference(parsedDate)
                ? TaskButtonType.responded
                : TaskButtonType.close
            }
          />
        </ButtonWithModal>
      )}
      {userRole === UserRole.VOLUNTEER && !date && (
        <ButtonWithModal
          modalContent={
            <ModalContent type={TaskButtonType.responded} date={date} />
          }
        >
          <SquareButton buttonType={TaskButtonType.responded} />
        </ButtonWithModal>
      )}
      {userRole === UserRole.RECIPIENT && !visibilityBtn && (
        <ButtonWithModal
          modalContent={
            <ModalContent
              type={
                !overdueTask()
                  ? variantBtnRec(volunteer)
                  : TaskButtonType.responded
              }
              date={date}
            />
          }
        >
          <SquareButton
            buttonType={
              checkTimeDifference(parsedDate)
                ? TaskButtonType.responded
                : TaskButtonType.close
            }
          />
        </ButtonWithModal>
      )}
      {(comparedDateResult || !date) &&
        (!visibilityBtn ? (
          <ButtonWithModal
            modalContent={
              <ModalContent
                type={TaskButtonType.conflict}
                active={true}
                conflict={conflict}
                date={date}
              />
            }
          >
            <SquareButton
              buttonType={TaskButtonType.conflict}
              disabled={
                volunteerReport === TaskReport.REJECTED &&
                recipientReport === TaskReport.REJECTED &&
                adminResolve === ResolveStatus.REJECTED
              }
            />
          </ButtonWithModal>
        ) : (
          <SquareButton
            buttonType={TaskButtonType.conflict}
            extClassName={
              recipientName && !date && !conflict
                ? ''
                : recipientName
                ? ''
                : !comparedDateResult
                ? ''
                : styles.item_hidden
            }
            disabled={
              volunteerReport === TaskReport.REJECTED &&
              recipientReport === TaskReport.REJECTED &&
              adminResolve === ResolveStatus.REJECTED
            }
          />
        ))}
      {userRole === UserRole.RECIPIENT && !volunteer && !visibilityBtn && (
        <SquareButton onClick={handleEditButton} buttonType="edit" />
      )}
    </div>
  );
};
