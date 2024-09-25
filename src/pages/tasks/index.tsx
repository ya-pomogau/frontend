import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { TasksTab } from 'pages';
import { PageSubMenu, PageSubMenuLink } from 'widgets';
import { User } from 'entities/user/types';
import { useGetUserByRolesQuery } from 'services/admin-api';
import { Icon, SmartHeader, Input } from 'shared/ui';
import { usePermission } from 'shared/hooks';
import { Routes } from 'shared/config';
import { tabs, userRole, adminPermission } from 'shared/types/common.types';

import styles from './styles.module.css';

export interface PageProps {
  incomeTab: string;
}

export function TasksPage({ incomeTab }: PageProps) {
  const [searchName, setSearchName] = useState('');

  const navigate = useNavigate();

  const hasTasksPermission = usePermission(
    [adminPermission.TASKS],
    userRole.ADMIN
  );

  const recipients = useGetUserByRolesQuery(tabs.RECIPIENTS, {
    skip: !hasTasksPermission,
  }).data;
  const volunteers = useGetUserByRolesQuery(tabs.VOLUNTEERS, {
    skip: !hasTasksPermission,
  }).data;

  const filteredData = useMemo(() => {
    const dataMap: Record<string, User[] | undefined> = {
      [tabs.VOLUNTEERS]: volunteers,
      [tabs.RECIPIENTS]: recipients,
    };

    return dataMap[incomeTab as keyof typeof dataMap]?.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName, incomeTab, volunteers, recipients]);

  const handleUserClick = (user: User) => {
    if (user.role === userRole.RECIPIENT) {
      navigate(`${Routes.PROFILE_TASKS_RECIPIENTS}/${user._id}`);
    } else if (user.role === userRole.VOLUNTEER) {
      navigate(`${Routes.PROFILE_TASKS_VOLUNTEERS}/${user._id}`);
    }
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CreateApplication" size="54" />}
        text="Создание / Редактирование заявки"
      />
      <div className={styles.menu_block}>
        <PageSubMenu
          links={
            <>
              <PageSubMenuLink
                to={Routes.PROFILE_TASKS_RECIPIENTS}
                text="Реципиенты"
              />
              <PageSubMenuLink
                to={Routes.PROFILE_TASKS_VOLUNTEERS}
                text="Волонтеры"
              />
            </>
          }
        />
        {hasTasksPermission && (
          <button
            className={styles.editButton}
            onClick={() => navigate(Routes.PROFILE_BIDS)}
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
              Настроить баллы
            </p>
          </button>
        )}
      </div>
      {hasTasksPermission && (
        <div>
          <Input
            value={searchName}
            label="Введите имя "
            name="Name"
            onChange={(e) => setSearchName(e.target.value)}
            extClassName={styles.input}
            type="name"
          />

          {filteredData && (
            <TasksTab data={filteredData} onUserClick={handleUserClick} />
          )}
        </div>
      )}
    </>
  );
}
