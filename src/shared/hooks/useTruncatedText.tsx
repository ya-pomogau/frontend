import { RefObject, useLayoutEffect, useState } from 'react';

export const useTruncatedText = (ref: RefObject<HTMLParagraphElement>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkTruncation = () => {
      const { offsetHeight, scrollHeight } = element;
      if (!isExpanded) {
        setIsTruncated(offsetHeight < scrollHeight);
      }
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref, isExpanded]);

  const toggleIsShowingMore = () => setIsExpanded((prev) => !prev);

  return {
    isTruncated: isTruncated || isExpanded,
    isExpanded,
    toggleIsShowingMore,
  };
};
