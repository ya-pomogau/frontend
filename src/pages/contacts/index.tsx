import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import usePermission from 'shared/hooks/use-permission';
import { UserRole, UserStatus } from 'shared/types/common.types';
import { ContactForm } from './components';

export function ContactsPage() {
  const isEditAllowed = usePermission([UserStatus.VERIFIED], UserRole.ADMIN);

  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <ContactForm isEditAllowed={isEditAllowed} />
    </>
  );
}
