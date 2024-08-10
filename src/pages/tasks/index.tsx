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
import { useGetUserByRolesQuery } from 'services/admin-api';

export interface PageProps {
  incomeTab: string;
}

export function TasksPage({ incomeTab }: PageProps) {
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
