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

  const handleTasksFilter = (arr: Task[]) =>
    arr.filter((task: Task) =>
      infoFilterTasks.categories.includes(task.category.name)
    );

  useEffect(() => {
    if (tasks) {
      setFilterTasks(tasks);
    }
    const sortDisplay = (arr: Task[], text: string): Task[] => {
      let sortedTasks: Task[] = [];
      switch (text) {
        case 'date':
          sortedTasks = sortTasks(arr, 'date');
          break;
        case 'decreasingPoints':
          sortedTasks = sortTasks(arr, 'decreasing');
          break;
        case 'increasingPoints':
          sortedTasks = sortTasks(arr, 'increasing');
          break;
        default:
          // Handle default case or invalid text value
          break;
      }
      return sortedTasks;
    };
    if (infoFilterTasks?.categories.length) {
      const filteredTasks = tasks.filter((task: Task) => {
        return infoFilterTasks.categories.includes(task.category.name);
      });
      if (infoFilterTasks?.sortBy) {
        sortDisplay(handleTasksFilter(tasks), infoFilterTasks.sortBy);
      } else {
        setFilterTasks(filteredTasks);
      }
    }
    if (infoFilterTasks?.sortBy) {
      if (infoFilterTasks?.categories.length > 0) {
        setFilterTasks(
          sortDisplay(handleTasksFilter(tasks), infoFilterTasks.sortBy)
        );
      } else {
        setFilterTasks(sortDisplay(tasks, infoFilterTasks.sortBy));
      }
    }
    // eslint-disable-next-line
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

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
                servies: true,
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
