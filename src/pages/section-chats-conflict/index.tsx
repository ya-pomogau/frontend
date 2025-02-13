import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { MessageCard } from 'shared/ui/message-card';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import {
  useGetTasksConflictQuery,
  useGetTasksWorkConflictQuery,
  useTakeConflictTaskMutation,
  useResolveConflictMutation,
} from 'services/admin-api';
import { TaskConflict } from 'entities/task/types';
import WrapperMessage from 'shared/ui/wrapper-messages';
import { mockAdminChatsResponse } from 'entities/chat/mock-response';
import { usePermission } from 'shared/hooks';
import { Routes } from 'shared/config';
import { adminPermission, userRole } from 'shared/types/common.types';
import { WindowChatUsers, WindowConflictUsers } from 'widgets';
import {
  MessageInterface,
  RecipientConflictChatMetaInterface,
  VolunteerConflictChatMetaInterface,
} from 'shared/types/chat.types';
import { InputWrapper } from 'shared/ui';
import { AnyUserInterface } from 'shared/types/user.type';

export const SectionChatsConflict = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isInWorkPage = currentPath === Routes.CHAT_CONFLICT_IN_WORK;

  const isConflictsPermissionGranted = usePermission(
    [adminPermission.CONFLICTS],
    userRole.ADMIN
  );

  /* #####################
  Получаем данные о конфликтных задачах
  ##################### */
  // TODO: Разделить загрузку данных в зависимости от currentPath
  const unreviewed = useGetTasksConflictQuery('', {
    skip: !isConflictsPermissionGranted,
  });
  const inWork = useGetTasksWorkConflictQuery('', {
    skip: !isConflictsPermissionGranted,
  });
  // TODO: Загрузить данные о завершенных конфликтах
  const completed = { data: [], status: 'mocked' };

  const mockTaskId = '222';

  const [tasks, setTasks] = useState<TaskConflict[] | undefined>([]);
  const [chatMessage, setChatMessage] = useState<MessageInterface[] | null>(
    null
  );

  const [selectedTask, setSelectedTask] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<string>('');

  const [getInfoTask, setGetInfoTask] = useState<TaskConflict>();
  const [chatmateInfo, setСhatmateInfo] = useState<AnyUserInterface | null>(
    null
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');
  const [_, setFileInput] = useState<string>('');

  const [takeConflictTask] = useTakeConflictTaskMutation();
  const [resolveConflict] = useResolveConflictMutation();

  const handleClickConflictCard = (task: TaskConflict) => {
    setChatMessage(null);
    setSelectedChat('');
    setСhatmateInfo(null);

    setSelectedTask(task._id);
    setGetInfoTask(task);
    setIsOpen(true);

    // TODO: Поиск или создание чатов, через api, согласно выбранной задаче
  };

  const handleClickChatCard = (
    chat:
      | VolunteerConflictChatMetaInterface
      | RecipientConflictChatMetaInterface
  ) => {
    // Закрываем старый чат
    chatMessage && setChatMessage(null);
    setGetInfoTask(undefined);

    // Открываем новый
    setSelectedChat(chat._id);
    setСhatmateInfo(
      (chat as RecipientConflictChatMetaInterface).recipient ??
        (chat as VolunteerConflictChatMetaInterface).volunteer
    );
    setIsOpen(true);

    // TODO: Стираем данные о непрочитанных сообщениях через api
    chat.unreads = 0;
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleCloseWrapper = () => {
    setIsOpen((state) => !state);
    setSelectedTask('');
    setSelectedChat('');
    setChatMessage(null);
    setGetInfoTask(undefined);
    setСhatmateInfo(null);
  };

  const getWorkTask = async (id: string | undefined) => {
    setIsOpen(false);
    await takeConflictTask(id).unwrap();
  };

  const handleResolutionConflict = async (id: string | undefined) => {
    setIsOpen(false);
    await resolveConflict(id).unwrap();
  };

  /* #####################
  Получаем данные о конфликтном чате
  ##################### */
  const conflictChats = mockAdminChatsResponse.conflict;

  /* #####################
  ################# Кнопки
  ##################### */
  const boxButton = {
    [`${Routes.CHAT_CONFLICT_UNREVIEWED}`]: (
      <Button
        label="Взять в работу"
        buttonType="primary"
        actionType="button"
        onClick={() => getWorkTask(getInfoTask?._id)}
        customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
      />
    ),
    [`${Routes.CHAT_CONFLICT_IN_WORK}`]: (
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
          customIcon={<Icon color="white" icon="EmptyMessageIcon" />}
        />
      </>
    ),
    [`${Routes.CHAT_CONFLICT_COMPLETED}`]: (
      <Button
        label="Вернуть в работу"
        buttonType="primary"
        actionType="button"
        onClick={() => {}}
        customIcon={<Icon color="white" icon="LockIcon" />}
      />
    ),
  }[currentPath];
  /* #####################
  ############# USE EFFECT
  ##################### */
  useEffect(() => {
    // Загрузка сообщений по id-чата из метаданных
    // TODO: Загрузка с сервера через websocket, а не из моков
    // NOTE: Избыточная сложность добычи этих данных в текущей структуре

    const match = conflictChats.find(({ meta }) => meta.taskId === mockTaskId);

    const newMatch = match?.chats.find(
      (chat) => chat[0].chatId === selectedChat
    );
    setChatMessage(newMatch as MessageInterface[]);

    selectedChat && setIsOpen(true);
  }, [selectedChat, isOpen, conflictChats]);

  useEffect(() => {
    const RoutesNaming = {
      [`${Routes.CHAT_CONFLICT}`]: 'Конфликты',
      [`${Routes.CHAT_CONFLICT_UNREVIEWED}`]: 'Конфликты → Нерассмотренные',
      [`${Routes.CHAT_CONFLICT_IN_WORK}`]: 'Конфликты → В работе',
      [`${Routes.CHAT_CONFLICT_COMPLETED}`]: 'Конфликты → Завершенные',
    } as const;

    console.log(
      '===============================\n',
      `Мы находимся в разделе ${RoutesNaming[currentPath]}`,
      '\n==============================='
    );

    // Устанавливаем конфликтные задачи, в виде списка чатов
    setTasks(
      {
        [`${Routes.CHAT_CONFLICT_UNREVIEWED}`]: unreviewed.data,
        [`${Routes.CHAT_CONFLICT_IN_WORK}`]: inWork.data,
        [`${Routes.CHAT_CONFLICT_COMPLETED}`]: completed.data,
      }[currentPath]
    );

    setIsOpen(false);
    setSelectedTask('');
    setSelectedChat('');
  }, [currentPath, unreviewed.status, inWork.status, completed.status]);

  /* #####################
  ################# RETURN
  ##################### */
  return (
    <div className={styles.conflict}>
      <WrapperMessage
        information={!!tasks?.length}
        title="У Вас пока нет конфликтов"
      >
        {tasks?.map((task) => (
          <div key={task._id}>
            <MessageCard
              statusConflict
              action={false}
              onClick={() => handleClickConflictCard(task)}
              unreads={+task.isPendingChanges}
              description={task.description}
            />
            {isOpen && isInWorkPage && task._id === selectedTask && (
              <div className={styles['conflict-chats']}>
                {conflictChats.map(({ meta: first }) => {
                  if (first.taskId === mockTaskId) {
                    const { meta } = first;
                    return meta.map((chat) => (
                      <MessageCard
                        key={chat._id}
                        action={selectedTask === chat._id}
                        user={
                          (chat as RecipientConflictChatMetaInterface)
                            .recipient ??
                          (chat as VolunteerConflictChatMetaInterface).volunteer
                        }
                        unreads={chat.unreads}
                        onClick={() => handleClickChatCard(chat)}
                        position={2}
                      />
                    ));
                  } else return null;
                })}
              </div>
            )}
          </div>
        ))}
      </WrapperMessage>

      <div className={styles.boxConflict}>
        {isOpen && getInfoTask && (
          <WindowConflictUsers
            close={handleCloseWrapper}
            isOpen={isOpen}
            task={getInfoTask}
            boxButton={<div className={styles.boxBtn}>{boxButton}</div>}
          />
        )}
        {isOpen && chatmateInfo && chatMessage && isInWorkPage && (
          <WindowChatUsers
            close={handleCloseWrapper}
            isOpen={isOpen}
            chatmateInfo={chatmateInfo}
            messages={chatMessage}
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
    </div>
  );
};
