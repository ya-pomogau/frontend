import React from 'react';
import classnames from 'classnames';
import styles from '../styles.module.css';
import classes from '../styles.module.css';
import { UserRole } from '../../../types/common.types';

interface UserInfoProps {
  role: UserRole;
  userName: string;
  userId: string;
  userNumber: string;
  extraClasses?: string;
  viewMode?: string;
  children?: React.ReactNode;
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
        <h2
          className={classnames(
            styles.name_text,
            'm-0 text text_size_medium text_type_regular'
          )}
        >
          {userName}
        </h2>
        {(role === UserRole.RECIPIENT || viewMode === 'list') && (
          <div
            className={classnames(
              viewMode === 'list'
                ? styles.grid_two_list
                : styles.grid_two_tiles,
              styles.id_color
            )}
          >
            <p
              className={classnames(
                styles.id,
                'm-0 text text_size_small text_type_regular'
              )}
            >
              ID
            </p>
            <p
              className={classnames(
                classes.id,
                'm-0 text text_size_small text_type_regular'
              )}
            >
              {formatUserId(userId)}
            </p>
          </div>
        )}
      </div>
      {children && <>{children}</>}
      <div
        className={classnames(
          viewMode === 'list' ? styles.grid_two_list : styles.grid_two_tiles
        )}
      >
        <p
          className={classnames(
            classes.tel,
            'm-0 text text_size_small text_type_regular text_type_bold '
          )}
        >
          Тел.:
        </p>
        <p
          className={classnames(
            classes.tel,
            'm-0 text text_size_small text_type_regular text_type_regular '
          )}
        >
          {userNumber}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
