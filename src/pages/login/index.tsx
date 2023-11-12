import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PasswordInput } from 'shared/ui/password-input';

import styles from './styles.module.css';
import { useLoginMutation } from 'services/auth-admin-api';
import { setUser } from 'entities/user/model';

interface ILoginForm {
  login: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [checkAdminState, setAdminCheckState] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [inputFields, setInputFields] = useState<ILoginForm>({
    login: '',
    password: '',
  });
  const [login, { isLoading }] = useLoginMutation();

  const handleAdminLogin = async () => {
    try {
      const user = await login(inputFields).unwrap();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          extClassName={styles.field}
          required
          label="Логин"
          name="login"
          value={inputFields.login}
          onChange={handleChange}
          placeholder="ФИО / Телефон / Логин"
          type="text"
          error={inputError}
          errorText={'Вы ввели неправильный логин'}
        />
        <PasswordInput
          extClassName={styles.field}
          required
          label={'Пароль'}
          name="password"
          value={inputFields.password}
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
          disabled={
            !inputFields.login ||
            !inputFields.password ||
            inputFields.password.length < 6
          }
        />
      </form>

      <Link to="/pick" className={styles.templink}>
        Авторизация под выбранной ролью
      </Link>
    </>
  );
}
