import classnames from 'classnames';

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
  filterItemsConfig?: TFilterItems;
  imageSrc: string;
  imageAlt: string;
  centered?: boolean;
  children?: ReactNode;
}

export const ErrorBoundaryUI: FC<IErrorBoundaryUI> = ({
  errorText,
  iconConfig,
  headerText,
  filterItemsConfig,
  imageSrc,
  imageAlt,
  centered=true,
  children,
}) => {
  return (
    <>
      {errorText && <ErrorDialog text={errorText}></ErrorDialog>}
      <SmartHeader
        icon={<Icon {...iconConfig} />}
        text={headerText}
        filter={filterItemsConfig && <Filter items={filterItemsConfig} />}
      />
      <div className={classnames(styles.content_box, {[styles.centered]: centered})}>
        <img className={styles.image} src={imageSrc} alt={imageAlt}></img>
        {children && children}
      </div>
    </>
  );
};
