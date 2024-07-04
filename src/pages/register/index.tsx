import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
  role: UserRole;
}

const NAME_VALIDATION_RULES = {
  required: true,
  minLength: {
    value: 4,
    message: 'Имя должно быть больше 4 символов',
  },
};

const PHONE_VALIDATION_RULES = {
  required: true,
  pattern: {
    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    message: 'Введите номер телефона в формате +7 (000) 000-00-00',
  },
};

const ADDRESS_VALIDATION_RULES = {
  required: true,
  validate: (value: IRegisterForm['address']) => value.address !== '',
};

export function RegisterPage() {
  const dispatch = useAppDispatch();

  const vkUser = useAppSelector(vkUserSelector);
  const {
    first_name = '',
    last_name = '',
    id = '',
    photo_max_orig = '',
  } = vkUser ?? {};
  const FIO = `${first_name} ${last_name}`;

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    mode: 'onChange',
    defaultValues: useMemo(
      () => ({
        address: {
          address: '',
          coords: [],
        },
        name: FIO,
        phone: '',
        role: UserRole.VOLUNTEER,
      }),
      [FIO]
    ),
  });

  // TODO: если нужно привести номер телефона к вариации без пробела
  // function cleanPhoneNumber(phoneNumber: string) {
  //   return phoneNumber.replace(/[^0-9]/g, '');
  // }

  const onSubmit: SubmitHandler<IRegisterForm> = ({
    address,
    name,
    phone,
    role,
  }) => {
    const vk_id = `${id}`;
    const user = {
      name,
      phone,
      address: address.address,
      avatar: photo_max_orig,
      location: {
        type: 'Point',
        coordinates: address.coords,
      },
      vkId: vk_id,
      role,
    };
    dispatch(newUserThunk(user));
  };

  const handleAddressValueChange = (
    newAddress: string,
    coords?: GeoCoordinates
  ) => {
    setValue(
      'address',
      { address: newAddress, coords: coords || [] },
      { shouldValidate: true }
    );
  };

  const handleRoleButtonClick = (newRole: UserRole) => {
    setValue('role', newRole, { shouldValidate: true });
  };

  const getRoleButtonType = (userRole: string) =>
    getValues('role') === userRole ? 'primary' : 'secondary';

  const addressErrorMessage = `Не введен адрес. Пожалуйста, укажите адрес, ${
    getValues('role') === UserRole.RECIPIENT
      ? 'по которому требуется помощь'
      : 'где вы находитесь'
  }!`;

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name="name"
          rules={NAME_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <Input
              defaultValue={field.value}
              name={field.name}
              onChange={field.onChange}
              error={!!errors?.name?.message}
              errorText={errors.name?.message}
              extClassName={styles.field}
              label="ФИО"
              placeholder="ФИО"
              type="text"
            />
          )}
        />
        <Controller
          name="phone"
          rules={PHONE_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <InputPhone
              name="phone"
              defaultValue={field.value}
              errorText={errors?.phone?.message as unknown as string}
              onChange={field.onChange}
              extClassName={styles.field}
              type="tel"
              placeholder="+7 (123) 456-78-90"
            />
          )}
        />
        <div>
          <Controller
            name="address"
            rules={ADDRESS_VALIDATION_RULES}
            control={control}
            render={({ field }) => (
              <InputAddress
                name={field.name}
                defaultValue={field.value.address}
                onChange={field.onChange}
                error={!!errors.address}
                extClassName={styles.field}
                address={field.value}
                label="Адрес"
                errorText={addressErrorMessage}
                setAddress={handleAddressValueChange}
              />
            )}
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
          disabled={!isValid}
        />
      </form>
    </>
  );
}
