import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { TaskConflict } from 'entities/task/types';
import { AnyUserInterface } from 'shared/types/user.type';

interface PropsMessageCard {
  statusConflict: boolean;
  description: string;
  handleClickCard: (task: string) => void;
  unreads: number;
  action: boolean;
  user: AnyUserInterface;
  position?: boolean;
}

export const MessageCard = (props: PropsMessageCard) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const location = useLocation();

  useEffect(() => {
    setHasNewMessage(true);
  }, [props.unreads]);

  function handelClick() {
    if (props.statusConflict) {
      props.handleClickCard(props.task);
    } else if (props.unreads) {
      props.handleClickCard({
        user: props.user,
        messages: props.unreads,
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
              {/* {props.unreads.length > 10 ? '+9' : props.unreads.length} */}
            </span>
          )}
    </article>
  );
};
