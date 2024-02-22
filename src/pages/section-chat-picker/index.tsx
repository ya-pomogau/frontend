import {
  useAddMessageMutation,
  useDeleteMessageMutation,
} from 'services/messages-api';
import styles from './styles.module.css';
import { useState } from 'react';
import { IConflict } from 'shared/types/conflict';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Message } from 'shared/ui/message';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';

export const SectionChatPicker = () => {
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<IConflict | null>(null);

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

  return (
    <div className={styles.picker}>
      {isOpen && (
        <WindowInteractionUsers
          closeConflict={() => {}}
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
