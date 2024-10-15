import { useRef } from 'react';

import { Message } from 'shared/ui';
import { useLazyScroll } from '../hooks/useLazyScroll';

import styles from '../styles.module.css';
import { MessageInterface } from 'shared/types/chat.types';
import { AnyUserInterface } from 'shared/types/user.type';

interface MessagesListProps {
  messages: MessageInterface[];
  chatmateInfo: AnyUserInterface;
}

export const MessagesList = ({ messages, chatmateInfo }: MessagesListProps) => {
  const openedChatPopupRef = useRef<HTMLDivElement>(null);

  const currentMessages = useLazyScroll({ messages, openedChatPopupRef });

  return (
    <div ref={openedChatPopupRef} className={styles.messagesBlock}>
      {currentMessages?.map((message) => (
        <Message
          type={
            message.author._id === chatmateInfo._id ? 'incoming' : 'outgoing'
          }
          messageText={message.body}
          avatarLink={message.author.avatar}
          key={message._id}
          createdAt={message.createdAt}
        />
      ))}
    </div>
  );
};
