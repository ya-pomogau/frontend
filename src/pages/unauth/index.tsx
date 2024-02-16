import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { MapWithTasks } from 'widgets/map-with-tasks';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { useState } from 'react';

export function UnauthPage() {
  const { role } = useAppSelector((state) => state.user);
  if (role) {
    return <Navigate to="/profile" replace />;
  }
  // // const variable array to save the users location
  // const [userLocation, setUserLocation] = useState<Array<number>>([]);

  // // define the function that finds the users geolocation
  // const getUserLocation = () => {
  //   // if geolocation is supported by the users browser
  //   if (navigator.geolocation) {
  //     // get the current users location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // save the geolocation coordinates in two variables
  //         const { latitude, longitude } = position.coords;
  //         // update the value of userlocation variable
  //         setUserLocation([latitude, longitude]);
  //       },
  //       // if there was an error getting the users location
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   }
  //   // if geolocation is not supported by the users browser
  //   else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };

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
