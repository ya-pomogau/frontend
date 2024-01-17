import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { openPopup } from 'features/create-request/model';
import { Request } from 'features/create-request';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { useEffect, useState } from 'react';
import { IFilterValues } from 'features/filter/types';
import { Task } from 'entities/task/types';
import { format } from 'date-fns';
import { sortTasks } from 'shared/libs/utils';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('active');
  const { role } = useAppSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');
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
        text="Активные заявки"
        icon={<Icon color="blue" icon="ActiveApplicationIcon" size="54" />}
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
          userRole={role}
          isMobile={isMobile}
          handleClickCloseButton={() => 2}
          handleClickConfirmButton={() => 3}
          handleClickMessageButton={() => 5}
          handleClickPnoneButton={() => 6}
          handleClickAddTaskButton={() => dispatch(openPopup())}
          isStatusActive
          tasks={filterTasks}
          isLoading={isLoading}
        />
      )}

      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
