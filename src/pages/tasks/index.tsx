import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { PageSubMenu } from '../../widgets/page-sub-menu';

import styles from './styles.module.css';

import { Tabs, UserRole } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import { TasksTab } from 'pages/tasks-tab';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';

export interface PageProps {
  incomeTab: string;
}

export const mockedUsers = [
  {
    _id: '1',
    name: 'Иванов Иван Иванович',
    phone: '+7 (111) 222-22-22',
    avatar: 'https://i.pravatar.cc/300',
    address: 'Москва, Ленинский проспект, 65к1',
    vkId: '123456',
    role: UserRole.VOLUNTEER,
    score: 0,
    status: 2,
    keys: false,
    isActive: true,
  },
  {
    _id: '2',
    name: 'Молчанов Егор Артёмович',
    phone: '+7 (111) 222-22-22',
    avatar: 'https://i.pravatar.cc/300',
    address: 'Улица Садовая, 10',
    vkId: '654321',
    role: UserRole.RECIPIENT,
    score: 0,
    status: 1,
    keys: false,
    isActive: true,
  },
  {
    _id: '3',
    name: 'Суворов Лазарь Валентинович',
    phone: '+7 (111) 222-22-22',
    avatar: 'https://i.pravatar.cc/300',
    address: 'Москва, Ленинский проспект, 45',
    vkId: '789456',
    role: UserRole.VOLUNTEER,
    score: 0,
    status: 2,
    keys: false,
    isActive: false,
  },
  {
    _id: '4',
    name: 'Ефремов Мартын Ростиславович',
    phone: '+7 (111) 222-22-22',
    avatar: 'https://i.pravatar.cc/300',
    address: 'Москва, Ленинский проспект, 35',
    vkId: '987654',
    role: UserRole.RECIPIENT,
    score: 0,
    status: 1,
    keys: false,
    isActive: false,
  },
  {
    _id: '5',
    name: 'Смирнов Иван Павлович',
    phone: '+7 (111) 222-22-22',
    avatar: 'https://i.pravatar.cc/300',
    address: 'Москва, Ленинский проспект, 15',
    vkId: '123789',
    role: UserRole.VOLUNTEER,
    score: 0,
    status: 2,
    keys: false,
    isActive: true,
  },
];

export function TasksPage({ incomeTab }: PageProps) {
  // раскоментировать после настройки сервера
  // const [searchRole, setSearchRole] =
  //   useState<IFilterValues>(defaultObjFilteres);

  const navigate = useNavigate();

  // раскоментировать 2 строки после настройки сервера
  // const { data: recipients } = useGetUserByRolesQuery('recipients');
  // const { data: volunteers } = useGetUserByRolesQuery('volunteers');
  const [searchName, setSearchName] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const filterActiveUsers = (users: User[] | undefined): User[] => {
      return users ? users.filter((user) => user.isActive) : [];
    };

    // раскоментировать 2 строки после настройки сервера
    // const dataMap: Record<string, User[] | undefined> = {
    //   [Tabs.VOLUNTEERS]: filterActiveUsers(volunteers),
    //   [Tabs.RECIPIENTS]: filterActiveUsers(recipients),
    // };

    const dataMap: Record<string, User[]> = {
      [Tabs.VOLUNTEERS]: filterActiveUsers(
        mockedUsers.filter((user) => user.role === UserRole.VOLUNTEER)
      ),
      [Tabs.RECIPIENTS]: filterActiveUsers(
        mockedUsers.filter((user) => user.role === UserRole.RECIPIENT)
      ),
    };

    const filteredData = dataMap[incomeTab as keyof typeof dataMap]?.filter(
      (user) => user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredData) {
      setFilteredUsers(filteredData);
    }
  }, [
    searchName,
    incomeTab,
    // раскоментировать 1 строку после настройки сервера
    // volunteers, recipients
  ]);

  const handleUserClick = (user: User) => {
    if (user.role === UserRole.RECIPIENT) {
      navigate(`/profile/tasks/recipients/${user._id}`);
    } else if (user.role === UserRole.VOLUNTEER) {
      navigate(`/profile/tasks/volunteers/${user._id}`);
    }
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
        text="Создание / Редактирование заявки"
        // filter={
        //   <Filter
        //     items={{ userCategories: true }}
        //     setFilteres={setSearchRole}
        //   />
        // }
      />
      <PageSubMenu
        links={
          <>
            <PageSubMenuLink to="/profile/tasks/recipients" text="Реципиенты" />
            <PageSubMenuLink to="/profile/tasks/volunteers" text="Волонтеры" />
          </>
        }
      />
      <div>
        <Input
          value={searchName}
          label="Введите имя "
          name="Name"
          onChange={(e) => setSearchName(e.target.value)}
          extClassName={styles.input}
          type="name"
        />

        {filteredUsers && (
          <TasksTab data={filteredUsers} onUserClick={handleUserClick} />
        )}
      </div>
    </>
  );
}
