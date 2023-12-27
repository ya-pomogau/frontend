import { memo, useEffect, useRef, useState } from 'react';
import { Circle, Map, YMaps } from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';
import usePermission from 'shared/hooks/use-permission';
import { ACTIVATED, CONFIRMED, VERIFIED } from 'shared/libs/statuses';

import { isTaskUrgent } from 'shared/libs/utils';
import Mark from './Mark';
import { LightPopup } from 'shared/ui/light-popup';
import { unauthorizedVolunteerPopupMessage } from 'shared/libs/constants';

import type { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { UserRole } from 'shared/types/common.types';

interface YandexMapProps {
  width?: string | number;
  height?: string | number;
  mapSettings?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  radius?: number;
  tasks?: Task[];
  onClick?: () => void;
  coordinates?: GeoCoordinates | undefined;
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
  const isGranted = usePermission(
    [CONFIRMED, ACTIVATED, VERIFIED],
    UserRole.VOLUNTEER
  );

  const [isVisible, setVisibility] = useState(false);

  const showPopup = () => {
    setVisibility(true);
  };

  const onClickExit = () => {
    setVisibility(false);
  };
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
    <>
      <YMaps
        enterprise
        query={{
          load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
          apikey: YMAPS_API_KEY,
        }}
      >
        <Map
          state={{
            bounds: radius
              ? getBounds([mapSettings.latitude, mapSettings.longitude], radius)
              : undefined,
            center: [mapSettings.latitude, mapSettings.longitude],
            zoom: mapSettings.zoom,
          }}
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
              showPopup={showPopup}
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
      {!isGranted && (
        <LightPopup
          isPopupOpen={isVisible}
          onClickExit={onClickExit}
          hasCloseButton={true}
        >
          {unauthorizedVolunteerPopupMessage}
        </LightPopup>
      )}
    </>
  );
};

export default memo(YandexMap);
