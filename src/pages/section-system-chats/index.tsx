import { ChangeEvent, useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { MessageCard } from 'shared/ui/message-card';
import { InputWrapper } from 'shared/ui/input-wrapper';
import styles from './styles.module.css';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { mockAdminChatsResponse } from 'entities/chat/mock-response';
import {
  MessageInterface,
  SystemChatInfo,
  SystemChatMetaInterface,
} from 'shared/types/chat.types';

export const SectionSystemChats = () => {
  // Получаем метаданные
  const systemChats = mockAdminChatsResponse.system;

  // Объявляем переменные
  const [infoMessage, setInfoMessage] =
    useState<SystemChatMetaInterface | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  // Обработка клика по карточке
  const handleClickCard = (meta: SystemChatMetaInterface) => {
    setSelectedCard(meta._id);
    setIpOpen(true);
    setInfoMessage(meta);
  };

  // Загрузка сообщений по id из метаданных
  const handleGetMessage = (id: string) => {
    // TODO: Загрузка с сервера через websocket, а не из моков
    const match = systemChats.find(({ meta }) => meta._id === id);
    return match?.chats as MessageInterface[];
  };

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
            description={meta.user.phone}
            action={selectedCard === meta._id}
            user={meta.user}
            unreads={meta.unreads}
            onClick={() => handleClickCard(meta)}
          />
        ))}
      </WrapperMessage>
      {isOpen && infoMessage && (
        <WindowInteractionUsers
          closeConflict={handelCloseWrapper}
          option="chat"
          isOpen={isOpen}
          onClick={handleVisibleMessage}
          chatmateInfo={infoMessage?.user}
          messages={handleGetMessage(infoMessage._id)}
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
