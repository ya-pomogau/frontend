import { Icon } from 'shared/ui/icons';
import { SideMenu } from './side-menu';
import { SideMenuLink } from './side-menu-link';
import styles from '../../../pages/feedback/styles.module.css';

export const FeedbackSideMenu = () => {
  return (
    <SideMenu
      authRequired={false}
      extClassName={styles.button_container}
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
