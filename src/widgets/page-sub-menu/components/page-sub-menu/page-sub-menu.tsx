import { ReactElement } from 'react';

import styles from './page-sub-menu.module.css';

interface PageSubMenuProps {
  links: ReactElement;
}

export const PageSubMenu = ({ links }: PageSubMenuProps) => {
  return <div className={styles.tabContainer}>{links}</div>;
};
