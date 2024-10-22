/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-this-in-sfc */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, memo } from 'react';
import { Placemark, useYMaps } from '@pbe/react-yandex-maps';
import { setAddress } from 'features/create-request/model';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { useAppDispatch } from 'app/hooks';
import { taskMarker } from './icons';

type UserMarkProps = {
  location?: GeoCoordinates;
  draggable?: boolean;
};

const UserMark: FC<UserMarkProps> = ({
  location,
  draggable,
}: UserMarkProps) => {
  const dispatch = useAppDispatch();
  const ymaps = useYMaps(['templateLayoutFactory', 'geocode']);

  if (!ymaps) return null;

  const Iconlayout = ymaps.templateLayoutFactory.createClass(
    taskMarker(false),
    {
      build() {
        Iconlayout.superclass.build.call(this);

        // На метку добавляем кликабильную зону
        this.getData().options.set('shape', {
          type: 'Circle',
          coordinates: [28, 28],
          radius: 30,
        });
      },
    }
  );

  return (
    <Placemark
      geometry={location}
      options={{
        iconLayout: Iconlayout,
        draggable: draggable,
      }}
      // Данный пропс отвечает за возможность получить координату в конце перетаскивания баллуна
      onDragEnd={(event) => {
        const newCoordinates = event.get('target').geometry.getCoordinates();
        // С помощью геокодера конвертируем полученную координату в адрес и отправляем в стор createRequst
        if (ymaps) {
          const geo = ymaps.geocode(newCoordinates);
          geo.then((res) => {
            const firstGeoObject = res.geoObjects.get(0);

            dispatch(
              setAddress({
                additinalAddress: firstGeoObject.getAddressLine(),
                coords: newCoordinates,
              })
            );
          });
        }
      }}
    />
  );
};

export default memo(UserMark);
