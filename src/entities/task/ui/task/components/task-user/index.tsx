import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { RoundButton, Avatar, Typography } from 'shared/ui';
import { Routes } from 'shared/config';
import { useControlModal, useUser } from 'shared/hooks';
import { taskButtonType } from 'shared/types/common.types';
import { DefaultAvatar } from '../../img/default-avatar';
import { UserProfile } from 'entities/user/types';
import { PopupChat } from 'entities/chat/ui/chat';
import { taskStatus, TaskStatus } from 'entities/task/types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actions } from 'services/system-slice';
import { TaskChatInfo } from 'shared/types/chat.types';
import { wsMessageKind } from 'shared/types/websocket.types';

import placeholder from '../../img/placeholder.svg';
import styles from './styles.module.css';

interface TaskUserProps {
  user: UserProfile | null;
  extClassName?: string;
  date: string | null;
  volunteer: UserProfile | null;
  status: TaskStatus | null;
  taskId: string;
}
export const TaskUser = ({
  user,
  extClassName,
  volunteer,
  status,
  taskId,
}: TaskUserProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useUser();

  const currentRole = currentUser?.role.toLowerCase() as
    | 'volunteer'
    | 'recipient';

  const chatMeta = useAppSelector(
    actions.getChatMetaByTaskId(taskId)
  ) as TaskChatInfo;

  const currentChatmateInfo = chatMeta?.meta[currentRole]
    ? chatMeta?.meta[currentRole]
    : null;

  const { isOpen, handleOpen, handleClose } = useControlModal();
  const location = useLocation();
  const isPageCompleted = location.pathname === Routes.PROFILE_COMPLETED;
  const isButtonDisabled =
    isPageCompleted || !user || !volunteer || status === taskStatus.COMPLETED;

  const handleOpenChat = () => {
    handleOpen();
    dispatch({
      type: wsMessageKind.OPEN_CHAT_EVENT,
      payload: chatMeta.meta._id,
    });
  };

  const handleCloseChat = () => {
    handleClose();
    dispatch({
      type: wsMessageKind.CLOSE_CHAT_EVENT,
      payload: chatMeta.meta._id,
    });
  };

  const handleSendMessage = (message: string) => {
    dispatch({
      type: wsMessageKind.NEW_MESSAGE_COMMAND,
      payload: {
        body: message,
        author: currentUser,
        chatId: chatMeta.meta._id,
      },
    });
  };

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
        <Typography
          tag={'h4'}
          content={user ? user.name : ''}
          extraClass={styles.name}
        />
        <Typography
          color={'primary'}
          content={user ? user.phone : ''}
          extraClass={styles.phone}
        />
      </div>
      <div className={styles.buttons}>
        <a
          href={user ? `tel:${user.phone}` : `#`}
          style={{ borderRadius: '50%' }}
        >
          <RoundButton
            buttonType={taskButtonType.phone}
            disabled={!user || isPageCompleted}
          />
        </a>
        <RoundButton
          buttonType="message"
          disabled={isButtonDisabled}
          unreadMessages={chatMeta?.meta?.unreads}
          onClick={handleOpenChat}
        />
      </div>
      {isOpen && currentChatmateInfo && (
        <PopupChat
          isOpen={isOpen}
          messages={chatMeta?.chats || []}
          chatmateInfo={currentChatmateInfo}
          onClick={handleCloseChat}
          onMessageSend={handleSendMessage}
          onAttachFileClick={() => {}}
        />
      )}
    </div>
  );
};
