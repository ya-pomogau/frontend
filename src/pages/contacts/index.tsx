import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { ContactForm } from './components';

export function ContactsPage() {
  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <ContactForm />
    </>
  );
}
