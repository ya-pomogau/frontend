import { SideBarItem } from './sidebar-item';

import type { ISideBarProps } from './types';

import styles from './styles.module.css';

export const SideBar = ({ links, position }: ISideBarProps) => {
  const linksListConfig = {
    flexDirection: position.ulflexDirection,
    gap: position.ulgap,
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.links} style={linksListConfig}>
        {links?.map((item) => (
          <SideBarItem
            key={item.to}
            title={item.title}
            to={item.to}
            icon={item.icon}
            position={position.element}
          />
        ))}
      </ul>
    </nav>
  );
};
