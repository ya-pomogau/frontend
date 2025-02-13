import classnames from 'classnames';
import { Avatar } from '../avatar';

import styles from './styles.module.css';
import { Icon } from '../icons';
import { GradientDivider } from '../gradient-divider';
import { Typography } from '../../ui';

interface MessageProps {
  extClassName?: string;
  type: 'incoming' | 'outgoing' | 'achievement' | 'send';
  messageText: string;
  avatarLink: string;
  timestamp: Date | string | null;
}

export const Message = ({
  extClassName,
  type,
  messageText,
  avatarLink,
  timestamp,
}: MessageProps) => {
  const getAvatar = () =>
    type !== 'achievement' &&
    type !== 'send' && (
      <Avatar
        avatarName="Фотография пользователя"
        avatarLink={avatarLink}
        size={'tiny'}
      />
    );

  const getMessageBlock = () =>
    type !== 'achievement' &&
    type !== 'send' && (
      <div className={styles.messageBlock}>
        <div className={classnames(styles.message, styles[`message--${type}`])}>
          <Typography
            tag={'span'}
            color={'white'}
            fontFamily={'secondaryFont'}
            variant={'support'}
            content={messageText}
            extraClass={styles.text}
          />
          <br />
          <Typography
            tag={'span'}
            color={'primary-additional'}
            fontFamily={'primaryFont'}
            variant={'support'}
            content={new Date(timestamp as Date).toLocaleString('ru-Ru', {
              day: 'numeric',
              year: '2-digit',
              month: 'numeric',
              timeZone: 'UTC',
              hour: 'numeric',
              minute: 'numeric',
            })}
            extraClass={styles.text}
          />
        </div>
      </div>
    );

  const getAchievement = () => (
    <Typography
      fontFamily={'secondaryFont'}
      variant={'support'}
      extraClass={styles['achievement-title']}
      color={'white'}
      content={
        <>
          {messageText}
          <GradientDivider extClassName={styles['gradient-divider']} />
          <Icon color="blue" icon="KeyIcon" />
        </>
      }
    />
  );

  const getSendMeassage = () => (
    <Typography
      fontFamily={'secondaryFont'}
      variant={'support'}
      content={messageText}
      color={'white'}
    />
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
