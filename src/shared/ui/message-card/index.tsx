import cn from 'classnames';

import { AnyUserInterface } from 'shared/types/user.type';
import { Avatar, Typography } from '../../ui';

import styles from './styles.module.css';

interface PropsMessageCard {
  statusConflict?: boolean | undefined;
  description?: string | undefined;
  onClick: () => void;
  action: boolean;
  user?: AnyUserInterface | null;
  position?: 1 | 2 | undefined;
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
  /* #####################
  Варианты отображения карточки сообщения
  при конфликте и в системном чате
  ##################### */
  const variant = (children: (name: string, desc: string) => JSX.Element) =>
    statusConflict ? (
      // Карточка оповещения о новом конфликтном чате
      <>
        <Avatar
          avatarName={'user.name'}
          size={'medium'}
          extClassName={cn(styles.img, { [styles.img_action]: action })}
        />
        {children('Оповещение о конфликте', description ?? 'Дата конфликта')}

        <div
          className={cn(styles.notification, styles.radius, {
            [styles.vizabiliti]: unreads > 0,
          })}
        />
      </>
    ) : (
      user && (
        <>
          <Avatar
            avatarLink={user.avatar}
            avatarName={user.name}
            size={'medium'}
          />
          {children(user.name, user.phone)}
          <Typography
            tag={'span'}
            color={'white'}
            variant={'input-title'}
            content={unreads > 10 ? '+9' : unreads}
            extraClass={cn(styles.counter, styles.radius, {
              [styles.vizabiliti]: unreads > 0,
            })}
          />
        </>
      )
    );

  /* #####################
  ################# RETURN
  ##################### */
  return (
    <article
      onClick={onClick}
      className={cn(styles.card, {
        [styles.card_action]: action,
        [styles.cardSwipe]: position === 1,
        [styles.cardConflict]: position === 2,
      })}
    >
      {variant((name, desc) => (
        <div className={styles.userInfo}>
          <Typography
            variant={'paragraphResize'}
            content={name}
            extraClass={cn(styles.name, styles.lengthLimitation)}
          />
          <Typography
            variant={'support'}
            content={desc}
            extraClass={cn(styles.message, styles.lengthLimitation)}
          />
        </div>
      ))}
    </article>
  );
};
