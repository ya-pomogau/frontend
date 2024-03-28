import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import { handleRedirectVK } from 'shared/libs/utils';
import styles from '../styles.module.css';

export const UnauthorizedUser = () => {
  return (
    <div className={styles.buttonsWrapper}>
      <Button
        buttonType="primary"
        actionType="submit"
        customIcon={<VkIcon color="white" size="24" />}
        label="Войти через ВКонтакте"
        size="extraLarge"
        onClick={() => handleRedirectVK()}
      />
    </div>
  );
};
