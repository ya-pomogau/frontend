import { FC } from 'react';

import { useAppSelector } from 'app/hooks';
import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';

export const AdminSideMenu: FC = () => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <SideMenu
      overlayVisible={!role}
      links={
        <>
          <SideMenuLink
            to="/requests"
            text="Подтверждение / Блокировка"
            icon={<Icon color="white" icon="BlockIcon" size="54" />}
          />

          <SideMenuLink
            to="/statistics"
            text="Статистика"
            icon={<Icon color="white" icon="StatisticIcon" size="54" />}
          />

          <SideMenuLink
            to="/tasks"
            text="Создание / Редактирование заявки"
            icon={<Icon color="white" icon="CreateApplication" size="54" />}
          />
        </>
      }
    />
  );
};
