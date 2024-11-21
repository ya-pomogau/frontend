import * as React from 'react';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Icon } from 'shared/ui';
import { Tooltip } from 'shared/ui/tooltip';
import styles from './styles.module.css';
import { PopupChat, infoAdmin } from 'entities';
import { useControlModal } from 'shared/hooks';

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
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const [isTooltipBlocked, setIsTooltipBlocked] = useState(false);
  const handleOpenChat = () => {
    setIsTooltipBlocked(true);
    handleOpen();
    hideModal();
  };
  const handleCloseChat = () => {
    handleClose();
    setTimeout(() => setIsTooltipBlocked(false), 300);
  };
  const buttonRef = useRef<HTMLDivElement>(null);

  const getCoords = () => {
    if (isTooltipBlocked) return;

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

  useEffect(() => {
    setVisible(false);
  }, [modalContent]);

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
            <Icon
              icon="CloseCrossIcon"
              color="blue"
              className={`${styles.closeButton} close`}
            />
          )}
          {modalContent &&
            React.cloneElement(modalContent as React.ReactElement, {
              openChat: handleOpenChat,
            })}
        </Tooltip>
      )}
      {isOpen && (
        <PopupChat
          isOpen={isOpen}
          onClick={handleCloseChat}
          messages={[]}
          chatmateInfo={infoAdmin}
          onAttachFileClick={() => {}}
        />
      )}
    </div>
  );
};
