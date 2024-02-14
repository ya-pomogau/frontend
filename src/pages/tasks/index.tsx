import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { UserCard } from 'widgets/user-card';

import styles from './styles.module.css';
import { IFilterValues } from 'features/filter/types';
import { defaultObjFilteres } from 'features/filter/consts';
import { IDateUser } from 'pages/requests/test-users';
import {
  filterCardsUsersPageAdmin,
  filterUsersNamePageAdmin,
} from 'shared/libs/utils';
import { UserRole } from '../../shared/types/common.types';

const userMock = [
  {
    role: UserRole.VOLUNTEER,
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 1,
    userName: 'Иванов Иван Иванович',
    userNumber: '+7 (111) 222-22-22',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 2,
    userName: 'Молчанов Егор Артёмович',
    userNumber: '+7 (111) 222-22-22',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: UserRole.VOLUNTEER,
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 3,
    userName: 'Суворов Лазарь Валентинович',
    userNumber: '+7 (111) 222-22-22',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 4,
    userName: 'Ефремов Мартын Ростиславович',
    userNumber: '+7 (111) 222-22-22',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: UserRole.VOLUNTEER,
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 5,
    userName: 'Ефремов Мартын Ростиславович',
    userNumber: '+7 (111) 222-22-22',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
];

export function TasksPage() {
  const [searchName, setSearchName] = useState('');
  const [searchRole, setSearchRole] =
    useState<IFilterValues>(defaultObjFilteres);
  const [dateUsers, setDateUsers] = useState<IDateUser[]>(userMock);

  // const filter = userMock.filter((user) =>
  //   user.userName.toLowerCase().includes(value.toLowerCase())
  // );

  useEffect(() => {
    filterCardsUsersPageAdmin(userMock, searchRole, setDateUsers);
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
        icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
        text="Создание / Редактирование заявки"
        filter={
          <Filter
            items={{ userCategories: true }}
            setFilteres={setSearchRole}
          />
        }
      />

      <div>
        <Link to={'/profile/bids'}>Настроить баллы</Link>
      </div>

      <div>
        <Input
          value={searchName}
          label="Введите имя "
          name="Name"
          onChange={(e) => setSearchName(e.target.value)}
          extClassName={styles.input}
        />
        <ul>
          {dateUsers.map((item) => (
            <li key={item.userId}>
              <UserCard
                avatarLink={item.avatarLink}
                avatarName={item.avatarName}
                userName={item.userName}
                userId={item.userId}
                userNumber={item.userNumber}
                volunteerInfo={item.volunteerInfo}
                role={item.role}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
