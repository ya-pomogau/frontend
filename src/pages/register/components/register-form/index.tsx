import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, FormInput, FormInputPhone, FormInputAddress } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { schema } from './schema';

import styles from './styles.module.css';

export interface IRegisterForm {
  name: string;
  phone: string;
  address: {
    address: string;
    coords: GeoCoordinates;
  };
  role: UserRole;
}

const RegisterForm = () => {
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
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<IRegisterForm>({
    resolver: joiResolver(schema),
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
    watch('role') === userRole ? 'primary' : 'secondary';

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.buttonContainer}>
        <Button
          buttonType={getRoleButtonType(UserRole.VOLUNTEER)}
          size="extraLarge"
          label="Хочу помочь"
          id={UserRole.VOLUNTEER}
          onClick={() => handleRoleButtonClick(UserRole.VOLUNTEER)}
          actionType="button"
        />
        <Button
          buttonType={getRoleButtonType(UserRole.RECIPIENT)}
          size="extraLarge"
          label="Нужна помощь"
          id={UserRole.RECIPIENT}
          onClick={() => handleRoleButtonClick(UserRole.RECIPIENT)}
          actionType="button"
        />
      </div>
      <FormInput
        name="name"
        label="ФИО"
        placeholder="ФИО"
        type="text"
        control={control}
      />
      <FormInputPhone
        name="phone"
        label="Телефон"
        placeholder="+7 (000) 000-00-00"
        control={control}
      />
      <div>
        <FormInputAddress
          name="address.address"
          label="Адрес"
          placeholder="Адрес"
          control={control}
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
        disabled={!isValid}
      />
    </form>
  );
};

export default RegisterForm;
