import { memo, useState } from 'react';
import { Map, YMaps, Circle } from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';
import usePermission from 'shared/hooks/use-permission';
import { ACTIVATED, CONFIRMED, VERIFIED } from 'shared/libs/statuses';
import { isTaskUrgent, getBounds } from 'shared/libs/utils';
import Mark from './Mark';
import { LightPopup } from 'shared/ui/light-popup';
import {
  unauthorizedVolunteerPopupMessage,
  thankForAssignTaskMessage,
  cantAssignTaskMessage,
} from 'shared/libs/constants';
import { ConflictIcon } from 'shared/ui/icons/conflict-icon';
import { FinishedApplicationIcon } from 'shared/ui/icons/finished-application-icon';

import type { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { UserRole } from 'shared/types/common.types';

import classNames from 'classnames';
import './styles.css';
import styles from './styles.module.css';

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
  const isGranted = usePermission(
    [CONFIRMED, ACTIVATED, VERIFIED],
    UserRole.VOLUNTEER
  );

  const [isVisible, setVisibility] = useState(false);
  const [isSorryPopupVisible, setSorryPopupVisible] = useState(false);
  const [isThankPopupVisible, setThankPopupVisible] = useState(false);

  const showUnauthorithedPopup = () => {
    setVisibility(true);
  };
  const showSorryPopup = () => {
    setSorryPopupVisible(true);
  };
  const showThankPopup = () => {
    setThankPopupVisible(true);
  };

  const onClickExit = () => {
    setVisibility(false);
    setSorryPopupVisible(false);
    setThankPopupVisible(false);
  };

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
          {tasks?.map((task) => {
            let showPopup = showThankPopup;
            if (task.volunteer !== null) showPopup = showSorryPopup;
            if (!isGranted) showPopup = showUnauthorithedPopup;

            return (
              <Mark
                id={task.id}
                coordinates={task.coordinates}
                isUrgentTask={isTaskUrgent(task.date)}
                fullName={task.recipient.fullname}
                phone={task.recipient.phone}
                avatar={task.recipient.avatar}
                description={task.description}
                count={task.category.scope}
                showPopup={showPopup}
                key={task.id}
                isAuthorised={isAuthorised}
                date={new Date(task.date).toLocaleDateString()}
                time={new Date(task.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
            );
          })}
          {
            //поменялся тип координат на Array<number> -- почему, если у координат всегда длина массива из двух элементов
            coordinates && (
              <Mark coordinates={[coordinates[0], coordinates[1]]} />
            )
          }
          {radius && (
            <Circle
              geometry={[
                [mapSettings.latitude, mapSettings.longitude],
                radius * 1000,
              ]}
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
      {isGranted && (
        <>
          <LightPopup
            isPopupOpen={isThankPopupVisible}
            onClickExit={onClickExit}
            hasCloseButton={true}
          >
            <p
              className={classNames(
                styles.popupTitle,
                'text_size_medium',
                'text_type_bold'
              )}
            >
              {thankForAssignTaskMessage}
            </p>
            <p className={classNames(styles.popupIcon, 'text_size_large')}>
              <FinishedApplicationIcon color="#9798C9" size="101" />
            </p>
          </LightPopup>
          <LightPopup
            isPopupOpen={isSorryPopupVisible}
            onClickExit={onClickExit}
            hasCloseButton={true}
          >
            <p className={classNames(styles.popupTitle, 'text_size_large')}>
              <ConflictIcon color="orange" />
              Извините
            </p>
            <p className={classNames(styles.popupText, 'text_size_medium')}>
              {cantAssignTaskMessage}
            </p>
          </LightPopup>
        </>
      )}
    </>
  );
};

export default memo(YandexMap);
