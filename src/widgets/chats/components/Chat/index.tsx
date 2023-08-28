import { ChangeEvent, useEffect, useState } from 'react';
import classnames from 'classnames';

import { PinIcon } from 'shared/ui/icons/pin-icon';
import { Avatar } from 'shared/ui/avatar';
import { Message } from 'shared/ui/message';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';

import styles from './styles.module.css';
import { SendIcon } from '../../../../shared/ui/icons/send-icon';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { KeyIcon } from '../../../../shared/ui/icons/key-icon';
import { TemplateAnswers } from '../../../../shared/ui/template-answers';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchMessages, getSelectedChat } from '../../model/chat';
import { LightPopup } from '../../../../shared/ui/light-popup';
import { ArrowIcon } from '../../../../shared/ui/icons/arrow-icon';
import { adminNotifications } from '../../libs/utils';

interface IChatProps {
  onClose: () => void;
  isMobile: boolean;
}

export const Chat = ({ onClose, isMobile }: IChatProps) => {
  const { pathname } = useLocation();
  const { chatId } = useParams();
  const answersList = [
    'Здравствуйте, спасибо, что обратились.',
    'Я не могу ответить прямо сейчас, но обязательно вернусь с ответом в течении часа.',
    'Будут вопросы — обращайтесь.',
  ];

  const [inputValue, setInputValue] = useState<string>('');

  const chatState = useAppSelector((state) => state.chats);
  const selectedChat = getSelectedChat(chatState, chatId ?? '');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMessages(chatId ?? ''));
  }, []);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleSendClick = () => {
    // if (onMessageSend) {
    //   onMessageSend(inputValue);
    // }
  };

  return (
    <>
      {isMobile ? (
        <LightPopup
          extClassName={styles.popUp}
          onClickExit={onClose}
          isPopupOpen={true}
        >
          <div className={styles.wrapper}>
            {selectedChat && (
              <div className={classnames(styles.chatWrapper)}>
                <div className={styles.info}>
                  <ArrowIcon size={'32'} onClick={onClose} color={'blue'} />
                  <Avatar
                    avatarName="Фотография собеседника"
                    avatarLink={selectedChat.userAvatarLink}
                    extClassName={styles.avatar}
                  />
                  <p
                    className={classnames(
                      'text',
                      'text_size_medium',
                      styles.name
                    )}
                  >
                    {selectedChat.name}
                  </p>
                </div>
                <div className={styles.line}></div>
                <div className={classnames(styles.messagesBlock)}>
                  {chatState.messagesList.map((message) => (
                    <Message
                      type={
                        message.userId === selectedChat?.userId
                          ? 'incoming'
                          : 'outgoing'
                      }
                      messageText={message.text}
                      avatarLink={message.userAvatarLink}
                      key={message.messageId}
                    />
                  ))}
                  {pathname.includes('in-work') ? (
                    <div className={styles.notification}>
                      <p
                        className={classnames(
                          'text',
                          'text_size_small',
                          'text_type_bold',
                          styles.notificationText
                        )}
                      >
                        {adminNotifications[2]}
                      </p>
                      <div className={styles.line}></div>
                      <KeyIcon color={'white'} />
                    </div>
                  ) : undefined}
                </div>
              </div>
            )}
            {pathname.includes('in-work') ? (
              <>
                <div className={classnames(styles.answerZone)}>
                  <div className={classnames(styles.inputWrapper)}>
                    <Input
                      placeholder="Напишите сообщение..."
                      value={inputValue}
                      name="message"
                      extClassName={styles.input}
                      onChange={handleInputChange}
                      customIcon={
                        <PinIcon
                          size="24"
                          color="blue"
                          // onClick={onAttachFileClick}
                        />
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
        </LightPopup>
      ) : (
        <div className={styles.wrapper}>
          <div className={classnames(styles.chatWrapper)}>
            {selectedChat && (
              <>
                <Avatar
                  avatarName="Фотография собеседника"
                  avatarLink={selectedChat.userAvatarLink}
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
                        {selectedChat.name}
                        <p
                          className={classnames(
                            'text',
                            'text_size_micro',
                            styles.id
                          )}
                        >
                          {`ID ${selectedChat.userId}`}
                        </p>
                      </div>
                      <CloseCrossIcon onClick={onClose} color={'blue'} />
                    </div>
                    {selectedChat.phone && (
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
                        <span
                          className={classnames('text', 'text_size_medium')}
                        >
                          {selectedChat.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.chat}>
            <div className={classnames(styles.messagesBlock)}>
              {chatState.messagesList.map((message) => (
                <Message
                  type={
                    message.userId === selectedChat?.userId
                      ? 'incoming'
                      : 'outgoing'
                  }
                  messageText={message.text}
                  avatarLink={message.userAvatarLink}
                  key={message.messageId}
                />
              ))}
              {pathname.includes('in-work') ? (
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
            {pathname.includes('in-work') ? (
              <>
                <div className={classnames(styles.inputWrapper)}>
                  <Input
                    placeholder="Напишите сообщение..."
                    value={inputValue}
                    name="message"
                    extClassName={styles.input}
                    onChange={handleInputChange}
                    customIcon={
                      <PinIcon
                        size="24"
                        color="blue"
                        // onClick={onAttachFileClick}
                      />
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
      )}
    </>
  );
};
