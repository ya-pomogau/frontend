import { PopupChat } from 'entities/chat/ui/chat';
import styles from './stylex.module.css';
import { messages, chatmateInfo } from './constants';
import { useState } from 'react';

export function ConversationWidget() {
  const [isOpen, setIpOpen] = useState<boolean>(false);

  const handleVisibleMessage = () => {
    setIpOpen((state) => !state);
  };

  return (
    <section className={styles.container}>
      <button onClick={handleVisibleMessage}>+-</button>
      <PopupChat
        onAttachFileClick={() => {}}
        onClick={handleVisibleMessage}
        isOpen={isOpen}
        chatmateInfo={chatmateInfo}
        messages={messages}
        onMessageSend={() => {}}
      />
    </section>
  );
}
