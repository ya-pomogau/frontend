import { useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';
import { Loader } from 'shared/ui/loader';
import { IFilterValues } from 'features/filter/types';
import { Task } from 'entities/task/types';
import { useEffect, useState } from 'react';
import { getRoleForRequest, handleFilterTasks } from 'shared/libs/utils';
import { defaultObjFilteres } from 'features/filter/consts';
import { useGetTaskCompletedQuery } from 'services/user-task-api';
import { isUnConfirmedSelector } from 'entities/user/model';

export function ProfileCompletedPage() {
  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);

  const { role } = useAppSelector((state) => state.user);
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);

  const isMobile = useMediaQuery('(max-width:1150px)');
  const {
    data: tasks,
    isLoading,
  } = useGetTaskCompletedQuery(getRoleForRequest(role), {
    skip: isUnConfirmed,
  });

  useEffect(() => {
    tasks && handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

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
