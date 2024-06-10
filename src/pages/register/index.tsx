import { FormEvent, useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';
import { FilterItemsIds } from 'features/filter/consts';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import useForm from 'shared/hooks/use-form';
import { InputPhone } from 'shared/ui/inputPhone';

export interface IRegisterForm {
  name: string;
  phone: string;
  address: {
    address: string;
    coords: GeoCoordinates;
  };
}

export function RegisterPage() {
  const vkUser = useAppSelector(vkUserSelector);
  const {
    first_name = '',
    last_name = '',
    id = '',
    photo_max_orig = '',
  } = vkUser ?? {};
  const FIO = `${first_name} ${last_name}`;
  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });
  const { values, handleChange } = useForm<IRegisterForm>({
    name: '',
    phone: '',
    address: { address: '', coords: [] },
  });

  const handleError = (type: 'name' | 'phone' | 'address') => {
    switch (type) {
      case 'name':
        setError({ ...error, [type]: values[type].length < 4 });
        break;
      case 'address':
        setError({ ...error, [type]: address.address.length < 4 });
        break;
      default:
        console.log('error');
    }
  };

  const [role, setRole] = useState<UserRole>(UserRole.VOLUNTEER);
  const [address, setAddress] = useState<{
    address: string;
    coords: GeoCoordinates;
  }>({
    address: '',
    coords: [],
  });
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const vk_id = `${id}`;
    const user = {
      name: values.name,
      phone: values.phone,
      address: address.address,
      avatar: photo_max_orig,
      location: {
        type: 'Point',
        coordinates: address.coords,
      },
      vkId: vk_id,
      role: role,
    };
    dispatch(newUserThunk(user));
  };

  const handleAddressValueChange = (
    newAddress: string,
    coords?: GeoCoordinates
  ) => {
    setAddress({
      address: newAddress,
      coords: coords || [],
    });
  };
  const handleRoleButtonClick = (checkRole: UserRole) => {
    setRole(checkRole);
  };
  // определение внешнего вида кнопки выбора роли
  const getRoleButtonType = (userRole: string) =>
    role === userRole ? 'primary' : 'secondary';

  const disabledBtn = error.name || error.phone || error.address;

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.buttonContainer}>
          <Button
            buttonType={getRoleButtonType(FilterItemsIds.VOLUNTEER)}
            size="extraLarge"
            label="Хочу помочь"
            id={FilterItemsIds.VOLUNTEER}
            onClick={() => handleRoleButtonClick(FilterItemsIds.VOLUNTEER)}
            actionType="button"
          />
          <Button
            buttonType={getRoleButtonType(FilterItemsIds.RECIPIENT)}
            size="extraLarge"
            label="Нужна помощь"
            id={FilterItemsIds.RECIPIENT}
            onClick={() => handleRoleButtonClick(FilterItemsIds.RECIPIENT)}
            actionType="button"
          />
        </div>
        <Input
          onBlur={() => handleError('name')}
          extClassName={styles.field}
          required
          label="ФИО"
          name="name"
          value={values.name}
          error={error.name}
          errorText="Имя должно содержать больше символов"
          onChange={handleChange}
          placeholder="ФИО"
          type="text"
        />

        <InputPhone
          onBlur={() => handleError('phone')}
          error={error.phone}
          errorText="Некорректный номер телефона"
          extClassName={styles.field}
          label="Телефон"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          type="tel"
          placeholder="+7 (123) 456-78-90"
        />

        <div>
          <InputAddress
            required
            onBlur={() => handleError('address')}
            error={error.address}
            name="address"
            extClassName={styles.field}
            label="Адрес"
            address={address}
            onChange={handleChange}
            setAddress={handleAddressValueChange}
          />

          <p className={styles.text}>
            Укажите адрес и мы подберем ближайшее к вам задание
          </p>
        </div>

        <Button
          buttonType="primary"
          actionType="submit"
          label="Подтвердите корректность данных"
          size="extraLarge"
          disabled={disabledBtn}
        />
      </form>
    </>
  );
}
