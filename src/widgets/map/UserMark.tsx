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

type UserMarkProps = {
  location?: GeoCoordinates;
  draggable?: boolean;
};

const UserMark: FC<UserMarkProps> = ({ location, draggable }: MarkProps) => {
  const dispatch = useAppDispatch();
  const ymaps = useYMaps(['templateLayoutFactory', 'geocode']);

  if (!ymaps) return null;

  const Iconlayout = ymaps.templateLayoutFactory.createClass(
    `{% if properties.isUrgentTask %}
      <div class="mark_container">
        <svg width="53" height="53" viewBox="0 0 53 53" fill="#D60080" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26.5" cy="26.5" r="26.5" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3135 18.7243C20.3135 22.1202 23.1941 24.801 26.8427 24.801C30.4914 24.801 33.3719 22.1202 33.3719 18.7243C33.3719 15.3285 30.4914 12.6475 26.8427 12.6475C23.1941 12.6475 20.3135 15.3285 20.3135 18.7243ZM21.4658 18.7243C21.4658 16.0434 23.7702 13.7198 26.8427 13.7198C29.9153 13.7198 32.4117 16.0434 32.2197 18.7243C32.2197 21.4053 29.9153 23.7286 26.8427 23.7286C23.9622 23.7286 21.4658 21.584 21.4658 18.7243Z" fill="#FBFDFF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2664 44.1036C26.4584 44.2824 26.6504 44.461 26.8425 44.461C27.2264 44.461 27.4186 44.461 27.6106 44.1036L37.7885 23.7283C39.3248 20.3325 39.1327 16.4004 37.0203 13.1832C34.908 10.1448 31.4513 8.17873 27.6106 8H26.2664C22.4257 8.17873 18.969 9.96608 16.8566 13.1832C14.7442 16.4004 14.3601 20.3325 16.0884 23.7283L26.2664 44.1036ZM26.2664 8.89365H27.8027C31.2593 9.07238 34.3318 10.8598 36.2522 13.7195C38.1725 16.5792 38.3646 20.3326 36.8284 23.371L27.0345 42.8524L17.2407 23.371C15.7044 20.3326 15.8964 16.5792 17.8168 13.7195C19.5451 10.8598 22.8098 9.07238 26.2664 8.89365Z" fill="#FBFDFF"/>
        </svg>
      </div> {% else %}
      <div class="mark_container">
        <svg width="53" height="53" viewBox="0 0 53 53" fill="#2E3192" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26.5" cy="26.5" r="26.5" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3135 18.7243C20.3135 22.1202 23.1941 24.801 26.8427 24.801C30.4914 24.801 33.3719 22.1202 33.3719 18.7243C33.3719 15.3285 30.4914 12.6475 26.8427 12.6475C23.1941 12.6475 20.3135 15.3285 20.3135 18.7243ZM21.4658 18.7243C21.4658 16.0434 23.7702 13.7198 26.8427 13.7198C29.9153 13.7198 32.4117 16.0434 32.2197 18.7243C32.2197 21.4053 29.9153 23.7286 26.8427 23.7286C23.9622 23.7286 21.4658 21.584 21.4658 18.7243Z" fill="#FBFDFF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2664 44.1036C26.4584 44.2824 26.6504 44.461 26.8425 44.461C27.2264 44.461 27.4186 44.461 27.6106 44.1036L37.7885 23.7283C39.3248 20.3325 39.1327 16.4004 37.0203 13.1832C34.908 10.1448 31.4513 8.17873 27.6106 8H26.2664C22.4257 8.17873 18.969 9.96608 16.8566 13.1832C14.7442 16.4004 14.3601 20.3325 16.0884 23.7283L26.2664 44.1036ZM26.2664 8.89365H27.8027C31.2593 9.07238 34.3318 10.8598 36.2522 13.7195C38.1725 16.5792 38.3646 20.3326 36.8284 23.371L27.0345 42.8524L17.2407 23.371C15.7044 20.3326 15.8964 16.5792 17.8168 13.7195C19.5451 10.8598 22.8098 9.07238 26.2664 8.89365Z" fill="#FBFDFF"/>
        </svg>
      </div> {% endif %}
      `,
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
