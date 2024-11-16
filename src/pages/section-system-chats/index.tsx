import { ChangeEvent, useEffect, useState } from 'react';
import { MessageCard } from 'shared/ui/message-card';
import { InputWrapper } from 'shared/ui/input-wrapper';
import styles from './styles.module.css';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { mockAdminChatsResponse } from 'entities/chat/mock-response';
import {
  MessageInterface,
  SystemChatMetaInterface,
} from 'shared/types/chat.types';
import { AnyUserInterface } from 'shared/types/user.type';
import { Routes } from 'shared/config';
import { useLocation } from 'react-router-dom';
import { WindowChatUsers } from 'widgets';
import { Button, Icon } from 'shared/ui';

export const SectionSystemChats = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  /* #####################
  Получаем метаданные по доступным чатам
  ##################### */
  const systemChats = mockAdminChatsResponse.system;

  const [chatmateInfo, setСhatmateInfo] = useState<AnyUserInterface | null>(
    null
  );
  const [chatMessage, setChatMessage] = useState<MessageInterface[] | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  const handleClickCard = (meta: SystemChatMetaInterface) => {
    // Закрываем старый чат
    chatMessage && setChatMessage(null);

    // Открываем новый
    setSelectedCard(meta._id);
    setСhatmateInfo(meta.user);

    // TODO: Стираем данные о непрочитанных сообщениях через api
    meta.unreads = 0;
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handelCloseWrapper = () => {
    setIsOpen((state) => !state);
    setSelectedCard('');
  };

  /* #####################
  ################# Кнопки
  ##################### */
  const boxButton = {
    [`${Routes.CHAT_HUB_UNREVIEWED}`]: (
      <div className={styles.boxBtn}>
        <Button
          label="Взять в работу"
          buttonType="primary"
          actionType="button"
          onClick={() => {}}
          customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
        />
      </div>
    ),
    [`${Routes.CHAT_HUB_IN_WORK}`]: (
      <InputWrapper
        placeholder="Напишите сообщение..."
        inputValue={inputValue}
        name="input"
        onClickBtn={() => {}}
        onChange={handleInputChange}
        getFile={setFileInput}
        containerMessages={true}
      />
    ),
    [`${Routes.CHAT_HUB_COMPLETED}`]: (
      <div className={styles.boxBtn}>
        <Button
          label="Вернуть в работу"
          buttonType="primary"
          actionType="button"
          onClick={() => {}}
          customIcon={<Icon color="white" icon="LockIcon" />}
        />
      </div>
    ),
  }[currentPath];
  /* #####################
  ############# USE EFFECT
  ##################### */
  useEffect(() => {
    // Загрузка сообщений по id-чата из метаданных
    // TODO: Загрузка с сервера через websocket, а не из моков
    const match = systemChats.find(({ meta }) => meta._id === selectedCard);
    setChatMessage(match?.chats as MessageInterface[]);

    selectedCard && setIsOpen(true);
  }, [selectedCard, isOpen, systemChats]);

  useEffect(() => {
    const RoutesNaming = {
      [`${Routes.CHAT_HUB}`]: 'Обращения',
      [`${Routes.CHAT_HUB_UNREVIEWED}`]: 'Обращения → Нерассмотренные',
      [`${Routes.CHAT_HUB_IN_WORK}`]: 'Обращения → В работе',
      [`${Routes.CHAT_HUB_COMPLETED}`]: 'Обращения → Завершенные',
    } as const;

    console.log(
      '===============================\n',
      `Мы находимся в разделе ${RoutesNaming[currentPath]}`,
      '\n==============================='
    );
  }, [currentPath]);

  /* #####################
  ################# RETURN
  ##################### */
  return (
    <div className={styles.picker}>
      <WrapperMessage
        information={!!systemChats.length}
        title="У Вас пока нет чатов в работе"
      >
        {systemChats?.map(({ meta }) => (
          <MessageCard
            key={meta._id}
            action={selectedCard === meta._id}
            user={meta.user}
            unreads={meta.unreads}
            onClick={() => handleClickCard(meta)}
          />
        ))}
      </WrapperMessage>
      {isOpen && chatmateInfo && chatMessage && (
        <WindowChatUsers
          close={handelCloseWrapper}
          isOpen={isOpen}
          chatmateInfo={chatmateInfo}
          messages={chatMessage}
          boxButton={boxButton}
        />
      )}
    </div>
  );
};
