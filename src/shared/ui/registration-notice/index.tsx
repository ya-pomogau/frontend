import classnames from 'classnames';

import styles from './styles.module.css';
import { RoundButton } from '../round-button';

interface RegistrationNoticeProps {
  extClassName?: string;
  settingText: string;
}

export const RegistrationNotice = ({
  extClassName,
  settingText = 'Спасибо за регистрацию. Как только администратор подтвердит Вашу учетную запись, Вы сможете откликаться на заявки.',
}: RegistrationNoticeProps) => (
  <div className={classnames(styles.container, extClassName)}>
    <RoundButton
      buttonType="message"
      onClick={() => console.log('message button pressed')}
    />
    <p
      className={classnames(
        styles.settingText,
        'text',
        'text_size_medium',
        'm-0',
        'p-0'
      )}
    >
      {settingText}
    </p>
  </div>
);
