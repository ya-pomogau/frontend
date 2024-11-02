import { Icon, SmartHeader, Typography } from 'shared/ui';
import { NewAdminForm } from './components';

import styles from './styles.module.css';

export function CreateNewAdminPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
      />
      <Typography
        tag={'h2'}
        color={'primary-additional'}
        variant={'titleResize'}
        content={'Добавить администратора'}
        extraClass={styles.titlePrimary}
      />
      <NewAdminForm />
    </>
  );
}
