import { useAppSelector } from 'app/hooks';
import { YandexMap } from 'widgets/map';
import { Filter } from 'features/filter';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { useGetTasksQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { Task } from 'entities/task/types';
import {
  filterByDate,
  filterByDistance,
  filterByTime,
} from 'shared/libs/utils';
import { useGetTaskVirginQuery } from 'services/user-task-api';
import { useMediaQuery } from 'shared/hooks';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { isUnConfirmedSelector } from 'entities/user/model';

export function ProfileMapPage() {
  const user = useAppSelector((store) => store.user.data);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const isUnconfirmed = useAppSelector(isUnConfirmedSelector);
  const isVolunteer = user?.role === 'Volunteer';

  let latitude = 0;
  let longitude = 0;
  if (user && user.location) {
    // обязателен именно такой порядок
    [longitude, latitude] = user.location;
  }
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTaskVirginQuery(['volunteer', latitude, longitude]);
  const mediaQuery = useMediaQuery('(max-width: 910px)');
  const containerHeight =
    user?.status === 0
      ? mediaQuery
        ? '62vh'
        : 'calc(64vh - 78px)'
      : mediaQuery
      ? '75vh'
      : '64vh';

  // TODO: для чего этот фильтр для тасок?
  // const filteredTasks = useMemo((): Task[] => {
  //   //починить типизацию значений фильтра и убрать лишние условия
  //   let result: Task[] = tasks ? tasks : [];
  //   if (result.length && user) {
  //     const { date, time, searchRadius } = query;
  //     if (date && typeof date === 'string') {
  //       result = result.filter((task: Task) => filterByDate(date, task.date!));
  //     }

  //     if (time && (typeof time === 'string' || Array.isArray(time))) {
  //       result = result.filter(
  //         (task: Task) => task.date && filterByTime(time, task.date!)
  //       );
  //     }

  //     if (searchRadius && user.location && typeof searchRadius === 'string') {
  //       result = result.filter((task: Task) =>
  //         filterByDistance(
  //           user.location!,
  //           task.location,
  //           parseInt(searchRadius, 10)
  //         )
  //       );
  //     }
  //   }
  //   return result;
  // }, [query, tasks, user]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
        filter={
          !isUnconfirmed && isVolunteer ? (
            <Filter
              items={{
                categories: true,
                radius: true,
                date: true,
                time: true,
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
        tasks && (
          // при рефетче к таскам карта сбрасывается обратно на координаты пользователя
          <YandexMap
            tasks={tasks}
            mapSettings={{
              latitude:
                user && Array.isArray(user.location)
                  ? user.location[0]
                  : 59.938955,
              longitude:
                user && Array.isArray(user.location)
                  ? user.location[1]
                  : 30.315644,
              zoom: 15,
            }}
            radius={
              query.searchRadius && typeof query.searchRadius === 'string'
                ? parseInt(query.searchRadius)
                : undefined
            }
            width="100%"
            height={containerHeight}
            onClick={() => 3}
            coordinates={user?.location}
            role={user && user.role}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
