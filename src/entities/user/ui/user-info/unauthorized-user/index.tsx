import { Button } from 'shared/ui';
import { Icon } from 'shared/ui';
import { handleRedirectVK } from 'shared/libs/utils';

import styles from './styles.module.css';

export const UnauthorizedUser = () => {
  return (
    <Button
      buttonType="primary"
      actionType="submit"
      customIcon={<Icon icon="VkIcon" color="white" size="24" />}
      label="Войти через ВКонтакте"
      size="extraLarge"
      onClick={() => handleRedirectVK()}
      extClassName={styles.buttonsWrapper}
    />
  );
};
