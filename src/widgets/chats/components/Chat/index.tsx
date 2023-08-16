import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';

import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';

import { IMessage, IChatMateInfo } from './types';
import { sortMessages } from '../../libs/utils';

import styles from './styles.module.css';
import { SendIcon } from '../../../../shared/ui/icons/send-icon';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { KeyIcon } from '../../../../shared/ui/icons/key-icon';

interface IChatProps {
  extClassName?: string;
  messagesWrapperExtClassName?: string;
  messages: IMessage[];
  chatMateInfo: IChatMateInfo;
  onAttachFileClick?: () => void;
  onMessageSend?: (message: string) => void;
}

export const Chat = ({
  extClassName,
  messagesWrapperExtClassName,
  messages,
  chatMateInfo,
  onAttachFileClick,
  onMessageSend,
}: IChatProps) => {
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
    <div className={styles.wrapper}>
      <div className={classnames(styles.chatWrapper, extClassName)}>
        <Avatar
          avatarName="Фотография собеседника"
          avatarLink={chatMateInfo.avatar}
          extClassName={styles.avatar}
        />

        <div className={styles.profile}>
          <div className={styles.userInfo}>
            <div
              className={classnames(
                'm-0',
                'text',
                'text_size_large',
                'text_type_regular',
                styles.info
              )}
            >
              <div className={styles.data}>
                {chatMateInfo.name}
                <p className={classnames('text', 'text_size_micro', styles.id)}>
                  {`ID ${chatMateInfo.id}`}
                </p>
              </div>
              <CloseCrossIcon color={'blue'} />
            </div>
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
        </div>
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
                message.userId === chatMateInfo.id ? 'incoming' : 'outgoing'
              }
              messageText={message.text}
              avatarLink={message.userAvatarLink}
              key={message.messageId}
            />
          ))}
          {window.location.pathname.includes('/in-work') ? (
            <div className={styles.notification}>
              <p
                className={classnames(
                  'text',
                  'text_size_medium',
                  'text_type_bold',
                  styles.notificationText
                )}
              >
                Волонтер достиг 3-го уровня доверия. Выдайте ему ключ
              </p>
              <div className={styles.line}></div>
              <KeyIcon color={'white'} />
            </div>
          ) : undefined}
        </div>
        {window.location.pathname.includes('/in-work') ? (
          <>
            <div className={classnames(styles.inputWrapper)}>
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
                customIcon={<SendIcon color={'white'} />}
                size="small"
                onClick={handleSendClick}
                extClassName={styles.sendButton}
                disabled={!inputValue}
              />
            </div>
            <div className={classnames(styles.answers)}>
              <p
                className={classnames('text', 'text_size_small', styles.answer)}
              >
                Здравствуйте, спасибо, что обратились.
              </p>
              <p
                className={classnames('text', 'text_size_small', styles.answer)}
              >
                Я не могу ответить прямо сейчас, но обязательно вернусь с
                ответом в течении часа.
              </p>
              <p
                className={classnames('text', 'text_size_small', styles.answer)}
              >
                Будут вопросы — обращайтесь.
              </p>
            </div>
          </>
        ) : (
          <Button
            customIcon={<EmptyMessageIcon color={'white'} />}
            buttonType="primary"
            label="Взять в работу"
            size="medium"
            onClick={handleSendClick}
            extClassName={classnames(
              'text',
              'text_size_medium',
              styles.buttonTakeInWork
            )}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
};
