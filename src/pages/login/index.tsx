import { SmartHeader, Icon } from 'shared/ui';

import { LoginForm } from './components';

import styles from './styles.module.css';
import { Typography } from 'shared/ui/typography';

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
        fontFamily={'primaryFont'}
        variant={'titleResize'}
        content={'Войти'}
        extraClass={styles.title}
      />
      <LoginForm />
    </>
  );
}
