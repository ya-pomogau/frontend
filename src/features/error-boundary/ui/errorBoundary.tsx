import { ErrorDialog, Icon, SmartHeader } from '../../../shared/ui';
import { Filter } from '../../filter';
import styles from '../styles.module.css';
import { FC, ReactNode } from 'react';
import { TFilterItems } from '../../filter/types';
import { IconProps } from '../../../shared/ui/icons';

interface IErrorBoundaryUI {
  errorText?: string;
  iconConfig: IconProps;
  headerText: string;
  filterItemsConfig: TFilterItems;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
}

export const ErrorBoundaryUI: FC<IErrorBoundaryUI> = ({
  errorText,
  iconConfig,
  headerText,
  filterItemsConfig,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <>
      {errorText && <ErrorDialog text={errorText}></ErrorDialog>}
      <SmartHeader
        icon={<Icon {...iconConfig} />}
        text={headerText}
        filter={<Filter items={filterItemsConfig} />}
      />
      <div className={styles.content_box}>
        <img className={styles.image} src={imageSrc} alt={imageAlt}></img>
        {children && children}
      </div>
    </>
  );
};
