import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { IMessage } from 'shared/types/message';
import { TaskConflict } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import { IMessageHub } from 'shared/libs/utils';

interface PropsMessageCard {
  statusConflict: boolean;
  description: string;
  handleClickCard: (task: TaskConflict | IMessageHub) => void;
  message?: IMessage[];
  action: boolean;
  user: UserProfile;
  task?: TaskConflict;
  position?: boolean;
}

export const MessageCard: React.FC<PropsMessageCard> = (props) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const location = useLocation();

  useEffect(() => {
    setHasNewMessage(true);
  }, [props.message]);

  function handelClick() {
    if (props.task) {
      props.handleClickCard(props.task);
    } else if (props.message) {
      props.handleClickCard({
        user: props.user,
        messages: props.message,
        id: props.user._id,
      });
    }
  }

  return (
    <article
      onClick={handelClick}
      className={cn(
        styles.card,
        { [styles.card_action]: props.action },
        {
          [styles.cardSwipe]: props.position,
        }
      )}
    >
      {props.user.avatar ? (
        <img src={props.user.avatar} alt="фото" className={styles.img} />
      ) : (
        <div
          className={cn(styles.img, { [styles.img_action]: props.action })}
        />
      )}
      <div className={styles.userInfo}>
        <p className={cn(defultStyle, styles.name, styles.lengthLimitation)}>
          {props.statusConflict ? 'Оповещение о конфликте' : props.user.name}
        </p>
        <p className={cn(defultStyle, styles.message, styles.lengthLimitation)}>
          {props.description}
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
              {/* {props.message.length > 10 ? '+9' : props.message.length} */}
            </span>
          )}
    </article>
  );
};
