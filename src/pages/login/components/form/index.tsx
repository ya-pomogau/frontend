import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PasswordInput } from 'shared/ui/password-input';
import { actions, startSocketConnection } from 'services/system-slice';
import useAsyncAction from 'shared/hooks/useAsyncAction';
import { schema } from './schema';

import styles from './styles.module.css';
import { useAppDispatch } from '../../../../app/hooks';

export interface ILoginForm {
  login: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [errorText, setErrorText] = useState('');
  const [adminLogin] = useAsyncAction(actions.adminLoginThunk);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    resolver: joiResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      await adminLogin(data);
      dispatch(startSocketConnection());
    } catch (err) {
      setErrorText(err as string);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="login"
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
  );
};

export default LoginForm;
