import { Button, Icon } from 'shared/ui';
import { handleRedirectVK } from 'shared/libs/utils';

export const UnauthorizedUser = () => {
  return (
    <Button
      buttonType="primary"
      actionType="submit"
      customIcon={<Icon icon="VkIcon" color="white" size="24" />}
      label="Войти через ВКонтакте"
      size="extraLarge"
      onClick={() => handleRedirectVK()}
    />
  );
};
