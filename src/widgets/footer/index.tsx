import { BottomBar } from 'shared/ui/bottom-bar';

import styles from './style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <BottomBar extClassName={styles.footer__image} />
    </footer>
  );
};

export default Footer;
