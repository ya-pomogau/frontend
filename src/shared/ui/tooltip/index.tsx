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
import { CloseCrossIcon } from '../icons/close-cross-icon';

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
        (!target.closest('.tooltip') || target.closest('.close')) &&
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
      {/* TODO:закоментила потому что этой кнопки быть не должно!*/}
      {/*<button className={styles.closeButton} onClick={changeVisible}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M13.8174 0.188341C13.5739 -0.0627803 13.0869 -0.0627803 12.8434 0.188341L7 5.9641L1.15644 0.188341C0.912958 -0.0627803 0.426089 -0.0627803 0.182609 0.188341C-0.0608698 0.439462 -0.0608698 0.941765 0.182609 1.19289L5.7826 6.96864L0.182609 12.7444C-0.0608698 12.9955 -0.0608698 13.4978 0.182609 13.7489C0.426089 14.0001 0.42597 14 0.669449 14C0.912928 14 0.912958 14.0001 1.15644 13.7489L7 7.97319L12.8434 13.7489C13.0869 14.0001 13.0869 14 13.3304 14C13.5739 14 13.5739 14.0001 13.8174 13.7489C14.0609 13.4978 14.0609 12.9955 13.8174 12.7444L8.2174 6.96864L13.8174 1.19289C14.0609 0.941765 14.0609 0.439462 13.8174 0.188341Z"
            fill="#2E3192"
          />
        </svg>
      </button>*/}
      {children}
    </div>
  );

  return createPortal(tooltip, modalRoot);
};
