import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Button } from 'shared/ui/button';

import styles from '../styles.module.css';

export const UnauthorizedUser = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonsWrapper}>
      <Button
        extClassName={classnames(
          styles['nested-buttons'],
          styles['registration-button']
        )}
        buttonType="primary"
        label="Зарегистрироваться"
        onClick={() => navigate('/register')}
        size="extraLarge"
      />
      <Button
        extClassName={styles['nested-buttons']}
        buttonType="secondary"
        label="Войти"
        onClick={() => navigate('/login')}
        size="extraLarge"
      />
    </div>
  );
};
