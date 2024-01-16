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

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('active');
  const { role } = useAppSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');
  const [infoFilterTasks, setInfoFilterTasks] = useState<IFilterValues>();
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);

  const sortTasks = (
    arr: Task[],
    item: 'date' | 'decreasing' | 'increasing'
  ) => {
    const sortedTasks = [...arr].sort((a, b) => {
      const aValue = item === 'date' ? a.date : a.category.scope;
      const bValue = item === 'date' ? b.date : b.category.scope;
      const order = item === 'increasing' ? -1 : 1;

      if (aValue > bValue) {
        return order;
      }
      if (aValue < bValue) {
        return -order;
      }
      return 0;
    });
    return sortedTasks;
  };

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

  useEffect(() => {
    // получение данных
    if (tasks) {
      setFilterTasks(tasks);
    }
    // сортировка по дисплею
    if (infoFilterTasks?.sortBy) {
      sortDisplay(tasks, infoFilterTasks.sortBy);
    }
    // сортировка по категориям
    if (infoFilterTasks?.categories.length) {
      const filteredTasks = tasks.filter((task: Task) =>
        infoFilterTasks.categories.includes(task.category.id + '')
      );
      console.log(filteredTasks);
      console.log(infoFilterTasks?.sortBy);
      if (infoFilterTasks?.sortBy) {
        sortDisplay(filteredTasks, infoFilterTasks.sortBy);
      }
    }
  }, [infoFilterTasks?.sortBy, tasks, infoFilterTasks?.categories]);

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
                categories: true,
                radius: true,
                date: false,
                time: true,
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
