import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';

export const MasterSideMenu = () => {
  return (
    <SideMenu
      links={
        <>
          <SideMenuLink
            to="/profile/requests"
            text="Подтверждение / Блокировка"
            icon={<Icon color="white" icon="BlockIcon" size="54" />}
          />

          <SideMenuLink
            to="/profile/statistics"
            text="Статистика"
            icon={<Icon color="white" icon="StatisticIcon" size="54" />}
          />

          <SideMenuLink
            to="/profile/tasks"
            text="Создание / Редактирование заявки"
            icon={<Icon color="white" icon="CreateApplication" size="54" />}
          />
        </>
      }
    />
  );
};
