import { FormEvent, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PasswordInput } from 'shared/ui/password-input';
import { useAppDispatch } from 'app/hooks';

import styles from './styles.module.css';
// import { adminLoginThunk } from 'services/system-slice';
import { mockVkLoginThunk } from 'services/system-slice';

interface ILoginForm {
  login: string;
  password: string;
}

export function LoginPage() {
  // TODO предназначение checkAdminState непонятно. Пока поставил начальное значение true, чтобы отрабатывало условие логина при сабмите формы
  const [checkAdminState, setAdminCheckState] = useState(true);
  const [inputError, setInputError] = useState(false);
  const dispatch = useAppDispatch();

  const [inputFields, setInputFields] = useState<ILoginForm>({
    login: '',
    password: '',
  });

  const handleAdminLogin = async () => {
    try {
      // dispatch(adminLoginThunk(inputFields));

      // TODO Для логина по моковому vkId (как реципиет или волонтёр) использовать mockVkLoginThunk (vkId подставить из базы монго)  /// vkId может быть любой строкой  /// логин срабатывает при нажатии на кнопку Войти (данные в поля можно ввести любые)
      dispatch(
        mockVkLoginThunk({
          vkId: '123qwerty',
        })
      );
    } catch (err) {
      console.log({
        status: err,
        title: 'Error',
        description: 'Ошибка при попытке авторизации админом',
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAdminLogin();
    // if (checkAdminState) {
    // }
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
