import { SmartHeader, Icon } from 'shared/ui';

import { RegisterForm } from './components';

import styles from './styles.module.css';

export function RegisterPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>
      <RegisterForm />
    </>
  );
}
