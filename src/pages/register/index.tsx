import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';
import { InputPhone } from 'shared/ui/input-phone';

import styles from './styles.module.css';
import { FilterItemsIds } from 'features/filter/consts';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

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
  const [name, setName] = useState<string>(FIO);
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.VOLUNTEER);
  const [address, setAddress] = useState<{
    address: string;
    coords: GeoCoordinates;
  }>({
    address: '',
    coords: [],
  });

  const {
    register,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const vk_id = `${id}`;
    const user = {
      name: name,
      phone,
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
          {...register('name', {
            required: 'Имя должго быть больше 4 симолов',
            minLength: {
              value: 4,
              message: 'Имя должго быть больше 4 симолов',
            },
          })}
          onChange={(event) => setName(event.target.value)}
          value={name}
          error={errors?.name?.message ? true : false}
          errorText={errors.name?.message}
          extClassName={styles.field}
          label="ФИО"
          placeholder="ФИО"
          type="text"
        />

        <InputPhone
          {...register('phone', {
            required: 'Введите номер телефона',
          })}
          setValue={setPhone}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors?.phone ? true : false}
          errorText={errors.phone?.message}
          extClassName={styles.field}
          label="Телефон"
          type="tel"
          placeholder="+7 (123) 456-78-90"
        />

        <div>
          <InputAddress
            {...register('address', {
              required: true,
            })}
            error={errors.address && address.address === '' ? true : false}
            extClassName={styles.field}
            address={address}
            label="Адрес"
            errorText={`Не введен адрес. Пожалуйста, укажите адрес, ${
              role === 'Volunteer'
                ? 'по которому требуется помощь'
                : 'где вы находитесь'
            }!`}
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
          disabled={
            errors.name ||
            errors.phone ||
            address.address === '' ||
            phone.length < 11
              ? true
              : false
          }
        />
      </form>
    </>
  );
}
