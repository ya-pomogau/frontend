import { useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { IFilterValues } from 'features/filter/types';
import { Taskschema } from 'entities/task/types';
import { useEffect, useState } from 'react';
import { handleFilterTasks } from 'shared/libs/utils';
import { UserRole } from 'shared/types/common.types';
import { defaultObjFilteres } from 'features/filter/consts';
import { UNCONFIRMED } from 'shared/libs/statuses';

export function ProfileCompletedPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('completed');
  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Taskschema[]>([]);

  useEffect(() => {
    handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
    // eslint-disable-next-line
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

  const isConfirmed = useAppSelector((state) => {
    return state.user.data?.status === UNCONFIRMED;
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          !isConfirmed ? (
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
          userRole={UserRole.VOLUNTEER}
          isMobile={isMobile}
          isStatusActive={false}
          tasks={!isConfirmed ? filterTasks : []}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
