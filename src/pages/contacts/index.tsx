import { SmartHeader, Icon } from 'shared/ui';

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
