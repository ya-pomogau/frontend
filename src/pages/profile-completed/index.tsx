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
import { sortTasks } from 'shared/libs/utils';

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
    if (tasks) {
      setFilterTasks(tasks);
    }
    const sortDisplay = (arr: Task[], text: string) => {
      switch (text) {
        case 'date':
          setFilterTasks(sortTasks(arr, 'date'));
          break;
        case 'decreasingPoints':
          setFilterTasks(sortTasks(arr, 'decreasing'));
          break;
        case 'increasingPoints':
          setFilterTasks(sortTasks(arr, 'increasing'));
          break;
      }
    };
    if (infoFilterTasks?.sortBy) {
      sortDisplay(tasks, infoFilterTasks.sortBy);
    }
  }, [tasks, infoFilterTasks.sortBy]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          role === 'volunteer' ? (
            <Filter
              items={{
                sort: true,
                categories: false,
                radius: false,
                date: false,
              }}
              setFilteres={setInfoFilterTasks}
            />
          ) : (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: false,
                date: false,
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
          userRole="volunteer"
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
