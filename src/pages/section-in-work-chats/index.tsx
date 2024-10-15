import { ChangeEvent, useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { IMessageHub, messageHub } from 'shared/libs/utils';
import { MessageCard } from 'shared/ui/message-card';
import { InputWrapper } from 'shared/ui/input-wrapper';
import styles from './styles.module.css';
import WrapperMessage from 'shared/ui/wrapper-messages';

export const SectionInWorkChats = () => {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<IMessageHub | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleClickCard = (task: IMessageHub) => {
    setSelectedCard(task.id);
    setIpOpen(true);
    setInfoMessage(task);
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
        information={!!messageHub.length}
        title="У Вас пока нет чатов в работе"
      >
        {messageHub?.map((item) => (
          <MessageCard
            key={item.id}
            statusConflict
            description={item.user.phone}
            action={selectedCard === item.id}
            user={item.user}
            handleClickCard={() => handleClickCard(item)}
            message={item.messages}
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
