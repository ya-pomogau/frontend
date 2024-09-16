import { Button } from 'shared/ui';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import { handleRedirectVK } from 'shared/libs/utils';

import styles from './styles.module.css';

export const UnauthorizedUser = () => {
  return (
    <Button
      buttonType="primary"
      actionType="submit"
      customIcon={<VkIcon color="white" size="24" />}
      label="Войти через ВКонтакте"
      size="extraLarge"
      onClick={() => {
        // Временно, пока не уберут предупреждение в консоли
        confirm(
          'Внимание-вниманиеЭто важно, чёрт возьми! Ни в коем случае не копируйте и не вставляйте что‑либо сюда, вы рискуете потерять доступ к своему аккаунту.Ввод информации сюда может дать злоумышленникам доступ к вашему аккаунту VK ID'
        ) && handleRedirectVK();
      }}
      extClassName={styles.buttonsWrapper}
    />
  );
};
