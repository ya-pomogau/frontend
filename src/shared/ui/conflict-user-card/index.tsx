import classnames from 'classnames';

import { Avatar } from '../avatar';

import styles from './styles.module.css';
import { PhoneIcon } from '../icons/phone-icon';
import { EmptyMessageIcon } from '../icons/empty-message-icon';
import { SquareButton } from '../square-buttons';

interface IConflictUserCardProps {
  role: 'Волонтер' | 'Реципиент';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
}

export const ConflictUserCard = ({
  role,
  extClassName,
  avatarLink,
  avatarName,
  userName,
  userId,
}: IConflictUserCardProps) => (
  <>
    <div className={classnames(styles.content, extClassName)}>
      <div className={styles.wrapper}>
        <p
          className={classnames(
            'text',
            'text_size_small',
            'text_type_bold',
            styles.role
          )}
        >
          {role}
        </p>
        <div className={classnames(styles.container)}>
          <div className={styles.user}>
            <Avatar
              avatarLink={avatarLink}
              avatarName={avatarName}
              extClassName={classnames(styles.avatar)}
            />
            <div className={classnames(styles.icons)}>
              <div className={classnames(styles.icon)}>
                <PhoneIcon color={'white'} size={'22'} />
              </div>
              <div className={classnames(styles.icon)}>
                <EmptyMessageIcon color={'white'} size={'22'} />
              </div>
            </div>
          </div>
        </div>
        <SquareButton
          buttonType={role === 'Волонтер' ? 'confirm' : 'exclamation'}
        />
      </div>
      <p className={classnames('text', 'text_size_medium', styles.name)}>
        {userName}
      </p>
      <p
        className={classnames('text', 'text_size_small', styles.id)}
      >{`ID ${userId}`}</p>
    </div>
  </>
);
