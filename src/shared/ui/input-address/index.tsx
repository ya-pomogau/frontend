import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';

import { Input } from '../input';

interface InputAddressProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string;
  name: string;
  address: {
    address: string;
    coords: [number, number] | [];
  };
  setAddress: (address: string, coords?: [number, number] | []) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  customIcon?: React.ReactNode;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const InputAddress = (props: InputAddressProps) => {
  const {
    initialValue = '',
    inputAttributes = {},
    address,
    setAddress,
    ...otherProps
  } = props;

  const suggestInputRef = useRef<HTMLInputElement>(null);

  // any потому что в библиотеке не написаны типы для SuggestView
  const ymaps: any = useYMaps(['SuggestView', 'geocode']);

  useEffect(() => {
    setAddress(initialValue, []);
  }, []);

  useEffect(() => {
    if (!ymaps) {
      return;
    }

    const suggestView = new ymaps.SuggestView(suggestInputRef?.current, {
      results: 5,
    });

    suggestView.events.add('select', (e: any) => {
      const suggestValue = e.get('item').value;

      const geo = ymaps.geocode(suggestValue);

      // any потому что в библиотеке не написаны типы для SuggestView
      geo.then((res: any) => {
        // Выбираем первый результат геокодирования.
        const firstGeoObject = res.geoObjects.get(0);

        const coords: [number, number] =
          firstGeoObject.geometry.getCoordinates();

        setAddress(suggestValue, coords);
      });
    });
  }, [ymaps]);

  const inputProps = {
    ...inputAttributes,
    ...otherProps,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value, []);
    },
  };

  return (
    <Input
      value={address.address}
      ref={suggestInputRef}
      type="text"
      placeholder="ул. Нахимова, д.9, у подъезда №3"
      {...inputProps}
    />
  );
};
