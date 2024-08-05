import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { isUnConfirmedSelector } from '../../entities/user/model';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useMediaQuery } from '../../shared/hooks';
import { useGetTaskVirginQuery } from '../../services/user-task-api';
import { startSocketConnection } from '../../services/system-slice';

import { YandexMap } from '../../widgets/map';
import { Filter } from '../../features/filter';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Icon } from '../../shared/ui/icons';
import { Loader } from '../../shared/ui/loader';

export function ProfileMapPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const isUnconfirmed = useAppSelector(isUnConfirmedSelector);
  const isVolunteer = user?.role === 'Volunteer';

  useEffect(() => {
    if (user) {
      dispatch(startSocketConnection());
    }
  }, [user]);

  let latitude = 0;
  let longitude = 0;
  if (user && user.location) {
    // обязателен именно такой порядок
    [longitude, latitude] = user.location;
  }
  const { data: tasks, isLoading } = useGetTaskVirginQuery([
    'volunteer',
    latitude,
    longitude,
  ]);
  const mediaQuery = useMediaQuery('(max-width: 910px)');
  const containerHeight =
    user?.status === 0
      ? mediaQuery
        ? '62vh'
        : 'calc(64vh - 78px)'
      : mediaQuery
      ? '75vh'
      : '64vh';

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
