import classnames from 'classnames';
import { Avatar } from '../avatar';

import styles from './styles.module.css';

interface MessageProps {
  extClassName?: string;
  type: 'incoming' | 'outgoing';
  messageText: string;
  avatarLink: string;
}

export const Message = ({
  extClassName,
  type,
  messageText,
  avatarLink,
}: MessageProps) => {
  const getAvatar = () => (
    <Avatar
      avatarName="Фотография пользователя"
      avatarLink={avatarLink}
      extClassName={styles.avatar}
    />
  );

  const getMessageBlock = () => (
    <div className={styles.messageBlock}>
      <div className={classnames(styles.message, styles[`message--${type}`])}>
        <span className={classnames(styles.text, 'text', 'text_size_small')}>
          {messageText}
        </span>
      </div>
    </div>
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
    </div>
  );
};
