import { useGetUsersQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

import styles from './styles.module.css';
import { Input } from 'shared/ui/input';
import { useState } from 'react';

interface UserProps {
  role: 'volunteer' | 'recipient' | 'admin' | 'master';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  volunteerInfo?: any;
}

interface TabProps {
  data: UserProps[];
}

export function RequestsTab({ data }: TabProps) {
  return (
    <>
      <div className={styles.userCards}>
        {data.map((user: UserProps) => (
          <UserCard
            role={user.role}
            key={user.userId}
            avatarLink={user.avatarLink}
            avatarName={user.avatarName}
            userName={user.userName}
            userId={user.userId}
            userNumber={user.userNumber}
            volunteerInfo={user.volunteerInfo}
          />
        ))}
      </div>
    </>
  );
}
