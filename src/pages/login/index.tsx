import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PasswordInput } from 'shared/ui/password-input';
import { actions } from 'services/system-slice';
import useAsyncAction from 'shared/hooks/useAsyncAction';

import styles from './styles.module.css';

interface ILoginForm {
  login: string;
  password: string;
}

export function LoginPage() {
  const [errorText, setErrorText] = useState('');
  const [adminLogin] = useAsyncAction(actions.adminLoginThunk);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      await adminLogin(data);
    } catch (err) {
      setErrorText(err as string);
    }
  };

  return (
    <>
      <SmartHeader
        text="Вход"
        icon={<Icon color="blue" icon="LoginIcon" size="54" />}
        extClassName={styles.header}
      />
      <p className={styles.title}>Войти</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Логин"
          placeholder="ФИО / Телефон / Логин"
          extClassName={styles.field}
          error={errors?.login?.message ? true : false}
          errorText={errors.login?.message}
          {...register('login', {
            required: 'Логин должен быть не менее 4 символов',
            minLength: 4,
          })}
        />
        <PasswordInput
          extClassName={styles.field}
          required
          error={errors?.password?.message ? true : false}
          errorText={errors.password?.message}
          label="Пароль"
          {...register('password', {
            required: 'Пороль должен быть не менее 6 символов',
            minLength: 6,
          })}
          placeholder="от 6 символов"
          type="password"
        />
        <Button
          buttonType="primary"
          actionType="submit"
          label="Войти"
          size="medium"
          extClassName={styles.button}
          disabled={!isValid}
        />
        <span className={`${styles.error} text`}>{errorText}</span>
      </form>
    </>
  );
}
