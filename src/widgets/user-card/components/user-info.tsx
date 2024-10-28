import classnames from 'classnames';
import styles from '../styles.module.css';
import { Typography } from 'shared/ui/typography';

interface UserInfoProps {
  userName: string;
  userId: string;
  userNumber: string;
}

const UserInfo = ({ userName, userId, userNumber }: UserInfoProps) => (
  <div className={styles.user_info}>
    <Typography
      tag={'h2'}
      color={'black'}
      fontFamily={'primaryFont'}
      variant={'paragraphResize'}
      content={userName}
      extraClass={styles.name_text}
    />
    <div className={classnames(styles.grid_ID)}>
      <Typography
        tag={'p'}
        color={'ID-text'}
        fontFamily={'primaryFont'}
        variant={'servicesText'}
        content={`${'ID'} ${userId}`}
        extraClass={styles.id}
      />
    </div>
    <div className={styles.grid_phone}>
      <Typography
        tag={'p'}
        color={'black'}
        fontFamily={'primaryFont'}
        variant={'support-bold'}
        content={'Тел.:'}
      />
      <Typography
        tag={'p'}
        color={'black'}
        fontFamily={'primaryFont'}
        variant={'support'}
        content={userNumber}
      />
    </div>
  </div>
);

export default UserInfo;
