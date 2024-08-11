import { useEffect, useState } from 'react';

import { IMessage } from 'shared/types/message';
import { sortMessages } from '../libs/utils';

interface useLazyScrollProps {
    messages: IMessage[];
    openedChatPopupRef: React.RefObject<HTMLElement>;
};

const MAX_MESSAGES_SHOW = 10;

export const useLazyScroll = ({
    messages, openedChatPopupRef
}: useLazyScrollProps) => {

 const sortedMessages = sortMessages(messages);

 const [mesagesInChat] = useState(sortedMessages);
 const [currentMessagesPage, setCurrentMessagesPage] = useState(1);
 const [messagesShown] = useState(MAX_MESSAGES_SHOW);

 const lastMessage = currentMessagesPage * messagesShown;
 const firstMessage = 0;
 const currentMessages = mesagesInChat.slice(firstMessage, lastMessage);

 useEffect(() => {
   openedChatPopupRef.current?.addEventListener('scroll', scrollHandler);

   return function () {
     openedChatPopupRef.current?.removeEventListener('scroll', scrollHandler);
   };
  }, []);

 const scrollHandler = () => {
    const { clientHeight, scrollHeight, scrollTop } =
      openedChatPopupRef.current as HTMLDivElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setCurrentMessagesPage((prevState) => prevState + 1);
    }
  };

 return currentMessages

}