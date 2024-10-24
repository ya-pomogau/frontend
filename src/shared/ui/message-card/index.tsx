import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { TaskConflict } from 'entities/task/types';
import { AnyUserInterface } from 'shared/types/user.type';

interface PropsMessageCard {
  statusConflict?: boolean | undefined;
  description: string;
  onClick: () => void;
  action: boolean;
  user: AnyUserInterface;
  position?: boolean;
  unreads: number;
}

export const MessageCard = ({
  unreads,
  position,
  action,
  user,
  onClick,
  statusConflict,
  description,
}: PropsMessageCard) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const defultStyle = cn('m-0', 'text', 'text_type_regular');
  const location = useLocation();

  useEffect(() => {
    setHasNewMessage(true);
  }, [unreads]);

  // function handelClick() {
  //   if (task) {
  //     handleClickCard(task);
  //   } else if (unreads) {
  //     handleClickCard({
  //       user,
  //       messages: unreads,
  //       id: user._id,
  //     });
  //   }
  // }

  return (
    <article
      onClick={onClick}
      className={cn(
        styles.card,
        { [styles.card_action]: action },
        {
          [styles.cardSwipe]: position,
        }
      )}
    >
      {user.avatar ? (
        <img src={user.avatar} alt="фото" className={styles.img} />
      ) : (
        <div className={cn(styles.img, { [styles.img_action]: action })} />
      )}
      <div className={styles.userInfo}>
        <p className={cn(defultStyle, styles.name, styles.lengthLimitation)}>
          {statusConflict ? 'Оповещение о конфликте' : user.name}
        </p>
        <p className={cn(defultStyle, styles.message, styles.lengthLimitation)}>
          {description}
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
              {/* {message.length > 10 ? '+9' : message.length} */}
            </span>
          )}
    </article>
  );
};
