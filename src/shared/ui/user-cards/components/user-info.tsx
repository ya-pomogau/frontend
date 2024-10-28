import classnames from 'classnames';
import styles from '../styles.module.css';

import { userRole, UserRole } from '../../../types/common.types';
import { ReactNode } from 'react';
import { Typography } from 'shared/ui/typography';

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
      <div>
        <Typography
          tag={'h3'}
          color={'black'}
          variant={'paragraphResize'}
          fontFamily={'primaryFont'}
          content={userName}
          extraClass={styles.name_text}
        />
        {(role === userRole.RECIPIENT || viewMode === 'list') && (
          <div
            className={classnames(
              viewMode === 'list'
                ? styles.grid_two_list
                : styles.grid_two_tiles,
              styles.id_color
            )}
          >
            <Typography
              tag={'p'}
              variant={'servicesText'}
              color={'ID-text'}
              fontFamily={'primaryFont'}
              content={`${'ID'} ${formatUserId(userId)}`}
              extraClass={styles.id}
            />
          </div>
        )}
      </div>
      {children && <>{children}</>}
      <div
        className={classnames(
          viewMode === 'list' ? styles.grid_two_list : styles.grid_two_tiles
        )}
      >
        <Typography
          tag={'p'}
          fontFamily={'primaryFont'}
          variant={'support-bold'}
          color={'black'}
          content={'Тел.:'}
        />
        <Typography
          tag={'p'}
          fontFamily={'primaryFont'}
          variant={'support'}
          color={'black'}
          content={userNumber}
        />
      </div>
    </div>
  );
};

export default UserInfo;
