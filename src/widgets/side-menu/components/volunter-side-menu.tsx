import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';

export const VolunteerSideMenu = () => {
  return (
    <SideMenu
      authRequired
      links={
        <>
          <SideMenuLink
            to="/profile/map"
            text="Карта заявок"
            icon={<Icon color="white" icon="MapApplicationIcon" size="54" />}
          />

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
