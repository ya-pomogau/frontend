import classnames from 'classnames';
import styles from '../styles.module.css';
import { UserRole } from 'shared/types/common.types';

interface UserInfoProps {
  role?: UserRole;
  userName: string;
  userId: number;
  userNumber: string;
}

const UserInfo = ({ role, userName, userId, userNumber }: UserInfoProps) => (
  <div className={styles.user_info}>
    <h2
      className={classnames(
        styles.name_text,
        'm-0 text text_size_medium text_type_regular'
      )}
    >
      {userName}
    </h2>
    {role === UserRole.RECIPIENT && (
      <div className={classnames(styles.grid_two, styles.id_color)}>
        <p className="m-0 text text_size_small text_type_regular"> ID </p>
        <p className="m-0 text text_size_small text_type_regular">{userId}</p>
      </div>
    )}
    <div className={styles.grid_two}>
      <p className="m-0 text text_size_small text_type_bold "> тел: </p>
      <p className="m-0 text text_size_small text_type_regular">{userNumber}</p>
    </div>
  </div>
);

export default UserInfo;
