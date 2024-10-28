import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { TaskConflict } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import { IMessageHub } from 'shared/libs/utils';
import { MessageInterface } from '../../types/chat.types';
import { Typography } from '../typography';

interface PropsMessageCard {
  statusConflict: boolean;
  description: string;
  handleClickCard: (task: TaskConflict | IMessageHub) => void;
  message?: MessageInterface[];
  action: boolean;
  user: UserProfile;
  task?: TaskConflict;
  position?: boolean;
}

export const MessageCard = (props: PropsMessageCard) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
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
        <Typography
          tag={'p'}
          fontFamily={'primaryFont'}
          variant={'paragraphResize'}
          content={
            props.statusConflict ? 'Оповещение о конфликте' : props.user.name
          }
          extraClass={cn(styles.name, styles.lengthLimitation)}
        />
        <Typography
          tag={'p'}
          fontFamily={'primaryFont'}
          variant={'support'}
          content={props.description}
          extraClass={cn(styles.message, styles.lengthLimitation)}
        />
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
            // <Typography tag={'span'} color={'white'} fontFamily={'primaryFont'} variant={'input-title'} content={props.message.length > 10 ? '+9' : props.message.length} extraClass={cn(styles.counter, styles.radius, {[styles.vizabiliti]: !hasNewMessage})}/>
          )}
    </article>
  );
};
