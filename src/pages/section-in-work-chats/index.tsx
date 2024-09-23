import { ChangeEvent, useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { MessageCard } from 'shared/ui/message-card';
import { InputWrapper } from 'shared/ui/input-wrapper';
import styles from './styles.module.css';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { TaskChatContent, TaskChatMetaInterface } from 'shared/types/chat.types';
import { mockChatMessages } from 'entities/chat/mock-messages';
import { mockAdminChatsResponse, mockUserChatsResponse } from 'entities/chat/mock-response';

export const SectionInWorkChats = () => {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<TaskChatContent | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleClickCard = (task: TaskChatMetaInterface) => {
    setSelectedCard(task._id);
    setIpOpen(true);
    setInfoMessage(mockChatMessages);
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
        information={!!mockUserChatsResponse.task.length}
        title="У Вас пока нет чатов в работе"
      >
        {mockUserChatsResponse.task?.map(
          ({ meta: item }: { meta: TaskChatMetaInterface }) => (
          <MessageCard
            key={item._id}
            statusConflict={!item.isActive}
            description={item.volunteer.phone}
            action={selectedCard === item._id}
            user={item.recipient}
            handleClickCard={() => handleClickCard(item)}
            unreads={item.unreads}
          />
        ))}
      </WrapperMessage>

      {isOpen && (
        <WindowInteractionUsers
          closeConflict={handelCloseWrapper}
          option="chat"
          isOpen={isOpen}
          onClick={handleVisibleMessage}
          chatmateInfo={infoMessage?.}
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
        >
          {infoMessage?.map((m) => (
            <Message
              type={m.author._id === ___.user._id ? 'incoming' : 'outgoing'}
              messageText={m.body}
              avatarLink={m.author.avatar}
              key={m._id}
            />
          ))}
        </WindowInteractionUsers>
      )}
    </div>
  );
};
