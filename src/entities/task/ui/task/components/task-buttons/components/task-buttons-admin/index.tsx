import { isAfter, parseISO } from 'date-fns';
import {
  modalContentType,
  taskButtonType,
  userRole as userRoles,
} from 'shared/types/common.types';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ConflictRootAdminButton } from 'shared/ui/conflict-button';
import { ModalContent } from 'widgets/task-buttons-content';
import { SquareButton } from 'shared/ui/square-buttons';
import classNames from 'classnames';
import styles from '../../styles.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AdminSelectModal } from 'widgets';
import { useControlModal } from 'shared/hooks';
import { useGetAllAdminsQuery } from 'services/admin-api';
import { TaskButtonsProps } from '../../types';
import { useAppSelector } from 'app/hooks';

export const TaskButtonsAdmin = ({
  taskId,
  date,
  conflict,
  extClassName,
  volunteerReport,
  recipientReport,
  volunteer,
}: TaskButtonsProps) => {
  const locationPath = useLocation();
  const userRole = userRoles.ADMIN;
  const rootAdminRole = useAppSelector((state) => state.user.data?.isRoot);
  const parsedDate = parseISO(date!);
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isPageActive = locationPath.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const { data: admins } = useGetAllAdminsQuery('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [conflictModalIsVisible, setConflictModalIsVisible] =
    useState<boolean>(true);
  const handleConflictRootAdminButton = () => {
    handleOpen();
  };
  return (
    <div className={classNames(extClassName, styles.buttons)}>
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
                isPageActive
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
            disabledColor={!!volunteerReport || !!recipientReport || clicked}
          />
        </ButtonWithModal>
      )}
      {rootAdminRole && (
        <ConflictRootAdminButton
          extClassName={styles.rootConflict}
          onClick={handleConflictRootAdminButton}
        />
      )}
      <AdminSelectModal
        isOpen={isOpen}
        onClose={handleClose}
        admins={admins}
      ></AdminSelectModal>
    </div>
  );
};

export default TaskButtonsAdmin;
