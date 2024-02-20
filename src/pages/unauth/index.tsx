import { Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { MapWithTasks } from 'widgets/map-with-tasks';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { useEffect } from 'react';

export function UnauthPage() {
  // const { role } = useAppSelector((state) => state.user);
  // if (role) {
  //   return <Navigate to="/profile" replace />;
  // }
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
