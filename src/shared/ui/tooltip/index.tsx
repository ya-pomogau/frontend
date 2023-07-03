import { ReactNode, useEffect, useRef } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface TooltipProps {
  extClassName?: string;
  visible?: boolean;
  children: ReactNode;
  pointerPosition?: "right" | "center";
  changeVisible?: () => void;
}

export const Tooltip = ({
  extClassName,
  visible,
  children,
  pointerPosition = "right",
  changeVisible
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  function closeWithEsc(e: KeyboardEvent) {
    if (e.key === 'Escape' && changeVisible) {
      changeVisible();
    }
  }
  function closeWithClickOutTooltip(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.classList.value.includes('filterButton') &&
      !target.parentElement?.classList.value.includes('filterButton') &&
      !target.parentElement?.parentElement?.classList.value.includes('filterButton')) {
      if (!tooltipRef.current?.contains(target) && 
        changeVisible && 
        tooltipRef.current?.classList.value.includes('visible')) {
        changeVisible();
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', closeWithEsc);
    document.addEventListener('click', closeWithClickOutTooltip);
    return () => {
      document.removeEventListener('keydown', closeWithEsc);
      document.removeEventListener('click', closeWithClickOutTooltip);
    };
  }, []);
  return (
    <div
      className={classnames(styles.tooltip, extClassName, {
        [styles["tooltip--visible"]]: visible,
      })}
      ref={tooltipRef}
    >
      <div
        className={classnames(
          styles.pointer,
          styles[`pointer--${pointerPosition}`]
        )}
      />
      {children}
    </div>
  )
};
