import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';

import styles from './styles.module.css';
import { UserRole } from 'entities/user/types';

export function RegisterPage() {
  const navigate = useNavigate();

  const [showLoginButton, setShowLoginButton] = useState(false);

  const redirectToLogin = () => {
    navigate('/login');
  };
  const visibleLoginButton = () => {
    setShowLoginButton(true);
  };
  const redirectToRegisterForm = (role: UserRole) => {
    navigate(`/register-form/${role}`);
  };
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titleAdditional}>Зарегистрироваться</p>

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
          />
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
    </>
  );
}
