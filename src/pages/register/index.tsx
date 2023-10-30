import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';

import styles from './styles.module.css';
import { handleRedirectVK } from 'shared/libs/utils';

export function RegisterPage() {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);

  const redirectToLogin = () => {
    navigate('/login');
  };
  const visibleLoginButton = () => {
    setShowLoginButton(true);
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
        <Button
          buttonType="primary"
          actionType="submit"
          customIcon={<VkIcon color="white" size="24" />}
          label="Зарегистрироваться через ВКонтакте"
          size="extraLarge"
          onClick={() => handleRedirectVK()}
        />
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
