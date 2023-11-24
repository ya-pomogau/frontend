import classNames from 'classnames';
import styles from './styles.module.css';

import { Loader } from '../../../../shared/ui/loader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useEffect } from 'react';
import { fetchChatList } from '../../model/chat';

interface IChatListProps {
  isNotificationImportant?: boolean;
  selectedChatId: string | undefined;
  onSelectChat: (id: string) => void;
  handleNavigate: (id: string) => void;
}

export const ChatsList = ({
  isNotificationImportant,
  selectedChatId,
  onSelectChat,
  handleNavigate,
}: IChatListProps) => {
  const dispatch = useAppDispatch();
  const { chatList, chatListLoading, chatListLoadError } = useAppSelector(
    (state) => state.chats
  );
  const handleSelectChat = (id: string) => {
    handleNavigate(id);
    onSelectChat(id);
  };

  useEffect(() => {
    dispatch(fetchChatList());
  }, []);

  return (
    <>
      {chatListLoadError &&
        'Произошла ошибка - попробуйте перезагрузить страницу'}
      {chatListLoading && <Loader />}
      {chatList && (
        <ul className={classNames(styles.chats)}>
          {chatList.map((chat) => (
            <li
              className={classNames(
                styles.chat,
                selectedChatId === chat.chatId ? styles.selectedChat : undefined
              )}
              key={chat.chatId}
              onClick={() => handleSelectChat(chat.chatId)}
            >
              <div className={classNames(styles.avatar)}></div>
              <div className={classNames(styles.text)}>
                <p
                  className={classNames(
                    'text',
                    'text_size_medium',
                    styles.name
                  )}
                >
                  {chat.name}
                </p>
                <p className={classNames('text', 'text_size_micro', styles.id)}>
                  {`ID ${chat.userId}`}
                </p>
                <p
                  className={classNames(
                    'text',
                    'text_size_small',
                    styles.message
                  )}
                >
                  {chat.incomingMessage}
                </p>
              </div>
              {chat.notifications > 0 && (
                <div
                  className={classNames(
                    'text',
                    'text_size_small',
                    styles.notifications,
                    isNotificationImportant ? styles.important : undefined
                  )}
                >
                  {chat.notifications}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
