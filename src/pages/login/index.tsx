import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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

const LOGIN_VALIDATION_RULES = {
  required: true,
  minLength: {
    value: 4,
    message: 'Логин должен быть не менее 4 символов',
  },
};

const PASSWORD_VALIDATION_RULES = {
  required: true,
  minLength: {
    value: 6,
    message: 'Пароль должен быть не менее 6 символов',
  },
};

export function LoginPage() {
  const [errorText, setErrorText] = useState('');
  const [adminLogin] = useAsyncAction(actions.adminLoginThunk);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
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
        <Controller
          name="login"
          rules={LOGIN_VALIDATION_RULES}
          control={control}
          render={({ field }) => (
            <Input
              label="Логин"
              name={field.name}
              onChange={field.onChange}
              placeholder="ФИО / Телефон / Логин"
              extClassName={styles.field}
              error={!!errors?.login?.message}
              errorText={errors.login?.message}
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
              label="Пароль"
              placeholder="от 6 символов"
              type="password"
            />
          )}
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
