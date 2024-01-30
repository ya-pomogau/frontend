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
import { UserRole } from 'shared/types/common.types';


export function ProfileCompletedPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('completed');
  const { role } = useAppSelector((state) => state.user);
  const [infoFilterTasks, setInfoFilterTasks] = useState<IFilterValues>({
    sortBy: '',
    categories: [],
    searchRadius: '',
    date: '',
    time: ['00:00', '00:00'],
  });
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);

  useEffect(() => {
    handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
    // eslint-disable-next-line
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          role === UserRole.VOLUNTEER ? (
            <Filter
              items={{
                sort: true,
                categories: false,
                radius: false,
                date: false,
                servies: true,
              }}
              setFilteres={setInfoFilterTasks}
            />
          ) : (
            <Filter
              items={{
                sort: true,
                categories: false,
                radius: false,
                date: false,
                servies: true,
              }}
              setFilteres={setInfoFilterTasks}
            />
          )
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TaskList
          userRole={UserRole.VOLUNTEER}
          isMobile={isMobile}
          handleClickCloseButton={() => 2}
          handleClickConfirmButton={() => 3}
          handleClickMessageButton={() => 5}
          handleClickPnoneButton={() => 6}
          isStatusActive={false}
          tasks={filterTasks}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
