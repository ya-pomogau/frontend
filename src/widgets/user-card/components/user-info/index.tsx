import classnames from 'classnames';
import { Typography } from 'shared/ui';
import styles from './styles.module.css';

interface UserInfoProps {
  userName: string;
  userId: string;
  userNumber: string;
}

const UserInfo = ({ userName, userId, userNumber }: UserInfoProps) => (
  <div className={styles.user_info}>
    <Typography
      tag={'h2'}
      variant={'paragraphResize'}
      content={userName}
      extraClass={styles.name_text}
    />
    <div className={classnames(styles.grid_ID)}>
      <Typography
        color={'ID-text'}
        variant={'servicesText'}
        content={`${'ID'} ${userId}`}
        extraClass={styles.id}
      />
    </div>
    <div className={styles.grid_phone}>
      <Typography variant={'support-bold'} content={'Тел.:'} />
      <Typography variant={'support'} content={userNumber} />
    </div>
  </div>
);

export default UserInfo;
