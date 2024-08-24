import { Icon, SmartHeader } from 'shared/ui';
import { NewAdminForm } from './components';

import styles from './styles.module.css';

export function CreateNewAdminPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
      />
      <h2 className={styles.titlePrimary}>Добавить администратора</h2>
      <NewAdminForm />
    </>
  );
}
