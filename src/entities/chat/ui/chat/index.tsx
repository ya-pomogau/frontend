import { ChangeEvent, useState } from "react";
import classnames from "classnames";
import { PinIcon } from "shared/ui/icons/pin-icon";
import { Avatar } from "shared/ui/avatar";
import { Message } from "shared/ui/message";
import { Input } from "shared/ui/input";
import { IMessage, IInterlocutorInfo } from "./types";
import { sortMessages } from "./libs/utils";
import styles from "./styles.module.css";

interface ChatProps {
  extClassName?: string;
  messagesWrapperExtClassName?: string;
  messages: IMessage[];
  interlocutorInfo: IInterlocutorInfo;
  onInputChange: (value: string) => void;
  onAttachFileClick?: () => void;
}

export const Chat = ({
  extClassName,
  messagesWrapperExtClassName,
  messages,
  interlocutorInfo,
  onInputChange,
  onAttachFileClick,
}: ChatProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const sortedMessages = sortMessages(messages);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <div className={classnames(styles.chatWrapper, extClassName)}>
      <Avatar
        avatarName="Фотография собеседника"
        avatarLink={interlocutorInfo.userAvatarLink}
        extClassName={styles.avatar}
      />

      <div className={styles.mainBlock}>
        <div className={styles.userInfo}>
          <h1
            className={classnames(
              "m-0",
              "text",
              "text_size_large",
              "text_type_regular"
            )}
          >
            {interlocutorInfo.name}
          </h1>
          {interlocutorInfo?.phone && (
            <div className={styles.phoneInfo}>
              <span
                className={classnames(
                  "text",
                  "text_size_medium",
                  "text_type_bold"
                )}
              >
                Тел.:
              </span>
              <span className={classnames("text", "text_size_medium")}>
                {interlocutorInfo.phone}
              </span>
            </div>
          )}
        </div>
        <div className={styles.chat}>
          <div
            className={classnames(
              styles.messagesBlock,
              messagesWrapperExtClassName
            )}
          >
            {sortedMessages?.map((message) => (
              <Message
                type={
                  message.userId === interlocutorInfo.userId
                    ? "incoming"
                    : "outgoing"
                }
                messageText={message.message}
                avatarLink={message.userAvatarLink}
              />
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="Напишите сообщение..."
              value={inputValue}
              name="message"
              extClassName={styles.input}
              onChange={handleInputChange}
              customIcon={
                <PinIcon size="24" color="blue" onClick={onAttachFileClick} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
