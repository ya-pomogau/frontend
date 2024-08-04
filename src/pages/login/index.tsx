import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { LoginForm } from './components';

import styles from './styles.module.css';

const titleStyles = `${styles.title} text text_size_large m-0 text_type_regular`;

export function LoginPage() {
  return (
    <>
      <SmartHeader
        text="Вход"
        icon={<Icon color="blue" icon="LoginIcon" size="54" />}
        extClassName={styles.header}
      />
      <p className={titleStyles}>Войти</p>
      <LoginForm />
    </>
  );
}
