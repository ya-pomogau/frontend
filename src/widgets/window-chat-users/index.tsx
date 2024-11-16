import cn from 'classnames';
import { ReactElement, FC, useRef } from 'react';
import styles from './styles.module.css';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { Breakpoints } from 'shared/config';
import { useLazyScroll } from 'entities/chat/ui/chat/hooks/useLazyScroll';
import { MessageInterface } from 'shared/types/chat.types';
import { Message } from 'shared/ui';
import { AnyUserInterface } from 'shared/types/user.type';
import { Typography } from 'shared/ui';

interface IWindowChatUsers {
  isOpen: boolean;
  chatmateInfo?: AnyUserInterface;
  boxButton: ReactElement;
  close: () => void;
  messages?: MessageInterface[];
}

export const WindowChatUsers: FC<IWindowChatUsers> = ({
  messages = [],
  isOpen,
  close,
  chatmateInfo,
  boxButton,
}) => {
  const openedChatPopupRef = useRef<HTMLDivElement>(null);
  const currentMessages = useLazyScroll({
    messages,
    openedChatPopupRef,
  });

  const isMobile = useMediaQuery(Breakpoints.S);

  const handleClick = () => {
    close();
  };

  return (
    <article className={cn(styles.box, { [styles.box_action]: isOpen })}>
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
          <Typography
            tag={'h3'}
            variant={'titleResize'}
            fontFamily={'secondaryFont'}
            content={chatmateInfo?.name}
            extraClass={styles.name}
          />
          <Typography
            color={'ID-text'}
            variant={'servicesText'}
            content={`ID ${chatmateInfo?._id}`}
            extraClass={styles['display-none']}
          />
          <div className={cn(styles.phone, styles['display-none'])}>
            <Typography
              fontFamily={'secondaryFont'}
              variant={'paragraph-bold'}
              content={'Тел.:'}
            />
            <Typography
              fontFamily={'secondaryFont'}
              content={chatmateInfo?.phone}
            />
          </div>
        </div>
        {isMobile && (
          <GradientDivider extClassName={styles['gradient-divider']} />
        )}
      </div>
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

      {!isMobile ? (
        <Icon
          onClick={handleClick}
          className={cn(styles['btn-close'], styles.cursor)}
          color="#9798C9"
          icon="CloseCrossIcon"
          size="14"
        />
      ) : (
        <GradientDivider />
      )}
      <div className={styles.isMobile}>{boxButton}</div>
    </article>
  );
};
