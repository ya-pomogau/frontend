import { useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';
import { Loader } from 'shared/ui/loader';

import { Task } from 'entities/task/types';
import { useMemo } from 'react';
import { getRoleForRequest, handleFilterTasks } from 'shared/libs/utils';

import { useGetTaskCompletedQuery } from 'services/user-task-api';
import { isUnConfirmedSelector } from 'entities/user/model';
import { Breakpoints } from 'shared/config';
import { filterDataSelector } from '../../features/filter/model';

export function ProfileCompletedPage() {
  const { role } = useAppSelector((state) => state.user);
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);

  const isMobile = useMediaQuery(Breakpoints.XL);
  const { data: tasks, isLoading } = useGetTaskCompletedQuery(
    getRoleForRequest(role),
    {
      skip: isUnConfirmed,
    }
  );

  const { sortBy, categories } = useAppSelector(filterDataSelector);

  const currentTask: Task[] = useMemo(() => {
    if (tasks === undefined) return [];
    if (Boolean(sortBy) || Boolean(categories.length)) {
      if (tasks)
        return handleFilterTasks(tasks, {
          sortBy,
          categories,
        });
    }
    return tasks;
  }, [sortBy, categories, tasks]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          !isUnConfirmed ? (
            <Filter
              items={{
                sortBy: true,
                categories: true,
              }}
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
          tasks={!isUnConfirmed ? currentTask : []}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
