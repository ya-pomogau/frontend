import { useState } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Controller,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';

import styles from './styles.module.css';
import { UserRole } from 'entities/user/types';
import { InputAddress } from 'shared/ui/input-address';
import classnames from 'classnames';

interface IRegisterForm {
  name: string;
  phone: string;
  address: {
      address: string,
      coords: [number, number] | [],
  };
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState<{
    address: string;
    coords: [number, number] | [];
  }>({
    address: '',
    coords: [],
  });

  const [showLoginButton, setShowLoginButton] = useState(false);

  const redirectToLogin = () => {
    navigate('/login');
  };
  const visibleLoginButton = () => {
    setShowLoginButton(true);
  const handleAddressValueChange = (
    newAddress: string,
    coords?: [number, number] | []
  ) => {
    setAddress({
      address: newAddress,
      coords: coords || [],
    });
  };
  const redirectToRegisterForm = (role: UserRole) => {
    navigate(`/register-form/${role}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IRegisterForm>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log(data);
    reset();
  };

  const error: SubmitErrorHandler<IRegisterForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titleAdditional}>Зарегистрироваться</p>
      <p className={styles.title}>Зарегистрироваться</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit, error)}>
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => (
            <>
              <Input
                extClassName={classnames(
                  styles.field,
                  errors?.name ? styles.error : undefined
                )}
                {...register('name', {
                  required: 'Заполните поле "Имя"',
                  minLength: {
                    value: 8,
                    message: 'Слишком короткое имя',
                  },
                })}
                label="ФИО"
                placeholder="ФИО"
                type="text"
                aria-invalid={!!errors.name}
              />
              <div>
                {errors?.name && (
                  <p
                    className={classnames(
                      'text',
                      'text_size_small',
                      styles.error
                    )}
                  >
                    {errors?.name?.message ||
                      'Произошла ошибка! Попробуйте повторить запрос'}
                  </p>
                )}
              </div>
            </>
          )}
        />

      <div className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <Button
            buttonType="primary"
            actionType="button"
            label="Хочу помочь"
            size="extraLarge"
            onClick={() => {
              redirectToRegisterForm('volunteer');
            }}
          />
          <Button
            buttonType="secondary"
            actionType="button"
            label="Нужна помощь"
            size="extraLarge"
            onClick={() => {
              redirectToRegisterForm('recipient');
            }}
        <Controller
          name={'phone'}
          control={control}
          render={({ field }) => (
            <>
              <div>
                <Input
                  extClassName={classnames(
                    styles.field,
                    errors?.name ? styles.error : undefined
                  )}
                  label="Телефон"
                  placeholder="+7 (000) 000 00 00"
                  aria-invalid={!!errors.phone}
                  {...register('phone', {
                    required: 'Заполните поле "Телефон"',
                    minLength: {
                      value: 12,
                      message:
                        'Номер телефона слишком короткий. Попробуйте ввести телефон формата "+7(000)000-00-00"',
                    },
                    pattern: /^[+]7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
                  })}
                />
                <div>
                  {errors?.phone && (
                    <p
                      className={classnames(
                        'text',
                        'text_size_small',
                        styles.error
                      )}
                    >
                      {errors?.phone?.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        />

        <div>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <>
                <InputAddress
                  extClassName={classnames(
                    styles.field,
                    errors?.name ? styles.error : undefined
                  )}
                  {...register('address', {
                    required: 'Заполните поле "Адрес"',
                  })}
                  aria-invalid={!!errors.address}
                  name="address"
                  address={address}
                  setAddress={handleAddressValueChange}
                />
                <div>
                  {errors?.address && (
                    <p
                      className={classnames(
                        'text',
                        'text_size_small',
                        styles.error
                      )}
                    >
                      {errors?.address?.message ||
                        'Произошла ошибка! Попробуйте повторить запрос'}
                    </p>
                  )}
                </div>
              </>
            )}
          />
          <p className={styles.text}>
            Укажите адрес и мы подберем ближайшее к вам задание
          </p>
        </div>
        <a className={styles.link} onClick={visibleLoginButton}>
          Уже есть аккаунт
        </a>
        {showLoginButton && (
          <Button
            buttonType="primary"
            actionType="submit"
            customIcon={<VkIcon color="white" size="24" />}
            label="Войти через ВКонтакте"
            size="extraLarge"
            onClick={() => redirectToLogin()}
          />
        )}
      </div>

        <Button
          buttonType="primary"
          actionType="submit"
          customIcon={<VkIcon color="white" size="24" />}
          label="Зарегистрироваться через ВКонтакте"
          size="extraLarge"
          disabled={!isValid}
        />
      </form>
    </>
  );
}
