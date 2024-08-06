import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { Routes } from 'shared/config';

export const RecipientSideMenu = () => {
  return (
    <SideMenu
      authRequired
      links={
        <>
          <SideMenuLink
            to={`${Routes.PROFILE_RECIPIENT.ROOT}`}
            text="Активные заявки"
            icon={<Icon color="white" icon="ActiveApplicationIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_RECIPIENT.COMPLETED}`}
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
