import { ModalContentType, TaskButtonType } from 'shared/types/common.types';
import { Avatar } from 'shared/ui/avatar';
import { ButtonWithModal } from 'widgets/button-with-modal';
import styles from './styles.module.css';
import { ModalContent } from 'widgets/task-buttons-content';
import { RoundButton } from 'shared/ui/round-button';
import classNames from 'classnames';
// import { useMediaQuery } from 'shared/hooks';
import placeholder from '../../img/placeholder.svg';
import { DefaultAvatar } from '../../img/default-avatar';
import { UserProfile } from 'entities/user/types';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PopupChat } from '../../../../../chat/ui/chat';
import { infoAdmin } from '../../../../../chat/ui/chat/libs/utils';
import { TaskStatus } from '../../../../types';

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
  // const isMobile = useMediaQuery('(max-width:1150px)');
  const isPageCompleted = location.pathname === '/profile/completed';
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

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
            <ModalContent type={ModalContentType.phone} date={date} />
          }
        >
          <RoundButton
            buttonType={TaskButtonType.phone}
            disabled={isPageCompleted || !user}
          />
        </ButtonWithModal>
        <RoundButton
          buttonType="message"
          disabled={
            isPageCompleted ||
            !user ||
            !volunteer ||
            status === TaskStatus.COMPLETED
          }
          onClick={() => setIsOpenChat(!isOpenChat)}
        />
      </div>
      {isOpenChat && (
        <PopupChat
          isOpen={isOpenChat}
          onClick={() => setIsOpenChat(!isOpenChat)}
          messages={[]}
          chatmateInfo={infoAdmin}
          onAttachFileClick={() => {}}
        />
      )}
    </div>
  );
};
