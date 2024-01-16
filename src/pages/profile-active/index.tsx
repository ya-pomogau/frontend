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
    time: ['', ''],
  });
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);

  const sortTasks = (
    arr: Task[],
    item: 'date' | 'decreasing' | 'increasing'
  ) => {
    const sortedTasks = [...arr].sort((a, b) => {
      const aValue = item === 'date' ? a.date : a.category.scope;
      const bValue = item === 'date' ? b.date : b.category.scope;
      const order = item === 'decreasing' ? -1 : 1;

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

  useEffect(() => {
    // получение данных
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
    // сортировка по дисплею
    if (infoFilterTasks?.sortBy) {
      sortDisplay(tasks, infoFilterTasks.sortBy);
    }
    // сортировка по категориям
    if (infoFilterTasks?.categories.length) {
      const filteredTasks = tasks.filter((task: Task) =>
        infoFilterTasks.categories.includes(task.category.id + '')
      );
      if (infoFilterTasks?.sortBy) {
        sortDisplay(filteredTasks, infoFilterTasks.sortBy);
      }
    }
    if (infoFilterTasks?.searchRadius) {
      switch (infoFilterTasks?.searchRadius) {
        case '1':
          sortDisplay(tasks, 'date');
          break;
        case '4':
          sortDisplay(tasks, 'decreasing');
          break;
        case '5':
          sortDisplay(tasks, 'date');
          break;
      }
    }

    if (
      infoFilterTasks?.time[0] > '00:00' &&
      infoFilterTasks?.time[1] > '00:00'
    ) {
      const filterTaskTime = tasks.filter((item: Task) => {
        console.log('render');
        const date = format(new Date(item.date), 'kk:mm');
        return infoFilterTasks.time[0] < date && date < infoFilterTasks.time[1];
      });
      // if (infoFilterTasks.sortBy) {
      //   setFilterTasks(sortDisplay(filterTaskTime, infoFilterTasks.sortBy));
      // }
      setFilterTasks(filterTaskTime);
    }
  }, [
    infoFilterTasks,
    infoFilterTasks?.sortBy,
    tasks,
    infoFilterTasks?.categories,
    infoFilterTasks?.searchRadius,
    infoFilterTasks?.time,
  ]);

  // useEffect(() => {
  //   if (infoFilterTasks?.time) {
  //     const filterTaskTime = tasks.filter((item: Task) => {
  //       const date = format(new Date(item.date), 'kk:mm');
  //       return infoFilterTasks.time[0] < date && date < infoFilterTasks.time[1];
  //     });
  //     setFilterTasks(filterTaskTime);
  //   }
  // }, [infoFilterTasks?.time, tasks]);

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
