import { memo, useRef, useCallback } from 'react';
import { Map, YMaps } from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps';

import { isTaskUrgent } from 'shared/libs/utils';
import { Mark } from './Mark';

import type { Task } from 'entities/task/types';

interface YandexMapProps {
  width?: string | number;
  height?: string | number;
  mapSettings?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  tasks?: Task[];
  onClick?: () => void;
  coordinates?: [number, number];
  isAuthorised?: boolean;
}

export const YandexMap = ({
  width = 500,
  height = 500,
  mapSettings = { latitude: 59.93, longitude: 30.31, zoom: 15 },
  onClick,
  tasks,
  coordinates,
  isAuthorised,
}: YandexMapProps) => {
  const mapRef = useRef<any>(null);

  const handleMarkClick = useCallback((coords: [number, number]) => {
    return async () => {
      const transitionSettings = {
        duration: 0,
      };

      await mapRef.current?.setZoom(15, transitionSettings);
      await mapRef.current?.panTo(
        [coords[0] - 0.005, coords[1]],
        transitionSettings
      );

      onClick && onClick();
    };
  }, []);

  return (
    <YMaps
      enterprise
      query={{
        load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
        apikey: YMAPS_API_KEY,
      }}
    >
      <Map
        defaultState={{
          center: [mapSettings.latitude, mapSettings.longitude],
          zoom: mapSettings.zoom,
        }}
        options={{
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        }}
        width={width}
        height={height}
        instanceRef={mapRef}
      >
        {tasks?.map((task) => (
          <Mark
            id={task.id}
            coordinates={task.coordinates}
            isUrgentTask={isTaskUrgent(task.date)}
            fullName={task.recipient.fullname}
            phone={task.recipient.phone}
            avatar={task.recipient.avatar}
            description={task.description}
            count={task.category.scope}
            onClick={handleMarkClick(task.coordinates)}
            key={task.id}
            isAuthorised={isAuthorised}
            date={new Date(task.date).toLocaleDateString()}
            time={new Date(task.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
        ))}

        <Mark coordinates={coordinates} />
      </Map>
    </YMaps>
  );
};

export default memo(YandexMap);
