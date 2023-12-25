import cn from 'classnames';
import { IChatmateInfo, IMessage } from 'entities/chat/ui/chat/types';
import styles from './styles.module.css';

interface PropsMessageCard {
  chatmateInfo: IChatmateInfo;
  message: IMessage[];
  action: boolean;
  onClick: (cardId: string) => void;
  getChat: (chatmateInfo: IChatmateInfo, message: IMessage[]) => void;
}

export function MessageCard({
  chatmateInfo,
  message,
  action,
  onClick,
  getChat,
}: PropsMessageCard) {
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const lastMessage = message.length - 1;

  const handelClick = () => {
    onClick(chatmateInfo.userId);
    getChat(chatmateInfo, message);
  };

  //  console.log(`MessageCard ${item}`);

  return (
    <article
      onClick={handelClick}
      className={cn(styles.card, { [styles.card_action]: action })}
    >
      <img
        src={chatmateInfo.userAvatarLink}
        alt="фото"
        className={styles.img}
      />
      <div className={styles['user-info']}>
        <p
          className={cn(defultStyle, styles.name, styles['length-limitation'])}
        >
          {chatmateInfo.name}
        </p>
        <span className={cn(defultStyle, styles.id)}>
          {`ID ${chatmateInfo.userId}`}
        </span>
        <p
          className={cn(
            defultStyle,
            styles.message,
            styles['length-limitation']
          )}
        >
          {message[lastMessage].message}
        </p>
      </div>
      <span className={styles.counter}>
        {message.length > 10 ? '+9' : message.length}
      </span>
    </article>
  );
}
