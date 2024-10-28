import { Icon, SmartHeader } from 'shared/ui';
import { NewAdminForm } from './components';

import styles from './styles.module.css';
import { Typography } from 'shared/ui/typography';

export function CreateNewAdminPage() {
  return (
    <>
      <SmartHeader
        icon={<Icon color="white" icon="NewAdminIcon" size="54" />}
        text="Добавление администраторов"
      />
      <Typography
        tag={'h2'}
        fontFamily={'primaryFont'}
        color={'primary-additional'}
        variant={'titleResize'}
        content={'Добавить администратора'}
        extraClass={styles.titlePrimary}
      />
      <NewAdminForm />
    </>
  );
}
