import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { Tooltip } from 'shared/ui/tooltip';
import styles from './styles.module.css';

interface ModalProps {
  children: ReactNode;
  modalContent: ReactNode;
  setClicked?: Dispatch<SetStateAction<boolean>>;
  extClassName?: string;
  closeButton?: boolean;
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
}: ModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [coords, setCoords] = useState<Coords | null>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  const getCoords = () => {
    setVisible(true);
    const box = buttonRef.current?.getBoundingClientRect();

    if (box) {
      setCoords({
        right: window.innerWidth - box.right - box.width / 3,
        top: box.top + window.scrollY + box.height * 1.2,
      });
    }
  };

  const hideModal = () => {
    setVisible(false);
    setClicked && setClicked(true);
  };

  return (
    <div ref={buttonRef} onClick={getCoords} className={extClassName}>
      {children}
      {visible && (
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
            <CloseCrossIcon
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
