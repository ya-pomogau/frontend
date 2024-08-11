import { useRef } from 'react';

import { IMessage } from 'shared/types/message';
import { Message } from 'shared/ui/message';
import { IChatmateInfo } from 'shared/types/conflict';
import { useLazyScroll } from '../hooks/useLazyScroll';

import styles from '../styles.module.css';

interface MessagesListProps {
  messages: IMessage[];
  chatmateInfo: IChatmateInfo;
}

export const MessagesList = ({
  messages,
  chatmateInfo,
}: MessagesListProps) => {

  const openedChatPopupRef = useRef<HTMLDivElement>(null);

  const currentMessages = useLazyScroll( { messages, openedChatPopupRef } )

  return (
    <div ref={openedChatPopupRef} className={styles.messagesBlock}>
      {currentMessages?.map((message) => (
        <Message
          type={
            message.userId === chatmateInfo.userId ? 'incoming' : 'outgoing'
          }
          messageText={message.message}
          avatarLink={message.userAvatarLink}
          key={message.id}
        />
      ))}
    </div>
  );
};
