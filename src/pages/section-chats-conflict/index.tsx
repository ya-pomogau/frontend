import { ChangeEvent, useState } from 'react';
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
  IConflictUser,
  IInfoConflict,
  IInfoConflicts,
  IUsers,
} from 'shared/types/conflict';
import { IMessage } from 'shared/types/message';
import { Message } from 'shared/ui/message';
import { InputWrapper } from 'shared/ui/input-wrapper';
import { useMediaQuery } from 'shared/hooks';

export const SectionChatsConflict = () => {
  const { data } = useGetConflictsQuery('conflicts');
  const dataMessage: IInfoConflicts[] = data;
  const [deleteConflict] = useDeleteConflictMutation();
  const isMobule = useMediaQuery('(max-width: 1150px)');

  const [isOpenChats, setIsOpenChats] = useState<boolean>(false);
  const [isOpenConflict, setIsOpenConflict] = useState<boolean>(false);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const [selectedCard, setSelectedCard] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<number>(0);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
  };
  const [inputValue, setInputValue] = useState<string>('');
  const [fileInput, setFileInput] = useState<string>('');

  const [infoUsers, setInfoUsers] = useState<{
    users: IUsers[];
    id: number;
  } | null>(null);

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

  const handleInfoUser = (
    id: number,
    chatmateInfo: IChatmateInfo,
    messages: IMessage[]
  ) => {
    if (chatmateInfo && messages && id) {
      setInfoMessage({ chatmateInfo, messages, id });
    }
  };

  const hadleInfoUsers = (users: IUsers[], id: number) => {
    setInfoUsers({ users: users, id: id });
  };

  const handleConflict = async () => {
    if (infoConflict) {
      await deleteConflict(infoConflict.id);
      setIsOpenChats(false);
    }
  };

  const hendleOpenConflictCard = (item: string) => {
    if (selectedCard !== item) {
      setIsOpenChats(false);
    }
    setSelectedCard(item);
    setIsOpenConflict(true);
    setSelectedChat(0);
  };

  const handleCloseConflict = () => {
    setIsOpenConflict(false);
    if (!isMobule) {
      setSelectedCard('');
    }
    setIsOpenChat(false);
  };

  const handleOpenChats = () => {
    setIsOpenChats(true);
  };

  const handleOpenChat = (id: number) => {
    setIsOpenChats(true);
    setSelectedChat(id);
    setIsOpenChat(true);
    setIsOpenConflict(false);
  };

  const handleCloseChat = () => {
    setIsOpenChat(false);
    setSelectedChat(0);
    if (!isMobule) {
      setIsOpenConflict(true);
    }
  };

  return (
    <div className={styles.conflict}>
      <div className={styles['box-message']}>
        {dataMessage?.map((item) => (
          <div key={item.id}>
            <MessageCard
              key={item.id}
              id={item.id}
              getConflict={() =>
                setInfoConflict({
                  id: item.id,
                  conflict: item.conflict,
                  infoConflict: item.infoConflict,
                })
              }
              chatmateInfo={{
                name: 'Оповещение о конфликте',
                userAvatarLink: '',
                userId: item.id + '',
              }}
              onClick={() => hendleOpenConflictCard(item.id + '')}
              getInfoChatsConflict={hadleInfoUsers}
              message={[
                {
                  date: new Date('2023-05-14T21:00:00.000Z'),
                  id: 2343254345,
                  message: 'Откройте сообщение',
                  userAvatarLink: '',
                  userId: '',
                },
              ]}
              users={item.users}
              action={selectedCard === item.id + ''}
            />
            {isOpenChats && selectedCard === item.id + '' && (
              <>
                {infoUsers?.users.map((date) => (
                  <MessageCard
                    id={date.id}
                    getChat={handleInfoUser}
                    key={date.id}
                    onClick={() => handleOpenChat(date.id)}
                    chatmateInfo={date.chatmateInfo}
                    message={date.messages}
                    action={selectedChat === date.id}
                    position={true}
                  />
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles['container-conflict']}>
        {isOpenConflict && (
          <WindowInteractionUsers
            option="conflict"
            isOpen={isOpenConflict}
            onClick={handleCloseConflict}
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
                  onClick={handleOpenChats}
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
        )}
        {!isOpenConflict && isOpenChat && (
          <WindowInteractionUsers
            option="chat"
            isOpen={isOpenChat}
            onClick={handleCloseChat}
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
    </div>
  );
};
