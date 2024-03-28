import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

interface UseOutsideClickOptions {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  onOutsideClick(...args: unknown[]): void;
}

export function useEvent<T extends (...args: unknown[]) => void>(fn: T) {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: unknown[]) => {
      return fnRef.current.apply(null, args);
    },
    [fnRef]
  );

  return eventCb as unknown as T;
}

export function useOutsideClick({
  elementRef,
  triggerRef,
  enabled = true,
  onOutsideClick,
}: UseOutsideClickOptions) {
  const handleOutsideClick = useEvent(onOutsideClick);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!elementRef.current) {
        return;
      }

      const ignoreElements = [elementRef.current];

      if (triggerRef?.current) {
        ignoreElements.push(triggerRef.current);
      }

      if (!ignoreElements.some((element) => element.contains(target))) {
        handleOutsideClick(e);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [enabled, elementRef, triggerRef, handleOutsideClick]);
}
