import {
  ReactNode,
  useEffect,
  useRef,
  CSSProperties,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import styles from './styles.module.css';

interface TooltipProps {
  extClassName?: string;
  visible?: boolean;
  children: ReactNode;
  pointerPosition?: 'right' | 'center';
  changeVisible?: () => void;
  elementStyles?: CSSProperties;
}

export const Tooltip = ({
  extClassName,
  visible,
  children,
  pointerPosition = 'right',
  changeVisible,
  elementStyles,
}: TooltipProps) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeWithEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && changeVisible) {
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
        !target.closest('.tooltip') &&
        target.getRootNode() === document
      ) {
        changeVisible();
      }
    },
    [changeVisible]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeWithEsc);
    document.addEventListener('click', closeWithClickOutTooltip);
    return () => {
      document.removeEventListener('keydown', closeWithEsc);
      document.removeEventListener('click', closeWithClickOutTooltip);
    };
  }, [closeWithClickOutTooltip, closeWithEsc]);

  const tooltip = (
    <div
      className={classnames(
        styles.tooltip,
        extClassName,
        {
          [styles['tooltip--visible']]: visible,
        },
        'tooltip'
      )}
      ref={tooltipRef}
      style={elementStyles}
    >
      <div
        className={classnames(
          styles.pointer,
          styles[`pointer--${pointerPosition}`]
        )}
      />
      {children}
    </div>
  );

  return createPortal(tooltip, modalRoot);
};
