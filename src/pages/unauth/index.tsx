import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { MapWithTasks } from 'widgets';
import { SmartHeader, Icon } from 'shared/ui';
import { useMediaQuery, useUser } from 'shared/hooks';
import { Breakpoints, Routes } from 'shared/config';

export function UnauthPage() {
  const navigate = useNavigate();
  const user = useUser();
  const pathname = window.localStorage.getItem('currentPathName');
  const isMobile = useMediaQuery(Breakpoints.L);

  useEffect(() => {
    if (user && !isMobile) {
      navigate(Routes.PROFILE);
    } else if (
      user &&
      isMobile &&
      (pathname === Routes.ROOT || pathname === Routes.LOGIN)
    ) {
      navigate(Routes.PROFILE);
    } else if (user && isMobile && !(pathname === Routes.ROOT)) {
      navigate(pathname ? pathname : Routes.PROFILE);
    }
  }, [user, isMobile]);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
      />
      <MapWithTasks />
    </>
  );
}
