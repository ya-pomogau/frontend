import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { IMessage } from 'shared/types/message';
import {
  IChatmateInfo,
  IConflictUser,
  IInfoConflict,
  IUsers,
} from 'shared/types/conflict';

interface PropsMessageCard {
  chatmateInfo: IChatmateInfo;
  message: IMessage[];
  action: boolean;
  onClick: (cardId: string) => void;
  id: number;
  getConflict?: (
    conflict?: IConflictUser,
    infoConflict?: IInfoConflict
  ) => void;
  getChat?: (
    id: number,
    chatmateInfo: IChatmateInfo,
    message: IMessage[]
  ) => void;
  conflict?: IConflictUser;
  infoConflict?: IInfoConflict;
  position?: boolean;
  getInfoChatsConflict?: (users: IUsers[], id: number) => void;
  users?: IUsers[];
  openChat?: boolean;
}

export const MessageCard: React.FC<PropsMessageCard> = (props) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const lastMessage = props.message.length - 1;
  const location = useLocation();

  useEffect(() => {
    setHasNewMessage(true);
  }, [props.message]);

  useEffect(() => {
    if (props.openChat) {
      setHasNewMessage(true);
    }
  }, [props.openChat]);

  const handelClick = () => {
    props.onClick(props.chatmateInfo.userId);

    if (props.getChat) {
      props.getChat(props.id, props.chatmateInfo, props.message);
    }
    if (props.getConflict) {
      props.getConflict(props.conflict, props.infoConflict);
    }
    if (props.getInfoChatsConflict && props.users) {
      props.getInfoChatsConflict(props.users, props.id);
    }
  };

  return (
    // <article onClick={handelClick} className={styles['cards-container']}>
    <article
      onClick={handelClick}
      className={cn(
        styles.card,
        { [styles.card_action]: props.action },
        {
          [styles['card-swipe']]: props.position,
        }
      )}
    >
      {props.chatmateInfo.userAvatarLink ? (
        <img
          src={props.chatmateInfo.userAvatarLink}
          alt="фото"
          className={styles.img}
        />
      ) : (
        <div
          className={cn(styles.img, { [styles.img_action]: props.action })}
        />
      )}
      <div className={styles['user-info']}>
        <p
          className={cn(defultStyle, styles.name, styles['length-limitation'])}
        >
          {props.chatmateInfo.name}
        </p>
        <span className={cn(defultStyle, styles.id)}>
          {`ID ${props.chatmateInfo.userId}`}
        </span>
        <p
          className={cn(
            defultStyle,
            styles.message,
            styles['length-limitation']
          )}
        >
          {props.message[lastMessage].message}
        </p>
      </div>
      {location.pathname === '/chat-conflict'
        ? hasNewMessage && (
            <div
              className={cn(styles.notification, styles.radius, {
                [styles.vizabiliti]: !hasNewMessage,
              })}
            />
          )
        : hasNewMessage && (
            <span
              className={cn(styles.counter, styles.radius, {
                [styles.vizabiliti]: !hasNewMessage,
              })}
            >
              {props.message.length > 10 ? '+9' : props.message.length}
            </span>
          )}
    </article>
    // </article>
  );
};
