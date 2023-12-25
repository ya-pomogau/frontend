import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { IChatmateInfo, IMessage } from 'entities/chat/ui/chat/types';
import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import { useLocation } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { Message } from 'shared/ui/message';
import { InfoConflict, PropsInfoConflict } from 'widgets/conflict-information';
import { useMediaQuery } from 'shared/hooks';
import { GradientDivider } from 'shared/ui/gradient-divider';

interface PropsUserChatBox {
  option: 'conflict' | 'chat';
  chatmateInfo?: IChatmateInfo;
  messages?: IMessage[];
  isOpen: boolean;
  onClick: (text: string) => void;
}

const conflict: PropsInfoConflict = {
  users: [
    {
      specialization: 'recipient',
      option: 'confirm',
      name: 'Петров Петр Петрович',
      image: 'https://i.pravatar.cc/300',
      id: '234432',
    },
    {
      specialization: 'valanter',
      option: 'conflict',
      name: 'Зыбенко Михаил петрович',
      image: 'https://i.pravatar.cc/300',
      id: '234432',
    },
  ],
  infoConflict: {
    date: '24.09.2022',
    time: '16:00',
    address: 'ул. Нахимова, д.9, у подъезда №3',
    message:
      'Заболел и совсем нет сил даже ходить по квартире. Почти неделю собаку выгуливали соседи, но в пятницу они не смогут. Помогите, пожалуйста!',
  },
};

export const UserChatBox: React.FC<PropsUserChatBox> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { chatmateInfo, messages } = props;
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 550px)');

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  if (!chatmateInfo || !messages) {
    return <div className={styles['display-none']}></div>;
  }

  return (
    <article className={cn(styles.box, { [styles.box_action]: props.isOpen })}>
      {props.option === 'chat' ? (
        <div className={styles['user-info']}>
          {isMobile && (
            <Icon
              onClick={() => props.onClick('close')}
              className={styles.cursor}
              color="#9798C9"
              icon="ArrowIcon"
              size="32"
            />
          )}
          <img
            className={styles.img}
            src={chatmateInfo.userAvatarLink}
            alt="фото"
          />
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
              {chatmateInfo.name}
            </p>
            <p
              className={cn(
                'text',
                'm-0',
                'text_type_regular',
                styles.id,
                styles['display-none']
              )}
            >{`ID ${chatmateInfo.userId}`}</p>
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
              {chatmateInfo.phone}
            </p>
          </div>
          {isMobile && (
            <GradientDivider extClassName={styles['gradient-divider']} />
          )}
        </div>
      ) : (
        <div className={styles['container-modile']}>
          {isMobile && (
            <Icon
              onClick={() => props.onClick('close')}
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
      <div className={styles['content-container']}>
        {props.option === 'chat' ? (
          props.messages?.map((m) => (
            <Message
              type={m.userId === chatmateInfo.userId ? 'incoming' : 'outgoing'}
              messageText={m.message}
              avatarLink={m.userAvatarLink}
              key={m.id}
            />
          ))
        ) : (
          <InfoConflict {...conflict} />
        )}
      </div>
      {!isMobile && (
        <Icon
          onClick={() => props.onClick('close')}
          className={cn(styles['btn-close'], styles.cursor)}
          color="#9798C9"
          icon="CloseCrossIcon"
          size="14"
        />
      )}
      {isMobile && <GradientDivider />}
      {location.pathname === '/chat-one' && (
        <InputWrapper
          placeholder="Напишите сообщение..."
          inputValue={inputValue}
          name="input"
          onClickBtn={() => {}}
          onChange={handleInputChange}
        />
      )}

      {location.pathname === '/chat-two' && (
        <div className={styles['box-btn']}>
          <Button
            label="Конфликт решен"
            buttonType="secondary"
            actionType="button"
            onClick={() => {}}
          />
          <Button
            label="Ответить"
            buttonType="primary"
            actionType="button"
            onClick={() => {}}
            customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
          />
        </div>
      )}
      {location.pathname === '/test' && (
        <div className={styles['container-btn']}>
          <Button
            size="small"
            buttonType="primary"
            label="Взять в работу"
            extClassName={styles.button}
            customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
            onClick={() => {}}
          />
        </div>
      )}
    </article>
  );
};
