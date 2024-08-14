import { IMessage } from 'shared/types/message';
import { Message } from 'shared/ui/message';
import { IChatmateInfo } from 'shared/types/conflict';

interface MessagesListProps {
  currentMessages: IMessage[];
  chatmateInfo: IChatmateInfo;
}

export const MessagesList = ({
  currentMessages,
  chatmateInfo,
}: MessagesListProps) => {
  return (
    <div>
      {currentMessages?.map((message) => (
        <Message
          type={
            message.userId === chatmateInfo.userId ? 'incoming' : 'outgoing'
          }
          messageText={message.message}
          avatarLink={message.userAvatarLink}
          key={message.id}
        />
      ))}
    </div>
  );
};
