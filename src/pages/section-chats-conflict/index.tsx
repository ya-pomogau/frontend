import { useState } from 'react';
import styles from './styles.module.css';
import {
  useGetConflictsQuery,
  useDeleteConflictMutation,
} from 'services/messages-api';
import { MessageCard } from 'shared/ui/message-card';
import { InfoConflict } from 'widgets/conflict-information';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import {
  IChatmateInfo,
  IConflict,
  IConflictUser,
  IInfoConflict,
} from 'shared/types/conflict';
import { IMessage } from 'shared/types/message';

export const SectionChatsConflict = () => {
  const { data } = useGetConflictsQuery('conflicts');
  const [deleteConflict] = useDeleteConflictMutation();
  const [isOpen, setIpOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [infoConflict, setInfoConflict] = useState<{
    id?: number;
    conflict?: IConflictUser[];
    infoConflict?: IInfoConflict;
  }>({});
  const [infoMessage, setInfoMessage] = useState<{
    id: number;
    chatmateInfo: IChatmateInfo;
    messages: IMessage[];
  } | null>(null);
  const dataMessage: IConflict[] = data;

  const handleInfoUser = (
    id: number,
    chatmateInfo: IChatmateInfo,
    messages: IMessage[]
  ) => {
    if (chatmateInfo && messages && id) {
      setInfoMessage({ chatmateInfo, messages, id });
    }
  };

  const handleVisibleMessage = (text: string) => {
    text === 'close' ? setIpOpen(false) : setIpOpen(true);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    handleVisibleMessage('');
  };

  const handleConflict = async () => {
    if (infoConflict) {
      await deleteConflict(infoConflict.id);
      setIpOpen(false);
    }
  };

  return (
    <div className={styles.conflict}>
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
            getConflict={() =>
              setInfoConflict({
                id: i.id,
                conflict: i.conflict,
                infoConflict: i.infoConflict,
              })
            }
          />
        ))}
      </div>

      {isOpen && (
        <div className={styles['container-conflict']}>
          <WindowInteractionUsers
            option="conflict"
            isOpen={isOpen}
            onClick={handleVisibleMessage}
            chatmateInfo={infoMessage?.chatmateInfo}
            boxButton={
              <div className={styles['box-btn']}>
                <Button
                  label="Конфликт решен"
                  buttonType="secondary"
                  actionType="button"
                  onClick={handleConflict}
                />
                <Button
                  label="Ответить"
                  buttonType="primary"
                  actionType="button"
                  onClick={() => {}}
                  customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
                />
              </div>
            }
          >
            <InfoConflict
              conflict={infoConflict.conflict}
              infoConflict={infoConflict.infoConflict}
            />
          </WindowInteractionUsers>
        </div>
      )}
    </div>
  );
};
