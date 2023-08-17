import classnames from 'classnames';

import { RoundButton } from '../round-button';
import styles from './styles.module.css';

interface RegistrationNoticeProps {
  extClassName?: string;
  settingText: string;
}

export const RegistrationNotice = ({
  extClassName,
  settingText,
}: RegistrationNoticeProps) => {
  if (settingText.length === 0) {
    return null;
  }

  return (
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
};
