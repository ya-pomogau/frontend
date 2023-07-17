import classnames from 'classnames';

import { UserCard } from 'shared/ui/user-card';
import { CategoriesBackground } from 'shared/ui/categories-background';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import type { IUser } from '../../types';

import styles from './styles.module.css';

interface RequestCardProps {
  requestCardId: string;
  // когда будет 1 интерфейс глобальный для пользователя - указать тут его
  user: IUser;
}

const RequestCard = ({ requestCardId, user }: RequestCardProps) => {
  const { userId, userName, userPhoneNumber, userAvatar, info } = user;
  const { keys, completedTasks, score } = info;
  // хардкод: непонятно от чего зависит отображение цвета полоски
  // eslint-disable-next-line no-nested-ternary
  const theme = keys > 0 ? 'success' : score === 0 ? 'warning' : 'secondary';

  return (
    <UserCard
      userId={userId}
      userName={userName}
      userNumber={userPhoneNumber}
      avatarLink={userAvatar}
      avatarName={`Аватар пользователя ${userName}`}
    >
      <div className={styles.staticInfoWrapper}>
        <CategoriesBackground
          theme={theme}
          extClassName={styles.categoriesBackground}
        />
        <ul
          className={classnames(
            styles.staticInfo,
            'text',
            'text_size_small',
            'list',
            'p-0',
            'm-0'
          )}
        >
          <li className={styles.staticInfoItem}>
            <Icon
              color="blue"
              icon="BallsIcon"
              onClick={() => {
                console.log('test click score icon');
              }}
              size="32"
            />
            {score}
          </li>
          {keys > 0 && (
            <li className={styles.staticInfoItem}>
              <Icon
                color="blue"
                icon="KeyIcon"
                onClick={() => {
                  console.log('test click keys icon');
                }}
                size="24"
              />
              {keys}
            </li>
          )}
          <li className={styles.staticInfoItem}>
            <Icon
              color="blue"
              icon="FinishedApplicationIcon"
              onClick={() => {
                console.log('test click finishedTasks icon');
              }}
              size="24"
            />
            {completedTasks}
          </li>
        </ul>
      </div>
      <ul className={classnames(styles.buttonsWrapper, 'list', 'm-0', 'p-0')}>
        <Button
          buttonType={keys <= 0 && score > 0 ? 'partial' : 'primary'}
          label="Подтвердить"
          onClick={() => {
            console.log('on 1 buttonclick');
          }}
          disabled={Boolean(keys)}
        />
        <Button
          buttonType="secondary"
          label="Заброкировать"
          onClick={() => {
            console.log('on 2 buttonclick');
          }}
        />
        <Button
          buttonType="secondary"
          label="Дать ключи"
          onClick={() => {
            console.log('on 3 buttonclick');
          }}
          disabled={Boolean(keys)}
        />
      </ul>
    </UserCard>
  );
};

export default RequestCard;
