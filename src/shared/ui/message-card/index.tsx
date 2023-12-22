import cn from 'classnames';
import { IChatmateInfo, IMessage } from 'entities/chat/ui/chat/types';
import styles from './styles.module.css';

interface PropsMessageCard {
  chatmateInfo: IChatmateInfo;
  massage: IMessage[];
  action: boolean;
  onClick: (cardId: string) => void;
}

export function MessageCard({
  chatmateInfo,
  massage,
  action,
  onClick,
}: PropsMessageCard) {
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const lastMessage = massage.length - 1;

  return (
    <article
      onClick={() => onClick(chatmateInfo.userId)}
      className={cn(styles.card, { [styles.card_action]: action })}
    >
      {chatmateInfo.userAvatarLink ? (
        <img
          src={chatmateInfo.userAvatarLink}
          alt="фото"
          className={styles.img}
        />
      ) : (
        <div className={styles.img} />
      )}
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
          {massage[lastMessage].message}
        </p>
      </div>
      <span className={styles.counter}>
        {massage.length > 10 ? '+9' : massage.length}
      </span>
    </article>
  );
}
