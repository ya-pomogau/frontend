import { SmartHeader, Icon, Typography } from 'shared/ui';

import { RegisterForm } from './components';

import styles from './styles.module.css';

export function RegisterPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
      />
      <Typography
        tag={'h2'}
        color={'primary'}
        variant={'title'}
        content={'Зарегистрироваться'}
        extraClass={styles.titlePrimary}
      />
      <RegisterForm />
    </>
  );
}
