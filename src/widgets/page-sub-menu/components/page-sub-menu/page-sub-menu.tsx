import { ReactElement } from 'react';

import styles from './page-sub-menu.module.css';
import cn from 'classnames';

interface PageSubMenuProps {
  links: ReactElement;
  style?: string;
}

export const PageSubMenu = ({ links, style }: PageSubMenuProps) => {
  return <div className={cn(styles.tabContainer, style)}>{links}</div>;
};
