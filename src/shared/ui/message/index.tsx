import classnames from 'classnames';
import { Avatar } from '../avatar';

import styles from './styles.module.css';
import { GradientDivider } from '../gradient-divider';
import { Icon } from '../icons';

interface MessageProps {
  extClassName?: string;
  type: 'incoming' | 'outgoing' | 'achievement' | 'send';
  messageText: string;
  avatarLink: string;
}

export const Message = ({
  extClassName,
  type,
  messageText,
  avatarLink,
}: MessageProps) => {
  const getAvatar = () =>
    type !== 'achievement' &&
    type !== 'send' && (
      <Avatar
        avatarName="Фотография пользователя"
        avatarLink={avatarLink}
        extClassName={styles.avatar}
      />
    );

  const getMessageBlock = () =>
    type !== 'achievement' &&
    type !== 'send' && (
      <div className={styles.messageBlock}>
        <div className={classnames(styles.message, styles[`message--${type}`])}>
          <span className={classnames(styles.text, 'text', 'text_size_small')}>
            {messageText}
          </span>
        </div>
      </div>
    );

  const getAchievement = () => (
    <p
      className={classnames(
        styles['achievement-title'],
        'text',
        'text_size_small'
      )}
    >
      {messageText}
      <GradientDivider extClassName={styles['gradient-divider']} />
      <Icon color="blue" icon="KeyIcon" />
    </p>
  );

  const getSendMeassage = () => (
    <p
      className={classnames(
        'm-0',
        'text',
        'text_size_small',
        'text_type_regular'
      )}
    >
      {messageText}
    </p>
  );

  return (
    <div
      className={classnames(
        styles.wrapper,
        styles[`wrapper--${type}`],
        extClassName
      )}
    >
      {type === 'incoming' ? getAvatar() : getMessageBlock()}
      {type === 'incoming' ? getMessageBlock() : getAvatar()}
      {type === 'achievement' && getAchievement()}
      {type === 'send' && getSendMeassage()}
    </div>
  );
};
