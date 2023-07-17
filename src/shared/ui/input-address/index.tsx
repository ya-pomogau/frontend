/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useMemo, useState } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';

import { Input } from '../input';

interface InputAddressProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue: string;
  name: string;
  inputChange: (address: string, coord?: [number, number]) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  customIcon?: React.ReactNode;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const InputAddress = (props: InputAddressProps) => {
  const {
    initialValue,
    inputChange,
    inputAttributes = {},
    ...otherProps
  } = props;

  const [address, setAddress] = useState(initialValue);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ymaps: any = useYMaps(['SuggestView', 'geocode']);
  const id = useMemo(() => `address-${Math.random()}`, []);

  useEffect(() => {
    if (!ymaps) {
      return;
    }
    // eslint-disable-next-line no-new
    const suggestView = new ymaps.SuggestView(id);
    // eslint-disable-next-line no-underscore-dangle
    suggestView.events.add('select', (e: any) => {
      setAddress(e.get('item').displayName);
      const geo = ymaps.geocode(e.get('item').displayName);
      geo.then((res: any) => {
        // Выбираем первый результат геокодирования.
        const firstGeoObject = res.geoObjects.get(0);
        // Координаты геообъекта.
        const coords = firstGeoObject.geometry.getCoordinates();

        inputChange(e.get('item').value, coords);
      });
    });
  }, [ymaps, id, inputChange]);

  const inputProps = {
    ...inputAttributes,
    ...otherProps,
    id,
    value: address,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
      inputChange(event.target.value);
    },
    placeholder: 'ул. Нахимова, д.9, у подъезда №3',
    type: 'text',
  };

  return <Input {...inputProps} />;
};
