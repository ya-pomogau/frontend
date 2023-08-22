import classNames from 'classnames';
import styles from './styles.module.css';
import { getChatList } from '../../libs/utils';
import { useEffect, useState } from 'react';
import { IChatList } from '../../libs/types';
import { Loader } from '../../../../shared/ui/loader';

interface IChatListProps {
  isNotificationImportant?: boolean;
  selectedChatId: string | undefined;
  onSelectChat: (id: string) => void;
  isMobile: boolean;
}

export const ChatsList = ({
  isNotificationImportant,
  selectedChatId,
  onSelectChat,
  isMobile,
}: IChatListProps) => {
  const [chatList, setChatList] = useState<Array<IChatList>>();
  const [isChatListLoading, setChatListLoading] = useState(false);
  const [chatListLoadError, setChatListLoadError] = useState<Error>();
  useEffect(() => {
    async function fetchData() {
      setChatListLoading(true);
      setChatListLoadError(undefined);
      try {
        setChatList(await getChatList());
      } catch (err: any) {
        setChatList(undefined);
        setChatListLoadError(err);
      }
      setChatListLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {chatListLoadError &&
        'Произошла ошибка - попробуйте перезагрузить страницу'}
      {isChatListLoading && <Loader />}
      {chatList && (
        <ul className={classNames(styles.chats)}>
          {chatList.map((chat) => (
            <li
              className={classNames(
                styles.chat,
                selectedChatId === chat.chatId ? styles.selectedChat : undefined
              )}
              key={chat.chatId}
              onClick={() => onSelectChat(chat.chatId)}
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
