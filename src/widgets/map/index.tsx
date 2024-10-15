import { memo, useRef, useState } from 'react';
import {
  Circle,
  GeolocationControl,
  Map,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';
import usePermission from 'shared/hooks/use-permission';
import { getBounds } from 'shared/libs/utils';
import Mark from './Mark';
import { LightPopup } from 'shared/ui/light-popup';
import {
  unauthorizedVolunteerPopupMessage,
  thankForAssignTaskMessage,
  cantAssignTaskMessage,
  unauthorizedUserPopupMessage,
} from 'shared/libs/constants';
import { Icon } from 'shared/ui';

import type { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { userRole, UserRole, userStatus } from 'shared/types/common.types';

import classNames from 'classnames';
import './styles.css';
import styles from './styles.module.css';
import UserMark from './UserMark';

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
  role?: UserRole | null;
  isAuthorised?: boolean;
}

export const YandexMap = ({
  width = 500,
  height = 500,
  mapSettings = { latitude: 55.890017, longitude: 37.621157, zoom: 15 },
  radius,
  onClick,
  tasks,
  coordinates,
  role,
  isAuthorised,
}: YandexMapProps) => {
  const isGranted = usePermission(
    [userStatus.CONFIRMED, userStatus.ACTIVATED, userStatus.VERIFIED],
    userRole.VOLUNTEER
  );

  const [isVisible, setVisibility] = useState(false);
  const [isSorryPopupVisible, setSorryPopupVisible] = useState(false);
  const [isThankPopupVisible, setThankPopupVisible] = useState(false);
  const ref = useRef<any>(null);

  const showUnauthorithedPopup = () => {
    setVisibility(true);
  };
  const showSorryPopup = () => {
    setSorryPopupVisible(true);
  };
  const showThankPopup = () => {
    setThankPopupVisible(true);
  };

  const showPopup = (isVolunteerSelected: boolean) => {
    if (!isGranted) showUnauthorithedPopup();
    isVolunteerSelected ? showThankPopup() : showSorryPopup();
  };

  const onClickExit = () => {
    setVisibility(false);
    setSorryPopupVisible(false);
    setThankPopupVisible(false);
  };

  const onOpenTask = (task: Task) => {
    if (ref.current) {
      const [x, y] = task.location.coordinates;
      ref.current.setCenter([x - 0.004, y], 15, {
        checkZoomRange: true,
      });
    }
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
          instanceRef={ref}
        >
          <GeolocationControl options={{ float: 'left' }} />
          <ZoomControl options={{ position: { top: 5, right: 5 } }} />
          {tasks?.map((task) => {
            return (
              <Mark
                task={task}
                onClick={onClick}
                showPopup={showPopup}
                key={task._id}
                onOpenTask={onOpenTask}
                isAuthorised={isAuthorised}
              />
            );
          })}
          {
            <UserMark
              location={coordinates}
              draggable={role === userRole.RECIPIENT}
            />
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
          {isAuthorised
            ? unauthorizedVolunteerPopupMessage
            : unauthorizedUserPopupMessage}
        </LightPopup>
      )}
      {isGranted && (
        <>
          <LightPopup
            isPopupOpen={isThankPopupVisible}
            onClickExit={onClickExit}
            hasCloseButton={true}
            extClassName={styles.container_thank}
          >
            <p
              className={classNames(
                styles.popupTitle,
                styles.popupTitle_thank,
                'text_type_bold'
              )}
            >
              {thankForAssignTaskMessage}
            </p>
            <p className={classNames(styles.popupIcon, 'text_size_large')}>
              <Icon icon="FinishedApplicationIcon" color="#9798C9" size="101" />
            </p>
          </LightPopup>
          <LightPopup
            isPopupOpen={isSorryPopupVisible}
            onClickExit={onClickExit}
            hasCloseButton={true}
            extClassName={styles.container_sorry}
          >
            <p className={classNames(styles.popupTitle, 'text_size_large')}>
              <Icon icon="ConflictIcon" color="orange" />
              Извините
            </p>
            <p className={classNames(styles.popupText)}>
              {cantAssignTaskMessage}
            </p>
          </LightPopup>
        </>
      )}
    </>
  );
};

export default memo(YandexMap);
