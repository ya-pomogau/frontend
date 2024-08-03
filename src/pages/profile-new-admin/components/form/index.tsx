import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import cn from 'classnames';

import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';
import { InputPhone } from 'shared/ui/input-phone';
import { PasswordInput } from 'shared/ui/password-input';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { useCreateNewAdminMutation } from 'services/admin-api';
import { schema } from './form.schema';
import { Routes } from 'shared/config';

import styles from './styles.module.css';

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

const defaultValues: INewAdminForm = {
  fullName: '',
  email: '',
  phone: '',
  address: {
    address: '',
    coords: [],
  },
  password: '',
  repeatedPassword: '',
};

export const NewAdminForm = () => {
  const [createNewAdmin] = useCreateNewAdminMutation();
  const navigate = useNavigate();

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
    defaultValues,
    resolver: joiResolver(schema),
  });

  console.log('e', errors);

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
      navigate(Routes.PROFILE_REQUESTS_VOLUNTEERS);
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
          <div className={styles.container}>
            <Input
              {...field}
              error={!!errors?.fullName?.message}
              extClassName={styles.field}
              label="ФИО"
              placeholder="Введите имя"
              type="text"
            />
            <span className={cn(styles.error, 'text')}>
              {errors.fullName?.message}
            </span>
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div className={styles.container}>
            <Input
              {...field}
              error={!!errors?.email?.message}
              extClassName={styles.field}
              label="Эл. почта"
              placeholder="Введите электронную почту"
              type="email"
            />
            <span className={cn(styles.error, 'text')}>
              {errors.email?.message}
            </span>
          </div>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <div className={styles.container}>
            <InputPhone
              {...field}
              error={!!errors?.phone?.message}
              extClassName={styles.field}
              type="tel"
              label="Телефон"
              placeholder="+7 (000) 000-00-00"
            />
            <span className={cn(styles.error, 'text')}>
              {errors?.phone?.message as unknown as string}
            </span>
          </div>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <div className={styles.container}>
            <InputAddress
              name={field.name}
              defaultValue={field.value.address}
              onChange={field.onChange}
              error={!!errors?.address?.address?.message}
              extClassName={styles.field}
              address={field.value}
              label="Адрес проживания"
              placeholder="ул. Потолочного, д. 3"
              setAddress={handleAddressValueChange}
            />
            <span className={cn(styles.error, 'text')}>
              {errors.address?.address?.message}
            </span>
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div className={styles.container}>
            <PasswordInput
              extClassName={styles.field}
              name={field.name}
              onChange={field.onChange}
              error={!!errors?.password?.message}
              label="Придумайте пароль"
              placeholder="от 6 символов"
              type="password"
            />
            <span className={cn(styles.error, 'text')}>
              {errors.password?.message}
            </span>
          </div>
        )}
      />
      <Controller
        name="repeatedPassword"
        control={control}
        render={({ field }) => (
          <div className={styles.container}>
            <PasswordInput
              extClassName={styles.field}
              name={field.name}
              onChange={field.onChange}
              error={!!errors?.repeatedPassword?.message}
              label="Повторите пароль"
              placeholder="от 6 символов"
              type="password"
              autoComplete="new-password"
            />
            <span className={cn(styles.error, 'text')}>
              {errors.repeatedPassword?.message}
            </span>
          </div>
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
