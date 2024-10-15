import cn from 'classnames';
import { ReactElement, ReactNode, FC, useRef } from 'react';
import styles from './styles.module.css';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { UserProfile } from 'entities/user/types';
import { Breakpoints } from 'shared/config';
import { useLazyScroll } from 'entities/chat/ui/chat/hooks/useLazyScroll';
import { MessageInterface } from 'shared/types/chat.types';
import { Message } from 'shared/ui';

interface IWindowInteractionUsers {
  option: 'conflict' | 'chat';
  isOpen: boolean;
  onClick?: (text: string) => void;

  chatmateInfo?: UserProfile;
  boxButton: ReactElement;
  closeConflict: () => void;
  messages: MessageInterface[];
}

export const WindowInteractionUsers: FC<IWindowInteractionUsers> = ({
  messages,
  isOpen,
  closeConflict,
  chatmateInfo,
  boxButton,
  option,
}) => {
  const openedChatPopupRef = useRef<HTMLDivElement>(null);
  const currentMessages = useLazyScroll({ messages, openedChatPopupRef });

  const isMobile = useMediaQuery(Breakpoints.S);

  const handleClick = () => {
    closeConflict();
  };

  return (
    <article className={cn(styles.box, { [styles.box_action]: isOpen })}>
      {option === 'chat' ? (
        <div className={styles['user-info']}>
          {isMobile && (
            <Icon
              onClick={handleClick}
              className={styles.cursor}
              color="#9798C9"
              icon="ArrowIcon"
              size="32"
            />
          )}
          <img className={styles.img} src={chatmateInfo?.avatar} alt="фото" />
          <div className={styles.container}>
            <p
              className={cn(
                'text-inter',
                'm-0',
                'text_size_large',
                'text_type_regular',
                styles.name
              )}
            >
              {chatmateInfo?.name}
            </p>
            <p
              className={cn(
                'text',
                'm-0',
                'text_type_regular',
                styles.id,
                styles['display-none']
              )}
            >{`ID ${chatmateInfo?._id}`}</p>
            <p
              className={cn(
                'text-inter',
                'm-0',
                'text_size_medium',
                'text_type_regular',
                styles['display-none'],
                styles.phone
              )}
            >
              <span
                className={cn(
                  'text_size_medium',
                  'text-inter',
                  'text_type_bold',
                  styles['display-none'],
                  styles.span
                )}
              >
                Тел.:
              </span>
              {chatmateInfo?.phone}
            </p>
          </div>
          {isMobile && (
            <GradientDivider extClassName={styles['gradient-divider']} />
          )}
        </div>
      ) : (
        <div className={styles['container-mobile']}>
          {isMobile && (
            <Icon
              onClick={handleClick}
              className={cn(styles.arrow, styles.cursor)}
              color="#9798C9"
              icon="ArrowIcon"
              size="32"
            />
          )}
          <h4
            className={cn(
              'm-0',
              'text-inter',
              'text_size_large',
              'text_type_regular'
            )}
          >
            Конфликт
          </h4>
          {isMobile && (
            <GradientDivider extClassName={styles['gradient-divider']} />
          )}
        </div>
      )}
      <div ref={openedChatPopupRef} className={styles['content-container']}>
        {chatmateInfo &&
          currentMessages?.map((message) => (
            <Message
              type={
                message.author._id === chatmateInfo._id
                  ? 'incoming'
                  : 'outgoing'
              }
              messageText={message.body}
              avatarLink={message.author.avatar}
              key={message._id}
              createdAt={message.createdAt}
            />
          ))}
      </div>
      {!isMobile && (
        <Icon
          onClick={handleClick}
          className={cn(styles['btn-close'], styles.cursor)}
          color="#9798C9"
          icon="CloseCrossIcon"
          size="14"
        />
      )}
      {isMobile && <GradientDivider />}
      <div className={styles.isMobile}>{boxButton}</div>
    </article>
  );
};
