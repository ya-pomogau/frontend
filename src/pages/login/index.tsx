import { SmartHeader, Icon, Typography } from 'shared/ui';

import { LoginForm } from './components';

import styles from './styles.module.css';

export function LoginPage() {
  return (
    <>
      <SmartHeader
        text="Вход"
        icon={<Icon color="blue" icon="LoginIcon" size="54" />}
      />
      <Typography
        tag={'h3'}
        color={'primary-additional'}
        variant={'titleResize'}
        content={'Войти'}
        extraClass={styles.title}
      />
      <LoginForm />
    </>
  );
}
