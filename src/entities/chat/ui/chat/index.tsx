import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';

import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';
import { SendIcon } from 'shared/ui/icons/send-icon';

import { IMessage, IChatmateInfo } from './types';
import { sortMessages } from './libs/utils';
import { SquareButton } from 'shared/ui/square-buttons';

import styles from './styles.module.css';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';

interface PopupChatProps {
  messages: IMessage[];
  chatmateInfo: IChatmateInfo;
  onAttachFileClick: () => void;
  onMessageSend: (message: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

export const PopupChat = ({
  messages,
  chatmateInfo,
  onAttachFileClick,
  onMessageSend,
  isOpen,
  onClick,
}: PopupChatProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [inputValue, setInputValue] = useState<string>('');
  const sortedMessages = sortMessages(messages);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleSendClick = () => {
    onMessageSend(inputValue);
  };

  const getBtnIcon = () => <SendIcon size="24" color="white" />;

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

      <div className={styles['container-chat']}>
        <div className={styles.messagesBlock}>
          {sortedMessages?.map((message) => (
            <Message
              type={
                message.userId === chatmateInfo.userId ? 'incoming' : 'outgoing'
              }
              messageText={message.message}
              avatarLink={message.userAvatarLink}
              key={message.id}
            />
          ))}
        </div>

        <InputWrapper
          placeholder="Напишите сообщение..."
          inputValue={inputValue}
          name="message"
          onChange={handleInputChange}
          customIcon={
            <PinIcon size="24" color="blue" onClick={onAttachFileClick} />
          }
          customIconBtn={getBtnIcon()}
          onClickBtn={handleSendClick}
        />
      </div>
    </div>
  );
};
