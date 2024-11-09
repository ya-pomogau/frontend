import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Circle,
  GeolocationControl,
  Map,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

import { YMAPS_API_KEY } from 'config/ymaps/api-keys';
import { usePermission } from 'shared/hooks';
import { LightPopup, Icon, Typography } from 'shared/ui';
import { getBounds } from 'shared/libs/utils';
import Mark from './Mark';
import {
  unauthorizedVolunteerPopupMessage,
  thankForAssignTaskMessage,
  cantAssignTaskMessage,
  unauthorizedUserPopupMessage,
} from 'shared/libs/constants';
import UserMark from './UserMark';
import { setAddress } from 'features/create-request/model';
import { useAppDispatch } from 'app/hooks';

import type { Task } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { userRole, UserRole, userStatus } from 'shared/types/common.types';

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

  const dispatch = useAppDispatch();
  const [isVisible, setVisibility] = useState(false);
  const [isSorryPopupVisible, setSorryPopupVisible] = useState(false);
  const [isThankPopupVisible, setThankPopupVisible] = useState(false);
  const [coords, setCoords] = useState(coordinates);
  const mapRef = useRef<ymaps.Map>();
  const ymap = useRef<YMapsApi>();

  useEffect(() => {
    setCoords(coordinates);
  }, [coordinates]);

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
    if (mapRef.current) {
      const [x, y] = task.location.coordinates;
      mapRef.current.setCenter([x - 0.004, y], 15, {
        checkZoomRange: true,
      });
    }
  };

  const onMapLoad = useCallback((refApi: YMapsApi) => {
    ymap.current = refApi;
  }, []);

  const handleMapClick = (event: ymaps.IEvent) => {
    const clickedCoordinates = event.get('coords');
    if (clickedCoordinates) {
      setCoords(clickedCoordinates);

      if (ymap.current) {
        const geo = ymap.current.geocode(clickedCoordinates);
        geo.then((res) => {
          const geoObject = res.geoObjects.get(0);

          dispatch(
            setAddress({
              additinalAddress: (
                geoObject as ymaps.GeocodeResult
              ).getAddressLine(),
              coords: clickedCoordinates,
            })
          );
        });
      }
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
          instanceRef={mapRef}
          onLoad={onMapLoad}
          onClick={handleMapClick}
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
              location={coords}
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
            extButtonPosition={styles.closeButton_position}
          >
            <Typography
              tag={'h3'}
              variant={'paragraph-bold'}
              content={thankForAssignTaskMessage}
              extraClass={classNames(
                styles.popupTitle,
                styles.popupTitle_thank
              )}
            />
            <div className={classNames(styles.popupIcon)}>
              <Icon icon="FinishedApplicationIcon" color="#9798C9" size="101" />
            </div>
          </LightPopup>
          <LightPopup
            isPopupOpen={isSorryPopupVisible}
            onClickExit={onClickExit}
            hasCloseButton={true}
            extClassName={styles.container_sorry}
          >
            <Typography
              tag={'h3'}
              variant={'titleResize'}
              extraClass={styles.popupTitle}
            >
              <Icon icon="ConflictIcon" color="orange" />
              Извините
            </Typography>
            <Typography
              color={'darkGray'}
              content={cantAssignTaskMessage}
              extraClass={styles.popupText}
            />
          </LightPopup>
        </>
      )}
    </>
  );
};

export default memo(YandexMap);
