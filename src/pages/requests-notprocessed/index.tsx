import { useState, useEffect } from 'react';

import { useGetUncomfirmedQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import { Loader } from 'shared/ui/loader';

import styles from './styles.module.css';
import { Input } from 'shared/ui/input';
import { IDateUser, testUsers } from 'pages/requests/test-users';
import { UserCard } from 'widgets/user-card';
import { useAppSelector } from 'app/hooks';
import { UserRole } from 'shared/types/common.types';
import { IFilterValues } from 'features/filter/types';
import { defaultObjFilteres } from 'features/filter/consts';
import {
  filterCardsUsersPageAdmin,
  filterUsersNamePageAdmin,
} from 'shared/libs/utils';
import { isRootSelector } from 'entities/user/model';

export interface UserProps {
  role: UserRole;
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
  const [searchRole, setSearchRole] =
    useState<IFilterValues>(defaultObjFilteres);
  const [dateUsers, setDateUsers] = useState<IDateUser[]>(testUsers);
  const isRoot = useAppSelector(isRootSelector);
  //хук сейчас не нуждается в аргументах, но если не указать аргумент перед
  //pollingInterval, то рефетча не будет
  const { isLoading, data } = useGetUncomfirmedQuery(role, {
    pollingInterval: 50000,
  });

  useEffect(() => {
    filterCardsUsersPageAdmin(testUsers, searchRole, setDateUsers);
    setSearchName('');
    // eslint-disable-next-line
  }, [searchRole]);

  useEffect(() => {
    setDateUsers(filterUsersNamePageAdmin(dateUsers, searchName));
    // eslint-disable-next-line
  }, [searchName]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="BlockIcon" size="54" />}
        text="Подтверждение / Блокировка"
        filter={
          <Filter
            items={{ userCategories: true }}
            setFilteres={setSearchRole}
          />
        }
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
          {isRoot && (
            <div className={styles.userAdminCards}>
              {dateUsers.map((user: UserProps) => (
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
          {role === UserRole.ADMIN && (
            <div className={styles.userCards}>
              {dateUsers.map((user: UserProps) => (
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
        </>
      )}
    </>
  );
}
