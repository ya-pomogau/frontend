import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { Routes } from 'shared/config';

export const AdminSideMenu = () => {
  return (
    <SideMenu
      authRequired
      links={
        <>
          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.ROOT}`}
            text="Подтверждение / Блокировка"
            icon={<Icon color="white" icon="BlockIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.STATISTICS}`}
            text="Статистика"
            icon={<Icon color="white" icon="StatisticIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.TASKS}`}
            text="Создание / Редактирование заявки"
            icon={<Icon color="white" icon="CreateApplication" size="54" />}
          />
        </>
      }
    />
  );
};
