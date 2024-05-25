import { FormEvent, useState } from 'react';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PasswordInput } from 'shared/ui/password-input';
import { actions } from 'services/system-slice';
import useForm from 'shared/hooks/use-form';
import useAsyncAction from 'shared/hooks/useAsyncAction';

import styles from './styles.module.css';

interface ILoginForm {
  login: string;
  password: string;
}

export function LoginPage() {
  const [errorText, setErrorText] = useState('');
  const [adminLogin, isLoading] = useAsyncAction(actions.adminLoginThunk);
  const { values, handleChange, errors, isValid } = useForm<ILoginForm>({
    login: '',
    password: '',
  });

  const isButtonDisabled =
    !values.login || !values.password || values.password.length < 6 || !isValid;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await adminLogin(values);
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
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          extClassName={styles.field}
          required
          label="Логин"
          name="login"
          value={values.login}
          onChange={handleChange}
          placeholder="ФИО / Телефон / Логин"
          type="text"
          error={errors.login.length >= 1}
          errorText="Вы ввели неправильный логин"
        />
        <PasswordInput
          extClassName={styles.field}
          required
          label="Пароль"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="от 6 символов"
          type="password"
        />
        <Button
          buttonType="primary"
          actionType="submit"
          label="Войти"
          size="medium"
          extClassName={styles.button}
          disabled={isButtonDisabled}
        />
        <span className={`${styles.error} text`}>{errorText}</span>
      </form>
    </>
  );
}
