import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { Routes } from 'shared/config';

export const MasterSideMenu = () => {
  return (
    <SideMenu
      links={
        <>
          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.ROOT}`}
            text="Подтверждение / Блокировка"
            icon={<Icon color="white" icon="BlockIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.STATISTICS}/applications`}
            text="Статистика"
            icon={<Icon color="white" icon="StatisticIcon" size="54" />}
          />

          <SideMenuLink
            to={`${Routes.PROFILE_ADMIN.TASKS}/recipients`}
            text="Создание / Редактирование заявки"
            icon={<Icon color="white" icon="CreateApplication" size="54" />}
          />
        </>
      }
    />
  );
};
