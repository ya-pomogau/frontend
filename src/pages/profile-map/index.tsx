import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { SmartHeader, Icon, Loader } from 'shared/ui';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';
import { userRole } from 'shared/types/common.types';
import { useAppSelector } from 'app/hooks';
import { useGetTaskVirginQuery } from 'services';
import { isUnConfirmedSelector } from 'entities';
import { YandexMap } from 'widgets';
import { Filter } from 'features/filter';

export function ProfileMapPage() {
  const user = useAppSelector((store) => store.user.data);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const isUnconfirmed = useAppSelector(isUnConfirmedSelector);
  const mediaQuery = useMediaQuery(Breakpoints.L);

  const isVolunteer = user?.role === userRole.VOLUNTEER;

  const MAP_ZOOM = 15;
  let latitude = 0;
  let longitude = 0;

  const mapSettings = useMemo(() => {
    const [userLatitude, userLongitude] =
      user && Array.isArray(user.location)
        ? [user.location[0], user.location[1]]
        : [55.755819, 37.617713];

    return {
      latitude: userLatitude,
      longitude: userLongitude,
      zoom: MAP_ZOOM,
    };
  }, [user]);

  const radius =
    query.searchRadius && typeof query.searchRadius === 'string'
      ? parseInt(query.searchRadius)
      : undefined;

  if (user && user.location) {
    // обязателен именно такой порядок
    longitude = user.location[0];
    latitude = user.location[1];
  }

  const { data: tasks, isLoading } = useGetTaskVirginQuery([
    userRole.VOLUNTEER.toLocaleLowerCase(),
    latitude,
    longitude,
  ]);

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
            mapSettings={mapSettings}
            radius={radius}
            width="100%"
            height={mediaQuery ? '75vh' : '709px'}
            coordinates={user?.location}
            role={user && user.role}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
