import { useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import { InputAddress } from 'shared/ui/input-address';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import registerSchema from './register-form.joi-sheme';

import styles from './styles.module.css';

export function RegisterFormPage() {
  const [address, setAddress] = useState<{
    address: string;
    coords: [number, number] | [];
  }>({
    address: '',
    coords: [],
  });

  const { role } = useParams();
  console.log(role);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = () => {
    console.log(getValues());
    console.log('test');
    reset();
  };

  const handleAddressValueChange = (
    newAddress: string,
    coords?: [number, number] | []
  ) => {
    setAddress({
      address: newAddress,
      coords: coords || [],
    });
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          extClassName={styles.field}
          label="ФИО"
          placeholder="ФИО"
          type="text"
          error={errors?.name && true}
          errorText={
            !(errors?.name?.message === undefined) &&
            errors?.name?.message.toString()
          }
          {...register('name')}
        />

        <Input
          extClassName={styles.field}
          label="Телефон"
          placeholder="+7 (000) 000 00 00"
          type="tel"
          title="+7 (123) 456 78 90"
          error={errors?.phone && true}
          errorText={
            !(errors?.phone?.message === undefined) &&
            errors?.phone?.message.toString()
          }
          {...register('phone')}
        />

        <div>
          <InputAddress
            address={address}
            setAddress={handleAddressValueChange}
            error={errors?.address && true}
            errorText={
              !errors?.address?.message === undefined &&
              errors?.address?.message?.toString()
            }
            {...register('address')}
          />

          <p className={styles.text}>
            Укажите адрес и мы подберем ближайшее к вам задание
          </p>
        </div>
        <Button
          buttonType="primary"
          actionType="submit"
          customIcon={<VkIcon color="white" size="24" />}
          label="Зарегистрироваться через ВКонтакте"
          size="extraLarge"
        />
      </form>
    </>
  );
}
