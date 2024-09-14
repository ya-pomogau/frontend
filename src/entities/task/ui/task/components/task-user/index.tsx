import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { ButtonWithModal, ModalContent } from 'widgets';
import { RoundButton, Avatar } from 'shared/ui';
import { Routes } from 'shared/config';
import { useControlModal } from 'shared/hooks';
import { modalContentType, taskButtonType } from 'shared/types/common.types';
import { DefaultAvatar } from '../../img/default-avatar';
import { UserProfile } from 'entities/user/types';
import { PopupChat } from '../../../../../chat/ui/chat';
import { infoAdmin } from '../../../../../chat/ui/chat/libs/utils';
import { taskStatus, TaskStatus } from '../../../../types';
import { mockChatMessages } from '../../../../../chat/mock-messages';

import placeholder from '../../img/placeholder.svg';
import styles from './styles.module.css';

interface TaskUserProps {
  user: UserProfile | null;
  extClassName?: string;
  date: string | null;
  volunteer: UserProfile | null;
  status: TaskStatus | null;
}
export const TaskUser = ({
  user,
  extClassName,
  date,
  volunteer,
  status,
}: TaskUserProps) => {
  const location = useLocation();
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const isPageCompleted = location.pathname === Routes.PROFILE_COMPLETED;
  const isButtonDisabled =
    isPageCompleted || !user || !volunteer || status === taskStatus.COMPLETED;

  return (
    <div className={classNames(extClassName, styles.userInfo)}>
      {user !== null ? (
        <Avatar
          avatarName={user.name || 'Пользователь не назначен'}
          avatarLink={user.avatar ? user.avatar : placeholder}
          extClassName={styles.avatar}
        />
      ) : (
        <DefaultAvatar isTaskAvatar />
      )}
      <div className={styles.info}>
        <p className={styles.name}>{user ? user.name : ''}</p>
        <p className={styles.phone}>{user ? user.phone : ''}</p>
      </div>
      <div className={styles.buttons}>
        <ButtonWithModal
          closeButton
          modalContent={
            <ModalContent type={modalContentType.phone} date={date} />
          }
        >
          <RoundButton
            buttonType={taskButtonType.phone}
            disabled={isPageCompleted || !user}
          />
        </ButtonWithModal>
        <RoundButton
          buttonType="message"
          disabled={isButtonDisabled}
          onClick={handleOpen}
        />
      </div>
      <PopupChat
        isOpen={isOpen}
        onClick={handleClose}
        messages={mockChatMessages}
        chatmateInfo={infoAdmin}
        onAttachFileClick={() => {}}
      />
    </div>
  );
};
