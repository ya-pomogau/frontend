import { useState } from 'react';

import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { MessageCard } from 'shared/ui/message-card';
import styles from './styles.module.css';
import { Button } from 'shared/ui/button';
import { Icon } from 'shared/ui/icons';
import WrapperMessage from 'shared/ui/wrapper-messages';

export const SectionChatHub = () => {
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<IMessageHub | null>(null);

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handelCloseWrapper = () => {
    setIpOpen((state) => !state);
    setSelectedCard('');
  };

  const handleClickCard = (task: IMessageHub) => {
    setSelectedCard(task.id);
    setIpOpen(true);
    setInfoMessage(task);
  };

  return (
    <div className={styles.hub}>
      <WrapperMessage
        information={!!messageHub.length}
        title="У Вас пока нет чатов в ожидании"
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
              type={
                m.author._id === infoMessage.user._id ? 'incoming' : 'outgoing'
              }
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
