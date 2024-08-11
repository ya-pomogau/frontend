import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { PageSubMenu } from '../../widgets/page-sub-menu';
import { Tabs, UserRole } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import { TasksTab } from 'pages/tasks-tab';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import { useGetUserByRolesQuery } from 'services/admin-api';
import usePermission from 'shared/hooks/use-permission';

import styles from './styles.module.css';

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
  const isMainAdmin = usePermission([], UserRole.ADMIN);
  const navigate = useNavigate();

  const recipients = useGetUserByRolesQuery(Tabs.RECIPIENTS).data;
  const volunteers = useGetUserByRolesQuery(Tabs.VOLUNTEERS).data;
  const [searchName, setSearchName] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const dataMap: Record<string, User[] | undefined> = {
      [Tabs.VOLUNTEERS]: volunteers,
      [Tabs.RECIPIENTS]: recipients,
    };

    const filteredData = dataMap[incomeTab as keyof typeof dataMap]?.filter(
      (user) => user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredData) {
      setFilteredUsers(filteredData);
    }
  }, [searchName, incomeTab, volunteers, recipients]);

  const handleUserClick = (user: User) => {
    if (user.role === UserRole.RECIPIENT) {
      navigate(`/profile/tasks/recipients/${user._id}`);
    } else if (user.role === UserRole.VOLUNTEER) {
      navigate(`/profile/tasks/volunteers/${user._id}`);
    }
  };

  const configurePointsButton = (textButton: string) => {
    return (
      <>
        {isMainAdmin && (
          <button
            className={styles.editButton}
            onClick={() => navigate(`/profile/bids`)}
          >
            <Icon color="blue" icon="EditIcon" />
            <p
              className={classNames(
                'text',
                'text_size_small',
                'text_type_regular',
                'm-0',
                styles.editButtonText
              )}
            >
              {textButton}
            </p>
          </button>
        )}
      </>
    );
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
      <div className={styles.menu_block}>
        <PageSubMenu
          links={
            <>
              <PageSubMenuLink
                to="/profile/tasks/recipients"
                text="Реципиенты"
              />
              <PageSubMenuLink
                to="/profile/tasks/volunteers"
                text="Волонтеры"
              />
            </>
          }
        />
        {configurePointsButton('Настроить баллы')}
      </div>
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
