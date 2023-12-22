import styles from './stylex.module.css';
import { messages } from './constants';
import { useState } from 'react';
import { MessageCard } from 'shared/ui/message-card';

export function ConversationWidget() {
  // const [isOpen, setIpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  // const handleVisibleMessage = () => {
  //   setIpOpen((state) => !state);
  // };

  return (
    <section className={styles.container}>
      {/* <button onClick={handleVisibleMessage}>+-</button> */}
      {messages.map((item) => {
        return (
          <MessageCard
            key={item.chatmateInfo.userId}
            onClick={handleCardClick}
            chatmateInfo={item.chatmateInfo}
            massage={item.messages}
            action={selectedCard === item.chatmateInfo.userId}
          />
        );
      })}
    </section>
  );
}
