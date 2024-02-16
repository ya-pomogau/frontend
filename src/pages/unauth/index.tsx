import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { MapWithTasks } from 'widgets/map-with-tasks';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

export function UnauthPage() {
  const { role } = useAppSelector((state) => state.user);
  if (role) {
    return <Navigate to="/profile" replace />;
  }

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
