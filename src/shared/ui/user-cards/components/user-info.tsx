import classnames from 'classnames';
import { ReactNode } from 'react';

import { userRole, UserRole } from '../../../types/common.types';
import { Typography } from 'shared/ui';

import styles from '../styles.module.css';

interface UserInfoProps {
  role: UserRole;
  userName: string;
  userId: string;
  userNumber: string;
  extraClasses?: string;
  viewMode?: string;
  children?: ReactNode;
}

const UserInfo = ({
  role,
  userName,
  userId,
  userNumber,
  extraClasses,
  viewMode = 'tiles',
  children,
}: UserInfoProps) => {
  const formatUserId = (id: string) => id.slice(-8);

  return (
    <div className={classnames(styles.user_info, extraClasses)}>
      <Typography
        tag={'h3'}
        variant={'paragraphResize'}
        content={userName}
        extraClass={styles.name_text}
      />
      {(role === userRole.RECIPIENT || viewMode === 'list') && (
        <div
          className={classnames(
            viewMode === 'list' ? styles.grid_two_list : styles.grid_two_tiles
          )}
        >
          <Typography
            variant={'servicesText'}
            color={'ID-text'}
            content={`${'ID'} ${formatUserId(userId)}`}
            extraClass={styles.id}
          />
        </div>
      )}
      {children && <>{children}</>}
      <div
        className={classnames(
          viewMode === 'list' ? styles.grid_two_list : styles.grid_two_tiles
        )}
      >
        <Typography variant={'support-bold'} content={'Тел.:'} />
        <Typography variant={'support'} content={userNumber} />
      </div>
    </div>
  );
};

export default UserInfo;
