import {
  ReactNode,
  useEffect,
  useRef,
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import styles from './styles.module.css';

interface TooltipProps {
  extClassName?: string;
  visible?: boolean;
  children: ReactNode;
  pointerPosition?: 'right' | 'left';
  changeVisible?: () => void;
  elementStyles?: CSSProperties;
  idForModalRoot?: string;
}

export const Tooltip = ({
  extClassName,
  visible,
  children,
  pointerPosition = 'right',
  changeVisible,
  elementStyles,
  idForModalRoot = 'modal',
}: TooltipProps) => {
  const modalRoot = document.getElementById(idForModalRoot) as HTMLElement;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeWithEsc = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        !(e.target as HTMLElement).closest('.tooltip') &&
        !(e.target as HTMLElement).closest('#clock-element') &&
        changeVisible
      ) {
        changeVisible();
      }
    },
    [changeVisible]
  );

  const closeWithClickOutTooltip = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        changeVisible &&
        (!target.closest('#tooltip-component') || target.closest('.close')) &&
        !target.closest('#clock-element') &&
        target.getRootNode() === document
      ) {
        changeVisible();
      }
    },
    [changeVisible]
  );

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('keydown', closeWithEsc);
      document.addEventListener('click', closeWithClickOutTooltip);
    });

    return () => {
      document.removeEventListener('keydown', closeWithEsc);
      document.removeEventListener('click', closeWithClickOutTooltip);
    };
  }, []);

  const [pointerPositionState, setPointerPositionState] =
    useState(pointerPosition);

  useLayoutEffect(() => {
    if (visible && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const leftEdgeDistance = rect.left;
      const tooltipWidth = rect.width;
      const windowWidth = window.innerWidth;

      if (leftEdgeDistance < tooltipWidth) {
        tooltipRef.current.style.transform = `translateX(87%)`;
        setPointerPositionState('left');
      } else {
        tooltipRef.current.style.left = '';
        tooltipRef.current.style.transform = '';
        setPointerPositionState('right');
      }
    }
  }, [visible]);

  const tooltip = (
    <div
      id="tooltip-component"
      className={classnames(styles.tooltip, extClassName, {
        [styles['tooltip--visible']]: visible,
      })}
      ref={tooltipRef}
      style={elementStyles}
    >
      <div
        className={classnames(
          styles.pointer,
          styles[`pointer--${pointerPositionState}`]
        )}
      />
      {children}
    </div>
  );

  return createPortal(tooltip, modalRoot);
};
