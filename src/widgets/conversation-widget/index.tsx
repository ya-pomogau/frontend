import { Chat } from 'entities/chat/ui/chat';
import styles from './stylex.module.css';
import { messages, chatmateInfo } from './constants';

export function ConversationWidget() {
  return (
    <section className={styles.container}>
      <Chat
        chatmateInfo={chatmateInfo}
        messages={messages}
        onMessageSend={() => {}}
      />
    </section>
  );
}
