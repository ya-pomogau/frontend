import classNames from 'classnames';
import styles from './styles.module.css';
import { mockChatsList } from '../Chat/libs/utils';

interface IChatListProps {
  isNotificationImportant?: boolean;
  selectedChatId: number | undefined;
  onSelectChat: (id: number) => void;
}

export const ChatsList = ({
  isNotificationImportant,
  selectedChatId,
  onSelectChat,
}: IChatListProps) => {
  return (
    <>
      <ul className={classNames(styles.chats)}>
        {mockChatsList.map((chat) => (
          <li
            className={classNames(
              styles.chat,
              selectedChatId === chat.id ? styles.selectedChat : undefined
            )}
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className={classNames(styles.avatar)}></div>
            <div className={classNames(styles.text)}>
              <p
                className={classNames('text', 'text_size_medium', styles.name)}
              >
                {chat.name}
              </p>
              <p className={classNames('text', 'text_size_micro', styles.id)}>
                {`ID ${chat.id}`}
              </p>
              <p
                className={classNames(
                  'text',
                  'text_size_small',
                  styles.message
                )}
              >
                {chat.message}
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
    </>
  );
};
