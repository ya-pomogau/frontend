import cn from 'classnames';
import styles from './styles.module.css';
import { AnyUserInterface } from 'shared/types/user.type';

interface PropsMessageCard {
  statusConflict?: boolean | undefined;
  description?: string | undefined;
  onClick: () => void;
  action: boolean;
  user?: AnyUserInterface | null;
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

  /* #####################
  Варианты отображения карточки сообщения 
  при конфликте и в системном чате
  ##################### */
  const variant = (children: (name: string, desc: string) => JSX.Element) =>
    statusConflict ? (
      // Карточка оповещения о новом конфликтном чате
      <>
        <div className={cn(styles.img, { [styles.img_action]: action })} />

        {
          //передаём описание в общий элемент верстки
          children('Оповещение о конфликте', description ?? 'Дата конфликта')
        }

        <div
          className={cn(styles.notification, styles.radius, {
            [styles.vizabiliti]: unreads > 0,
          })}
        />
      </>
    ) : (
      // Карточка системного чата с пользователем
      user && (
        <>
          <img src={user.avatar} alt={user.name} className={styles.img} />

          {
            //передаём имя и телефон в общий элемент верстки
            children(user.name, user.phone)
          }

          <span
            className={cn('text-inter', styles.counter, styles.radius, {
              [styles.vizabiliti]: unreads > 0,
            })}
          >
            {unreads > 10 ? '+9' : unreads}
          </span>
        </>
      )
    );

  /* #####################
  ################# RETURN
  ##################### */
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
      {variant((name, desc) => (
        <div className={styles.userInfo}>
          <p className={cn(defultStyle, styles.name, styles.lengthLimitation)}>
            {name}
          </p>
          <p
            className={cn(defultStyle, styles.message, styles.lengthLimitation)}
          >
            {desc}
          </p>
        </div>
      ))}
    </article>
  );
};
