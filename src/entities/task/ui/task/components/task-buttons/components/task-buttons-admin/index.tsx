import { isAfter, parseISO } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import {
  modalContentType,
  taskButtonType,
  userRole as userRoles,
  adminPermission,
} from 'shared/types/common.types';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ConflictRootAdminButton } from 'shared/ui/conflict-button';
import { ModalContent, AdminSelectModal } from 'widgets';
import { SquareButton } from 'shared/ui/square-buttons';
import { useControlModal, usePermission } from 'shared/hooks';
import { useGetAllAdminsQuery } from 'services/admin-api';
import { TaskButtonsProps } from '../../types';

import styles from '../../styles.module.css';

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
  const isRootAdmin = usePermission(
    [adminPermission.CONFLICTS],
    userRoles.ADMIN
  );
  const parsedDate = parseISO(date!);
  const isTaskExpired = isAfter(new Date(), parsedDate);
  const isPageActive = locationPath.pathname === '/profile/active';
  const unfulfilledTask = volunteer === null && isTaskExpired && !conflict;
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const { data: admins } = useGetAllAdminsQuery('', { skip: !isRootAdmin });
  const [conflictModalIsVisible, setConflictModalIsVisible] =
    useState<boolean>(true);
  return (
    <div className={classNames(extClassName, styles.buttons)}>
      {(isTaskExpired || !date) && (
        <ButtonWithModal
          closeButton
          conflictModalVisible={conflictModalIsVisible}
          setConflictModalVisible={setConflictModalIsVisible}
          extClassName={styles.conflict}
          modalContent={
            <ModalContent
              type={
                isPageActive
                  ? modalContentType.admin
                  : unfulfilledTask
                  ? modalContentType.unfulfilled
                  : modalContentType.conflict
              }
              active={isPageActive}
              conflict={conflict}
              date={date}
              taskId={taskId}
              volunteer={!!volunteer}
              volunteerReport={volunteerReport}
              recipientReport={recipientReport}
              setConflictModalVisible={setConflictModalIsVisible}
            />
          }
        >
          <SquareButton
            buttonType={taskButtonType.conflict}
            disabledColor={!!volunteerReport || !!recipientReport}
          />
        </ButtonWithModal>
      )}
      {isRootAdmin && (
        <ConflictRootAdminButton
          extClassName={styles.rootConflict}
          onClick={handleOpen}
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
