import { ChangeEvent, useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { MessageCard } from 'shared/ui/message-card';
import { InputWrapper } from 'shared/ui/input-wrapper';
import styles from './styles.module.css';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { mockAdminChatsResponse } from 'entities/chat/mock-response';
import { SystemChatInfo } from 'shared/types/chat.types';

export const SectionSystemChats = () => {
  const systemChats = mockAdminChatsResponse.system;

  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<IMessageHub | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleClickCard = ({ meta }: SystemChatInfo) => {
    setSelectedCard(meta._id);
    setIpOpen(true);
    setInfoMessage(meta);
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
        {systemChats?.map(({ meta, chats }) => (
          <MessageCard
            key={meta._id}
            statusConflict
            description={meta.user.phone}
            action={selectedCard === meta._id}
            user={meta.user}
            handleClickCard={() => handleClickCard({ meta, chats })}
            message={chats}
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
          messages={infoMessage?.messages}
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
