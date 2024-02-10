import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { Tooltip } from 'shared/ui/tooltip';

interface ModalProps {
  children: ReactNode;
  modalContent: ReactNode;
  setClicked?: Dispatch<SetStateAction<boolean>>;
  extClassName?: string;
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
}: ModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [coords, setCoords] = useState<Coords | null>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  const getCoords = () => {
    setClicked && setClicked(!visible);
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
          {/* TODO: необходимо добавить крестик, не затрагивая  Tooltip*/}
          {modalContent}
        </Tooltip>
      )}
    </div>
  );
};