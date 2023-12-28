import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import Checkbox from 'shared/ui/checkbox';
import { PasswordInput } from 'shared/ui/password-input';

import { useLoginMutation } from 'services/auth-admin-api';
import { joiResolver } from '@hookform/resolvers/joi';
import loginSchema from './login.joi-sheme';

import styles from './styles.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [checkAdminState, setAdminCheckState] = useState(false);

  const [login] = useLoginMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  });

  const handleAdminLogin = async () => {
    try {
      const user = await login({
        login: getValues('login'),
        password: getValues('password'),
      }).unwrap();
      sessionStorage.setItem('auth_token', user.access_token);
      //dispatch(setUser(user));
      navigate('/profile');
    } catch (err) {
      console.log({
        status: err,
        title: 'Error',
        description: 'Ошибка при попытке авторизации админом',
      });
    }
  };

  const handleAdminCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminCheckState(!checkAdminState);
  };

  const onSubmit = () => {
    console.log(getValues());
    reset();
    if (checkAdminState) {
      handleAdminLogin();
    }
    console.log('отправка');
  };

  return (
    <>
      <SmartHeader
        text="Вход"
        icon={<Icon color="blue" icon="LoginIcon" size="54" />}
        extClassName={styles.header}
      />
      <p className={styles.title}>Войти</p>
      <div className={styles.info}>
        <Button
          buttonType="primary"
          actionType="button"
          customIcon={<VkIcon color="white" size="24" />}
          label="Войти через ВКонтакте"
          size="extraLarge"
        />
        <Checkbox
          label="Войти как администратор"
          id={'adminLogin'}
          onChange={handleAdminCheck}
          extClassName={styles.label}
        />
      </div>
      {checkAdminState && (
        <>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              extClassName={styles.field}
              label="Логин"
              placeholder="ФИО / Телефон / Логин"
              type="text"
              error={errors?.login && true}
              errorText={
                !(errors?.login?.message === undefined) &&
                errors?.login?.message.toString()
              }
              {...register('login')}
            />

            <PasswordInput
              extClassName={styles.field}
              label="Пароль"
              name="password"
              placeholder="от 6 символов"
              error={errors?.password && true}
              errorText={
                !(errors?.password?.message === undefined) &&
                errors?.password?.message.toString()
              }
              register={register}
            />

            <Button
              buttonType="primary"
              actionType="submit"
              label="Войти"
              size="medium"
              onClick={() => {
                console.log(errors);
                console.log(getValues());
              }}
              extClassName={styles.button}
              disabled={!isValid}
            />
          </form>
        </>
      )}
      <Link to="/pick" className={styles.templink}>
        Авторизация под выбранной ролью
      </Link>
    </>
  );
}
