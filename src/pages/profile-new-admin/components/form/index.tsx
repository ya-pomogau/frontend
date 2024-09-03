import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  Input,
  Button,
  InputAddress,
  InputPhone,
  PasswordInput,
} from 'shared/ui';
import { Routes } from 'shared/config';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { useCreateNewAdminMutation } from 'services/admin-api';
import { schema } from './form.schema';

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
          <Input
            {...field}
            error={!!errors?.fullName?.message}
            errorText={errors.fullName?.message || ' '}
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
            errorText={errors.email?.message || ' '}
            extClassName={styles.field}
            label="Эл. почта"
            placeholder="Введите электронную почту"
            type="email"
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputPhone
            {...field}
            error={!!errors?.phone?.message}
            errorText={(errors?.phone?.message as unknown as string) || ' '}
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
            errorText={errors.address?.address?.message || ' '}
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
        control={control}
        render={({ field }) => (
          <PasswordInput
            extClassName={styles.field}
            name={field.name}
            onChange={field.onChange}
            error={!!errors?.password?.message}
            errorText={errors.password?.message || ' '}
            label="Придумайте пароль"
            placeholder="от 6 символов"
            type="password"
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
            errorText={errors.repeatedPassword?.message || ' '}
            label="Повторите пароль"
            placeholder="от 6 символов"
            type="password"
            autoComplete="new-password"
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
