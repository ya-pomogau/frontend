import { SmartHeader, Icon } from 'shared/ui';

import { LoginForm } from './components';

import styles from './styles.module.css';

export function LoginPage() {
  return (
    <>
      <SmartHeader
        text="Вход"
        icon={<Icon color="blue" icon="LoginIcon" size="54" />}
      />
      <p className={styles.title}>Войти</p>
      <LoginForm />
    </>
  );
}
