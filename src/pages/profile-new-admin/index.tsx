import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { NewAdminForm } from './components';

import styles from './styles.module.css';

const titleStyles = `${styles.titlePrimary} text text_size_large m-0 text_type_regular`;

export function CreateNewAdminPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
      />
      <h2 className={titleStyles}>Добавить администратора</h2>
      <NewAdminForm />
    </>
  );
}
