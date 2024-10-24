import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { AnyUserInterface } from 'shared/types/user.type';

interface PropsMessageCard {
  statusConflict?: boolean | undefined;
  description?: string | undefined;
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
  const defultStyle = cn('m-0', 'text', 'text_type_regular');

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
          {description ?? user.phone}
        </p>
      </div>
      {statusConflict ? (
        <div
          className={cn(styles.notification, styles.radius, {
            [styles.vizabiliti]: unreads > 0,
          })}
        />
      ) : (
        <span
          className={cn(styles.counter, styles.radius, {
            [styles.vizabiliti]: unreads > 0,
          })}
        >
          {unreads > 10 ? '+9' : unreads}
        </span>
      )}
    </article>
  );
};
