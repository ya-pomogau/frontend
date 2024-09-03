import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { MapWithTasks } from 'widgets';
import { SmartHeader, Icon } from 'shared/ui';
import { useUser } from 'shared/hooks';
import { Routes } from 'shared/config';

export function UnauthPage() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user) {
      navigate(Routes.PROFILE);
    }
  }, [user]);

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
