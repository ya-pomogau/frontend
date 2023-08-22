import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';

import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { SendIcon } from 'shared/ui/icons/send-icon';

import { IMessage, IChatMateInfo } from '../../libs/types';
import { sortMessages } from '../../libs/utils';

import styles from './styles.module.css';

interface ChatProps {
  extClassName?: string;
  messagesWrapperExtClassName?: string;
  messages: IMessage[];
  chatMateInfo: IChatMateInfo;
  onAttachFileClick?: () => void;
  onMessageSend: (message: string) => void;
}

export const PopUpChat = ({
  extClassName,
  messagesWrapperExtClassName,
  messages,
  chatMateInfo,
  onAttachFileClick,
  onMessageSend,
}: ChatProps) => {
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
    <div className={classnames(styles.chatWrapper, extClassName)}>
      <Avatar
        avatarName="Фотография собеседника"
        avatarLink={chatMateInfo.avatar}
        extClassName={styles.avatar}
      />

      <div className={styles.mainBlock}>
        <div className={styles.userInfo}>
          <h1
            className={classnames(
              'm-0',
              'text',
              'text_size_large',
              'text_type_regular'
            )}
          >
            {chatMateInfo.name}
          </h1>
          {chatMateInfo?.phone && (
            <div className={styles.phoneInfo}>
              <span
                className={classnames(
                  'text',
                  'text_size_medium',
                  'text_type_bold'
                )}
              >
                Тел.:
              </span>
              <span className={classnames('text', 'text_size_medium')}>
                {chatMateInfo.phone}
              </span>
            </div>
          )}
        </div>
        <div className={styles.chat}>
          <div
            className={classnames(
              styles.messagesBlock,
              messagesWrapperExtClassName
            )}
          >
            {sortedMessages?.map((message) => (
              <Message
                type={
                  message.userId === chatMateInfo.userId
                    ? 'incoming'
                    : 'outgoing'
                }
                messageText={message.text}
                avatarLink={message.userAvatarLink}
                key={message.messageId}
              />
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="Напишите сообщение..."
              value={inputValue}
              name="message"
              extClassName={styles.input}
              onChange={handleInputChange}
              customIcon={
                <PinIcon size="24" color="blue" onClick={onAttachFileClick} />
              }
            />
            <Button
              buttonType="primary"
              customIcon={getBtnIcon()}
              size="small"
              onClick={handleSendClick}
              extClassName={styles.button}
              disabled={!inputValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
