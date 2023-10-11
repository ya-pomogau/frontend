import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';

export const RecipientSideMenu = () => {
  return (
    <SideMenu
      authRequired
      links={
        <>
          <SideMenuLink
            to="/profile/active"
            text="Активные заявки"
            icon={<Icon color="white" icon="ActiveApplicationIcon" size="54" />}
          />

          <SideMenuLink
            to="/profile/completed"
            text="Завершенные заявки"
            icon={
              <Icon color="white" icon="CompletedApplicationIcon" size="54" />
            }
          />
        </>
      }
    />
  );
};
