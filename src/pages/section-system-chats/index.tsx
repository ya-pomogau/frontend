import { ChangeEvent, useEffect, useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
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

export const SectionSystemChats = () => {
  // Получаем метаданные по доступным чатам
  const systemChats = mockAdminChatsResponse.system;

  // Объявляем переменные
  const [chatmateInfo, setСhatmateInfo] = useState<AnyUserInterface | null>(
    null
  );
  const [chatMessage, setChatMessage] = useState<MessageInterface[] | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  // Обработка клика по карточке
  const handleClickCard = (meta: SystemChatMetaInterface) => {
    // Закрываем старый чат
    chatMessage && setChatMessage(null);

    // Открываем новый
    setSelectedCard(meta._id);
    setСhatmateInfo(meta.user);

    // TODO: Стираем данные о непрочитанных сообщениях через websocket
    meta.unreads = 0;
  };

  // Загрузка сообщений по id-чата из метаданных
  useEffect(() => {
    // TODO: Загрузка с сервера через websocket, а не из моков
    const match = systemChats.find(({ meta }) => meta._id === selectedCard);
    setChatMessage(match?.chats as MessageInterface[]);

    selectedCard && setIpOpen(true);
  }, [selectedCard, isOpen, systemChats]);

  //Механизмы отображения чата
  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handelCloseWrapper = () => {
    setIpOpen((state) => !state);
    setSelectedCard('');
  };

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
        <WindowInteractionUsers
          closeConflict={handelCloseWrapper}
          option="chat"
          isOpen={isOpen}
          onClick={handleVisibleMessage}
          chatmateInfo={chatmateInfo}
          messages={chatMessage}
          boxButton={
            <InputWrapper
              placeholder="Напишите сообщение..."
              inputValue={inputValue}
              name="input"
              onClickBtn={() => {}}
              onChange={handleInputChange}
              getFile={setFileInput}
              containerMessages={true}
            />
          }
        />
      )}
    </div>
  );
};
