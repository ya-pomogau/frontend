import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { MessageCard } from 'shared/ui/message-card';
import { InfoConflict } from 'widgets/conflict-information';
import { WindowInteractionUsers } from 'widgets/window-interaction-users';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import {
  useGetTasksConfilctQuery,
  useGetTasksWorkConflictQuery,
  useTakeConflictTaskMutation,
  useResolСonflictMutation,
} from 'services/admin-api';
import { TaskConflict } from 'entities/task/types';
import WrapperMessage from 'shared/ui/wrapper-messages';
import {
  ConflictChatInfo,
  ConflictChatsTupleMetaInterface,
} from 'shared/types/chat.types';

export const SectionChatsConflict = () => {
  const location = useLocation();
  const { data: tasks } = useGetTasksConfilctQuery('');
  const { data: tasksWork } = useGetTasksWorkConflictQuery('');
  const [takeConflictTask] = useTakeConflictTaskMutation();
  const [resolСonflict] = useResolСonflictMutation();

  const dataMessage: ConflictChatInfo[] | undefined =
    location.pathname === '/available-chats' ? tasks : tasksWork;
  const [getInfoTask, setGetInfoTask] =
    useState<ConflictChatsTupleMetaInterface>();
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [isOpenConflict, setIsOpenConflict] = useState<boolean>(false);

  const handleClickCard = (task: ConflictChatsTupleMetaInterface) => {
    setSelectedCard(task._id);
    setGetInfoTask(task);
    setIsOpenConflict(true);
  };

  useEffect(() => {
    setIsOpenConflict(false);
    setSelectedCard('');
  }, [location]);

  const handleCloseConflict = () => {
    setIsOpenConflict((state) => !state);
    setSelectedCard('');
  };

  const getWorkTask = async (id: string | undefined) => {
    setIsOpenConflict(false);
    await takeConflictTask(id).unwrap();
  };

  const handleResolutionConflict = async (id: string | undefined) => {
    setIsOpenConflict(false);
    await resolСonflict(id).unwrap();
  };

  return (
    <div className={styles.conflict}>
      <WrapperMessage
        information={dataMessage && dataMessage.length > 0 ? true : false}
        title="У Вас пока нет конфликтов"
      >
        {dataMessage?.map(
          ({ meta: item }: { meta: ConflictChatsTupleMetaInterface }) => (
            <div key={item._id}>
              <MessageCard
                statusConflict
                description={item.description}
                action={selectedCard === item._id}
                user={item.recipient}
                handleClickCard={() => handleClickCard(item)}
                task={item}
              />
            </div>
          )
        )}
      </WrapperMessage>

      <div className={styles.boxConflict}>
        {isOpenConflict && (
          <WindowInteractionUsers
            closeConflict={handleCloseConflict}
            option="conflict"
            isOpen={isOpenConflict}
            boxButton={
              <div className={styles.boxBtn}>
                {location.pathname === '/chat' ? (
                  <Button
                    label="Взять в работу"
                    buttonType="primary"
                    actionType="button"
                    onClick={() => getWorkTask(getInfoTask?._id)}
                    customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
                  />
                ) : (
                  <>
                    <Button
                      label="Конфликт решен"
                      buttonType="secondary"
                      actionType="button"
                      onClick={() => handleResolutionConflict(getInfoTask?._id)}
                    />
                    <Button
                      label="Ответить"
                      buttonType="primary"
                      actionType="button"
                      disabled
                      customIcon={
                        <Icon color="white" icon="EmptyMessageIcon" />
                      }
                    />
                  </>
                )}
              </div>
            }
          >
            {getInfoTask && <InfoConflict info={getInfoTask} />}
          </WindowInteractionUsers>
        )}
      </div>
    </div>
  );
};
