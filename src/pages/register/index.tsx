import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import styles from './styles.module.css';
import { RegisterForm } from './components';

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
