import { BottomBar } from 'shared/ui/bottom-bar';

import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <BottomBar extClassName={styles.footer__image} />
    </footer>
  );
};

export default Footer;