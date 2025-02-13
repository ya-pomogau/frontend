import { useRef } from 'react';

import { Message } from 'shared/ui';

import styles from '../styles.module.css';
import { MessageInterface } from 'shared/types/chat.types';
import { AnyUserInterface } from 'shared/types/user.type';
import { sortMessages } from '../libs/utils';

interface MessagesListProps {
  messages: MessageInterface[];
  chatmateInfo: AnyUserInterface;
}

export const MessagesList = ({ messages, chatmateInfo }: MessagesListProps) => {
  const openedChatPopupRef = useRef<HTMLDivElement>(null);

  const currentMessages = sortMessages(messages);

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
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};
