import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { Routes } from 'shared/config';

export const VolunteerSideMenu = () => {
  return (
    <SideMenu
      authRequired
      links={
        <>
          <SideMenuLink
            to={`${Routes.PROFILE_VOLUNTEER.ROOT}`}
            text="Карта заявок"
            icon={<Icon color="white" icon="MapApplicationIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_VOLUNTEER.ACTIVE}`}
            text="Активные заявки"
            icon={<Icon color="white" icon="ActiveApplicationIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_VOLUNTEER.COMPLETED}`}
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
