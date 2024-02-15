import { useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { IFilterValues } from 'features/filter/types';
import { Task } from 'entities/task/types';
import { useEffect, useState } from 'react';
import { handleFilterTasks } from 'shared/libs/utils';
import { UserRole, UserStatus } from 'shared/types/common.types';
import { defaultObjFilteres } from 'features/filter/consts';
import { useGetTaskCompletedQuery } from 'services/user-task-api';

export function ProfileCompletedPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  // const { data: tasks, isLoading } = useGetTasksByStatusQuery('completed');
  const { role } = useAppSelector((state) => state.user);
  let query = '';
  if (role === UserRole.RECIPIENT) {
    query = UserRole.RECIPIENT.toLowerCase();
  } else {
    query = UserRole.VOLUNTEER.toLowerCase();
  }
  const { data: tasks, error, isLoading } = useGetTaskCompletedQuery(query);
  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasks && handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
    // eslint-disable-next-line
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

  const isUnConfirmed = useAppSelector((state) => {
    return state.user.data?.status === UserStatus.UNCONFIRMED;
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          !isUnConfirmed ? (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: false,
                date: false,
              }}
              setFilteres={setInfoFilterTasks}
            />
          ) : (
            <></>
          )
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TaskList
          userRole={role}
          isMobile={isMobile}
          isStatusActive={false}
          tasks={!isUnConfirmed ? filterTasks : []}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
