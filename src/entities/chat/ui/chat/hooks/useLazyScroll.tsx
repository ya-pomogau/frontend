import { RefObject, useEffect, useState } from 'react';

import { sortMessages } from '../libs/utils';
import { MessageInterface } from 'shared/types/chat.types';

interface useLazyScrollProps {
  messages: MessageInterface[] | null;
  openedChatPopupRef: RefObject<HTMLElement>;
}

const MAX_MESSAGES_SHOW = 10;

export const useLazyScroll = ({
  messages,
  openedChatPopupRef,
}: useLazyScrollProps) => {
  const sortedMessages = messages && sortMessages(messages);

  const [messagesInChat] = useState(sortedMessages);
  const [currentMessagesPage, setCurrentMessagesPage] = useState(1);
  const [messagesShown] = useState(MAX_MESSAGES_SHOW);

  const lastMessage = currentMessagesPage * messagesShown;
  const firstMessage = 0;
  const currentMessages = messagesInChat.slice(firstMessage, lastMessage);

  useEffect(() => {
    openedChatPopupRef.current?.addEventListener('scroll', scrollHandler);

    return function () {
      openedChatPopupRef.current?.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    const { clientHeight, scrollHeight, scrollTop } =
      openedChatPopupRef.current as HTMLDivElement;

    if (-1 * scrollTop + clientHeight >= scrollHeight - 5) {
      setCurrentMessagesPage((prevState) => prevState + 1);
    }
  };

  return currentMessages;
};
