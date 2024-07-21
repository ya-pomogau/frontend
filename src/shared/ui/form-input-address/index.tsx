import { InputHTMLAttributes, useEffect } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import { GeoCoordinates } from '../../types/point-geojson.types';
import { YMAPS_SUGGEST_SWITCHER } from '../../../config/ymaps/switches-api';
import { FormInput } from '../form-input';

interface FormInputAddressProps<FormInputs extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<FormInputs>;
  name: FieldPath<FormInputs>;
  rules: RegisterOptions<FormInputs> | any;
  setAddress: (address: string, coords?: GeoCoordinates) => void;
  label?: string;
  extClassName?: string;
}

export const FormInputAddress = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  setAddress,
  placeholder,
  extClassName,
}: FormInputAddressProps<T>) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  const ymaps: any = useYMaps(['SuggestView', 'geocode']);

  useEffect(() => {
    if (!ymaps) {
      return;
    }

    if (YMAPS_SUGGEST_SWITCHER) {
      const suggestView = new ymaps.SuggestView(field.name, {
        results: 5,
      });

      suggestView.events.add('select', async (e: any) => {
        const suggestValue = e.get('item').value;

        const geo = ymaps.geocode(suggestValue);

        geo.then((res: any) => {
          // Выбираем первый результат геокодирования.
          const firstGeoObject = res.geoObjects.get(0);

          const coords: GeoCoordinates =
            firstGeoObject.geometry.getCoordinates();

          setAddress(suggestValue, coords);
        });
      });
    } else {
      const geo = ymaps.geocode(field.value);

      // any потому что в библиотеке не написаны типы для SuggestView
      geo.then((res: any) => {
        // Выбираем первый результат геокодирования.
        const firstGeoObject = res.geoObjects.get(0);

        const coords: GeoCoordinates = firstGeoObject.geometry.getCoordinates();
        setAddress(field.value, coords);
      });
    }
  }, [ymaps]);

  return (
    <FormInput
      extClassName={extClassName}
      label={label}
      placeholder={placeholder}
      control={control}
      name={name}
      rules={rules}
    />
  );
};
