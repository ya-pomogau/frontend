import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import { UserRole } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { FormInput } from 'shared/ui/form-input';
import { FormInputPhone } from 'shared/ui/form-input-phone';
import { FormInputAddress } from 'shared/ui/form-input-address';

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

const NAME_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 4,
    message: 'Имя должно быть больше 4 символов',
  },
};

const PHONE_VALIDATION_RULES = {
  required: 'Обязательное поле',
  pattern: {
    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    message: 'Введите номер телефона в формате +7 (000) 000-00-00',
  },
};

const ADDRESS_VALIDATION_RULES = {
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
    handleSubmit,
    watch,
    formState: { isValid },
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

  const getAddressErrorMessage = () => {
    return {
      ...ADDRESS_VALIDATION_RULES,
      required: `Не введен адрес. Пожалуйста, укажите адрес, ${
        watch('role') === UserRole.RECIPIENT
          ? 'по которому требуется помощь'
          : 'где вы находитесь'
      }!`,
    };
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>

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
          rules={NAME_VALIDATION_RULES}
        />
        <FormInputPhone
          name="phone"
          label="Телефон"
          placeholder="+7 (123) 456-78-90"
          control={control}
          rules={PHONE_VALIDATION_RULES}
        />
        <div>
          <FormInputAddress
            name="address.address"
            label="Адрес"
            placeholder="Адрес"
            control={control}
            rules={getAddressErrorMessage()}
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
    </>
  );
}
