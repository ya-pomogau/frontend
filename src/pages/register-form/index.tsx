import { useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  name: Joi.string().required().messages({
    /* eslint-disable */
    'string.empty': 'Заполните это поле',
  }),
  phone: Joi.string()
    .required()
    .regex(/^[+]7 \(\d{3}\) \d{3} \d{2} \d{2}$/)
    .messages({
      /* eslint-disable */
      'string.pattern.base':
        'Номер телефона должен иметь вид +7 (000) 000 00 00',
      'string.empty': 'Заполните это поле',
    }),
  address: Joi.string().required().min(1),
});

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
    resolver: joiResolver(schema),
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
            !(errors?.name?.message === undefined) && errors?.name?.message
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
            !(errors?.phone?.message === undefined) && errors?.phone?.message
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
              errors?.address?.message
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
