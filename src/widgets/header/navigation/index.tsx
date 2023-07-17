import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import type { ISideBarElementProps, ISideBarProps } from './types';

import styles from './styles.module.css';

const SideBarItem = ({ title, to, icon, position }: ISideBarElementProps) => {
  const { pathname } = useLocation();
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    setLink(pathname);
  }, [pathname]);

  return (
    <NavLink
      to={to}
      className={`${styles.link} ${
        to === link ? styles.link_active : undefined
      }`}
      style={{
        flexDirection: position?.flexDirection,
        justifyContent: position?.justifyContent,
        gap: position?.gap,
        textAlign: position?.textAlign,
      }}
    >
      <div className={`${styles.link__icon} `}>{icon}</div>
      <p className={`${styles.link__title} `}>{title}</p>
    </NavLink>
  );
};

export const SideBar = ({ links, position }: ISideBarProps) => (
  <nav className={`${styles.nav} `}>
    <ul
      className={`${styles.links} `}
      style={{ flexDirection: position.ulflexDirection, gap: position.ulgap }}
    >
      {links.map((item) => (
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
