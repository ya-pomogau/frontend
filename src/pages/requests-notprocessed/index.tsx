import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useGetUncomfirmedQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import { Loader } from 'shared/ui/loader';

import styles from './styles.module.css';
import { Input } from 'shared/ui/input';
import { testUsers } from 'pages/requests/test-users';
import { UserCard } from 'widgets/user-card';
import { useAppSelector } from 'app/hooks';

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

export function RequestsNotprocessedPage() {
  const { role } = useAppSelector((store) => store.user);
  const [searchName, setSearchName] = useState('');

  //хук сейчас не нуждается в аргументах, но если не указать аргумент перед
  //pollingInterval, то рефетча не будет
  const { isLoading, data } = useGetUncomfirmedQuery(role, {
    pollingInterval: 30000,
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="BlockIcon" size="54" />}
        text="Подтверждение / Блокировка"
        filter={<Filter items={{ userCategories: true }} />}
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
          {role === 'master' && (
            <div className={styles.userAdminCards}>
              {testUsers
                .filter(
                  (user: UserProps) =>
                    user.userName
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) &&
                    user.role === 'admin'
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
          )}
          <div className={styles.userCards}>
            {testUsers
              .filter(
                (user: UserProps) =>
                  user.userName
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) && user.role !== 'admin'
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
