import { memo, useEffect, useRef, useState } from 'react';
import {
  Circle,
  GeolocationControl,
  Map,
  useYMaps,
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
import { setAddress } from 'features/create-request/model';
import { useAppDispatch } from 'app/hooks';
// import YMapsMap from '@pbe/react-yandex-maps/typings/Map';

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
  mapSettings = { latitude: 55.755819, longitude: 37.617713, zoom: 15 },
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
  const ref = useRef<any>(null);
  const ymaps = useYMaps(['templateLayoutFactory', 'geocode']);
  const [mapCenterSettings, setMapCenterSettings] = useState(mapSettings);

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
    if (ref.current) {
      const [x, y] = task.location.coordinates;
      ref.current.setCenter([x - 0.004, y], 15, {
        checkZoomRange: true,
      });
    }
  };

  const handeleBallonclick = (e: ymaps.IEvent) => {
    const placemarkCoords = e.get('coords');
    const [x, y] = placemarkCoords;
    setMapCenterSettings({
      ...mapSettings,
      latitude: x,
      longitude: y,
    });
  };

  const handleMapClick = (event: ymaps.IEvent) => {
    const clickedCoordinates = event.get('coords');
    // console.log(event.getSourceEvent());
    // console.log(clickedCoordinates);
    if (clickedCoordinates) {
      setCoords(clickedCoordinates);

      if (ymaps) {
        const geo = ymaps.geocode(clickedCoordinates);
        geo.then((res) => {
          const geoObject = res.geoObjects.get(0);
          // console.log(geoObject.properties._data.text);
          // console.log(geoObject.getAddressLine());
          dispatch(
            setAddress({
              additinalAddress: geoObject.getAddressLine(),
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
              ? getBounds(
                  [mapCenterSettings.latitude, mapCenterSettings.longitude],
                  radius
                )
              : undefined,
            center: [mapCenterSettings.latitude, mapCenterSettings.longitude],
            zoom: mapCenterSettings.zoom,
          }}
          options={{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }}
          width={width}
          height={height}
          instanceRef={ref}
          onClick={handleMapClick}
        >
          <GeolocationControl options={{ float: 'left' }} />
          <ZoomControl options={{ position: { top: 5, right: 5 } }} />
          {tasks?.map((task) => {
            return (
              <Mark
                task={task}
                onClick={handeleBallonclick}
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
                [mapCenterSettings.latitude, mapCenterSettings.longitude],
                radius * 100,
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
