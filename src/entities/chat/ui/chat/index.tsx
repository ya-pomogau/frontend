import classnames from 'classnames';

import { Avatar } from 'shared/ui/avatar';
import { SquareButton } from 'shared/ui/square-buttons';

import { InputWrapper, GradientDivider } from 'shared/ui';
import { useMediaQuery, useForm } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { IMessage } from 'shared/types/message';
import { IChatmateInfo } from 'shared/types/conflict';
import { MessagesList } from './components/messages-list';
import { Breakpoints } from 'shared/config';

import styles from './styles.module.css';

interface PopupChatProps {
  messages: IMessage[];
  chatmateInfo: IChatmateInfo;
  onAttachFileClick: () => void;
  onMessageSend?: (message: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

export const PopupChat = ({
  messages,
  chatmateInfo,
  onMessageSend,
  isOpen,
  onClick,
}: PopupChatProps) => {
  const isMobile = useMediaQuery(Breakpoints.S);

  const { values, handleChange } = useForm({
    message: '',
  });

  const handleSendClick = () => {
    if (onMessageSend) {
      onMessageSend(values.message);
    }
  };

  return (
    <div
      className={classnames(styles.chatWrapper, {
        [styles.chatWrapper_action]: isOpen,
      })}
    >
      {!isMobile && (
        <SquareButton
          buttonType="close"
          onClick={onClick}
          extClassName={styles['btn-close']}
        />
      )}

      <div className={styles.mainBlock}>
        {isMobile && (
          <Icon
            color="blue"
            icon="ArrowIcon"
            size="32"
            className={styles.arrow}
            onClick={onClick}
          />
        )}
        <Avatar
          avatarName="Фотография собеседника"
          avatarLink={chatmateInfo.userAvatarLink}
          extClassName={styles.avatar}
        />

        <h4 className={classnames('text', 'text_type_regular', styles.name)}>
          {chatmateInfo.name}
        </h4>
      </div>
      {isMobile && <GradientDivider />}
      <div className={styles['container-chat']}>
        <MessagesList messages={messages} chatmateInfo={chatmateInfo} />

        <InputWrapper
          extClassInput={classnames({
            [styles.input_inner_mobile]: isMobile && isOpen,
          })}
          extClass={classnames({
            [styles.input_container_mobile]: isMobile && isOpen,
          })}
          customIconSize={isMobile ? '32' : '24'}
          getFile={() => {}}
          placeholder="Напишите сообщение..."
          inputValue={values.message}
          name="message"
          onChange={handleChange}
          onClickBtn={handleSendClick}
          containerMessages={false}
        />
      </div>
    </div>
  );
};
