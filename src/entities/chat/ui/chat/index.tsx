import { ChangeEvent, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';

// import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';

import { sortMessages } from './libs/utils';
import { SquareButton } from 'shared/ui/square-buttons';

import styles from './styles.module.css';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { IMessage } from 'shared/types/message';
import { IChatmateInfo } from 'shared/types/conflict';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { MessagesList } from './components/messages-list';
import { Breakpoints } from 'shared/config';

interface PopupChatProps {
  messages: IMessage[];
  chatmateInfo: IChatmateInfo;
  onAttachFileClick: () => void;
  onMessageSend?: (message: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

export const PopupChat = ({
  messages,
  chatmateInfo,
  onMessageSend,
  isOpen,
  onClick,
}: PopupChatProps) => {
  const isMobile = useMediaQuery(Breakpoints.S);
  const [inputValue, setInputValue] = useState<string>('');
  const openedChatPopupRef = useRef<HTMLDivElement>(null);
  const sortedMessages = sortMessages(messages);

  const [mesagesInChat] = useState(sortedMessages);
  const [currentMessagesPage, setCurrentMessagesPage] = useState(1);
  const [messagesShown] = useState(10);

  const lastMessage = currentMessagesPage * messagesShown;
  const firstMessage = 0;
  const currentMessages = mesagesInChat.slice(firstMessage, lastMessage);

  useEffect(() => {
    openedChatPopupRef.current?.addEventListener('scroll', scrollHandler);

    return function () {
      openedChatPopupRef.current?.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e: Event) => {
    const targetDiv: HTMLDivElement = e.target as HTMLDivElement;
    if (
      targetDiv.clientHeight + targetDiv.scrollTop >=
      targetDiv.scrollHeight - 5
    ) {
      setCurrentMessagesPage((prevState) => prevState + 1);
    }
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleSendClick = () => {
    if (onMessageSend) {
      onMessageSend(inputValue);
    }
  };

  return (
    <div
      className={classnames(styles.chatWrapper, {
        [styles.chatWrapper_action]: isOpen,
      })}
    >
      {!isMobile && (
        <SquareButton
          buttonType="close"
          onClick={onClick}
          extClassName={styles['btn-close']}
        />
      )}

      <div className={styles.mainBlock}>
        {isMobile && (
          <Icon
            color="blue"
            icon="ArrowIcon"
            size="32"
            className={styles.arrow}
            onClick={onClick}
          />
        )}
        <Avatar
          avatarName="Фотография собеседника"
          avatarLink={chatmateInfo.userAvatarLink}
          extClassName={styles.avatar}
        />

        <h4 className={classnames('text', 'text_type_regular', styles.name)}>
          {chatmateInfo.name}
        </h4>
      </div>
      {isMobile && <GradientDivider />}
      <div className={styles['container-chat']}>
        <div ref={openedChatPopupRef} id="openedChatPopup" className={styles.messagesBlock}>
          <MessagesList
            currentMessages={currentMessages}
            chatmateInfo={chatmateInfo}
          />
        </div>

        <InputWrapper
          extClassInput={classnames({
            [styles.input_inner_mobile]: isMobile && isOpen,
          })}
          extClass={classnames({
            [styles.input_container_mobile]: isMobile && isOpen,
          })}
          customIconSize={isMobile ? '32' : '24'}
          getFile={() => {}}
          placeholder="Напишите сообщение..."
          inputValue={inputValue}
          name="message"
          onChange={handleInputChange}
          onClickBtn={handleSendClick}
          containerMessages={false}
        />
      </div>
    </div>
  );
};
