import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetTaskVirginQuery } from '../../services/user-task-api';
import { isUnConfirmedSelector } from '../../entities/user/model';
import { userRole } from '../../shared/types/common.types';
import { startSocketConnection } from '../../services/system-slice';
import { YandexMap } from '../../widgets/map';
import { Filter } from '../../features/filter';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Icon } from '../../shared/ui/icons';
import { Loader } from '../../shared/ui/loader';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

export function ProfileMapPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const isUnconfirmed = useAppSelector(isUnConfirmedSelector);
  const mediaQuery = useMediaQuery(Breakpoints.L);

  useEffect(() => {
    if (user) {
      dispatch(startSocketConnection());
    }
  }, [user]);

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

  // const containerHeight = isUnconfirmed
  //   ? 'clamp(60dvh, 75dvh - 10vw, 75dvh)'
  //   : // : 'clamp(37.5rem, 36.298rem + 4.808vw, 40.625rem)';
  //     'clamp(78dvh, 85dvh - 10vw, 85dvh)';

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
            // height={containerHeight}
            height={mediaQuery ? '75vh' : '709px'}
            onClick={() => console.log('1sad')}
            coordinates={user?.location}
            role={user && user.role}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
