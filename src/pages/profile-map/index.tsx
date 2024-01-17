import { useAppSelector } from 'app/hooks';
import YandexMap from 'widgets/map';
import { Filter } from 'features/filter';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { useGetTasksQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMemo } from 'react';
import { Task } from 'entities/task/types';
import {
  filterByDate,
  filterByDistance,
  filterByTime,
} from 'shared/libs/utils';

export function ProfileMapPage() {
  const user = useAppSelector((store) => store.user.data);
  const location = useLocation();
  const query = queryString.parse(location.search);

  const { isLoading, data: tasks } = useGetTasksQuery('', {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const filteredTasks = useMemo((): Task[] => {
    //починить типизацию значений фильтра и убрать лишние условия
    let result: Task[] = tasks ? tasks : [];
    if (result.length && user) {
      if (typeof query.date === 'string') {
        result = result.filter((task: Task) => {
          if (typeof query.date === 'string') {
            return filterByDate(query.date, task.date);
          } else return false;
        });
      }
      if (query.time) {
        result = result.filter((task: Task) => {
          if (Array.isArray(query.time) || typeof query.time === 'string') {
            return filterByTime(query.time, task.date);
          } else return false;
        });
      }

      if (query.searchRadius) {
        const userCoords = Array.isArray(user.coordinates)
          ? user.coordinates
          : [user.coordinates.latitude, user.coordinates.longitude];

        result = result.filter((task: Task) => {
          if (typeof query.searchRadius === 'string' && user.coordinates) {
            return filterByDistance(
              userCoords,
              task.coordinates,
              parseInt(query.searchRadius)
            );
          } else return false;
        });
      }
    }
    return result;
  }, [query.date, query.searchRadius, query.time, tasks, user]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
        filter={
          <Filter
            items={{
              categories: true,
              radius: true,
              date: true,
              time: true,
            }}
          />
        }
      />

      {isLoading ? (
        <Loader />
      ) : (
        tasks && (
          // при рефетче к таскам карта сбрасывается обратно на координаты пользователя
          <YandexMap
            tasks={filteredTasks}
            mapSettings={{
              latitude:
                user && Array.isArray(user.coordinates)
                  ? user.coordinates[0]
                  : 59.938955,
              longitude:
                user && Array.isArray(user.coordinates)
                  ? user.coordinates[1]
                  : 30.315644,
              zoom: 15,
            }}
            radius={
              query.searchRadius && typeof query.searchRadius === 'string'
                ? parseInt(query.searchRadius)
                : undefined
            }
            width="100%"
            height="100%"
            onClick={() => 3}
            coordinates={user?.coordinates}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
