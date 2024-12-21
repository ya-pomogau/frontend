import { isAfter, parseISO } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import {
  modalContentType,
  taskButtonType,
  userRole as userRoles,
} from 'shared/types/common.types';
import { ButtonWithModal, ModalContent } from 'widgets';
import { SquareButton } from 'shared/ui/square-buttons';
import { isTaskUrgent as checkTaskUrgency } from 'shared/libs/utils';
import { useFulfillTaskMutation } from 'services/user-task-api';
import { TaskButtonsProps } from '../../types';

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
  const userRole = userRoles.VOLUNTEER;
  const parsedDate = parseISO(date!);
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isTaskUrgent = checkTaskUrgency(date!);
  const isPageActive = locationPath.pathname === '/profile/active';
  const [conflictModalIsVisible, setConflictModalIsVisible] =
    useState<boolean>(true);
  const [fulfillTask] = useFulfillTaskMutation();
  const handleFulfillClick = () => {
    const shouldFulfillTask = !volunteerReport;
    if (shouldFulfillTask) {
      fulfillTask({ role: userRole.toLowerCase(), id: taskId });
    }
  };
  return (
    <div className={classNames(extClassName, styles.buttons)}>
      {(isTaskExpired || !date) && isPageActive && (
        <ButtonWithModal
          closeButton
          modalContent={
            <ModalContent
              volunteer={!!volunteer}
              type={
                !volunteerReport
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
              !volunteer ? true : !!volunteerReport || !!recipientReport
            }
          />
        </ButtonWithModal>
      )}
      {isPageActive && (
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
          conflictModalVisible={conflictModalIsVisible}
          setConflictModalVisible={setConflictModalIsVisible}
          extClassName={styles.conflict}
          modalContent={
            <ModalContent
              type={
                isPageActive && !volunteerReport
                  ? modalContentType.conflict
                  : isPageActive
                  ? modalContentType.admin
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
              !volunteer ||
              (!!volunteerReport && isPageActive) ||
              (!!recipientReport && isPageActive)
            }
          />
        </ButtonWithModal>
      )}
    </div>
  );
};
