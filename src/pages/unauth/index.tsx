import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppSelector } from 'app/hooks';
import { MapWithTasks } from 'widgets/map-with-tasks';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

export function UnauthPage() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    if (user) {
      navigate('/profile');
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
