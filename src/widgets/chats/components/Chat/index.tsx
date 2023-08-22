import { ChangeEvent, useState } from 'react';
import classnames from 'classnames';

import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';

import { IMessage, IChatMateInfo } from '../../libs/types';
import { sortMessages } from '../../libs/utils';

import styles from './styles.module.css';
import { SendIcon } from '../../../../shared/ui/icons/send-icon';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { KeyIcon } from '../../../../shared/ui/icons/key-icon';
import { TemplateAnswers } from '../../../../shared/ui/template-answers';

interface IChatProps {
  messages: IMessage[];
  chatMateInfo: IChatMateInfo;
  onAttachFileClick?: () => void;
  onMessageSend?: (message: string) => void;
  parentPage: 'in-work' | 'waiting' | 'conflicts';
  onClose: () => void;
}

export const Chat = ({
  messages,
  chatMateInfo,
  onAttachFileClick,
  onMessageSend,
  parentPage,
  onClose,
}: IChatProps) => {
  const answersList = [
    'Здравствуйте, спасибо, что обратились.',
    'Я не могу ответить прямо сейчас, но обязательно вернусь с ответом в течении часа.',
    'Будут вопросы — обращайтесь.',
  ];

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
      <div className={classnames(styles.chatWrapper)}>
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
                  {`ID ${chatMateInfo.userId}`}
                </p>
              </div>
              <CloseCrossIcon onClick={onClose} color={'blue'} />
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
        <div className={classnames(styles.messagesBlock)}>
          {sortedMessages?.map((message) => (
            <Message
              type={
                message.userId === chatMateInfo.userId ? 'incoming' : 'outgoing'
              }
              messageText={message.text}
              avatarLink={message.userAvatarLink}
              key={message.messageId}
            />
          ))}
          {parentPage === 'in-work' ? (
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
        {parentPage === 'in-work' ? (
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
            <TemplateAnswers answers={answersList} />
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