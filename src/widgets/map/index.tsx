import { memo, useEffect, useRef, useState } from 'react';
import { Circle, GeoObject, Map, YMaps } from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';

import { isTaskUrgent } from 'shared/libs/utils';
import { Mark } from './Mark';

import type { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

interface YandexMapProps {
  width?: string | number;
  height?: string | number;
  mapSettings?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  radius?: number | null;
  tasks?: Task[];
  onClick?: () => void;
  coordinates?: GeoCoordinates;
  isAuthorised?: boolean;
}

export const YandexMap = ({
  width = 500,
  height = 500,
  mapSettings = { latitude: 59.93, longitude: 30.31, zoom: 15 },
  radius,
  onClick,
  tasks,
  coordinates,
  isAuthorised,
}: YandexMapProps) => {
  const circleRef = useRef<ymaps.Map | undefined>(undefined);

  const [state, setState] = useState<{
    bounds?: number[][];
    center?: number[];
    zoom?: number;
  }>({
    center: [mapSettings.latitude, mapSettings.longitude],
    zoom: mapSettings.zoom,
  });
  const getBounds = () => {
    radius
      ? setState({
          bounds: circleRef.current?.getBounds(),
        })
      : setState({
          center: [mapSettings.latitude, mapSettings.longitude],
          zoom: mapSettings.zoom,
        });
  };

  useEffect(() => {
    getBounds();
  }, [radius]);

  return (
    <YMaps
      enterprise
      query={{
        load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
        apikey: YMAPS_API_KEY,
      }}
    >
      <Map
        state={state}
        options={{
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        }}
        width={width}
        height={height}
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
            onClick={onClick}
            key={task.id}
            isAuthorised={isAuthorised}
            date={new Date(task.date).toLocaleDateString()}
            time={new Date(task.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
        ))}
        {coordinates && (
          <Mark
            coordinates={
              Array.isArray(coordinates)
                ? coordinates
                : [coordinates.latitude, coordinates.longitude]
            }
          />
        )}
        {radius && (
          <Circle
            instanceRef={circleRef}
            geometry={[[mapSettings.latitude, mapSettings.longitude], radius]}
            options={{
              draggable: false,
              fillColor: '#DB709377',
              strokeColor: '#990066',
              strokeOpacity: 0.8,
              strokeWidth: 5,
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default memo(YandexMap);
