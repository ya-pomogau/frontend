import { useGetSaveMessageQuery } from 'services/messages-api';
import styles from './styles.module.css';
import { ChangeEvent, useState } from 'react';
import { MessageCard } from 'shared/ui/message-card';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { Message } from 'shared/ui/message';
import { IMessage } from 'shared/types/message';
import { IChatmateInfo, IConflict } from 'shared/types/conflict';

export const SectionChatHub = () => {
  const { data } = useGetSaveMessageQuery('saveMessage');
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [fileInput, setFileInput] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState('');
  const [infoMessage, setInfoMessage] = useState<{
    id: number;
    chatmateInfo: IChatmateInfo;
    messages: IMessage[];
  } | null>(null);
  const dataMessage: IConflict[] = data;

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    handleVisibleMessage('');
  };

  const handleInfoUser = (
    id: number,
    chatmateInfo: IChatmateInfo,
    messages: IMessage[]
  ) => {
    if (chatmateInfo && messages && id) {
      setInfoMessage({ chatmateInfo, messages, id });
    }
  };

  return (
    <div className={styles.hub}>
      <div className={styles['box-message']}>
        {dataMessage?.map((i) => (
          <MessageCard
            id={i.id}
            getChat={handleInfoUser}
            key={i.chatmateInfo.userId}
            onClick={handleCardClick}
            chatmateInfo={i.chatmateInfo}
            message={i.messages}
            action={isOpen && selectedCard === i.chatmateInfo.userId}
          />
        ))}
      </div>
      {isOpen && (
        <WindowInteractionUsers
          option="chat"
          isOpen={isOpen}
          onClick={handleVisibleMessage}
          chatmateInfo={infoMessage?.chatmateInfo}
          boxButton={
            <InputWrapper
              placeholder="Напишите сообщение..."
              inputValue={inputValue}
              name="input"
              onClickBtn={() => {}}
              onChange={handleInputChange}
              getFile={setFileInput}
            />
          }
        >
          {infoMessage?.messages.map((m) => (
            <Message
              type={
                m.userId === infoMessage.chatmateInfo.userId
                  ? 'incoming'
                  : 'outgoing'
              }
              messageText={m.message}
              avatarLink={m.userAvatarLink}
              key={m.id}
            />
          ))}
        </WindowInteractionUsers>
      )}
    </div>
  );
};
