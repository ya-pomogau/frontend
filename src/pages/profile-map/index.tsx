import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import YandexMap from 'widgets/map';

import { Filter } from 'features/filter';

import { fetchAvailableTasks } from 'entities/task/model';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { useGetTasksQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';

export function ProfileMapPage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.data);
  // const { role } = useAppSelector((store) => store.user);
  // const { tasks } = useAppSelector((store) => store.tasks);

  const { isLoading, data } = useGetTasksQuery('', {
    pollingInterval: 30000,
  });

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, []);

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
        data && (
          // при рефетче к таскам карта сбрасывается обратно на координаты пользователя
          <YandexMap
            tasks={data}
            mapSettings={{
              latitude: user ? user.coordinates[0] : 59.938955,
              longitude: user ? user.coordinates[1] : 30.315644,
              zoom: 15,
            }}
            width="100%"
            height="100%"
            onClick={() => 3}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
