import {
  useGetMessageQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
} from 'services/messages-api';
import styles from './styles.module.css';
import { useState } from 'react';
import { IChatmateInfo, IConflict } from 'shared/types/conflict';
import { IMessage } from 'shared/types/message';
import { MessageCard } from 'shared/ui/message-card';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';

export const SectionChatPicker = () => {
  const { data } = useGetMessageQuery('messages');
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [selectedCard, setSelectedCard] = useState('');
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<IConflict | null>(null);

  const dataMessage: IConflict[] = data;

  const handleMessage = async () => {
    if (infoMessage) {
      await addMessage(infoMessage).unwrap();
      await deleteMessage(infoMessage.id).unwrap();
      setIpOpen(false);
    }
  };

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
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
    <div className={styles.picker}>
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
            <div className={styles['box-btn']}>
              <Button
                size="small"
                buttonType="primary"
                label="Взять в работу"
                extClassName={styles.button}
                customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
                onClick={handleMessage}
              />
            </div>
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
