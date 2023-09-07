import { useGetUsersQuery } from 'services/user-api';

import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { UserCard } from 'widgets/user-card';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import styles from './styles.module.css';
import { Input } from 'shared/ui/input';

import { testUsers } from 'pages/requests/test-users';
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

export function RequestsVolunteersPage() {
  const { isLoading, data = [] } = useGetUsersQuery('volunteer', {
    pollingInterval: 30000,
  });
  const [searchName, setSearchName] = useState('');

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="BlockIcon" size="54" />}
        text="Подтверждение / Блокировка"
      />
      <PageSubMenuForAdmins />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Input
            extClassName={styles.input}
            value={searchName}
            name="name"
            onChange={(e) => setSearchName(e.target.value)}
            placeholder={'Введите имя'}
            type="name"
            label="Введите имя "
          />
          <div className={styles.userCards}>
            {testUsers
              .filter(
                (user: UserProps) =>
                  user.userName
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) &&
                  user.role == 'volunteer'
              )
              .map((user: UserProps) => (
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
      )}
    </>
  );
}
