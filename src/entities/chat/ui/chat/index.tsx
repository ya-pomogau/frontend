import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';

// import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';

import { sortMessages } from './libs/utils';
import { SquareButton } from 'shared/ui/square-buttons';

import styles from './styles.module.css';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { IMessage } from 'shared/types/message';
import { IChatmateInfo } from 'shared/types/conflict';
import { GradientDivider } from 'shared/ui/gradient-divider';

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
