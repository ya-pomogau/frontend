import { Dispatch, SetStateAction } from 'react';

import {
  CloseModalContent,
  ConflictModalContent,
  ConfirmModalContent,
  AdminModalContent,
  PhoneModalContent,
  CancelModalContent,
  RespondedModalContent,
  UnfulfilledModalContent,
} from './components';
import {
  UserRole,
  ModalContentType,
  modalContentType,
} from 'shared/types/common.types';
import { TaskReport } from 'entities/task/types';

export interface ModalContentProps {
  type?: ModalContentType;
  active?: boolean;
  conflict?: boolean;
  date?: string | null;
  userRole?: UserRole | null;
  taskId?: string;
  volunteer?: boolean;
  volunteerReport?: TaskReport | null;
  recipientReport?: TaskReport | null;
  setConflictModalVisible?: Dispatch<SetStateAction<boolean>>;
}

export const ModalContent = ({
  type,
  date,
  userRole,
  taskId,
  volunteer,
}: ModalContentProps) => {
  switch (type) {
    case modalContentType.close:
      return (
        <CloseModalContent date={date} userRole={userRole} taskId={taskId} />
      );
    case modalContentType.conflict:
      return <ConflictModalContent userRole={userRole} volunteer={volunteer} />;
    case modalContentType.confirm:
      return <ConfirmModalContent userRole={userRole} volunteer={volunteer} />;
    case modalContentType.admin:
      return <AdminModalContent />;
    case modalContentType.phone:
      return <PhoneModalContent />;
    case modalContentType.cancel:
      return (
        <CancelModalContent date={date} userRole={userRole} taskId={taskId} />
      );
    case modalContentType.responded:
      return <RespondedModalContent />;
    case modalContentType.unfulfilled:
      return <UnfulfilledModalContent />;
  }
};
