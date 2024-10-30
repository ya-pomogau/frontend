import image from '../assets/no-conection.png';
import { IconProps } from 'shared/ui/icons';
import { ErrorBoundaryUI } from '../ui/errorBoundary';

export const NoConnectionPage = (props: { errorText: string }) => {
  const { errorText } = props;
  const iconConfig: IconProps = {
    color: 'blue',
    icon: 'MapApplicationIcon',
    size: '54',
  };
  const filterItemsConfig = {
    categories: true,
    radius: true,
    date: true,
  };

  return (
    <ErrorBoundaryUI
      errorText={errorText}
      iconConfig={iconConfig}
      imageAlt="disconnection_image"
      imageSrc={image}
      filterItemsConfig={filterItemsConfig}
      headerText="Карта заявок"
    />
  );
};
