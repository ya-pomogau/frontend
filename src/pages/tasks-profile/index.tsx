import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { UserCardForTasks } from 'widgets';
import { openPopup } from 'features/create-request/model';
import { Request } from 'features/create-request';
import { TaskList } from 'entities';
import { Task } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import {
  useGetAdminUserByIdQuery,
  useGetAdminUserTasksByIdQuery,
} from 'services/user-api';
import { Icon, SmartHeader, SearchButton } from 'shared/ui';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';
import { tabs, userRole } from 'shared/types/common.types';

import styles from './styles.module.css';

interface TaskListProps {
  incomeTab: string;
}

export function TasksProfilePage({ incomeTab }: TaskListProps) {
  const dispatch = useAppDispatch();
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  const { userId } = useParams();
  const navigate = useNavigate();

  const user = useGetAdminUserByIdQuery(userId ?? skipToken)
    .data as UserProfile;
  const userTasks = useGetAdminUserTasksByIdQuery(userId ?? skipToken)
    .data as Task[];

  const isMobileForPopup = useMediaQuery(Breakpoints.M);
  const isMobile = useMediaQuery(Breakpoints.XL);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
        text="Создание / Редактирование заявки"
      />
      <SearchButton text="Поиск" onClick={handleClick} />
      <div className={styles.userCards}>
        {user && <UserCardForTasks user={user} />}
      </div>
      <div className={styles.taskContainer}>
        <TaskList
          userRole={
            incomeTab === tabs.RECIPIENTS
              ? userRole.RECIPIENT
              : userRole.VOLUNTEER
          }
          isMobile={isMobile}
          handleClickAddTaskButton={() => dispatch(openPopup())}
          isStatusActive
          tasks={userTasks || []}
          isLoading={false}
          isTabPage
        />
        {isPopupOpen && <Request isMobile={isMobileForPopup} />}
      </div>
    </>
  );
}
