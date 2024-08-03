import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';
import { InputPhone } from 'shared/ui/input-phone';
import { PasswordInput } from 'shared/ui/password-input';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { useCreateNewAdminMutation } from 'services/admin-api';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './styles.module.css';
import { schema } from './form.schema';
import { joiResolver } from '@hookform/resolvers/joi';

export interface INewAdminForm {
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

export const Form = () => {
  const [createNewAdmin] = useCreateNewAdminMutation();
  const navigate = useNavigate();

  const [_, setAdminCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

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
    resolver: joiResolver(schema),
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
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
						autoComplete="off"
          />
        )}
      />
      <Controller
        name="phone"
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
        control={control}
        render={({ field }) => (
          <InputAddress
            name={field.name}
            defaultValue={field.value.address}
            onChange={field.onChange}
            error={!!errors?.address?.address?.message}
            errorText={errors.address?.message}
            extClassName={styles.field_minus_margin}
            address={field.value}
            label="Адрес проживания"
            placeholder="ул. Потолочного, д. 3"
            setAddress={handleAddressValueChange}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            extClassName={styles.field}
            name={field.name}
            onChange={field.onChange}
            error={!!errors?.password?.message}
            errorText={errors.password?.message}
            label="Придумайте пароль"
            placeholder="от 6 символов"
            type="password"
						autoComplete="new-password"
          />
        )}
      />
      <Controller
        name="repeatedPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            extClassName={styles.field}
            name={field.name}
            onChange={field.onChange}
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
        size="medium"
        disabled={!isValid}
      />
    </form>
  );
};
