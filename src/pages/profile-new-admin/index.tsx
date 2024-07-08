import styles from './styles.module.css';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  useForm,
} from 'react-hook-form';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { SmartHeader } from 'shared/ui/smart-header';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';
import { InputPhone } from 'shared/ui/input-phone';
import { PasswordInput } from 'shared/ui/password-input';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { useAppDispatch } from 'app/hooks';
import { useCreateNewAdminMutation } from 'services/admin-api';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface INewAdminForm {
  fullName: string;
  email: string;
  phone: string;
  address: {
    address: string;
    coords: GeoCoordinates;
  };
  password: string;
  repeatedPassword: string;
}

export function CreateNewAdminPage() {
  const [createNewAdmin] = useCreateNewAdminMutation();
  const navigate = useNavigate();

  const [adminCredentials, setAdminCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const FULL_NAME_VALIDATION_RULES = {
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
    required: 'Адрес обязателен',
  };

  const PASSWORD_VALIDATION_RULES = {
    required: true,
    minLength: {
      value: 6,
      message: 'Пароль должен быть не менее 6 символов',
    },
  };

  const REPEATED_PASSWORD_VALIDATION_RULES = {
    required: 'Повторите пароль',
    validate: (value: string) => {
      const password = getValues('password');
      return value === password || 'Пароли не совпадают';
    },
  };

  const EMAIL_VALIDATION_RULES = {
    required: 'Укажите адрес электронной почты',
    pattern: {
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Неверный формат электронной почты',
    },
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

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<INewAdminForm>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: {
        address: '',
        coords: [],
      },
      password: '',
      repeatedPassword: '',
    },
  });

  const onSubmit: SubmitHandler<INewAdminForm> = async ({
    fullName,
    email,
    phone,
    address,
    password,
  }) => {
    const user = {
      name: fullName,
      login: email,
      phone,
      address: address.address,
      password,
      vkId: nanoid(),
    };

    try {
      await createNewAdmin(user).unwrap();
      setAdminCredentials({ email, password });
      navigate('/profile/requests/volunteers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
        extClassName={styles.header}
      />
      <h2 className={styles.titlePrimary}>Добавить администратора</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fullName"
          rules={FULL_NAME_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              error={!!errors?.fullName?.message}
              errorText={errors.fullName?.message}
              extClassName={styles.field}
              label="ФИО"
              placeholder="Введите имя"
              type="text"
            />
          )}
        />
        <Controller
          name="email"
          rules={EMAIL_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              error={!!errors?.email?.message}
              errorText={errors.email?.message}
              extClassName={styles.field}
              label="Эл. почта"
              placeholder="Введите электронную почту"
              type="email"
            />
          )}
        />
        <Controller
          name="phone"
          rules={PHONE_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <InputPhone
              {...field}
              errorText={errors?.phone?.message as unknown as string}
              extClassName={styles.field}
              type="tel"
              label="Телефон"
              placeholder="+7 (000) 000-00-00"
            />
          )}
        />

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
              errorText={errors.address?.message}
              extClassName={styles.field}
              address={field.value}
              label="Адрес проживания"
              placeholder="ул. Потолочного, д. 3"
              setAddress={handleAddressValueChange}
            />
          )}
        />
        <Controller
          name="password"
          rules={PASSWORD_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <PasswordInput
              extClassName={styles.field}
              name={field.name}
              onChange={field.onChange}
              required
              error={!!errors?.password?.message}
              errorText={errors.password?.message}
              label="Придумайте пароль"
              placeholder="от 6 символов"
              type="password"
            />
          )}
        />
        <Controller
          name="repeatedPassword"
          rules={REPEATED_PASSWORD_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <PasswordInput
              extClassName={styles.field}
              name={field.name}
              onChange={field.onChange}
              required
              error={!!errors?.repeatedPassword?.message}
              errorText={errors.repeatedPassword?.message}
              label="Повторите пароль"
              placeholder="от 6 символов"
              type="password"
            />
          )}
        />

        <Button
          buttonType="primary"
          actionType="submit"
          label="Добавить"
          size="extraLarge"
          disabled={!isValid}
        />
      </form>
    </>
  );
}
