import styles from './styles.module.css';
import { ChangeEvent, useState } from 'react';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { Message } from 'shared/ui/message';
import { IMessage } from 'shared/types/message';
import { IChatmateInfo } from 'shared/types/conflict';

export const SectionChatHub = () => {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [fileInput, setFileInput] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<{
    id: number;
    chatmateInfo: IChatmateInfo;
    messages: IMessage[];
  } | null>(null);

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  return (
    <div className={styles.hub}>
      {isOpen && (
        <WindowInteractionUsers
          closeConflict={() => {}}
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
              containerMessages={true}
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
