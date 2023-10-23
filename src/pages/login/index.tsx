import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import Checkbox from 'shared/ui/checkbox';
import { PasswordInput } from 'shared/ui/password-input';

import styles from './styles.module.css';
import { useLoginMutation } from 'services/auth-admin-api';
import { setUser } from 'entities/user/model';
import { useDispatch } from 'react-redux';
import { handleRedirectVK } from 'shared/libs/utils';

interface ILoginForm {
  login: string;
  password: string;
}

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkAdminState, setAdminCheckState] = useState(false);
  const [inputError, setInputError] = useState(false);
  const location = useLocation();

  const [inputFields, setInputFields] = useState<ILoginForm>({
    login: '',
    password: '',
  });
  const [login, { isLoading }] = useLoginMutation();
  const [signinVk] = useSigninVkMutation();

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

  const handleAdminCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminCheckState(!checkAdminState);
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

  const [isError, setIsError] = useState(false);

  const cbLink = `${host}/login`;

  const handleRedirect = () => {
    window.location.replace(
      `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.120&state=4194308`
    );
  };

  const handleLogin = (code: string | (string | null)[]) => {
    signinVk(code)
      .then((user) => {
        dispatch(setUser(user));
        navigate('/');
      })
      .catch(() => setIsError(true));
  };

  useEffect(() => {
    const queryObj = queryString.parse(location.search);

    if (isError) window.location.href = cbLink;

    if (!isEmptyObj(queryObj) && queryObj.code) handleLogin(queryObj.code);
  }, [location.search, isError, cbLink, navigate]);

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
          onClick={handleRedirectVK}
        />
        <Checkbox
          label="Войти как администратор"
          id={'adminLogin'}
          onChange={handleAdminCheck}
          extClassName={styles.label}
        />
      </div>
      {checkAdminState && (
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
      )}
      <Link to="/pick" className={styles.templink}>
        Авторизация под выбранной ролью
      </Link>
    </>
  );
}
