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
  phoneNumber?: string;
  openChat?: () => void;
}

export const ModalContent = ({
  type,
  date,
  userRole,
  taskId,
  volunteer,
  openChat,
}: ModalContentProps) => {
  switch (type) {
    case modalContentType.close:
      return (
        <CloseModalContent
          openChat={openChat}
          date={date}
          userRole={userRole}
          taskId={taskId}
        />
      );
    case modalContentType.conflict:
      return <ConflictModalContent userRole={userRole} volunteer={volunteer} />;
    case modalContentType.confirm:
      return <ConfirmModalContent userRole={userRole} volunteer={volunteer} />;
    case modalContentType.admin:
      return <AdminModalContent openChat={openChat} />;
    case modalContentType.phone:
      return <PhoneModalContent />;
    case modalContentType.cancel:
      return <CancelModalContent openChat={openChat} />;
    case modalContentType.responded:
      return <RespondedModalContent openChat={openChat} />;
    case modalContentType.unfulfilled:
      return <UnfulfilledModalContent />;
    default:
      return null;
  }
};
