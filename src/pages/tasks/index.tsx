import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Icon, SmartHeader, Input } from 'shared/ui';
import { usePermission } from 'shared/hooks';
import { Routes } from 'shared/config';
import { PageSubMenu } from 'widgets';
import { TasksTab } from 'pages';
import { Tabs, UserRole } from 'shared/types/common.types';
import { User } from 'entities/user/types';
import { PageSubMenuLink } from 'widgets/page-sub-menu/components/page-sub-menu-link/page-sub-menu-link';
import { useGetUserByRolesQuery } from 'services/admin-api';

import styles from './styles.module.css';

export interface PageProps {
  incomeTab: string;
}

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
      navigate(`${Routes.PROFILE_TASKS_RECIPIENTS}/${user._id}`);
    } else if (user.role === UserRole.VOLUNTEER) {
      navigate(`${Routes.PROFILE_TASKS_VOLUNTEERS}${user._id}`);
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
