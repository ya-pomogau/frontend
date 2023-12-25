import styles from './stylex.module.css';
import { messages } from './constants';
import { useState } from 'react';
import { MessageCard } from 'shared/ui/message-card';
import { UserChatBox } from 'widgets/user-chat-box';
import { IChatmateInfo, IMessage } from 'entities/chat/ui/chat/types';
import { useLocation } from 'react-router-dom';

export interface IUserInfo {
  chatmateInfo: IChatmateInfo;
  message: IMessage[];
}

export function ConversationWidget() {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState('');
  const location = useLocation();
  const [infoMessage, setInfoMessage] = useState<{
    chatmateInfo: IChatmateInfo;
    message: IMessage[];
  } | null>(null);

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    handleVisibleMessage('');
  };

  const handleInfoUser = (chatmateInfo: IChatmateInfo, message: IMessage[]) => {
    if (chatmateInfo && message) {
      setInfoMessage({ chatmateInfo, message });
    }
  };

  return (
    <section className={styles.container}>
      <div>
        {messages.map((item) => {
          return (
            <MessageCard
              getChat={handleInfoUser}
              key={item.chatmateInfo.userId}
              onClick={handleCardClick}
              chatmateInfo={item.chatmateInfo}
              message={item.messages}
              action={isOpen && selectedCard === item.chatmateInfo.userId}
            />
          );
        })}
      </div>
      <UserChatBox
        onClick={handleVisibleMessage}
        isOpen={isOpen}
        chatmateInfo={infoMessage?.chatmateInfo}
        messages={infoMessage?.message}
        option={location.pathname === '/chat-two' ? 'conflict' : 'chat'}
      />
    </section>
  );
}
