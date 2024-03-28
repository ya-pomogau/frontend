import { Icon } from 'shared/ui/icons';
import { SideMenu } from './side-menu';
import { SideMenuLink } from './side-menu-link';

export const FeedbackSideMenu = () => {
  return (
    <SideMenu
      authRequired={false}
      links={
        <>
          <SideMenuLink
            to="/contacts"
            icon={<Icon color="white" icon="ContactsIcon" size="54" />}
            text="Контакты"
          />
          <SideMenuLink
            to="/feedback"
            icon={<Icon color="white" icon="EmptyMessageIcon" size="54" />}
            text="Напишите нам"
          />
        </>
      }
    />
  );
};
