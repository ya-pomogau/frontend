import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { Icon } from 'shared/ui';
import { Tooltip } from 'shared/ui/tooltip';
import styles from './styles.module.css';

let tooltipModalRefCount = 0;

interface ModalProps {
  children: ReactNode;
  modalContent: ReactNode;
  setClicked?: Dispatch<SetStateAction<boolean>>;
  extClassName?: string;
  closeButton?: boolean;
  conflictModalVisible?: boolean;
  setConflictModalVisible?: Dispatch<SetStateAction<boolean>>;
}

interface Coords {
  right: number;
  top: number;
}

export const ButtonWithModal = ({
  children,
  modalContent,
  setClicked,
  extClassName,
  closeButton = false,
  conflictModalVisible,
  setConflictModalVisible,
}: ModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coords | null>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  const getCoords = () => {
    if (!visible) {
      setVisible(true);

      tooltipModalRefCount += 1;
      document.body.style.overflowY = 'hidden';
    }

    if (!conflictModalVisible) {
      setConflictModalVisible && setConflictModalVisible(true);
    }

    const box = buttonRef.current?.getBoundingClientRect();

    if (box) {
      setCoords({
        right: window.innerWidth - box.right - box.width / 3,
        top: box.top + window.scrollY + box.height * 1.2,
      });
    }
  };

  const hideModal = () => {
    if (visible) {
      setVisible(false);

      tooltipModalRefCount -= 1;
      if (tooltipModalRefCount === 0) document.body.style.overflowY = 'visible';

      setClicked && setClicked(true);
    }
  };

  return (
    <div ref={buttonRef} onClick={getCoords} className={extClassName}>
      {children}
      {(conflictModalVisible === undefined
        ? visible
        : visible && conflictModalVisible) && (
        <Tooltip
          visible={visible}
          changeVisible={hideModal}
          pointerPosition="right"
          elementStyles={{
            position: 'absolute',
            top: `${coords?.top}px`,
            right: `${coords?.right}px`,
          }}
        >
          {closeButton && (
            <Icon icon="CloseCrossIcon"
              color="blue"
              className={`${styles.closeButton} close`}
            />
          )}
          {modalContent}
        </Tooltip>
      )}
    </div>
  );
};
