import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

import { Tabs, UserRole } from '../../shared/types/common.types';
import { useGetUserByIdQuery } from 'services/user-api';
import { useGetTaskActiveQuery } from 'services/user-task-api';
import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import SearchButton from 'shared/ui/search-button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { openPopup } from 'features/create-request/model';

import { Request } from 'features/create-request';

interface TaskListProps {
  incomeTab: string;
  handleClickAddTaskButton?: () => void;
  isStatusActive?: boolean;
  userRole?: string;
  userId?: string;
}

export function TasksProfilePage({ incomeTab }: TaskListProps) {
  const { userId } = useParams<{ userId: string }>();
  const { data: user } = useGetUserByIdQuery(userId ?? skipToken);
  const { data: userTasks } = useGetTaskActiveQuery(userId ?? skipToken);
  const navigate = useNavigate();
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  const dispatch = useAppDispatch();
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  const handleClick = () => {
    navigate(-1);
  };

  const isMobile = useMediaQuery('(max-width:1150px)');

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
            incomeTab === Tabs.RECIPIENTS
              ? UserRole.RECIPIENT
              : UserRole.VOLUNTEER
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
