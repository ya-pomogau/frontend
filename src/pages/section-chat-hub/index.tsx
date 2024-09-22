import { useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { MessageCard } from 'shared/ui/message-card';
import styles from './styles.module.css';
import { Button } from 'shared/ui/button';
import { Icon } from 'shared/ui/icons';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { TaskChatInfo, TaskChatMetaInterface } from 'shared/types/chat.types';
import { mockUserChatsResponse } from 'entities/chat/mock-response';

export const SectionChatHub = () => {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<TaskChatMetaInterface | null>(
    null
  );

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handelCloseWrapper = () => {
    setIpOpen((state) => !state);
    setSelectedCard('');
  };

  const handleClickCard = (task: TaskChatMetaInterface) => {
    setSelectedCard(task._id);
    setIpOpen(true);
    setInfoMessage(task);
  };

  return (
    <div className={styles.hub}>
      <WrapperMessage
        information={!!mockUserChatsResponse.task.length}
        title="У Вас пока нет чатов в ожидании"
      >
        {mockUserChatsResponse.task?.map(
          ({ meta: item }: { meta: TaskChatMetaInterface }) => (
            <MessageCard
              key={item._id}
              statusConflict={!item.isActive}
              description={item.volunteer.phone}
              action={selectedCard === item._id}
              user={item.recipient}
              handleClickCard={() => handleClickCard(item.taskId)}
              unreads={item.unreads}
            />
          )
        )}
      </WrapperMessage>

      {isOpen && (
        <WindowInteractionUsers
          closeConflict={handelCloseWrapper}
          option="chat"
          isOpen={isOpen}
          onClick={handleVisibleMessage}
          chatmateInfo={infoMessage?.user}
          boxButton={
            <div className={styles.boxBtn}>
              <Button
                buttonType="primary"
                actionType="submit"
                label="Взять в работу"
                customIcon={
                  <Icon
                    icon="EmptyMessageIcon"
                    color="white"
                    onClick={() => {}}
                    size="24"
                  />
                }
              />
            </div>
          }
        >
          {infoMessage?.messages.map((m) => (
            <Message
              type={m.userId === infoMessage.user._id ? 'incoming' : 'outgoing'}
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
