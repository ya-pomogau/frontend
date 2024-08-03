import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Form } from './components/index';

export function CreateNewAdminPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
        extClassName={styles.header}
      />
      <h2 className={styles.titlePrimary}>Добавить администратора</h2>
      <Form />
    </>
  );
}
