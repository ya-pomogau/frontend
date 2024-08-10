import { RefObject, useLayoutEffect, useState } from 'react';

export const useTruncatedText = (ref: RefObject<HTMLParagraphElement>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsExpanded((prev) => !prev);

  return {
    isTruncated,
    isExpanded,
    toggleIsShowingMore,
  };
};
