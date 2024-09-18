import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

import { tabs, userRole } from '../../shared/types/common.types';
import {
  useGetAdminUserByIdQuery,
  useGetAdminUserTasksByIdQuery,
} from 'services/user-api';
import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import SearchButton from 'shared/ui/search-button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { openPopup } from 'features/create-request/model';
import { Request } from 'features/create-request';
import { Task } from 'entities/task/types';
import { Breakpoints } from 'shared/config';
import { UserProfile } from '../../entities/user/types';

interface TaskListProps {
  incomeTab: string;
}

export function TasksProfilePage({ incomeTab }: TaskListProps) {
  const { userId } = useParams();
  const user = useGetAdminUserByIdQuery(userId ?? skipToken)
    .data as UserProfile;
  const userTasks = useGetAdminUserTasksByIdQuery(userId ?? skipToken)
    .data as Task[];

  const navigate = useNavigate();
  const isMobileForPopup = useMediaQuery(Breakpoints.M);

  const dispatch = useAppDispatch();
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  const handleClick = () => {
    navigate(-1);
  };

  const isMobile = useMediaQuery(Breakpoints.XL);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
        text="Создание / Редактирование заявки"
        // filter={<Filter items={{ userCategories: true }} />}
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
