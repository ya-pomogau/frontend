import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { Tooltip } from 'shared/ui/tooltip';

interface ModalProps {
  children: ReactNode;
  modalContent: ReactNode;
}

interface Coords {
  right: number;
  top: number;
}

export const ButtonWithModal = ({ children, modalContent }: ModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [coords, setCoords] = useState<Coords | null>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  const getCoords = () => {
    setVisible(!visible);
    const box = buttonRef.current?.getBoundingClientRect();

    if (box) {
      setCoords({
        right: window.innerWidth - box.right - box.width / 3,
        top: box.top + window.scrollY + box.height * 1.2,
      });
    } else {
      setCoords(null);
    }
  };
  return (
    <div ref={buttonRef} onClick={getCoords}>
      {children}
      {visible && (
        <Tooltip
          visible={visible}
          changeVisible={() => setVisible(false)}
          pointerPosition="right"
          elementStyles={{
            position: 'absolute',
            top: `${coords?.top}px`,
            right: `${coords?.right}px`,
          }}
        >
          {modalContent}
        </Tooltip>
      )}
    </div>
  );
};
